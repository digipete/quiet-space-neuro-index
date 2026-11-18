import { useState } from 'react';
import { nextImageAttempt, versionedImageUrl } from '@/lib/listingImage';
import { track } from '@/lib/analytics';

type Props = { src: string; alt: string; className: string; fallbackClassName: string; fallbackText: string; loading?: 'lazy' | 'eager' };

/** Listing photo that retries once with a fresh address, then shows a placeholder and records the failure. */
export function ListingPhoto({ src, alt, className, fallbackClassName, fallbackText, loading }: Props) {
  const [attempt, setAttempt] = useState(0);
  const [current, setCurrent] = useState(() => versionedImageUrl(src));
  const [failed, setFailed] = useState(false);
  if (failed || !src) return <div className={fallbackClassName}><span className="text-muted-foreground">{fallbackText}</span></div>;
  return (
    <img src={current} alt={alt} loading={loading} className={className}
      onError={() => {
        const next = nextImageAttempt(src, attempt);
        if (next) { setAttempt(attempt + 1); setCurrent(next); return; }
        setFailed(true);
        track('image_failed', src.split('?')[0]);
      }} />
  );
}
