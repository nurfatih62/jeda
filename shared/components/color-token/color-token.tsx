export const colorTokens = {
  background: '#FBF8F2',
  headerBackground: 'rgba(25, 136, 118, 0.04)',
  primary: '#198876',
  primaryBorder: '#147364',
  textPrimary: '#1B4E46',
  textMuted: 'rgba(27, 78, 70, 0.75)',
  placeholder: '#C2C7D0',
  cardBorder: 'rgba(27, 78, 70, 0.52)',
  white: '#FFFFFF',
} as const;

export type ColorTokenName = keyof typeof colorTokens;

export interface ColorSwatchProps {
  name: string;
  value: string;
}

export function ColorSwatch({ name, value }: ColorSwatchProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-12 w-12 shrink-0 rounded-lg border border-[#E5E1D5]"
        style={{ background: value }}
      />
      <div>
        <p className="font-sans text-sm font-semibold text-text-primary">{name}</p>
        <p className="font-sans text-xs text-[#6f6a5e]">{value}</p>
      </div>
    </div>
  );
}
