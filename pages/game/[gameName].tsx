import { AspectRatio, Group, Title, Image, Space } from "@mantine/core";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import VodViewHeader from "../../components/VodViewHeader";
import { searchProperties } from "../../lib/interfaces";

export default function GameVodView() {
	const [searchProperties, setSearchProperties] = useState<searchProperties>({
		language: 'en',
		sortBy: 'time',
		period: 'all',
		vodType: 'all'
	})
	const router = useRouter();
	const { gameName } = router.query;

	useEffect(() => {
		console.log(searchProperties)
	}, [searchProperties])

	return <div>
		<VodViewHeader searchProperties={searchProperties} setSearchProperties={setSearchProperties}/>
		<Space h={"md"}/>
		<Group position="center" align={"self-end"}>
		</Group>
	</div>
}