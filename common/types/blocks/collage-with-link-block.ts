import { BlockType } from "../../enums";
import { BaseBlock } from "./base-block";

export interface CollageWithLinkBlock extends BaseBlock<BlockType.HOME_COLLAGE_WITH_LINK> {
  text: string;
  link: string;
  imageUrls: string[];
}
