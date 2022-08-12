import { Card, Image, Text } from "@mantine/core";
import { HelixVideo } from "@twurple/api";

interface VodCardProps {
	vod: HelixVideo
}

export default function VodCard({ vod }: VodCardProps) {
	
	return <Card>
		<Card.Section>
			<Image src={vod.thumbnailUrl} withPlaceholder/>
		</Card.Section>
	</Card>
}