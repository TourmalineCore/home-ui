import { BlockType } from '../../common/enums';
import { Block } from '../../common/types';
import { ThreeColumnGrid } from '../ThreeColumnGrid/ThreeColumnGrid';
import { FeaturedCardsList } from '../FeaturedCardsList/FeaturedCardsList';
import { CollageWithTitle } from '../CollageWithTitle/CollageWithTitle';
import { FormBlockRedesign } from '../redesign/FormBlockRedesign/FormBlockRedesign';
import { HeroRedesign } from '../redesign/HeroRedesign/HeroRedesign';
import { ShowcaseGrid } from '../ShowcaseGrid/ShowcaseGrid';
import { SignpostMultipleRedesign } from '../redesign/SignpostMultipleRedesign/SignpostMultipleRedesign';
import { SingleImageRedesign } from '../redesign/SingleImageRedesign/SingleImageRedesign';
import { CollageWithLink } from '../CollageWithLink/CollageWithLink';

export const BlockRenderer = ({
  block,
}: {
  block: Block;
}) => {
  if (block.__component === BlockType.SHARED_HERO) {
    return (
      <HeroRedesign
        title={block.title}
        description={block.description}
        imageUrls={block.imageUrls}
      />
    );
  }

  if (block.__component === BlockType.SHARED_FEATURED_CARDS_LIST) {
    return (
      <FeaturedCardsList
        title={block.title}
        cards={block.cards}
        targetId="featured-cards-list"
        anchorId={block.anchorId}
      />
    );
  }

  if (block.__component === BlockType.SHARED_SHOWCASE_GRID) {
    return (
      <ShowcaseGrid
        title={block.title}
        showcaseColumns={block.showcaseColumns}
        showOnMobile={block.showOnMobile}
        anchorId={block.anchorId}
      />
    );
  }

  if (block.__component === BlockType.SHARED_COLLAGE_WITH_TITLE) {
    return (
      <CollageWithTitle
        title={block.title}
        imageUrls={block.imageUrls}
      />
    );
  }

  if (block.__component === BlockType.SHARED_SIGNPOST_MULTIPLE) {
    return (
      <SignpostMultipleRedesign
        title={block.title}
        viewAllLink={block.viewAllLink}
        signposts={block.signposts}
      />
    );
  }

  if (block.__component === BlockType.SHARED_SINGLE_IMAGE) {
    return (
      <SingleImageRedesign
        imageUrl={block.imageUrl}
      />
    );
  }

  if (block.__component === BlockType.SHARED_THREE_COLUMN_GRID) {
    return (
      <ThreeColumnGrid
        columns={block.columns}
      />
    );
  }

  if (block.__component === BlockType.SHARED_COLLAGE_WITH_LINK) {
    return (
      <CollageWithLink
        text={block.text}
        link={block.link}
        imageUrls={block.imageUrls}
      />
    );
  }

  if (block.__component === BlockType.HOME_FORM_BLOCK) {
    return (
      <FormBlockRedesign />
    );
  }

  return null;
};
