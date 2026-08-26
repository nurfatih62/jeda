import { Flag, Share2 } from "lucide-react";
import { IconButton } from "../../atom/button/icon-button";

export interface ArticleActionsProps {
  onShare?: () => void;
  onFlag?: () => void;
}

export function ArticleActions({
  onShare,
  onFlag,
}: ArticleActionsProps) {
  return (
    <div className="flex items-center gap-3">
      <IconButton
        variant="ghost"
        colorState="default"
        icon={<Share2 size={24} strokeWidth={2} />}
        aria-label="Bagikan artikel"
        onClick={onShare}
      />

      <IconButton
        variant="ghost"
        colorState="default"
        icon={<Flag size={24} strokeWidth={2} />}
        aria-label="Laporkan artikel"
        onClick={onFlag}
      />
    </div>
  );
}