import 'styled-components'

import { defaultTheme } from '../styles/themes/default'

// Saves time from having to import the theme into every component that uses it.
type ThemeType = typeof defaultTheme

// Overwrite the default theme type adding our custom theme type.
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
