import { Form, useNavigate, useTransition } from "remix";
import { SearchFilterSideBar } from "../SearchFilterSideBar";
import { type SUPPORTED_FORM_IDS } from "~/utils";
import { Button, Grid, Input, Loading, Text } from "@nextui-org/react";
import { ResourceTable } from "~/types/dbTypes";
import { ResourceCardGroup } from "../ResourceCardGroup";
import { useState } from "react";
import useMediaQuery from "~/utils/useMediaQuery";

// TODO add loading indicator

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

  formRef: React.RefObject<HTMLFormElement> | null;

  submitForm: () => void;
};

/**
 * @description
 * Renders the search input along with the search results.
 */
const SearchForm = ({ searchResults = [], formRef, submitForm, formName }: SearchFormProps) => {
  const transition = useTransition();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 960px)");
  const [searchValue, setSearchValue] = useState("");
  const isSearchRequestInProgress = transition.state === "loading" || transition.state === "submitting";

  return (
    <>
      {!isMobile && (
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            flex: 2,
          }}
        >
          <SearchFilterSideBar formName={formName} submitForm={submitForm} />
        </section>
      )}

      <section className="search-results" style={{ flex: 5 }}>
        <div className="container">
          <div>
            <Form
              id={formName}
              ref={formRef}
              className="search-form"
              method="get"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Input
                value={searchValue}
                placeholder="Search..."
                autoComplete="off"
                name="search"
                type="search"
                clearable
                size="lg"
                width="100%"
                css={{
                  $$inputBorderRadius: "0",
                  padding: 5,
                }}
                onChange={(e) => setSearchValue(e.target.value)}
                onClearClick={() => {
                  navigate("/", { replace: true });
                  formRef?.current?.reset();
                }}
                contentRight={isSearchRequestInProgress ? <Loading size="xs" /> : null}
              />
              <Button
                css={{ borderRadius: 0, width: 100, minWidth: "initial !important" }}
                type="submit"
                form={formName}
              >
                Search
              </Button>
            </Form>
          </div>
          <Grid.Container justify="space-between" alignItems="center" css={{ marginTop: "$6" }}>
            <Grid>
              <Text span>{searchResults.length} resources</Text>
            </Grid>
            <Grid>
              <Button
                light
                color="error"
                auto
                onClick={() => {
                  navigate("/", { replace: true });
                  formRef?.current?.reset();
                }}
              >
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
