import { DEMO_CATEGORIES } from "./taxonomies";
import { PostDataType } from "./types";
import { DEMO_AUTHORS } from "./authors";
import { posts } from "./jsons/__posts";

// FOR MAIN DEMO
const DEMO_POSTS = posts.map((post): PostDataType => {
  //  ##########  GET CATEGORY BY CAT ID ######## //
  const categories = post.categoriesId.map(
    (id) =>
      DEMO_CATEGORIES.filter((taxonomy) => taxonomy.id === id.toString())[0]
  );

  return {
    ...post,
    author: DEMO_AUTHORS.filter(
      (user) => user.id === post.authorId.toString()
    )[0],
    categories: [categories[0]],
  } as PostDataType;
});

export { DEMO_POSTS };
