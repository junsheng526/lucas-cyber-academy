import { taxonomies } from "./jsons/__taxonomies";
import { stayTaxonomies } from "./jsons/__stayTaxonomies";
import { TaxonomyType } from "./types";
import { experiencesTaxonomies } from "./jsons/__experiencesTaxonomies";

const DEMO_CATEGORIES: TaxonomyType[] = taxonomies.map((item) => ({
  ...item,
  taxonomy: "category",
  href: item.href,
}));

const DEMO_TAGS: TaxonomyType[] = taxonomies.map((item) => ({
  ...item,
  taxonomy: "tag",
  href: item.href,
}));

//

const DEMO_STAY_CATEGORIES: TaxonomyType[] = stayTaxonomies.map((item) => ({
  ...item,
  taxonomy: "category",
  listingType: "stay",
  href: item.href,
}));
//
const DEMO_EXPERIENCES_CATEGORIES: TaxonomyType[] = experiencesTaxonomies.map(
  (item) => ({
    ...item,
    taxonomy: "category",
    listingType: "experiences",
    href: item.href,
  })
);

export {
  DEMO_CATEGORIES,
  DEMO_TAGS,
  DEMO_STAY_CATEGORIES,
  DEMO_EXPERIENCES_CATEGORIES,
};
