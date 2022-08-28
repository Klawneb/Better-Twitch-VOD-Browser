import { Button, Group, Text } from "@mantine/core";
import { BuiltInProviderType } from "next-auth/providers";
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { BrandTwitch } from "tabler-icons-react";


export default function TwitchSignInButton() {
	const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);

	useEffect(() => {
		(async () => {
			let providers = await getProviders();
			setProviders(providers);
		})();
	}, [])

	return (
		<Button disabled={providers === null ? true : false} onClick={() => signIn(providers ? providers['twitch'].id : '')}>
			<Group>
				<BrandTwitch/>
				<Text>Sign in with Twitch</Text>
			</Group>
		</Button>
	)
}

export async function getServerSideProps() {
	const providers = await getProviders()
	return {
	  props: { providers },
	}
  }