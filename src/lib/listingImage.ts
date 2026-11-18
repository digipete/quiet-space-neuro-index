declare const __BUILD_ID__: string;
const BUILD = typeof __BUILD_ID__ !== 'undefined' ? __BUILD_ID__ : 'dev';

/** Local listing photos get a per-deploy version so no stale CDN or browser copy is reused. */
export function versionedImageUrl(url: string, build = BUILD, retry?: number): string {
  if (!url || !url.startsWith('/')) return url;
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}v=${build}${retry ? `&r=${retry}` : ''}`;
}

/** Returns the next src to try after an error, or null to give up. Only one retry. */
export function nextImageAttempt(url: string, attempt: number, now = Date.now(), build = BUILD): string | null {
  if (attempt >= 1 || !url.startsWith('/')) return null;
  return versionedImageUrl(url, build, now);
}
