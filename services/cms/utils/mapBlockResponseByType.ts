import { BlockType } from "../../../common/enums";
import {
  Block,
  FeaturedCardProps,
  SignpostMultipleBlock,
  Column,
} from "../../../common/types";
import { BlockApi } from "../../../common/types/blocks/api-block";

export function mapBlockResponseByType(block: BlockApi): Block | null {
  const component = block.__component;

  if (component === BlockType.SHARED_HERO) {
    return {
      __component: BlockType.SHARED_HERO,
      id: block.id,
      title: block.title ?? ``,
      description: block.description ?? ``,
      imageUrls: block.gallery?.map(({
        url,
      }) => url ?? ``) ?? [],
    };
  }

  if (component === BlockType.SHARED_FEATURED_CARDS_LIST) {
    const featuredCards = block.featuredCards?.map((card) => ({
      id: card.id,
      type: card.type,
      theme: card.cardWithPoints?.theme || card.cardWithImage?.theme || null,
      title: card.wideCard?.title || card.cardWithPoints?.title || null,
      points: card.cardWithPoints?.points?.map(({
        text,
      }) => text) || null,
      link: card.cardWithPoints?.link || card.wideCard?.link || null,
      imageUrl: card.cardWithImage?.image?.url || null,
      description: card.wideCard?.description || null,
      wideCardItems: card.wideCard?.wideCardItems?.map((item) => ({
        ...item,
        icon: item.icon?.url || null,
      })) || null,
    }));

    return {
      __component: BlockType.SHARED_FEATURED_CARDS_LIST,
      id: block.id,
      title: block.title ?? ``,
      cards: featuredCards as FeaturedCardProps[] ?? [],
    };
  }

  if (component === BlockType.SHARED_COLLAGE_WITH_TITLE) {
    return {
      __component: BlockType.SHARED_COLLAGE_WITH_TITLE,
      id: block.id,
      title: block.title ?? ``,
      imageUrls: block.images?.map(({
        url,
      }) => url ?? ``) ?? [],
    };
  }

  if (component === BlockType.SHARED_SIGNPOST_MULTIPLE) {
    return {
      __component: BlockType.SHARED_SIGNPOST_MULTIPLE,
      id: block.id,
      title: block.title ?? ``,
      viewAllLink: block.link as SignpostMultipleBlock['viewAllLink'] ?? null,
      signposts: block.signposts?.map((signpost) => ({
        title: signpost.title ?? ``,
        subtitle: signpost.subtitle ?? ``,
        link: signpost.link ?? ``,
        imageUrl: signpost.image?.url ?? ``,
      })) ?? [],
    };
  }

  if (component === BlockType.SHARED_SINGLE_IMAGE) {
    return {
      __component: BlockType.SHARED_SINGLE_IMAGE,
      id: block.id,
      imageUrl: block.image?.url ?? ``,
    };
  }

  if (component === BlockType.SHARED_THREE_COLUMN_GRID) {
    return {
      __component: BlockType.SHARED_THREE_COLUMN_GRID,
      id: block.id,
      columns: block.columnsWithContent?.map((column) => ({
        id: column.id,
        type: column.type,
        columnWithImage: {
          ...column.columnWithImage,
          imageUrl: column.columnWithImage?.image?.url ?? [],
        },
        columnWithRepositories: column.columnWithRepositories || null,
        columnWithTextAndDate: column.columnWithTextAndDate || null,
      })) as Column[] ?? [],
    };
  }
  return null;
}
