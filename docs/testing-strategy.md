# Testing Strategy

We develop software according to Test-Driven Development (TDD).

## Objectives

## Parallel Execution of Tests

All tests must support concurrent parallel invocation. The only exception is end-to-end tests which run one after the other. The reason is that we emulate the user's interaction with Strapi CMS, which reloads the page on save. So, saving some data in one test will cause the other E2E tests to fail if we try to run them in parallel. And we have no control of this behavior.

## Types of Tests

| Type    | Target | Run Against Prod | Use Real DB | Need Data Cleanup | Tools |
| -------- | ------- | ------- |------- |------- |------- |
| E2E  | UI & CMS Integration   | No    | Yes    | Yes (?)   | Playwright |
| Screenshot |   UI   | No    | No    | No    | Playwright |
| Unit    | Requests to CMS (Preview mode, Filter, Sort)   | No    | No    | No    | Jest |
| Accessability    |  UI Accessability | No    | No    | No    | Playwright, Axe-core |

### E2E

#### Why do we write these tests?
We want to test the happy path of the content manager's work with CMS filling the content in the admin panel, saving and publishing changes, and expecting to see them on UI. 

#### When do we write these tests?
We add E2E tests when we add new integration with CMS in order to check that requests to the following will be displayed on UI correctly:
1) Single Types in terms of Strapi CMS, such as home page, layout;
2) Collection Types in terms of Strapi CMS, such as navigation, news list, portfolio.

#### What we test

We test only the happy path - the core business flow. We limit the number of E2E tests to only the core business flow to avoid falling back into the situation when we test every change with a coarse-grained tests when it is an overkill and a lighter more fine-grained test is enough. Time to run the tests is also a limitation factor.
Alongside the happy path, we also test SEO that is set in the CMS to make sure it is applied in HTML tree of the page.
All E2E tests are executed against Local Env. 

ToDo
- We don't test ALL of the components in E2E - how can we be sure that data from CMS is mapped correctly? Screenshot testing is done with mocks, not real data. 
- We don't test against Prod because it is too risky to lose client's data. It may be more or less safe to test Collection Types because we add a new entry and it doesn't affect the rest. But this is not the case with Single Types. So is this potentailly OK to test Collection but not Single types?


#### What we don't test

Edge cases with different deviations of input data.
