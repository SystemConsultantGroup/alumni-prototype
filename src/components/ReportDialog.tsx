import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { addBlock, addReport, type ReportReason, type TargetKind } from "@/data/reports";
import { REPORT_POLICY_NOTICE, REPORT_REASONS } from "@/lib/reportConstants";
import { CURRENT_USER } from "@/lib/currentUser";

interface ReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  targetKind: TargetKind;
  targetId: string;
  targetSnapshot: { title?: string; content: string; authorName: string };
  reportedAuthorMemberId: string;
}

const ReportDialog = ({
  open,
  onOpenChange,
  targetKind,
  targetId,
  targetSnapshot,
  reportedAuthorMemberId,
}: ReportDialogProps) => {
  const [reason, setReason] = useState<ReportReason | "">("");
  const [detail, setDetail] = useState("");
  const [alsoBlock, setAlsoBlock] = useState(false);

  useEffect(() => {
    if (!open) {
      setReason("");
      setDetail("");
      setAlsoBlock(false);
    }
  }, [open]);

  const handleSubmit = () => {
    if (!reason) {
      toast.error("신고 사유를 선택해주세요");
      return;
    }
    addReport({
      targetKind,
      targetId,
      targetSnapshot,
      reportedAuthorMemberId,
      reporterMemberId: CURRENT_USER.id,
      reporterName: CURRENT_USER.name,
      reason,
      detail: detail.trim() || undefined,
    });
    if (alsoBlock) {
      addBlock({
        blockerMemberId: CURRENT_USER.id,
        blockedMemberId: reportedAuthorMemberId,
        blockedName: targetSnapshot.authorName,
      });
    }
    toast.success(
      alsoBlock ? "신고가 접수되고 사용자가 차단되었습니다" : "신고가 접수되었습니다",
    );
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>신고하기</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">신고 대상</p>
            <p className="text-sm font-medium text-foreground line-clamp-2">
              {targetSnapshot.title ?? targetSnapshot.content}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              작성자: {targetSnapshot.authorName}
            </p>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">신고 사유 *</Label>
            <RadioGroup value={reason} onValueChange={(v) => setReason(v as ReportReason)}>
              {REPORT_REASONS.map((r) => (
                <div key={r.value} className="flex items-start gap-2">
                  <RadioGroupItem value={r.value} id={`reason-${r.value}`} className="mt-0.5" />
                  <Label
                    htmlFor={`reason-${r.value}`}
                    className="flex-1 cursor-pointer font-normal"
                  >
                    <span className="text-sm text-foreground">{r.label}</span>
                    <span className="block text-xs text-muted-foreground">{r.hint}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <Label className="text-sm font-medium mb-1 block">상세 설명 (선택)</Label>
            <Textarea
              value={detail}
              onChange={(e) => setDetail(e.target.value.slice(0, 500))}
              placeholder="구체적인 상황을 알려주시면 검토에 도움이 됩니다"
              rows={3}
            />
            <p className="text-xs text-muted-foreground mt-1 text-right">{detail.length}/500</p>
          </div>

          {targetKind !== "memberProfile" || reportedAuthorMemberId ? (
            <div className="flex items-start gap-2 bg-muted/40 rounded-lg p-3">
              <Checkbox
                id="also-block"
                checked={alsoBlock}
                onCheckedChange={(c) => setAlsoBlock(c === true)}
                className="mt-0.5"
              />
              <Label htmlFor="also-block" className="cursor-pointer font-normal flex-1">
                <span className="text-sm text-foreground">
                  이 사용자({targetSnapshot.authorName})도 함께 차단
                </span>
                <span className="block text-xs text-muted-foreground">
                  차단하면 해당 사용자의 게시물·프로필이 내 화면에서 숨겨집니다
                </span>
              </Label>
            </div>
          ) : null}

          <p className="text-xs text-muted-foreground leading-relaxed">{REPORT_POLICY_NOTICE}</p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button onClick={handleSubmit} className="bg-destructive hover:bg-destructive/90">
            신고하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReportDialog;
