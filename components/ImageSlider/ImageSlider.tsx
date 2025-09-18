import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

export function ImageSlider({
  imageUrls,
  interval,
  ...imageProps
}: Omit<ImageProps, 'src'> & {
  imageUrls: string[];
  interval: number;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1));
      }, 500);
    }, interval);

    return () => clearInterval(timer);
  }, [imageUrls.length, interval]);

  return (
    <Image
      src={imageUrls[currentIndex]}
      {...imageProps}
      alt=""
    />
  );
}
