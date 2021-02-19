import {
  Button,
  ButtonBase,
  Card,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  Paper,
  TextField,
} from '@material-ui/core';
import Link from 'next/link';
import styles from '@common/styles/Home.module.scss';
import Api from '@helpers/service';
import { useEffect, useState } from 'react';
import moment from 'moment';
import MainLayout from '@components/layout/Main';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { wrapper } from '@redux/store';
import { selectPage, selectText, setPage, setText } from '@redux/search/searchSlice';
import { setArticle } from '@redux/article/articleSlice';

export default function Home({ news }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const text = useSelector(selectText);
  const page = useSelector(selectPage);

  const [articles, setArticles] = useState(news ?? []);
  const [searchText, setSearchText] = useState(text);
  const [pageNumber, setPageNumber] = useState(page);

  const getNews = async () => {
    const res = await Api.get('/everything', {
      q: searchText,
      apikey: 'd06c5b99868a4082b819b789ccd8dbe9',
      pageSize: 10,
      page: pageNumber,
    });
    router.push(`/?q=${searchText}&page=${pageNumber}`, undefined, { shallow: true });
    setArticles(res.data.articles);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    router.push(`/?q=${text}&page=${pageNumber}`, undefined, { shallow: true });
    getNews();
  }, [pageNumber]);

  const handlePageChange = (number) => {
    const newNumber = pageNumber + number;
    setPageNumber(newNumber);
    dispatch(setPage(newNumber));
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text);
    dispatch(setText(text));
  };

  const handleSearchClick = () => {
    getNews();
  };

  const pageButtons = () => {
    if (articles.length > 0) {
      return (
        <div className="pageArrowsContainer">
          <Grid container justify="space-between">
            <Button disabled={pageNumber === 1 ? true : false} onClick={() => handlePageChange(-1)}>
              Prev Page
            </Button>
            <Button onClick={() => handlePageChange(1)}>Next Page</Button>
          </Grid>
        </div>
      );
    } else {
      return null;
    }
  };

  const searchComponent = () => (
    <Grid container alignItems="center" spacing={2}>
      <Grid item xs={12} md={10}>
        <TextField
          value={searchText}
          onChange={(e) => handleSearchTextChange(e.target.value)}
          id="searchInput"
          variant="outlined"
          fullWidth
          InputProps={{
            classes: {
              input: 'textFieldInput',
            },
          }}
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSearchClick}
          className={styles.searchButton}>
          SEARCH
        </Button>
      </Grid>
    </Grid>
  );

  const handleArticleClick = (article) => {
    dispatch(setArticle(article));
  };

  return (
    <MainLayout>
      {searchComponent()}

      {pageButtons()}
      <Grid container spacing={3} alignItems="flex-start">
        {articles?.map((article, index) => {
          return (
            <Grid item xs md={3} style={{ display: 'flex' }} key={`${article.title}-${index}`}>
              <Card
                className={styles.card}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                }}>
                <Link
                  href={{
                    pathname: '/news/[title]',
                    query: { title: article.title },
                  }}>
                  <ButtonBase
                    className={styles.imageContainer}
                    onClick={() => handleArticleClick(article)}>
                    <img src={article.urlToImage} className={styles.image} alt={article.title} />
                  </ButtonBase>
                </Link>
                <div className={styles.cardDetail}>
                  <Link href={`/news/${article.title}`}>
                    <a href={`/news/${article.title}`}>
                      <h3>
                        {article.title.length > 45
                          ? article.title.slice(0, 42) + '...'
                          : article.title}
                      </h3>
                    </a>
                  </Link>
                  <p>{article.source.name}</p>
                  <small>{moment(article.publishedAt).format('YYYY-MM-DD hh:mm')}</small>
                </div>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      {articles.length == 0 && (
        <div
          style={{
            display: 'flex',
            height: '30vh',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <h3>Some problem in connection to the server </h3>
        </div>
      )}
      {pageButtons()}
    </MainLayout>
  );
}

export const getStaticProps = wrapper.getStaticProps(async ({ store, preview }) => {
  const search = store.getState().search;
  // console.log({ search });

  const res = await Api.get('everything', {
    q: search.text,
    apikey: 'd06c5b99868a4082b819b789ccd8dbe9',
    pageSize: 10,
    page: search.page,
  }).catch((error) => {
    console.log(error.message);
  });

  if (res !== undefined) {
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
  } else {
    return {
      props: {
        news: [],
      },
    };
  }
});
