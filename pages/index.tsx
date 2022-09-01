import { Center, Stack, Title, Text, Switch, useMantineColorScheme, Group, Anchor, Avatar} from '@mantine/core'
import type { NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import DarkModeSwitch from '../components/DarkModeSwitch'
import MainSearchBar from '../components/MainSeachBar'
import TwitchSignInButton from '../components/TwitchSignInButton'

function Home() {
	const session = useSession();

	return (
		<Center sx={{ height: "100vh"}}>
			<Stack align='center'>
				<Title>Better Twitch VOD Browser</Title>
				<MainSearchBar width='125%'/>
				{
					session.data ?
					<Group position='apart' grow sx={{width: "125%"}}>
						<Group position='right'>
							<Avatar radius={'lg'} src={session.data.user?.image}/>
							<Link href={`https://twitch.tv/${session.data.user?.name}`} passHref>
								<Anchor component='a' align='end'>{session.data.user?.name}</Anchor>
							</Link>
						</Group>
						<Link href={"/followed"}>
							<Anchor component='a' align='center'>Followed VODs</Anchor>
						</Link>
						<Text variant='link' onClick={() => signOut()} align='start' sx={{cursor: "pointer"}}>Sign Out</Text>
					</Group>
					:
					<Group>
						<TwitchSignInButton/>
						<Text align='center'>to get followed streamer VODs</Text>
					</Group>
				}
				<DarkModeSwitch/>
			</Stack>
		</Center>
	)
}

export default Home
