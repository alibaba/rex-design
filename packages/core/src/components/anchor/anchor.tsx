import cx from 'classnames';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { merge } from 'rxjs';
import styled from 'styled-components';
import { LinkProps } from '../link';
import { Affix } from '../overlays';
import { domUtils } from '../virtual-list/dom-utils';

export interface AnchorProps {
  children?: React.ReactNode;

  /** 锚点具体滚动容器顶部的距离 */
  offsetTop?: number;

  /** 是否启用 JavaScript 定位 */
  useJS?: boolean;

  className?: string;
  style?: React.CSSProperties;
}

type AnchorType = {
  (props: AnchorProps): React.ReactElement;
  Item: (props: LinkProps & { depth?: number }) => React.ReactElement;
};

class AnchoringManager {
  hrefs: string[] = [];
  pendingHrefs: string[] = [];

  addHref(href: string) {
    this.pendingHrefs.push(href);
  }

  seal() {
    this.hrefs = this.pendingHrefs;
    this.pendingHrefs = [];
  }
}

const AnchorInternalContext = React.createContext<{
  managerRef: React.MutableRefObject<AnchoringManager>;
  activeHref: string;
}>(null);

const StyledAffix = styled(Affix)`
  border-left: 1px solid var(--rex-colors-emphasis-20);
  font-size: var(--rex-fontSizes-body);
  overflow: auto;
`;

const THRESHOLD = 8;
const INDENT = 12;

export const Anchor: AnchorType = ({ children, useJS, offsetTop = 12, style, className }: AnchorProps) => {
  const anchorManagerRef = useRef<AnchoringManager>(new AnchoringManager());
  const [activeHref, setActiveHref] = useState('');
  const affixRef = useRef<Affix>();

  useEffect(() => {
    const manager = anchorManagerRef.current;
    manager.seal();
  });

  useEffect(() => {
    const internalState = anchorManagerRef.current;

    const affixTarget = affixRef.current.targetRef.current;
    const scrollContainer = domUtils.getScrollParent(affixTarget.parentElement);
    // todo 考虑 affixTarget / scrollContainer 动态发生变化的情况？

    const subscription = merge('init', domUtils.fromPassiveScrollEvent(scrollContainer)).subscribe(() => {
      const parentTop = domUtils.getBoundingClientRect(scrollContainer).top;

      const items = internalState.hrefs
        .map((href) => {
          if (href.startsWith('#')) {
            const element = document.querySelector<HTMLElement>(href);
            if (element) {
              const top = domUtils.getBoundingClientRect(element).top - parentTop;
              return { href, element, top };
            }
          }
        })
        .filter(Boolean);
      const sortedItems = items.sort((a, b) => b.top - a.top);

      const anchorTarget = sortedItems.find((d) => d.top <= THRESHOLD) ?? sortedItems[sortedItems.length - 1];
      if (anchorTarget) {
        setActiveHref(anchorTarget.href);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <StyledAffix
      ref={affixRef}
      useJS={useJS}
      offsetTop={offsetTop}
      className={cx('rex-anchor', className)}
      style={style}
    >
      <AnchorInternalContext.Provider value={{ activeHref, managerRef: anchorManagerRef }}>
        {children}
      </AnchorInternalContext.Provider>
    </StyledAffix>
  );
};

const StyledAnchorItem = styled.div`
  position: relative;

  ::before {
    content: '';
    position: absolute;
    width: 2px;
    height: 100%;
    top: 0;
    left: 0;
    background: transparent;
  }

  &.active {
    color: var(--rex-colors-primary-60);
    ::before {
      background: var(--rex-colors-primary-60);
    }
  }

  > a {
    display: block;
    text-decoration: none;
    height: 18px;
    margin-bottom: 4px;
    color: inherit;
    max-width: 100%;
    overflow: hidden;
    white-space: pre;
    text-overflow: ellipsis;

    &:hover {
      color: var(--rex-colors-primary-50);
    }
  }
`;

export interface AnchorItemProps {
  /** 名称 */
  title?: string;
  /** 跳转链接 */
  href?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  children?: any;
  depth?: number;
}

const AnchorItem = ({ title, href, className, style, onClick, children, depth = 0 }: AnchorItemProps) => {
  const { activeHref, managerRef } = useContext(AnchorInternalContext);

  useEffect(() => {
    const manager = managerRef.current;
    manager.addHref(href);
  });

  return (
    <>
      <StyledAnchorItem className={cx({ active: activeHref === href })}>
        <a
          href={href}
          title={title}
          className={className}
          onClick={onClick}
          style={{ paddingLeft: (depth + 1) * INDENT, ...style }}
        >
          {title}
        </a>
      </StyledAnchorItem>
      {React.Children.map(children, (d: any) => React.cloneElement(d, { depth: depth + 1 }))}
    </>
  );
};

Anchor.Item = AnchorItem;
