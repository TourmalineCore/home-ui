import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

import { Layout } from '../../components/Layout/Layout';
import { PageHead } from '../../components/PageHead/PageHead';
import Articles from '../../features/Articles/components/Articles/Articles';

import { fetchArticlesListWithMeta } from '../../features/Articles/fetchHelpers/fetchArticlesListWithMeta';

export default function ArticlesPage({
  articles,
}) {
  const {
    t,
  } = useTranslation(`articles`);

  return (
    <>
      <PageHead
        seoData={{
          seo: {
            title: t(`title`),
            description: t(`description`),
          },
          keywords: t(`keywords`),
          metaTags: [],
          structuredData: ``,
          additionalCode: ``,
        }}
      />

      <Layout>
        <Articles articles={articles} />
      </Layout>
    </>
  );
}

export async function getStaticProps({
  locale,
}) {
  const articlesWithMeta = await fetchArticlesListWithMeta();

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        `common`,
        `articles`,
        `footer`,
        `cookie`,
        `formBlockRedesign`,
      ])),
      articles: articlesWithMeta,
    },
  };
}
