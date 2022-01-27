import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;
    bg: string;
    textPrimary: string;
    textSecondary: string;
    button: {
      bgLight: string;
      bgDark: string;
      bgDanger: string;
      textLight: string;
      textDark: string;
    };
    fgDark: string;
    fgLight: string;
    width: string;
    height: string;
  }
}
