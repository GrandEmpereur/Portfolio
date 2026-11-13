import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface HoneypotProps<T extends FieldValues> {
  /** react-hook-form's register, when the surrounding form uses it. The field is named "website". */
  register?: UseFormRegister<T>;
  label?: string;
}

/**
 * Anti-spam trap: a field humans never see or reach, which bots tend to fill.
 * The server treats any value as a bot and sends nothing.
 */
export const Honeypot = <T extends FieldValues>({ register, label = 'Website' }: HoneypotProps<T>) => (
  <div
    aria-hidden="true"
    style={{ position: 'absolute', left: '-9999px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}
  >
    <label>
      {label}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        {...(register ? register('website' as Path<T>) : { name: 'website', defaultValue: '' })}
      />
    </label>
  </div>
);
