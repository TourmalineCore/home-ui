import { E2E_UI_DRAFT_NAME_PREFIX } from "../../constants/e2e-ui-name-prefix";
import {
  CustomTestFixtures,
  expect,
  Page,
  test,
} from "../../custom-test";
import { cleanupLayoutApi, updateLayoutApi } from "./layout-api-helpers";

const EMAIL_ADDRESS = `test@tourmalinecore.com`;

const BUTTON_LABEL_DRAFT = `${E2E_UI_DRAFT_NAME_PREFIX} Discuss the project`;
const FOOTER_NAVIGATION_CAPTION_DRAFT = `${E2E_UI_DRAFT_NAME_PREFIX} Navigation`;

test.describe(`Open page preview`, layoutPreviewTest);

function layoutPreviewTest() {
  test.beforeEach(async () => {
    await cleanupLayoutApi();

    await updateLayoutApi({
      buttonLabel: BUTTON_LABEL_DRAFT,
      navigationListCaption: FOOTER_NAVIGATION_CAPTION_DRAFT,
      emailAddress: EMAIL_ADDRESS,
      status: `draft`,
    });
  });

  test.afterEach(async () => {
    await cleanupLayoutApi();
  });

  test(
    `
      GIVEN an empty layout
      WHEN filling layout content and saving changes via API
      AND opening the page in preview mode
      SHOULD see filled layout on frontend UI in preview mode
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

      await expect(page.getByText(BUTTON_LABEL_DRAFT))
        .toBeHidden();

      await expect(page.getByText(FOOTER_NAVIGATION_CAPTION_DRAFT))
        .toBeHidden();

      await gotoInPreviewMode();

      await expect(page.getByText(BUTTON_LABEL_DRAFT))
        .toBeVisible();

      await expect(page.getByText(FOOTER_NAVIGATION_CAPTION_DRAFT))
        .toBeVisible();
    },
  );
}
