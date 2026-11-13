'use client';

import type { ReactNode } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { NEEDS } from '@/lib/contact-request';
import { useScopedI18n } from '@/locales/client';
import type { GuidedValues } from './steps';

interface ContactDossierProps {
  /** The page's only <h1>, rendered on the server. */
  heading: ReactNode;
}

/** Left column: the title, the pitch and a live summary of the answers given so far. */
export const ContactDossier = ({ heading }: ContactDossierProps) => {
  const t = useScopedI18n('contactPage');
  const { control } = useFormContext<GuidedValues>();
  const needs = useWatch({ control, name: 'needs' });
  const stage = useWatch({ control, name: 'stage' });
  const timing = useWatch({ control, name: 'timing' });
  const budget = useWatch({ control, name: 'budget' });
  const budgetAmount = useWatch({ control, name: 'budgetAmount' });
  const firstName = useWatch({ control, name: 'firstName' });
  const company = useWatch({ control, name: 'company' });

  const needText = NEEDS.filter((id) => needs.includes(id))
    .map((id) => t(`steps.need.options.${id}.short`))
    .join(' · ');
  const stageText = stage ? t(`steps.context.stage.${stage}.short`) : '';
  const timingText = timing ? t(`steps.context.timing.${timing}.short`) : '';
  const budgetText = budget
    ? [t(`steps.budget.options.${budget}.short`), budgetAmount.trim()].filter(Boolean).join(' · ')
    : '';
  const whoText = [firstName.trim(), company.trim()].filter(Boolean).join(' · ');

  const rows: Array<{ key: string; label: string; value: string }> = [
    { key: 'need', label: t('recap.need'), value: needText },
    { key: 'stage', label: t('recap.stage'), value: stageText },
    { key: 'timing', label: t('recap.timing'), value: timingText },
    { key: 'budget', label: t('recap.budget'), value: budgetText },
    { key: 'who', label: t('recap.who'), value: whoText },
  ];

  return (
    <aside className="cx-dossier">
      <p className="mono-label cx-label">{t('dossier.label')}</p>
      {heading}
      <p className="cx-lede">{t('dossier.lede')}</p>
      <dl className="cx-recap" aria-label={t('dossier.recapLabel')}>
        {rows.map((row) => (
          <div key={row.key}>
            <dt className="mono-label">{row.label}</dt>
            <dd className={row.value ? 'is-set' : undefined}>{row.value || t('dossier.pending')}</dd>
          </div>
        ))}
      </dl>
      <ul className="cx-assure mono-label">
        <li>{t('dossier.assure1')}</li>
        <li>{t('dossier.assure2')}</li>
        <li>{t('dossier.assure3')}</li>
      </ul>
    </aside>
  );
};
