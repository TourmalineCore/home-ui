import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import FocusLock from 'react-focus-lock';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { LangSwitch } from './components/LangSwitch/LangSwitch';
import IconBurger from '../../icons/burger.svg';
import IconBurgerPurple from '../../icons/burger-purple.svg';
import IconBurgerMagenta from '../../icons/burger-magenta.svg';
import IconBurgerDesign from '../../icons/burger-design.svg';
import IconBurgerQA from '../../icons/burger-qa.svg';
import IconBurgerBackend from '../../icons/burger-backend.svg';
import IconBurgerCyan from '../../icons/burger-cyan.svg';
import { MobileMenu } from '../MobileMenu/MobileMenu';
import { AppRoute } from '../../common/enums';
import { useBodyScrollHidden } from '../../common/hooks';
import { isChineseLanguage } from '../../common/utils';

type HeaderLinks = {
  id: string;
  link: string;
}[];

const headerLinks: HeaderLinks = [
  {
    id: AppRoute.Frontend.slice(1),
    link: AppRoute.Frontend,
  },
  {
    id: AppRoute.Design.slice(1),
    link: AppRoute.Design,
  },
  {
    id: AppRoute.Ml.slice(1),
    link: AppRoute.Ml,
  },
  {
    id: AppRoute.Embedded.slice(1),
    link: AppRoute.Embedded,
  },
  {
    id: AppRoute.QA.slice(1),
    link: AppRoute.QA,
  },
  {
    id: AppRoute.Backend.slice(1),
    link: AppRoute.Backend,
  },
  {
    id: AppRoute.Teams.slice(1),
    link: AppRoute.Teams,
  },
  {
    id: AppRoute.FrontendTeam.slice(1),
    link: AppRoute.FrontendTeam,
  },
  {
    id: AppRoute.Articles.slice(1),
    link: AppRoute.Articles,
  },
];

const BURGER_ICONS = new Map(
  [
    [AppRoute.Frontend, <IconBurgerPurple key={AppRoute.Frontend} />],
    [AppRoute.Ml, <IconBurgerPurple key={AppRoute.Ml} />],
    [AppRoute.Embedded, <IconBurgerMagenta key={AppRoute.Embedded} />],
    [AppRoute.QA, <IconBurgerQA key={AppRoute.QA} />],
    [AppRoute.Backend, <IconBurgerBackend key={AppRoute.Backend} />],
    [AppRoute.Design, <IconBurgerDesign key={AppRoute.Design} />],
    [AppRoute.Teams, <IconBurgerPurple key={AppRoute.Teams} />],
    [AppRoute.FrontendTeam, <IconBurgerCyan key={AppRoute.FrontendTeam} />],
  ],
);

export function Header({
  containerClass,
}: {
  containerClass?: string;
}) {
  const {
    t,
  } = useTranslation(`common`);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {
    pathname,
    locale,
  } = useRouter();

  useBodyScrollHidden(isMobileMenuOpen);

  return (
    <>
      <header className={clsx(`header`, {
        'header--zh': isChineseLanguage(locale),
      })}
      >
        <div className={clsx(`container header__inner ${containerClass}`)}>
          <Link
            href="/"
            className="header__logo"
            aria-label="Go to home page"
          >
            <Image
              src="/images/logo.png"
              fill
              alt=""
            />
          </Link>

          <div className="header__right-panel">
            <button
              type="button"
              className="header__menu-toggle"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open header"
            >
              {BURGER_ICONS.get(pathname as AppRoute) || <IconBurger />}
            </button>

            <nav className="header__desktop">
              {headerLinks.map((headerLink) => (
                <Link
                  key={headerLink.id}
                  className="header__link"
                  href={headerLink.link}
                >
                  {t(headerLink.id)}
                </Link>
              ))}

              <LangSwitch />
            </nav>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <FocusLock
          returnFocus
        >
          <MobileMenu
            onCloseClick={() => setIsMobileMenuOpen(false)}
            headerLinks={headerLinks}
          />
        </FocusLock>
      )}
    </>
  );
}
