import React, { useCallback, useMemo, useRef } from 'react';
import ReactDOM from 'react-dom';

export interface RenderContainer {
  key: string;
  underlyingElement?: HTMLDivElement;
  render(content: React.ReactNode): void;
  unmount(): void;
}

let nextRenderContainerId = 1;
function getUniqueRenderContainerKey() {
  return `render-container-${nextRenderContainerId++}`;
}

class AttachedRenderContainerFactory extends React.Component<
  {},
  { items: Array<{ key: string; content: React.ReactNode }> }
> {
  state = {
    items: [] as Array<{
      key: string;
      content: React.ReactNode;
    }>,
  };

  getContainer(): RenderContainer {
    const key = getUniqueRenderContainerKey();

    return {
      key,
      underlyingElement: null,
      render: (content: React.ReactNode) => {
        this.setState((prev) => {
          const index = prev.items.findIndex((item) => item.key === key);
          const newItem = { key, content };
          if (index === -1) {
            const nextItems = prev.items.concat([newItem]);
            return { items: nextItems };
          } else {
            const nextItems = [...prev.items.slice(0, index), newItem, ...prev.items.slice(index + 1)];
            return { items: nextItems };
          }
        });
      },
      unmount: () => {
        this.setState((prev) => ({
          items: prev.items.filter((item) => item.key !== key),
        }));
      },
    };
  }

  render() {
    return (
      <React.Fragment>
        {this.state.items.map((item) => (
          <React.Fragment key={item.key}>{item.content}</React.Fragment>
        ))}
      </React.Fragment>
    );
  }
}

export function makeDetachedRenderContainer(): RenderContainer {
  const key = getUniqueRenderContainerKey();
  const container = document.createElement('div');
  document.body.appendChild(container);

  return {
    key,
    underlyingElement: container,
    render(node: React.ReactNode) {
      ReactDOM.render(<>{node}</>, container);
    },
    unmount() {
      ReactDOM.unmountComponentAtNode(container);
      container.remove();
    },
  };
}

export function useRenderContainerFactory() {
  const attachedFactoryRef = useRef<AttachedRenderContainerFactory>();
  const contextHolder = useMemo(() => <AttachedRenderContainerFactory ref={attachedFactoryRef} />, []);

  const getContainer = useCallback(() => {
    if (attachedFactoryRef.current != null) {
      return attachedFactoryRef.current.getContainer();
    }

    console.warn('[@rexd/core] contextHolder 需要被渲染到 React 组件中');
    return makeDetachedRenderContainer();
  }, []);

  return [getContainer, contextHolder] as const;
}
