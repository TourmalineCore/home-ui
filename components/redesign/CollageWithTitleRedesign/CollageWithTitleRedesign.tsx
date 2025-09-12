import Image from 'next/image';
import { CollageWithTitleBlock } from '../../../common/types';

export function CollageWithTitleRedesign({
  title,
  imageUrls,
}: Omit<CollageWithTitleBlock, "__component">) {
  return (
    <section
      className="collage-with-title-redesign"
      data-testid="collage-with-title"
    >
      <div className="collage-with-title-redesign__wrapper">
        <h2 className="container-redesign collage-with-title-redesign__title">{title}</h2>
        {imageUrls.slice(0, 9)
          .map((imageUrl, index) => (
            <div
              key={imageUrl}
              className={`collage-with-title-redesign__image collage-with-title-redesign__image--${index + 1}`}
            >
              <Image
                src={imageUrl}
                fill
                alt=""
              />
            </div>
          ))}
      </div>
    </section>
  );
}
