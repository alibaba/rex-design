const corePkg = require('../core/package.json');

module.exports = {
  title: 'rex-design',
  tagline: 'rex-design',
  url: 'https://github.com/alibaba/rex-design',
  baseUrl: '/rex-design/',
  onBrokenLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'alibaba',
  projectName: 'rex-design',

  themeConfig: {
    announcementBar: {
      isCloseable: false,
      backgroundColor: '#fffae6',
      textColor: '#5c3b0d',
      content: 'ReX Design beta 版本迭代中。',
    },
    colorMode: {
      defaultMode: 'light',
    },
    prism: {
      theme: require('prism-react-renderer/themes/vsLight'),
      darkTheme: require('prism-react-renderer/themes/vsDark'),
    },
    navbar: {
      logo: {
        alt: 'rex design Logo',
        src: 'https://img.alicdn.com/imgextra/i4/O1CN01iZY8c61ixQeIcbbCE_!!6000000004479-55-tps-244-21.svg',
      },
      hideOnScroll: true,
      items: [
        { to: 'docs', activeBasePath: 'docs', label: '组件', position: 'left' },
        { to: 'design', activeBasePath: 'design', label: '设计', position: 'left' },
        {
          href: 'https://github.com/alibaba/rex-design',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },

    algolia: {
      apiKey: 'b001b6083928a00b297494b4fb30a228',
      indexName: 'rex-design',
    },

    gtag: {
      trackingID: 'G-9XMWYPJLZN',
      anonymizeIP: true,
    },
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/alibaba/rex-design/edit/main/packages/doc/',
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: [require.resolve('./src/css/custom.scss')],
        },
      },
    ],
  ],
  themes: ['@docusaurus/theme-live-codeblock'],
  plugins: [
    require.resolve('./configureWebpack.js'),
    'docusaurus-plugin-sass',
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'design-docs',
        path: 'design-docs',
        routeBasePath: 'design',
        editUrl: 'https://github.com/alibaba/rex-design/edit/main/packages/doc/',
        sidebarPath: require.resolve('./design-sidebars.js'),
      },
    ],
  ],
};
