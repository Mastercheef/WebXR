import "bulma/css/bulma.min.css";
import "../styles/globals.css";
import "../styles/login.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { AuthContextProvider } from "../shared-components/services/auth-context";
import ProtectedRoute from "../shared-components/protected-route";

const noAuthRequired = ["/", "/landingpage", "/test"];

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    // <Component {...pageProps} />
    <AuthContextProvider>
      {noAuthRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      )}
    </AuthContextProvider>
  );
}

export default MyApp;
