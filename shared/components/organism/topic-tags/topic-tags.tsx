import { TopicTag } from '../../molecule/topic-tag/topic-tag';

export interface TopicTagsProps {
  topics: string[];
  activeTopic: string;
  /** Path dasar buat bikin href, default "/explore" */
  basePath?: string;
}

export function TopicTags({ topics, activeTopic, basePath = '/explore' }: TopicTagsProps) {
  return (
    <div className="flex gap-2.5 overflow-x-auto pb-2">
      <TopicTag label="Semua" href={basePath} active={activeTopic === 'Semua'} />
      {topics.map((topic) => (
        <TopicTag
          key={topic}
          label={topic}
          href={`${basePath}?topic=${encodeURIComponent(topic)}`}
          active={activeTopic === topic}
        />
      ))}
    </div>
  );
}
