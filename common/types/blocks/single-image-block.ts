import { BlockType } from "../../enums";
import { BaseBlock } from "./base-block";

export interface SingleImageBlock extends BaseBlock<BlockType.SHARED_SINGLE_IMAGE> {
  imageUrl: string;
}
