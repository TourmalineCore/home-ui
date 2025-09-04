import { BlockType } from "../../enums";
import { BaseBlock } from "./base-block";

export interface BaseProject<T extends BlockType> extends BaseBlock<T> {
  projectCardsWithImage: ProjectCardWithImage[];
  showOnMobile?: boolean;
}

export interface ProjectCardWithImage {
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  link?: string;
  isNda?: boolean;
  size: 'L' | 'M' | 'S' | 'XS';
}

export interface ProjectWithTextBlock extends BaseProject<BlockType.HOME_PROJECTS_WITH_TEXT_BLOCK> {
  title: string;
  textBlockTitle: string;
  textBlockMarkdown: string;
}

export interface ProjectBlock extends BaseProject<BlockType.HOME_PROJECTS> {}
