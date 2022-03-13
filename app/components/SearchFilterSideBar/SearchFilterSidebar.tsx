import { Radio, styled, Text, Link, Grid, Checkbox } from "@nextui-org/react";
import React from "react";
import { type SUPPORTED_FORM_IDS } from "~/utils";
type SearchFilterSideBarProps = {
  /**
   * @description
   * The `id` value for the form element that you would like to connect
   * these fields to.
   */
  formName: SUPPORTED_FORM_IDS;
};

const Categories = [
  "Design",
  "Security",
  "Finance",
  "Software",
  "Transportation",
];

const Tags = ["Free", "Student", "Teacher", "Freemium"];

// @ts-ignore : TODO: open PR/ISSUE at NextUI repo
const LeftNavWrapper = styled("section", {
  display: "flex",
  flexDirection: "column",
  gap: 2,
  width: "20%",
  // fontSize: "$xs"
});

/**
 * @description
 * ....
 * Associate this with the form
 */
const SearchFilterSideBar = ({ formName }: SearchFilterSideBarProps) => {
  const [activeCategory, setActiveCategory] = React.useState("");
  return (
    <LeftNavWrapper>
      <Text h4>Category</Text>
      <Grid.Container gap={1}>
        {Categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <Grid
              key={cat}
              css={{
                width: "100%",
                background: isActive ? "$primary" : "$transparent",
                borderRadius: "$xs",

                fontWeight: isActive ? "$bold" : "$regular",

                cursor: "pointer",
              }}
              onClick={() => {
                setActiveCategory(cat);
              }}
            >
              <Link
                css={{
                  "&:hover": {
                    color: isActive ? "$white" : "$primary",
                  },
                  color: isActive ? "$white" : "$text",
                  padding: "$3",
                }}
              >
                {cat}
              </Link>
            </Grid>
          );
        })}
      </Grid.Container>
      <Text h4 css={{ marginTop: "$4" }}>
        Tags
      </Text>
      <Checkbox.Group color="primary" css={{ marginLeft: "$4" }} value={[]}>
        {Tags.map((cat) => (
          <Checkbox
            key={cat}
            form={formName}
            name={cat}
            value={cat}
            size={"sm"}
          >
            {cat}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </LeftNavWrapper>
  );
};
export default SearchFilterSideBar;
