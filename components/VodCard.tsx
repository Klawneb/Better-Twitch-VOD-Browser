import { Card, Image, Text, AspectRatio, Group, Tooltip, Overlay, Space, Anchor, useMantineColorScheme, MediaQuery } from "@mantine/core";
import { HelixVideoData } from "@twurple/api/lib/api/helix/video/HelixVideo";
import { format } from "date-fns";
import { useEffect, useState } from "react";

interface VodCardProps {
	vod: HelixVideoData
}

export default function VodCard({ vod }: VodCardProps) {
	const [overlayVisible, setOverlayVisible] = useState(false);
	const [thumbnailUrl, setThumbnailUrl] = useState("")
	const { colorScheme } = useMantineColorScheme()

	function formatThumbnailURL(thumbnailUrl: string, width: number, height: number) {
		let newURL = thumbnailUrl.replace('%{width}', width.toString());
		newURL = newURL.replace('%{height}', height.toString());
		return newURL;
	}

	useEffect(() => {
		setThumbnailUrl(formatThumbnailURL(vod.thumbnail_url, 480, 270))
	}, [vod.thumbnail_url])

	return (<Card shadow={'lg'} radius={10} p={0}>
		<Card.Section sx={{backgroundColor: colorScheme === 'dark' ? '#141517' : '#f8f9fa'}}>
			<AspectRatio ratio={16/9}>
				<Anchor href={`${vod.url}`}>
					{
						thumbnailUrl ?
						<Image src={thumbnailUrl} alt="No thumbnail found"/>
						:
						<Image withPlaceholder alt="No thumbnail found"/>
					}
				</Anchor>
				{overlayVisible && <Text sx={{zIndex: 2}} px={25} size={18} color={'white'}>{vod.title}</Text>}
				{overlayVisible && <Overlay opacity={0.6} blur={2} color="#000" zIndex={0}>hello</Overlay>}
			</AspectRatio>
		</Card.Section>

		<Card.Section px={5}>
			<Group position="apart" noWrap>
				<Text sx={{cursor: 'pointer'}} lineClamp={1} onMouseEnter={() => setOverlayVisible(true)} onMouseLeave={() => setOverlayVisible(false)}>{vod.title}</Text>
				<Text sx={{minWidth: "100px"}} align="end">{format(new Date(vod.published_at), "do-MMM-yy")}</Text>
			</Group>
			<Space h={"xs"}/>
			<Group noWrap position="apart">
				<MediaQuery smallerThan={1500} styles={{display: "none"}}>
					<Text lineClamp={1}>{vod.view_count} views</Text>
				</MediaQuery>
				<Anchor href={`https://twitch.tv/${vod.user_name}`}>{vod.user_name}</Anchor>
				<Text lineClamp={1}>{vod.duration}</Text>
			</Group>
			<Text></Text>
		</Card.Section>
	</Card>)
}