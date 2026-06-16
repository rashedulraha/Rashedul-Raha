import Image from "next/image";

export function HeroAvatar() {
  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-border shadow-xl">
      <Image
        src="./Rashedul.jpeg"
        alt="Md Rashedul Islam Profile Picture"
        fill
        priority
        sizes="(max-width: 768px) 192px, 256px"
        className="object-cover"
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzA1MDUwNSIvPjwvc3ZnPg=="
      />
    </div>
  );
}
