import { ApiClient, HelixGame } from '@twurple/api/lib';
import { ClientCredentialsAuthProvider } from '@twurple/auth/lib'
import 'dotenv/config'


const clientId: string = process.env.CLIENT_ID ?? '';
const clientSecret: string = process.env.CLIENT_SECRET ?? '';

const authProvider = new ClientCredentialsAuthProvider(clientId, clientSecret);

const apiClient = new ApiClient({ authProvider });

async function getGame(gameName: string) {
	const game = await apiClient.games.getGameByName(gameName);
	return game ?? undefined;
}

async function getGameVods(game: HelixGame, language: string, sortBy: string, period: string, type: string) {
	const vods = await apiClient.videos.getVideosByGame(game.id, {
		//search opts
	});
	return vods
}