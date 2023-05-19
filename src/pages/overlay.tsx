import type { CustomNextPage } from "next";
import { DashboardLayout } from "src/layout";
import { useSession } from "next-auth/react";
import {
  Card,
  Image,
  Text,
  Container,
  Progress,
  Tabs,
  Button,
  Checkbox,
  Divider,
  TextInput,
  NumberInput,
  Select,
  FileInput,
  MultiSelect,
  Textarea,
  Stack,
  ColorPicker,
} from "@mantine/core";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { useNotif } from "src/store/useNotif";
import { useProgress } from "src/store/useProgress";
import CardLayout from "src/layout/CardLayout";
import { IconUpload } from "@tabler/icons-react";

const OVERLAY_TABS = [
  "alert",
  "wheel",
  "voting",
  "milestone",
  "countdown",
  "media share",
  "leaderboard",
  "running text",
];
const Overlay: CustomNextPage = () => {
  return (
    <div className="">
      <Tabs color="red" defaultValue="alert">
        <Tabs.List>
          {OVERLAY_TABS?.map((item, i) => (
            <Tabs.Tab className="capitalize" value={item} key={i}>
              {item}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        <br />
        <Tabs.Panel value="alert" pt="xs">
          <PanelAlert />
        </Tabs.Panel>
        {OVERLAY_TABS.slice(1)?.map((item, i) => (
          <Tabs.Panel key={i} value={item} pt="xs">
            <div className="text-center p-4">
              This feature is temporarily disabled
            </div>
          </Tabs.Panel>
        ))}
      </Tabs>
    </div>
  );
};

Overlay.getLayout = DashboardLayout;

export default Overlay;

const PanelAlert = () => {
  return (
    <div className="pb-32">
      <CardLayout title="Rules">
        <div className="flex space-x-2">
          Turn on gif:
          <Checkbox className="ml-4" />
        </div>
        <br />
        Minimum:
        <br />
        <div className="flex">
          <div className="my-2  bg-slate-700  p-4 rounded-md">
            TFUEL and other TNT-20 will use approximate current price in USD
          </div>
        </div>
        <br />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-8 md:w-2/5 ">
          <div className="col-span-1 ">
            <NumberInput
              value={1}
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              formatter={(value) =>
                !Number.isNaN(parseFloat(value))
                  ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                  : "$ "
              }
              //   value={1}
              label="Alert Notification"
            />
          </div>
          <div className="col-span-1">
            <NumberInput
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              formatter={(value) =>
                !Number.isNaN(parseFloat(value))
                  ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                  : "$ "
              }
              value={5}
              label="GIF / Media Share"
            />
          </div>
          <div className="col-span-1">
            <NumberInput
              value={5}
              label="Text to Speech"
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              formatter={(value) =>
                !Number.isNaN(parseFloat(value))
                  ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                  : "$ "
              }
              //   value={1}
            />
          </div>
        </div>
        <br />
        <span className="text-orange-500">
          *custom token that are not in the{" "}
          <a className="text-blue-500">list</a> must be send with pair token
        </span>
        {/* minimum pair custom */}
        {/* custom crypto will show differently  */}
      </CardLayout>
      <CardLayout title="Sound">
        <div className="flex mt-4 items-end">
          <Select
            defaultValue="default"
            data={[
              { value: "default", label: "default" },
              { value: "male", label: "male" },
            ]}
            label="Variant voice text to speech"
          />
          <Button className="bg-slate-500 ml-4 ">Try the voice!</Button>
        </div>
        <div className="flex mt-4 items-end">
          <FileInput
            // className="bg-slate-400"
            label="Notification Alert Sound"
            placeholder="Upload file"
            icon={<IconUpload size={14} />}
          />
          <Button className="bg-red-500 ml-4 ">Ring the bell!</Button>
        </div>
      </CardLayout>
      <CardLayout title="Filter Text">
        <span className="text-orange-500">
          *Sponsor messages and sponsor names will not be displayed if they
          contain the words below.
        </span>
        <div className="flex mt-4 items-end">
          <MultiSelect
            data={["Bad Words", "F*k", "Shit", "ABC", "noob"]}
            defaultValue={["noob", "F*k"]}
            //   placeholder="Pick all you like"
            label="Default Banned words"
            //   withAsterisk
          />
        </div>
        <div className="flex mt-4 items-end">
          <Textarea label="Custom banned words, separate it with space" />
        </div>
      </CardLayout>

      <div
        style={{ fontSize: 60 }}
        className={`my-4 bg-red-400 p-4 rounded-sm text-center`}
      >
        <div style={{ fontSize: 60 }}>
          <span>Sponsor</span>&nbsp; just donate you <span>$100</span>
        </div>
        Keep going 🔥
      </div>

      <CardLayout title="Appearance">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-8 md:w-2/3 ">
          <div className="col-span-1 ">
            Background Color
            <TextInput label="Hex color" />
            <br />
            <ColorPicker format="rgba" />
          </div>
          <div className="col-span-1 ">
            Highlight Color
            <TextInput label="Hex color" />
            <br />
            <ColorPicker format="rgba" />
          </div>
          <div className="col-span-1 ">
            Text Color
            <TextInput label="Hex color" />
            <br />
            <ColorPicker format="rgba" />
          </div>
        </div>
        <br />
        <div className="flex mt-4 space-x-2">
          <TextInput label="Template text" value="just donate you" />
          <TextInput label="Duration Notification (ms)" />
          <TextInput label="Boldness" />
          <TextInput label="Font Family" />
        </div>
      </CardLayout>

      <div>
        <div className="font-bold text-xl">URL: </div>
        <div className="flex md:w-2/3">
          Click the Copy button and paste the URL in the OBS "Browser Module".
          NEW After changing the view, double click on the browser source on OBS
          and press "Refresh cache of current page". If it doesn't appear, make
          sure OBS has been updated to the latest version (v28).
        </div>
        <br />
        <div className="my-2  bg-slate-700  p-4 rounded-md">
          https://theras.xyz/widget/mockuser
        </div>
        <br />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-2 !uppercase">
          <Button size="xl" className="bg-purple-500 uppercase col-span-1 ">
            Copy
          </Button>
          <Button size="xl" className="bg-green-500 uppercase ">
            Open in new tab
          </Button>
          <div className="col-span-1">
            <Button size="xl" className="bg-red-500 uppercase w-full">
              Show Notification
            </Button>
            <br />
            <div className="text-orange-700">
              *brave browser & safari can have issue on testing this feature,
              trying it on chrome is recommended. but dont worry on OBS it will
              works 😉
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
