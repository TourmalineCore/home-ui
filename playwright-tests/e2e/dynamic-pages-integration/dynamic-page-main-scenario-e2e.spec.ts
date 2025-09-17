import { cmsFetch } from "../../../services/cms/api/http-client";
import { E2E_UI_NAME_PREFIX } from "../../constants/e2e-ui-name-prefix";
import {
  CustomTestFixtures,
  expect,
  Page,
  test,
} from "../../custom-test";

export const DYNAMIC_PAGE_NAME = `${E2E_UI_NAME_PREFIX} Frontend`;
const DYNAMIC_PAGE_LINK = `/frontend-e2e-test`;

const HERO_TITLE = `${E2E_UI_NAME_PREFIX} Frontend page`;
const HERO_DESCRIPTION = `${E2E_UI_NAME_PREFIX} Launching MVP, working on R&D projects, complex enterprise services, and websites.`;

const META_TITLE = `Frontend`;
const META_DESCRIPTION = `Development of public websites, customized enterprise information systems, and applications`;
const META_KEYWORDS = `public websites, enterprise information systems, software development`;

const ENDPOINT = `/navigations`;

test.describe(`Main scenario for create dynamic page`, dynamicPageMainScenarioTest);

function dynamicPageMainScenarioTest() {
  test.beforeEach(async () => {
    await cleanupDynamicPageApi();
  });

  test.afterEach(async () => {
    await cleanupDynamicPageApi();
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

      await test.step(`Check dynamic page on ui`, checkDynamicPageOnUi);

      async function setupCmsContent() {
        await page.getByText(`Content Manager`)
          .click();

        await skipCmsTutorial();

        await test.step(`Create dynamic page`, createAndPublishDynamicPageCmsUi);

        async function createAndPublishDynamicPageCmsUi() {
          await page.getByRole(`link`, {
            name: `Navigation`,
          })
            .click();

          await page.getByText(`Create new entry`)
            .first()
            .click();

          await test.step(`Filling dynamic page`, fillDynamicPageCmsUi);

          async function fillDynamicPageCmsUi() {
            await page.locator(`input[name=name]`)
              .fill(DYNAMIC_PAGE_NAME);

            await page.locator(`input[name=link]`)
              .fill(DYNAMIC_PAGE_LINK);

            await page.getByRole(`button`, {
              name: `Add a component to blocks`,
            })
              .click();

            await page.getByText(`hero`)
              .click();

            await page.getByText(`hero`)
              .click();

            await page.locator(`input[name='blocks.0.title']`)
              .fill(HERO_TITLE);

            await page.locator(`textarea[name='blocks.0.description']`)
              .fill(HERO_DESCRIPTION);

            await page.getByText(`No entry yet. Click to add one.`)
              .click();

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

      async function checkDynamicPageOnUi() {
        await goto(DYNAMIC_PAGE_LINK);

        await expect(page.getByText(DYNAMIC_PAGE_NAME))
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

export async function cleanupDynamicPageApi() {
  try {
    const dynamicPages = await cmsFetch(`${ENDPOINT}?populate=all`);

    const dynamicPage = dynamicPages.data.find((navigationItem: any) => navigationItem.name === DYNAMIC_PAGE_NAME);

    if (dynamicPage) {
      const response = await cmsFetch(`${ENDPOINT}/${dynamicPage.documentId}`, {
        method: `DELETE`,
      });

      await expect(response.status, `Dynamic page should be deleted with status 204`)
        .toEqual(204);
    }
  } catch (error: any) {
    throw new Error(`Failed to delete test dynamic page: ${error.message}`);
  }
}
