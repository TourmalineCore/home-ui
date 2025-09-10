import { BlockType } from "../../../common/enums";
import { Block } from "../../../common/types";
import { BlockApi } from "../../../common/types/blocks/api-block";

export function mapBlockResponseByType(block: BlockApi): Block | null {
  const component = block.__component;

  if (component === BlockType.SHARED_HERO) {
    return {
      __component: BlockType.SHARED_HERO,
      id: block.id,
      title: block.title ?? ``,
      description: block.description ?? ``,
      imageUrls: block.gallery?.map(({
        url,
      }) => url ?? ``) ?? [],
    };
  }

  return null;
}
