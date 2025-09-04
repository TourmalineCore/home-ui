import Image from 'next/image';
import clsx from 'clsx';
import { ProjectCardWithImage } from '../../../common/types';

export function ProjectsCardWithImageRedesign({
  title,
  description,
  imageUrl,
  videoUrl,
  size,
  link,
  isNda,
  className,
}: ProjectCardWithImage & {
  className?: string;
}) {
  return (
    <li className={clsx(`project-card-with-image-redesign`, className)}>
      {link ? (
        <a
          className="project-card-with-image-redesign__link"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {renderCardContent()}
        </a>
      )
        : renderCardContent()}
    </li>
  );

  function renderCardContent() {
    return (
      <>
        <div className="project-card-with-image-redesign__content">
          <h3 className="project-card-with-image-redesign__title">{title}</h3>
          <p className="project-card-with-image-redesign__description">{description}</p>
        </div>
        <div className={`project-card-with-image-redesign__images project-card-with-image-redesign__images--${size.toUpperCase()}`}>
          {isNda && <span className="project-card-with-image-redesign__nda">NDA</span>}
          {
            imageUrl && (
              <Image
                src={imageUrl}
                fill
                alt=""
              />
            )
          }
          {
            videoUrl && (
              <video
                className="project-card-with-image-redesign__video"
                src={videoUrl}
                playsInline
                loop
                muted
                autoPlay
              />
            )
          }
        </div>
      </>
    );
  }
}
