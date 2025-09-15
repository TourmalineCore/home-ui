import { BlockType } from "../../enums";
import { BaseBlock } from "./base-block";

export interface ThreeColumnGridBlock extends BaseBlock<BlockType.SHARED_THREE_COLUMN_GRID> {
  columns: {
    id: number;
    type: 'image' | 'repositories' | 'text-and-date';
    cardWithImage: ColumnWithImageProps | null;
    cardWithRepositories: ColumnWithRepositoriesProps | null;
    cardWithTextAndDate: ColumnWithTextAndDateProps | null;
  }[];
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
