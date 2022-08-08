import { AspectRatio, Group, Title, Image, Space } from "@mantine/core";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import VodViewHeader from "../../components/VodViewHeader";

export default function GameVodView() {
	const router = useRouter();
	const [boxArtURL, setBoxArtURL] = useState('');
	const { gameName } = router.query;
	
	async function getBoxArtURL() {
		const response = await fetch(`/api/boxArt/${gameName}/`);
		setBoxArtURL(await response.json());
	}

	useEffect(() => {
		if (router.isReady) {
			getBoxArtURL()
		}
	})

	return <div>
		<VodViewHeader/>
		<Space h={"md"}/>
		<Group position="center" align={"self-end"}>
			<Image width={200} height={266.67} src={boxArtURL} alt={"Box Art"}/>
			<Title>{gameName}</Title>
		</Group>
	</div>
}