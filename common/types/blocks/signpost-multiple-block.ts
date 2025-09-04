import { BlockType } from "../../enums";
import { BaseBlock } from "./base-block";

export interface SignpostMultipleBlock extends BaseBlock<BlockType.HOME_SIGNPOST_MULTIPLE> {
  title: string;
  viewAllLink: string;
  viewAllLinkText: string;
  signposts: Signpost[];
}

export interface Signpost {
  title: string;
  subtitle: string;
  link?: string;
  imageUrl: string;
}
