import clsx from 'clsx';
import { useRouter } from 'next/router';
import { isChineseLanguage } from '../../common/utils';

export function HeroBlock({
  title,
  gradientTitle,
  description,
  Button,
}: {
  title: string;
  gradientTitle: string;
  description: string;
  Button: JSX.Element;
}) {
  const {
    locale,
  } = useRouter();

  return (
    <section className={clsx(`hero-block`, {
      'hero-block--zh': isChineseLanguage(locale),
    })}
    >
      <div className="container hero-block__wrapper">
        <div className="hero-block__inner">
          <h1 className="title-type-1">
            {title}
            <span className="hero-block__gradient-title">{gradientTitle}</span>
          </h1>
          <div className="title-type-4 hero-block__description">{description}</div>

          {Button}

        </div>
        <div className="hero-block__video">

          <video
            poster="/images/tourmaline-core-poster.webp"
            src="/images/video.mp4"
            autoPlay
            loop
            playsInline
            muted
          >
            <track kind="captions" />
          </video>
        </div>
      </div>
    </section>
  );
}
