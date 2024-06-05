import { ContentType, getEntries } from "./_shared";
import { Button } from "@/ui/elements";
import Link from "next/link";
import type { FC } from "react";
import { getPostMeta } from "./_shared";

type IBlogCollection = {
  id: string;
};

const BlogCollection: FC<IBlogCollection> = async ({ id }) => {
  const { items: categoryItems } = await getEntries(ContentType.BlogCategories, { "fields.slug": id });
  const matchedCategory = categoryItems?.[0];

  if (!matchedCategory) return null;

  const { items: posts, includes } = await getEntries(
    ContentType.Blogs,
    { "fields.category.sys.id": matchedCategory.sys.id },
    2,
  );

  return (
    <div className="mask-corner-sm lg:mask-corner-md flex flex-col gap-8 bg-[--light-2] p-8 lg:grid lg:grid-cols-3">
      <div className="flex flex-col items-start justify-between gap-4">
        <div>
          <h3 className="h4 mb-2 text-[--accent-3]">{matchedCategory.fields.name as string}</h3>
          <p className="mb-2 text-[--dark-1]">{matchedCategory.fields.description as string}</p>
        </div>
        <Link href={`/blog/category/${matchedCategory.fields.slug}`} className="w-full lg:w-[initial]">
          <Button size="medium" color="teal" className="w-full">
            Xem tất cả bài viết
          </Button>
        </Link>
      </div>
      <div className="col-span-2 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {posts.map((post, index: number) => {
          const postMeta = getPostMeta(post, includes);

          if (!postMeta) return null;

          return (
            <div key={index}>
              <Link href={postMeta.slug}>
                <img
                  src={postMeta.featuredImage as string}
                  alt={postMeta.title as string}
                  loading="lazy"
                  className="mb-4 aspect-video w-full object-cover object-center"
                />
              </Link>
              <Link href={postMeta.slug} className="text-center hover:underline">
                <h3 className="paragraph-small w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-[--dark-1]">
                  {postMeta.title as string}
                </h3>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogCollection;
