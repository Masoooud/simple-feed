import MainLayout from '@components/layout/Main';
import { useRouter } from 'next/router';
import { selectArticle } from '@redux/article/articleSlice';
import { useSelector } from 'react-redux';
import styles from '@common/styles/Article.module.scss';
import { ButtonBase, Card, Grid, Link } from '@material-ui/core';
import moment from 'moment';
export default function Article() {
  const article = useSelector(selectArticle);
  console.log({ article });

  const router = useRouter();
  const { title } = router.query;

  const content = article?.content?.split('…')[0];
  console.log({ content });

  return (
    <MainLayout title={title}>
      <div>
        {article ? (
          <Grid container style={{ display: 'flex' }} direction="column">
            <div className={styles.cardDetail}>
              <h1>{article.title}</h1>
              <p>{article.author}</p>
              <small>{article.source.name}</small>
              <p>{moment(article.publishedAt).format('DD/MM/YYYY hh:mm')}</p>
              <img src={article.urlToImage} className={styles.image} />
              <p>{article.description}</p>
              <p>
                {content}
                <a href={article.url} target="_blank">
                  <span>[Read More]</span>
                </a>
              </p>
            </div>
          </Grid>
        ) : (
          <div
            style={{
              width: '100%',
              height: '60vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <h3>Unfortunatley there is no content to show</h3>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
