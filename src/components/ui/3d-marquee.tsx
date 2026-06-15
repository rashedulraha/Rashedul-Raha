"use client";

import { motion } from "framer-motion"; // 'motion/react' থেকে 'framer-motion' এ পরিবর্তন করা সাজেস্টেড
import { cn } from "@/lib/utils";

export const ThreeDMarquee = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const chunkSize = Math.ceil(images.length / 4);

  const chunks = Array.from({ length: 4 }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    return images.slice(start, start + chunkSize);
  });

  return (
    <div
      className={cn(
        // relative এবং মেইন স্ক্রিন সাইজ নিশ্চিত করা হলো
        "relative w-full h-screen min-h-screen overflow-hidden bg-background",
        className,
      )}>
      {/* ভেতরের কন্টেইনারকে ফ্লেক্স দিয়ে একদম সেন্টারে ফিট করা হলো */}
      <div className="flex w-full h-full items-center justify-center">
        {/* এখানে ফিক্সড ১৮০০ পিক্সেল বাদ দিয়ে স্ক্রিনের সাপেক্ষে উইথ-হাইট দেওয়া হয়েছে */}
        <div className="w-[120vw] h-[120vh] min-w-[1200px] min-h-[1200px] flex-shrink-0">
          <div
            style={{
              // রোটেশনের কারণে স্ক্রিনের সাইড কেটে যাওয়া ঠেকাতে scale(1.2) বা তার বেশি ব্যবহার করতে পারেন
              transform: "rotateX(55deg) rotateZ(-45deg) scale(1.2)",
            }}
            className="
              grid
              h-full
              w-full
              grid-cols-4
              gap-8
              transform-3d
              origin-center
            ">
            {chunks.map((subarray, colIndex) => (
              <motion.div
                key={colIndex}
                animate={{
                  y: colIndex % 2 === 0 ? 120 : -120,
                }}
                transition={{
                  duration: colIndex % 2 === 0 ? 10 : 15,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear",
                }}
                className="relative flex flex-col gap-8">
                <GridLineVertical className="-left-4" offset="80px" />

                {subarray.map((image, imageIndex) => (
                  <div key={`${image}-${imageIndex}`} className="relative">
                    <GridLineHorizontal className="-top-4" offset="20px" />

                    <motion.img
                      src={image}
                      alt={`Image ${imageIndex + 1}`}
                      whileHover={{
                        y: -10,
                        scale: 1.02,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="
                        w-full
                        rounded-xl
                        object-cover
                        shadow-lg
                        ring-1
                        ring-black/5
                      "
                    />
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Grid Components (No Changes Needed Here) ──────────────── */

const GridLineHorizontal = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0,0,0,0.15)",
          "--height": "1px",
          "--width": "5px",
          "--fade-stop": "90%",
          "--offset": offset || "200px",
          "--color-dark": "rgba(255,255,255,0.15)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        `
        absolute
        left-[calc(var(--offset)/2*-1)]
        h-[var(--height)]
        w-[calc(100%+var(--offset))]
        z-30
        bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]
        [background-size:var(--width)_var(--height)]
        [mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),linear-gradient(black,black)]
        [mask-composite:exclude]
        dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]
      `,
        className,
      )}
    />
  );
};

const GridLineVertical = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0,0,0,0.15)",
          "--height": "5px",
          "--width": "1px",
          "--fade-stop": "90%",
          "--offset": offset || "150px",
          "--color-dark": "rgba(255,255,255,0.15)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        `
        absolute
        top-[calc(var(--offset)/2*-1)]
        h-[calc(100%+var(--offset))]
        w-[var(--width)]
        z-30
        bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]
        [background-size:var(--width)_var(--height)]
        [mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),linear-gradient(black,black)]
        [mask-composite:exclude]
        dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]
      `,
        className,
      )}
    />
  );
};
