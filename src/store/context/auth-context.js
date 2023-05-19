import React, { FC, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useUserDataStore } from "src/store/useUserDetail";
import { useAccount } from "wagmi";
import { Container, Loader } from "@mantine/core";

const AuthContext = React.createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { isConnected } = useAccount();

  const {
    loadUserData,
    type,
    userData,
    setLoading,
    loading,
    setError,
    error,
    setWeb3Data,
  } = useUserDataStore((state) => state);
  console.log("authprovider type", type, userData);

  // const { userData, subscription } = useUserDetail();

  //   const [authState, setAuthState] = React.useState({
  //     token: "",
  //   });
  //   const setUserAuthInfo = ({ data }) => {
  //     const token = localStorage.setItem("token", data.data);
  //     setAuthState({
  //       token,
  //     });
  //   };

  //   // checks if the user is authenticated or not
  //   const isUserAuthenticated = () => {
  //     if (!authState.token) {
  //       return false;
  //     }
  //   };

  useEffect(() => {
    console.log("effect context web2");
    // web2
    if (status !== "loading" && type !== "eth_address") {
      if (session) {
        // this should start load all required data
        console.log("effect context web2-- SESSIONS");

        if (!userData) {
          loadUserData(session?.user?.email, "web2");
          // if already authenticated then no need to push
          router.push("/");
        }
      } else {
        router.push("/sign-in");
      }
    }
  }, [session]);

  // useEffect(() => {
  //   // web3
  //   console.log("effect context web3");

  //   if (isConnected) {
  //     setLoading(true);

  //     // 1 way from verify to here
  //     if (type === "eth_address") {
  //       // means userData is already ready right
  //       setLoading(false);
  //       router.push("/");
  //     } else {
  //       // probably when refresh
  //       console.log("load this web3 handler");
  //       const handler = async () => {
  //         try {
  //           const res = await fetch("/api/auth/me");
  //           const result = await res.json();
  //           console.log(result, "RESULT FROM LOAD ");
  //           setWeb3Data(result.user, "eth_address");
  //           setLoading(false);
  //           router.push("/");
  //         } catch (_error) {
  //           setLoading(false);
  //           setError(_error);
  //           router.push("/sign-in");
  //         }
  //       };
  //       handler();
  //     }
  //   }
  // }, [type, isConnected]);

  if (status === "loading") {
    return (
      <Container
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Loader
          color="#EC3C2B"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
          }}
        />
      </Container>
    );
  }
  return (
    <Provider
    //   value={{
    //     authState,
    //     setAuthState: (userAuthInfo) => setUserAuthInfo(userAuthInfo),
    //     isUserAuthenticated,
    //   }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
