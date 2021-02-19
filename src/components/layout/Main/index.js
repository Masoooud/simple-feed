import Head from 'next/head';
import { Container, Grid } from '@material-ui/core';
import Header from '../Header';
import LinkedIn from '@common/icons/linkedin';
import Github from '@common/icons/github';

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
        <small>Design and Developed by Masoud Moharrami</small>
        <a
          href="https://www.linkedin.com/in/masoud-moharrami-55a249146/"
          target="_blank"
          rel="noopener noreferrer">
          <span>
            <LinkedIn width="24" height="24" fill="#0070f3" />
          </span>
        </a>
        <a href="https://github.com/Masoooud" target="_blank" rel="noopener noreferrer">
          <span>
            <Github width="24" height="24" fill="#C288FF" />
          </span>
        </a>
      </footer>
    </div>
  );
}

export default MainLayout;
