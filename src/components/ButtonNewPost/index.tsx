import { RichText } from 'prismic-dom';
import { useState } from 'react';

import styles from './buttonNewPost.module.scss';
import { Post } from '../../pages';
import { Loading } from '../Loading';

interface ButtonNewPostProps {
  setPosts: (value: unknown) => void;
  setNextPage: (value: string) => void;
  posts: Post[];
  nextPage: string;
}

export function ButtonNewPost({
  setPosts,
  setNextPage,
  posts,
  nextPage,
}: ButtonNewPostProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);

  async function handlePosts(): Promise<void> {
    try {
      setIsLoading(true);
      const newNextPage = await (await fetch(nextPage)).json();

      const newPosts = newNextPage.results.map((post): Post => {
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
        setNextPage(newNextPage.next_page);
        setPosts([...posts, ...newPosts]);
        setIsLoading(false);
      }, 1000);
    } catch {
      setIsLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handlePosts}
      disabled={isLoading}
      className={styles.button}
    >
      {isLoading ? (
        <>
          Carregando... <Loading />
        </>
      ) : (
        'Carregar posts'
      )}
    </button>
  );
}
