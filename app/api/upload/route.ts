import { NextApiRequest, NextApiResponse } from "next";
import { HingleDateMatcher } from "../../../lib/dating";

export async function POST(
  request: Request,
) {
  const res = await request.json()
  const { startDate = undefined, matchData = {}, userData = {}, images ={} } = res;
  const _startDate = startDate ? new Date(startDate) : undefined;
  const filteredImages = images.filter(({type}: any) => type === "photo");

  const data = {
    //@ts-ignore
    ...HingleDateMatcher(matchData, _startDate),
    first_name: userData?.profile?.first_name,
    image: filteredImages[filteredImages.length -1].url
  };

  return Response.json({ data });
}
