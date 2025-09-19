import Image from 'next/image';
import { SingleImageBlock } from '../../common/types';

export function SingleImage({
  imageUrl,
}: Omit<SingleImageBlock, "__component">) {
  return (
    <section
      className="single-image container-redesign"
      data-testid="single-image"
    >
      <div className="single-image__container">
        <Image
          src={imageUrl}
          fill
          alt=""
        />
      </div>
    </section>
  );
}
