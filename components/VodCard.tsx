import { Card, Image, Text, AspectRatio, Group, Tooltip, Overlay, Space, Anchor, useMantineColorScheme } from "@mantine/core";
import { HelixVideoData } from "@twurple/api/lib/api/helix/video/HelixVideo";
import { format } from "date-fns";
import { useState } from "react";

interface VodCardProps {
	vod: HelixVideoData
}

export default function VodCard({ vod }: VodCardProps) {
	const [overlayVisible, setOverlayVisible] = useState(false);
	const { colorScheme } = useMantineColorScheme()

	function formatThumbnailURL(thumbnailUrl: string, width: number, height: number) {
		let newURL = thumbnailUrl.replace('%{width}', width.toString());
		newURL = newURL.replace('%{height}', height.toString());
		return newURL;
	}

	return (<Card shadow={'lg'}>
		<Card.Section sx={{backgroundColor: colorScheme === 'dark' ? '#141517' : '#f8f9fa'}}>
			<AspectRatio ratio={16/9}>
				<Anchor href={`${vod.url}`}>
					<Image src={formatThumbnailURL(vod.thumbnail_url, 480, 360)} withPlaceholder alt="No thumbnail found"/>
				</Anchor>
				{overlayVisible && <Text sx={{zIndex: 2}} p={50} size={24}>{vod.title}</Text>}
				{overlayVisible && <Overlay opacity={0.6} blur={2} color="#000" zIndex={0}>hello</Overlay>}
			</AspectRatio>
		</Card.Section>

		<Card.Section>
			<Group position="apart" noWrap>
				<Text sx={{cursor: 'pointer'}} lineClamp={1} onMouseEnter={() => setOverlayVisible(true)} onMouseLeave={() => setOverlayVisible(false)}>{vod.title}</Text>
				<Text sx={{minWidth: "100px"}} align="end">{format(new Date(vod.published_at), "do-MMM-yy")}</Text>
			</Group>
			<Space h={"xs"}/>
			<Group noWrap position="apart">
				<Text>{vod.view_count} views</Text>
				<Anchor href={`https://twitch.tv/${vod.user_name}`}>{vod.user_name}</Anchor>
				<Text>{vod.duration}</Text>
			</Group>
			<Text></Text>
		</Card.Section>
	</Card>)
}