import type { NextApiRequest, NextApiResponse } from 'next';
import { getUser, getUserVodsLimited } from '../../../../../../lib/twitch';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
  ) {
	  const { userName, limit} = req.query;
	  const user = await getUser(userName as string);
  
	  if (user) {
		  let vods = await getUserVodsLimited(user, Number(limit as string), 'archive');
		  res.status(200).json(
			  vods
		  );
	  } 
	  else {
		  res.status(400).send("Invalid Parameters")
	  }
  }