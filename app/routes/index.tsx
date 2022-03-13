import { json, useLoaderData, useTransition, type LoaderFunction } from "remix";
import { SearchForm } from "~/components/SearchForm";
import homepageCSS from "~/styles/index.css";
import { ResourceTable } from "~/types/dbTypes";
import { debug, fetchAllResources } from "~/utils";

/**
 * @description
 * <link> tags that will be embedded in the <head> for this page.
 */
export const links = () => {
  return [
    {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css",
      integrity:
        "sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==",
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
export const loader: LoaderFunction = async ({ request }) => {
  debug();
  const url = new URL(request.url);
  const searchTermParam =
    url.searchParams.get("search")?.trim().toLocaleLowerCase() || "";
  const categoryParam =
    url.searchParams.get("category")?.trim().toLocaleLowerCase() || "";
  const hasNoSearchTermParamInURL = searchTermParam.length === 0;
  const hasNoCategoryParamInURL = categoryParam.length === 0;
  //TODO: optimize this. call upon an interval
  const discountItems = (await fetchAllResources()).data || [];

  let data;

  if (hasNoSearchTermParamInURL) {
    data = discountItems;
  } else {
    const filteredItems = discountItems.filter((item) =>
      item.title?.toLowerCase().includes(searchTermParam)
    );
    data = filteredItems;
  }
  return json(data, {
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
  const data = useLoaderData<ResourceTable[]>();
  const transition = useTransition();
  console.log(`loader data-----------`, data);

  return (
    <>
      <p>
        Transition States:
        {transition.state === "submitting" ? "submitting " : null}
        {transition.state === "loading" ? "loading " : null}
        {transition.state === "idle" ? "idle " : null}
      </p>

      <nav className="navbar">
        <ul className="navbar-nav navbar-table ml-auto pr-5">
          <li className="nav-item">
            <a className="nav-link" href="#">
              About --
            </a>
          </li>
        </ul>
      </nav>

      <section style={{ marginTop: 100 }}>
        <h2>Startup Library</h2>
        <p>
          Over the past 15 years, we’ve created many videos, podcasts and essays
          as resources for startup founders. We’ve now consolidated them here in
          the YC Startup Library. A selection of this content makes up the core
          curriculum of Startup School, our free online platform and global
          community for founders.
        </p>
      </section>

      <main>
        <SearchForm searchResults={data} formName="search-form" />
      </main>
    </>
  );
}
