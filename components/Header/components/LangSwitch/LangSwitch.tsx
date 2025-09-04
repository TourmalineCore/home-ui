import { useState, useRef, useMemo } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import Link from 'next/link';
import IconArrow from '../../../../icons/icon-arrow.svg';
import { DEFAULT_LOCALE, languages } from '../../../../common/constants';
import { useAutoClose } from '../../../../common/hooks';
import { isChineseLanguage } from '../../../../common/utils';

export function LangSwitch() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [isTooltipOpened, setIsTooltipOpened] = useState(false);

  useAutoClose(containerRef, setIsTooltipOpened);

  const routerLocale = useMemo(() => {
    if (!router.locale) {
      return DEFAULT_LOCALE;
    }

    return router.locale;
  }, [router.locale]);

  return (
    <div
      ref={containerRef}
      className={clsx(`lang-switch`, {
        'lang-switch--zh': isChineseLanguage(router.locale),
      })}
    >
      <button
        type="button"
        className="lang-switch__active"
        onClick={() => setIsTooltipOpened(!isTooltipOpened)}
        aria-label={router.locale === `ru`
          ? `Выбрать язык`
          : `Select language`}
      >
        <span aria-hidden="true">
          {languages[routerLocale].icon()}
        </span>
        <span aria-label={
          router.locale === `ru`
            ? `Сейчас выбран`
            : `Currently selected`
        }
        >
          {languages[routerLocale].shortName}
        </span>
        <IconArrow
          aria-hidden="true"
          className={clsx(
            `lang-switch__arrow`,
            {
              'lang-switch__arrow--open': isTooltipOpened,
            },
          )}
        />
      </button>

      {router.locales && isTooltipOpened && (
        <ul className="lang-switch__list">
          {router.locales.map((locale) => (
            <li
              key={locale}
              className="lang-switch__option"
            >
              <Link
                role="presentation"
                href={router.asPath}
                locale={locale}
                className={clsx(
                  `lang-switch__link`,
                  {
                    'lang-switch__link--active': routerLocale === locale,
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
                {languages[locale].name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
