import { GetStaticPaths, GetStaticProps } from 'next';
import { RichText } from 'prismic-dom';
import { AiOutlineCalendar } from 'react-icons/ai';
import { FiUser } from 'react-icons/fi';
import { BiTime } from 'react-icons/bi';

import { getPrismicClient } from '../../services/prismic';

import styles from './post.module.scss';

interface Content {
  heading: string;
  body: string;
}

interface Post {
  slug: string;
  data: {
    title: string;
    subtitle: string;
    author: string;
    banner: {
      alt: string;
      url: string;
    };
    content: {
      heading: string;
      body: string;
    }[];
  };
  updatedAt: string;
  createdAt: string;
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  return (
    <div className={styles.container}>
      <aside className={styles.content}>
        <header>
          <img src={post.data.banner.url} alt={post.data.banner.alt} />
          <h1>{post.data.title}</h1>
          <div>
            <time>
              <AiOutlineCalendar size={20} /> {post.updatedAt}
            </time>{' '}
            <span>
              <FiUser size={20} /> {post.data.author}
            </span>
            <p>
              <BiTime size={20} /> {post.createdAt} min
            </p>
          </div>
        </header>
        <article className={styles.postContent}>
          {post.data.content.map(valor => (
            <div key={valor.heading + post.slug}>
              <h1>{valor.heading}</h1>
              <div dangerouslySetInnerHTML={{ __html: valor.body }} />
            </div>
          ))}
        </article>
      </aside>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const prismic = getPrismicClient({});

  const { slug } = params;

  if (slug === 'favicon.png') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const res = await prismic.getByUID('post', String(slug));

  const post = {
    slug,
    data: {
      title: RichText.asText(res.data.title),
      subtitle: res.data.subtitle,
      author: res.data.author,
      banner: {
        alt: res.data.banner.alt,
        url: res.data.banner.url,
      },
      content: res.data.content.map((valor: Content) => {
        return {
          heading: valor.heading,
          body: RichText.asHtml(valor.body),
        };
      }),
    },
    updatedAt: new Date(res.last_publication_date).toLocaleString('pt-br', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }),
    createdAt: new Date(res.first_publication_date).toLocaleString('pt-br', {
      minute: '2-digit',
    }),
  };

  return {
    props: { post },
  };
};
