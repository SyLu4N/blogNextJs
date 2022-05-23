import { GetStaticPaths, GetStaticProps } from 'next';
import { useState } from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import { FiUser } from 'react-icons/fi';
import { Header } from '../components/Header';

import { getPrismicClient } from '../services/prismic';
import styles from './home.module.scss';

interface Post {
  slug: string;
  data: {
    title: string;
    subtitle: string;
    banner: string;
    author: string;
    content: {
      heading: string;
      body: string;
    };
  };
  updateAt: string;
}

interface PostPagination {
  next_page: string;
  posts: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ posts }): JSX.Element {
  const [teste, setTeste] = useState<Post[]>(posts);

  return (
    <>
      <Header />
      <section className={styles.section}>
        {teste.map(post => (
          <article key={posts.slug}>
            <h1>{post.data.title}</h1>
            <p>{post.data.subtitle}</p>
            <div>
              <time>
                <AiOutlineCalendar size={20} /> {post.updateAt}
              </time>{' '}
              <span>
                <FiUser size={20} /> {post.data.author}
              </span>
            </div>
          </article>
        ))}
      </section>
    </>
  );
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
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
        banner: post.data.banner,
        content: post.data.content,
      },
      updateAt: new Date(post.last_publication_date).toLocaleString('pt-br', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    };
  });

  console.log(JSON.stringify(posts, null, 2), res.next_page);

  return {
    props: {
      posts,
    },
  };
};

// https://github.com/DouglasSoares16/challenge04-ignite-react/blob/master/src/pages/index.tsx
