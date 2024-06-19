import aleksPhoto from '../../assets/images/aleks.webp';
import olgaPhoto from '../../assets/images/olga.webp';
import sergeyPhoto from '../../assets/images/sergey.jpeg';

export const developers = [
  {
    name: 'Sergey Seleznev',
    role: 'Team Lead, Front-end junior-developer',
    shortbio: 'Сurrently supporting software products',
    linkGitHub: 'https://github.com/skayer81',
    contributionInProject: [
      'Registration page',
      'Cart page',
      'Detailed product page',
      'Write testing',
      'Work with API CommerceTools and with CommerceTools Merchant Center',
    ],
    photo: sergeyPhoto,
  },
  {
    name: 'Olga Yakusheva',
    role: 'Front-end junior-developer',
    shortbio: 'In the past - project engineer for electrical supply, currently on maternity leave',
    linkGitHub: 'https://github.com/gryzun33',
    contributionInProject: [
      'LoginPage',
      'CatalogPage',
      'Participated in the creation of pages: Profile, Main page, Cart',
      'Active work with API CommerceTools and with CommerceTools Merchant Center',
    ],
    photo: olgaPhoto,
  },
  {
    name: 'Aleksandr Chernichkin',
    role: 'Front-end junior-developer',
    shortbio: 'Working on a dry-cargo ship as an assistant captain - assistant engineer.',
    linkGitHub: 'https://github.com/alekseng',
    contributionInProject: [
      'Main page',
      'Profile page',
      'Error page',
      'Work with API CommerceTools',
    ],
    photo: aleksPhoto,
  },
];
