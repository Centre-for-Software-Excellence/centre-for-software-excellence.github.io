import { BlogsSection, ResearchSection } from '@/app/home';

export interface Blog {
  title: string;
  abstract: string;
  date: string;
  category: string;
  link: string;
}
export interface Publication {
  title: string;
  abstract: string;
  date: string;
  authors: string[];
  categories: string[];
  paperLink?: string;
}

type People = {
  name: string;
  image?: string;
};

export interface Collaborator {
  org: string;
  logo?: string;
  people: People[];
}

export interface HomeConfig {
  researchSection: ResearchSection;
  blogsSection: BlogsSection;
  collaboratorsTitle: string;
  collaborators: Collaborator[];
}

export const getHomeConfig = (): HomeConfig => ({
  researchSection: {
    base: '/docs/research',
    title: 'Recent Research',
    description: 'Description about the research we do',
    viewAll: 'View All',
  },
  blogsSection: {
    base: '/docs/blog',
    title: 'Recent Blogs',
    description: 'Description about the blogs we posts',
    viewAll: 'View All',
  },
  collaboratorsTitle: 'Collaborators',
  collaborators: [
    {
      org: 'University of British Columbia',
      logo: '/logos/ubc.png',
      people: [
        {
          name: 'Julia Rubin',
        },
        {
          name: 'Dongwook yoon',
        },
        {
          name: 'Elisa Banlassad',
        },
        {
          name: 'Konstantin Beznosov',
        },
        {
          name: 'Ivan Beschastnikh',
        },
        {
          name: 'Ali Mesbah',
        },
      ],
    },
    {
      org: 'University of Manitoba',
      logo: '/logos/manitoba.png',
      people: [
        {
          name: 'Shaowei Wang',
        },
      ],
    },
    {
      org: 'University of Waterloo',
      logo: '/logos/waterloo.jpg',
      people: [
        {
          name: 'Weiyi Shang',
        },
      ],
    },
    {
      org: 'University of Ottawa',
      logo: '/logos/ottawa.png',
      people: [
        {
          name: 'Lionel Briand',
        },
      ],
    },
    {
      org: 'University of New Brunswick',
      logo: '/logos/brunswick.png',
      people: [
        {
          name: 'Rongxing Lu',
        },
      ],
    },
    {
      org: "Queen's University",
      logo: '/logos/queens.svg',
      people: [
        { name: 'Ying Zou' },
        {
          name: 'Bram Adams',
        },
        {
          name: 'James Cordy',
        },
      ],
    },
    {
      org: 'Concordia University',
      logo: '/logos/concordia.svg',
      people: [
        {
          name: 'Jinqiu Yang',
        },
        {
          name: 'Peter Chen',
        },
      ],
    },
    {
      org: 'Polytechnique Montreal',
      logo: '/logos/polytechnique.png',
      people: [
        {
          name: 'Foutse Khomh',
        },
      ],
    },
    {
      org: 'York University',
      logo: '/logos/york.png',
      people: [
        {
          name: 'Jack Jiang',
        },
        {
          name: 'Song Wang',
        },
        {
          name: 'Zhenhao Li',
        },
      ],
    },
    {
      org: 'University of Toronto',
      logo: '/logos/toronto.png',
      people: [
        {
          name: 'Shurui Zhou',
        },
      ],
    },
  ],
});
