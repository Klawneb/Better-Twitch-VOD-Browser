import { AspectRatio, Group, Title, Image, Space } from "@mantine/core";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import VodViewHeader from "../../components/VodViewHeader";

export default function GameVodView() {
	const [searchProperties, setSearchProperties] = useState({
		language: 'en',
		sortBy: 'time',
		period: 'all',
		type: 'all'
	})
	const router = useRouter();
	const { gameName } = router.query;

	function handleSearchPropertyChange(field: 'language' | 'sortBy' | 'period' | 'type', value: string) {
		if (value) {
			setSearchProperties(prevState => {
				const newState = {...prevState }
				newState[field] = value;
				return newState
			})
		}
	}

	return <div>
		<VodViewHeader searchProperties={searchProperties} handleSearchPropertyChange={handleSearchPropertyChange}/>
		<Space h={"md"}/>
		<Group position="center" align={"self-end"}>
		</Group>
	</div>
}