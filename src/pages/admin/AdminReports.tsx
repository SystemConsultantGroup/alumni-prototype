import { useMemo, useState } from "react";
import { Flag } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  resolveReport,
  selectReports,
  useReportStore,
  type ReportRecord,
  type ReportStatus,
} from "@/data/reports";
import { REPORT_REASON_LABEL, TARGET_KIND_LABEL } from "@/lib/reportConstants";

const STATUS_LABEL: Record<ReportStatus, string> = {
  pending: "대기중",
  resolved: "처리완료",
  rejected: "반려",
};

const STATUS_BADGE: Record<ReportStatus, string> = {
  pending: "bg-orange-100 text-orange-700 border-orange-300",
  resolved: "bg-green-100 text-green-700 border-green-300",
  rejected: "bg-muted text-muted-foreground border-border",
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

const AdminReports = () => {
  const reports = useReportStore(selectReports);
  const [tab, setTab] = useState<ReportStatus>("pending");
  const [selected, setSelected] = useState<ReportRecord | null>(null);
  const [adminMemo, setAdminMemo] = useState("");

  const filtered = useMemo(
    () => reports.filter((r) => r.status === tab),
    [reports, tab],
  );

  const counts = useMemo(
    () => ({
      pending: reports.filter((r) => r.status === "pending").length,
      resolved: reports.filter((r) => r.status === "resolved").length,
      rejected: reports.filter((r) => r.status === "rejected").length,
    }),
    [reports],
  );

  const openDetail = (r: ReportRecord) => {
    setSelected(r);
    setAdminMemo(r.adminMemo ?? "");
  };

  const closeDetail = () => {
    setSelected(null);
    setAdminMemo("");
  };

  const handleResolve = (deleteTarget: boolean) => {
    if (!selected) return;
    resolveReport(selected.id, {
      status: "resolved",
      adminMemo: adminMemo.trim() || undefined,
      deleteTarget,
    });
    toast.success(deleteTarget ? "게시물 삭제 후 처리완료" : "처리완료 (게시 유지)");
    closeDetail();
  };

  const handleReject = () => {
    if (!selected) return;
    if (!adminMemo.trim()) {
      toast.error("반려 사유(관리자 메모)를 입력해주세요");
      return;
    }
    resolveReport(selected.id, {
      status: "rejected",
      adminMemo: adminMemo.trim(),
    });
    toast.success("신고가 반려되었습니다");
    closeDetail();
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center gap-3">
        <Flag className="w-6 h-6 text-destructive" />
        <h1 className="text-2xl font-bold text-foreground">신고 관리</h1>
        {counts.pending > 0 && (
          <Badge className="bg-destructive/10 text-destructive border-destructive/30">
            미처리 {counts.pending}건
          </Badge>
        )}
      </div>
      <p className="text-sm text-muted-foreground -mt-3">
        App Store 정책에 따라 신고는 24시간 이내 검토되어야 합니다.
      </p>

      <Tabs value={tab} onValueChange={(v) => setTab(v as ReportStatus)}>
        <TabsList>
          <TabsTrigger value="pending">대기중 ({counts.pending})</TabsTrigger>
          <TabsTrigger value="resolved">처리완료 ({counts.resolved})</TabsTrigger>
          <TabsTrigger value="rejected">반려 ({counts.rejected})</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">{STATUS_LABEL[tab]} 신고</CardTitle>
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-12 text-sm">
              해당 상태의 신고가 없습니다
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>신고일시</TableHead>
                  <TableHead>대상</TableHead>
                  <TableHead>내용</TableHead>
                  <TableHead>작성자</TableHead>
                  <TableHead>신고자</TableHead>
                  <TableHead>사유</TableHead>
                  <TableHead className="w-24">액션</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="text-sm whitespace-nowrap">{formatDate(r.createdAt)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {TARGET_KIND_LABEL[r.targetKind]}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="text-sm font-medium truncate">
                        {r.targetSnapshot.title ?? r.targetSnapshot.content}
                      </p>
                    </TableCell>
                    <TableCell className="text-sm">{r.targetSnapshot.authorName}</TableCell>
                    <TableCell className="text-sm">{r.reporterName}</TableCell>
                    <TableCell className="text-sm">{REPORT_REASON_LABEL[r.reason]}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" onClick={() => openDetail(r)}>
                        상세
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selected} onOpenChange={(o) => (!o ? closeDetail() : null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>신고 상세</DialogTitle>
            {selected && (
              <DialogDescription>
                <Badge variant="outline" className={`${STATUS_BADGE[selected.status]} border`}>
                  {STATUS_LABEL[selected.status]}
                </Badge>
                <span className="ml-2 text-xs">{formatDate(selected.createdAt)}</span>
              </DialogDescription>
            )}
          </DialogHeader>

          {selected && (
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">대상</p>
                <p className="text-sm">
                  <Badge variant="outline" className="mr-2 text-xs">
                    {TARGET_KIND_LABEL[selected.targetKind]}
                  </Badge>
                  {selected.targetSnapshot.title && (
                    <span className="font-medium">{selected.targetSnapshot.title}</span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  작성자: {selected.targetSnapshot.authorName}
                </p>
                <p className="text-sm bg-muted/40 rounded-md p-3 mt-2 whitespace-pre-line max-h-32 overflow-y-auto">
                  {selected.targetSnapshot.content}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">신고자</p>
                  <p>{selected.reporterName}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">사유</p>
                  <p>{REPORT_REASON_LABEL[selected.reason]}</p>
                </div>
              </div>

              {selected.detail && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">신고자 메모</p>
                  <p className="text-sm bg-muted/40 rounded-md p-3 whitespace-pre-line">
                    {selected.detail}
                  </p>
                </div>
              )}

              <div>
                <Label className="text-xs">관리자 메모 {selected.status === "pending" && "(반려 시 필수)"}</Label>
                <Textarea
                  value={adminMemo}
                  onChange={(e) => setAdminMemo(e.target.value)}
                  rows={3}
                  className="mt-1"
                  disabled={selected.status !== "pending"}
                  placeholder="처리 사유 또는 안내 내용을 기록해주세요"
                />
              </div>
            </div>
          )}

          {selected?.status === "pending" ? (
            <DialogFooter className="gap-2 flex-wrap">
              <Button variant="outline" onClick={closeDetail}>
                보류
              </Button>
              <Button variant="outline" onClick={handleReject}>
                반려
              </Button>
              <Button variant="outline" onClick={() => handleResolve(false)}>
                처리완료 (게시 유지)
              </Button>
              <Button onClick={() => handleResolve(true)} className="bg-destructive hover:bg-destructive/90">
                삭제 처리
              </Button>
            </DialogFooter>
          ) : (
            <DialogFooter>
              <Button variant="outline" onClick={closeDetail}>
                닫기
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminReports;
