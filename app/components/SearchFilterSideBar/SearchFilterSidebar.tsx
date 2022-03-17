import { Radio, styled, Text, Grid, Checkbox } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { type SUPPORTED_FORM_IDS } from "~/utils";
type SearchFilterSideBarProps = {
  /**
   * @description
   * The `id` value for the form element that you would like to connect
   * these fields to.
   */
  formName: SUPPORTED_FORM_IDS;

  /**
   * @description
   * Allow programtically submit the form
   */
  submitForm: () => void
};

const Categories = [
  "Productivity",
  "Design",
  "Communication",
  "hardwares",
  "mobile contract",
  "shopping",
  "web hosting",
  "vpn",
  "Developer tools",
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
const SearchFilterSideBar = ({ formName, submitForm }: SearchFilterSideBarProps) => {
  const [catSelected, setCatSelected] = useState("");
  const location = useLocation();
  useEffect(() => {
    const allCat = new URLSearchParams(location.search).getAll("category");
    const category = allCat.find(cat => cat && cat.toLowerCase() !== "on");
    if (category) {
      setCatSelected(category.toLowerCase());
    }
  }, [location.search])
  return (
    <LeftNavWrapper>
      <Text h4>Category</Text>

      <Grid.Container gap={1}>
        <Radio.Group value={catSelected} onClick={(e) => {
          submitForm();
        }}
          onChange={(e) => {
            setCatSelected(e as string);
          }}
        >
          <Radio key="all" form={formName} name="category" value="all" size={"sm"} squared={true}>
            All
          </Radio>
          {Categories.map((category) => {
            return (
              <Radio key={category} form={formName} name="category" value={category.toLowerCase()} size={"sm"} squared={true}>
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
