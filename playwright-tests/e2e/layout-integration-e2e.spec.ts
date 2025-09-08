import { Breakpoint } from "../../common/enums";
import { Navigation, NavigationListResponse } from "../../common/types";
import { cmsFetch } from "../../services/cms/api/http-client";
import { E2E_UI_DRAFT_NAME_PREFIX, E2E_UI_NAME_PREFIX } from "../constants/e2e-ui-name-prefix";
import {
  CustomTestFixtures,
  expect,
  Page,
  test,
} from "../custom-test";

const EMAIL_ADDRESS = `test@tourmalinecore.com`;
const EMAIL_CAPTION = `If you have any questions`;

const HEADER_NAVIGATION = `${E2E_UI_NAME_PREFIX} Services`;
const NESTED_HEADER_NAVIGATION = `${E2E_UI_NAME_PREFIX} Frontend`;

const BUTTON_LABEL_EN = `Discuss the project`;
const FOOTER_NAVIGATION_CAPTION_EN = `Navigation`;

const BUTTON_LABEL_RU = `Обсудить проект`;
const FOOTER_NAVIGATION_CAPTION_RU = `Навигация`;

const LAYOUT_ENDPOINT = `/layout`;
const NAVIGATION_ENDPOINT = `/navigations`;

const BUTTON_LABEL_DRAFT = `${E2E_UI_DRAFT_NAME_PREFIX} Discuss the project`;
const FOOTER_NAVIGATION_CAPTION_DRAFT = `${E2E_UI_DRAFT_NAME_PREFIX} Navigation`;

test.describe(`Layout integration e2e test`, () => {
  test.describe(`Main scenario for filling layout`, () => {
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

        await test.step(`authorize in CMS`, authorizeInCms);

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
              .fill(HEADER_NAVIGATION);

            await page.locator(`input[name=isMultiLevelNavigation]`)
              .check();

            await page.locator(`input[name=navItems]`)
              .click();

            await page.getByText(`Create a relation`, {
              exact: true,
            })
              .click();

            await page.locator(`input[name=name]`)
              .last()
              .fill(NESTED_HEADER_NAVIGATION);

            await page.locator(`input[name=link]`)
              .last()
              .fill(`/frontend`);

            await page.getByRole(`button`, {
              name: `Publish`,
            })
              .last()
              .click();

            await page.waitForTimeout(1500);

            await page.getByRole(`button`, {
              name: `Close modal`,
            })
              .click();

            await page.locator(`input[name=navItems]`)
              .click();

            await page.getByText(NESTED_HEADER_NAVIGATION)
              .click();

            await page.getByRole(`button`, {
              name: `Publish`,
            })
              .click();

            await page.waitForTimeout(1000);
          }

          async function fillAndPublishLayoutCmsUi() {
            await page.getByRole(`link`, {
              name: `Layout`,
            })
              .click();

            await page.locator(`input[name=emailAddress]`)
              .fill(EMAIL_ADDRESS);

            await page.locator(`input[name='header.buttonLabel']`)
              .fill(BUTTON_LABEL_EN);

            await page.locator(`input[name='header.emailCaption']`)
              .fill(EMAIL_CAPTION);

            await page.locator(`input[name='header.navigationLists']`)
              .click();

            await page.getByText(HEADER_NAVIGATION)
              .click();

            await page.getByText(`No entry yet. Click to add one.`)
              .click();

            await page.locator(`input[name='footer.navigationLists.0.caption']`)
              .fill(FOOTER_NAVIGATION_CAPTION_EN);

            await page.locator(`input[name='footer.emailCaption']`)
              .fill(EMAIL_CAPTION);

            await page.getByRole(`button`, {
              name: `Publish`,
            })
              .click();
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

            await expect(page.getByText(BUTTON_LABEL_EN))
              .toBeVisible();

            await expect(page.getByText(FOOTER_NAVIGATION_CAPTION_EN))
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
              .toContainText(BUTTON_LABEL_EN);
          }
        }
      },
    );

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
  });

  test.describe(`Creating layout in different languages`, () => {
    test.beforeEach(async () => {
      await cleanupLayoutApi();

      await cleanupLayoutApi({
        locale: `ru`,
      });

      await updateLayoutApi({
        buttonLabel: BUTTON_LABEL_EN,
        navigationListCaption: FOOTER_NAVIGATION_CAPTION_EN,
      });

      await updateLayoutApi({
        buttonLabel: BUTTON_LABEL_RU,
        navigationListCaption: FOOTER_NAVIGATION_CAPTION_RU,
        locale: `ru`,
      });
    });

    test.afterEach(async () => {
      await cleanupLayoutApi();

      await cleanupLayoutApi({
        locale: `ru`,
      });
    });

    test(
      `
      GIVEN an empty layout
      WHEN filling layout content in different languages via API
      AND checking the layout content in different languages
      THEN the user should see layout content on the frontend UI with correct translations
    `,
      async ({
        goto,
        page,
      }: {
        goto: CustomTestFixtures['goto'];
        page: Page;
      }) => {
        await goto();

        await expect(page.getByText(BUTTON_LABEL_EN))
          .toBeVisible();

        await expect(page.getByText(FOOTER_NAVIGATION_CAPTION_EN))
          .toBeVisible();

        await page.getByTestId(`lang-switch`)
          .hover();

        await page.getByText(`RU`)
          .click();

        await page.waitForLoadState(`networkidle`);

        await expect(page.getByText(BUTTON_LABEL_RU))
          .toBeVisible();

        await expect(page.getByText(FOOTER_NAVIGATION_CAPTION_RU))
          .toBeVisible();
      },
    );
  });

  test.describe(`Open page preview`, () => {
    test.beforeEach(async () => {
      await cleanupLayoutApi();

      await updateLayoutApi({
        buttonLabel: BUTTON_LABEL_DRAFT,
        navigationListCaption: FOOTER_NAVIGATION_CAPTION_DRAFT,
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
  });
});

async function updateLayoutApi({
  buttonLabel,
  navigationListCaption,
  locale = `en`,
  status = `published`,
}: {
  buttonLabel: string;
  navigationListCaption: string;
  locale?: 'ru' | 'en';
  status?: 'draft' | 'published';
}) {
  try {
    const response = await cmsFetch(`${LAYOUT_ENDPOINT}?locale=${locale}&status=${status}`, {
      method: `PUT`,
      body: JSON.stringify({
        data: {
          emailAddress: EMAIL_ADDRESS,
          header: {
            buttonLabel,
          },
          footer: {
            navigationLists: [
              {
                caption: navigationListCaption,
              },
            ],
          },
        },
        locale,
      }),
    });
    await expect(response.data, `Layout should be updated`)
      .not.toBeNull();
  } catch (error: any) {
    throw new Error(`Failed to update layout: ${error.message}`);
  }
}

async function cleanupLayoutApi({
  locale = `en`,
}: {
  locale?: 'en' | 'ru';
} = {}) {
  try {
    const response = await cmsFetch(`${LAYOUT_ENDPOINT}?locale=${locale}`, {
      method: `DELETE`,
    });

    await expect(response.status, `Layout should be deleted with status 204`)
      .toEqual(204);
  } catch (error: any) {
    throw new Error(`Failed to delete test layout: ${error.message}`);
  }
}
