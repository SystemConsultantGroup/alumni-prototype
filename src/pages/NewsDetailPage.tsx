import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { NEWS_ITEMS } from "@/data/news";

const NewsDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const item = NEWS_ITEMS.find((n) => n.id === id);
  const sameType = NEWS_ITEMS.filter((n) => n.type === item?.type);
  const currentIndex = sameType.findIndex((n) => n.id === id);
  const prevItem = currentIndex > 0 ? sameType[currentIndex - 1] : null;
  const nextItem = currentIndex < sameType.length - 1 ? sameType[currentIndex + 1] : null;

  if (!item) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground">게시글을 찾을 수 없습니다.</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/main/news")}>
          목록으로 돌아가기
        </Button>
      </div>
    );
  }

  const typeLabel = item.type === "notice" ? "공지사항" : "뉴스";

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <button
        onClick={() => navigate("/main/news")}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" />
        {typeLabel}
      </button>

      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-foreground">{item.title}</h1>
        <p className="text-sm text-muted-foreground mt-2">
          총동창회 사무처 · {item.date}
        </p>
      </div>

      <Separator />

      {/* Body */}
      <div className="text-foreground text-sm md:text-base leading-relaxed whitespace-pre-line">
        {item.body}
      </div>

      {/* Attached image placeholder */}
      {(item.hasImage || item.hasThumbnail) && (
        <div className="bg-muted rounded-xl h-48 md:h-64 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-40" />
            <p className="text-sm">첨부 이미지</p>
          </div>
        </div>
      )}

      <Separator />

      {/* Prev / Next navigation */}
      <div className="space-y-2">
        {prevItem && (
          <button
            onClick={() => navigate(`/main/news/${prevItem.id}`)}
            className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors text-left"
          >
            <ChevronLeft className="w-4 h-4 text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">이전글</p>
              <p className="text-sm text-foreground truncate">{prevItem.title}</p>
            </div>
          </button>
        )}
        {nextItem && (
          <button
            onClick={() => navigate(`/main/news/${nextItem.id}`)}
            className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors text-left"
          >
            <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">다음글</p>
              <p className="text-sm text-foreground truncate">{nextItem.title}</p>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default NewsDetailPage;
