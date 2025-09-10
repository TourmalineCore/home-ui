import clsx from 'clsx';
import Image from 'next/image';
import IconArrow from '../../../../icons/icon-arrow-redesign.svg';
import { FeaturedCardProps } from '../../../../common/types';

export function FeaturedCard({
  title,
  points,
  link,
  linkText,
  theme,
  imageUrl,
  type,
}: Omit<FeaturedCardProps, 'id'>) {
  if (type === `points` || type === `image`) {
    return (
      <li
        className="featured-cards-list__card col-tablet-6 col-tablet-xl-4 col-desktop-3"
      >
        <div className={clsx(
          `featured-card featured-card--${theme.toLowerCase()}`,
        )}
        >
          {link ? (
            <a
              className="featured-card__link-wrapper"
              href={link}
            >
              {renderCardContent()}
            </a>
          )
            : renderCardContent()}
        </div>
      </li>
    );
  }

  return (
    <li className="featured-cards-list__card col-tablet-12 col-tablet-xl-4 col-desktop-3">
      <div className={clsx(
        `featured-card featured-card--white`,
      )}
      />
    </li>
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
            {linkText}
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
