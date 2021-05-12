import useBaseUrl from '@docusaurus/useBaseUrl';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Tooltip } from '@rexd/core';
import clsx from 'clsx';
import { isSamePath, useThemeConfig } from '@docusaurus/theme-common';
import useUserPreferencesContext from '@theme/hooks/useUserPreferencesContext';
import useLockBodyScroll from '@theme/hooks/useLockBodyScroll';
import useWindowSize, { windowSizes } from '@theme/hooks/useWindowSize';
import useScrollPosition from '@theme/hooks/useScrollPosition';
import Link from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';
import Logo from '@theme/Logo';
import IconArrow from '@theme/IconArrow';
import IconMenu from '@theme/IconMenu';
import { translate } from '@docusaurus/Translate';
import { useRouteMatch } from 'react-router-dom';
import { usePlaygroundConfig } from '../Layout';

import styles from './styles.module.scss';

// prettier-ignore
const QRCodeData = [12, 12, 24, 12, 36, 12, 48, 12, 60, 12, 72, 12, 84, 12, 108, 12, 120, 12, 132, 12, 144, 12, 156, 12, 216, 12, 228, 12, 240, 12, 264, 12, 288, 12, 300, 12, 312, 12, 336, 12, 372, 12, 384, 12, 396, 12, 408, 12, 420, 12, 432, 12, 444, 12, 12, 24, 84, 24, 168, 24, 204, 24, 216, 24, 228, 24, 264, 24, 276, 24, 288, 24, 312, 24, 336, 24, 348, 24, 372, 24, 444, 24, 12, 36, 36, 36, 48, 36, 60, 36, 84, 36, 120, 36, 168, 36, 192, 36, 216, 36, 228, 36, 252, 36, 264, 36, 276, 36, 288, 36, 324, 36, 348, 36, 372, 36, 396, 36, 408, 36, 420, 36, 444, 36, 12, 48, 36, 48, 48, 48, 60, 48, 84, 48, 108, 48, 120, 48, 156, 48, 168, 48, 204, 48, 240, 48, 252, 48, 276, 48, 300, 48, 372, 48, 396, 48, 408, 48, 420, 48, 444, 48, 12, 60, 36, 60, 48, 60, 60, 60, 84, 60, 144, 60, 156, 60, 252, 60, 264, 60, 300, 60, 324, 60, 336, 60, 348, 60, 372, 60, 396, 60, 408, 60, 420, 60, 444, 60, 12, 72, 84, 72, 120, 72, 144, 72, 156, 72, 192, 72, 204, 72, 228, 72, 276, 72, 288, 72, 300, 72, 336, 72, 348, 72, 372, 72, 444, 72, 12, 84, 24, 84, 36, 84, 48, 84, 60, 84, 72, 84, 84, 84, 108, 84, 132, 84, 156, 84, 180, 84, 204, 84, 228, 84, 252, 84, 276, 84, 300, 84, 324, 84, 348, 84, 372, 84, 384, 84, 396, 84, 408, 84, 420, 84, 432, 84, 444, 84, 120, 96, 144, 96, 168, 96, 192, 96, 204, 96, 216, 96, 252, 96, 264, 96, 276, 96, 300, 96, 312, 96, 324, 96, 348, 96, 36, 108, 60, 108, 72, 108, 84, 108, 108, 108, 120, 108, 168, 108, 180, 108, 192, 108, 216, 108, 228, 108, 240, 108, 264, 108, 276, 108, 300, 108, 324, 108, 336, 108, 360, 108, 408, 108, 444, 108, 12, 120, 24, 120, 36, 120, 60, 120, 72, 120, 108, 120, 120, 120, 180, 120, 192, 120, 228, 120, 252, 120, 264, 120, 276, 120, 288, 120, 348, 120, 360, 120, 372, 120, 408, 120, 420, 120, 432, 120, 444, 120, 12, 132, 24, 132, 48, 132, 60, 132, 84, 132, 108, 132, 120, 132, 144, 132, 156, 132, 180, 132, 204, 132, 240, 132, 276, 132, 288, 132, 312, 132, 372, 132, 384, 132, 408, 132, 420, 132, 444, 132, 12, 144, 24, 144, 36, 144, 48, 144, 96, 144, 108, 144, 120, 144, 132, 144, 168, 144, 192, 144, 204, 144, 216, 144, 240, 144, 264, 144, 288, 144, 300, 144, 312, 144, 324, 144, 360, 144, 396, 144, 432, 144, 444, 144, 12, 156, 24, 156, 60, 156, 84, 156, 96, 156, 156, 156, 168, 156, 180, 156, 192, 156, 216, 156, 240, 156, 264, 156, 312, 156, 360, 156, 372, 156, 444, 156, 24, 168, 36, 168, 96, 168, 120, 168, 144, 168, 156, 168, 168, 168, 180, 168, 192, 168, 204, 168, 228, 168, 264, 168, 288, 168, 300, 168, 312, 168, 348, 168, 372, 168, 384, 168, 408, 168, 420, 168, 432, 168, 444, 168, 12, 180, 60, 180, 72, 180, 84, 180, 96, 180, 120, 180, 156, 180, 180, 180, 204, 180, 216, 180, 228, 180, 240, 180, 276, 180, 288, 180, 372, 180, 384, 180, 420, 180, 432, 180, 444, 180, 48, 192, 72, 192, 108, 192, 120, 192, 156, 192, 168, 192, 192, 192, 204, 192, 216, 192, 228, 192, 252, 192, 288, 192, 312, 192, 336, 192, 348, 192, 396, 192, 36, 204, 72, 204, 84, 204, 108, 204, 144, 204, 204, 204, 216, 204, 228, 204, 240, 204, 252, 204, 264, 204, 276, 204, 288, 204, 312, 204, 348, 204, 372, 204, 408, 204, 24, 216, 36, 216, 60, 216, 96, 216, 108, 216, 120, 216, 156, 216, 192, 216, 204, 216, 216, 216, 276, 216, 288, 216, 300, 216, 348, 216, 360, 216, 372, 216, 408, 216, 432, 216, 444, 216, 12, 228, 36, 228, 48, 228, 84, 228, 96, 228, 120, 228, 132, 228, 156, 228, 180, 228, 216, 228, 252, 228, 288, 228, 300, 228, 360, 228, 432, 228, 444, 228, 24, 240, 48, 240, 60, 240, 108, 240, 120, 240, 144, 240, 168, 240, 216, 240, 240, 240, 264, 240, 300, 240, 312, 240, 324, 240, 348, 240, 372, 240, 384, 240, 24, 252, 60, 252, 72, 252, 84, 252, 132, 252, 144, 252, 180, 252, 204, 252, 216, 252, 252, 252, 264, 252, 288, 252, 312, 252, 348, 252, 360, 252, 372, 252, 384, 252, 12, 264, 24, 264, 60, 264, 156, 264, 168, 264, 192, 264, 204, 264, 216, 264, 228, 264, 264, 264, 372, 264, 420, 264, 432, 264, 444, 264, 36, 276, 84, 276, 96, 276, 144, 276, 156, 276, 180, 276, 192, 276, 204, 276, 216, 276, 276, 276, 288, 276, 300, 276, 312, 276, 348, 276, 360, 276, 372, 276, 396, 276, 432, 276, 444, 276, 12, 288, 24, 288, 96, 288, 108, 288, 120, 288, 132, 288, 156, 288, 168, 288, 180, 288, 216, 288, 240, 288, 252, 288, 300, 288, 360, 288, 444, 288, 12, 300, 24, 300, 84, 300, 96, 300, 120, 300, 144, 300, 156, 300, 192, 300, 204, 300, 216, 300, 240, 300, 252, 300, 288, 300, 300, 300, 336, 300, 348, 300, 360, 300, 372, 300, 444, 300, 24, 312, 72, 312, 144, 312, 156, 312, 180, 312, 228, 312, 240, 312, 276, 312, 288, 312, 300, 312, 312, 312, 348, 312, 360, 312, 372, 312, 384, 312, 432, 312, 444, 312, 12, 324, 84, 324, 96, 324, 120, 324, 156, 324, 180, 324, 192, 324, 204, 324, 216, 324, 240, 324, 276, 324, 288, 324, 300, 324, 324, 324, 372, 324, 408, 324, 432, 324, 444, 324, 24, 336, 48, 336, 168, 336, 192, 336, 240, 336, 264, 336, 276, 336, 300, 336, 312, 336, 324, 336, 348, 336, 372, 336, 396, 336, 12, 348, 48, 348, 60, 348, 84, 348, 96, 348, 156, 348, 168, 348, 180, 348, 216, 348, 228, 348, 240, 348, 252, 348, 288, 348, 312, 348, 336, 348, 348, 348, 360, 348, 372, 348, 384, 348, 396, 348, 432, 348, 444, 348, 108, 360, 180, 360, 216, 360, 228, 360, 240, 360, 252, 360, 300, 360, 336, 360, 348, 360, 396, 360, 432, 360, 444, 360, 12, 372, 24, 372, 36, 372, 48, 372, 60, 372, 72, 372, 84, 372, 132, 372, 144, 372, 156, 372, 168, 372, 180, 372, 192, 372, 204, 372, 216, 372, 228, 372, 240, 372, 264, 372, 324, 372, 336, 372, 348, 372, 372, 372, 396, 372, 420, 372, 432, 372, 444, 372, 12, 384, 84, 384, 108, 384, 156, 384, 180, 384, 192, 384, 216, 384, 228, 384, 276, 384, 288, 384, 300, 384, 312, 384, 348, 384, 396, 384, 432, 384, 12, 396, 36, 396, 48, 396, 60, 396, 84, 396, 108, 396, 168, 396, 180, 396, 216, 396, 240, 396, 264, 396, 276, 396, 312, 396, 348, 396, 360, 396, 372, 396, 384, 396, 396, 396, 408, 396, 432, 396, 12, 408, 36, 408, 48, 408, 60, 408, 84, 408, 120, 408, 132, 408, 156, 408, 192, 408, 204, 408, 240, 408, 288, 408, 312, 408, 324, 408, 336, 408, 348, 408, 360, 408, 384, 408, 396, 408, 408, 408, 432, 408, 444, 408, 12, 420, 36, 420, 48, 420, 60, 420, 84, 420, 108, 420, 120, 420, 156, 420, 168, 420, 180, 420, 192, 420, 204, 420, 216, 420, 348, 420, 360, 420, 384, 420, 396, 420, 408, 420, 420, 420, 444, 420, 12, 432, 84, 432, 120, 432, 132, 432, 144, 432, 156, 432, 168, 432, 180, 432, 192, 432, 216, 432, 252, 432, 264, 432, 288, 432, 312, 432, 336, 432, 348, 432, 372, 432, 432, 432, 12, 444, 24, 444, 36, 444, 48, 444, 60, 444, 72, 444, 84, 444, 132, 444, 144, 444, 156, 444, 180, 444, 192, 444, 216, 444, 252, 444, 264, 444, 300, 444, 312, 444, 336, 444, 348, 444, 432, 444, 444, 444]

const QRCode = React.memo(({ colorMode }) => {
  const bg = colorMode === 'light' ? '#ffffff' : '#303030';
  const fg = colorMode === 'light' ? 'black' : 'white';

  const rects = [];
  for (let i = 0; i < QRCodeData.length; i += 2) {
    rects.push(<rect key={i} x={QRCodeData[i]} y={QRCodeData[i + 1]} width="12" height="12" />);
  }

  return (
    <svg width={468 / 3} height={468 / 3} viewBox="0 0 468 468" style={{ display: 'block' }}>
      <rect width="468" height="468" fill={bg} />
      <g fill={fg}>{rects}</g>
    </svg>
  );
});

function Sun() {
  return (
    <svg width="24" height="24">
      <path
        d="M12 1.4c.3 0 .6.2.7.5l.6 1.6c.3.7 0 1.4-.8 1.7H12c-.8 0-1.4-.5-1.4-1.3v-.4l.7-1.6c.1-.3.4-.5.7-.5zm0 21.2a.7.7 0 01-.7-.5l-.6-1.6-.1-.4c0-.8.6-1.4 1.4-1.4l.5.1c.7.3 1.1 1 .8 1.7l-.6 1.6c-.1.3-.4.5-.7.5zM22.6 12c0 .3-.2.6-.5.7l-1.6.6c-.7.3-1.4 0-1.7-.8V12c0-.8.5-1.4 1.3-1.4h.4l1.6.7c.3.1.5.4.5.7zM1.4 12c0-.3.2-.6.5-.7l1.6-.6.4-.1c.8 0 1.4.6 1.4 1.4l-.1.5c-.3.7-1 1.1-1.7.8l-1.6-.6a.8.8 0 01-.5-.7zm3.1-7.5c.3-.2.6-.3.8-.1L7 5c.7.3 1 1.1.6 1.8 0 .2-.1.3-.3.4-.5.6-1.4.6-2 .1L5 7l-.6-1.6c-.2-.2 0-.5.1-.8zm15 15c-.3.2-.6.3-.8.1L17 19c-.2 0-.3-.2-.4-.3-.5-.5-.5-1.4 0-2l.5-.2c.7-.4 1.5-.1 1.8.6l.6 1.6c.2.2 0 .5-.1.8zm0-15c.2.3.3.6.1.8L19 7c-.3.7-1.1 1-1.8.6-.2 0-.3-.1-.4-.3-.6-.5-.6-1.4-.1-2L17 5l1.6-.6c.2-.2.5 0 .8.1zm-15 15a.7.7 0 01-.1-.8L5 17c0-.2.2-.3.3-.4.5-.5 1.4-.5 2 0l.2.5c.4.7.1 1.5-.6 1.8l-1.6.6c-.2.2-.5 0-.8-.1zm7.5-2.2a5.3 5.3 0 110-10.6 5.3 5.3 0 010 10.6z"
        fill="currentColor"
      />
    </svg>
  );
}

function Moon() {
  return (
    <svg width="20" height="20">
      <path
        d="M10.3 18.3h-.1c-2.3 0-4.5-1-6.1-2.6A8.7 8.7 0 013.8 4c1-1 2-1.8 3.4-2.2.3-.2.6 0 .9.1.2.3.2.6.2.9a7 7 0 009 9 .8.8 0 011 1 8.5 8.5 0 01-8 5.5z"
        fill="currentColor"
      />
    </svg>
  );
}

const MOBILE_TOGGLE_SIZE = 24;

function usePrevious(value) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const isActiveSidebarItem = (item, activePath) => {
  if (item.type === 'link') {
    return isSamePath(item.href, activePath);
  }
  if (item.type === 'category') {
    return item.items.some((subItem) => isActiveSidebarItem(subItem, activePath));
  }
  return false;
};

// Optimize sidebar at each "level"
// TODO this item should probably not receive the "activePath" props
// TODO this triggers whole sidebar re-renders on navigation
const DocSidebarItems = memo(function DocSidebarItems({ items, ...props }) {
  return items.map((item, index) => (
    <DocSidebarItem
      key={index} // sidebar is static, the index does not change
      item={item}
      {...props}
    />
  ));
});

function DocSidebarItem(props) {
  switch (props.item.type) {
    case 'category':
      return <DocSidebarItemCategory {...props} />;
    case 'link':
    default:
      return <DocSidebarItemLink {...props} />;
  }
}

function DocSidebarItemCategory({ item, onItemClick, collapsible, activePath, ...props }) {
  const { items, label } = item;
  const isActive = isActiveSidebarItem(item, activePath);
  const wasActive = usePrevious(isActive);
  // active categories are always initialized as expanded
  // the default (item.collapsed) is only used for non-active categories
  const [collapsed, setCollapsed] = useState(() => {
    if (!collapsible) {
      return false;
    }
    return isActive ? false : item.collapsed;
  });
  const menuListRef = useRef(null);
  const [menuListHeight, setMenuListHeight] = useState(undefined);
  const handleMenuListHeight = (calc = true) => {
    setMenuListHeight(calc ? `${menuListRef.current?.scrollHeight}px` : undefined);
  };
  // If we navigate to a category, it should automatically expand itself
  useEffect(() => {
    const justBecameActive = isActive && !wasActive;
    if (justBecameActive && collapsed) {
      setCollapsed(false);
    }
  }, [isActive, wasActive, collapsed]);
  const handleItemClick = useCallback(
    (e) => {
      e.preventDefault();
      if (!menuListHeight) {
        handleMenuListHeight();
      }
      setTimeout(() => setCollapsed((state) => !state), 100);
    },
    [menuListHeight],
  );
  if (items.length === 0) {
    return null;
  }
  return (
    <li
      className={clsx('menu__list-item', {
        'menu__list-item--collapsed': collapsed,
      })}
    >
      <a
        className={clsx('menu__link', {
          'menu__link--sublist': collapsible,
          'menu__link--active': collapsible && isActive,
          [styles.menuLinkText]: !collapsible,
        })}
        onClick={collapsible ? handleItemClick : undefined}
        href={collapsible ? '#!' : undefined}
        {...props}
      >
        {label}
      </a>
      <ul
        className="menu__list"
        ref={menuListRef}
        style={{
          height: menuListHeight,
        }}
        onTransitionEnd={() => {
          if (!collapsed) {
            handleMenuListHeight(false);
          }
        }}
      >
        <DocSidebarItems
          items={items}
          tabIndex={collapsed ? '-1' : '0'}
          onItemClick={onItemClick}
          collapsible={collapsible}
          activePath={activePath}
        />
      </ul>
    </li>
  );
}

// eslint-disable-next-line no-unused-vars
function DocSidebarItemLink({ item, onItemClick, activePath, collapsible: _collapsible, ...props }) {
  const { href, label } = item;
  const isActive = isActiveSidebarItem(item, activePath);
  return (
    <li className="menu__list-item" key={label}>
      <Link
        className={clsx('menu__link', {
          'menu__link--active': isActive,
          [styles.menuLinkExternal]: !isInternalUrl(href),
        })}
        to={href}
        {...(isInternalUrl(href) && {
          isNavLink: true,
          exact: true,
          onClick: onItemClick,
        })}
        {...props}
      >
        {label}
      </Link>
    </li>
  );
}

function useShowAnnouncementBar() {
  const { isAnnouncementBarClosed } = useUserPreferencesContext();
  const [showAnnouncementBar, setShowAnnouncementBar] = useState(!isAnnouncementBarClosed);
  useScrollPosition(({ scrollY }) => {
    if (!isAnnouncementBarClosed) {
      setShowAnnouncementBar(scrollY === 0);
    }
  });
  return showAnnouncementBar;
}

function useResponsiveSidebar() {
  const [showResponsiveSidebar, setShowResponsiveSidebar] = useState(false);
  useLockBodyScroll(showResponsiveSidebar);
  const windowSize = useWindowSize();
  useEffect(() => {
    if (windowSize === windowSizes.desktop) {
      setShowResponsiveSidebar(false);
    }
  }, [windowSize]);
  const closeResponsiveSidebar = useCallback(
    (e) => {
      e.target.blur();
      setShowResponsiveSidebar(false);
    },
    [setShowResponsiveSidebar],
  );
  const toggleResponsiveSidebar = useCallback(() => {
    setShowResponsiveSidebar((value) => !value);
  }, [setShowResponsiveSidebar]);
  return {
    showResponsiveSidebar,
    closeResponsiveSidebar,
    toggleResponsiveSidebar,
  };
}

function HideableSidebarButton({ onClick }) {
  return (
    <button
      type="button"
      title={translate({
        id: 'theme.docs.sidebar.collapseButtonTitle',
        message: 'Collapse sidebar',
        description: 'The title attribute for collapse button of doc sidebar',
      })}
      aria-label={translate({
        id: 'theme.docs.sidebar.collapseButtonAriaLabel',
        message: 'Collapse sidebar',
        description: 'The title attribute for collapse button of doc sidebar',
      })}
      className={clsx('button button--secondary button--outline', styles.collapseSidebarButton)}
      onClick={onClick}
    >
      <IconArrow className={styles.collapseSidebarButtonIcon} />
    </button>
  );
}

function ResponsiveSidebarButton({ responsiveSidebarOpened, onClick }) {
  return (
    <button
      aria-label={
        responsiveSidebarOpened
          ? translate({
              id: 'theme.docs.sidebar.responsiveCloseButtonLabel',
              message: 'Close menu',
              description: 'The ARIA label for close button of mobile doc sidebar',
            })
          : translate({
              id: 'theme.docs.sidebar.responsiveOpenButtonLabel',
              message: 'Open menu',
              description: 'The ARIA label for open button of mobile doc sidebar',
            })
      }
      aria-haspopup="true"
      className="button button--secondary button--sm menu__button"
      type="button"
      onClick={onClick}
    >
      {responsiveSidebarOpened ? (
        <span className={clsx(styles.sidebarMenuIcon, styles.sidebarMenuCloseIcon)}>&times;</span>
      ) : (
        <IconMenu className={styles.sidebarMenuIcon} height={MOBILE_TOGGLE_SIZE} width={MOBILE_TOGGLE_SIZE} />
      )}
    </button>
  );
}

function RexMDTFSwitcher() {
  const config = usePlaygroundConfig();

  const match = useRouteMatch(useBaseUrl('/docs'));
  if (match == null) {
    return null;
  }

  return (
    <div className={styles.switcher}>
      <div className={styles.switch}>
        <Tooltip
          title={<QRCode colorMode={config.colorMode} />}
          placement="bottom-start"
          renderTarget={(arg) => <button {...arg}>S</button>}
        />
        <button className={styles.active}>L</button>
      </div>
      <div className={styles.switch}>
        <button className={clsx({ [styles.active]: config.colorMode === 'light' })} onClick={config.setLightMode}>
          <Sun />
        </button>
        <button className={clsx({ [styles.active]: config.colorMode === 'dark' })} onClick={config.setDarkMode}>
          <Moon />
        </button>
      </div>
    </div>
  );
}

export default function DocSidebar({ path, sidebar, sidebarCollapsible = true, onCollapse, isHidden }) {
  const showAnnouncementBar = useShowAnnouncementBar();
  const {
    navbar: { hideOnScroll },
    hideableSidebar,
  } = useThemeConfig();
  const { isAnnouncementBarClosed } = useUserPreferencesContext();
  const { showResponsiveSidebar, closeResponsiveSidebar, toggleResponsiveSidebar } = useResponsiveSidebar();
  return (
    <div
      className={clsx(styles.sidebar, {
        [styles.sidebarWithHideableNavbar]: hideOnScroll,
        [styles.sidebarHidden]: isHidden,
      })}
    >
      {hideOnScroll && <Logo tabIndex={-1} className={styles.sidebarLogo} />}

      <RexMDTFSwitcher />

      <div
        className={clsx(
          'menu',
          'menu--responsive',
          // 'thin-scrollbar',
          styles.menu,
          {
            'menu--show': showResponsiveSidebar,
            [styles.menuWithAnnouncementBar]: !isAnnouncementBarClosed && showAnnouncementBar,
          },
        )}
      >
        <ResponsiveSidebarButton responsiveSidebarOpened={showResponsiveSidebar} onClick={toggleResponsiveSidebar} />
        <ul className="menu__list">
          <DocSidebarItems
            items={sidebar}
            onItemClick={closeResponsiveSidebar}
            collapsible={sidebarCollapsible}
            activePath={path}
          />
        </ul>
      </div>
      {hideableSidebar && <HideableSidebarButton onClick={onCollapse} />}
    </div>
  );
}
