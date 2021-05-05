const path = require('path');
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
      // id: 'alpha.0',
      isCloseable: false,
      backgroundColor: '#fffae6',
      textColor: '#5c3b0d',
      content: 'ReX Design alpha 版本迭代中，敬请期待。请勿将 alpha 版本用于生产环境。',
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
        { to: 'blog', label: '博客', position: 'left' },
        // { href: 'https://github.com/alibaba/rex-design', label: '<span />', position: 'right' },

        {
          href: 'https://github.com/alibaba/rex-design',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [{ label: '更新日志', to: 'docs/changelog' }],
        },
        {
          title: '更多',
          items: [
            { label: 'Blog', to: 'blog' },
            { label: 'docusaurus', href: 'https://github.com/facebook/docusaurus' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Alibaba Inc. Built with ❤️ by hema-FE.`,
    },

    // algolia: {
    //   // todo 等开源发布后替换 algolia apiKey
    //   apiKey: '10375f97d074db729b52cd376905287c',
    //   indexName: 'ali-react-table',
    // },
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
    require.resolve('./tools/configureWebpack.js'),
    [
      require.resolve('./tools/components-source-location.js'),
      {
        srcDir: path.join(__dirname, '../core/src'),
      },
    ],
    'docusaurus-plugin-sass',
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'design-docs',
        path: 'design-docs',
        routeBasePath: 'design',
        // editUrl: 'https://github.com/alibaba/ali-react-table/edit/master/packages/website/',
        sidebarPath: require.resolve('./design-sidebars.js'),
      },
    ],
  ],
};