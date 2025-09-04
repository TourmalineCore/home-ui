import Image from 'next/image';
import { SingleImageBlock } from '../../../common/types';

export function SingleImageRedesign({
  imageUrl,
}: Omit<SingleImageBlock, "__component">) {
  return (
    <section
      className="single-image-redesign container-redesign"
      data-testid="single-image"
    >
      <div className="single-image-redesign__container">
        <Image
          src={imageUrl}
          fill
          alt=""
        />
      </div>
    </section>
  );
}
