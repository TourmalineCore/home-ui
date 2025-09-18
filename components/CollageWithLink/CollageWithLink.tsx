import Image from 'next/image';
import { CollageWithLinkBlock } from '../../common/types';
import { SmartLink } from '../SmartLink/SmartLink';

export function CollageWithLink({
  text,
  link,
  imageUrls,
}: Omit<CollageWithLinkBlock, "__component">) {
  return (
    <section
      className="collage-with-link"
      data-testid="collage-with-link"
    >
      <div className="collage-with-link__wrapper">
        {link && (
          <SmartLink
            href={link}
            className="collage-with-link__accent-link"
          >
            <span
              className="collage-with-link__link-box"
              aria-hidden="true"
            >
              ?
            </span>
            <span
              className="collage-with-link__cta"
            >
              {text}
            </span>
          </SmartLink>
        )}
        {imageUrls.slice(0, 8)
          .map((imageUrl, index) => (
            <div
              key={imageUrl}
              className={`collage-with-link__image collage-with-link__image--${index + 1}`}
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
