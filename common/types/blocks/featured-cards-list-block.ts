import { BlockType } from "../../enums";
import { BaseBlock } from "./base-block";

export interface FeaturedCardsListBlock extends BaseBlock<BlockType.SHARED_FEATURED_CARDS_LIST> {
  title: string;
  cards: FeaturedCardProps[];
  teamsCard: TeamsCard;
  teams: TeamSection;
}

export interface FeaturedCardProps {
  id: number;
  title?: string;
  points?: string[];
  link?: string;
  linkText?: string;
  theme: Theme;
  imageUrl?: string;
  type: Type;
}

interface TeamsCard {
  theme: Theme;
  imageUrl: string;
}

type Type = 'image' | 'points' | 'blank' | 'wide';

type Theme = 'white' | 'grey' | 'black' | 'blue';

interface TeamSection {
  title: string;
  description: string;
  link: string;
  linkText: string;
  teamsList: {
    teamName: string;
    teamIcon: string;
    teamLink?: string;
  }[];
}
