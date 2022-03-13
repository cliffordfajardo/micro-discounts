import { Radio, styled, Text, Grid, Checkbox } from "@nextui-org/react";
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

const Categories = ["Design", "Security", "Finance", "Software", "Transportation"];
const Tags = ["All", "Free", "Student", "Teacher", "Freemium"];

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
  return (
    <LeftNavWrapper>
      <Text h4>Category</Text>

      <Grid.Container gap={1}>
        <Radio.Group value="all">
          <Radio key="all" form={formName} name="category" value="all" size={"sm"} squared={true} checked={true}>
            All
          </Radio>
          {Categories.map((category) => {
            return (
              <Radio key={category} form={formName} name="category" value={category} size={"sm"} squared={true}>
                {category}
              </Radio>
            );
          })}
        </Radio.Group>
      </Grid.Container>

      <Text h4 css={{ marginTop: "$10" }}>
        Tags
      </Text>

      <Checkbox.Group color="primary" css={{ marginLeft: "$4" }} value={["All"]}>
        {Tags.map((category) => (
          <Checkbox key={category} form={formName} name="category" value={category} size={"sm"}>
            {category}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </LeftNavWrapper>
  );
};
export default SearchFilterSideBar;
