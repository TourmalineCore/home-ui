import { getCmsApiUrl } from "../utils/getCmsApiUrl";

type CustomRequestInit = RequestInit & { isPreview?: boolean; jsonFormat?: boolean; };

const getCmsFetch = () => {
  const baseUrl = getCmsApiUrl();

  return async <T = any>(endpoint: string, options: CustomRequestInit = {}): Promise<T | null> => {
    const {
      isPreview,
      jsonFormat = true,
      ...restOptions
    } = options;

    const url = `${baseUrl}${endpoint}`;
    const updatedOptions: CustomRequestInit = {
      headers: {
        'Content-Type': `application/json`,
        ...(isPreview && {
          'Cache-Control': `no-cache`,
        }),
      },
      ...restOptions,
    };
    const response = await fetch(url, updatedOptions);

    if (response.status === 204 || response.status === 201) {
      return response as T;
    }

    if (!response.ok && response.status !== 404) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (response.status === 404) {
      return null;
    }

    if (jsonFormat) {
      return response.json() as Promise<T>;
    }

    return response as unknown as Promise<T>;
  };
};

export const cmsFetch = getCmsFetch();
