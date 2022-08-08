import { Group, Switch, useMantineColorScheme } from "@mantine/core";
import { Moon, Sun } from "tabler-icons-react";

export default function DarkModeSwitch() {
	const { colorScheme, toggleColorScheme} = useMantineColorScheme();

	return <Group spacing={"xs"}>
		<Sun/>
		<Switch onChange={() => toggleColorScheme()} checked={colorScheme === 'dark'}/>
		<Moon/>
	</Group>
}