import { BlockType } from "../../common/enums";
import { cmsFetch } from "../../services/cms/api/http-client";
import { E2E_UI_DRAFT_NAME_PREFIX, E2E_UI_NAME_PREFIX } from "../constants/e2e-ui-name-prefix";
import {
  CustomTestFixtures,
  expect,
  Page,
  test,
} from "../custom-test";

const HERO_TITLE_EN = `${E2E_UI_NAME_PREFIX} Tourmaline Core Tech Company`;
const HERO_DESCRIPTION_EN = `${E2E_UI_NAME_PREFIX} Launching MVP, working on R&D projects, complex enterprise services, and websites.`;

const HERO_TITLE_RU = `${E2E_UI_NAME_PREFIX} IT-компания Tourmaline Core`;
const HERO_DESCRIPTION_RU = `${E2E_UI_NAME_PREFIX} Запускаем MVP, делаем R&D проекты, сложные корпоративные сервисы и сайты.`;

const HERO_TITLE_DRAFT = `${E2E_UI_DRAFT_NAME_PREFIX} Tourmaline Core Tech Company`;
const HERO_DESCRIPTION_DRAFT = `${E2E_UI_DRAFT_NAME_PREFIX} Launching MVP, working on R&D projects, complex enterprise services, and websites.`;

const META_TITLE = `Homepage`;
const META_DESCRIPTION = `Development of public websites, customized enterprise information systems, and applications`;
const META_KEYWORDS = `public websites, enterprise information systems, software development`;

const ENDPOINT = `/homepage`;

test.describe(`Homepage integration e2e test`, () => {
  test.describe(`Main scenario for filling homepage`, () => {
    test.beforeEach(async () => {
      await cleanupHomepageApi();
    });

    test.afterEach(async () => {
      await cleanupHomepageApi();
    });

    test(
      `GIVEN an empty homepage
       WHEN filling and publishing homepage in CMS UI
       SHOULD see filled homepage on frontend UI 
      `,
      async ({
        goto,
        authorizeInCms,
        skipCmsTutorial,
        page,
      }: {
        goto: CustomTestFixtures['goto'];
        authorizeInCms: CustomTestFixtures['authorizeInCms'];
        skipCmsTutorial: CustomTestFixtures['skipCmsTutorial'];
        page: Page;
      }) => {
        await page.goto(process.env.CMS_URL as string);

        await test.step(`Authorize in CMS`, authorizeInCms);

        await test.step(`Setup CMS content`, setupCmsContent);

        await test.step(`Check homepage content on ui`, checkHomepageOnUi);

        async function setupCmsContent() {
          await page.getByText(`Content Manager`)
            .click();

          await skipCmsTutorial();

          await test.step(`Filling homepage content`, fillAndPublishHomepageCmsUi);

          async function fillAndPublishHomepageCmsUi() {
            await page.getByRole(`link`, {
              name: `Homepage`,
            })
              .click();

            await page.getByRole(`button`, {
              name: `Add a component to blocks`,
            })
              .click();

            await test.step(`Filling hero block`, fillHeroBlocksCmsUi);

            async function fillHeroBlocksCmsUi() {
              await page.getByText(`hero`)
                .click();

              await page.getByText(`hero`)
                .click();

              await page.locator(`input[name='blocks.0.title']`)
                .fill(HERO_TITLE_EN);

              await page.locator(`textarea[name='blocks.0.description']`)
                .fill(HERO_DESCRIPTION_EN);

              await page.locator(`input[name='seo.metaTitle']`)
                .fill(META_TITLE);

              await page.locator(`input[name='seo.metaDescription']`)
                .fill(META_DESCRIPTION);

              await page.locator(`textarea[name='seo.keywords']`)
                .fill(META_KEYWORDS);
            }

            await page.getByRole(`button`, {
              name: `Publish`,
            })
              .click();

            // Wait until navigation record is saved in db
            await page.waitForTimeout(1500);
          }
        }

        async function checkHomepageOnUi() {
          await goto();

          await expect(page.getByText(HERO_TITLE_EN))
            .toBeVisible();

          await page.getByText(HERO_DESCRIPTION_EN)
            .hover();

          await expect(page)
            .toHaveTitle(META_TITLE);

          await expect(page.locator(`meta[name="description"]`))
            .toHaveAttribute(`content`, META_DESCRIPTION);

          await expect(page.locator(`meta[name="keywords"]`))
            .toHaveAttribute(`content`, META_KEYWORDS);
        }
      },
    );
  });

  test.describe(`Creating homepage in different languages`, () => {
    test.beforeEach(async () => {
      await cleanupHomepageApi();

      await cleanupHomepageApi({
        locale: `ru`,
      });

      await updateHomepageApi({
        title: HERO_TITLE_EN,
        description: HERO_DESCRIPTION_EN,
      });

      await updateHomepageApi({
        title: HERO_TITLE_RU,
        description: HERO_DESCRIPTION_RU,
        locale: `ru`,
      });
    });

    test.afterEach(async () => {
      await cleanupHomepageApi();

      await cleanupHomepageApi({
        locale: `ru`,
      });
    });

    test(
      `
      GIVEN an empty homepage
      WHEN filling homepage content in different languages via API
      AND checking the homepage content in different languages
      THEN the user should see homepage content on the frontend UI with correct translations
    `,
      async ({
        goto,
        page,
      }: {
        goto: CustomTestFixtures['goto'];
        page: Page;
      }) => {
        await goto();

        await expect(page.getByText(HERO_TITLE_EN))
          .toBeVisible();

        await expect(page.getByText(HERO_DESCRIPTION_EN))
          .toBeVisible();

        await page.getByTestId(`lang-switch`)
          .hover();

        await page.getByText(`RU`)
          .click();

        await page.waitForLoadState(`networkidle`);

        await expect(page.getByText(HERO_TITLE_RU))
          .toBeVisible();

        await expect(page.getByText(HERO_DESCRIPTION_RU))
          .toBeVisible();
      },
    );
  });

  test.describe(`Open page preview`, () => {
    test.beforeEach(async () => {
      await cleanupHomepageApi();

      await updateHomepageApi({
        title: HERO_TITLE_DRAFT,
        description: HERO_DESCRIPTION_DRAFT,
        status: `draft`,
      });
    });

    test.afterEach(async () => {
      await cleanupHomepageApi();
    });

    test(
      `
      GIVEN an empty homepage
      WHEN filling homepage content and saving changes via API
      AND opening the page in preview mode
      SHOULD see filled homepage on frontend UI in preview mode
    `,
      async ({
        goto,
        gotoInPreviewMode,
        page,
      }: {
        goto: CustomTestFixtures['goto'];
        gotoInPreviewMode: CustomTestFixtures['gotoInPreviewMode'];
        page: Page;
      }) => {
        await goto();

        await expect(page.getByText(HERO_TITLE_DRAFT))
          .toBeHidden();

        await expect(page.getByText(HERO_DESCRIPTION_DRAFT))
          .toBeHidden();

        await gotoInPreviewMode();

        await expect(page.getByText(HERO_TITLE_DRAFT))
          .toBeVisible();

        await expect(page.getByText(HERO_DESCRIPTION_DRAFT))
          .toBeVisible();
      },
    );
  });
});

async function updateHomepageApi({
  title,
  description,
  locale = `en`,
  status = `published`,
}: {
  title: string;
  description: string;
  locale?: 'ru' | 'en';
  status?: 'draft' | 'published';
}) {
  try {
    const response = await cmsFetch(`${ENDPOINT}?locale=${locale}&status=${status}`, {
      method: `PUT`,
      body: JSON.stringify({
        data: {
          blocks: [
            {
              __component: BlockType.SHARED_HERO,
              title,
              description,
            },
          ],
          seo: {
            metaTitle: META_TITLE,
            metaDescription: META_DESCRIPTION,
            keywords: META_KEYWORDS,
          },
        },
      }),
    });
    await expect(response.data, `Homepage should be updated`)
      .not.toBeNull();
  } catch (error: any) {
    throw new Error(`Failed to update homepage: ${error.message}`);
  }
}

async function cleanupHomepageApi({
  locale = `en`,
}: {
  locale?: 'en' | 'ru';
} = {}) {
  try {
    const response = await cmsFetch(`${ENDPOINT}?locale=${locale}`, {
      method: `DELETE`,
    });

    await expect(response.status, `Homepage should be deleted with status 204`)
      .toEqual(204);
  } catch (error: any) {
    throw new Error(`Failed to delete homepage: ${error.message}`);
  }
}
