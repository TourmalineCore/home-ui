import { useMemo } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { DEFAULT_LOCALE, languages } from '../../../../common/constants';

export function MobileLangSwitch() {
  const router = useRouter();

  const routerLocale = useMemo(() => {
    if (!router.locale) {
      return DEFAULT_LOCALE;
    }

    return router.locale;
  }, [router.locale]);

  const routerLocales = router.locales || [];

  return (
    <div className="mobile-lang-switch">
      <ul className="mobile-lang-switch__list">
        {routerLocales.map((locale) => (
          <li
            key={locale}
            className="mobile-lang-switch__option"
          >
            <Link
              href={router.pathname}
              locale={locale}
              role="presentation"
              className={clsx(
                `mobile-lang-switch__link`,
                {
                  'mobile-lang-switch__link--active': routerLocale === locale,
                },
              )}
              onClick={(e) => {
                e.preventDefault();
                if (routerLocale !== locale) {
                  window.open((e.target as HTMLAnchorElement).href, `_self`);
                }
              }}
            >
              {languages[locale].icon()}
              {languages[locale].shortName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
