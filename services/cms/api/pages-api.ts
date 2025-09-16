import qs from "qs";
import {
  Page,
  HomepageResponse,
  SharedSeoComponent,
  Seo,
} from "../../../common/types";
import { cmsFetch } from "./http-client";
import { mapBlockResponseByType } from "../utils/mapBlockResponseByType";
import { AppRoute } from "../../../common/enums";
import { BlockApi } from "../../../common/types/blocks/api-block";

export async function getPageData({
  locale,
  status,
  slug,
}: {
  locale: string;
  status?: 'draft' | 'published';
  slug: string;
}): Promise<Page | null> {
  const queryParams = {
    populate: `all`,
    locale,
    status,
  };

  if (slug === AppRoute.Main) {
    const homepageResponse = await cmsFetch<HomepageResponse>(`/homepage?${qs.stringify(queryParams)}`);

    return mapPageResponse(homepageResponse);
  }

  return null;
}

type PageResponse = HomepageResponse | null | {
  data?: {
    blocks: BlockApi[];
    seo: SharedSeoComponent;
  };
};

function mapPageResponse(response: PageResponse): Page {
  if (!response?.data) {
    return {
      blocks: [],
      seo: {
        metaTitle: ``,
        metaDescription: ``,
        metaKeywords: ``,
      },
    };
  }

  const {
    data,
  } = response;

  const {
    seo, blocks,
  } = data;

  return {
    blocks: blocks
      .map((block) => mapBlockResponseByType(block))
      .filter((mappedBlock) => mappedBlock !== null),
    seo: mapSeoResponse(seo),
  };
}

function mapSeoResponse(seo: SharedSeoComponent): Seo {
  return {
    metaTitle: seo.metaTitle ?? ``,
    metaDescription: seo.metaDescription ?? ``,
    metaKeywords: seo.keywords ?? ``,
  };
}
