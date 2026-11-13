import { getCurrentLocale, getScopedI18n } from '@/locales/serveur';
import { isBlogVisible, posts } from '@/lib/data/blog.data';
import { localePath } from '@/lib/locale-path';
import { TransitionLink } from '@/components/site/TransitionLink';
import { HomeBlogMotion } from './HomeServicesMotion';
import './home-services.css';

const LATEST = 3;

export const HomeBlog = async () => {
  if (!isBlogVisible()) return null;

  const [t, locale] = await Promise.all([getScopedI18n('homeServices'), getCurrentLocale()]);
  const dateFormat = new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'short' });
  const latest = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, LATEST);

  return (
    <section id="blog" className="theme-dark hs-section" aria-labelledby="hs-blog-title">
      <HomeBlogMotion>
        <header className="hs-head">
          <p className="mono-label hs-index">{t('blogIndex')}</p>
          <div className="hs-blog-head">
            <h2 id="hs-blog-title" className="display hs-big">
              {t('blogTitle')}
            </h2>
            <p className="mono-label hs-index">{t('blogHint')}</p>
          </div>
        </header>
        <ol className="hs-posts">
          {latest.map((post, index) => (
            <li key={post.slug}>
              <TransitionLink href={localePath(locale, post.href)} data-cursor="read">
                <span className="mono-label hs-post-n">{String(index + 1).padStart(2, '0')}</span>
                <h3>{post.title[locale]}</h3>
                <p>{post.excerpt[locale]}</p>
                <time className="mono-label hs-post-tag" dateTime={post.date}>
                  {dateFormat.format(new Date(post.date))}
                </time>
                <span className="mono-label hs-post-read">
                  {t('blogRead')} <span aria-hidden="true">↗</span>
                </span>
              </TransitionLink>
            </li>
          ))}
        </ol>
      </HomeBlogMotion>
    </section>
  );
};
