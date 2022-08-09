import { Autocomplete, Button, Group, Select } from "@mantine/core";
import Link from "next/link";
import { useEffect, useState } from "react";

interface MainSeachBarProps {
	width?: string
}

export default function MainSearchBar(props: MainSeachBarProps) {
	const [searchType, setSearchType] = useState<string>('game');
	const [searchInput, setSearchInput] = useState<string>('');
	const [gameNames, setGameNames] = useState<string[]>([]);

	async function getGameNames() {
		const names = await fetch('/api/gameNames')
		setGameNames(await names.json());
	}

	useEffect(() => {
		getGameNames()
	}, [])

	return <Group sx={{ width: props.width}} noWrap>
		<Autocomplete data={gameNames} value={searchInput} onChange={setSearchInput} sx={{ flexGrow: 1, minWidth: 0}} limit={20} maxDropdownHeight={200}/>
		<Select value={searchType} onChange={(value) => setSearchType(value ?? '')} sx={{maxWidth: '90px'}} data={[{ value: 'game', label: 'Game'}, { value: 'user', label: 'User'}]}/>
		<Link href={`/${searchType}/${searchInput}`} passHref>
			<Button component="a">Search</Button>
		</Link>
	</Group>
}