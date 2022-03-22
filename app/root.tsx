import {
  json,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
  useLocation,
  type MetaFunction,
} from "remix";
import { createTheme, NextUIProvider, CssBaseline } from "@nextui-org/react";
import IndexCss from "~/styles/index.css";
import { GA_TRACKING_ID, pageview } from "~/utils/gtag.client";
import { useEffect } from "react";
import useDarkMode from "use-dark-mode";

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

/**
 * @description
 * This loader is used for determining what enviornment we are in "development" or "production"
 * The environment variable is passed down to the browser
 * See: https://remix.run/docs/en/v1/guides/envvars#server-environment-variables
 */
export async function loader() {
  return json({
    ENV: {
      APP_ENV: process.env.NODE_ENV,
    },
  });
}

export const meta: MetaFunction = () => {
  const description = `The world's largest directory of tech discounts for students, teachers & hobbyists.`;
  return {
    charset: "utf-8",
    description,
    keywords: "Educational Discounts,Tech Discounts, Coding Discounts, Programming Discounts",
    // "twitter:image": "https://example.com/social.png",
    // "twitter:card": "summary_large_image",
    // TODO NOTE for DOM: currently you can only list 1 username here 😞 I will leave mine here temporaily for launch for testing
    "twitter:creator": "@cliffordfajardo",
    "twitter:site": "@cliffordfajardo",
    "twitter:title": "MicroDiscount - quality tech discounts for students, teachers & hobbyists",
    "twitter:description": description,
  };
};

/**
 * @description
 * This is also known as `Root` in the remix docs; we renamed it,
 */
function Document({ children, title = "App title" }: { children: React.ReactNode; title?: string }) {
  const rootPageData = useLoaderData();
  const isDevelopmentMode = rootPageData.ENV.APP_ENV !== "development";
  const location = useLocation();
  const darkMode = useDarkMode(false);

  useEffect(() => {
    if (isDevelopmentMode) {
      pageview(location.pathname);
    }
  }, [isDevelopmentMode, location]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <title>{title}</title>
        {CssBaseline.flush()}
        <Links />
      </head>
      <body>
        <NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}>
          <div className="page-content">{children}</div>
        </NextUIProvider>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.ENV = {
                APP_ENV: "${rootPageData.ENV.APP_ENV}"
              }`,
          }}
        />

        {isDevelopmentMode ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
            <script
              async
              id="gtag-init"
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
              }}
            />
          </>
        ) : null}
      </body>
    </html>
  );
}
const lightTheme = createTheme({
  type: "light",
  theme: {
    fonts: {
      sans: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto','Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
    },
  },
});

const darkTheme = createTheme({
  type: "dark",
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
