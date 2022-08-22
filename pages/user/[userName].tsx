import { AspectRatio, Group, Title, Image, Space, Text, Loader, Center, Container, useMantineColorScheme, Button, Stack } from "@mantine/core";
import { HelixPaginatedResult, HelixVideo } from "@twurple/api/lib";
import { HelixVideoData } from "@twurple/api/lib/api/helix/video/HelixVideo";
import { rawDataSymbol } from "@twurple/common";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import VodView from "../../components/VodView";
import VodViewHeader from "../../components/VodViewHeader";
import { searchParameters } from "../../lib/interfaces";

export default function UserVodView() {
	const [searchParameters, setsearchParameters] = useState<searchParameters>({
		language: 'en',
		sortBy: 'time',
		period: 'all',
		vodType: 'all'
	})
	const [vodResults, setVodResults] = useState<HelixVideoData[]>([]);
	const [filteredResults, setFilteredResults] = useState<HelixVideoData[]>([])
	const [currentPage, setCurrentPage] = useState<HelixVideoData[]>([]);
	const [gameFilter, setGameFilter] = useState('');
	const [pageNo, setPageNo] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();
	const { userName } = router.query;

	const { colorScheme } = useMantineColorScheme()

	async function getVods(userName: string, searchParameters: searchParameters) {
		setIsLoading(true);
		const vods = await fetch(`/api/vods/user/${userName}?` + new URLSearchParams({
			language: searchParameters.language,
			sortBy: searchParameters.sortBy,
			period: searchParameters.period,
			vodType: searchParameters.vodType
		}))
		const vodData: HelixVideoData[] = await vods.json();
		setVodResults(vodData);
		setIsLoading(false);
	}

	//Only display 20 vods at a time, based on page number
	useEffect(() => {
		setCurrentPage(filteredResults.filter((vod, index) => index < (pageNo * 20) && index >= ((pageNo - 1) * 20)));
	}, [filteredResults, pageNo])

	useEffect(() => {
		if (gameFilter != '') {
			setFilteredResults(vodResults.filter(vod => vod.user_name.toLowerCase().includes(gameFilter.toLowerCase())));
		}
		else {
			setFilteredResults(vodResults);
		}
	}, [gameFilter, vodResults])

	//Load vods on page load, and when search parameters or game name changes
	useEffect(() => {
		if (router.isReady) {
			if (vodResults.length != 0) {
				setVodResults([]);
			}
			getVods(userName as string, searchParameters)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.isReady, userName, searchParameters])

	return <Stack sx={{height: "100vh"}} spacing={0}>
		<VodViewHeader searchParameters={searchParameters} setsearchParameters={setsearchParameters} nameFilter={gameFilter} setNameFilter={setGameFilter} nameList={(() => {
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
				<VodView vodList={currentPage}/>
				<Group position="apart">
					<Button disabled={pageNo === 1} onClick={() => {
						setPageNo(prevState => prevState - 1);
					}}>Previous Page</Button>
					<Text>Page {pageNo}</Text>
					<Button onClick={() => {
						setPageNo(prevState => prevState + 1);
					}}>Next Page</Button>
				</Group>
			</Stack>
			:
			<Title align="center">No VODs found for this user</Title>
		}
		</div>
	</Stack>
}