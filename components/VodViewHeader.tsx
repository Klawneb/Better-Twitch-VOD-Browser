import { Button, Group, Header, MediaQuery, Text, Image, Select } from "@mantine/core";
import Link from "next/link";
import { ChevronLeft } from "tabler-icons-react";
import { languageCodes } from "../data/languageCodes";
import { Period, searchProperties, SortBy, VodType } from "../lib/interfaces";
import DarkModeSwitch from "./DarkModeSwitch";
import MainSearchBar from "./MainSeachBar";

interface VodViewHeaderProps {
	searchProperties: searchProperties
	setSearchProperties(searchProperties: searchProperties): void
}

export default function VodViewHeader({ searchProperties, setSearchProperties}: VodViewHeaderProps) {
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
				<MainSearchBar width="25%"/>
				<Group noWrap>
					<Select sx={{ width: "150px"}} onChange={value => setSearchProperties({...searchProperties, language: value ?? 'en' })} value={searchProperties.language} label='Language' data={languages} searchable/>
					<Select sx={{ width: "150px"}} onChange={value => setSearchProperties({...searchProperties, sortBy: value as SortBy })} value={searchProperties.sortBy} label='Sort by' data={[{ value: 'time', label: 'Latest'}, { value: 'views', label: 'Views'}, { value: 'trending', label: 'Trending'}]}/>
					<Select sx={{ width: "150px"}} onChange={value => setSearchProperties({...searchProperties, period: value as Period })} value={searchProperties.period}label='Period' data={[{ value: 'all', label: 'All'}, { value: 'day', label: 'Day'}, { value: 'week', label: 'Week'}, { value: 'month', label: 'Month'}]}/>
					<Select sx={{ width: "150px"}} onChange={value => setSearchProperties({...searchProperties, vodType: value as VodType })} value={searchProperties.vodType} label='VOD type' data={[{ value: 'all', label: 'All'}, { value: 'upload', label: 'Upload'}, { value: 'archive', label: 'Archive'}, { value: 'highlight', label: 'Highlight '}]}/>
				</Group>
				<DarkModeSwitch/>
			</Group>
		</MediaQuery>
	</Header>
}