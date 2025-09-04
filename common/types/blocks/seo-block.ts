import { BlockType } from "../../enums";
import { BaseBlock } from "./base-block";

export interface SeoBlock extends BaseBlock<BlockType.SHARED_SEO_BLOCK> {
  metaTitle: string;
  metaDescription: string;
  metaKeywords?: string;
}
