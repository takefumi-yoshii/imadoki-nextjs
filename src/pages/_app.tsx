import { Layout } from "@/components/organisms/Layout";
import { Provider } from "next-auth/client";
import type { AppProps } from "next/app";
import "../styles/globals.css";
// ___________________________________________________________________________
//
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
