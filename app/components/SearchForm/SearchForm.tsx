import { Form } from "remix";
import { SearchFilterSideBar } from "../SearchFilterSideBar";
import { type SUPPORTED_FORM_IDS } from "~/utils";
import { Button, Input, Loading } from "@nextui-org/react";
import { ResourceTable } from "~/types/dbTypes";
import { ResourceCardGroup } from "../ResourceCardGroup";

type SearchFormProps = {
  /**
   * @decription
   * Search results items to display below the search input.
   */
  searchResults: ResourceTable[];
  /**
   * @description
   * The `id` value for the form element that you would like to connect
   * these fields to.
   */
  formName: SUPPORTED_FORM_IDS;
};

/**
 * @description
 * Renders the search input along with the search results.
 */
const SearchForm = ({ searchResults = [] }: SearchFormProps) => {
  return (
    <>
      <SearchFilterSideBar formName="search-form" />

      <section className="search-results" style={{marginLeft: 50}}>
        <div className="container">
          <Form id="search-form" className="search-form" method="get">
            <Input
              defaultValue=""
              placeholder="Search a TV show..."
              autoComplete="off"
              name="search"
              type="search"
              clearable
              // contentRight={<Loading size="xs" />}
            />
            <Button color="primary" auto type="submit">
              Search
            </Button>
          </Form>
          {searchResults.length > 0 ? (
            <div className="results">
              <ResourceCardGroup resources={searchResults} />
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default SearchForm;
