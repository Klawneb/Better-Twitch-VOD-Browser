import { ApiClient, HelixGame } from '@twurple/api';
import { ClientCredentialsAuthProvider } from '@twurple/auth'
import 'dotenv/config'
import { searchParameters } from './interfaces';


const clientId: string = process.env.CLIENT_ID ?? '';
const clientSecret: string = process.env.CLIENT_SECRET ?? '';

const authProvider = new ClientCredentialsAuthProvider(clientId, clientSecret);

const apiClient = new ApiClient({ authProvider });

export async function getGame(gameName: string) {
	const game = await apiClient.games.getGameByName(gameName);
	return game ?? undefined;
}

export async function getGameVods(game: HelixGame, searchParameters: searchParameters) {
	const vods = await apiClient.videos.getVideosByGamePaginated(game.id, {
		language: searchParameters.language,
		period: searchParameters.period,
		type: searchParameters.vodType,
		orderBy: searchParameters.sortBy	
	}).getAll();
	return vods
}