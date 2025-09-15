import clsx from 'clsx';
import { ColumnWithContent } from '../../../ColumnWithContent/ColumnWithContent';
import { useDeviceSize } from '../../../../common/hooks';
import { ColumnWithRepositoriesProps } from '../../../../common/types';

export function ColumnWithRepositories({
  title,
  repositories,
  markdownText,
  className,
}: ColumnWithRepositoriesProps & {
  className: string;
}) {
  const {
    isTabletXl,
  } = useDeviceSize();

  const repositoriesList = isTabletXl ? repositories : repositories.slice(0, 1);

  return (
    <ColumnWithContent
      title={title}
      markdownText={markdownText}
      className={clsx(`column-with-repositories`, className)}
    >
      <ul className="column-with-repositories__list">
        {repositoriesList.map(({
          name,
          description,
          language,
          link,
        }) => (
          <li
            className="column-with-repositories__item"
            key={name}
          >
            <a
              className="column-with-repositories__link"
              href={link}
              target="_blank"
              rel="noreferrer"
            >
              <div className="column-with-repositories__item-inner">
                <h3 className={clsx(`column-with-repositories__name`, {
                  'column-with-repositories__name--no-description': !description,
                })}
                >
                  {name}
                </h3>
                {description && <p className="column-with-repositories__description">{description}</p>}
                {language && (
                  <span
                    className={`column-with-repositories__language column-with-repositories__language--${language.toLowerCase()}`}
                  >
                    {language}
                  </span>
                )}
              </div>
            </a>

          </li>
        ))}
      </ul>
    </ColumnWithContent>
  );
}
