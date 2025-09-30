import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Layout } from '../../components/Layout/Layout';
import { PageHead } from '../../components/PageHead/PageHead';
import { HeroBlockTechnology } from '../../components/HeroBlockTechnology/HeroBlockTechnology';
import { Points } from '../../components/Points/Points';
import { Tasks } from '../../components/Tasks/Tasks';
import { Stack } from '../../components/Stack/Stack';
import { Cases } from '../../components/Cases/Cases';
import { Stages } from '../../components/Stages/Stages';
import { useScrollTop } from '../../common/hooks/useScrollTop';
import { useIsRussianCountry } from '../../common/hooks';
import { TechnologyPageAnchorLink } from '../../common/enums';
import { FormBlock } from '../../components/FormBlock/FormBlock';

export default function TeamsPage() {
  const {
    t,
  } = useTranslation(`common`);

  const isCountryRus = useIsRussianCountry();

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
      <Layout mainClassName="teams">
        <div className="teams__hero-block-container">
          <HeroBlockTechnology />
          <Points />
        </div>
        <Tasks />
        <Stack />
        <Cases />
        <Stages />
        {isCountryRus && (
          <FormBlock
            id={TechnologyPageAnchorLink.Contact}
            buttonClassName="teams__form-button"
          />
        )}
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
      `heroTeams`,
      `pointsTeams`,
      `tasksTeams`,
      `stackTeams`,
      `casesTeams`,
      `stagesTeams`,
      `servicesTechnologyTeams`,
      `formBlockRedesign`,
    ])),
  },
});
