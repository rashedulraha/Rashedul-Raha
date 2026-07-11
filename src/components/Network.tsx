import React from "react";
import { WorldMapNetwork } from "./WorldMapNetwork";
import { useTranslations } from "next-intl";

const Network = () => {
  const t = useTranslations("Features.Network");
  return (
    <div className="md:col-span-6 lg:col-span-4 lg:row-span-6">
      <div className="group relative flex w-full flex-col justify-between overflow-hidden rounded-2xl transition-all duration-300 h-full min-h-72 card-premium">
        <WorldMapNetwork />
        <div className="pointer-events-none z-10 flex flex-col gap-1 p-5 absolute bottom-0 left-0 text-left">
          <p className="text-muted-foreground text-xs uppercase transition-colors duration-500 group-hover:text-primary dark:group-hover:text-primary/80">
            {t('badge')}
          </p>
          <p className="text-lg text-muted-foreground tracking-wide dark:text-muted-foreground">
            {t('title')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Network;
