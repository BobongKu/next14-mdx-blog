import IconGithub from '@/components/icon/Github';

export const RESUME_DATA = {
  name: 'Bobong',
  initials: 'Bo',
  location: '대한민국 서울특별시',
  locationLink: 'https://www.google.com/maps/place/seoul',
  about: 'White H4cker',
  summary:
    '뒤늦게 해킹에 입문해 취미로 관련 정보를 정리하는 블로그입니다.필요한 정보 도움이 되셨으면 좋겠습니다!',
  avatarUrl: 'https://avatars.githubusercontent.com/u/42234678?v=4',
  contact: {
    email: 'jhbgjy7@gmail.com',
    social: [
      {
        name: 'GitHub',
        url: 'https://github.com/BobongKu',
        icon: IconGithub,
      },
    ],
  },
  skills: ['Web Hack', 'Mobile Hack', 'Reversing', 'Spring Boot', 'Django', 'Flask', 'Next.js', 'Weight Training'],
} as const;
