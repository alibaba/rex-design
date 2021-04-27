import React from 'react';

export default function DingTalkAnchor({ dingtalkId, children, ...others }) {
  return (
    <a
      {...others}
      href={`dingtalk://dingtalkclient/action/sendmsg?dingtalk_id=${dingtalkId}`}
      style={{ display: 'inline-flex', ...others.style }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 16" id="dingding-filled" width="18" height="18">
        <path
          d="M7.085 3.438C4.427 2.47.538.7.538.7.263.628.224.895.224.895c-.088 1.074.59 2.821.942 3.213.35.392 5.61 1.999 5.61 1.999S2.73 5.29 1.754 5.01c-.977-.281-.666.313-.666.313.2 1.084 1.14 2.317 1.884 2.433.742.116 3.869.07 3.869.07s-.624.072-1.638.21c-.75.101-1.705.219-1.953.312-.582.22.422 1.1.422 1.1 1.489 1.35 2.28.888 2.28.888.585-.188 1.079-.325 1.497-.425l-.518 2.151h1.487l-.82 3.25 3.61-4.779h-1.89l.392-.68a.08.08 0 01.007.014s1.341-2.146 1.854-3.242l.01-.017c.087-.19.15-.346.175-.454.299-1.253-2.013-1.747-4.672-2.716z"
          fill="#3296FA"
        />
      </svg>
      {children}
    </a>
  );
}
