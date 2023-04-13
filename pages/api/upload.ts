import { NextApiRequest, NextApiResponse } from "next";
import { HingleDateMatcher } from "../../lib/dating";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { startDate = undefined, matchData = {}, userData = {} } = req?.body;
  const _startDate = startDate ? new Date(startDate) : undefined;

  const data = {
    ...HingleDateMatcher(matchData, _startDate),
    first_name: userData?.profile?.first_name,
  };

  res.status(200).json({ data });
}
