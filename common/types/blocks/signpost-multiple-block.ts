import { BlockType } from "../../enums";
import { BaseBlock } from "./base-block";

export interface SignpostMultipleBlock extends BaseBlock<BlockType.SHARED_SIGNPOST_MULTIPLE> {
  title?: string;
  viewAllLink?: {
    url: string;
    text: string;
  } | null;
  signposts: SignpostProps[];
}

export interface SignpostProps {
  title: string;
  subtitle?: string;
  link?: string;
  imageUrl: string;
}
