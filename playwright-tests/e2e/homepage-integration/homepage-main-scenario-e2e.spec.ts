import { E2E_UI_NAME_PREFIX } from "../../constants/e2e-ui-name-prefix";
import {
  CustomTestFixtures,
  expect,
  Page,
  test,
} from "../../custom-test";
import { cleanupHomepageApi } from "./homepage-api-helpers";

const HERO_TITLE = `${E2E_UI_NAME_PREFIX} Tourmaline Core Tech Company`;
const HERO_DESCRIPTION = `${E2E_UI_NAME_PREFIX} Launching MVP, working on R&D projects, complex enterprise services, and websites.`;

const META_TITLE = `Homepage`;
const META_DESCRIPTION = `Development of public websites, customized enterprise information systems, and applications`;
const META_KEYWORDS = `public websites, enterprise information systems, software development`;

test.describe(`Main scenario for filling homepage`, homepageMainScenarioTest);

function homepageMainScenarioTest() {
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
              .fill(HERO_TITLE);

            await page.locator(`textarea[name='blocks.0.description']`)
              .fill(HERO_DESCRIPTION);

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

        await expect(page.getByText(HERO_TITLE))
          .toBeVisible();

        await page.getByText(HERO_DESCRIPTION)
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
}
