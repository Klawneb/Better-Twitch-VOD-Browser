import type { NextApiRequest, NextApiResponse } from 'next';
import jsonfile from 'jsonfile';

interface Game {
  id: string;
  name: string;
  box_art_url: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) {
  let response = await fetch('https://raw.githubusercontent.com/Nerothos/TwithGameList/master/game_info.json');
  let game_names: Game[] = await response.json()
  res.status(200).json(game_names.map(game => game.name));
}
