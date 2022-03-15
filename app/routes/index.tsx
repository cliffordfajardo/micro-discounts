import {  Text } from "@nextui-org/react";
import { json, useLoaderData, useTransition, type LoaderFunction } from "remix";
import { NavBar } from "~/layouts/NavBar";
import { SearchForm } from "~/components/SearchForm";
import homepageCSS from "~/styles/index.css";
import { ResourceTable } from "~/types/dbTypes";
import { debug, getDb, filterDBItems } from "~/utils";
import { DefaultLayout } from "~/layouts/DefaultLayout";

/**
 * @description
 * <link> tags that will be embedded in the <head> for this page.
 */
export const links = () => {
  return [
    {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css",
      integrity: "sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==",
      crossOrigin: "anonymous",
      referrerPolicy: "no-referrer",
    },
    {
      rel: "stylesheet",
      href: homepageCSS,
    },
  ];
};

// const discountItems = (await fetchAllResources()).data || [];

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
  const categoryParam = url.searchParams.getAll("category")
    .map(cat => cat.toLowerCase())
    .filter(cat => cat !== "all");
    
  const tagsParam = url.searchParams.getAll("tags").map(t => t.toLowerCase());

  console.info("url.searchParams", url.searchParams);
  const database = await getDb();
  const discountItems = (await database.fetchAllResources()).data || [];
  //TODO: optimize this. call upon an interval
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
        The world's largest directory of discounts and resources for students and teachers.
        </Text>
      </section>

      <main style={{ marginTop: 30 }}>
        <SearchForm searchResults={data} formName="search-form" />
      </main>
    </DefaultLayout>
  );
}
