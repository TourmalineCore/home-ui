import clsx from 'clsx';
import { Trans, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import {
  FormEvent,
  useMemo,
  useRef,
  KeyboardEvent,
  useState,
} from 'react';

import { SmartCaptcha } from '@yandex/smart-captcha';
import { Input } from './components/Input/Input';
import { PrimaryButton } from '../PrimaryButton/PrimaryButton';
import { Textarea } from './components/Textarea/Textarea';
import { Spinner } from '../Spinner/Spinner';
import { isChineseLanguage } from '../../common/utils';
import { DEFAULT_LOCALE } from '../../common/constants';
import { CheckBox } from '../Checkbox/Checkbox';
import { validateCaptchaToken } from '../../services/smartCaptcha/validateCaptchaToken';

export function Form({
  onSubmit = () => {},
  buttonClassName,
}: {
  onSubmit: (formData: FormData) => unknown;
  buttonClassName?: string;
}) {
  const {
    t,
  } = useTranslation(`form`);
  const router = useRouter();

  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [showCaptcha, setShowCaptcha] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState<boolean>(false);

  const routerLocale = useMemo(() => {
    if (!router.locale) {
      return DEFAULT_LOCALE;
    }

    return router.locale;
  }, [router.locale]);

  return (
    <form
      className={clsx(`form`, {
        'form--zh': isChineseLanguage(router.locale),
      })}
      onSubmit={handleFormSubmit}
    >
      <Input
        id="name"
        name="name"
        className="form__input"
        label={t(`name.label`)}
        description={t(`name.description`)}
        onKeyDown={handleOnKeyDown}
        required
      />
      <Input
        id="email"
        name="email"
        className="form__input"
        label={t(`email.label`)}
        description={t(`email.description`)}
        type="email"
        onKeyDown={handleOnKeyDown}
        required
      />
      <Textarea
        id="message"
        name="message"
        label={t(`message.label`)}
        className="form__message"
        description={t(`message.description`)}
      />

      <div className="form__consent">
        <CheckBox
          className="form__consent-checkbox"
          required
          aria-label={
            router.locale === `ru`
              ? `согласие на обработку персональных данных`
              : `processing of personal data`
          }
        />
        <div className="form__consent-text">
          <Trans
            i18nKey="formBlock:consentText"
            components={{
              personalData: <a
                className="form__consent-link"
                href={`/documents/policy-${routerLocale}.pdf#page=4`}
                target="_blank"
                rel="noreferrer"
                aria-label={
                  routerLocale === `ru`
                    ? `согласие на обработку персональных данных`
                    : `processing of personal data`
                }
              />,
              privacyPolicy: <a
                className="form__consent-link"
                href={`/documents/policy-${routerLocale}.pdf`}
                target="_blank"
                rel="noreferrer"
                aria-label={
                  routerLocale === `ru`
                    ? `политика конфиденциальности`
                    : `privacy policy`
                }
              />,
            }}
          />
        </div>
      </div>

      <div className="form__footer">
        <PrimaryButton
          type="submit"
          ref={submitButtonRef}
          className={clsx(`form__button`, buttonClassName)}
        >
          {
            isLoading
              ? <Spinner />
              : t(`buttonText`)
          }
        </PrimaryButton>
        {showCaptcha && (
          <div className="form__captcha">
            <SmartCaptcha
              sitekey={process.env.NEXT_PUBLIC_SMARTCAPTCHA_CLIENT_KEY as string}
              language={routerLocale === `ru` ? `ru` : `en`}
              onSuccess={handleCaptchaSuccess}
            />
          </div>
        )}
      </div>
    </form>
  );

  async function handleCaptchaSuccess(captchaToken: string) {
    const response = await validateCaptchaToken(captchaToken);

    if (response.status === `ok`) {
      setIsCaptchaVerified(true);
    }

    setShowCaptcha(false);

    if (submitButtonRef.current) {
      submitButtonRef.current.focus();
    }
  }

  async function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (!isCaptchaVerified) {
        setShowCaptcha(true);
        return;
      }

      const formData = new FormData(event.target as HTMLFormElement);

      await onSubmit(formData);

      setIsCaptchaVerified(false);
    } finally {
      setIsLoading(false);
    }
  }

  function handleOnKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === `Enter`) {
      e.preventDefault();
    }
  }
}
