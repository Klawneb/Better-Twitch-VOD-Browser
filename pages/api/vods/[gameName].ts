import { rawDataSymbol } from '@twurple/common';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Period, searchParameters, SortBy, VodType } from '../../../lib/interfaces';
import { getGameVods, getGame, getGameVodsBefore, getGameVodsAfter } from '../../../lib/twitch';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
	const { gameName, language, sortBy, period, vodType, before, after } = req.query;
	const game = await getGame(gameName as string);
	const searchParameters: searchParameters = {
		language: language as string,
		sortBy: sortBy as SortBy,
		period: period as Period,
		vodType: vodType as VodType
	}
	let vods;
	if (game) {
		if (before) {
			vods = await getGameVodsBefore(game, searchParameters, before as string);
		}
		else if (after) {
			vods = await getGameVodsAfter(game, searchParameters, after as string);
		}
		else {
			vods = await getGameVods(game, searchParameters);
		}
		res.status(200).json({ 
			cursor: vods.cursor,
			data: vods.data.map(vod => vod[rawDataSymbol])
		});
	} 
	else {
		res.status(400).send("Invalid Parameters")
	}
}