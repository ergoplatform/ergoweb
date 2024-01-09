import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getFlagIconPath, getFullCountryName } from 'helpers/locale';
import Typography from 'components/rework/Typography';
import Check from 'assets/icons/check.svg';
import { useOutsideClick } from 'utils/useOutsideClick';
import useWindowSize from 'utils/useWindowSize';
import tailwindConfig from 'tailwind.config';

const languageClass = `
  size-10 flex items-center justify-center rounded-full bg-background md-max:size-6
  transition-colors hover:bg-background-card
  `;

function Language() {
  const [isOpen, setIsOpen] = useState(false);
  const { width } = useWindowSize();

  const router = useRouter();

  const ref = useOutsideClick(() => setIsOpen(false));
  const refMobile = useOutsideClick(() => {
    if (width <= 1040) {
      setIsOpen(false);
    }
  });

  if (!router.locale || !router.locales) return null;

  const currentLocaleIcon = getFlagIconPath(router?.locale);

  const switchLanguage = (locale: string) => {
    router.push(router.asPath, router.asPath, {
      locale,
    });
    setIsOpen(false);
  };

  return (
    <div ref={ref} className={`${isOpen && 'active'} relative group`}>
      <button
        type="button"
        className={`${languageClass}  group-[.active]:bg-background-card`}
        onClick={() => setIsOpen((open) => !open)}
      >
        <img
          src={currentLocaleIcon}
          className="h-3.5 md-max:h-2.5"
          alt="Current locale"
        />
      </button>
      {isOpen && (
        <div
          className="
            absolute right-0 top-[100%] md-max:fixed
            md-max:inset-0 md-max:bg-black/[0.6] z-10 md-max:flex md-max:items-end
          "
        >
          <div
            ref={refMobile}
            className="p-6 bg-brand-black md-max:w-full md-max:p-5"
          >
            <Typography type="title-3" className="hidden md-max:block mb-4">
              Website language
            </Typography>
            {router.locales.map((locale) => {
              if (locale === 'default') return;
              return (
                <button
                  type="button"
                  className="
                    flex items-center w-full p-6 gap-x-3.5 transition-colors hover:text-brand-orange
                    md-max:px-0 md-max:py-4
                  "
                  onClick={() => switchLanguage(locale)}
                >
                  <img
                    className="h-3 shrink-0 "
                    src={getFlagIconPath(locale)}
                    alt={`${locale}`}
                  />
                  <Typography as="span" className="w-full text-left">
                    {getFullCountryName(locale)}
                  </Typography>
                  <div className="shrink-0 size-6">
                    {locale === router?.locale && <Check />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Language;
