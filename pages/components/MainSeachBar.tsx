import { Autocomplete, Button, Group, Select } from "@mantine/core";
import { useEffect, useState } from "react";

export default function MainSearchBar() {
	const [searchType, setSearchType] = useState<string>('game');
	const gameInfo: string[] = [];

	useEffect(() => {
		console.log(searchType)
	}, [searchType])


	return <Group>
		<Autocomplete data={gameInfo} sx={{ flexGrow: 1}}/>
		<Select value={searchType} onChange={(value) => setSearchType(value ?? '')} sx={{width: '90px'}} data={[{ value: 'game', label: 'Game'}, { value: 'user', label: 'User'}]}/>
		<Button>Search</Button>
	</Group>
}