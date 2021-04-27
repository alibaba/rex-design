import { Overlay } from '../overlay';
import { batchedUpdates } from './batchUpdate';

/**
 管理一个 portalContainer 上的多个 overlay 实例
 - 支持容器内按下`Escape`来关闭最近打开的浮层
 - 支持在容器内点击浮层外部区块来关闭最近打开的浮层
 - 支持浮层关闭事件的防抖，避免 `props.onRequestClose` 在不期望的情况下被调用
*/
export class OverlayManager {
  static REX_OVERFLOW_HIDDEN_CLS = 'rex-overflow-hidden';
  static REX_OVERFLOW_FORCE_HIDDEN_CLS = 'rex-overflow-force-hidden';

  constructor(readonly portalContainer: HTMLElement) {
    this.portalContainer = portalContainer;
  }

  // 记录当前被打开的所有的浮层
  private stack: Overlay[] = [];

  // 记录当前有多少个设置了 disableScroll=true 的浮层被打开了
  private disableScrollCount = 0;
  // 记录当前有多少个设置了 disableScroll='force' 的浮层被打开了
  private forceDisableScrollCount = 0;

  // 获取最近一次被打开的浮层
  private getLastOpenOverlay() {
    return this.stack[this.stack.length - 1];
  }

  // 添加一个打开的浮层
  add(overlay: Overlay) {
    // TODO 为啥要加个 requestAnimationFrame 来着？
    requestAnimationFrame(() => {
      this.stack.push(overlay);
      this.portalContainer.dataset.rexOverlayCount = String(this.stack.length);

      if (overlay.props.disableScroll === true) {
        this.disableScrollCount += 1;
        if (this.disableScrollCount === 1) {
          this.portalContainer.classList.add(OverlayManager.REX_OVERFLOW_HIDDEN_CLS);
        }
      } else if (overlay.props.disableScroll === 'force') {
        this.forceDisableScrollCount += 1;
        if (this.forceDisableScrollCount === 1) {
          this.portalContainer.classList.add(OverlayManager.REX_OVERFLOW_FORCE_HIDDEN_CLS);
        }
      }

      if (this.stack.length === 1) {
        this.setupEventListeners();
      }
    });
  }

  // 移除一个浮层
  delete(overlay: Overlay) {
    const index = this.stack.indexOf(overlay);
    if (index === -1) {
      return;
    }

    this.stack.splice(index, 1);
    this.portalContainer.dataset.rexOverlayCount = String(this.stack.length);

    if (overlay.props.disableScroll === true) {
      this.disableScrollCount -= 1;
      if (this.disableScrollCount === 0) {
        this.portalContainer.classList.remove(OverlayManager.REX_OVERFLOW_HIDDEN_CLS);
      }
    } else if (overlay.props.disableScroll === 'force') {
      this.forceDisableScrollCount -= 1;
      if (this.forceDisableScrollCount === 0) {
        this.portalContainer.classList.remove(OverlayManager.REX_OVERFLOW_FORCE_HIDDEN_CLS);
      }
    }

    if (this.stack.length === 0) {
      this.disposeEventListeners();
    }
  }

  private setupEventListeners() {
    document.addEventListener('keydown', this.handleKeydown);
    // click 事件可能在某个 div 上关闭了某个浮层，导致 click 在 document 上触发时「最近一次被打开的浮层」已经发生了变化
    // 这里的 capture=true 是为了避免这个情况
    document.addEventListener('click', this.handleClick, { capture: true });
  }

  private disposeEventListeners() {
    document.removeEventListener('keydown', this.handleKeydown);
    document.removeEventListener('click', this.handleClick);
  }

  private handleKeydown = (e: KeyboardEvent) => {
    batchedUpdates(() => {
      const targetNode = e.target as Node;
      if (!this.portalContainer.contains(targetNode)) {
        return;
      }

      if (e.key === 'Escape') {
        const lastOpenOverlay = this.getLastOpenOverlay();
        if (lastOpenOverlay == null) {
          return;
        }
        const { canCloseByEsc, onRequestClose } = lastOpenOverlay.props;
        if (canCloseByEsc) {
          onRequestClose?.('Escape');
        }
      }
    });
  };

  private handleClick = (e: MouseEvent) => {
    batchedUpdates(() => {
      const targetNode = e.target as Node;
      if (!this.portalContainer.contains(targetNode)) {
        return;
      }

      const lastOpenOverlay = this.getLastOpenOverlay();
      if (lastOpenOverlay == null) {
        return;
      }

      const { canCloseByOutSideClick, onRequestClose } = lastOpenOverlay.props;

      if (canCloseByOutSideClick) {
        const outsideClick = !lastOpenOverlay.isInsideClick(targetNode);
        if (outsideClick) {
          onRequestClose?.('outside click');
        }
      }
    });
  };
}
