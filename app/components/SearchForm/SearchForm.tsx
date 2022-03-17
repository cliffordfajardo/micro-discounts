import { Form, useNavigate, useLocation } from "remix";
import { SearchFilterSideBar } from "../SearchFilterSideBar";
import { type SUPPORTED_FORM_IDS } from "~/utils";
import { Button, Grid, Input, Loading, Text } from "@nextui-org/react";
import { ResourceTable } from "~/types/dbTypes";
import { ResourceCardGroup } from "../ResourceCardGroup";
import { useRef, useState } from "react";

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
  const navigate = useNavigate();
  const submitForm = () => {
    if (ref.current) {
      ref.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
    }
  };

  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <SearchFilterSideBar formName="search-form" submitForm={submitForm} />

      <section className="search-results" style={{ flex: 3 }}>
        <div className="container">
          <Form id="search-form" ref={ref} className="search-form" method="get">
            <Input
              value={searchValue}
              placeholder="Search..."
              autoComplete="off"
              name="search"
              type="search"
              clearable
              size="lg"
              width="100%"
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Form>
          <Grid.Container justify="space-between" alignItems="center" css={{ marginTop: "$6" }}>
            <Grid>
              <Text span>{searchResults.length} resources</Text>
            </Grid>
            <Grid>
              <Button light color="error" auto onClick={() => {
                navigate('/', { replace: true});
                ref.current?.reset();
              }}>
                Clear filter
              </Button>
            </Grid>
          </Grid.Container>
          {searchResults.length > 0 ? (
            <Grid>
              <ResourceCardGroup resources={searchResults} />
            </Grid>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default SearchForm;
