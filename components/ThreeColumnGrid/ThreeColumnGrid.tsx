import { ThreeColumnGridBlock } from '../../common/types';
import { ColumnWithImage } from './components/ColumnWithImage/ColumnWithImage';
import { ColumnWithRepositories } from './components/ColumnWithRepositories/ColumnWithRepositories';
import { ColumnWithTextAndDate } from './components/ColumnWithTextAndDate/ColumnWithTextAndDate';

export function ThreeColumnGrid({
  cardWithImage,
  cardWithRepositories,
  cardWithTextAndDate,
}: Omit<ThreeColumnGridBlock, "__component">) {
  return (
    <section
      className="three-column-grid"
      data-testid="three-column-grid"
    >
      <div className="container-redesign three-column-grid__wrapper">
        <ul className="three-column-grid__cards grid">
          <li className="three-column-grid__card-item col-desktop-4 col-tablet-4">
            <ColumnWithImage
              className="three-column-grid__card-with-image"
              title={cardWithImage.title}
              markdownText={cardWithImage.markdownText}
              imageUrl={cardWithImage.imageUrl}
            />
          </li>
          <li className="three-column-grid__card-item col-desktop-4 col-tablet-4">
            <ColumnWithRepositories
              className="three-column-grid__card-with-repositories"
              title={cardWithRepositories.title}
              markdownText={cardWithRepositories.markdownText}
              repositories={cardWithRepositories.repositories}
            />
          </li>
          <li className="three-column-grid__card-item col-desktop-4 col-tablet-4">
            <ColumnWithTextAndDate
              className="three-column-grid__card-with-text-and-date"
              title={cardWithTextAndDate.title}
              text={cardWithTextAndDate.text}
              date={cardWithTextAndDate.date}
            />
          </li>
        </ul>
      </div>
    </section>
  );
}
