import { Stack, Title, Text, Center, Button } from "@mantine/core";
import { HelixVideoData } from "@twurple/api/lib/api/helix/video/HelixVideo";
import { signIn, useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import VodView from "../components/VodView";
import VodViewHeader from "../components/VodViewHeader";

export default function Followed() {
	const session = useSession();
	const [followedUsers, setFollowedUsers] = useState<string[]>([]);
    const [followedVods, setFollowedVods] = useState<HelixVideoData[]>([]);

	useEffect(() => {
		if (session.status === 'authenticated') {
			(async () => {
				const followed = await fetch('/api/followed?' + new URLSearchParams({
					userName: session.data?.user?.name as string
				}));
				setFollowedUsers(await followed.json());
			})();
		}
	}, [session.status, session.data?.user?.name])

    useEffect(() => {
        followedUsers.forEach(async username => {
            let vods: HelixVideoData[] = await (await fetch(`/api/vods/user/${username}/10`)).json();
            setFollowedVods(prevState => [...prevState, ...vods]);
        })
    }, [followedUsers])

	return (
		session.status === 'authenticated' ?
		<Stack>
			<VodViewHeader pageTitle={"Followed VODs"}/>
            <VodView vodList={followedVods.sort((a, b) => {
                return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
            })}/>
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