import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { PageHead } from '../components/PageHead/PageHead';
import { LayoutRedesign } from '../components/redesign/LayoutRedesign/LayoutRedesign';
import { BlockRenderer } from '../components/BlockRenderer/BlockRenderer';
import { AppRoute, BlockType } from '../common/enums';
import { loadTranslations } from '../common/utils';
import { Block, LayoutData, Seo } from '../common/types';
import { getLayoutData } from '../services/cms/api/layout-api';
import { getPageData } from '../services/cms/api/pages-api';

type PageData = {
  seo: Seo;
  blocks: Block[];
};

export default function UniversalPage({
  layoutData,
  pageData,
  isPreview,
}: {
  layoutData: LayoutData;
  pageData: PageData;
  isPreview: boolean;
}) {
  const {
    blocks,
    seo,
  } = pageData;

  return (
    <>
      <PageHead
        seoData={{
          seo: {
            title: seo?.metaTitle,
            description: seo?.metaDescription,
          },
          keywords: seo?.metaKeywords,
          metaTags: [],
          structuredData: ` `,
          additionalCode: ``,
        }}
      />

      <LayoutRedesign
        headerContent={layoutData.headerContent}
        footerContent={layoutData.footerContent}
        isPreview={isPreview}
      >
        {blocks.map((block: Block) => (
          <BlockRenderer
            key={block.id}
            block={block}
          />
        ))}
      </LayoutRedesign>
    </>
  );
}

export async function getServerSideProps({
  locale,
  query,
  preview = false,
}: {
  locale: string;
  query: {
    slug: string;
  };
  preview: boolean;
}) {
  if (process.env.IS_STATIC_MODE === `true`) {
    const translationsPageData = await loadTranslations(locale, [
      `common`,
      `heroRedesign`,
      `servicesRedesign`,
      `projectsRedesignFirstSection`,
      `projectsRedesignSecondarySection`,
      `projectsRedesignThirdSection`,
      `projectsRedesignFourthSection`,
      `projectsRedesignFifthSection`,
      `cardsGridRedesign`,
      `collageWithTitleRedesign`,
      `collageWithLinkRedesign`,
      `conferenceSignpostsRedesign`,
      `articleSignpostsRedesign`,
      `singleImageRedesign`,
      `formBlockRedesign`,
      `headerRedesign`,
      `footerRedesign`,
    ]);

    const mapStaticBlocksWithId = (blocks: Block[]) => blocks.map((block) => ({
      id: crypto.randomUUID(),
      ...block,
    }));

    const blocks = mapStaticBlocksWithId([
      {
        __component: BlockType.SHARED_HERO,
        ...translationsPageData.heroRedesign,
      },
      {
        __component: BlockType.HOME_SERVICES,
        ...translationsPageData.servicesRedesign,
      },
      {
        __component: BlockType.HOME_PROJECTS_WITH_TEXT_BLOCK,
        ...translationsPageData.projectsRedesignFirstSection,
      },
      {
        __component: BlockType.HOME_PROJECTS,
        ...translationsPageData.projectsRedesignSecondarySection,
      },
      {
        __component: BlockType.HOME_PROJECTS,
        ...translationsPageData.projectsRedesignThirdSection,
      },
      {
        __component: BlockType.HOME_PROJECTS,
        ...translationsPageData.projectsRedesignFourthSection,
      },
      {
        __component: BlockType.HOME_PROJECTS_WITH_TEXT_BLOCK,
        ...translationsPageData.projectsRedesignFifthSection,
      },
      // Todo: uncomment after fix form
      // {
      //   __component: BlockType.HOME_FORM_BLOCK,
      // },
      {
        __component: BlockType.HOME_COLLAGE_WITH_TITLE,
        ...translationsPageData.collageWithTitleRedesign,
      },
      {
        __component: BlockType.HOME_SIGNPOST_MULTIPLE,
        ...translationsPageData.conferenceSignpostsRedesign,
      },
      {
        __component: BlockType.HOME_SINGLE_IMAGE,
        ...translationsPageData.singleImageRedesign,
      },
      {
        __component: BlockType.HOME_SIGNPOST_MULTIPLE,
        ...translationsPageData.articleSignpostsRedesign,
      },
      {
        __component: BlockType.HOME_CARDS_GRID,
        ...translationsPageData.cardsGridRedesign,
      },
      {
        __component: BlockType.HOME_COLLAGE_WITH_LINK,
        ...translationsPageData.collageWithLinkRedesign,
      },
    ]);

    return {
      props: {
        layoutData: {
          headerContent: translationsPageData.headerRedesign,
          footerContent: translationsPageData.footerRedesign,
        },
        pageData: {
          blocks,
          seo: {
            metaTitle: translationsPageData.common.metaTitle,
            metaDescription: translationsPageData.common.metaDescription,
            metaKeywords: translationsPageData.common.metaKeywords,
          },
        },
        ...(await serverSideTranslations(locale, [
          `common`,
          `cookie`,
          `formBlockRedesign`,
        ])),
      },
    };
  }

  const status = preview ? `draft` : `published`;

  const layoutData = await getLayoutData({
    locale,
    status,
  });

  const pageData = await getPageData({
    locale,
    status,
    slug: Array.isArray(query.slug) ? query.slug[0] : AppRoute.Main,
  });

  if (!pageData) {
    return {
      notFound: true,
    };
  }
  const {
    seo,
    blocks,
  } = pageData;

  return {
    props: {
      layoutData,
      isPreview: preview,
      pageData: {
        blocks,
        seo,
      },
      ...(await serverSideTranslations(locale, [
        `common`,
        `cookie`,
        `formBlockRedesign`,
      ])),
    },
  };
}
