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
  Overlay,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useNotif } from "src/store/useNotif";
import { useProgress } from "src/store/useProgress";
import CardLayout from "src/layout/CardLayout";
import { IconUpload } from "@tabler/icons-react";
import { db } from "../../firebase.config";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  addDoc,
} from "firebase/firestore";
import { useUserDataStore } from "src/store/useUserDetail";
import { notifications } from "@mantine/notifications";
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

const allowedCharactersRegex = /^[a-zA-Z0-9@$-_]*$/;
const OverlayHandler = ({ userID = "", onClose = () => {} }) => {
  const [handler, setHandler] = useState("");
  //   const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { setProfile, loading } = useUserDataStore();

  return (
    <Overlay
      className="flex flex-col justify-center items-center fixed"
      color="#000"
      opacity={0.85}
    >
      You haven't create a handler or username
      <br />
      <br />
      <div className="flex items-start">
        <TextInput
          error={error}
          placeholder="@cool_handler"
          value={handler}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (!allowedCharactersRegex.test(inputValue)) {
              setError("Handler contains disallowed characters.");
            } else {
              setError("");
              setHandler(inputValue);
            }
          }}
          //   label={"handler name"}
        />
        <Button
          loading={loading}
          onClick={async (e) => {
            if (allowedCharactersRegex.test(handler)) {
              setHandler(handler);
              setError("");

              // Check if handler is already used in Firestore
              const querySnapshot = await getDocs(
                query(
                  collection(db, "handlers"),
                  where("handler", "==", handler)
                )
              );

              if (!querySnapshot.empty) {
                setError("Handler is already in use.");
              } else {
                setProfile(handler, userID);
                notifications.show({
                  title: "Successfully updating handler",
                  message: `Your handler is ${handler} now`,
                });
              }
            } else {
              setError("Handler contains disallowed characters.");
            }
          }}
          className="ml-2"
        >
          Submit
        </Button>
      </div>
    </Overlay>
  );
};
const OverlayPage: CustomNextPage = () => {
  const [isOverlay, setOverlay] = useState(false);
  const { userID, handler } = useUserDataStore();

  return (
    <div className="">
      {!handler && (
        <OverlayHandler
          {...{
            userID,
            onClose: () => setOverlay(false),
          }}
        />
      )}
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

OverlayPage.getLayout = DashboardLayout;

export default OverlayPage;

const PanelAlert = () => {
  const { handler, handlerID } = useUserDataStore();
  console.log(handlerID, "handlerID");
  const url_params = `https://theras.xyz/widget/${handler}`;
  const [appearance, setAppearance] = useState({
    bg_color: "",
    text_color: "",
  });
  const [value, onChange] = useState("rgba(47, 119, 150, 0.7)");

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
          <Select
            defaultValue="cena"
            data={[
              { value: "cena", label: "john cena" },
              { value: "default", label: "default" },
            ]}
            label="Variant alert sound"
          />
          <FileInput
            className="ml-2"
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

      <CardLayout title="Select overlay from NFT">Coming Soon</CardLayout>
      <div
        style={{ fontSize: 60, background: value }}
        className={`my-4  p-4 rounded-sm text-center`}
      >
        <div style={{ fontSize: 60 }}>
          <span>Sponsor</span>&nbsp; just donate you <span>$100</span>
        </div>
        Keep going 🔥
      </div>

      <CardLayout
        onSave={async () => {
          try {
            const q = query(
              collection(db, "handler"),
              where("handler", "==", handler)
            );
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
              // Retrieve the first document from the query result
              const documentSnapshot = querySnapshot.docs[0];
              const documentRef = doc(db, "handler", documentSnapshot.id);

              await setDoc(
                documentRef,
                {
                  appearance: {
                    bg_color: value,
                  },
                },
                { merge: true }
              );

              notifications.show({
                title: "Save appearance",
                message: `Succesfull saving new appearance `,
              });
            } else {
              console.log("No document found for the provided username.");
            }
          } catch (error) {
            console.error("Error updating document:", error);
            notifications.show({
              title: "Error",
              message: `Error saving new appearance `,
            });
          }
        }}
        title="Appearance"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-8 md:w-2/3 ">
          <div className="col-span-1 ">
            Background Color
            <TextInput label="Hex color" />
            <br />
            <ColorPicker format="rgba" value={value} onChange={onChange} />
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
          https://theras.xyz/widget/{handler}
        </div>
        <br />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-2 !uppercase">
          <Button
            onClick={() => {
              notifications.show({
                title: "Success",
                message: `Copied ${url_params}`,
              });
            }}
            size="xl"
            className="bg-purple-500 uppercase col-span-1 "
          >
            Copy
          </Button>
          <Button size="xl" className="bg-green-500 uppercase ">
            <a href={url_params} target="_blank" rel="noreferrer">
              Open in new tab
            </a>
          </Button>
          <div className="col-span-1">
            <Button
              onClick={async () => {
                //push notification
                const collectionPath = "widget-msg"; // Replace "collectionName" with the name of your Firestore collection
                const newData = {
                  message: "Keep going, i love you",
                  to: handler,
                  read: false,
                  test: true,
                  value: 1000,
                  payment: "card", // card | token | nft
                  from: "self",
                  createdAt: Math.floor(Date.now() / 1000),
                  // tx_hash:
                  // Add more fields and values as needed
                };
                try {
                  const docRef = await addDoc(
                    collection(db, collectionPath),
                    newData
                  );
                  console.log("Document created with ID: ", docRef.id);
                  //   set({ handler, handlerID: docRef.id });
                } catch (error) {
                  console.error("Error creating document: ", error);
                }

                notifications.show({
                  message: `Sending notification `,
                });
              }}
              size="xl"
              className="bg-red-500 uppercase w-full"
            >
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

// {anonymous_label: "Seseorang", background_color: "", css: "", duration: "5000", highlight_color: "",…}
