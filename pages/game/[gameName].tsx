import { AspectRatio, Group, Title, Image, Space } from "@mantine/core";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import VodViewHeader from "../../components/VodViewHeader";
import { languageCodes } from "../../data/languageCodes";

export default function GameVodView() {
	const router = useRouter();
	const { gameName } = router.query;


	return <div>
		<VodViewHeader gameName={gameName as string}/>
		<Space h={"md"}/>
		<Group position="center" align={"self-end"}>
		</Group>
	</div>
}