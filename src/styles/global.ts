import 'the-new-css-reset/css/reset.css'
import { Colors } from './colors'
import { injectGlobal } from '@emotion/css'

injectGlobal`
  /* stylelint-disable-next-line selector-id-pattern -- #__next は Next.js フレームワークでbody直下に挿入されるラッパー要素 */
  html, body, #__next {
    height: 100%;
  }

  html {
    font-family: 'Noto Sans JP', sans-serif;
    font-size: 16px;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: rgb(0 0 0 / 0%);
  }

  body {
    color: ${Colors.black};
    a {
      color: ${Colors.link};
    }

    a, button {
      cursor: pointer;

      &:disabled{
        cursor: revert;
      }
    }
  }
`
