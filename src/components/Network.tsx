import React from "react";
import { WorldMapNetwork } from "./WorldMapNetwork";
import { useTranslations } from "next-intl";

const Network = () => {
  const t = useTranslations("Features.Network");
  return (
    <div className="md:col-span-6 lg:col-span-4 lg:row-span-6">
      <div className="group relative flex w-full flex-col justify-between overflow-hidden rounded-xl bg-surface transition-colors duration-300 hover:bg-white dark:bg-card/15 dark:hover:bg-card/5 ring-1 ring-border h-full min-h-72">
        <WorldMapNetwork />
        <div className="pointer-events-none z-10 flex flex-col gap-1 p-5 absolute bottom-0 left-0 text-left">
          <p className="text-muted-foreground text-xs uppercase transition-colors duration-500 group-hover:text-indigo-500/80 dark:group-hover:text-indigo-300">
            {t('badge')}
          </p>
          <p className="text-lg text-muted-foreground tracking-wide dark:text-muted-foreground">
            {t('title')}
          </p>
        </div>
        <div className="pointer-events-none absolute inset-0 z-10 rounded-xl bg-linear-to-br from-transparent via-transparent to-indigo-400/20 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 dark:to-white/5" />
      </div>
    </div>
  );
};

export default Network;
