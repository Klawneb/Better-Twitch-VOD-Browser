import { Card, Image, Text, AspectRatio } from "@mantine/core";
import { HelixVideo } from "@twurple/api";
import { HelixVideoData } from "@twurple/api/lib/api/helix/video/HelixVideo";

interface VodCardProps {
	vod: HelixVideoData
}

export default function VodCard({ vod }: VodCardProps) {
	function formatThumbnailURL(thumbnailUrl: string, width: number, height: number) {
		let newURL = thumbnailUrl.replace('%{width}', width.toString());
		newURL = newURL.replace('%{height}', height.toString());
		return newURL;
	}
	
	return (
			<Card>
		<Card.Section>
			<AspectRatio ratio={16/9}>
				<Image src={formatThumbnailURL(vod.thumbnail_url, 480, 360)} withPlaceholder alt={'VOD Thumbnail'}/>
			</AspectRatio>
		</Card.Section>

		<Card.Section>
			<Text>{vod.title}</Text>
		</Card.Section>
	</Card>)
}