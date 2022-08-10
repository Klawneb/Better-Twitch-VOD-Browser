import { ApiClient, HelixGame } from '@twurple/api/lib';
import { ClientCredentialsAuthProvider } from '@twurple/auth/lib'
import 'dotenv/config'
import { searchProperties } from './interfaces';


const clientId: string = process.env.CLIENT_ID ?? '';
const clientSecret: string = process.env.CLIENT_SECRET ?? '';

const authProvider = new ClientCredentialsAuthProvider(clientId, clientSecret);

const apiClient = new ApiClient({ authProvider });

async function getGame(gameName: string) {
	const game = await apiClient.games.getGameByName(gameName);
	return game ?? undefined;
}

async function getGameVods(game: HelixGame, searchProperties: searchProperties) {
	const vods = await apiClient.videos.getVideosByGame(game.id, {
		language: searchProperties.language,
		period: searchProperties.period,
		type: searchProperties.vodType,
		orderBy: searchProperties.sortBy	
	});
	return vods
}