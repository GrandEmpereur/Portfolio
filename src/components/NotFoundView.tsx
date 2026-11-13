import { TransitionLink } from '@/components/site/TransitionLink';
import { localePath, type Locale } from '@/lib/locale-path';
import './not-found.css';

interface NotFoundViewProps {
  locale: Locale;
  copy: {
    title: string;
    heading: string;
    description: string;
    homeButton: string;
    projectsButton: string;
    contactButton: string;
  };
}

export const NotFoundView = ({ locale, copy }: NotFoundViewProps) => (
  <main id="main-content" className="nf pad-x text-fg">
    <div className="nf-inner">
      <p className="display nf-code" aria-hidden="true">
        {copy.heading}
      </p>
      <h1 className="display nf-title">{copy.title}</h1>
      <p className="nf-desc text-mut">{copy.description}</p>
      <div className="nf-actions">
        <TransitionLink className="btn" href={localePath(locale, '/')}>
          {copy.homeButton}
        </TransitionLink>
        <TransitionLink className="btn btn-ghost" href={localePath(locale, '/projects')}>
          {copy.projectsButton}
        </TransitionLink>
        <TransitionLink className="btn btn-ghost" href={localePath(locale, '/contact')}>
          {copy.contactButton}
        </TransitionLink>
      </div>
    </div>
  </main>
);
