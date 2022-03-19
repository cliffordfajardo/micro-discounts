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
  submitForm: () => void;
};

const Categories = [
  "Productivity",
  "Design",
  "Developer tools",
  "Learn",
  "Communication",
  "hardwares",
  "mobile contract",
  "shopping",
  "web hosting",
  "vpn",
  "Fashion",
];
const Tags = ["Students", "Teachers", "Free premium plan", "Free"];

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
  const [tagSelected, setTagSelected] = useState("");
  const location = useLocation();
  useEffect(() => {
    const allCat = new URLSearchParams(location.search).getAll("category");
    const category = allCat.find((cat) => cat && cat.toLowerCase() !== "on");
    if (category) {
      setCatSelected(category.toLowerCase());
    } else {
      setCatSelected("");
    }

    const allTag = new URLSearchParams(location.search).getAll("tags");
    const tag = allTag.find((cat) => cat && cat.toLowerCase() !== "on");
    console.log("tag", tag);
    if (tag) {
      setTagSelected(tag.toLowerCase());
    } else {
      setTagSelected("");
    }
  }, [location.search]);
  return (
    <LeftNavWrapper>
      <Text h4>Category</Text>

      <Grid.Container gap={1}>
        <Radio.Group
          value={catSelected}
          onClick={(e) => {
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
              <Radio
                key={category}
                form={formName}
                name="category"
                value={category.toLowerCase()}
                size={"sm"}
                squared={true}
              >
                {category}
              </Radio>
            );
          })}
        </Radio.Group>
      </Grid.Container>

      <Text h4 css={{ marginTop: "$10" }}>
        Tags
      </Text>

      <Radio.Group
        color="primary"
        css={{ marginLeft: "$4" }}
        value={tagSelected}
        onClick={() => {
          submitForm();
        }}
        onChange={(e) => {
          setTagSelected(e as string);
        }}
      >
        {Tags.map((tag) => (
          <Radio key={tag} form={formName} name="tags" value={tag.toLowerCase()} size={"sm"}>
            {tag}
          </Radio>
        ))}
      </Radio.Group>
    </LeftNavWrapper>
  );
};
export default SearchFilterSideBar;
