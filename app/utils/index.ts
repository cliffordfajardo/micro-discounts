export * from "./debug";
export * from "./db.server";
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
