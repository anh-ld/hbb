import type contentful from "contentful";
import Link from "next/link";
import type { FC } from "react";
import { getPostMeta } from "./_shared";

type IList = {
  posts: contentful.Entry[];
  collection: contentful.EntryCollection<contentful.EntrySkeletonType>["includes"];
};

const List: FC<IList> = ({ posts, collection }) => {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2">
      {posts.map((post: any, index: number) => {
        const postMeta = getPostMeta(post, collection);

        if (!postMeta) return null;

        return (
          <div className="mask-corner-sm lg:mask-corner-md bg-[--light-2]" key={index}>
            <Link href={postMeta.slug}>
              <img
                src={postMeta.featuredImage as string}
                alt={postMeta.title as string}
                loading="lazy"
                className="aspect-video w-full object-cover object-center"
              />
            </Link>
            <div className="flex flex-col justify-center p-8">
              <div className="flex flex-col gap-2">
                <Link
                  href={`/blog/category/${postMeta.category?.fields.slug}`}
                  className="paragraph-small !font-epilogue !font-medium text-[--accent-3] hover:underline"
                >
                  <h6 className="">{postMeta.category?.fields.name as string}</h6>
                </Link>
                <Link href={postMeta.slug} className="hover:underline">
                  <h3 className="h6 text-[--dark-1]">{postMeta.title as string}</h3>
                </Link>
                <span className="paragraph-small text-[--dark-1]">{postMeta.publishedDate}</span>
                {/* <Link
                  href={`/blog/author/${postMeta.author.fields.slug}`}
                  className="paragraph-extra-small !font-medium text-[--dark-1] hover:underline"
                >
                  <p className="">{postMeta.author.fields.name}</p>
                </Link> */}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
