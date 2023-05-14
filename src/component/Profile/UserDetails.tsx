import React from "react";
import { UserProfile } from "src/component/Topbar";

const UserDetails = () => {
  return (
    <UserProfile
      image={data?.user?.image}
      name={"Siyabonga Ngcobo"}
      walletAddress={"0x151F1814c5211dB47b868481f4cff3ee2E636f51"}
    />
  );
};

export default UserDetails;
