import Image from 'next/image';
import { ShowcaseColumnWithImageProps } from '../../../../common/types';
import { SmartLink } from '../../../SmartLink/SmartLink';

export function ShowcaseColumnWithImage({
  title,
  description,
  media,
  size,
  link,
  isNda,
}: ShowcaseColumnWithImageProps) {
  return (
    <div className="showcase-column-with-image">
      {link ? (
        <SmartLink
          className="showcase-column-with-image__link"
          href={link}
        >
          {renderCardContent()}
        </SmartLink>
      )
        : renderCardContent()}
    </div>
  );

  function renderCardContent() {
    return (
      <>
        <div className="showcase-column-with-image__content">
          <h3 className="showcase-column-with-image__title">{title}</h3>
          <p className="showcase-column-with-image__description">{description}</p>
        </div>
        <div className={`showcase-column-with-image__images showcase-column-with-image__images--${size.toUpperCase()}`}>
          {isNda && <span className="showcase-column-with-image__nda">NDA</span>}
          {
            media.mime.startsWith(`image`) ? (
              <Image
                src={media.url}
                fill
                alt=""
              />
            ) : (
              <video
                className="showcase-column-with-image__video"
                src={media.url}
                playsInline
                loop
                muted
                autoPlay
              />
            )
          }
        </div>
      </>
    );
  }
}
