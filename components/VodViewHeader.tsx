import { Button, Group, Header, MediaQuery, Text, Image, Select } from "@mantine/core";
import Link from "next/link";
import { ChevronLeft } from "tabler-icons-react";
import { languageCodes } from "../data/languageCodes";
import DarkModeSwitch from "./DarkModeSwitch";
import MainSearchBar from "./MainSeachBar";

interface VodViewHeaderProps {
	searchProperties: {
		language: string,
		sortBy: string,
		period: string,
		type: string
	}
	handleSearchPropertyChange(field: 'language' | 'sortBy' | 'period' | 'type', value: string): void
}

export default function VodViewHeader(props: VodViewHeaderProps) {
	const languages = languageCodes;

	return <Header height={70}>
		<MediaQuery largerThan={'sm'} styles={{display: "none"}}>
			<Group align={'center'} position={'apart'} sx={{height: "60px", padding: "0 10px"}} noWrap>
				<MainSearchBar width="100%"/>
			</Group>
		</MediaQuery>

		<MediaQuery smallerThan={'sm'} styles={{display: "none"}}>
			<Group align={'end'} position={'apart'} sx={{height: "60px", padding: "0 10px"}} noWrap>
				<Link href="/">
					<Button component="a" leftIcon={<ChevronLeft/>}>Back</Button>
				</Link>
				<Group noWrap>
					<Select sx={{ width: "150px"}} onChange={value => props.handleSearchPropertyChange('language', value ?? '')} value={props.searchProperties.language} label='Language' data={languages} searchable/>
					<Select sx={{ width: "150px"}} onChange={value => props.handleSearchPropertyChange('sortBy', value ?? '')} value={props.searchProperties.sortBy} label='Sort by' data={[{ value: 'time', label: 'Latest'}, { value: 'views', label: 'Views'}, { value: 'trending', label: 'Trending'}]}/>
					<Select sx={{ width: "150px"}} onChange={value => props.handleSearchPropertyChange('period', value ?? '')} value={props.searchProperties.period} label='Period' data={[{ value: 'all', label: 'All'}, { value: 'day', label: 'Day'}, { value: 'week', label: 'Week'}, { value: 'month', label: 'Month'}]}/>
					<Select sx={{ width: "150px"}} onChange={value => props.handleSearchPropertyChange('type', value ?? '')} value={props.searchProperties.type} label='VOD type' data={[{ value: 'all', label: 'All'}, { value: 'upload', label: 'Upload'}, { value: 'archive', label: 'Archive'}, { value: 'highlight', label: 'Highlight '}]}/>
				</Group>
				<MainSearchBar width="20%"/>
				<DarkModeSwitch/>
			</Group>
		</MediaQuery>
	</Header>
}