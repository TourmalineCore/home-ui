import clsx from 'clsx';
import moment from 'moment';
import 'moment/locale/ru';
import 'moment/locale/en-gb';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CardWithContentRedesign } from '../../../CardWithContentRedesign/CardWithContentRedesign';
import { CardWithTextAndDate } from '../../../../../common/types';

export function CardWithTextAndDateRedesign({
  title,
  text,
  date,
  markdownText,
  className,
}: CardWithTextAndDate & {
  className: string;
}) {
  const {
    locale,
  } = useRouter();
  const [formattedDate, setFormattedDate] = useState(``);

  useEffect(() => {
    moment.locale(locale);

    setFormattedDate(moment(date)
      .format(
        locale === `en`
          ? `MMMM D, YYYY`
          : `D MMMM YYYY`,
      ));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  return (
    <CardWithContentRedesign
      title={title}
      markdownText={markdownText}
      className={clsx(`card-with-text-and-date-redesign`, className)}
    >
      <p className="card-with-text-and-date-redesign__text">{text}</p>
      <span className="card-with-text-and-date-redesign__date">
        {formattedDate}
      </span>
    </CardWithContentRedesign>
  );
}
