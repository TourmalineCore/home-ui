import Image from 'next/image';
import clsx from 'clsx';
import { CardWithContentRedesign } from '../../../CardWithContentRedesign/CardWithContentRedesign';
import { CardWithImage } from '../../../../../common/types';

export function CardWithImageRedesign({
  title,
  markdownText,
  imageUrl,
  className,
}: CardWithImage & {
  className: string;
}) {
  return (
    <CardWithContentRedesign
      title={title}
      markdownText={markdownText}
      className={clsx(`card-with-image-redesign`, className)}
    >
      <div className="card-with-image-redesign__image">
        <Image
          src={imageUrl}
          fill
          alt=""
        />
      </div>
    </CardWithContentRedesign>
  );
}
