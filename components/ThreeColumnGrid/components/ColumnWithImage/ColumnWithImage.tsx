import Image from 'next/image';
import clsx from 'clsx';
import { ColumnWithContent } from '../../../ColumnWithContent/ColumnWithContent';
import { ColumnWithImageProps } from '../../../../common/types';

export function ColumnWithImage({
  title,
  markdownText,
  imageUrl,
  className,
}: ColumnWithImageProps & {
  className: string;
}) {
  return (
    <ColumnWithContent
      title={title}
      markdownText={markdownText}
      className={clsx(`column-with-image`, className)}
    >
      <div className="column-with-image__image">
        <Image
          src={imageUrl}
          fill
          alt=""
        />
      </div>
    </ColumnWithContent>
  );
}
