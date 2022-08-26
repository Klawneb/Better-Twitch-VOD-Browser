import { Center, Stack, Title, Text, Switch, useMantineColorScheme} from '@mantine/core'
import type { NextPage } from 'next'
import { signIn } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import DarkModeSwitch from '../components/DarkModeSwitch'
import MainSearchBar from '../components/MainSeachBar'

function Home() {
	return (
		<Center sx={{ height: "100vh"}}>
			<Stack align='center'>
				<Title>Better Twitch VOD Browser</Title>
				<MainSearchBar width='125%'/>
				<Text align='center'><Text onClick={() => signIn()} underline component='span'>Login with Twitch</Text> to get followed streamer VODs</Text>
				<DarkModeSwitch/>
			</Stack>
		</Center>
	)
}

export default Home
