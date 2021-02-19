import MainLayout from '../../src/components/layout/Main';
import { useRouter } from 'next/router';
import { selectArticle } from '../../src/redux/article/articleSlice';

export default function Article() {
  const article = useSelector(selectArticle);
  console.log({ article });
  const router = useRouter();
  const { title, articleURL } = router.query;
  console.log({ articleURL });
  return (
    <MainLayout title={title}>
      <div>
        <h1>{title}</h1>
        {articleURL ? (
          <iframe src={articleURL} sandbox="" style={{ width: '100%', height: '60vh' }} />
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
