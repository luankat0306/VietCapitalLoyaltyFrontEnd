import { AppProvider } from '@context/app/AppContext'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { Backdrop, CircularProgress } from '@material-ui/core'
import MuiTheme from '@theme/MuiTheme'
import GoogleAnalytics from '@utils/GoogleAnalytics'
import OpenGraphTags from '@utils/OpenGraphTags'
import { SessionProvider, signIn, useSession } from 'next-auth/react'
import Head from 'next/head'
import Router from 'next/router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import React, { Fragment, useEffect } from 'react'

export const cache = createCache({ key: 'css', prepend: true })

//Binding events.
Router.events.on('routeChangeStart', () => nProgress.start())
Router.events.on('routeChangeComplete', () => nProgress.done())
Router.events.on('routeChangeError', () => nProgress.done())

nProgress.configure({ showSpinner: false })

const App = ({ Component, pageProps: { session, ...pageProps } }: any) => {
  const Layout = Component.layout || Fragment

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  }, [])

  return (
    <SessionProvider session={session}>
      <CacheProvider value={cache}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <link
            rel="shortcut icon"
            href="https://www.vietcapitalbank.com.vn/static/images/favicon.ico"
          />

          <GoogleAnalytics />
          <OpenGraphTags />
        </Head>
        <AppProvider>
          <MuiTheme>
            <Layout>
              {Component.auth ? (
                <Auth>
                  <Component {...pageProps} />
                </Auth>
              ) : (
                <Component {...pageProps} />
              )}
            </Layout>
          </MuiTheme>
        </AppProvider>
      </CacheProvider>
    </SessionProvider>
  )
}

function Auth({ children }: any) {
  const { data: session, status } = useSession()
  const isUser = !!session?.user
  React.useEffect(() => {
    if (status === 'loading') return // Do nothing while loading
    if (!isUser) signIn() // If not authenticated, force log in
  }, [isUser, status])

  if (isUser) {
    return children
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return (
    <Backdrop
      sx={{ color: 'white', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// App.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default App
