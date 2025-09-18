import Image from 'next/image';
import { SignpostProps } from '../../../../common/types';
import { SmartLink } from '../../../SmartLink/SmartLink';

export function Signpost({
  title,
  subtitle,
  link,
  imageUrl,
}: SignpostProps) {
  return (
    <div className="signpost">
      {link ? (
        <SmartLink
          className="signpost__link-wrapper"
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
        <div className="signpost__image-container">
          <Image
            src={imageUrl}
            fill
            alt=""
          />
        </div>
        <h3 className="signpost__title">
          {title}
        </h3>
        {subtitle && (
          <span className="signpost__subtitle">
            {subtitle}
          </span>
        )}
      </>
    );
  }
}
