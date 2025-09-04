import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Layout } from '../../components/Layout/Layout';
import { PageHead } from '../../components/PageHead/PageHead';
import Article from '../../features/Articles/components/Article/Article';

import { fetchArticle } from '../../features/Articles/fetchHelpers/fetchArticle';
import { fetchMetadata } from '../../features/Articles/fetchHelpers/fetchMetadata';
import { fetchArticlesListWithMeta } from '../../features/Articles/fetchHelpers/fetchArticlesListWithMeta';
import { getArticleUrl } from '../../features/Articles/utils/getArticleUrl';

export default function ArticlesPage({
  article,
  metadata,
  articleUrl,
}) {
  return (
    <>
      <PageHead
        seoData={{
          seo: {
            title: metadata.title,
            description: metadata.description,
          },
          keywords: metadata.keywords || ``,
          metaTags: [],
          structuredData: ``,
          additionalCode: ``,
        }}
      />

      <Layout>
        <Article
          markdown={article}
          articleUrl={articleUrl}
          datePublication={metadata.datePublication}
        />
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const articles = await fetchArticlesListWithMeta();

  const paths = articles.map((articleItem) => ({
    params: {
      article: articleItem.metadata.slug,
    },
    locale: articleItem.locale,
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params,
  locale,
}) {
  const articles = await fetchArticlesListWithMeta();

  const currentArticleFolder = articles.find((articleItem) => articleItem.metadata.slug === params.article);

  if (!currentArticleFolder) {
    return {
      props: {
        ...(await serverSideTranslations(locale, [
          `common`,
          `footer`,
          `articles`,
          `cookie`,
        ])),
        article: {},
        metadata: {},
      },
    };
  }

  const article = await fetchArticle(`${currentArticleFolder.name}.md`, locale);
  const metadata = await fetchMetadata(`${currentArticleFolder.name}.md`, locale);
  const articleUrl = getArticleUrl(currentArticleFolder.name, locale);

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        `common`,
        `footer`,
        `articles`,
        `cookie`,
      ])),
      article,
      metadata,
      articleUrl,
    },
  };
}
