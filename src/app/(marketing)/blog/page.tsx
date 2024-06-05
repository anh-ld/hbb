export const revalidate = 300;

import { ContentType, getEntries } from "./_shared";
import type { Metadata } from "next";
import Link from "next/link";
import Collection from "./collection";
import Hero from "./hero";
import List from "./list";
import Newsletter from "./newsletter";
import { getPostMeta } from "./_shared";

export const metadata: Metadata = {
  title: "Blog",
};

const Page = async () => {
  const { items: latestPosts, includes } = await getEntries(ContentType.Blogs, {}, 4);
  const mostRecentPost = latestPosts.splice(0, 1)[0];
  const mostRecentPostMeta = getPostMeta(mostRecentPost, includes);

  if (!mostRecentPostMeta) return null;

  return (
    <div className="wood">
      <Hero heading="Blog" paragraph="Những chia sẻ của Horos về chính tinh, phụ tinh và góc nhìn tử vi." />
      <div className="mkt-section bg-[--light-1]">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4">
          {/* hero post */}
          <div className="relative">
            <div className="mask-corner-sm lg:mask-corner-md grid grid-cols-1 bg-[--light-2] md:grid-cols-2">
              <Link href={mostRecentPostMeta.slug}>
                <img
                  src={mostRecentPostMeta.featuredImage as string}
                  alt={mostRecentPostMeta.title as string}
                  loading="lazy"
                  className="aspect-video h-full w-full object-cover object-center"
                />
              </Link>
              <div className="relative z-10 flex flex-col justify-center p-6 md:p-8">
                <div className="flex flex-col gap-3">
                  <Link
                    href={`/blog/category/${mostRecentPostMeta.category?.fields.slug as string}`}
                    className="h6 !font-epilogue cursor-pointer text-[--accent-3] hover:underline"
                  >
                    {mostRecentPostMeta.category?.fields.name as string}
                  </Link>
                  <Link href={mostRecentPostMeta.slug} className="cursor-pointer hover:underline">
                    <h4 className="h4 text-[--dark-1]">{mostRecentPostMeta.title as string}</h4>
                  </Link>
                  <div>
                    {/* <Link
                      href={`/blog/author/${mostRecentPostMeta.author.fields.slug}`}
                      className="paragraph-small !font-medium cursor-pointer text-[--dark-1] hover:underline"
                    >
                      <span>{mostRecentPostMeta.author.fields.name}</span>
                    </Link>
                    <span className="mx-4">|</span> */}
                    <span className="paragraph-small text-[--dark-1]">{mostRecentPostMeta.publishedDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* recent posts */}
          <List posts={latestPosts} collection={includes} />
          <Newsletter />
          <Collection id="kien-thuc-chinh-tinh" />
          <Collection id="goc-nhin-horos" />
        </div>
      </div>
    </div>
  );
};

export default Page;
