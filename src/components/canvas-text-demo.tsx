import { cn } from "@/lib/utils";
import { CanvasText } from "@/components/ui/canvas-text";

export default function CanvasTextRashedulIslam() {
  return (
    <h2
      className={cn(
        "group relative text-5xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl  uppercase mb-1 sm:mb-2",
      )}>
      <CanvasText
        text="Rashedul Islam"
        backgroundClassName="bg-blue-600 dark:bg-blue-700 "
        colors={[
          "rgba(0, 153, 255, 1)",
          "rgba(0, 153, 255, 0.9)",
          "rgba(0, 153, 255, 0.8)",
          "rgba(0, 153, 255, 0.7)",
          "rgba(0, 153, 255, 0.6)",
          "rgba(0, 153, 255, 0.5)",
          "rgba(0, 153, 255, 0.4)",
          "rgba(0, 153, 255, 0.3)",
          "rgba(0, 153, 255, 0.2)",
          "rgba(0, 153, 255, 0.1)",
        ]}
        lineGap={4}
        animationDuration={20}
      />
    </h2>
  );
}
