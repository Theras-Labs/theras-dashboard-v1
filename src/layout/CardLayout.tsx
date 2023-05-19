import { Button, Divider } from "@mantine/core";
import React from "react";

export default function CardLayout({ title, children, onSave }) {
  return (
    <div className="rounded-md bg-secondary-gray p-6 mb-4 ">
      <div className="font-bold text-xl flex justify-between items-center">
        {title}
        <Button onClick={onSave} className="bg-indigo-600">
          Save
        </Button>
      </div>
      <Divider className="my-2" />

      {children}
      <br />
      <br />
    </div>
  );
}
