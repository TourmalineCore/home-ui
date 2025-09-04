import { BlockType } from "../../enums";
import { BaseBlock } from "./base-block";

export interface HeroBlock extends BaseBlock<BlockType.HOME_HERO> {
  title: string;
  description: string;
  imageUrls: string[];
}
