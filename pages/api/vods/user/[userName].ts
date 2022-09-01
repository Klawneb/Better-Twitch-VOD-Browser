import { rawDataSymbol } from '@twurple/common';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  Period,
  searchParameters,
  SortBy,
  VodType,
} from '../../../../lib/interfaces';
import {
  getUserVods,
  getUser,
} from '../../../../lib/twitch';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userName, language, sortBy, period, vodType } = req.query;
  const user = await getUser(userName as string);
  const searchParameters: searchParameters = {
    language: language as string,
    sortBy: sortBy as SortBy,
    period: period as Period,
    vodType: vodType as VodType,
  };

  if (user) {
    let vods = await getUserVods(user, searchParameters);
    res.status(200).json(vods.map((vod) => vod[rawDataSymbol]));
  } else {
    res.status(400).send('Invalid Parameters');
  }
}
