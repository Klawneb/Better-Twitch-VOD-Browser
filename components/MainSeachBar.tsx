import { Autocomplete, Button, Group, NativeSelect, Select } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface MainSeachBarProps {
	width?: string
}

export default function MainSearchBar(props: MainSeachBarProps) {
	const [searchType, setSearchType] = useState<string>('game');
	const [searchInput, setSearchInput] = useState<string>('');
	const [gameNames, setGameNames] = useState<string[]>([]);
	const router = useRouter();

	async function getGameNames() {
		const names = await fetch('/api/gameNames')
		setGameNames(await names.json());
	}

	return <form onSubmit={(event) => {
		event.preventDefault();
		router.push(`/${searchType}/${searchInput}`)
	}} style={{ width: props.width}}>
		<Group noWrap>
			<Autocomplete onDropdownOpen={getGameNames} data={searchType == 'game' ? gameNames : []} value={searchInput} onChange={setSearchInput} sx={{ flexGrow: 1, minWidth: 0}} limit={20} maxDropdownHeight={200}/>
			<NativeSelect value={searchType} onChange={(value) => setSearchType(value.target.value)} sx={{width: '90px'}} data={[{ value: 'game', label: 'Game'}, { value: 'user', label: 'User'}]}/>
			<Link href={`/${searchType}/${searchInput}`} passHref>
				<Button component="a" type="submit">Search</Button>
			</Link>
		</Group>
	</form>
}