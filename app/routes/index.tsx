import { Text } from "@nextui-org/react";
import { json, useLoaderData, useTransition, type LoaderFunction } from "remix";
import { NavBar } from "~/layouts/NavBar";
import { SearchForm } from "~/components/SearchForm";
import homepageCSS from "~/styles/index.css";
import { ResourceTable } from "~/types/dbTypes";
import { debug, getDb, filterDBItems, getDbInstance, DB_REFRESH_INTERVAL } from "~/utils";
import { DefaultLayout } from "~/layouts/DefaultLayout";

/**
 * @description
 * <link> tags that will be embedded in the <head> for this page.
 */
export const links = () => {
  return [
    {
      rel: "stylesheet",
      href: homepageCSS,
    },
  ];
};

/**
 * @description
 * Fetch the discount items on the server.
 *
 * NOTES:
 * `loader` function runs on the server.
 * `loader` is a specific term in remix. In here we fetch or return the data we want the component below to  use.
 * `loader` can only be used in `routes` folder files
 */
export const loader: LoaderFunction = async ({ request, params }) => {
  debug();
  const url = new URL(request.url);
  const searchTermParam = url.searchParams.get("search")?.trim().toLocaleLowerCase() || "";
  const categoryParam = url.searchParams
    .getAll("category")
    .map((cat) => cat.toLowerCase())
    .filter((cat) => !["all", "on"].includes(cat));

  const tagsParam = url.searchParams.getAll("tags").map((t) => t.toLowerCase());

  const db = await getDbInstance();
  const discountItems = await db.fetchAllResourcesCached();

  const items = filterDBItems(discountItems, { searchTerm: searchTermParam, category: categoryParam, tags: tagsParam });

  return json(items, {
    // status: 301,
    headers: {
      "Cache-Control": "max-age=60, stale-while-revalidate=60",
    },
  });
};

/**
 * @description
 * This component renders the homepage.
 */
export default function HomePage() {
  //useParams() https://remix.run/docs/en/v1/api/conventions#dynamic-route-parameters
  const data = useLoaderData<ResourceTable[]>();
  return (
    <DefaultLayout>
      <section style={{ marginTop: 60 }}>
        <Text span size={30}>
          The world's largest directory of tech discounts and resources for students and teachers.
        </Text>
      </section>

      <main style={{ marginTop: 30 }}>
        <SearchForm searchResults={data} formName="search-form" />
      </main>
    </DefaultLayout>
  );
}
