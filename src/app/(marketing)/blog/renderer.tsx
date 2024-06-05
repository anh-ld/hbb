import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import type { Document } from "@contentful/rich-text-types";
import type { Asset } from "contentful";
import type { FC } from "react";

type IRichTextAsset = { id: string; assets: Asset[] };

const RichTextAsset: FC<IRichTextAsset> = ({ id, assets = [] }) => {
  const asset = assets.find((asset) => asset.sys.id === id);
  if (!asset?.fields.file?.url) return null;

  return (
    <div className="mask-corner-sm lg:mask-corner-md cut-corner bg-[--light-2] md:mx-8 before:bg-[--dark-1]">
      <img
        src={asset.fields.file.url as string}
        loading="lazy"
        className="aspect-video object-cover object-center"
        alt={asset.fields.title as string}
      />
    </div>
  );
};

type IMarkdown = { content: Document; assets: Asset[] };

const Markdown: FC<IMarkdown> = ({ content, assets }) =>
  documentToReactComponents(content, {
    renderNode: { [BLOCKS.EMBEDDED_ASSET]: (node) => <RichTextAsset id={node.data.target.sys.id} assets={assets} /> },
  });

export default Markdown;
