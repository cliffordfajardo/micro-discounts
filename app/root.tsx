import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "remix";
import { createTheme, NextUIProvider } from "@nextui-org/react";

// export const meta: MetaFunction = () => {
//   return { title: "New Remix App" };
// };

function Document({
  children,
  title = "App title",
}: {
  children: React.ReactNode;
  title?: string;
}) {
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
        <div className="page-content">{children}</div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
const theme = createTheme({
  type: "light",
  theme: {

    fonts: {
      sans: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto','Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
    }
  }
})

export default function App() {
  // throw new Error("💣💥 Booooom");

  return (
    <Document title="Educational Discounts">
      <NextUIProvider theme={theme}>
        <Outlet />
      </NextUIProvider>
    </Document>
  );
}

// How NextUIProvider should be used on CatchBoundary
export function CatchBoundary() {
  const caught = useCatch();

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <NextUIProvider>
        <p>
          [CatchBoundary]: {caught.status} {caught.statusText}
        </p>
      </NextUIProvider>
    </Document>
  );
}

// How NextUIProvider should be used on ErrorBoundary
export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title="Error!">
      <NextUIProvider>
        <p>[ErrorBoundary]: There was an error: {error.message}</p>
      </NextUIProvider>
    </Document>
  );
}
