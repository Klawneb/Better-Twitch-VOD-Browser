import { Button, Group, Header, Title } from "@mantine/core";
import Link from "next/link";
import { ChevronLeft } from "tabler-icons-react";
import DarkModeSwitch from "./DarkModeSwitch";
import MainSearchBar from "./MainSeachBar";

export default function VodViewHeader() {

	return <Header height={60}>
		<Group align={'center'} position={'apart'} sx={{height: "60px", padding: "0 10px"}}>
			<Link href="/">
				<Button component="a" leftIcon={<ChevronLeft/>}>Back</Button>
			</Link>
			<MainSearchBar searchBarWidth="500px"/>
			<DarkModeSwitch/>
		</Group>
	</Header>
}