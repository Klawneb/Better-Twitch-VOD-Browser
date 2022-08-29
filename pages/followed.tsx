import { Stack, Title, Text, Center } from "@mantine/core";
import { signIn, useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import VodViewHeader from "../components/VodViewHeader";

export default function Followed() {
	const session = useSession();
	const [followedUsers, setFollowedUsers] = useState<string[]>([])

	useEffect(() => {
		if (session.status === 'authenticated') {
			(async () => {
				const followed = await fetch('/api/followed?' + new URLSearchParams({
					userName: session.data?.user?.name as string
				}));
				setFollowedUsers(await followed.json());
			})();
		}
	}, [])

	return (
		session.status === 'authenticated' ?
		<Stack>
			<VodViewHeader pageTitle={"Followed VODs"}/>
		</Stack>
		:
		<Center sx={{height: "100vh"}}>
			<Stack align={'center'}>
				<Title>Please Sign in to view this page</Title>
				<Text align="center" size={32} variant='link' onClick={() => signIn()} sx={{cursor: 'pointer'}}>Sign In</Text>
			</Stack>
		</Center>	
	)
}