"use client";

import {useLocale, useTranslations} from 'next-intl';
import {useRouter, usePathname} from '@/routing';
import {ChangeEvent, useTransition} from 'react';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    startTransition(() => {
      // In next-intl, router.replace expects the pathname string and an options object
      router.replace(pathname, {locale: nextLocale});
    });
  }

  return (
    <div className="relative flex items-center gap-1 mx-1 text-muted-foreground hover:text-foreground transition-colors">
      <Globe className="h-4 w-4" />
      <select
        className="appearance-none bg-transparent outline-none text-sm font-medium cursor-pointer"
        defaultValue={locale}
        disabled={isPending}
        onChange={onSelectChange}
        title={t('language')}
      >
        <option value="en">Eng (UK)</option>
        <option value="bn">বাংলা</option>
        <option value="ja">日本語</option>
        <option value="de">Deutsch</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
        <option value="it">Italiano</option>
      </select>
    </div>
  );
}
