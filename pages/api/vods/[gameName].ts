import { rawDataSymbol } from '@twurple/common';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Period, searchParameters, SortBy, VodType } from '../../../lib/interfaces';
import { getGameVods, getGame } from '../../../lib/twitch';


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
	(async () => {
		const { gameName, language, sortBy, period, vodType } = req.query;
		const game = await getGame(gameName as string);
		const searchParameters: searchParameters = {
			language: language as string,
			sortBy: sortBy as SortBy,
			period: period as Period,
			vodType: vodType as VodType
		}

		if (game) {
			const vods = await getGameVods(game, searchParameters)
			res.status(200).json(vods.data.map(vod => vod[rawDataSymbol]));
		} else {
			res.status(400).send("Invalid Parameters")
		}
	})();
}