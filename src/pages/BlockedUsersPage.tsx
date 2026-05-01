import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, UserX } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { removeBlock, selectBlocks, useReportStore } from "@/data/reports";
import { CURRENT_USER } from "@/lib/currentUser";

const BlockedUsersPage = () => {
  const navigate = useNavigate();
  const blocks = useReportStore(selectBlocks).filter(
    (b) => b.blockerMemberId === CURRENT_USER.id,
  );

  const handleUnblock = (blockedMemberId: string, name: string) => {
    removeBlock(CURRENT_USER.id, blockedMemberId);
    toast.success(`${name}님 차단을 해제했습니다`);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" />
        뒤로
      </button>

      <div>
        <h1 className="text-xl font-bold text-foreground">차단 사용자 관리</h1>
        <p className="text-sm text-muted-foreground mt-1">
          차단한 동문의 게시물과 프로필은 내 화면에서 표시되지 않습니다.
        </p>
      </div>

      {blocks.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center text-muted-foreground">
            <UserX className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">차단한 사용자가 없습니다</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {blocks.map((b) => (
            <Card key={b.blockedMemberId}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">{b.blockedName}</p>
                  <p className="text-xs text-muted-foreground">
                    차단일 {new Date(b.createdAt).toLocaleDateString("ko-KR")}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUnblock(b.blockedMemberId, b.blockedName)}
                >
                  차단 해제
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlockedUsersPage;
