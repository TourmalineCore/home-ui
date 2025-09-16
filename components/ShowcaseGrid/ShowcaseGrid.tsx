import { useDeviceSize } from '../../common/hooks';
import { ShowcaseGridBlock } from '../../common/types';
import { ShowcaseColumnWithImage } from './components/ShowcaseColumnWithImage/ShowcaseColumnWithImage';
import { ShowcaseColumnWithMarkdown } from './components/ShowcaseColumnWithMarkdown/ShowcaseColumnWithMarkdown';

const GRID_COLUMNS = 12;
const MIN_COLUMNS = 3;
const MAX_COLUMNS = 4;

export function ShowcaseGrid({
  title,
  showcaseColumns,
  showOnMobile,
  anchorId,
  dataTestId,
}: Omit<ShowcaseGridBlock, "__component"> & {
  dataTestId?: string;
}) {
  const columnsCount = GRID_COLUMNS / showcaseColumns.length >= MAX_COLUMNS ? MAX_COLUMNS : MIN_COLUMNS;

  const {
    isTablet,
  } = useDeviceSize();

  if (!showOnMobile && !isTablet) {
    return null;
  }
  return (
    <section
      className="showcase-grid"
      data-testid={dataTestId}
      {...(anchorId && {
        id: anchorId,
      })}
    >
      <div className="container-redesign showcase-grid__wrapper">
        {title && <h2 className="showcase-grid__title">{title}</h2>}
        <ul className="showcase-grid__columns grid">
          {showcaseColumns.map(({
            id,
            type,
            showcaseColumnWithImage,
            showcaseColumnWithMarkdown,
          }) => (
            <li
              className={`showcase-grid__column col-tablet-${columnsCount}`}
              key={id}
            >
              {(showcaseColumnWithImage && type === `image`) && (
                <ShowcaseColumnWithImage
                  title={showcaseColumnWithImage.title}
                  description={showcaseColumnWithImage.description}
                  media={showcaseColumnWithImage.media}
                  size={showcaseColumnWithImage.size}
                  link={showcaseColumnWithImage.link}
                  isNda={showcaseColumnWithImage.isNda}
                />
              )}
              {(showcaseColumnWithMarkdown && type === `markdown`) && (
                <ShowcaseColumnWithMarkdown
                  subtitle={showcaseColumnWithMarkdown.subtitle}
                  markdown={showcaseColumnWithMarkdown.markdown}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
