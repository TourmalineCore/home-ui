import { BlockType } from "../../enums";
import { BaseBlock } from "./base-block";

export interface HeroBlock extends BaseBlock<BlockType.SHARED_HERO> {
  title: string;
  description?: string;
  media?: MediaProps[];
}
export interface MediaProps {
  url: string;
  mime: string;
}
