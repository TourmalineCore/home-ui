import { BlockType } from "../../../common/enums";
import { Block, FeaturedCardProps } from "../../../common/types";
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

  return null;
}
