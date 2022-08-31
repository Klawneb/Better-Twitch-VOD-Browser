import { Button, Group, SimpleGrid, Stack, Text, useMantineColorScheme } from "@mantine/core"
import { HelixVideo } from "@twurple/api"
import { HelixVideoData } from "@twurple/api/lib/api/helix/video/HelixVideo"
import { useEffect, useState } from "react"
import VodCard from "./VodCard"

interface VodViewProps {
	vodList: HelixVideoData[]
}

export default function VodView(props: VodViewProps) {
	const [currentPage, setCurrentPage] = useState<HelixVideoData[]>([]);
	const [pageNo, setPageNo] = useState(1);

	useEffect(() => {
		setCurrentPage(props.vodList.filter((vod, index) => index < (pageNo * 20) && index >= ((pageNo - 1) * 20)));
	},[pageNo, props.vodList])

	return (
	<Stack sx={{width: "75%", margin: '0 auto'}}>
		<SimpleGrid cols={5}  
		breakpoints={[
			{ maxWidth: 1600, cols: 4, spacing: 'md' },
			{ maxWidth: 1200, cols: 2, spacing: 'sm' },
			{ maxWidth: 800, cols: 2, spacing: 'sm' },
		]}>
			{
				currentPage.map((video, index) => {
					return <VodCard key={index} vod={video}/>
				})
			}
		</SimpleGrid>
		<Group position="apart">
						<Button disabled={pageNo === 1} onClick={() => {
							setPageNo(prevState => prevState - 1);
						}}>Previous Page</Button>
						<Text>Page {pageNo}</Text>
						<Button onClick={() => {
							setPageNo(prevState => prevState + 1);
						}}>Next Page</Button>
		</Group>
	</Stack>)
}