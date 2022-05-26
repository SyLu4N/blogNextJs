import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import { FiUser } from 'react-icons/fi';

import styles from './section.module.scss';
import { Post } from '../../pages';
import { ButtonNewPost } from '../ButtonNewPost';

interface SectionProps {
  pageProps: {
    next_page: string;
    results: Post[];
  };
}

export function Section({ pageProps }: SectionProps): JSX.Element {
  const [nextPage, setNextPage] = useState(pageProps.next_page);
  const [posts, setPosts] = useState<Post[]>(pageProps.results);

  return (
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
      {nextPage && (
        <ButtonNewPost
          setPosts={setPosts}
          setNextPage={setNextPage}
          posts={posts}
          nextPage={nextPage}
        />
      )}
    </section>
  );
}
