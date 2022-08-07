// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import jsonfile from 'jsonfile';

interface Game {
  id: string,
  name: string,
  box_art_url: string
}

const game_info: Game[] = jsonfile.readFileSync('./data/game_info.json');
const game_names = game_info.map(game => game.name);

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) {
  res.status(200).json(game_names);
}
