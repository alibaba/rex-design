import { Icon } from '@rexd/icon';
import React from 'react';
import { css, system, SystemProps } from '../../system';

export interface TagProps extends SystemProps {
  /**
   * 是否可交互, 若为是, 在 hover 以及 click 时改变样式
   */
  interactive?: boolean;
  /**
   * 尺寸
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 形态
   * @default outline
   */
  shape?: 'outline' | 'solid';
  /**
   * 自定义图标
   */
  icon?: React.ReactNode;
  /**
   * 是否可关闭
   * @default false
   */
  isCloseable?: boolean;
  /**
   * 在 tag 点击时的回调函数
   */
  onClick?: (ev: React.MouseEvent<HTMLSpanElement>) => void;
  /**
   * 在 tag 关闭时的回调函数
   */
  onClose?: (ev: React.MouseEvent<HTMLSpanElement>) => void;
  children: React.ReactNode;
}

const RexTag = system(
  'span',
  css`
    display: inline-flex;
    align-items: center;
    padding: 0 var(--rex-space-m);
    border-radius: var(--rex-radii-m);
    color: var(--rex-colors-text-body);

    > .rex-tag-icon {
      display: flex;
      align-items: center;
      margin-right: var(--rex-space-s);
    }

    > .rex-tag-close-icon {
      margin-left: var(--rex-space-m);
      display: flex;
      align-items: center;

      &:hover {
        cursor: pointer;
        // TODO colors.text.hover
        color: var(--rex-colors-text-body);
      }
    }

    &[data-size='small'] {
      height: var(--rex-sizes-s5);
      font-size: var(--rex-fontSizes-note);
    }

    &[data-size='medium'] {
      height: var(--rex-sizes-s6);
      font-size: var(--rex-fontSizes-body);
    }

    &[data-size='lagre'] {
      height: var(--rex-sizes-s8);
      font-size: var(--rex-fontSizes-title);
    }

    &[data-shape='outline'] {
      border: var(--rex-borders-solid) var(--rex-colors-line-border);
    }

    &[data-shape='solid'] {
      background-color: var(--rex-colors-fill-layer2);
    }

    /* 可交互 hover  */
    &[data-interactive='true']:hover {
      cursor: pointer;
      background-color: var(--rex-colors-fill-layer1);
    }
  `,
);

/**
 * 已废弃
 * @deprecated
 */
export const Tag = React.forwardRef<'span', TagProps>((props, ref) => {
  const {
    isCloseable = false,
    size = 'medium',
    shape = 'outline',
    interactive = false,
    icon,
    onClose,
    onClick,
    children,
  } = props;

  return (
    <RexTag onClick={onClick} data-shape={shape} data-size={size} data-interactive={interactive} ref={ref}>
      {icon && <span className="rex-tag-icon">{icon}</span>}
      {children}
      {isCloseable && (
        <span className="rex-tag-close-icon" onClick={onClose}>
          <Icon type="close-bold" />
        </span>
      )}
    </RexTag>
  );
});
