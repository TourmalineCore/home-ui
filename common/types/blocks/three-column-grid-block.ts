import { BlockType } from "../../enums";
import { BaseBlock } from "./base-block";

export interface ThreeColumnGridBlock extends BaseBlock<BlockType.HOME_CARDS_GRID> {
  cardWithImage: ColumnWithImageProps;
  cardWithRepositories: ColumnWithRepositoriesProps;
  cardWithTextAndDate: ColumnWithTextAndDateProps;
}

export interface ColumnWithImageProps extends ColumnWithContentProps {
  imageUrl: string;
}

export interface ColumnWithRepositoriesProps extends ColumnWithContentProps {
  title: string;
  repositories: {
    name: string;
    description?: string;
    language: string;
    link: string;
  }[];
  markdownText: string;
}

export interface ColumnWithTextAndDateProps extends ColumnWithContentProps {
  text: string;
  date: string;
}

export interface ColumnWithContentProps {
  title?: string;
  markdownText?: string;
}
