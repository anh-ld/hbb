import type contentful from "contentful";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/vi";
import { FacebookLogo, ThreadsLogo } from "@phosphor-icons/react/dist/ssr";

dayjs.extend(localizedFormat);

export const getPostMeta = (
  post: contentful.Entry,
  collection: contentful.EntryCollection<contentful.EntrySkeletonType>["includes"],
) => {
  if (!collection) return null;

  const Entry = collection.Entry as contentful.Entry[];
  const Asset = collection.Asset as contentful.Asset[];

  if (!Entry || !Asset) return null;

  const category = Entry.find((entry) => entry.sys.id === (post.fields?.category as contentful.Entry).sys.id);
  // const categoryImage = Asset.find((image) => image.sys.id === (category?.fields?.image as contentful.Entry).sys.id)
  // const categoryImageUrl = categoryImage?.fields.file?.url;

  const featuredImage = Asset.find((image) => image.sys.id === (post.fields.featuredImage as contentful.Entry).sys.id);
  const featuredImageUrl = featuredImage?.fields.file?.url;

  const author = Entry.find((entry) => entry.sys.id === (post.fields.author as contentful.Entry).sys.id);
  const authorImage = Asset.find((image) => image.sys.id === (author?.fields?.avatar as contentful.Entry)?.sys?.id);
  const authorImageUrl = authorImage?.fields.file?.url;

  const { title, subtitle, publishedDate, slug, content } = post.fields;

  return {
    title,
    subtitle,
    publishedDate: dayjs(String(publishedDate)).locale("vi").format("LL"),
    category,
    featuredImage: featuredImageUrl,
    author,
    content,
    slug: `/blog/post/${slug}`,
    // categoryImage: String(categoryImageUrl),
    authorImage: String(authorImageUrl),
  };
};

export enum ContentType {
  MajorStars = "main-stars-discovery",
  FeedbackImages = "feedbackImages",
  BlogAuthors = "blogAuthors",
  BlogCategories = "blogCategories",
  Blogs = "pageBlogPost",
}

export const getEntries = async (
  contentType: ContentType,
  attributes: Record<string, string> = {},
  pageSize = 20,
  page = 1,
): Promise<contentful.EntryCollection<contentful.EntrySkeletonType, undefined, string>> => {
  const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
  const CONTENTFUL_API_KEY = process.env.CONTENTFUL_API_KEY;

  if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_API_KEY) return { items: [], total: 0, skip: 0, limit: 0 };

  const limit = pageSize;
  const skip = (page - 1) * pageSize;
  const order = "-sys.createdAt";

  const searchParams = {
    content_type: contentType,
    order: order,
    limit: limit,
    skip: skip,
    access_token: CONTENTFUL_API_KEY!,
    ...attributes,
  };
  const searchString = Object.entries(searchParams)
    .map(([k, v]) => `${k}=${v}`)
    .join("&");

  const response = await fetch(
    `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID!}/environments/master/entries?${searchString}`,
  );

  return await response.json();
};

export { dayjs }

export const SOCIAL_SHARING_LINKS = {
  Facebook: { path: "https://www.facebook.com/sharer/sharer.php?u=", icon: FacebookLogo },
  Threads: { path: "https://threads.net/intent/post?text=", icon: ThreadsLogo },
};