import { Center, Stack, Title, Text, Switch, useMantineColorScheme} from '@mantine/core'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import MainSearchBar from './components/MainSeachBar'

function Home() {
	return (
		<Center sx={{ height: "100vh"}}>
			<Stack>
				<Title>Better Twitch VOD Browser</Title>
				<MainSearchBar/>
				<Text align='center'>Login with Twitch to get followed streamer VODs</Text>
				<Switch />
			</Stack>
		</Center>
	)
}

export default Home
