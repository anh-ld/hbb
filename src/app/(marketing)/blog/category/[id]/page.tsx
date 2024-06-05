export const revalidate = 300;

import { ContentType, getEntries } from "../../_shared";
import Hero from "@/app/(marketing)/blog/hero";
import List from "@/app/(marketing)/blog/list";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { FC } from "react";

type IPage = { params: { id: string } };

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = params;

  const { items: categories } = await getEntries(ContentType.BlogCategories, { "fields.slug": id });
  const matchedCategory = categories?.[0];

  if (!matchedCategory) return {};
  return { title: `${matchedCategory.fields.name}` };
}

const Page: FC<IPage> = async ({ params }) => {
  const { id } = params;

  const { items: categories } = await getEntries(ContentType.BlogCategories, { "fields.slug": id });
  const matchedCategory = categories?.[0];

  if (!matchedCategory) return redirect("/not-found");

  const { items: posts, includes } = await getEntries(ContentType.Blogs, {
    "fields.category.sys.id": matchedCategory.sys.id,
  });

  return (
    <div className="wood">
      <Hero
        heading={matchedCategory.fields.name as string}
        paragraph={matchedCategory.fields.description as string}
        subheading={
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>
        }
      />
      <div className="mkt-section bg-[--light-1]">
        <div className="mx-auto max-w-6xl px-4">
          {/* recent posts */}
          <List posts={posts} collection={includes} />
        </div>
      </div>
    </div>
  );
};

export default Page;
