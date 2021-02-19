import Head from 'next/head';
import { Container } from '@material-ui/core';
import Header from '../Header';

function MainLayout({ title, children }) {
  return (
    <div className={'container'}>
      <Head>
        <title>{title ?? 'Simple Endless Feed Application'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container maxWidth="md" className={'root'}>
        {children}
      </Container>
      <footer className={'footer'}>
        <a
          href="https://www.linkedin.com/in/masoud-moharrami-55a249146/"
          target="_blank"
          rel="noopener noreferrer">
          Developed by Masoud Moharrami
        </a>
      </footer>
    </div>
  );
}

export default MainLayout;
