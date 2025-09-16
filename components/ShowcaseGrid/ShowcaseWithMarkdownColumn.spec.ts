import { ComponentName } from "../../common/enums";
import { BREAKPOINTS } from "../../playwright-tests/constants/breakpoints";
import { test } from "../../playwright-tests/custom-test";

const TEST_ID = `showcase-with-markdown-column`;

test.describe(`ShowcaseWithMarkdownColumn`, () => {
  test.beforeEach(async ({
    goToComponentsPage,
  }) => {
    await goToComponentsPage(ComponentName.SHOWCASE_GRID_WITH_MARKDOWN_COLUMN);
  });

  for (const {
    name,
    breakpoint,
    breakpointName,
  } of BREAKPOINTS) {
    test(name, async ({
      testScreenshotAtBreakpoint,
    }) => {
      await testScreenshotAtBreakpoint({
        testId: TEST_ID,
        breakpoint,
        breakpointName,
      });
    });
  }
});
