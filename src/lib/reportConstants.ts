import type { ReportReason, TargetKind } from "@/data/reports";

export const REPORT_REASONS: { value: ReportReason; label: string; hint: string }[] = [
  { value: "spam", label: "스팸/광고", hint: "반복 광고, 다단계, 사칭 광고" },
  { value: "abuse", label: "욕설/혐오 표현", hint: "비방, 차별, 인신공격" },
  { value: "obscene", label: "음란물/선정성", hint: "성적 콘텐츠, 노출" },
  { value: "fraud", label: "허위정보/사기", hint: "거짓 정보, 금전 사기" },
  { value: "privacy", label: "개인정보 노출", hint: "동의 없는 신상·연락처 노출" },
  { value: "copyright", label: "저작권 침해", hint: "타인의 콘텐츠 무단 사용" },
  { value: "other", label: "기타", hint: "위에 해당하지 않는 부적절 사유" },
];

export const REPORT_REASON_LABEL: Record<ReportReason, string> = REPORT_REASONS.reduce(
  (acc, r) => ({ ...acc, [r.value]: r.label }),
  {} as Record<ReportReason, string>,
);

export const TARGET_KIND_LABEL: Record<TargetKind, string> = {
  communityPost: "커뮤니티 게시글",
  businessPost: "비즈니스 협력글",
  memberProfile: "멤버 프로필",
};

export const REPORT_POLICY_NOTICE =
  "허위 신고는 제재 대상이 될 수 있습니다. 부적절한 콘텐츠는 24시간 이내 검토됩니다.";

export const COMMUNITY_GUIDELINE_LINE =
  "부적절 컨텐츠 무관용 정책: 욕설·혐오·음란·허위정보 게시 시 사전 통보 없이 게시물 삭제 및 계정 정지될 수 있습니다.";
