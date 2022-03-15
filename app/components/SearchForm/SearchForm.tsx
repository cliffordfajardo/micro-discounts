import { Form } from "remix";
import { SearchFilterSideBar } from "../SearchFilterSideBar";
import { type SUPPORTED_FORM_IDS } from "~/utils";
import { Button, Input, Loading, Text } from "@nextui-org/react";
import { ResourceTable } from "~/types/dbTypes";
import { ResourceCardGroup } from "../ResourceCardGroup";
import { useRef } from "react";

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
  const ref = useRef<HTMLFormElement>(null);
  const submitForm = () => {
    if (ref.current) {
      console.log("submitted");
      ref.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
    }
  };

  return (
    <>
      <SearchFilterSideBar formName="search-form" submitForm={submitForm} />

      <section className="search-results" style={{ flex: 3 }}>
        <div className="container">
          <Form id="search-form" ref={ref} className="search-form" method="get">
            <Input
              defaultValue=""
              placeholder="Search..."
              autoComplete="off"
              name="search"
              type="search"
              clearable
              size="lg"
              width="100%"
            // contentRight={<Loading size="xs" />}
            />
          </Form>
          {searchResults.length > 0 ? (
            <div>
              <div style={{ marginTop: 20 }}>
                <Text span>{searchResults.length} resources</Text>
              </div>
              <ResourceCardGroup resources={searchResults} />
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default SearchForm;
