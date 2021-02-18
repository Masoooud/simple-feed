import { ButtonBase, Card, Container, Grid, Paper } from '@material-ui/core';
import Link from 'next/link';
import styles from '@common/styles/Home.module.scss';
import Api from '@helpers/service';
import { useEffect, useState } from 'react';
import moment from 'moment';
import MainLayout from '@components/layout/Main';
import { Fragment } from 'react';
export default function Home({ news }) {
  const [articles, setArticles] = useState(news);

  const [page, setPage] = useState(1);

  // const getNews = async () => {
  //   const res = await Api.get('/everything', {
  //     q: 'Bitcoin',
  //     apikey: 'd06c5b99868a4082b819b789ccd8dbe9',
  //     pageSize: page * 10,
  //   });
  //   setArticles(res.data.articles);
  // };

  // useEffect(() => {
  //   getNews();
  // }, []);

  return (
    <MainLayout>
      <Grid container spacing={3} alignItems="flex-start">
        {articles?.map((article, index) => {
          return (
            <Grid item xs md={4} style={{ display: 'flex' }} key={`${article.title}-${index}`}>
              <Card
                className={styles.card}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                }}>
                <Link href={`/news/${article.title}`}>
                  <ButtonBase className={styles.imageContainer}>
                    <img src={article.urlToImage} className={styles.image} />
                  </ButtonBase>
                </Link>
                <Link href={`/news/${article.title}`}>
                  <h3>
                    <a href={`/news/${article.title}`}>
                      {article.title.length > 45
                        ? article.title.slice(0, 42) + '...'
                        : article.title}
                    </a>
                  </h3>
                </Link>
                <p>{article.source.name}</p>
                <small>{moment(article.publishedAt).format('YYYY-MM-DD hh:mm')}</small>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </MainLayout>
  );
}

export async function getStaticProps(context) {
  const res = await Api.get('/everything', {
    q: 'Bitcoin',
    apikey: 'd06c5b99868a4082b819b789ccd8dbe9',
    pageSize: 10,
  });

  const data = res.data;

  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { news: data.articles }, // will be passed to the page component as props
  };
}
