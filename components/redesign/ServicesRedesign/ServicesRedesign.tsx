import { ServicesBlock } from '../../../common/types';
import { ServicesCardRedesign } from '../ServicesCardRedesign/ServicesCardRedesign';

export function ServicesRedesign({
  title,
  services,
  teamsCard,
  teams,
  targetId,
}: Omit<ServicesBlock, '__component' | 'id'> & {
  targetId?: string;
}) {
  return (
    <section
      className="services-redesign"
      data-testid="services"
      {...(targetId && {
        id: targetId,
      })}
    >
      <ul className="services-redesign__cards grid container-redesign">
        <li className="services-redesign__card col-tablet-12 col-tablet-xl-4 col-desktop-3">
          <h2 className="services-redesign__title">
            {title}
          </h2>
        </li>
        {services.map(({
          id,
          title: servicesTitle,
          skillsList,
          link,
          linkText,
          theme,
          imageUrl,
        }) => (
          <li
            className="services-redesign__card col-tablet-6 col-tablet-xl-4 col-desktop-3"
            key={id}
          >
            <ServicesCardRedesign
              title={servicesTitle}
              skillsList={skillsList}
              link={link}
              linkText={linkText}
              theme={theme}
              imageUrl={imageUrl}
            />
          </li>
        ))}
        <li className="services-redesign__card col-tablet-12 col-tablet-xl-4 col-desktop-3" />
        <li className="services-redesign__card col-tablet-12 col-tablet-xl-4 col-desktop-3">
          <ServicesCardRedesign
            theme={teamsCard.theme}
            imageUrl={teamsCard.imageUrl}
          />
        </li>
        <li className="services-redesign__teams col-tablet-12 col-tablet-xl-8 col-desktop-6">
          <div className="services-redesign__wrapper">
            <h3 className="services-redesign__subtitle">{teams.title}</h3>
            <p className="services-redesign__description">
              {teams.description}
            </p>
            <ul className="services-redesign__teams-list">
              {
                teams.teamsList.map(({
                  teamIcon,
                  teamLink,
                  teamName,
                }) => (
                  <li
                    className="services-redesign__team"
                    key={teamName}
                  >
                    <span className="services-redesign__icon-wrapper">
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
                            className="services-redesign__team-link"
                            href={teamLink}
                          >
                            {teamName}
                          </a>
                        )
                        : (
                          <span className="services-redesign__team-name">
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
              className="services-redesign__featured-link"
            >
              {teams.linkText}
            </a>
          </div>
        </li>
      </ul>
    </section>
  );
}
