import type { NextApiRequest, NextApiResponse } from 'next';
import jsonfile from 'jsonfile';

interface Game {
  id: string,
  name: string,
  box_art_url: string
}

const game_info: Game[] = jsonfile.readFileSync('./data/game_info.json');

function getBoxArtURL(gameName: string): string {
	const game = game_info.find(game => game.name === gameName)
	return game?.box_art_url ?? ''
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | undefined>
) {
  const { gameName } = req.query;
  let boxArt = getBoxArtURL(gameName as string ?? '');
  boxArt = boxArt.replace('{width}', '600');
  boxArt = boxArt.replace('{height}', '800');
  res.json(boxArt)
}
