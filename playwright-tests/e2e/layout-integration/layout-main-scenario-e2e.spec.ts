
import { Breakpoint } from "../../../common/enums";
import { NavigationListResponse, Navigation } from "../../../common/types";
import { cmsFetch } from "../../../services/cms/api/http-client";
import { E2E_UI_NAME_PREFIX } from "../../constants/e2e-ui-name-prefix";
import {
  CustomTestFixtures,
  expect,
  Page,
  test,
} from "../../custom-test";
import { cleanupLayoutApi } from "./layout-api-helpers";

const EMAIL_CAPTION = `If you have any questions`;
const EMAIL_ADDRESS = `test@tourmalinecore.com`;
const BUTTON_LABEL = `Discuss the project`;
const FOOTER_NAVIGATION_CAPTION = `Navigation`;

const HEADER_NAVIGATION = `${E2E_UI_NAME_PREFIX} Services`;
const NESTED_HEADER_NAVIGATION = `${E2E_UI_NAME_PREFIX} Frontend`;

const NAVIGATION_ENDPOINT = `/navigations`;

test.describe(`Main scenario for filling layout`, layoutMainScenarioTest);

async function layoutMainScenarioTest() {
  test.beforeEach(async () => {
    await cleanupNavigationByNameApi({
      name: HEADER_NAVIGATION,
    });

    await cleanupNavigationByNameApi({
      name: NESTED_HEADER_NAVIGATION,
    });

    await cleanupLayoutApi();
  });

  test.afterEach(async () => {
    await cleanupNavigationByNameApi({
      name: HEADER_NAVIGATION,
    });

    await cleanupNavigationByNameApi({
      name: NESTED_HEADER_NAVIGATION,
    });

    await cleanupLayoutApi();
  });

  test(
    `GIVEN an empty layout
      WHEN filling and publishing layout in CMS UI
      SHOULD see filled layout on frontend UI 
    `,
    async ({
      goto,
      authorizeInCms,
      skipCmsTutorial,
      setViewportSize,
      page,
    }: {
      goto: CustomTestFixtures['goto'];
      authorizeInCms: CustomTestFixtures['authorizeInCms'];
      skipCmsTutorial: CustomTestFixtures['skipCmsTutorial'];
      setViewportSize: CustomTestFixtures['setViewportSize'];
      page: Page;
    }) => {
      await page.goto(process.env.CMS_URL as string);

      await test.step(`Authorize in CMS`, authorizeInCms);

      await test.step(`Setup CMS content`, setupCmsContent);

      await test.step(`Check layout content on ui`, checkLayoutOnUi);

      async function setupCmsContent() {
        await page.getByText(`Content Manager`)
          .click();

        await skipCmsTutorial();

        await test.step(`Creating nested navigation`, createAndPublishNestedNavigationCmsUi);

        await test.step(`Filling layout content`, fillAndPublishLayoutCmsUi);

        async function createAndPublishNestedNavigationCmsUi() {
          await page.getByRole(`link`, {
            name: `Navigation`,
            exact: true,
          })
            .click();

          await page.getByRole(`link`, {
            name: `Create new entry`,
          })
            .last()
            .click();

          await page.locator(`input[name=name]`)
            .fill(NESTED_HEADER_NAVIGATION);

          await page.locator(`input[name=link]`)
            .fill(`/frontend`);

          await page.getByRole(`button`, {
            name: `Publish`,
          })
            .click();

          // Wait until navigation record is saved in db
          await page.waitForTimeout(1500);

          await page.getByRole(`link`, {
            name: `Navigation`,
            exact: true,
          })
            .click();

          await page.getByRole(`link`, {
            name: `Create new entry`,
          })
            .last()
            .click();

          await page.locator(`input[name=name]`)
            .fill(HEADER_NAVIGATION);

          await page.locator(`input[name=isMultiLevelNavigation]`)
            .check();

          await page.locator(`input[name=navItems]`)
            .click();

          await page.getByText(NESTED_HEADER_NAVIGATION)
            .click();

          await page.getByRole(`button`, {
            name: `Publish`,
          })
            .click();

          // Wait until navigation record is saved in db
          await page.waitForTimeout(1500);
        }

        async function fillAndPublishLayoutCmsUi() {
          await page.getByRole(`link`, {
            name: `Layout`,
          })
            .click();

          await page.locator(`input[name=emailAddress]`)
            .fill(EMAIL_ADDRESS);

          await page.locator(`input[name='header.buttonLabel']`)
            .fill(BUTTON_LABEL);

          await page.locator(`input[name='header.emailCaption']`)
            .fill(EMAIL_CAPTION);

          await page.locator(`input[name='header.navigationLists']`)
            .click();

          await page.getByText(HEADER_NAVIGATION)
            .click();

          await page.getByText(`No entry yet. Click to add one.`)
            .click();

          await page.getByText(`No entry yet. Click to add one.`)
            .click();

          await page.locator(`input[name='footer.navigationLists.0.caption']`)
            .fill(FOOTER_NAVIGATION_CAPTION);

          await page.locator(`input[name='footer.emailCaption']`)
            .fill(EMAIL_CAPTION);

          await page.getByRole(`button`, {
            name: `Publish`,
          })
            .click();

          // Wait until navigation record is saved in db
          await page.waitForTimeout(1500);
        }
      }

      async function checkLayoutOnUi() {
        await goto();

        await test.step(`Check desktop`, checkDesktop);

        await test.step(`Check mobile menu`, checkMobileMenu);

        async function checkDesktop() {
          await expect(page.getByText(HEADER_NAVIGATION))
            .toBeVisible();

          await page.getByText(HEADER_NAVIGATION)
            .hover();

          await expect(page.getByText(NESTED_HEADER_NAVIGATION))
            .toBeVisible();

          await expect(page.getByText(EMAIL_CAPTION))
            .toBeVisible();

          await expect(page.getByText(EMAIL_ADDRESS))
            .toBeVisible();

          await expect(page.getByText(BUTTON_LABEL))
            .toBeVisible();

          await expect(page.getByText(FOOTER_NAVIGATION_CAPTION))
            .toBeVisible();
        }

        async function checkMobileMenu() {
          await setViewportSize({
            width: Breakpoint.TABLET,
          });

          await page.getByTestId(`header-redesign-burger`)
            .click();

          const mobileMenu = await page.getByTestId(`mobile-menu-redesign`);

          await expect(mobileMenu)
            .toContainText(EMAIL_CAPTION);

          await expect(mobileMenu)
            .toContainText(EMAIL_ADDRESS);

          await expect(mobileMenu)
            .toContainText(BUTTON_LABEL);
        }
      }
    },
  );
}

async function cleanupNavigationByNameApi({
  name,
  locale = `en`,
}: {
  name: string;
  locale?: 'ru' | 'en';
}) {
  try {
    const navigationList = await cmsFetch<NavigationListResponse>(`${NAVIGATION_ENDPOINT}?populate=*&locale=${locale}`);

    const navigation = navigationList?.data?.find((navigationItem: Navigation) => navigationItem.name === name);

    if (navigation) {
      const response = await cmsFetch(`${NAVIGATION_ENDPOINT}/${navigation.documentId}?locale=${locale}`, {
        method: `DELETE`,
      });

      await expect(response.status, `Navigation should be deleted with status 204`)
        .toEqual(204);
    }
  } catch (error: any) {
    throw new Error(`Failed to delete test navigation: ${error.message}`);
  }
}
