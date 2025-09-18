import { HeroBlock } from '../../common/types';
import { ImageSlider } from '../ImageSlider/ImageSlider';

export function Hero({
  title,
  description,
  imageUrls,
}: Omit<HeroBlock, '__component' | 'id'>) {
  return (
    <section
      className="hero"
      data-testid="hero"
    >
      <div className="container-redesign hero__wrapper">
        <h1 className="hero__title">{title}</h1>
        {description && <p className="hero__description">{description}</p>}
        {imageUrls.length > 0 && (
          <div className="hero__images">
            <ImageSlider
              imageUrls={imageUrls}
              fill
              interval={1600}
              priority
              alt=""
            />
          </div>
        )}
      </div>
    </section>
  );
}
