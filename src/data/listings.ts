import { experiencesListing } from "./jsons/__experiencesListing";
import {
  DEMO_STAY_CATEGORIES,
  DEMO_EXPERIENCES_CATEGORIES,
} from "./taxonomies";
import { CarDataType, ExperiencesDataType, StayDataType } from "./types";
import { DEMO_AUTHORS } from "./authors";
import car1 from "../assets/cars/1.png";
import car2 from "../assets/cars/2.png";
import car3 from "../assets/cars/3.png";
import car4 from "../assets/cars/4.png";
import car5 from "../assets/cars/5.png";
import car6 from "../assets/cars/6.png";
import car7 from "../assets/cars/7.png";
import car8 from "../assets/cars/8.png";
import car9 from "../assets/cars/9.png";
import car10 from "../assets/cars/10.png";
import car11 from "../assets/cars/11.png";
import car12 from "../assets/cars/12.png";
import car13 from "../assets/cars/13.png";
import car14 from "../assets/cars/14.png";
import car15 from "../assets/cars/15.png";
import car16 from "../assets/cars/16.png";
import { stayListing } from "./jsons/__stayListing";
import { carsListing } from "./jsons/__carsListing";
const carsImgs = [
  car1,
  car2,
  car3,
  car4,
  car5,
  car6,
  car7,
  car8,
  car9,
  car10,
  car11,
  car12,
  car13,
  car14,
  car15,
  car16,
];

const DEMO_STAY_LISTINGS = stayListing.map((post, index): StayDataType => {
  //  ##########  GET CATEGORY BY CAT ID ######## //
  const category = DEMO_STAY_CATEGORIES.filter(
    (taxonomy) => taxonomy.id === post.listingCategoryId
  )[0];

  return {
    ...post,
    id: `stayListing_${index}_`,
    saleOff: !index ? "-20% today" : post.saleOff,
    isAds: !index ? true : post.isAds,
    author: DEMO_AUTHORS.filter((user) => user.id === post.authorId)[0],
    listingCategory: category,
    href: post.href,
  };
});

const DEMO_EXPERIENCES_LISTINGS = experiencesListing.map(
  (post, index): ExperiencesDataType => {
    //  ##########  GET CATEGORY BY CAT ID ######## //
    const category = DEMO_EXPERIENCES_CATEGORIES.filter(
      (taxonomy) => taxonomy.id === post.listingCategoryId
    )[0];

    return {
      ...post,
      id: `experiencesListing_${index}_`,
      saleOff: !index ? "-20% today" : post.saleOff,
      isAds: !index ? true : post.isAds,
      author: DEMO_AUTHORS.filter((user) => user.id === post.authorId)[0],
      listingCategory: category,
      href: post.href,
    };
  }
);

const DEMO_CAR_LISTINGS = carsListing.map((post, index): CarDataType => {
  //  ##########  GET CATEGORY BY CAT ID ######## //
  const category = DEMO_EXPERIENCES_CATEGORIES.filter(
    (taxonomy) => taxonomy.id === post.listingCategoryId
  )[0];

  return {
    ...post,
    id: `carsListing_${index}_`,
    saleOff: !index ? "-20% today" : post.saleOff,
    isAds: !index ? true : post.isAds,
    author: DEMO_AUTHORS.filter((user) => user.id === post.authorId)[0],
    listingCategory: category,
    featuredImage: carsImgs[index],
    href: post.href,
  };
});

export { DEMO_STAY_LISTINGS, DEMO_EXPERIENCES_LISTINGS, DEMO_CAR_LISTINGS };
