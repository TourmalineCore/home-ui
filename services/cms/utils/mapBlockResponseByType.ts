import { BlockType } from "../../../common/enums";
import {
  Block,
  FeaturedCardProps,
  SignpostMultipleBlock,
  Column,
  ShowcaseGridBlock,
  HeroBlock,
} from "../../../common/types";
import { BlockApi } from "../../../common/types/blocks/api-block";
import { generateBlurDataURL } from "./generateBlurDataURL";

export async function mapBlockResponseByType(block: BlockApi): Promise<Block | null> {
  const component = block.__component;

  if (component === BlockType.SHARED_HERO) {
    const media = block.media?.[0].mime?.startsWith(`video`)
      ? block.media
      : await Promise.all(
        (block.media || []).map(async (image) => ({
          url: image.url || ``,
          mime: image.mime,
          blurDataURL: await generateBlurDataURL({
            image,
          }),
        })),
      );

    return {
      __component: BlockType.SHARED_HERO,
      id: block.id,
      title: block.title || ``,
      description: block.description,
      media: media as HeroBlock['media'],
    };
  }

  if (component === BlockType.SHARED_FEATURED_CARDS_LIST) {
    const featuredCards = await Promise.all(
      (block.featuredCards || []).map(async (card) => ({
        id: card.id,
        type: card.type,
        theme: card.cardWithPoints?.theme || card.cardWithImage?.theme || null,
        title: card.wideCard?.title || card.cardWithPoints?.title || null,
        points: card.cardWithPoints?.points?.map(({
          text,
        }) => text) || null,
        link: card.cardWithPoints?.link || card.wideCard?.link || null,
        ...(card.cardWithImage?.image?.url && {
          imageWithBlurDataURL: {
            url: card.cardWithImage.image.url,
            blurDataURL: await generateBlurDataURL({
              image: card.cardWithImage.image,
            }),
          },
        }),
        description: card.wideCard?.description || null,
        wideCardItems: card.wideCard?.wideCardItems?.map((item) => ({
          id: item.id,
          name: item.name || ``,
          link: item.link,
          icon: item.icon?.url || null,
        })) || null,
      })),
    );

    return {
      __component: BlockType.SHARED_FEATURED_CARDS_LIST,
      id: block.id,
      title: block.title,
      anchorId: block.anchorId,
      cards: featuredCards as FeaturedCardProps[] || [],
    };
  }

  if (component === BlockType.SHARED_COLLAGE_WITH_TITLE) {
    const imagesWithBlurDataURL = await Promise.all(
      (block.images || []).map(async (image) => ({
        url: image.url || ``,
        blurDataURL: await generateBlurDataURL({
          image,
        }),
      })),
    );

    return {
      __component: BlockType.SHARED_COLLAGE_WITH_TITLE,
      id: block.id,
      title: block.title || ``,
      imagesWithBlurDataURL,
    };
  }

  if (component === BlockType.SHARED_COLLAGE_WITH_LINK) {
    const imagesWithBlurDataURL = await Promise.all(
      (block.images || []).map(async (image) => ({
        url: image.url || ``,
        blurDataURL: await generateBlurDataURL({
          image,
        }),
      })),
    );

    return {
      __component: BlockType.SHARED_COLLAGE_WITH_LINK,
      id: block.id,
      text: block.link?.text || ``,
      link: block.link?.url || ``,
      imagesWithBlurDataURL,
    };
  }

  if (component === BlockType.SHARED_SIGNPOST_MULTIPLE) {
    const signposts = await Promise.all(
      (block.signposts || []).map(async (signpost) => ({
        title: signpost.title || ``,
        subtitle: signpost.subtitle,
        link: signpost.link,
        imageWithBlurDataURL: {
          url: signpost.image?.url || ``,
          blurDataURL: await generateBlurDataURL({
            image: signpost.image,
          }),
        },
      })),
    );

    return {
      __component: BlockType.SHARED_SIGNPOST_MULTIPLE,
      id: block.id,
      title: block.title,
      viewAllLink: block.link as SignpostMultipleBlock['viewAllLink'],
      signposts,
    };
  }

  if (component === BlockType.SHARED_SINGLE_IMAGE) {
    return {
      __component: BlockType.SHARED_SINGLE_IMAGE,
      id: block.id,
      imageWithBlurDataURL: {
        url: block.image?.url || ``,
        blurDataURL: await generateBlurDataURL({
          image: block.image,
        }),
      },
    };
  }

  if (component === BlockType.SHARED_THREE_COLUMN_GRID) {
    const columns = await Promise.all(
      (block.columnsWithContent || []).map(async (column) => ({
        id: column.id,
        type: column.type,
        columnWithImage: {
          ...column.columnWithImage,
          imageWithBlurDataURL: {
            url: column.columnWithImage?.image?.url || ``,
            blurDataURL: await generateBlurDataURL({
              image: column.columnWithImage?.image,
            }),
          },
        },
        columnWithRepositories: column.columnWithRepositories,
        columnWithTextAndDate: column.columnWithTextAndDate,
      })),
    );

    return {
      __component: BlockType.SHARED_THREE_COLUMN_GRID,
      id: block.id,
      columns: columns as Column[],
    };
  }

  if (component === BlockType.SHARED_SHOWCASE_GRID) {
    const showcaseColumns = await Promise.all(
      (block.showcaseColumns || []).map(async (column) => ({
        id: column.id,
        type: column.type,
        showcaseColumnWithMedia: column.showcaseColumnWithMedia ? {
          title: column.showcaseColumnWithMedia.title,
          description: column.showcaseColumnWithMedia.description,
          media: {
            url: column.showcaseColumnWithMedia.media?.url || ``,
            mime: column.showcaseColumnWithMedia.media?.mime || ``,
            ...(column.showcaseColumnWithMedia.media?.mime?.startsWith(`image`) && {
              blurDataURL: await generateBlurDataURL({
                image: column.showcaseColumnWithMedia?.media,
              }),
            }),
          },
          link: column.showcaseColumnWithMedia.link,
          isNda: column.showcaseColumnWithMedia.isNda,
          size: column.showcaseColumnWithMedia.size,
        } : null,
        showcaseColumnWithMarkdown: column.showcaseColumnWithMarkdown || null,
      })),
    );

    return {
      __component: BlockType.SHARED_SHOWCASE_GRID,
      id: block.id,
      showOnMobile: block.showOnMobile!,
      title: block.title,
      anchorId: block.anchorId,
      showcaseColumns: showcaseColumns as ShowcaseGridBlock['showcaseColumns'] || [],
    };
  }
  return null;
}
