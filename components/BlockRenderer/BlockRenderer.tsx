import { BlockType } from '../../common/enums';
import { Block } from '../../common/types';
import { FeaturedCardsList } from '../FeaturedCardsList/FeaturedCardsList';
import { CardsGridRedesign } from '../redesign/CardsGridRedesign/CardsGridRedesign';
import { CollageWithLinkRedesign } from '../redesign/CollageWithLinkRedesign/CollageWithLinkRedesign';
import { CollageWithTitleRedesign } from '../redesign/CollageWithTitleRedesign/CollageWithTitleRedesign';
import { FormBlockRedesign } from '../redesign/FormBlockRedesign/FormBlockRedesign';
import { HeroRedesign } from '../redesign/HeroRedesign/HeroRedesign';
import { ProjectsRedesign } from '../redesign/ProjectsRedesign/ProjectsRedesign';
import { ProjectsWithTextBlockRedesign } from '../redesign/ProjectsWithTextBlockRedesign/ProjectsWithTextBlockRedesign';
import { SignpostMultipleRedesign } from '../redesign/SignpostMultipleRedesign/SignpostMultipleRedesign';
import { SingleImageRedesign } from '../redesign/SingleImageRedesign/SingleImageRedesign';

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
        teamsCard={block.teamsCard}
        teams={block.teams}
        targetId="featured-cards-list"
      />
    );
  }

  if (block.__component === BlockType.HOME_PROJECTS_WITH_TEXT_BLOCK) {
    return (
      <ProjectsWithTextBlockRedesign
        title={block.title}
        textBlockTitle={block.textBlockTitle}
        projectCardsWithImage={block.projectCardsWithImage}
        textBlockMarkdown={block.textBlockMarkdown}
        showOnMobile={block.showOnMobile}
        targetId="projects"
      />
    );
  }

  if (block.__component === BlockType.HOME_PROJECTS) {
    return (
      <ProjectsRedesign
        projectCardsWithImage={block.projectCardsWithImage}
        showOnMobile={block.showOnMobile}
      />
    );
  }

  if (block.__component === BlockType.HOME_COLLAGE_WITH_TITLE) {
    return (
      <CollageWithTitleRedesign
        title={block.title}
        imageUrls={block.imageUrls}
      />
    );
  }

  if (block.__component === BlockType.HOME_SIGNPOST_MULTIPLE) {
    return (
      <SignpostMultipleRedesign
        title={block.title}
        viewAllLink={block.viewAllLink}
        viewAllLinkText={block.viewAllLinkText}
        signposts={block.signposts}
      />
    );
  }

  if (block.__component === BlockType.HOME_SINGLE_IMAGE) {
    return (
      <SingleImageRedesign
        imageUrl={block.imageUrl}
      />
    );
  }

  if (block.__component === BlockType.HOME_CARDS_GRID) {
    return (
      <CardsGridRedesign
        cardWithImage={block.cardWithImage}
        cardWithRepositories={block.cardWithRepositories}
        cardWithTextAndDate={block.cardWithTextAndDate}
      />
    );
  }

  if (block.__component === BlockType.HOME_COLLAGE_WITH_LINK) {
    return (
      <CollageWithLinkRedesign
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
