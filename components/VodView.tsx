import { SimpleGrid, Text } from "@mantine/core"
import { HelixVideo } from "@twurple/api"
import { HelixVideoData } from "@twurple/api/lib/api/helix/video/HelixVideo"
import VodCard from "./VodCard"

interface VodViewProps {
	vodList: HelixVideoData[]
}

export default function VodView(props: VodViewProps) {
	return <SimpleGrid cols={5} breakpoints={[
        { maxWidth: 1600, cols: 4, spacing: 'md' },
		{ maxWidth: 1200, cols: 3, spacing: 'sm' },
        { maxWidth: 800, cols: 2, spacing: 'sm' },
      ]}>
		{
			props.vodList.map((video, index) => {
				return <VodCard key={index} vod={video}/>
			})
		}
	</SimpleGrid>
}