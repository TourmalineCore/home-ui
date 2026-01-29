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
| Accessibility    |  UI Accessibility | No    | No    | No    | Playwright, Axe-core |

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

### Screenshot Testing

#### Why do we write these tests?

We aim at creating stable robust UI and want keep it under control when the project is growing. We want to make sure that new components or pages don't affect the existing ones.</br>
We also want to test manually as little as possible, including the stage of design conformance.

#### When do we write these tests?

Everytime we start to write HTML and add styles for a component.</br>
In case you need to update the component, you need to regenerate its screenshot so it was up-to-date with the component's new appearnace.

#### What we test
Components with static data.</br>
If a component has several states, we can test them with screenshots, e.g. accordion in both collapsed and open state.</br>
We test components on all regular breakpoints: mobile, tablet, tablet-xl, desktop, desktop-xl.

#### What we don't test
We don't test on real dynamic data as it is too unpredictable. </br>
We also disable animations if they are present and disable autoplay for a video to make it static.</br>
We don't test components' behavior.
We dont test components between the breakpoints.
We don't test in all browsers, only in Chrome.

ToDo
- add link to the document with flow.

### Unit Testing
ToDo
- How do we test the work of functions e.g. filtration? We can test the request with Jest unit tests, but seems like we are missing some kind of component testing? To make sure that this request is triggered on click.

#### Why do we write these tests?
Here we can test functionality which we don't normally test in E2E, because it may not be a part of happy path scenario, including edge cases. 
These tests are easy to write and maintain, as well as faster and less demanding in terms of resources than E2E.

#### When do we write these tests?
Some minor functionality is too expensive to test in E2E. With unit tests we don't need to run CMS, database, and other extra dependencies. We can check such functionality in isolation. 

#### What we test
We can check such functionality as e.g. calculations or requests to CMS (Preview mode, Filter, Sort). 

#### What we don't test
The work of the application as a whole and its UI. 

### Accessibility Testing

#### Why do we write these tests?
We want our application to be accessible to all categories of users, including those with temporary and permanent limitations. Ensuring accessibility is an integral part of our development process, so we need to test it just like any other functionality. 

#### When do we write these tests?
Tests involving axe-core can be integrated at the start of the project to follow TDD approach.
Tests on correct keyboard navigation and focus visibility are written after the page is ready, because we need all interactive elements to be present on the page to be able to test them.

#### What we test
1. Axe-core
- sufficient color ratio
- alt attributes
- labels
- etc. </br>
These checks are based on [WCAG principles](https://www.w3.org/WAI/standards-guidelines/wcag/) level AA.

2. Correct keyboard navigation
3. Focus visibility of interactive elements

#### What we don't test
We don't autotest: 
- work of screenreaders such as VoiceOver or NVDA,
- usability
- content

These checks are done manually.
