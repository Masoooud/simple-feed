import MainLayout from '../../src/components/layout/Main';
import { useRouter } from 'next/router';

export default function Article() {
  const router = useRouter();
  const { title } = router.query;

  return (
    <MainLayout title={title}>
      <div>
        <h1>{title}</h1>
      </div>
    </MainLayout>
  );
}
