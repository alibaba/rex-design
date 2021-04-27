import React, { useState } from 'react';
import { Steps, Box } from '@rexd/core';

export default { title: 'Steps' };

export const Basic = () => {
  const [step, setStep] = useState<number>(2);
  const steps = [
    {
      title: '基本信息',
      children: (
        <Box>
          首先做这件事首先做这件事首先做这件事首先做这件事首先做这件事首先做这件事 首先做这件事 首先做这件事
          首先做这件事
        </Box>
      ),
    },
    {
      title: '店仓范围',
      children: <Box>其次做这件事其次做这件事其次做这件事其次做这件事其次做这件事其次做这件事 其次做这件事</Box>,
    },
    { title: '合同条款', children: <Box>然后做这件事</Box> },
    { title: '附加信息', children: <Box>最后做这件事</Box> },
  ];
  return <Steps step={step} steps={steps} onChange={(val) => setStep(val)} />;
};

export const Status = () => {
  const steps = [
    { title: '基本信息', status: 'complete' },
    { title: '店仓范围', status: 'complete' },
    { title: '合同条款', status: 'error' },
    { title: '合同条款' },
    { title: '附加信息' },
  ];

  return <Steps steps={steps} onChange={console.log} />;
};

/**
 * 垂直方向步骤条
 */
export const Column = () => {
  const [step, setStep] = useState<number>(2);
  const steps = [
    {
      title: '基本信息',
      children: (
        <Box>
          首先做这件事首先做这件事首先做这件事首先做这件事首先做这件事首先做这件事 首先做这件事 首先做这件事
          首先做这件事
        </Box>
      ),
    },
    {
      title: '店仓范围',
      children: <Box>其次做这件事其次做这件事其次做这件事其次做这件事其次做这件事其次做这件事 其次做这件事</Box>,
    },
    { title: '合同条款', children: <Box>然后做这件事</Box> },
    { title: '附加信息', children: <Box>最后做这件事</Box> },
  ];
  return <Steps direction="column" step={step} steps={steps} onChange={(val) => setStep(val)} />;
};
