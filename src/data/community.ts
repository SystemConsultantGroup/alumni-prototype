export interface Club {
  id: string;
  type: "club" | "research";
  name: string;
  intro: string;
  president: string;
  presidentTitle: string;
  description: string;
  memberIds: string[];
  posts: ClubPost[];
}

export interface ClubPost {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  hasImage: boolean;
}

export const CLUBS: Club[] = [
  {
    id: "club1",
    type: "club",
    name: "성골회",
    intro: "성균골프회 - 동문들의 친목도모와 사업 파트너로서의 골프 동호회",
    president: "이우진",
    presidentTitle: "부회장",
    description: "성골회는 '성균골프회'로서, 총동창회 임원분들의 친목도모와 사업 파트너로서 또한 인생의 동반자로서 서로 돕고 응원하며 인생을 즐겁게 향유하고자 결성한 골프 동아리입니다. 회원이 되시면, 회비(5만원/월)를 납부하셔야 하며, 날회는 매월 셋째주 목요일에 진행됩니다.",
    memberIds: ["1", "3", "5", "9"],
    posts: [
      { id: "cp1", title: "3월 정기 라운딩 안내", content: "3월 정기 라운딩 일정을 안내드립니다.\n\n일시: 2026년 3월 20일(목) 오전 7시\n장소: 안양베네스트 골프클럽\n\n참가 신청은 단톡방에서 해주세요.", date: "2026.03.10", author: "이우진", hasImage: false },
      { id: "cp2", title: "2월 라운딩 결과 및 사진", content: "2월 정기 라운딩이 성황리에 마무리되었습니다.\n\n이번 우승자는 강태준 감사님입니다. 축하드립니다!\n\n다음 달에도 많은 참여 부탁드립니다.", date: "2026.02.25", author: "이우진", hasImage: true },
    ],
  },
  {
    id: "club2",
    type: "club",
    name: "성균등산회",
    intro: "매월 첫째주 토요일, 전국 명산을 함께 오르는 등산 동호회",
    president: "박철수",
    presidentTitle: "상임이사",
    description: "성균등산회는 매월 첫째주 토요일에 전국의 명산을 함께 오르는 동호회입니다. 건강한 체력과 동문 간 우정을 쌓는 것을 목표로 활동하고 있습니다. 초보자부터 경험자까지 모두 환영합니다. 월 회비는 2만원입니다.",
    memberIds: ["2", "6", "7", "11"],
    posts: [
      { id: "cp3", title: "4월 산행 일정 - 설악산", content: "4월 산행은 설악산으로 결정되었습니다.\n\n일시: 2026년 4월 5일(토) 오전 6시 출발\n집결지: 강남역 4번 출구\n\n참가 신청: 3월 30일까지", date: "2026.03.15", author: "박철수", hasImage: false },
    ],
  },
  {
    id: "club3",
    type: "club",
    name: "성균낚시회",
    intro: "바다낚시와 민물낚시를 즐기는 동문 낚시 동호회",
    president: "김도현",
    presidentTitle: "이사",
    description: "성균낚시회는 바다낚시와 민물낚시를 함께 즐기는 동호회입니다. 격월로 출조를 진행하며, 낚시 초보자를 위한 교육 프로그램도 운영합니다. 분기마다 낚시대회를 개최하고 있습니다.",
    memberIds: ["4", "7", "8"],
    posts: [],
  },
  {
    id: "club4",
    type: "club",
    name: "성균사진회",
    intro: "사진 촬영과 전시 활동을 하는 동문 사진 동호회",
    president: "최유진",
    presidentTitle: "이사",
    description: "성균사진회는 사진 촬영과 전시 활동을 하는 동호회입니다. 매월 출사를 진행하며, 연 1회 동문 사진전을 개최합니다. 풍경, 인물, 스트리트 등 다양한 장르의 사진을 함께 연구합니다.",
    memberIds: ["4", "10", "12"],
    posts: [
      { id: "cp4", title: "봄 출사 일정 안내", content: "봄맞이 출사를 계획하고 있습니다.\n\n일시: 2026년 4월 12일(토)\n장소: 경주 (벚꽃 촬영)\n\n참가 신청 부탁드립니다.", date: "2026.03.12", author: "최유진", hasImage: false },
    ],
  },
];

export const RESEARCH_GROUPS: Club[] = [
  {
    id: "res1",
    type: "research",
    name: "마케팅연구회",
    intro: "브랜드 전략, 데이터 분석, AI활용 등 마케팅 기법 연구",
    president: "김정수",
    presidentTitle: "상임이사",
    description: "마케팅연구회는 최신 마케팅 트렌드와 기법을 연구하는 모임입니다. 브랜드 전략, 데이터 기반 마케팅, AI 활용 마케팅 등을 주제로 월 1회 세미나를 진행합니다. 실무 경험을 가진 동문들의 발표와 토론으로 운영됩니다.",
    memberIds: ["1", "2", "5", "10"],
    posts: [
      { id: "rp1", title: "3월 세미나 - AI 마케팅 트렌드", content: "3월 세미나 주제는 'AI를 활용한 마케팅 자동화'입니다.\n\n발표자: 송미래 이사\n일시: 2026년 3월 28일(금) 오후 7시\n장소: 총동창회 회의실", date: "2026.03.14", author: "김정수", hasImage: false },
    ],
  },
  {
    id: "res2",
    type: "research",
    name: "부동산연구회",
    intro: "부동산 시장 분석, 투자 전략, 정책 동향 연구",
    president: "이상훈",
    presidentTitle: "부회장",
    description: "부동산연구회는 국내외 부동산 시장 분석, 투자 전략, 정책 동향을 연구하는 모임입니다. 분기별 시장 리포트를 발간하며, 전문가 초청 강연도 진행합니다.",
    memberIds: ["3", "4", "6"],
    posts: [],
  },
  {
    id: "res3",
    type: "research",
    name: "AI·디지털전환연구회",
    intro: "인공지능과 디지털 전환 트렌드 및 실무 적용 연구",
    president: "정하영",
    presidentTitle: "이사",
    description: "AI·디지털전환연구회는 인공지능, 빅데이터, 클라우드 등 디지털 기술의 최신 트렌드를 연구하고 실무 적용 사례를 공유하는 모임입니다. 기업의 디지털 전환 전략에 관심 있는 동문들이 함께합니다.",
    memberIds: ["2", "8", "12"],
    posts: [
      { id: "rp2", title: "ChatGPT 실무 활용 워크숍", content: "ChatGPT 등 생성형 AI의 실무 활용 워크숍을 개최합니다.\n\n일시: 2026년 4월 5일(토) 오후 2시\n장소: 성균관대학교 산학관 세미나실\n\n노트북 지참 필수", date: "2026.03.18", author: "정하영", hasImage: false },
    ],
  },
];
