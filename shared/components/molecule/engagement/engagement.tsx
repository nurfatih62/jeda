import { ThumbsUp, MessageSquare } from 'lucide-react';

export interface EngagementProps {
  likes: number;
  comments: number;
}

const iconClass = 'h-6 w-6 text-text-muted';
const countClass = "font-sans text-base font-medium leading-6 text-text-muted";

export function Engagement({ likes, comments }: EngagementProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex items-center gap-1.5">
        <ThumbsUp className={iconClass} strokeWidth={2} />
        <span className={countClass}>{likes}</span>
      </span>
      <span className="flex items-center gap-1.5">
        <MessageSquare className={iconClass} strokeWidth={2} />
        <span className={countClass}>{comments}</span>
      </span>
    </div>
  );
}
