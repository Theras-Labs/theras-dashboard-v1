import * as React from "react";
import { useAccount, useNetwork, useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";
import { useUserDataStore } from "src/store/useUserDetail";
import { Button } from "@mantine/core";

function SignInButton({
  onSuccess,
  onError,
}: {
  onSuccess: (args: { address: string }) => void;
  onError: (args: { error: Error }) => void;
}) {
  const { loadUserData, setWeb3Data } = useUserDataStore((state) => state);
  const [state, setState] = React.useState<{
    loading?: boolean;
    nonce?: string;
  }>({});

  // todo-wallet change
  // cookie token access?

  const fetchNonce = async () => {
    try {
      const nonceRes = await fetch("/api/auth/nonce");
      const nonce = await nonceRes.text();
      setState((x) => ({ ...x, nonce }));
    } catch (error) {
      setState((x) => ({ ...x, error: error as Error }));
    }
  };

  // Pre-fetch random nonce when button is rendered
  // to ensure deep linking works for WalletConnect
  // users on iOS when signing the SIWE message
  React.useEffect(() => {
    fetchNonce();
  }, []);

  const { address } = useAccount();
  const { chain } = useNetwork();
  const { signMessageAsync } = useSignMessage();

  const signIn = async () => {
    try {
      const chainId = chain?.id;
      if (!address || !chainId) return;

      setState((x) => ({ ...x, loading: true }));
      // Create SIWE message with pre-fetched nonce and sign with wallet
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId,
        nonce: state.nonce,
      });

      //
      console.log(message, "message");
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      // Verify signature
      const verifyRes = await fetch("/api/auth/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, signature }),
      });

      if (!verifyRes.ok) throw new Error("Error verifying message");

      setState((x) => ({ ...x, loading: false }));

      const result = await verifyRes.json();
      console.log(result.user, "verifyRes");
      //  refer to auth store
      // if on sign-in -> to dashboard, else -> {}
      setWeb3Data(result.user, "eth_address");
      // notification login

      onSuccess({ address });
    } catch (error) {
      setState((x) => ({ ...x, loading: false, nonce: undefined }));
      onError({ error: error as Error });
      fetchNonce();
    }
  };

  return (
    <Button
      fullWidth
      mt="xl"
      disabled={!state.nonce || state.loading}
      onClick={signIn}
    >
      Sign-In with Ethereum
    </Button>
  );
}

export function Profile() {
  const { isConnected } = useAccount();
  // ectend disconnect

  const [state, setState] = React.useState<{
    address?: string;
    error?: Error;
    loading?: boolean;
  }>({});

  // Fetch user when:
  React.useEffect(() => {
    const handler = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const json = await res.json();
        setState((x) => ({ ...x, address: json.address }));
      } catch (_error) {}
    };
    // 1. page loads
    handler();

    // 2. window is focused (in case user logs out of another window)
    window.addEventListener("focus", handler);
    return () => window.removeEventListener("focus", handler);
  }, []);

  console.log(isConnected, "isConnected");
  if (isConnected) {
    return (
      <div>
        {/* Account content goes here */}

        {state.address ? (
          <div>
            <div>Signed in as {state.address}</div>
            <br />
            <div>Redirecting, please wait...</div>
            {/* <button
              onClick={async () => {
                await fetch("/api/auth/logout");
                setState({});
              }}
            >
              Sign Out
            </button> */}
          </div>
        ) : (
          <SignInButton
            onSuccess={({ address }) => setState((x) => ({ ...x, address }))}
            onError={({ error }) => setState((x) => ({ ...x, error }))}
          />
        )}
      </div>
    );
  }

  return <div>{/* Connect wallet content goes here */} Sign in wallet 1st</div>;
}

// the 4 boys -> load -> signin ethereum
//
