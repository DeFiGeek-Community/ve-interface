import Head from "next/head";
import bgImage from "public/ogp.png";
import { SITE_DESCRIPTION, SITE_NAME } from "lib/connector/site";

type MetaTagProps = {
  title?: string;
  description?: string;
  site_name?: string;
  image?: string;
  children?: React.ReactNode;
};

export default function MetaTags({
  title = SITE_NAME,
  description = SITE_DESCRIPTION,
  site_name = SITE_NAME,
  image = bgImage.src,
  children,
}: MetaTagProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="robots" content="noindex" />
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={site_name} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary" />
      {/* <meta name="twitter:site" content="@" /> */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="icon" href="/favicon.ico" />
      {children}
    </Head>
  );
}