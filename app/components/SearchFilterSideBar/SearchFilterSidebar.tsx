import { Radio } from "@nextui-org/react";
import { type SUPPORTED_FORM_IDS } from "~/utils";
type SearchFilterSideBarProps = {
  /**
   * @description
   * The `id` value for the form element that you would like to connect
   * these fields to.
   */
  formName: SUPPORTED_FORM_IDS;
};

/**
 * @description
 * ....
 * Associate this with the form
 */
const SearchFilterSideBar = ({ formName }: SearchFilterSideBarProps) => {
  return (
    <section className="search-filters">
      <Radio
        type="radio"
        form={formName}
        name="fav_language"
        value="HTML"
        id="html"
      />
      <label htmlFor="html">HTML</label>
      <br />

      <Radio
        type="radio"
        form={formName}
        name="fav_language"
        value="CSS"
        id="css"
      />
      <label htmlFor="css">CSS</label>
      <br />

      <Radio
        type="radio"
        form={formName}
        name="fav_language"
        value="JavaScript"
        id="javascript"
      />
      <label htmlFor="javascript">JavaScript</label>
    </section>
  );
};
export default SearchFilterSideBar;
