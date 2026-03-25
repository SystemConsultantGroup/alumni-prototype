import { toast } from "sonner";

const PlaceholderTab = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">🚧</span>
      </div>
      <h2 className="text-lg font-bold text-foreground mb-1">준비 중입니다</h2>
      <p className="text-sm text-muted-foreground">해당 기능은 곧 제공될 예정입니다</p>
    </div>
  );
};

export default PlaceholderTab;
