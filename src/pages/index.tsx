import { GetStaticProps } from 'next';
import { RichText } from 'prismic-dom';

import { getPrismicClient } from '../services/prismic';
import { Section } from '../components/Section';

export interface Post {
  slug: string;
  data: {
    title: string;
    subtitle: string;
    author: string;
    content: {
      heading: string;
      body: string;
    };
  };
  updateAt: string;
}

interface PagePosts {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  pageProps: PagePosts;
}

export default function Home({ pageProps }: HomeProps): JSX.Element {
  return <Section pageProps={pageProps} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});

  const res = await prismic.getByType('post', {
    fetch: [
      'post.title',
      'post.subtitle',
      'post.author',
      'post.banner',
      'post.content',
    ],
    pageSize: 1,
  });

  const posts = res.results.map((post): Post => {
    return {
      slug: post.uid,
      data: {
        title: RichText.asText(post.data.title),
        subtitle: post.data.subtitle,
        author: post.data.author,
        content: post.data.content,
      },
      updateAt: new Date(post.last_publication_date).toLocaleString('pt-br', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    };
  });

  const pageProps = {
    results: posts,
    next_page: res.next_page,
  };

  return {
    props: {
      pageProps,
    },
  };
};
