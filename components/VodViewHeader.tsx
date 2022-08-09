import { Button, Group, Header, MediaQuery, Title } from "@mantine/core";
import Link from "next/link";
import { ChevronLeft } from "tabler-icons-react";
import DarkModeSwitch from "./DarkModeSwitch";
import MainSearchBar from "./MainSeachBar";

export default function VodViewHeader() {

	return <Header height={60}>
		<MediaQuery largerThan={'sm'} styles={{display: "none"}}>
			<Group align={'center'} position={'apart'} sx={{height: "60px", padding: "0 10px"}} noWrap>
				<MainSearchBar width="100%"/>
			</Group>
		</MediaQuery>

		<MediaQuery smallerThan={'sm'} styles={{display: "none"}}>
			<Group align={'center'} position={'apart'} sx={{height: "60px", padding: "0 10px"}} noWrap>
				<Link href="/">
					<Button component="a" leftIcon={<ChevronLeft/>}>Back</Button>
				</Link>
				<MainSearchBar width="30%"/>
				<DarkModeSwitch/>
			</Group>
		</MediaQuery>
	</Header>
}