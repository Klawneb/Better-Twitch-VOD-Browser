import { SimpleGrid, Text } from "@mantine/core"
import { HelixVideo } from "@twurple/api"
import VodCard from "./VodCard"

interface VodViewProps {
	vodList: HelixVideo[]
}

export default function VodView(props: VodViewProps) {
	return <SimpleGrid cols={5} breakpoints={[
        { maxWidth: 1600, cols: 4, spacing: 'md' },
        { maxWidth: 755, cols: 2, spacing: 'sm' },
      ]}>
		{
			props.vodList.map((video, index) => {
				return <VodCard key={index} vod={video}/>
			})
		}
	</SimpleGrid>
}