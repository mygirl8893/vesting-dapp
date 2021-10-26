import Document, { Html, Head, Main, NextScript } from 'next/document'


const title = 'Investor room – Clearpool'
const description = 'Welcome to the Clearpool investor room. Review your status and claim your vested tokens.'

const meta = {
  title: 'Investor room',
  description: description,
  image: 'https://clearpool.finance/images/opengraph3.jpg',
}

const Meta = () => (
  <>
    <title>{title}</title>
    <meta charSet="utf-8" />
    <meta httpEquiv="Content-Type" content="text/html charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="description" content={description} />
    <meta property="og:url" content={`https://vest.clearpool.finance`} />
    <meta property="og:title" content={meta.title} />
    <meta property="og:description" content={meta.description} />
    <meta property="og:image" content={meta.image} />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="Clearpool Finance" />
    <meta property="twitter:title" content={meta.title} />
    <meta property="twitter:description" content={meta.description} />
    <meta property="twitter:image" content={meta.image} />
    <meta property="twitter:site" content="@ClearpoolFin" />
  </>
)

class MyDocument extends Document {

  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {

    return (
      <Html>
        <Head>
          <Meta />
          <link href="/css/fonts.css" rel="stylesheet" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
          <link rel="manifest" href="/favicon/site.webmanifest" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
