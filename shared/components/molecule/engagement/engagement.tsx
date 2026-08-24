import { ThumbsUp, MessageSquare } from "lucide-react";

export interface EngagementProps {
  likes: number;
  comments: number;
}

export function Engagement({
  likes,
  comments,
}: EngagementProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1.75">
        <ThumbsUp
          size={24}
          strokeWidth={2}
        />
        <span>{likes}</span>
      </div>

      <div className="flex items-center gap-1.75">
        <MessageSquare
          size={24}
          strokeWidth={2}
        />
        <span>{comments}</span>
      </div>
    </div>
  );
}