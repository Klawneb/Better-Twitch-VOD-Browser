import {
  Center,
  Stack,
  Title,
  Text,
  Group,
  Anchor,
  Avatar,
  MediaQuery,
} from '@mantine/core';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import DarkModeSwitch from '../components/DarkModeSwitch';
import MainSearchBar from '../components/MainSeachBar';
import TwitchSignInButton from '../components/TwitchSignInButton';

function Home() {
  const session = useSession();

  return (
    <Center sx={{ height: '100vh'}}>
		<MediaQuery smallerThan={'sm'} styles={{ display: 'none' }}>
			<Stack align="center" sx={{width: "25%", minWidth: "500px"}}>
				<Title>Better Twitch VOD Browser</Title>
				<MainSearchBar/>
				{session.data ? (
				<Group position="apart" grow sx={{ width: '100%' }}>
					<Group position="right">
					<Avatar radius={'lg'} src={session.data.user?.image} />
					<Link
						href={`https://twitch.tv/${session.data.user?.name}`}
						passHref
					>
						<Anchor component="a" align="end">
						{session.data.user?.name}
						</Anchor>
					</Link>
					</Group>
					<Link href={'/followed'}>
					<Anchor component="a" align="center">
						Followed VODs
					</Anchor>
					</Link>
					<Text
					variant="link"
					onClick={() => signOut()}
					align="start"
					sx={{ cursor: 'pointer' }}
					>
					Sign Out
					</Text>
				</Group>
				) : (
				<Group>
					<TwitchSignInButton />
					<Text align="center">to get followed streamer VODs</Text>
				</Group>
				)}
				<DarkModeSwitch />
			</Stack>
		</MediaQuery>

		<MediaQuery largerThan={'sm'} styles={{ display: 'none' }}>
			<Stack align="center" >
				<Text weight={'bolder'} size={28}>Better Twitch VOD Browser</Text>
				<MainSearchBar/>
				{session.data ? (
				<Stack align={'center'} sx={{ width: '100%' }}>
					<Group position="center">
					<Avatar radius={'lg'} src={session.data.user?.image} />
					<Link
						href={`https://twitch.tv/${session.data.user?.name}`}
						passHref
					>
						<Anchor component="a" align="end">
						{session.data.user?.name}
						</Anchor>
					</Link>
					</Group>
					<Link href={'/followed'}>
					<Anchor component="a" align="center">
						Followed VODs
					</Anchor>
					</Link>
					<Text
					variant="link"
					onClick={() => signOut()}
					align="start"
					sx={{ cursor: 'pointer' }}
					>
					Sign Out
					</Text>
				</Stack>
				) : (
				<Group>
					<TwitchSignInButton />
					<Text align="center">to get followed streamer VODs</Text>
				</Group>
				)}
				<DarkModeSwitch />
			</Stack>
		</MediaQuery>
    </Center>
  );
}

export default Home;
