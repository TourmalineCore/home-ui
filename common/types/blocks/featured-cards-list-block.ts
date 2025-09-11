import { BlockType } from "../../enums";
import { BaseBlock } from "./base-block";

export interface FeaturedCardsListBlock extends BaseBlock<BlockType.SHARED_FEATURED_CARDS_LIST> {
  title: string;
  cards: FeaturedCardProps[];
}

export interface FeaturedCardProps extends Points, ImageCard, WideCardProps {
  id: number;
  theme: Theme;
  type: Type;
}

export interface Points {
  title?: string;
  points?: string[];
  link?: string;
  linkText?: string;
}

export interface ImageCard {
  imageUrl?: string;
}

export interface WideCardProps {
  title?: string;
  description?: string;
  wideCardItems: {
    id: number;
    icon: string;
    name: string;
    link?: string;
  }[];
  wideCardLink: {
    text: string;
    url: string;
  };
}

type Type = 'image' | 'points' | 'blank' | 'wide';

type Theme = 'white' | 'grey' | 'black' | 'blue';
