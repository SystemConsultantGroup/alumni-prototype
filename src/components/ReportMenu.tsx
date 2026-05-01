import { useState } from "react";
import { Flag, MoreHorizontal, UserX } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ReportDialog from "@/components/ReportDialog";
import { addBlock, type TargetKind } from "@/data/reports";
import { CURRENT_USER } from "@/lib/currentUser";

interface ReportMenuProps {
  targetKind: TargetKind;
  targetId: string;
  targetSnapshot: { title?: string; content: string; authorName: string };
  reportedAuthorMemberId: string;
  className?: string;
  triggerSize?: "sm" | "md";
}

const ReportMenu = ({
  targetKind,
  targetId,
  targetSnapshot,
  reportedAuthorMemberId,
  className,
  triggerSize = "md",
}: ReportMenuProps) => {
  const [reportOpen, setReportOpen] = useState(false);
  const [blockConfirmOpen, setBlockConfirmOpen] = useState(false);

  const isOwn = reportedAuthorMemberId === CURRENT_USER.id;
  if (isOwn) return null;

  const sizeClass = triggerSize === "sm" ? "w-7 h-7" : "w-8 h-8";
  const iconClass = triggerSize === "sm" ? "w-4 h-4" : "w-4 h-4";

  const handleBlock = () => {
    addBlock({
      blockerMemberId: CURRENT_USER.id,
      blockedMemberId: reportedAuthorMemberId,
      blockedName: targetSnapshot.authorName,
    });
    toast.success(`${targetSnapshot.authorName}님을 차단했습니다`);
    setBlockConfirmOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            onClick={(e) => e.stopPropagation()}
            aria-label="더보기"
            className={`${sizeClass} rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors ${className ?? ""}`}
          >
            <MoreHorizontal className={iconClass} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44" onClick={(e) => e.stopPropagation()}>
          <DropdownMenuItem onClick={() => setReportOpen(true)}>
            <Flag className="w-4 h-4 mr-2" />
            신고하기
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => setBlockConfirmOpen(true)}
          >
            <UserX className="w-4 h-4 mr-2" />
            이 사용자 차단
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ReportDialog
        open={reportOpen}
        onOpenChange={setReportOpen}
        targetKind={targetKind}
        targetId={targetId}
        targetSnapshot={targetSnapshot}
        reportedAuthorMemberId={reportedAuthorMemberId}
      />

      <AlertDialog open={blockConfirmOpen} onOpenChange={setBlockConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{targetSnapshot.authorName}님을 차단할까요?</AlertDialogTitle>
            <AlertDialogDescription>
              차단하면 이 사용자의 게시물과 프로필이 내 화면에서 더 이상 보이지 않습니다.
              차단 해제는 마이페이지의 차단 사용자 관리에서 가능합니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBlock}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              차단
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ReportMenu;
