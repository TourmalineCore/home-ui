import { FeaturedCardsListBlock } from '../../common/types';
import { FeaturedCard } from './components/FeaturedCard/FeaturedCard';

export function FeaturedCardsList({
  title,
  cards,
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
          description,
          link,
          linkText,
          theme,
          wideCardItems,
          wideCardLink,
          imageUrl,
          type,
        }) => (
          <FeaturedCard
            key={id}
            title={servicesTitle}
            description={description}
            points={points}
            link={link}
            linkText={linkText}
            theme={theme}
            imageUrl={imageUrl}
            type={type}
            wideCardItems={wideCardItems}
            wideCardLink={wideCardLink}
          />
        ))}
      </ul>
    </section>
  );
}
