import { AspectRatio, Group, Title, Image, Space, Text, Loader, Center, Container, useMantineColorScheme, Button, Stack } from "@mantine/core";
import { HelixPaginatedResult, HelixVideo } from "@twurple/api/lib";
import { HelixVideoData } from "@twurple/api/lib/api/helix/video/HelixVideo";
import { rawDataSymbol } from "@twurple/common";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import VodView from "../../components/VodView";
import VodViewHeader from "../../components/VodViewHeader";
import { searchParameters } from "../../lib/interfaces";

export default function GameVodView() {
	const [searchParameters, setsearchParameters] = useState<searchParameters>({
		language: 'en',
		sortBy: 'time',
		period: 'all',
		vodType: 'all'
	})
	const [vodResults, setVodResults] = useState<HelixVideoData[]>([]);
	const [filteredResults, setFilteredResults] = useState<HelixVideoData[]>([])
	const [nameFilter, setNameFilter] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();
	const { gameName } = router.query;

	const { colorScheme } = useMantineColorScheme()

	async function getVods(gameName: string, searchParameters: searchParameters) {
		setIsLoading(true);
		const vods = await fetch(`/api/vods/game/${gameName}?` + new URLSearchParams({
			language: searchParameters.language,
			sortBy: searchParameters.sortBy,
			period: searchParameters.period,
			vodType: searchParameters.vodType
		}))
		const vodData: HelixVideoData[] = await vods.json();
		setVodResults(vodData);
		setIsLoading(false);
	}
	
	useEffect(() => {
		if (nameFilter != '') {
			setFilteredResults(vodResults.filter(vod => vod.user_name.toLowerCase().includes(nameFilter.toLowerCase())));
		}
		else {
			setFilteredResults(vodResults);
		}
	}, [nameFilter, vodResults])

	//Load vods on page load, and when search parameters or game name changes
	useEffect(() => {
		if (router.isReady) {
			if (vodResults.length != 0) {
				setVodResults([]);
			}
			getVods(gameName as string, searchParameters)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.isReady, gameName, searchParameters])

	return <Stack sx={{height: "100vh"}} spacing={0}>
		<VodViewHeader searchParameters={searchParameters} setsearchParameters={setsearchParameters} nameFilter={nameFilter} setNameFilter={setNameFilter} nameList={(() => {
			let names: string[] = []
			vodResults.forEach(vod => {
				if (!names.includes(vod.user_name)) {
					names.push(vod.user_name)
				}
			})
			return names
		})()}/>
		<div style={{backgroundColor: colorScheme === 'dark' ? '#1a1b1e' : '#f2f2f2', flexGrow: 1, padding: 20}}>
		{
			isLoading ?
			<Center sx={{height: "50%"}}>
				<Stack align={'center'}>
					<Title>Fetching VODs...</Title>
					<Loader size={'xl'}/>
				</Stack>
			</Center>
			:
			vodResults.length != 0 
			?
			<Stack style={{width: "75%", margin: "0 auto"}}>
				<VodView vodList={filteredResults}/>
			</Stack>
			:
			<Title align="center">No VODs found for this game</Title>
		}
		</div>
	</Stack>
}