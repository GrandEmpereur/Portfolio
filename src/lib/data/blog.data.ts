import type { Locale } from '@/lib/locale-path';

export interface BlogPost {
  slug: string;
  href: string;
  date: string;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
}

export const posts: BlogPost[] = [];

/** The blog teaser only shows once there are three articles. */
export const isBlogVisible = (): boolean => posts.length >= 3;
