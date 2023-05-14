// import { db } from "../../../firebase.config";
import db from "../db";
export const config = { api: { bodyParser: false } };
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const docData = {
        category_title: "Bootstrap 4 Intoduction",
        description:
          "Bootstrap 4 is an awesome CSS Framework that makes the creation of good-looking web apps simple. We'll take a closer look at the core concepts + the setup in this video.",
        headline_image:
          "https://getbootstrap.com/docs/5.3/assets/img/bootstrap-icons.png",
        membership_type: "basic",
      };
      const collectionRef = db.collection("category-courses");
      const docRef = await collectionRef.add(docData);

      res
        .status(200)
        .json({ message: `New document created with ID: ${docRef.id}` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
