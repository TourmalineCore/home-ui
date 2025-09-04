import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Layout } from '../../components/Layout/Layout';
import { PageHead } from '../../components/PageHead/PageHead';
import { HeroBlockTechnology } from '../../components/HeroBlockTechnology/HeroBlockTechnology';
import { Points } from '../../components/Points/Points';
import { Tasks } from '../../components/Tasks/Tasks';
import { Cta } from '../../components/Cta/Cta';
import { Payment } from '../../components/Payment/Payment';
import { Cooperation } from '../../components/Cooperation/Cooperation';
import { ServicesTechnology } from '../../components/ServicesTechnology/ServicesTechnology';

export default function BackendPage() {
  const {
    t,
  } = useTranslation(`common`);

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
      <Layout mainClassName="backend">
        <div className="backend__hero-block-container">
          <HeroBlockTechnology />
          <Points />
        </div>
        <Tasks />
        <Cta />
        <Payment />
        <Cooperation />
        <ServicesTechnology />
        {/* <FormBlock
          id={TechnologyPageAnchorLink.Contact}
          buttonClassName="backend__form-button"
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
      `heroBackend`,
      `pointsBackend`,
      `tasksBackend`,
      `payment`,
      `cta`,
      `cooperation`,
      `servicesTechnologyBackend`,
      `formBlockRedesign`,
    ])),
  },
});
