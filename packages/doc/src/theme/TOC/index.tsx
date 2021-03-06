// @ts-nocheck

import React from 'react';
import clsx from 'clsx';
import useTOCHighlight from '@theme/hooks/useTOCHighlight';
import type { TOCProps } from '@theme/TOC';
import styles from './styles.module.css';
import { TOCItem } from '@docusaurus/types';

const LINK_CLASS_NAME = 'table-of-contents__link';
const ACTIVE_LINK_CLASS_NAME = 'table-of-contents__link--active';
const TOP_OFFSET = 100;

function Headings({ toc, isChild }: { toc: readonly TOCItem[]; isChild?: boolean }) {
  if (!toc.length) {
    return null;
  }
  return (
    <ul className={isChild ? '' : 'table-of-contents table-of-contents__left-border'}>
      {toc.map((heading) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            className={LINK_CLASS_NAME}
            // Developer provided the HTML, so assume it's safe.
            dangerouslySetInnerHTML={{ __html: heading.value }}
          />
          <Headings isChild toc={heading.children} />
        </li>
      ))}
    </ul>
  );
}

function TOC({ toc }: TOCProps): JSX.Element {
  useTOCHighlight(LINK_CLASS_NAME, ACTIVE_LINK_CLASS_NAME, TOP_OFFSET);
  return (
    <div className={clsx(styles.tableOfContents)}>
      <Headings toc={toc} />
    </div>
  );
}

export default TOC;
