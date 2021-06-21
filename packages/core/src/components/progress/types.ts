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
   * 最小值
   * @default 0
   */
  min?: number;
  /**
   * 最大值
   * @default 100
   */
  max?: number;
  /**
   * 圆的大小
   */
  size?: string;
  /**
   * 进度条颜色值
   */
  lineColor?: string;
  /**
   * 线条粗细
   */
  lineWidth?: string;
  /**
   * 自定义 label
   * @default value => value
   */
  renderLabel?: (payload: RenderLabelPayload) => React.ReactNode;
}
