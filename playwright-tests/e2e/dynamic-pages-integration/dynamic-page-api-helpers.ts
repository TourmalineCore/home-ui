import { cmsFetch } from "../../../services/cms/api/http-client";
import { expect } from "../../custom-test";
import { DYNAMIC_PAGE_NAME } from "./dynamic-page-main-scenario-e2e.spec";

const ENDPOINT = `/navigations`;

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
