import { type ResourceTable } from "~/types/dbTypes";

export * from "./debug";
export * from "./database";
// TODO export supabase database class

// ************* CONSTANTS************************
/**
 * @description
 * This type keeps track of all the names of the forms in the app.
 * This is useful for scenarios like:
 * - associating a form field with a specific form in the app.
 *
 * @example
 * See `SearchForm.tsx`
 * type SUPPORTED_FORM_IDS = 'search-form' | 'new-form-name-here' ...
 */
export type SUPPORTED_FORM_IDS =
  // this form is used on the homepage for displaying the list of educational discount items
  "search-form";

type filterDBItemsFunction = (
  data: ResourceTable[],
  queryParams: { category: string[]; searchTerm: string; tags: string[] },
) => ResourceTable[];

export const filterDBItems: filterDBItemsFunction = (data = [], { category = [], searchTerm = "", tags = [] }) => {
  if (data.length <= 1) return data;

  let result: ResourceTable[] = data;
  const hasSearchTerm = !!searchTerm;
  const hasCategories = category.length > 0;
  const hasTags = tags.length > 0;
  const isDefaultSearch = !hasSearchTerm && !hasCategories && !hasTags;

  if (isDefaultSearch) {
    return result;
  }
  if (hasSearchTerm) {
    result = data.filter((item) => {
      return item.title?.toLocaleLowerCase().includes(searchTerm) || item.description?.includes(searchTerm);
    });
  }
  if (hasCategories) {
    result = result.filter((item) => {
      return (item.category || []).some((cat) => category.includes(cat));
    });
  }

  if (hasTags) {
    result = result.filter((item) => {
      return (item.tags || []).some((tag) => tags.includes(tag));
    });
  }
  return result;
};
