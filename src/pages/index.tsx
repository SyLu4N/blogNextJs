import { GetStaticProps } from 'next';
import Link from 'next/link';
import { RichText } from 'prismic-dom';
import { useState } from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import { FiUser } from 'react-icons/fi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { getPrismicClient } from '../services/prismic';
import styles from './home.module.scss';

interface Post {
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
  const [posts, setPosts] = useState<Post[]>(pageProps.results);
  const [isLoading, setIsLoading] = useState(false);

  async function handlePosts(): Promise<void> {
    if (!pageProps.next_page) {
      return;
    }
    try {
      setIsLoading(true);
      const nextPage = await (await fetch(pageProps.next_page)).json();

      if (nextPage.page <= posts.length) {
        setIsLoading(false);
        return;
      }

      const newPosts = nextPage.results.map((post): Post => {
        return {
          slug: post.uid,
          data: {
            title: RichText.asText(post.data.title),
            subtitle: post.data.subtitle,
            author: post.data.author,
            content: post.data.content,
          },
          updateAt: new Date(post.last_publication_date).toLocaleString(
            'pt-br',
            {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            }
          ),
        };
      });

      setTimeout(() => {
        setPosts([...posts, ...newPosts]);
        setIsLoading(false);
      }, 2000);
    } catch {
      setIsLoading(false);
    }
  }

  return (
    <>
      <section className={styles.section}>
        {posts.map(post => (
          <article key={post.slug}>
            <Link href={`/post/${post.slug}`}>
              <a>
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
              </a>
            </Link>
          </article>
        ))}
        <button type="button" onClick={handlePosts} disabled={isLoading}>
          {isLoading ? (
            <>
              Carregando... <AiOutlineLoading3Quarters className="loading" />
            </>
          ) : (
            'Carregar posts'
          )}
        </button>
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

// https://github.com/DouglasSoares16/challenge04-ignite-react/blob/master/src/pages/index.tsx
