import {
  Button,
  Group,
  Header,
  MediaQuery,
  Text,
  Select,
  Autocomplete,
  Title,
} from '@mantine/core';
import Link from 'next/link';
import { ChevronLeft } from 'tabler-icons-react';
import { languageCodes } from '../data/languageCodes';
import { Period, searchParameters, SortBy, VodType } from '../lib/interfaces';
import DarkModeSwitch from './DarkModeSwitch';
import MainSearchBar from './MainSeachBar';

interface VodViewHeaderProps {
  searchParameters?: searchParameters;
  setsearchParameters?(searchParameters: searchParameters): void;
  nameList?: string[];
  nameFilter?: string;
  setNameFilter?(name: string): void;
  pageTitle?: string;
}

export default function VodViewHeader({
  searchParameters,
  setsearchParameters,
  nameList,
  nameFilter,
  setNameFilter,
  pageTitle,
}: VodViewHeaderProps) {
  const languages = languageCodes;

  return (
    <Header height={70}>
      <MediaQuery largerThan={'md'} styles={{ display: 'none' }}>
        <Group
          align={'center'}
          position={'apart'}
          sx={{ height: '60px', padding: '0 10px', marginBottom: '10px' }}
          noWrap
        >
          <MainSearchBar width="100%" />
        </Group>
      </MediaQuery>

      <MediaQuery smallerThan={'md'} styles={{ display: 'none' }}>
        <Group
          align={'end'}
          position={'apart'}
          sx={{ height: '60px', padding: '0 10px', marginBottom: '10px' }}
          noWrap
        >
          <Link href="/">
            <Button component="a" leftIcon={<ChevronLeft />}>
              Back
            </Button>
          </Link>
          {nameList ? (
            <Group>
              <Text>Name Filter:</Text>
              <Autocomplete
                data={nameList}
                onChange={setNameFilter}
                value={nameFilter}
              />
            </Group>
          ) : null}
          {searchParameters && setsearchParameters ? (
            <Group noWrap>
              <Select
                sx={{ width: '150px' }}
                onChange={(value) =>
                  setsearchParameters({
                    ...searchParameters,
                    language: value ?? 'en',
                  })
                }
                value={searchParameters.language}
                label="Language"
                data={languages}
                searchable
              />
              <Select
                sx={{ width: '100px' }}
                onChange={(value) =>
                  setsearchParameters({
                    ...searchParameters,
                    sortBy: value as SortBy,
                  })
                }
                value={searchParameters.sortBy}
                label="Sort by"
                data={[
                  { value: 'time', label: 'Latest' },
                  { value: 'views', label: 'Views' },
                  { value: 'trending', label: 'Trending' },
                ]}
              />
              <Select
                sx={{ width: '100px' }}
                onChange={(value) =>
                  setsearchParameters({
                    ...searchParameters,
                    period: value as Period,
                  })
                }
                value={searchParameters.period}
                label="Period"
                data={[
                  { value: 'all', label: 'All' },
                  { value: 'day', label: 'Day' },
                  { value: 'week', label: 'Week' },
                  { value: 'month', label: 'Month' },
                ]}
              />
              <Select
                sx={{ width: '100px' }}
                onChange={(value) =>
                  setsearchParameters({
                    ...searchParameters,
                    vodType: value as VodType,
                  })
                }
                value={searchParameters.vodType}
                label="VOD type"
                data={[
                  { value: 'all', label: 'All' },
                  { value: 'upload', label: 'Upload' },
                  { value: 'archive', label: 'Archive' },
                  { value: 'highlight', label: 'Highlight ' },
                ]}
              />
            </Group>
          ) : null}
          {pageTitle ? <Title>{pageTitle}</Title> : null}
          <DarkModeSwitch />
        </Group>
      </MediaQuery>
    </Header>
  );
}
