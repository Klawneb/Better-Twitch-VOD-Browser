import { Card, Image, Text, AspectRatio, Group, Tooltip, Overlay, Space } from "@mantine/core";
import { HelixVideoData } from "@twurple/api/lib/api/helix/video/HelixVideo";
import { format } from "date-fns";
import { useState } from "react";

interface VodCardProps {
	vod: HelixVideoData
}

export default function VodCard({ vod }: VodCardProps) {
	const [overlayVisible, setOverlayVisible] = useState(false);

	function formatThumbnailURL(thumbnailUrl: string, width: number, height: number) {
		let newURL = thumbnailUrl.replace('%{width}', width.toString());
		newURL = newURL.replace('%{height}', height.toString());
		return newURL;
	}

	return (<Card>
		<Card.Section sx={{backgroundColor: '#141517'}}>
			<AspectRatio ratio={16/9}>
				<Image src={formatThumbnailURL(vod.thumbnail_url, 480, 360)} withPlaceholder alt="No thumbnail found"/>
				{overlayVisible && <Text sx={{zIndex: 2}}>{vod.title}</Text>}
				{overlayVisible && <Overlay opacity={0.6} blur={2} color="#000" zIndex={0}>hello</Overlay>}
			</AspectRatio>
		</Card.Section>

		<Card.Section>
			<Group noWrap position="apart">
				<Text lineClamp={1} sx={{maxWidth: "75%"}} onMouseEnter={() => setOverlayVisible(true)} onMouseLeave={() => setOverlayVisible(false)}>{vod.title}</Text>
				<Text lineClamp={1}>{format(new Date(vod.published_at), "do-MMM-yy")}</Text>
			</Group>
			<Space h={"xs"}/>
			<Group noWrap position="apart">
				<Text>{vod.view_count} views</Text>
				<Text>{vod.user_name}</Text>
				<Text>{vod.duration}</Text>
			</Group>
			<Text></Text>
		</Card.Section>
	</Card>)
}