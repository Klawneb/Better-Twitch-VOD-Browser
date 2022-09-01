import { ApiClient, HelixGame, HelixUser } from '@twurple/api';
import { ClientCredentialsAuthProvider } from '@twurple/auth';
import { rawDataSymbol } from '@twurple/common';
import 'dotenv/config';
import { searchParameters, VodType } from './interfaces';

const clientId: string = process.env.CLIENT_ID ?? '';
const clientSecret: string = process.env.CLIENT_SECRET ?? '';

const authProvider = new ClientCredentialsAuthProvider(clientId, clientSecret);

const apiClient = new ApiClient({ authProvider });

export async function getGame(gameName: string) {
  const game = await apiClient.games.getGameByName(gameName);
  return game ?? undefined;
}

export async function getGameVods(
  game: HelixGame,
  searchParameters: searchParameters
) {
  const vods = await apiClient.videos
    .getVideosByGamePaginated(game.id, {
      language: searchParameters.language,
      period: searchParameters.period,
      type: searchParameters.vodType,
      orderBy: searchParameters.sortBy,
    })
    .getAll();
  return vods;
}

export async function getUser(userName: string) {
  const user = await apiClient.users.getUserByName(userName);
  return user ?? undefined;
}

export async function getUserVods(
  user: HelixUser,
  searchParameters: searchParameters
) {
  const vods = await apiClient.videos
    .getVideosByUserPaginated(user.id, {
      language: searchParameters.language,
      period: searchParameters.period,
      type: searchParameters.vodType,
      orderBy: searchParameters.sortBy,
    })
    .getAll();
  return vods;
}

export async function getUserVodsLimited(
  user: HelixUser,
  limit: number,
  type: VodType
) {
  const vods = await apiClient.videos.getVideosByUser(user, {
    limit,
    type,
  });
  return vods.data.map((vod) => vod[rawDataSymbol]);
}

export async function getFollowedUsers(user: HelixUser) {
  const followed: string[] = [];
  let followRes = await apiClient.users.getFollows({
    user: user,
    limit: 10,
  });
  followRes.data.forEach((follow) => followed.push(follow.followedUserName));
  while (followRes.cursor) {
    followRes = await apiClient.users.getFollows({
      after: followRes.cursor,
      user: user,
      limit: 100,
    });
    followRes.data.forEach((follow) => followed.push(follow.followedUserName));
  }
  return followed;
}
