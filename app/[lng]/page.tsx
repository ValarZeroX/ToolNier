import { ColorSchemeToggle } from '../../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '@/components/Welcome/Welcome';
import Layout from '@/components/Layout/Layout';
import { useTranslation } from "../i18n";

type PageProps = { params: Promise<{ lng: string; }> };

export default async function HomePage({ params }: PageProps) {
  const { lng } = await params; // 在函式內部解構
  // const { t } = await useTranslation(lng, "common"); // 假設使用 'common' 命名空間
  return (
    <>
      <Layout lng={lng}>
        <Welcome />
        {/* <ActionsGrid lng={lng} /> */}
      </Layout>
    </>
  );
}