// import { db } from "../../../firebase.config";
import db from "../db";
export const config = { api: { bodyParser: false } };
import { NextApiRequest, NextApiResponse } from "next";

const COURSES = [] as any;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const promises = COURSES.map(async (docData: any) => {
        const collectionRef = db.collection("courses");
        const docRef = await collectionRef.add(docData);
        console.log(` category_id: ${docRef.id}`);
      });

      await Promise.all(promises);
      res.status(200).json({ message: `New courses document` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
