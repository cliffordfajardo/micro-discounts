import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch, useLocation } from "remix";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import IndexCss from '~/styles/index.css';
import gtag from '~/utils/gtag';
import { useEffect } from "react";

/**
 * @description
 * <link> tags that will be embedded in the <head> for this page.
 */
export const links = () => {
  return [
    {
      rel: "stylesheet",
      href: IndexCss,
    },
  ];
};

function Document({ children, title = "App title" }: { children: React.ReactNode; title?: string }) {
  const location = useLocation();

  useEffect(() => {
    gtag.pageview(location.pathname);
  }, [location]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <title>{title}</title>
        <Links />
      </head>
      <body>
        <NextUIProvider theme={theme}>
          <div className="page-content">{children}</div>
        </NextUIProvider>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <script
        async
        id="gtag-init"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `
        }}
      />
    </html>
  );
}
const theme = createTheme({
  type: "light",
  theme: {
    fonts: {
      sans: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto','Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
    },
  },
});

export default function App() {
  // throw new Error("💣💥 Booooom");

  return (
    <Document title="Educational Discounts">
      <Outlet />
    </Document>
  );
}

// How NextUIProvider should be used on CatchBoundary
export function CatchBoundary() {
  const caught = useCatch();

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <p>
        [CatchBoundary]: {caught.status} {caught.statusText}
      </p>
    </Document>
  );
}

// How NextUIProvider should be used on ErrorBoundary
export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title="Error!">
      <p>[ErrorBoundary]: There was an error: {error.message}</p>
    </Document>
  );
}
