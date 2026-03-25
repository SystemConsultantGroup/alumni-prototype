import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Camera, Pencil, Check, X } from "lucide-react";
import { toast } from "sonner";

const industries = [
  "농업/광업/수산업/목축업", "제조업", "유통/물류/도소매업", "건설/건축/부동산업",
  "숙박/음식점/서비스업", "금융/보험업", "전기/정보통신", "교육/연구개발업",
  "예술/스포츠/보건/의료업", "공무원/회사원/협회/단체",
];

const initialData = {
  name: "홍길동",
  dept: "경영학과",
  year: "86",
  position: "상임이사",
  generation: "제40대",
  phone: "010-1234-5678",
  email: "hong@skkutech.co.kr",
  address: "서울시 강남구 테헤란로 123",
  company: "(주)성균테크",
  jobTitle: "대표이사",
  industry: "제조업",
  hobby: "골프, 등산",
  website: "",
  prText: "",
};

type EditingSection = "contact" | "job" | "extra" | null;

const MyPage = () => {
  const [data, setData] = useState(initialData);
  const [editing, setEditing] = useState<EditingSection>(null);
  const [draft, setDraft] = useState(initialData);
  const [pwModal, setPwModal] = useState(false);
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });

  const startEdit = (section: EditingSection) => {
    setDraft({ ...data });
    setEditing(section);
  };

  const saveEdit = () => {
    setData({ ...draft });
    setEditing(null);
    toast.success("정보가 저장되었습니다");
  };

  const cancelEdit = () => {
    setEditing(null);
  };

  const handlePwChange = () => {
    if (!pw.current || !pw.next || !pw.confirm) {
      toast.error("모든 항목을 입력해주세요");
      return;
    }
    if (pw.next !== pw.confirm) {
      toast.error("새 비밀번호가 일치하지 않습니다");
      return;
    }
    toast.success("비밀번호가 변경되었습니다");
    setPwModal(false);
    setPw({ current: "", next: "", confirm: "" });
  };

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between py-2 text-sm">
      <span className="text-muted-foreground shrink-0">{label}</span>
      <span className="text-foreground font-medium text-right">{value || "—"}</span>
    </div>
  );

  const EditHeader = ({ title, section }: { title: string; section: EditingSection }) => (
    <div className="flex items-center justify-between mb-3">
      <h3 className="font-semibold text-foreground">{title}</h3>
      {editing === section ? (
        <div className="flex gap-1">
          <button onClick={saveEdit} className="p-1.5 rounded-md bg-primary text-primary-foreground hover:opacity-90">
            <Check className="w-4 h-4" />
          </button>
          <button onClick={cancelEdit} className="p-1.5 rounded-md bg-muted text-muted-foreground hover:bg-border">
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button onClick={() => startEdit(section)} className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted">
          <Pencil className="w-4 h-4" />
        </button>
      )}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 animate-fade-in">
      <h2 className="text-xl font-bold text-foreground mb-6">내정보</h2>

      {/* Profile */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center text-2xl font-bold text-primary">
            {data.name[0]}
          </div>
          <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md">
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>
        <div>
          <p className="text-lg font-bold text-foreground">{data.name}</p>
          <p className="text-sm text-primary font-medium">{data.position}</p>
          <p className="text-sm text-muted-foreground">{data.dept} / {data.year}학번</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Card 1: Basic Info (read-only) */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-3">기본정보</h3>
          <div className="divide-y divide-border">
            <InfoRow label="성명" value={data.name} />
            <InfoRow label="학과/학부" value={data.dept} />
            <InfoRow label="입학년도" value={data.year} />
            <InfoRow label="직급" value={data.position} />
            <InfoRow label="기수" value={data.generation} />
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            기본정보 수정은 총동창회 사무처(02-760-1290)로 문의해주세요
          </p>
        </div>

        {/* Card 2: Contact (editable) */}
        <div className="bg-card border border-border rounded-xl p-5">
          <EditHeader title="연락처 정보" section="contact" />
          {editing === "contact" ? (
            <div className="space-y-3">
              <div>
                <Label className="text-xs">연락처</Label>
                <Input value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label className="text-xs">이메일</Label>
                <Input value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label className="text-xs">주소</Label>
                <Input value={draft.address} onChange={(e) => setDraft({ ...draft, address: e.target.value })} className="mt-1" />
              </div>
            </div>
          ) : (
            <div className="divide-y divide-border">
              <InfoRow label="연락처" value={data.phone} />
              <InfoRow label="이메일" value={data.email} />
              <InfoRow label="주소" value={data.address} />
            </div>
          )}
        </div>

        {/* Card 3: Job (editable) */}
        <div className="bg-card border border-border rounded-xl p-5">
          <EditHeader title="직장/직업 정보" section="job" />
          {editing === "job" ? (
            <div className="space-y-3">
              <div>
                <Label className="text-xs">회사/기관명</Label>
                <Input value={draft.company} onChange={(e) => setDraft({ ...draft, company: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label className="text-xs">직위/직책</Label>
                <Input value={draft.jobTitle} onChange={(e) => setDraft({ ...draft, jobTitle: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label className="text-xs">업종</Label>
                <Select value={draft.industry} onValueChange={(v) => setDraft({ ...draft, industry: v })}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {industries.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-border">
              <InfoRow label="회사/기관명" value={data.company} />
              <InfoRow label="직위/직책" value={data.jobTitle} />
              <InfoRow label="업종" value={data.industry} />
            </div>
          )}
        </div>

        {/* Card 4: Extra (editable) */}
        <div className="bg-card border border-border rounded-xl p-5">
          <EditHeader title="추가 정보" section="extra" />
          {editing === "extra" ? (
            <div className="space-y-3">
              <div>
                <Label className="text-xs">취미</Label>
                <Input value={draft.hobby} onChange={(e) => setDraft({ ...draft, hobby: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label className="text-xs">홈페이지/블로그/SNS</Label>
                <Input value={draft.website} onChange={(e) => setDraft({ ...draft, website: e.target.value })} className="mt-1" placeholder="https://" />
              </div>
              <div>
                <Label className="text-xs">자기(회사) PR 홍보글</Label>
                <Textarea
                  value={draft.prText}
                  onChange={(e) => setDraft({ ...draft, prText: e.target.value.slice(0, 500) })}
                  className="mt-1"
                  placeholder="최대 500자"
                  rows={4}
                />
                <p className="text-xs text-muted-foreground mt-1 text-right">{draft.prText.length}/500</p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-border">
              <InfoRow label="취미" value={data.hobby} />
              <InfoRow label="홈페이지/SNS" value={data.website} />
              <InfoRow label="PR 홍보글" value={data.prText} />
            </div>
          )}
        </div>
      </div>

      <Button variant="outline" className="w-full mt-6" onClick={() => setPwModal(true)}>
        비밀번호 변경
      </Button>

      {/* Password change modal */}
      <Dialog open={pwModal} onOpenChange={setPwModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>비밀번호 변경</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label className="text-xs">현재 비밀번호</Label>
              <Input type="password" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} className="mt-1" />
            </div>
            <div>
              <Label className="text-xs">새 비밀번호</Label>
              <Input type="password" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} className="mt-1" />
            </div>
            <div>
              <Label className="text-xs">새 비밀번호 확인</Label>
              <Input type="password" value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} className="mt-1" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handlePwChange} className="w-full">변경하기</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyPage;
