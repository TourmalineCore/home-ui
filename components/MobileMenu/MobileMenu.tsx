import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { MouseEventHandler } from 'react';

import { SocialLinks } from '../SocialLinks/SocialLinks';
import { MobileLangSwitch } from './components/MobileLangSwitch/MobileLangSwitch';

import IconClose from '../../icons/close.svg';

type HeaderLinks = {
  id: string;
  link: string;
}[];

type MobileMenuProps = {
  headerLinks: HeaderLinks;
  onCloseClick: MouseEventHandler<HTMLButtonElement>;
};

export function MobileMenu({
  headerLinks,
  onCloseClick,
}: MobileMenuProps) {
  const {
    t,
  } = useTranslation(`common`);

  return (
    <div className="mobile-menu">
      <div className="container mobile-menu__inner">
        <div className="mobile-menu__top">
          <Link
            className="mobile-menu__logo"
            href="/"
          >
            <span
              onClick={onCloseClick}
              aria-hidden="true"
            >
              <Image
                src="/images/logo.png"
                fill
                alt=""
              />
            </span>
          </Link>

          <button
            type="button"
            className="mobile-menu__close"
            onClick={onCloseClick}
            aria-label="Close header"
          >
            <IconClose />
          </button>
        </div>

        <div className="mobile-menu__tourmaline-core">
          <Image
            src="/images/tourmaline-core.webp"
            alt="tourmaline-core"
            fill
            loading="lazy"
          />
        </div>

        <div className="mobile-menu__content">
          <MobileLangSwitch />

          {headerLinks.map((headerLink) => (
            <Link
              className="mobile-menu__link"
              key={headerLink.id}
              href={headerLink.link}
            >
              <span
                className="title-type-2"
                onClick={onCloseClick}
                aria-hidden="true"
              >
                {t(headerLink.id)}
              </span>
            </Link>
          ))}
        </div>

        <div className="mobile-menu__footer">
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}
