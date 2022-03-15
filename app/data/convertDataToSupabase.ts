// import { supabase } from "~/utils/db";
import { DiscountItems } from "./discount-items";
import { supabase } from "~/utils";
require("dotenv").config();

// TODO: create seeding function
(async () => {
  let i = 0;
  DiscountItems.forEach(async (discountItem) => {
    const r = await supabase.from("resources").insert({
      id: i++,
      title: discountItem.title,
      keywords: discountItem.keywords,
      domain: discountItem.domain,
      url: discountItem.documentation,
      tfa: discountItem.tfa,
    });
  });
})();
