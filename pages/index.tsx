import { Center, Stack, Title, Text, Switch, useMantineColorScheme, Group, Anchor} from '@mantine/core'
import type { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import DarkModeSwitch from '../components/DarkModeSwitch'
import MainSearchBar from '../components/MainSeachBar'

function Home() {
	const session = useSession();

	return (
		<Center sx={{ height: "100vh"}}>
			<Stack align='center'>
				<Title>Better Twitch VOD Browser</Title>
				<MainSearchBar width='125%'/>
				{
					session ?
					<Group position='apart' grow sx={{width: "125%"}}>
						<Text  align="center">Signed in as {session.data?.user?.name}</Text>
						<Link href={"/followed"}>
							<Anchor component='a' align='center'>Followed VODs</Anchor>
						</Link>
						<Text variant='link' align='center' sx={{cursor: "pointer"}}>Sign Out</Text>
					</Group>
					:
					<Text align='center'><Text onClick={() => signIn()} underline component='span'>Login with Twitch</Text> to get followed streamer VODs</Text>
				}
				<DarkModeSwitch/>
			</Stack>
		</Center>
	)
}

export default Home
