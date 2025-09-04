import { useTranslation } from 'next-i18next';

import { useRouter } from 'next/router';
import { FooterNavigationList, FooterNavigationListRedesign } from './components/FooterNavigationListRedesign/FooterNavigationListRedesign';

export function FooterRedesign() {
  const {
    t,
  } = useTranslation(`footerRedesign`);

  const {
    locale,
  } = useRouter();

  const footerNavigationLists: FooterNavigationList[] = t(`navigationLists`, {
    returnObjects: true,
  });

  return (
    <footer
      id="footer-redesign"
      className="footer-redesign"
      data-testid="footer"
    >
      <div className="container-redesign footer-redesign__inner">
        <div className="footer-redesign__info">
          <p className="footer-redesign__caption">{t(`emailCaption`)}</p>
          {/* TODO: Change when next will be upgrade to 12+ version */}
          <a
            className="footer-redesign__email"
            href={`mailto:${t(`emailAddress`)}`}
          >
            {t(`emailAddress`)}
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
        <ul className="footer-redesign__navigation">
          {footerNavigationLists.map((el) => (
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
