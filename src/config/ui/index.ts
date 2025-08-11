export type Link = {
  title: string;
  href: string;
  disabled?: boolean;
};

interface SidebarUIConfig {
  indexTitle: string;
  mobileBottomLinks: Link[];
}

interface TopbarUIConfig {
  title: string;
  searchEnabled: boolean;
  links: Link[];
}

interface FooterUIConfig {
  title: string;
  subtitle: string;
  rights: string;
  links: Link[];
}

const mainLinks = [
  {
    title: 'Home',
    href: '/',
    disabled: true,
  },
  {
    title: 'Research',
    href: '/docs/research',
    disabled: true,
  },
  {
    title: 'Blog',
    href: '/docs/blog',
    disabled: true,
  },
];

const getSidebarUIConfig = (): SidebarUIConfig => ({
  indexTitle: '',
  mobileBottomLinks: mainLinks,
});

const getTopbarUIConfig = (): TopbarUIConfig => ({
  title: 'Blogs',
  searchEnabled: false,
  links: mainLinks,
});

const getFooterUIConfig = (): FooterUIConfig => ({
  title: '',
  subtitle: '',
  rights: '© 2025 All rights reserved.',
  links: [
    {
      href: 'mailto:cse@huawei.com',
      title: 'Contact',
      disabled: true,
    },
    {
      href: 'https://huaweicanada.recruitee.com/?jobs-7d390cc9%5Bcity%5D%5B%5D=Kingston',
      title: 'Join Us',
      disabled: true,
    },
  ],
});

export { getSidebarUIConfig, getTopbarUIConfig, getFooterUIConfig };
