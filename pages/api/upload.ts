import { NextApiRequest, NextApiResponse } from "next";
import { HingleDateMatcher } from "../../lib/dating";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { startDate = undefined, matchData = {}, userData = {}, images ={} } = req?.body;
  const _startDate = startDate ? new Date(startDate) : undefined;
  const filteredImages = images.filter(({type}: any) => type === "photo");

  const data = {
    ...HingleDateMatcher(matchData, _startDate),
    first_name: userData?.profile?.first_name,
    image: filteredImages[filteredImages.length -1].url
  };

  res.status(200).json({ data });
}
