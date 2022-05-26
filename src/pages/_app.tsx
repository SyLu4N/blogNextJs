import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import { Header } from '../components/Header';
import '../styles/globals.scss';
import { Footer } from '../components/Footer';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <SessionProvider>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
  );
}

export default MyApp;
