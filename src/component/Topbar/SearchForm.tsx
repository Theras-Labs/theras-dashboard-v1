import { Autocomplete } from "@mantine/core";
import React, { FC } from "react";
import { Search } from "tabler-icons-react";

const SearchForm: FC = () => {
  return (
    <Autocomplete
      data={[]}
      size="lg"
      placeholder="Search"
      icon={<Search size={18} />}
      styles={{
        root: { flexGrow: 1 },
        input: { border: 0, backgroundColor: "transparent" },
      }}
      onChange={(value) => {
        console.log(value);
      }}
    />
  );
};

export default SearchForm;
