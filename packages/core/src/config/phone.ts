import { extendConfig } from './default';

export default extendConfig({
  Description: {
    columns: 1,
  },
  Form: {
    labelPosition: 'top',
  },
  SearchForm: {
    columns: 1,
    displayCount: 3,
  },
  Timeline: {
    align: 'right',
  },
});
