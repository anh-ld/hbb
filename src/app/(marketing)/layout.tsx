import type { FC, ReactNode } from "react";

type IMarketingLayout = { children: ReactNode; modal: ReactNode };

const MarketingLayout: FC<IMarketingLayout> = ({ children, modal }) => {
  return (
    <>
      <main className="flex flex-1 flex-col">{children}</main>
      {modal}
    </>
  );
};

export default MarketingLayout;
