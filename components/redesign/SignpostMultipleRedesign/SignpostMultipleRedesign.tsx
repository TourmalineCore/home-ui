import Link from 'next/link';
import { SignpostRedesign } from '../SignpostRedesign/SignpostRedesign';
import IconArrow from '../../../icons/icon-arrow-redesign.svg';
import { SignpostMultipleBlock } from '../../../common/types';

export function SignpostMultipleRedesign({
  title,
  viewAllLink,
  viewAllLinkText,
  signposts,
  dataTestId,
}: Omit<SignpostMultipleBlock, "__component"> & {
  dataTestId?: string;
}) {
  return (
    <section
      className="signpost-multiple-redesign container-redesign"
      data-testid={dataTestId}
    >
      <div className="signpost-multiple-redesign__head">
        <h2 className="signpost-multiple-redesign__title">{title}</h2>
        {viewAllLink
        && (
          <Link
            className="signpost-multiple-redesign__view-all-link"
            href={viewAllLink}
          >
            {viewAllLinkText}
            <IconArrow />
          </Link>
        )}
      </div>
      <ul
        className="signpost-multiple-redesign__list grid"
      >
        {signposts.map(({
          title: signpostTitle,
          subtitle,
          link,
          imageUrl,
        }) => (
          <li
            key={signpostTitle}
            // This element has scrolling on a mobile device, so axe-core recommends adding a tabIndex
            // More info - https://dequeuniversity.com/rules/axe/4.10/scrollable-region-focusable?application=playwright
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={0}
            className="signpost-multiple-redesign__item col-desktop-3"
          >
            <SignpostRedesign
              title={signpostTitle}
              subtitle={subtitle}
              link={link}
              imageUrl={imageUrl}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
