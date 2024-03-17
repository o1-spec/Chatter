import { logEvent, getAnalytics } from "firebase/analytics";

const analytics = getAnalytics();

export const logBlogView = (blogId: string, blogTitle: string) => {
  logEvent(analytics, "view", {
    blog_id: blogId,
    blog_title: blogTitle,
  });
};

export const logLike = (blogId: string, blogTitle: string) => {
  logEvent(analytics, "like", {
    blog_id: blogId,
    blog_title: blogTitle,
  });
};

export const logBookmark = (blogId: string, blogTitle: string) => {
  logEvent(analytics, "bookmark", {
    blog_id: blogId,
    blog_title: blogTitle,
  });
};
