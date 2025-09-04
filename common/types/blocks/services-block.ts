import { BlockType } from "../../enums";
import { BaseBlock } from "./base-block";

export interface ServicesBlock extends BaseBlock<BlockType.HOME_SERVICES> {
  title: string;
  services: Service[];
  teamsCard: TeamsCard;
  teams: TeamSection;
}

export interface Service {
  id: number;
  title?: string;
  skillsList?: string[];
  link?: string;
  linkText?: string;
  theme: Theme;
  imageUrl?: string;
}

interface TeamsCard {
  theme: Theme;
  imageUrl: string;
}

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
