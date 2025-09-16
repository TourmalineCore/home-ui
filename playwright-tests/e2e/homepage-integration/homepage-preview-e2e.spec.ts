import { E2E_UI_DRAFT_NAME_PREFIX } from "../../constants/e2e-ui-name-prefix";
import {
  CustomTestFixtures,
  expect,
  Page,
  test,
} from "../../custom-test";
import { cleanupHomepageApi, updateHomepageApi } from "./homepage-api-helpers";

const HERO_TITLE_DRAFT = `${E2E_UI_DRAFT_NAME_PREFIX} Tourmaline Core Tech Company`;
const HERO_DESCRIPTION_DRAFT = `${E2E_UI_DRAFT_NAME_PREFIX} Launching MVP, working on R&D projects, complex enterprise services, and websites.`;

const META_TITLE = `Homepage`;
const META_DESCRIPTION = `Development of public websites, customized enterprise information systems, and applications`;
const META_KEYWORDS = `public websites, enterprise information systems, software development`;

test.describe(`Open page preview`, homepagePreviewTest);

function homepagePreviewTest() {
  test.beforeEach(async () => {
    await cleanupHomepageApi();

    await updateHomepageApi({
      title: HERO_TITLE_DRAFT,
      description: HERO_DESCRIPTION_DRAFT,
      metaTitle: META_TITLE,
      metaDescription: META_DESCRIPTION,
      keywords: META_KEYWORDS,
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
}
