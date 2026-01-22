import { getPlaiceholder } from "plaiceholder";

export async function generateBlurDataURL({
  image,
}: {
  image: any;
}) {
  if (!image?.formats?.thumbnail.url || !image?.url) {
    return ``;
  }

  // Use thumbnail because it is the smallest image in size, and only if it was not generated in the cms use url
  const buffer = await fetch(image.formats.thumbnail.url || image.url)
    .then(async (res) => Buffer.from(await res.arrayBuffer()));

  const {
    base64,
  } = await getPlaiceholder(buffer);

  return base64;
}
