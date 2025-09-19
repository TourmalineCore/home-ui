import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Layout } from '../../components/Layout/Layout';
import { PageHead } from '../../components/PageHead/PageHead';
import { HeroBlockTechnology } from '../../components/HeroBlockTechnology/HeroBlockTechnology';
import { Points } from '../../components/Points/Points';
import { Tasks } from '../../components/Tasks/Tasks';
import { Cases } from '../../components/Cases/Cases';
import { Cta } from '../../components/Cta/Cta';
import { Stack } from '../../components/Stack/Stack';
import { Payment } from '../../components/Payment/Payment';
import { Cooperation } from '../../components/Cooperation/Cooperation';
import { ServicesTechnology } from '../../components/ServicesTechnology/ServicesTechnology';
import { useScrollTop } from '../../common/hooks/useScrollTop';

export default function MlPage() {
  const {
    t,
  } = useTranslation(`common`);

  useScrollTop({
    dependencies: [],
  });

  return (
    <>
      <PageHead
        seoData={{
          seo: {
            title: t(`metaTitle`),
            description: t(`metaDescription`),
          },
          keywords: t(`metaKeywords`),
          metaTags: [],
          structuredData: ``,
          additionalCode: ``,
        }}
      />
      <Layout mainClassName="ml">
        <div className="ml__hero-block-container">
          <HeroBlockTechnology />
          <Points />
        </div>
        <Tasks />
        <Cases />
        <Cta />
        <Stack />
        <Payment />
        <Cooperation />
        <ServicesTechnology />
        {/* <FormBlock
          id={TechnologyPageAnchorLink.Contact}
          buttonClassName="ml__form-button"
        /> */}
      </Layout>
    </>
  );
}

export const getStaticProps: GetServerSideProps = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale as string, [
      `common`,
      `footer`,
      `cookie`,
      `form`,
      `formBlock`,
      `heroMl`,
      `pointsMl`,
      `tasksMl`,
      `payment`,
      `cta`,
      `stackMl`,
      `cooperation`,
      `servicesTechnologyMl`,
      `casesMl`,
      `formBlockRedesign`,
    ])),
  },
});
