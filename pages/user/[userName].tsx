import {
  Title,
  Loader,
  Center,
  useMantineColorScheme,
  Stack,
} from '@mantine/core';
import { HelixVideoData } from '@twurple/api/lib/api/helix/video/HelixVideo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import VodView from '../../components/VodView';
import VodViewHeader from '../../components/VodViewHeader';
import { searchParameters } from '../../lib/interfaces';

export default function UserVodView() {
  const [searchParameters, setsearchParameters] = useState<searchParameters>({
    language: 'en',
    sortBy: 'time',
    period: 'all',
    vodType: 'all',
  });
  const [vodResults, setVodResults] = useState<HelixVideoData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { userName } = router.query;

  const { colorScheme } = useMantineColorScheme();

  async function getVods(userName: string, searchParameters: searchParameters) {
    setIsLoading(true);
    const vods = await fetch(
      `/api/vods/user/${userName}?` +
        new URLSearchParams({
          language: searchParameters.language,
          sortBy: searchParameters.sortBy,
          period: searchParameters.period,
          vodType: searchParameters.vodType,
        })
    );
    const vodData: HelixVideoData[] = await vods.json();
    setVodResults(vodData);
    setIsLoading(false);
  }

  //Load vods on page load, and when search parameters or game name changes
  useEffect(() => {
    if (router.isReady) {
      if (vodResults.length != 0) {
        setVodResults([]);
      }
      getVods(userName as string, searchParameters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, userName, searchParameters]);

  return (
    <Stack sx={{ height: '100vh' }} spacing={0}>
      <VodViewHeader
        searchParameters={searchParameters}
        setsearchParameters={setsearchParameters}
      />
      <div
        style={{
          backgroundColor: colorScheme === 'dark' ? '#1a1b1e' : '#f2f2f2',
          flexGrow: 1,
          padding: 20,
        }}
      >
        {isLoading ? (
          <Center sx={{ height: '50%' }}>
            <Stack align={'center'}>
              <Title>Fetching VODs...</Title>
              <Loader size={'xl'} />
            </Stack>
          </Center>
        ) : vodResults.length != 0 ? (
          <VodView vodList={vodResults} />
        ) : (
          <Title align="center">No VODs found for this user</Title>
        )}
      </div>
    </Stack>
  );
}
