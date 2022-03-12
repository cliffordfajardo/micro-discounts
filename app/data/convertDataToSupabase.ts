// import { supabase } from "~/utils/db";
import { DiscountItems } from "./discount-items";
require('dotenv').config()
console.log("process.ev", process.env)
const {supabase} = require('../utils/db'); 

(async () => {
    let i = 0;
    DiscountItems.forEach(async (discountItem) => {
        const r = await supabase.from('resources').insert({
            id: i++,
            title: discountItem.title,
            keywords: discountItem.keywords,
            domain: discountItem.domain,
            url: discountItem.documentation,
            tfa: discountItem.tfa,
        });
        console.log('r', r);
    })
})()