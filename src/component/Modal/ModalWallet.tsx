import { useDisclosure } from "@mantine/hooks";
import { Modal, Group, Button } from "@mantine/core";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";

import { InjectedConnector } from "wagmi/connectors/injected";
import { Profile } from "src/component/SignInButton";

import {
  MetaMaskLogo,
  WalletConnectLogo,
  CoinbaseLogo,
} from "src/component/WalletProviderLogos";

export default function ModalWallet() {
  const [opened, { open, close }] = useDisclosure(false);

  const { address, isConnected, connector } = useAccount();
  // const { connect } = useConnect({
  //   connector: new InjectedConnector(),
  // });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  const { data: ensAvatar } = useEnsAvatar({ address });
  const { data: ensName } = useEnsName({ address });

  const { disconnect } = useDisconnect();

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={
          isConnected ? (
            ""
          ) : (
            <span
              style={{
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              Select Wallets - available on v2
            </span>
          )
        }
        centered
        size="lg"
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          borderRadius: "25px",
        }}
      >
        <span>
          Web3 login currently under maintenance, please use oauth web2 login
        </span>
        {isConnected ? (
          <Profile />
        ) : (
          connectors.map((connector) => (
            <Button
              disabled
              fullWidth
              mt="xl"
              // disabled={!connector.ready}
              key={connector.id}
              onClick={() => connect({ connector })}
              style={{
                textDecoration: "none",
                textAlign: "center",
                color: "#fff",
                alignItems: "center",
                width: "100%",
                height: "100%",
                padding: "15px 24px",
                backgroundColor: "#18180A",
                border: "1px solid #18180A",
                borderRadius: "100px",
                textTransform: "uppercase",
                fontFamily: "Space Grotesk, Sans-Serif",
                fontWeight: "700",
              }}
            >
              <span
                style={{
                  marginRight:
                    connector.name == "MetaMask" ||
                    "Coinbase Wallet" ||
                    "WalletConnect"
                      ? "20px"
                      : "",
                }}
              >
                {connector.name}
              </span>
              {!connector.ready && " (unsupported)"}
              {isLoading &&
                connector.id === pendingConnector?.id &&
                " (connecting)"}
              {(connector.name === "MetaMask" && (
                <MetaMaskLogo imgHeight={25} imgWidth={25} />
              )) ||
                (connector.name === "Coinbase Wallet" && (
                  <CoinbaseLogo imgHeight={25} imgWidth={25} />
                )) ||
                (connector.name === "WalletConnect" && (
                  <WalletConnectLogo imgHeight={25} imgWidth={25} />
                ))}
            </Button>
          ))
        )}
      </Modal>

      <Group position="center">
        <Button
          fullWidth
          mt="xl"
          onClick={open}
          style={{
            textDecoration: "none",
            textAlign: "center",
            color: "#fff",
            alignItems: "center",
            width: "100%",
            height: "100%",
            padding: "15px 24px",
            // backgroundColor: "#172A46",
            border: "1px solid #18180A",
            borderRadius: "100px",
            textTransform: "uppercase",
            fontFamily: "Space Grotesk, Sans-Serif",
            fontWeight: "700",
          }}
          className="bg-orange-600"
        >
          <span
            style={
              {
                // marginRight: "20px",
              }
            }
          >
            web3 Wallet
          </span>
        </Button>
      </Group>
    </>
  );
}
