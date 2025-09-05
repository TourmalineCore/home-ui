import { ReactNode, useRef } from 'react';
import { FooterRedesign } from '../FooterRedesign/FooterRedesign';
import { SkipLink } from '../../SkipLink/SkipLink';
import { HeaderRedesign } from '../HeaderRedesign/HeaderRedesign';
import { FooterRedesignProps, HeaderRedesignProps } from '../../../common/types';

export function LayoutRedesign({
  children,
  mainClassName,
  headerContent,
  footerContent,
}: {
  children?: ReactNode;
  mainClassName?: string;
  headerContent: HeaderRedesignProps;
  footerContent: FooterRedesignProps;
}) {
  const mainElementRef = useRef<null | HTMLDivElement>(null);

  return (
    <div className="layout-redesign">
      <SkipLink
        mainElementRef={mainElementRef}
      />
      <HeaderRedesign
        navigationLists={headerContent.navigationLists}
        buttonLabel={headerContent.buttonLabel}
        emailCaption={headerContent.emailCaption}
        emailAddress={headerContent.emailAddress}
        socialLinks={headerContent.socialLinks}
      />
      <main
        id="main-content"
        ref={mainElementRef}
        className={mainClassName}
      >
        {children}
      </main>
      <FooterRedesign
        emailCaption={footerContent.emailCaption}
        emailAddress={footerContent.emailAddress}
        navigationLists={footerContent.navigationLists}
      />
    </div>
  );
}
