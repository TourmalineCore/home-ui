import { useDeviceSize } from '../../../common/hooks';
import { ProjectBlock } from '../../../common/types';
import { ProjectsCardWithImageRedesign } from '../ProjectsCardWithImageRedesign/ProjectsCardWithImageRedesign';

const GRID_COLUMNS = 12;

export function ProjectsRedesign({
  projectCardsWithImage,
  showOnMobile = true,
  dataTestId,
}: Omit<ProjectBlock, "__component"> & {
  dataTestId?: string;
}) {
  const columnsCount = GRID_COLUMNS / projectCardsWithImage.length;

  const {
    isTablet,
  } = useDeviceSize();

  if (!showOnMobile && !isTablet) {
    return null;
  }

  return (
    <section
      className="projects-redesign"
      data-testid={dataTestId}
    >
      <div className="container-redesign projects-redesign__wrapper">
        <ul className="projects-redesign__cards grid">
          {projectCardsWithImage.map(({
            title,
            description,
            imageUrl,
            videoUrl,
            size,
            link,
            isNda,
          }) => (
            <ProjectsCardWithImageRedesign
              key={title}
              className={`projects-redesign__card col-tablet-${columnsCount}`}
              title={title}
              description={description}
              imageUrl={imageUrl}
              videoUrl={videoUrl}
              size={size}
              link={link}
              isNda={isNda}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
