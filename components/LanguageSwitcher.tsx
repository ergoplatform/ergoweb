import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { getIconComponentByName } from '../utils/icons-map';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function LanguageSwitcher({ color = 'default' }) {
  const data = useRouter();
  const { locale, locales, asPath } = data;

  return (
    <Listbox>
      <div className="relative">
        <Listbox.Button
          className="relative py-2 pl-3 pr-8 text-left cursor-pointer sm:text-sm"
          aria-label="Select language"
        >
          <span className="block truncate font-button-bold underline uppercase">{locale}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
            {color == 'default'
              ? getIconComponentByName('LanguageSelector')
              : getIconComponentByName('LanguageSelectorWhite')}
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute overflow-auto max-h-60">
            {locales
              ?.filter((obj) => {
                return obj !== 'default';
              })
              .map((loc, key) => (
                <Listbox.Option
                  key={key}
                  className={`cursor-default select-none relative`}
                  value={loc}
                >
                  <Link href={asPath} locale={loc} passHref>
                    <a className="py-2 pl-3 pr-8" aria-label={`Switch to ${loc}`}>
                      <span className={`font-button-bold text-[14px] uppercase`}>{loc}</span>
                    </a>
                  </Link>
                </Listbox.Option>
              ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
