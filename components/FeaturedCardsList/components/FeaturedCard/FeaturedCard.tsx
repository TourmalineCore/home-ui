import clsx from 'clsx';
import Image from 'next/image';
import IconArrow from '../../../../icons/icon-arrow-redesign.svg';
import { FeaturedCardProps } from '../../../../common/types';
import { WideCard } from './components/WideCard/WideCard';
import { SmartLink } from '../../../SmartLink/SmartLink';

export function FeaturedCard({
  title,
  description,
  points,
  link,
  wideCardItems,
  theme,
  imageUrl,
  type,
}: Omit<FeaturedCardProps, 'id'>) {
  if (type === `points` || type === `image`) {
    return (
      <li
        className={clsx(`featured-card featured-card--${theme.toLowerCase()} col-tablet-6 col-tablet-xl-4 col-desktop-3`)}
      >
        {link ? (
          <SmartLink
            className="featured-card__link-wrapper"
            href={link.url}
          >
            {renderCardContent()}
          </SmartLink>
        )
          : renderCardContent()}

      </li>
    );
  }

  if (type === `wide`) {
    return (
      <WideCard
        className="featured-card__wide-card"
        title={title}
        description={description}
        wideCardItems={wideCardItems}
        link={link}
      />
    );
  }

  return (
    <li className="featured-card featured-card--white featured-card--blank col-tablet-12 col-tablet-xl-4 col-desktop-3" />
  );

  function renderCardContent() {
    return (
      <div
        className={clsx(
          `featured-card__inner`,
        )}
      >
        {
          title && (
            <h3 className="featured-card__title">
              {title}
            </h3>
          )
        }
        {
          points && (
            <ul className="featured-card__list">
              {points.map((point) => (
                <li
                  className="featured-card__item"
                  key={point}
                >
                  {point}
                </li>
              ))}
            </ul>
          )
        }
        {link && (
          <span
            className="featured-card__link-text"
          >
            {link.text}
            <IconArrow />
          </span>
        )}
        {
          imageUrl && (
            <div className="featured-card__image-container">
              <Image
                src={imageUrl}
                fill
                priority
                alt=""
              />
            </div>
          )
        }
      </div>
    );
  }
}
