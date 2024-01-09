import React from 'react';
import Link from 'next/link';
import Typography from 'components/rework/Typography';
import { nav } from 'content/navigation';
import classNames from 'classnames';

const navCategoryClass = 'block text-secondary mb-5';
const navItemClass = 'block mb-4';

function Nav() {
  return nav.list.map((nav, idx) => {
    return (
      <div className="sm-max:w-1/2 sm-max:mb-5" key={idx}>
        <Typography as="span" className={navCategoryClass}>
          {nav.category}
        </Typography>
        {nav.items.map((item, itemIdx) => {
          return (
            <Link
              href={item.link}
              key={`${idx} ${itemIdx}`}
              className="group block hover:text-brand-orange transition-colors"
            >
              <Typography
                as="span"
                className={classNames(navItemClass, 'group-last:mb-0')}
              >
                {item.name}
              </Typography>
            </Link>
          );
        })}
      </div>
    );
  });
}

export default Nav;
