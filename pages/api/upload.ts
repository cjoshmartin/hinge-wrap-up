import AdmZip from "adm-zip";
import multer from "multer";
import nextConnect from "next-connect";
import { HingleDateMatcher } from "../../lib/dating";

const storage = multer.memoryStorage(); // Memory Storage option pass along as stream
const upload = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `There was an error! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single("file"));

apiRoute.post((req, res) => {
  const file = req?.file;
  if (file?.mimetype !== "application/zip") {
    return res.status(400).send({ message: "Wrong file type" });
  }
  const file_looking_for = ["matches.json"];

  const zip = new AdmZip(file?.buffer);
  const zipEntries = zip
    .getEntries()
    .filter(({ entryName }) =>
      file_looking_for.some((file) => entryName.includes(file))
    );
  //   zipEntries.forEach((entry) => {
  //     const buf = entry.getData();
  //     const match_data = JSON.parse(buf.toString());

  //     console.log(HingleDateMatcher(match_data))
  //   });

  const entry = zipEntries[0];
  const buf = entry.getData();
  const match_data = JSON.parse(buf.toString());

  const data = HingleDateMatcher(match_data)

  res.status(200).json({ data });
});

export default apiRoute;
