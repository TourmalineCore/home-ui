import Image from 'next/image';
import { ShowcaseColumnWithMediaProps } from '../../../../common/types';
import { SmartLink } from '../../../SmartLink/SmartLink';

export function ShowcaseColumnWithMedia({
  title,
  description,
  media,
  size,
  link,
  isNda,
}: ShowcaseColumnWithMediaProps) {
  return (
    <div className="showcase-column-with-media">
      {link ? (
        <SmartLink
          className="showcase-column-with-media__link"
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
        <div className="showcase-column-with-media__content">
          {title && <h3 className="showcase-column-with-media__title">{title}</h3>}
          {description && <p className="showcase-column-with-media__description">{description}</p>}
        </div>
        <div className={`showcase-column-with-media__images showcase-column-with-media__images--${size.toUpperCase()}`}>
          {isNda && <span className="showcase-column-with-media__nda">NDA</span>}
          {
            media.mime.startsWith(`image`) ? (
              <Image
                src={media.url}
                fill
                alt=""
              />
            ) : (
              <video
                className="showcase-column-with-media__video"
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
