import { HeroBlock } from '../../common/types';
import { ImageSlider } from '../ImageSlider/ImageSlider';

export function Hero({
  title,
  description,
  media,
}: Omit<HeroBlock, '__component' | 'id'>) {
  const imageUrls = (media || [])
    .filter((item) => item.mime?.startsWith(`image`))
    .map((item) => item.url);

  const isVideo = media?.[0].mime?.startsWith(`video`);
  const videoUrl = media?.[0].url;

  return (
    <section
      className="hero"
      data-testid="hero"
    >
      <div className="container-redesign hero__wrapper">
        <h1 className="hero__title">{title}</h1>
        {description && <p className="hero__description">{description}</p>}
        {(isVideo || imageUrls.length > 0) && (
          <div className="hero__media">
            {isVideo ? (
              <video
                src={videoUrl}
                playsInline
                loop
                muted
                autoPlay
              />
            ) : (
              <ImageSlider
                imageUrls={imageUrls}
                fill
                interval={1600}
                priority
                alt=""
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
