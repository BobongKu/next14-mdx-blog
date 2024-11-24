import IconGithub from '@/components/icon/Github';

export const RESUME_DATA = {
  name: 'Bobong',
  initials: 'Bo',
  oldLink:'https://notion-next-x-bobongkus-projects.vercel.app/',
  location: '대한민국 서울특별시',
  locationLink: 'https://www.google.com/maps/place/seoul',
  about: '데프콘 본선을 가고싶은 White H4cker 😎',
  summary:
    '대학교 4학년부터 해킹을 배우기 시작해서 현재는 모의해킹 전문가로 활동하고 있습니다. 간간히 정보보안 관련 정보를 정리해서 올리고 있으니 도움이 되셨으면 좋겠습니다. 👍',
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
  awards:['2020 대학정보보호동아리 공로상','2023 사이버호남컨퍼런스 웹 취약점 대회 장려상',],
  team : 'SOTI(Security Over Tech&Info)',
  bucketlist:['정보보안기사 취득', 'Defcon 본선 진출', 'CVE 10개 등록', 'BenchPress 1RM 120Kg', 'Offensive Security Master']
} as const;
