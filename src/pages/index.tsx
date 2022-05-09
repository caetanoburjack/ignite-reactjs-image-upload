import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface Image {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface GetImagesResponse {
  after: string;
  data: Image[];
}

export default function Home(): JSX.Element {
  async function getImages({ pageParam = null }): Promise<GetImagesResponse> {
    const { data } = await api('/api/images', {
      params: {
        after: pageParam,
      },
    });
    return data;
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images', getImages, {
    getNextPageParam: lastPage => lastPage?.after || null,
  });

  const formattedData = useMemo(() => {
    const formatted = data?.pages.flatMap(imageData => {
      return imageData.data.flat();
    });
    return formatted;
  }, [data]);

  // TODO RENDER LOADING SCREEN
  if (isLoading && !isError) {
    return <Loading />;
  }
  // TODO RENDER ERROR SCREEN
  if (!isLoading && isError) {
    return <Error />;
  }
  return (
    <Box minW='320px'>
      <Header />
      <Box maxW={1120} px={5} mx="auto" my={5}>
        <CardList cards={formattedData} />
        {
          hasNextPage && (
            <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
              {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
            </Button>)
        }
      </Box>
    </Box>
  );
}
