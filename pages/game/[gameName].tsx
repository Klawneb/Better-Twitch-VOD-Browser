import { AspectRatio, Group, Title, Image, Space, Text } from "@mantine/core";
import { HelixVideo } from "@twurple/api/lib";
import { rawDataSymbol } from "@twurple/common";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import VodViewHeader from "../../components/VodViewHeader";
import { searchParameters } from "../../lib/interfaces";

export default function GameVodView() {
	const [searchParameters, setsearchParameters] = useState<searchParameters>({
		language: 'en',
		sortBy: 'time',
		period: 'all',
		vodType: 'all'
	})
	const [vodResults, setVodResults] = useState<HelixVideo[]>([])
	const router = useRouter();
	const { gameName } = router.query;

	async function getVods(gameName: string, searchParameters: searchParameters) {
		const vods = await fetch(`/api/vods/${gameName}?` + new URLSearchParams({
			language: searchParameters.language,
			sortBy: searchParameters.sortBy,
			period: searchParameters.period,
			vodType: searchParameters.vodType
		}))
		const vodData = await vods.json()
		setVodResults(vodData);
	}

	useEffect(() => {
		if (router.isReady) {
			getVods(gameName as string, searchParameters)
		}
	}, [router.isReady, gameName, searchParameters])

	return <div>
		<VodViewHeader searchParameters={searchParameters} setsearchParameters={setsearchParameters}/>
		<Space h={"md"}/>
		{
			vodResults.map((vod, index) => {
				return <Text key={index}>{vod.title}</Text>
			})
		}
	</div>
}