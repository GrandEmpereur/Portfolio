import { isBlogVisible } from "@/lib/data/blog.data";

// Shell: rendered only once there are three articles.
export const HomeBlog = async () => (isBlogVisible() ? <section id="blog" className="theme-dark" /> : null);
