import React from 'react';
import lodash from 'lodash';
import cx from 'classnames';
import styled from 'styled-components';
import * as rexd from '@rexd/core';

const ReactLiveScope = {
  React,
  ...React,
  rexd,
  ...rexd,
  styled,
  cx,
  _: lodash,
  lodash,
};

export default ReactLiveScope;
