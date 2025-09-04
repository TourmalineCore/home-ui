import { BlockType } from "../../enums";
import { BaseBlock } from "./base-block";

export interface CardsGridBlock extends BaseBlock<BlockType.HOME_CARDS_GRID> {
  cardWithImage: CardWithImage;
  cardWithRepositories: CardWithRepositories;
  cardWithTextAndDate: CardWithTextAndDate;
}

export interface CardWithImage extends CardWithContent {
  imageUrl: string;
}

export interface CardWithRepositories extends CardWithContent {
  title: string;
  repositories: {
    name: string;
    description?: string;
    language: string;
    link: string;
  }[];
  markdownText: string;
}

export interface CardWithTextAndDate extends CardWithContent {
  text: string;
  date: string;
}

export interface CardWithContent {
  title?: string;
  markdownText?: string;
}
