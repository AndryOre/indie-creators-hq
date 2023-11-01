import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta
            name="description"
            content="Únete a nuestra comunidad de Creadores Independientes y construye proyectos innovadores. Descubre tu potencial creativo con nosotros."
          />
          <link rel="icon" href="/favicon.svg" />

          <meta
            name="keywords"
            content="Creadores Independientes, Comunidad, Proyectos Innovadores, Hispanos, Colaboración"
          />
          <meta
            name="news_keywords"
            content="Creadores Independientes, Comunidad, Proyectos Innovadores, Hispanos, Colaboración"
          />

          <meta name="author" content="Serudda" />

          <meta property="og:type" content="website" />
          <meta property="og:title" content="Indie Creators HQ" />
          <meta
            property="og:description"
            content="Únete a nuestra comunidad de Creadores Independientes y construye proyectos innovadores. Descubre tu potencial creativo con nosotros."
          />
          <meta
            property="og:url"
            content="https://indie-creators-hq.vercel.app"
          />
          <meta
            property="og:image"
            content="https://res.cloudinary.com/dhwxnbnaj/image/upload/v1697662035/Indie%20Creatos%20HQ/Indie_Creators_HQ_t48m20.png"
          />
          <meta property="og:site_name" content="Indie Creators HQ" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:site"
            content="https://indie-creators-hq.vercel.app"
          />
          <meta name="twitter:creator" content="Serudda" />
          <meta name="twitter:title" content="Indie Creators HQ" />
          <meta
            name="twitter:description"
            content="Únete a nuestra comunidad de Creadores Independientes y construye proyectos innovadores. Descubre tu potencial creativo con nosotros."
          />
          <meta
            name="twitter:image"
            content="https://res.cloudinary.com/dhwxnbnaj/image/upload/v1697662035/Indie%20Creatos%20HQ/Indie_Creators_HQ_t48m20.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
