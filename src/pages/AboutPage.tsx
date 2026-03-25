import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ExternalLink } from "lucide-react";

const feeTable = [
  { position: "회장", fee: "5,000만원 이상" },
  { position: "부회장", fee: "100만원" },
  { position: "감사", fee: "100만원" },
  { position: "자문위원", fee: "30만원" },
  { position: "상임이사", fee: "30만원" },
  { position: "이사", fee: "10만원" },
  { position: "고문", fee: "자율" },
];

const sections = [
  {
    id: "history",
    title: "약사",
    content: (
      <p className="text-sm text-muted-foreground leading-relaxed">
        성균관대학교 총동창회는 성균관대학교 졸업생과 재학생의 친목 도모 및 모교 발전을 위해 설립된 단체입니다. 
        유구한 600년 성균관의 전통을 계승하며, 동문 간의 네트워크를 강화하고 사회 발전에 기여하고 있습니다.
        총동창회는 국내외 다양한 지부와 함께 동문들의 소통과 협력을 이끌어가고 있습니다.
      </p>
    ),
  },
  {
    id: "timeline-overview",
    title: "연혁(개괄)",
    content: (
      <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
        <p>• 1398년 — 성균관 설립</p>
        <p>• 1946년 — 성균관대학 설립</p>
        <p>• 1953년 — 종합대학교 승격</p>
        <p>• 1965년 — 총동창회 설립</p>
        <p>• 1996년 — 삼성그룹 학교법인 인수</p>
        <p>• 2006년 — 글로벌 캠퍼스 시대 개막</p>
      </div>
    ),
  },
  {
    id: "timeline-detail",
    title: "주요 연혁(연도별)",
    content: (
      <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
        <p>• 1965년 — 총동창회 창립총회 개최</p>
        <p>• 1978년 — 동창회관 건립</p>
        <p>• 1990년 — 총동창회보 창간</p>
        <p>• 2000년 — 총동창회 웹사이트 개설</p>
        <p>• 2010년 — 해외 지부 확대 (미주, 유럽, 아시아)</p>
        <p>• 2020년 — 디지털 전환 및 온라인 동문 네트워크 구축</p>
        <p>• 2024년 — 임원수첩 앱 출시</p>
      </div>
    ),
  },
  {
    id: "presidents",
    title: "역대 회장 / 역대 총장",
    content: (
      <div className="text-sm text-muted-foreground space-y-4 leading-relaxed">
        <div>
          <h4 className="font-semibold text-foreground mb-1">역대 총동창회 회장</h4>
          <p>• 초대 — 김OO (1965~1970)</p>
          <p>• 2대 — 이OO (1970~1975)</p>
          <p>• 3대 — 박OO (1975~1980)</p>
          <p className="text-xs mt-1">※ 전체 목록은 홈페이지를 참고해주세요</p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-1">역대 총장</h4>
          <p>• 초대 — 김OO (1946~1950)</p>
          <p>• 2대 — 이OO (1950~1955)</p>
          <p className="text-xs mt-1">※ 전체 목록은 홈페이지를 참고해주세요</p>
        </div>
      </div>
    ),
  },
  {
    id: "rules",
    title: "총동창회 회칙",
    content: (
      <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
        <p><strong className="text-foreground">제1조 (명칭)</strong> 본 회는 성균관대학교 총동창회라 칭한다.</p>
        <p><strong className="text-foreground">제2조 (목적)</strong> 본 회는 회원 상호간의 친목을 도모하고 모교의 발전에 기여함을 목적으로 한다.</p>
        <p><strong className="text-foreground">제3조 (회원)</strong> 본 회의 회원은 성균관대학교 졸업자 및 재학생으로 한다.</p>
        <p className="text-xs mt-2">※ 전문은 홈페이지를 참고해주세요</p>
      </div>
    ),
  },
  {
    id: "fees",
    title: "회비/임원분담금 납부 안내 및 혜택",
    content: (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          총동창회 임원 기여금은 동창회 운영 및 모교 발전 기금으로 사용됩니다.
        </p>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted border-b border-border">
                <th className="py-2.5 px-4 text-left font-semibold text-foreground">직급</th>
                <th className="py-2.5 px-4 text-right font-semibold text-foreground">기여금</th>
              </tr>
            </thead>
            <tbody>
              {feeTable.map((row) => (
                <tr key={row.position} className="border-b border-border last:border-0">
                  <td className="py-2.5 px-4 text-foreground">{row.position}</td>
                  <td className="py-2.5 px-4 text-right text-foreground">{row.fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong className="text-foreground">혜택:</strong> 경조사 지원, 무료주차, 건강검진 할인, 총동창회보 수령 등
        </p>
      </div>
    ),
  },
  {
    id: "anthem",
    title: "교가 듣기",
    content: (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">성균관대학교 교가</p>
        <div className="bg-muted rounded-lg p-4 flex items-center justify-center">
          <p className="text-sm text-muted-foreground">🎵 오디오 플레이어 (준비 중)</p>
        </div>
      </div>
    ),
  },
];

const AboutPage = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 animate-fade-in">
      <h2 className="text-xl font-bold text-foreground mb-6">총동창회 소개</h2>

      <Accordion type="multiple" className="space-y-2">
        {sections.map((section) => (
          <AccordionItem
            key={section.id}
            value={section.id}
            className="bg-card border border-border rounded-xl px-5 overflow-hidden"
          >
            <AccordionTrigger className="text-sm font-semibold hover:no-underline py-4">
              {section.title}
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              {section.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>자세한 내용은 총동창회 홈페이지를 참고해주세요</p>
        <a
          href="https://alumni.skku.edu"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-primary font-medium mt-1 hover:underline"
        >
          alumni.skku.edu <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};

export default AboutPage;
