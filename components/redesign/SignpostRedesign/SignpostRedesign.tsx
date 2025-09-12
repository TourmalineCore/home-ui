import Image from 'next/image';
import { Signpost } from '../../../common/types';
import { SmartLink } from '../../SmartLink/SmartLink';

export function SignpostRedesign({
  title,
  subtitle,
  link,
  imageUrl,
}: Signpost) {
  return (
    <div className="signpost-redesign">
      {link ? (
        <SmartLink
          className="signpost-redesign__link-wrapper"
          href={link}
        >
          {renderSignpostContent()}
        </SmartLink>
      )
        : renderSignpostContent()}
    </div>
  );

  function renderSignpostContent() {
    return (
      <>
        <div className="signpost-redesign__image-container">
          <Image
            src={imageUrl}
            fill
            alt=""
          />
        </div>
        <h3 className="signpost-redesign__title">
          {title}
        </h3>
        {subtitle && (
          <span className="signpost-redesign__subtitle">
            {subtitle}
          </span>
        )}
      </>
    );
  }
}
