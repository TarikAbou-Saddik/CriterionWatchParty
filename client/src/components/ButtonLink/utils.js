export const buttonVariants = {
  light: 'light',
  dark: 'dark',
  danger: 'danger',
};

export const getBackground = (variant, theme) => {
  if (variant === buttonVariants.danger) {
    return theme.buttonBgDanger;
  }
  if (variant === buttonVariants.dark) {
    return theme.buttonBgDark;
  }
  return theme.buttonBgLight;
};

export const getButtonTextColor = (variant, theme) => {
  if (variant === buttonVariants.danger || variant === buttonVariants.dark) {
    return theme.buttonTextLight;
  }
  return theme.buttonTextDark;
};

export const getBackgroundHoverColor = variant => {
  if (variant === buttonVariants.light || variant === buttonVariants.dark) {
    return 'lightgray';
  }
  return '#FA6E87';
};
