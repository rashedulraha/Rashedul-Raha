export function useTranslations(namespace?: string) {
  return (key: string) => {
    if (!key) return "";
    const parts = key.split(".");
    const lastPart = parts[parts.length - 1];
    return lastPart.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase());
  };
}

export function useLocale() {
  return "en";
}

export function getTranslations() {
  return Promise.resolve((key: string) => {
    if (!key) return "";
    const parts = key.split(".");
    const lastPart = parts[parts.length - 1];
    return lastPart.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase());
  });
}

export function NextIntlClientProvider({ children }: { children: React.ReactNode }) {
  return children;
}
