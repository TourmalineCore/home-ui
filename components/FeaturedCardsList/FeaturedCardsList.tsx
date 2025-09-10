import { FeaturedCardsListBlock } from '../../common/types';
import { FeaturedCard } from './components/FeaturedCard/FeaturedCard';

export function FeaturedCardsList({
  title,
  cards,
  teamsCard,
  teams,
  targetId,
}: Omit<FeaturedCardsListBlock, '__component' | 'id'> & {
  targetId?: string;
}) {
  return (
    <section
      className="featured-cards-list"
      data-testid="featured-cards-list"
      {...(targetId && {
        id: targetId,
      })}
    >
      <ul className="featured-cards-list__cards grid container-redesign">
        <li className="featured-cards-list__card col-tablet-12 col-tablet-xl-4 col-desktop-3">
          <h2 className="featured-cards-list__title">
            {title}
          </h2>
        </li>
        {cards.map(({
          id,
          title: servicesTitle,
          points,
          link,
          linkText,
          theme,
          imageUrl,
          type,
        }) => (
          <FeaturedCard
            key={id}
            title={servicesTitle}
            points={points}
            link={link}
            linkText={linkText}
            theme={theme}
            imageUrl={imageUrl}
            type={type}
          />
        ))}
        {/* <li className="featured-cards-list__card col-tablet-12 col-tablet-xl-4 col-desktop-3" /> */}
        <li className="featured-cards-list__card col-tablet-12 col-tablet-xl-4 col-desktop-3">
          <FeaturedCard
            theme={teamsCard.theme}
            imageUrl={teamsCard.imageUrl}
            type="image"
          />
        </li>
        <li className="featured-cards-list__teams col-tablet-12 col-tablet-xl-8 col-desktop-6">
          <div className="featured-cards-list__wrapper">
            <h3 className="featured-cards-list__subtitle">{teams.title}</h3>
            <p className="featured-cards-list__description">
              {teams.description}
            </p>
            <ul className="featured-cards-list__teams-list">
              {
                teams.teamsList.map(({
                  teamIcon,
                  teamLink,
                  teamName,
                }) => (
                  <li
                    className="featured-cards-list__team"
                    key={teamName}
                  >
                    <span className="featured-cards-list__icon-wrapper">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={teamIcon}
                        alt=""
                      />
                    </span>
                    {
                      teamLink
                        ? (
                          <a
                            className="featured-cards-list__team-link"
                            href={teamLink}
                          >
                            {teamName}
                          </a>
                        )
                        : (
                          <span className="featured-cards-list__team-name">
                            {teamName}
                          </span>
                        )
                    }
                  </li>
                ))
              }
            </ul>
            <a
              href={teams.link}
              className="featured-cards-list__featured-link"
            >
              {teams.linkText}
            </a>
          </div>
        </li>
      </ul>
    </section>
  );
}
