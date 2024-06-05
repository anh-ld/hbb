export const revalidate = 300;

import { ContentType, getEntries } from "../../_shared";
import Hero from "@/app/(marketing)/blog/hero";
import Newsletter from "@/app/(marketing)/blog/newsletter";
import Markdown from "@/app/(marketing)/blog/renderer";
import { getPostMeta } from "@/app/(marketing)/blog/_shared";
import type { Document } from "@contentful/rich-text-types";
import type { Asset } from "contentful";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import SocialSharing from "./social-sharing";

type IPage = { params: { id: string } };

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = params.id;

  const { items: posts, includes } = await getEntries(ContentType.Blogs, { "fields.slug": id });
  const currentPost = posts[0];
  if (!currentPost) return {};

  const postMeta = getPostMeta(currentPost, includes);
  if (!postMeta) return {};

  return { title: `${postMeta.title}` };
}

const Page = async ({ params }: IPage) => {
  const { id } = params;

  const { items: posts, includes } = await getEntries(ContentType.Blogs, { "fields.slug": id });
  const currentPost = posts[0];
  if (!currentPost) return redirect("/not-found");

  const postMeta = getPostMeta(currentPost, includes);
  if (!postMeta) return {};

  const contentDocument = postMeta.content as Document;

  return (
    <div className="wood">
      <Hero
        heading={postMeta.title as string}
        subheading={
          <>
            <Link href="/blog" className="hover:underline">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/blog/category/${postMeta.category?.fields.slug}`} className="hover:underline">
              {postMeta.category?.fields.name as string}
            </Link>
          </>
        }
        paragraph={postMeta.publishedDate}
      />
      <section className="mkt-section bg-[--light-1]">
        <div className="mx-auto flex max-w-4xl flex-col gap-16 px-4">
          <article className="prose-lg blog-article text-[--dark-1] prose-ul:list-disc prose-ul:pl-4">
            <div className="mask-corner-sm lg:mask-corner-md cut-corner bg-[--light-2] before:bg-[--accent-1]">
              <img
                src={postMeta.featuredImage as string}
                alt={postMeta.title as string}
                loading="lazy"
                className="aspect-video w-full object-cover object-center"
              />
            </div>
            <p className="mb-8 font-medium text-[--accent-2]">{postMeta.subtitle as string}</p>
            <Markdown content={contentDocument} assets={includes?.Asset as Asset[]} />
          </article>

          <SocialSharing />

          {/* <div className="flex items-center gap-4 text-[--dark-1] md:gap-8">
            <Link href={`/blog/author/${postMeta.author.fields.slug}`} className="contents">
              <img
                alt={postMeta.author.fields.name}
                src={postMeta.authorImage}
                className="m-0 h-20 min-h-20 w-20 min-w-20"
              />
            </Link>
            <div className="flex flex-col gap-2">
              <Link href={`/blog/author/${postMeta.author.fields.slug}`} className="hover:underline">
                <h6 className="h6">{postMeta.author.fields.name}</h6>
              </Link>
              <p className="paragraph-small m-0">{postMeta.author.fields.description}</p>
            </div>
          </div> */}

          <Newsletter />
        </div>
      </section>

      {/* <Newsletter /> */}
    </div>
  );
};

export default Page;
