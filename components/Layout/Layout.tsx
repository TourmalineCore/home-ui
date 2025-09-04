import clsx from 'clsx';
import { ReactNode, useRef } from 'react';
import { useRouter } from 'next/router';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { SkipLink } from '../SkipLink/SkipLink';
import { isChineseLanguage } from '../../common/utils';

export function Layout({
  children,
  mainClassName,
}: {
  children: ReactNode;
  mainClassName?: string;
}) {
  const {
    locale,
  } = useRouter();

  const mainElementRef = useRef<null | HTMLDivElement>(null);

  return (
    <div className={clsx(`layout`, {
      'layout--zh': isChineseLanguage(locale),
    })}
    >
      <SkipLink
        mainElementRef={mainElementRef}
      />
      <Header />
      <main
        id="main-content"
        ref={mainElementRef}
        className={mainClassName}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
