import { Button, MultiSelect, Table, Tabs } from "@mantine/core";
import type { CustomNextPage } from "next";
import { DashboardLayout } from "src/layout";
import { useHistoryTx } from "src/store/hooks/useHistoryTx";
import { formatDate } from "src/lib/helpers/date-helper";
import { useAccount } from "wagmi";
import ModalWallet from "src/component/Modal/ModalWallet";
import { useState } from "react";

const SessionLeaderboard: CustomNextPage = () => {
  const { address } = useAccount();
  const [historySession, setHistorySession] = useState([]);
  return (
    <div className="">
      Current Session:
      <div className="rounded-md bg-secondary-gray p-6 mb-4 ">
        {address && (
          <>
            No Session on working:
            <Button>Create A Session</Button>
          </>
        )}
        {!address && (
          <>
            You need to connect wwallet to create session:
            <br />
            <ModalWallet />
          </>
        )}
      </div>
      Completed Session:
      <div className="rounded-md bg-secondary-gray p-6 mb-4 ">
        {!historySession?.length && (
          <div>No history, You haven't create a session yet</div>
        )}
      </div>
    </div>
  );
};

SessionLeaderboard.getLayout = DashboardLayout;

export default SessionLeaderboard;
