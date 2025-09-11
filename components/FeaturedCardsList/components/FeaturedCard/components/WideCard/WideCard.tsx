import { WideCardProps } from "../../../../../../common/types";

export function WideCard({
  title,
  description,
  wideCardItems,
  wideCardLink,
}: WideCardProps) {
  return (
    <li className="wide-card col-tablet-12 col-tablet-xl-8 col-desktop-6">
      <div className="wide-card__wrapper">
        {title && <h3 className="wide-card__subtitle">{title}</h3>}
        {description && (
          <p className="wide-card__description">
            {description}
          </p>
        )}
        <ul className="wide-card__list">
          {
            wideCardItems.map(({
              id,
              icon,
              link: itemLink,
              name,
            }) => (
              <li
                className="wide-card__item"
                key={id}
              >
                <span className="wide-card__icon-wrapper">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={icon}
                    alt=""
                  />
                </span>
                {
                  itemLink
                    ? (
                      <a
                        className="wide-card__link"
                        href={itemLink}
                      >
                        {name}
                      </a>
                    )
                    : (
                      <span className="wide-card__name">
                        {name}
                      </span>
                    )
                }
              </li>
            ))
          }
        </ul>
        {wideCardLink && (
          <a
            href={wideCardLink.url}
            className="wide-card__featured-link"
          >
            {wideCardLink.text}
          </a>
        )}
      </div>
    </li>
  );
}
