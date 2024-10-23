import Head from "next/head";
import { SITE_DESCRIPTION, SITE_NAME, OG_IMAGE } from "lib/connector/site";
import { useContractContext } from "lib/contexts/ContractContext";

type MetaTagProps = {
  title?: string;
  description?: string;
  site_name?: string;
  image?: string;
  children?: React.ReactNode;
};

export default function MetaTags({ children }: MetaTagProps) {
  const { config } = useContractContext();
  const title = config ? config.siteName : SITE_NAME;
  const description = config ? config.siteDescription : SITE_DESCRIPTION;
  const image = config ? config.ogImage : OG_IMAGE;

  return (
    <Head>
      <title>{title}</title>
      <meta name="robots" content="noindex" />
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={title} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary" />
      {/* <meta name="twitter:site" content="@" /> */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link
        rel="icon"
        href={config ? `/image${config.path}/favicon.ico` : "/favicon.ico"}
      />
      {children}
      <style>
        {`
        :root {
          --w3m-accent: ${config.themeColors.primaryColor} !important;
        }
      `}
      </style>
    </Head>
  );
}
