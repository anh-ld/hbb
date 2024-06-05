"use client";

import { SOCIAL_SHARING_LINKS } from "../../_shared";
import { useIsomorphicLayoutEffect } from "ahooks";
import Link from "next/link";
import { useState } from "react";

const SocialSharing = () => {
  const [currentURL, setCurrentURL] = useState("");

  useIsomorphicLayoutEffect(() => {
    setCurrentURL(window.location.href);
  }, []);

  return (
    <div className="paragraph-small flex flex-wrap items-center gap-4 text-[--accent-2] hover:[&_a]:underline">
      <p className="w-full font-medium text-[--dark-1] md:w-[initial]">Chia sẻ bài viết này</p>
      {Object.entries(SOCIAL_SHARING_LINKS).map(([name, { path, icon: Icon }], index) => (
        <Link key={index} href={`${path}${currentURL}`} className="flex items-center gap-2" target="_blank">
          <Icon className="min-h-[24px] min-w-[24px]" />
          <p>{name}</p>
        </Link>
      ))}
    </div>
  );
};

export default SocialSharing;
