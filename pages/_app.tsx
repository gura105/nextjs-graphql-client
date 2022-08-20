import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import createEmotionCache from "styles/createEmotionCache";
import "styles/globals.css";
import { theme } from "styles/theme";
import type { AppProps } from "next/app";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type PbAppProps = AppProps & {
  emotionCache?: EmotionCache;
};

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: PbAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;