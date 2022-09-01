import { Stack, Title, Text, Center, Loader } from '@mantine/core';
import { HelixVideoData } from '@twurple/api/lib/api/helix/video/HelixVideo';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import VodView from '../components/VodView';
import VodViewHeader from '../components/VodViewHeader';

export default function Followed() {
  const session = useSession();
  const [followedUsers, setFollowedUsers] = useState<string[]>([]);
  const [followedVods, setFollowedVods] = useState<HelixVideoData[]>([]);
  const [amountLoaded, setAmountLoaded] = useState<number>(0);
  const [bannedUsers, setBannedUsers] = useState<number>(0);

  useEffect(() => {
    if (session.status === 'authenticated') {
      (async () => {
        const followed = await fetch(
          '/api/followed?' +
            new URLSearchParams({
              userName: session.data?.user?.name as string,
            })
        );
        setFollowedUsers(await followed.json());
      })();
    }
  }, [session.status, session.data?.user?.name]);

  useEffect(() => {
    if (followedUsers.length != 0) {
      followedUsers.forEach(async (username) => {
        const response = await fetch(`/api/vods/user/${username}/10`);
        if (response.ok) {
          const vods = await response.json();
          setFollowedVods((prevState) => [...prevState, ...vods]);
          setAmountLoaded((prevState) => prevState + 1);
        } else {
          setBannedUsers((prevState) => prevState + 1);
        }
      });
    }
  }, [followedUsers.length]);

  return session.status === 'authenticated' ? (
    <Stack>
      <VodViewHeader pageTitle={'Followed VODs'} />
      {amountLoaded != 0 &&
      amountLoaded === followedUsers.length - bannedUsers ? (
        <VodView
          vodList={followedVods.sort((a, b) => {
            return (
              new Date(b.published_at).getTime() -
              new Date(a.published_at).getTime()
            );
          })}
        />
      ) : (
        <Center sx={{ height: '50%' }}>
          <Stack align={'center'}>
            <Title>
              Loading streamers you follow{' '}
              {followedUsers.length > 0
                ? `${amountLoaded}/${followedUsers.length - bannedUsers}`
                : null}
            </Title>
            <Loader size={'xl'} />
          </Stack>
        </Center>
      )}
    </Stack>
  ) : (
    <Center sx={{ height: '100vh' }}>
      <Stack align={'center'}>
        <Title>Please Sign in to view this page</Title>
        <Text
          align="center"
          size={32}
          variant="link"
          onClick={() => signIn()}
          sx={{ cursor: 'pointer' }}
        >
          Sign In
        </Text>
      </Stack>
    </Center>
  );
}
