import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageIcon, Camera } from "lucide-react";
import { NEWS_ITEMS, type NewsItem } from "@/data/news";

const NewsPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"notice" | "news">("notice");

  const items = NEWS_ITEMS.filter((item) => item.type === tab);

  const NewsCard = ({ item }: { item: NewsItem }) => (
    <button
      onClick={() => navigate(`/main/news/${item.id}`)}
      className="w-full text-left bg-card border border-border rounded-xl overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"
    >
      <div className="flex">
        {/* Thumbnail for news items */}
        {item.type === "news" && item.hasThumbnail && (
          <div className="w-24 h-24 md:w-32 md:h-28 bg-muted flex items-center justify-center shrink-0">
            <Camera className="w-8 h-8 text-muted-foreground/40" />
          </div>
        )}
        <div className="flex-1 p-4 min-w-0">
          <div className="flex items-start gap-2">
            <h3 className="font-semibold text-foreground text-sm md:text-base line-clamp-1 flex-1">
              {item.title}
            </h3>
            {item.hasImage && (
              <ImageIcon className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {item.preview}
          </p>
          <p className="text-xs text-muted-foreground/70 mt-2">{item.date}</p>
        </div>
      </div>
    </button>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">
      <Tabs value={tab} onValueChange={(v) => setTab(v as "notice" | "news")}>
        <TabsList className="w-full">
          <TabsTrigger value="notice" className="flex-1">공지사항</TabsTrigger>
          <TabsTrigger value="news" className="flex-1">뉴스</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-3">
        {items.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
