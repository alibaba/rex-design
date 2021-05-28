import cx from 'classnames';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { merge } from 'rxjs';
import styled from 'styled-components';
import { LinkProps } from '../link';
import { Affix } from '../overlays';
import { domUtils } from '../virtual-list/dom-utils';

export interface AnchorProps {
  useJS?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  offsetTop?: number;
}

type AnchorType = {
  (props: AnchorProps): React.ReactElement;
  Item: (props: LinkProps & { depth?: number }) => React.ReactElement;
};

class AnchoringManager {
  hrefs: string[] = [];
  pendingHrefs: string[] = [];

  addHref(href: string) {
    // console.log('AnchoringManager#addHref', href);
    this.pendingHrefs.push(href);
  }

  seal() {
    // console.log('AnchoringManager#seal');
    this.hrefs = this.pendingHrefs;
    this.pendingHrefs = [];
  }
}

const AnchorInternalContext = React.createContext<{
  managerRef: React.MutableRefObject<AnchoringManager>;
  activeHref: string;
}>(null);

export const Anchor: AnchorType = ({ children, useJS, offsetTop = 12, style, className }: AnchorProps) => {
  const anchorManagerRef = useRef<AnchoringManager>(new AnchoringManager());
  const [activeHref, setActiveHref] = useState('');

  useEffect(() => {
    const manager = anchorManagerRef.current;
    manager.seal();
  });

  useEffect(() => {
    const internalState = anchorManagerRef.current;

    const subscription = merge('init', domUtils.fromPassiveScrollEvent(window)).subscribe(() => {
      const items = internalState.hrefs.map((href) => {
        const element = document.querySelector<HTMLElement>(href);
        const boundingClientTop = domUtils.getBoundingClientRect(element).top;
        return { href, element, boundingClientTop };
      });
      const sortedItems = items.sort((a, b) => b.boundingClientTop - a.boundingClientTop);
      const anchorTarget = sortedItems.find((d) => d.boundingClientTop <= 8) ?? sortedItems[sortedItems.length - 1];
      if (anchorTarget) {
        setActiveHref(anchorTarget.href);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Affix useJS={useJS} offsetTop={offsetTop} style={{ borderLeft: '1px solid #eee', ...style }} className={className}>
      <AnchorInternalContext.Provider value={{ activeHref, managerRef: anchorManagerRef }}>
        {children}
      </AnchorInternalContext.Provider>
    </Affix>
  );
};

const StyledAnchorItem = styled.div`
  height: 18px;
  margin-bottom: 4px;
  position: relative;

  ::before {
    content: '';
    position: absolute;
    left: -3px;
    top: 6px;
    width: 6px;
    border-radius: 3px;
    height: 6px;
    background: transparent;
  }

  &.active {
    color: var(--rex-colors-primary-50);
    ::before {
      background: #3862cf;
    }
  }

  > a {
    display: block;
    text-decoration: none;
    color: inherit;

    &:hover {
      color: var(--rex-colors-primary-50);
    }
  }
`;

Anchor.Item = ({ title, href, className, onClick, children, depth = 0 }: LinkProps & { depth?: number }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { activeHref, managerRef } = useContext(AnchorInternalContext);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const manager = managerRef.current;
    manager.addHref(href);
  });

  return (
    <>
      <StyledAnchorItem className={cx({ active: activeHref === href })}>
        <a href={href} className={className} onClick={onClick} style={{ marginLeft: (depth + 1) * 12 }}>
          {title}
        </a>
      </StyledAnchorItem>
      {React.Children.map(children, (d: any) => React.cloneElement(d, { depth: depth + 1 }))}
    </>
  );
};
