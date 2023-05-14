import { Button } from "@mantine/core";
import * as React from "react";
import { useERC20Transfer } from "src/store/hooks/useERC20Send";

export function SendTransaction({
  addressERC20 = "0x88271d333C72e51516B67f5567c728E702b3eeE8",
  addressTo = "0x839699659Ac2F0c448bF29cE32A55e1119516DE5", //random acc
  amount = 100,
  title = "Send",
}) {
  // check if web3 login
  // check balance
  // check allowance
  // check gas estimation etc

  // wait then send analytics/ send to DB

  const { loading, transferERC20 } = useERC20Transfer(
    addressERC20, //contract address,
    addressTo, //to,
    amount
  );

  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        // sendTransaction?.();
        transferERC20();
      }}
      loading={loading}
      //   disabled={!sendTransaction || !amount}
    >
      {title}
    </Button>
  );
}
