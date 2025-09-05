
import { useRouter } from 'next/router';
import { FooterNavigationListRedesign } from './components/FooterNavigationListRedesign/FooterNavigationListRedesign';
import { FooterRedesignProps } from '../../../common/types';
import { useDeviceSize } from '../../../common/hooks';

export function FooterRedesign({
  emailCaption,
  emailAddress,
  navigationLists,
}: FooterRedesignProps) {
  const {
    locale,
  } = useRouter();

  const {
    isTabletXl,
  } = useDeviceSize();

  const colCount = Math.min(navigationLists.length, 4);

  const footerNavigationStyle = {
    gridTemplateColumns: ` repeat(${isTabletXl ? colCount : 2}, auto)`,
  };

  return (
    <footer
      id="footer-redesign"
      className="footer-redesign"
      data-testid="footer"
    >
      <div className="container-redesign footer-redesign__inner">
        <div className="footer-redesign__info">
          {emailCaption && <p className="footer-redesign__caption">{emailCaption}</p>}
          <a
            className="footer-redesign__email"
            href={`mailto:${emailAddress}`}
          >
            {emailAddress}
          </a>
        </div>
        <div className="footer-redesign__copyright">
          <span>
            {`© 2019-${new Date()
              .getFullYear()} Tourmaline Core`}
          </span>
          <a
            href={`/documents/policy-${locale}.pdf`}
            target="_blank"
            rel="noreferrer"
            className="footer-redesign__privacy-policy"
          >
            {locale === `ru` ? `Политика конфиденциальности` : `Privacy policy`}
          </a>
        </div>
        <ul
          className="footer-redesign__navigation"
          style={footerNavigationStyle}
        >
          {navigationLists.map((el) => (
            <FooterNavigationListRedesign
              key={el.id}
              caption={el.caption}
              links={el.links}
            />
          ))}
        </ul>
      </div>
    </footer>
  );
}
