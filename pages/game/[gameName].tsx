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
	const { colorScheme } = useMantineColorScheme()
	const [vodResults, setVodResults] = useState<HelixVideoData[]>([])
	const [paginationToken, setPaginationToken] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const { gameName } = router.query;
	const [pageNo, setPageNo] = useState(1);

	async function getVods(gameName: string, searchParameters: searchParameters) {
		setIsLoading(true);
		const vods = await fetch(`/api/vods/${gameName}?` + new URLSearchParams({
			language: searchParameters.language,
			sortBy: searchParameters.sortBy,
			period: searchParameters.period,
			vodType: searchParameters.vodType
		}))
		const vodData: HelixPaginatedResult<HelixVideoData> = await vods.json()
		setVodResults(vodData.data);
		setPaginationToken(vodData.cursor ?? '');
		setIsLoading(false);
	}

	async function getVodsAfter(gameName: string, searchParameters: searchParameters, paginationToken: string) {
		setIsLoading(true);
		const vods = await fetch(`/api/vods/${gameName}?` + new URLSearchParams({
			language: searchParameters.language,
			sortBy: searchParameters.sortBy,
			period: searchParameters.period,
			vodType: searchParameters.vodType,
			after: paginationToken
		}))
		const vodData: HelixPaginatedResult<HelixVideoData> = await vods.json()
		setVodResults(vodData.data);
		setPaginationToken(vodData.cursor ?? '');
		setIsLoading(false);
	}

	async function getVodsBefore(gameName: string, searchParameters: searchParameters, paginationToken: string) {
		setIsLoading(true);
		const vods = await fetch(`/api/vods/${gameName}?` + new URLSearchParams({
			language: searchParameters.language,
			sortBy: searchParameters.sortBy,
			period: searchParameters.period,
			vodType: searchParameters.vodType,
			before: paginationToken
		}))
		const vodData: HelixPaginatedResult<HelixVideoData> = await vods.json()
		setVodResults(vodData.data);
		setPaginationToken(vodData.cursor ?? '');
		setIsLoading(false);
	}

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
		<VodViewHeader searchParameters={searchParameters} setsearchParameters={setsearchParameters}/>
		<div style={{backgroundColor: colorScheme === 'dark' ? '#1a1b1e' : '#f2f2f2', flexGrow: 1, padding: 20}}>
		{
			isLoading ?
			<Center sx={{height: "50%"}}>
				<Loader size={'xl'}/>
			</Center>
			:
			<Stack style={{width: "75%", margin: "0 auto"}}>
				<VodView vodList={vodResults}/>
				<Group position="apart">
					<Button onClick={() => {getVodsBefore(gameName as string, searchParameters, paginationToken); setPageNo(prevState => prevState - 1)}}>Previous Page</Button>
					<Text>Page {pageNo}</Text>
					<Button onClick={() => {getVodsAfter(gameName as string, searchParameters, paginationToken); setPageNo(prevState => prevState + 1)}}>Next Page</Button>
				</Group>
			</Stack>
		}
		</div>
	</Stack>
}