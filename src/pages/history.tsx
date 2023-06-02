import { MultiSelect, Table, Tabs } from "@mantine/core";
import type { CustomNextPage } from "next";
import { DashboardLayout } from "src/layout";
import { useHistoryTx } from "src/store/hooks/useHistoryTx";
import { formatDate } from "src/lib/helpers/date-helper";

const HistoryTx: CustomNextPage = () => {
  // no handler yet, pop up
  const { data, isLoading } = useHistoryTx();
  console.log(data, "data");
  //   last 24hours
  // last sessions
  //   chart
  // slider control pirze
  // search
  return (
    <div className="">
      {/* ALL / CARDS / TOKEN /  */}
      <div className="flex">
        <MultiSelect
          data={[]}
          label="Filter by name"
          placeholder="Pick all that you like"
        />
      </div>
      <br />
      <Tabs defaultValue="all">
        <Tabs.List>
          <Tabs.Tab value="all">All</Tabs.Tab>
          <Tabs.Tab value="cards">Cards</Tabs.Tab>
          <Tabs.Tab value="tokens">Tokens</Tabs.Tab>
          <Tabs.Tab value="nfts">Nfts</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="all" pt="xs">
          <Table highlightOnHover striped>
            <thead>
              <tr>
                {/* <th>No.</th> */}
                <th>Value</th>
                <th>When</th>
                <th>From</th>
                {/* <th>Email</th> */}
                <th>Time</th>
                <th>Date</th>
                <th>Payment Type</th>
                <th>Read</th>
              </tr>
            </thead>
            <tbody>
              {!!data?.length &&
                data
                  ?.sort((a, b) => b.createdAt - a.createdAt)

                  .map((element, i) => (
                    <tr key={i}>
                      {/* from */}
                      {/* date */}
                      {/* value */}
                      {/* payment type */}

                      {/* <td>{i + 1}</td> */}
                      <td className="text-green-400">{element?.value}</td>
                      <td>{formatDate(element?.createdAt).timeAgo}</td>
                      <td>{element?.from}</td>
                      {/* <td>{element?.email}</td> */}
                      <td>{formatDate(element?.createdAt).time}</td>
                      <td>{formatDate(element?.createdAt).date}</td>
                      <td>{element?.payment}</td>
                      <td>{element?.read ? "✅" : "unread"}</td>
                    </tr>
                  ))}
            </tbody>
          </Table>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

HistoryTx.getLayout = DashboardLayout;

export default HistoryTx;
