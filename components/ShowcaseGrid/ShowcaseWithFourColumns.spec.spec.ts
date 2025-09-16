import { test } from '../../playwright-tests/custom-test';
import { BREAKPOINTS } from '../../playwright-tests/constants/breakpoints';
import { ComponentName } from '../../common/enums';

const TEST_ID = `showcase-with-four-columns`;

test.describe(`ShowcaseWithFourColumns`, () => {
  test.beforeEach(async ({
    goToComponentsPage,
  }) => {
    await goToComponentsPage(ComponentName.SHOWCASE_GRID_WITH_FOUR_COLUMNS);
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
