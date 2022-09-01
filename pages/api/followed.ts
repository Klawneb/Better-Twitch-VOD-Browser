import type { NextApiRequest, NextApiResponse } from 'next';
import { getFollowedUsers, getUser } from '../../lib/twitch';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
  ) {
	const { userName } = req.query;
	const user = await getUser(userName as string);
	if (user) {
		const followed = await getFollowedUsers(user);
		res.status(200).json(followed);
	}
	else {
		res.status(400).send("Invalid User");
	}
  }