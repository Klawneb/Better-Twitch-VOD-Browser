import { Card, Image, Text, AspectRatio, Group } from "@mantine/core";
import { HelixVideoData } from "@twurple/api/lib/api/helix/video/HelixVideo";
import { format } from "date-fns";

interface VodCardProps {
	vod: HelixVideoData
}

export default function VodCard({ vod }: VodCardProps) {
	function formatThumbnailURL(thumbnailUrl: string, width: number, height: number) {
		let newURL = thumbnailUrl.replace('%{width}', width.toString());
		newURL = newURL.replace('%{height}', height.toString());
		return newURL;
	}
	
	return (<Card>
		<Card.Section>
			<AspectRatio ratio={16/9}>
				<Image src={formatThumbnailURL(vod.thumbnail_url, 480, 360)} withPlaceholder alt={""}/>
			</AspectRatio>
		</Card.Section>

		<Card.Section>
			<Group noWrap position="apart">
				<Text lineClamp={1}>{vod.title}</Text>
				<Text lineClamp={1} align={"end"} sx={{width: "100px"}}>{format(new Date(vod.published_at), "do-MMM-yy")}</Text>
			</Group>
		</Card.Section>
	</Card>)
}