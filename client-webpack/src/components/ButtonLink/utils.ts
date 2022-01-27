type ButtonThemes = {
  bgLight: string;
  bgDark: string;
  bgDanger: string;
  textLight: string;
  textDark: string;
};

export type ButtonVariant = 'light' | 'dark' | 'danger';

export const ButtonVariants = {
  light: 'light',
  dark: 'dark',
  danger: 'danger',
};

export const getBackground = (variant: ButtonVariant, theme: ButtonThemes) => {
  if (variant === ButtonVariants.danger) {
    return theme.bgDanger;
  }
  if (variant === ButtonVariants.dark) {
    return theme.bgDark;
  }
  return theme.bgLight;
};

export const getButtonTextColor = (
  variant: ButtonVariant,
  theme: ButtonThemes,
) => {
  if (variant === ButtonVariants.danger || variant === ButtonVariants.dark) {
    return theme.textLight;
  }
  return theme.textDark;
};

export const getBackgroundHoverColor = (variant: ButtonVariant) => {
  if (variant === ButtonVariants.light || variant === ButtonVariants.dark) {
    return 'lightgray';
  }
  return '#FA6E87';
};
