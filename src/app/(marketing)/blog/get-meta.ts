import { dayjs } from "@/_common/utils";

export const getPostMeta = (post: any, Entry: any, Asset: any) => {
  const category = Entry.find((entry: any) => entry.sys.id === post.fields.category.sys.id);
  const categoryImage = Asset.find((image: any) => image.sys.id === category?.fields?.image?.sys?.id)?.fields?.file
    ?.url;
  const featuredImage = Asset.find((image: any) => image.sys.id === post.fields.featuredImage.sys.id)?.fields?.file
    ?.url;
  const author = Entry.find((entry: any) => entry.sys.id === post.fields.author.sys.id);
  const authorImage = Asset.find((image: any) => image.sys.id === author?.fields?.avatar?.sys?.id)?.fields?.file?.url;
  const { title, subtitle, publishedDate, slug, content } = post.fields;

  return {
    title,
    subtitle,
    publishedDate: dayjs(publishedDate).locale("vi").format("LL"),
    category,
    featuredImage,
    author,
    content,
    slug: `/blog/post/${slug}`,
    categoryImage,
    authorImage,
  };
};
