import { useState } from 'react';
import { getVisual } from '../../data/emoji';

interface Props {
  text: string;
  sizeClass?: string;
  className?: string;
}

export function VisualIcon({ text, sizeClass = 'w-12 h-12', className = '' }: Props) {
  const visual = getVisual(text);
  const [failed, setFailed] = useState(false);

  if (!visual) return null;

  if (failed) {
    return (
      <span className={className} aria-hidden="true">
        {visual.fallback}
      </span>
    );
  }

  return (
    <img
      src={visual.src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      onError={() => setFailed(true)}
      className={`${sizeClass} object-contain shrink-0 ${className}`}
    />
  );
}
