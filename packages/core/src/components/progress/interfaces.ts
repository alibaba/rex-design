export interface RenderLabelPayload {
  value?: number;
}

export interface ProgressProps {
  /**
   * 进度条百分比
   * @default 0
   */
  value?: number;
  /**
   * 进度条颜色值
   */
  color?: string;
  /**
   * 自定义 label
   * @default value => value
   */
  renderLabel?: (payload: RenderLabelPayload) => React.ReactNode;
}

export interface CircleProgressProps extends ProgressProps {
  /**
   * 最小值
   */
  min?: number;
  /**
   * 最大值
   */
  max?: number;
  /**
   * 圆的大小
   */
  size?: string;
  /**
   * 线条粗细
   */
  strokeWidth?: string;
  /**
   * 圆的背景色
   */
  trackColor?: string;
}
