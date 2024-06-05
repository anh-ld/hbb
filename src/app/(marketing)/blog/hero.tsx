import type { FC, ReactNode } from "react";

type IHero = {
  heading: string;
  paragraph?: string;
  subheading?: ReactNode;
};

const Hero: FC<IHero> = ({ heading, paragraph, subheading }) => (
  <div className="mkt-section bg-[--accent-1]">
    <div className="mx-auto max-w-4xl px-4 pt-12 md:pt-16 md:text-center">
      {subheading && <h2 className="h6 !font-epilogue mb-4 cursor-pointer text-[--dark-1]">{subheading}</h2>}
      <h1 className="h2 mb-2 text-[--light-2]">{heading}</h1>
      {paragraph && <p className="paragraph-medium text-[--light-1]">{paragraph}</p>}
    </div>
  </div>
);

export default Hero;
