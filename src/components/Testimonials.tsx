import Image from "next/image";

export default function Testimonials() {
  return (
    <>
      <section className="relative overflow-hidden py-pagebuilder" id="about">
        {/*$!*/}
        <template data-dgst="BAILOUT_TO_CLIENT_SIDE_RENDERING"></template>
        <div className="min-h-96 w-full" />
        {/*/$*/}
      </section>
      <section className="dark:mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] mask-[linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] py-pagebuilder">
        <h2
          className="relative z-2 mx-auto mb-pagebuilder max-w-xl text-balance font-medium text-5xl tracking-tight max-sm:px-5 sm:text-5xl md:text-6xl text-center"
          style={{
            textShadow:
              "0px 4px 8px rgba(255,255,255,.05),0px 8px 30px rgba(255,255,255,.20)",
          }}
        >
          <p className="mb-4 font-mono font-normal text-black/80 text-xs uppercase tracking-widest dark:text-white/70">
            TESTIMONIALS
          </p>
          <span className="inline-block font-instrument-serif">
            Word on the street{" "}
            <span
              className="px-1 pb-1 text-shadow-none italic animate-gradient-x text-colorfull"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, black 70%, transparent 100%)",
                WebkitMaskSize: "0% 100%",
                WebkitMaskPosition: "left",
                WebkitMaskRepeat: "no-repeat",
              }}
            >
              about me
            </span>
          </span>
        </h2>
        <div className="relative">
          <div className="w-full cursor-grab active:cursor-grabbing">
            <div className="overflow-hidden">
              <div className="flex">
                <div className="shrink-0">
                  <article className="dark relative flex w-[300px] select-none flex-col justify-between overflow-hidden rounded-xl bg-black p-4 antialiased shadow-border sm:p-5 md:w-[340px] md:rounded-2xl lg:p-6 bg-[radial-gradient(94.21%_78.4%_at_50%_29.91%,rgba(39,61,180,0.7),rgba(15,9,38,0.4))] mx-1 h-full sm:mx-2">
                    <blockquote>
                      <p className="mb-3 font-bluu font-bold text-lg text-white/95 tracking-wide md:text-lg">
                        Went from Figma to production in 11 days
                      </p>
                      <p className="mb-3 line-clamp-9 font-extralight text-base text-white/85 tracking-tight md:line-clamp-10">
                        We'd been sitting on designs for two months because our
                        last dev kept pushing timelines. Aayush had a staging
                        link in 4 days and we were live in 11. The site loads in
                        under a second and our bounce rate dropped 35% the first
                        week. Wish we'd found him sooner.
                      </p>
                    </blockquote>
                    <footer className="mt-1 flex items-center gap-3">
                      <img
                        alt="Marcus T."
                        loading="lazy"
                        width={56}
                        height={56}
                        decoding="async"
                        data-nimg={1}
                        className="size-11 rounded-full"
                        style={{ color: "transparent" }}
                        srcSet="/images/image_61.jpg 1x, /images/image_14.jpg 2x"
                        src="/images/image_14.jpg"
                      />
                      <div>
                        <cite className="font-medium text-base text-white/95 not-italic tracking-wide sm:text-lg">
                          Marcus T.
                        </cite>
                        <p className="text-white/80 text-xs sm:text-sm">
                          Marketing Director, SaaS startup
                        </p>
                      </div>
                    </footer>
                  </article>
                </div>
                <div className="shrink-0">
                  <article className="dark relative flex w-[300px] select-none flex-col justify-between overflow-hidden rounded-xl bg-black p-4 antialiased shadow-border sm:p-5 md:w-[340px] md:rounded-2xl lg:p-6 bg-[radial-gradient(84.35%_70.19%_at_50%_38.11%,rgba(2,96,101,0.57),rgba(5,136,178,0.06))] mx-1 h-full sm:mx-2">
                    <blockquote>
                      <p className="mb-3 font-bluu font-bold text-lg text-white/95 tracking-wide md:text-lg">
                        Finally a developer who actually listens
                      </p>
                      <p className="mb-3 line-clamp-9 font-extralight text-base text-white/85 tracking-tight md:line-clamp-10">
                        I'm not technical at all, and past devs made me feel
                        stupid for asking questions. Aayush sent Loom
                        walkthroughs after every milestone so I always knew
                        exactly where things stood. When I changed my mind about
                        the checkout flow halfway through, he didn't push back —
                        just adjusted and shipped it better than what I
                        originally asked for.
                      </p>
                    </blockquote>
                    <footer className="mt-1 flex items-center gap-3">
                      <img
                        alt="Lauren K."
                        loading="lazy"
                        width={56}
                        height={56}
                        decoding="async"
                        data-nimg={1}
                        className="size-11 rounded-full"
                        style={{ color: "transparent" }}
                        srcSet="/images/image_72.jpg 1x, /images/image_6.jpg 2x"
                        src="/images/image_6.jpg"
                      />
                      <div>
                        <cite className="font-medium text-base text-white/95 not-italic tracking-wide sm:text-lg">
                          Lauren K.
                        </cite>
                        <p className="text-white/80 text-xs sm:text-sm">
                          Founder, DTC skincare brand
                        </p>
                      </div>
                    </footer>
                  </article>
                </div>
                <div className="shrink-0">
                  <article className="dark relative flex w-[300px] select-none flex-col justify-between overflow-hidden rounded-xl bg-black p-4 antialiased shadow-border sm:p-5 md:w-[340px] md:rounded-2xl lg:p-6 bg-[radial-gradient(86.88%_75.47%_at_50%_24.53%,rgba(82,48,145,0.7),rgba(26,11,51,0.14))] mx-1 h-full sm:mx-2">
                    <blockquote>
                      <p className="mb-3 font-bluu font-bold text-lg text-white/95 tracking-wide md:text-lg">
                        Our Core Web Vitals went from red to green overnight
                      </p>
                      <p className="mb-3 line-clamp-9 font-extralight text-base text-white/85 tracking-tight md:line-clamp-10">
                        We hired Aayush to rebuild our marketing site on
                        Next.js. The old WordPress site was scoring 38 on
                        PageSpeed. His build scores 97. He set up the CMS
                        integration so our content team can publish without
                        touching code. Solid architecture, clean codebase — the
                        kind of work I'd expect from a senior engineer.
                      </p>
                    </blockquote>
                    <footer className="mt-1 flex items-center gap-3">
                      <img
                        alt="Daniel R."
                        loading="lazy"
                        width={56}
                        height={56}
                        decoding="async"
                        data-nimg={1}
                        className="size-11 rounded-full"
                        style={{ color: "transparent" }}
                        srcSet="/images/image_56.jpg 1x, /images/image_16.jpg 2x"
                        src="/images/image_16.jpg"
                      />
                      <div>
                        <cite className="font-medium text-base text-white/95 not-italic tracking-wide sm:text-lg">
                          Daniel R.
                        </cite>
                        <p className="text-white/80 text-xs sm:text-sm">
                          CTO, fintech startup
                        </p>
                      </div>
                    </footer>
                  </article>
                </div>
                <div className="shrink-0">
                  <article className="dark relative flex w-[300px] select-none flex-col justify-between overflow-hidden rounded-xl bg-black p-4 antialiased shadow-border sm:p-5 md:w-[340px] md:rounded-2xl lg:p-6 bg-[radial-gradient(90.35%_49.25%_at_50%_59.06%,rgba(2,61,114,0.7),rgba(5,11,28,0.42))] mx-1 h-full sm:mx-2">
                    <blockquote>
                      <p className="mb-3 font-bluu font-bold text-lg text-white/95 tracking-wide md:text-lg">
                        He caught problems we didn't even know we had
                      </p>
                      <p className="mb-3 line-clamp-9 font-extralight text-base text-white/85 tracking-tight md:line-clamp-10">
                        We hired him to redesign our product pages. During the
                        build he noticed our image pipeline was serving
                        uncompressed files and our mobile nav was broken on
                        Safari. Fixed both without being asked. That's the kind
                        of developer you want — someone who cares about the
                        whole product, not just their ticket.
                      </p>
                    </blockquote>
                    <footer className="mt-1 flex items-center gap-3">
                      <img
                        alt="James L."
                        loading="lazy"
                        width={56}
                        height={56}
                        decoding="async"
                        data-nimg={1}
                        className="size-11 rounded-full"
                        style={{ color: "transparent" }}
                        srcSet="/images/image_73.jpg 1x, /images/image_12.jpg 2x"
                        src="/images/image_12.jpg"
                      />
                      <div>
                        <cite className="font-medium text-base text-white/95 not-italic tracking-wide sm:text-lg">
                          James L.
                        </cite>
                        <p className="text-white/80 text-xs sm:text-sm">
                          Co-founder, e-commerce brand
                        </p>
                      </div>
                    </footer>
                  </article>
                </div>
                <div className="shrink-0">
                  <article className="dark relative flex w-[300px] select-none flex-col justify-between overflow-hidden rounded-xl bg-black p-4 antialiased shadow-border sm:p-5 md:w-[340px] md:rounded-2xl lg:p-6 bg-[radial-gradient(126.42%_76.6%_at_50%_32.26%,rgba(84,95,102,0.7),rgba(0,36,69,0.13))] mx-1 h-full sm:mx-2">
                    <blockquote>
                      <p className="mb-3 font-bluu font-bold text-lg text-white/95 tracking-wide md:text-lg">
                        He turned our messy brief into something beautiful
                      </p>
                      <p className="mb-3 line-clamp-9 font-extralight text-base text-white/85 tracking-tight md:line-clamp-10">
                        We gave Aayush a mood board and some rough wireframes —
                        honestly, they were half-baked. He came back with a
                        prototype that was cleaner and more thoughtful than what
                        we'd imagined. The animations feel intentional, the
                        typography is perfect, and three clients have asked us
                        who built it.
                      </p>
                    </blockquote>
                    <footer className="mt-1 flex items-center gap-3">
                      <img
                        alt="Sofia M."
                        loading="lazy"
                        width={56}
                        height={56}
                        decoding="async"
                        data-nimg={1}
                        className="size-11 rounded-full"
                        style={{ color: "transparent" }}
                        srcSet="/images/image_64.jpg 1x, /images/image_9.jpg 2x"
                        src="/images/image_9.jpg"
                      />
                      <div>
                        <cite className="font-medium text-base text-white/95 not-italic tracking-wide sm:text-lg">
                          Sofia M.
                        </cite>
                        <p className="text-white/80 text-xs sm:text-sm">
                          Creative Director, branding agency
                        </p>
                      </div>
                    </footer>
                  </article>
                </div>
                <div className="shrink-0">
                  <article className="dark relative flex w-[300px] select-none flex-col justify-between overflow-hidden rounded-xl bg-black p-4 antialiased shadow-border sm:p-5 md:w-[340px] md:rounded-2xl lg:p-6 bg-[radial-gradient(99.74%_100%_at_50%_0%,rgba(74,21,75,0.7),rgba(29,5,29,0.42))] mx-1 h-full sm:mx-2">
                    <blockquote>
                      <p className="mb-3 font-bluu font-bold text-lg text-white/95 tracking-wide md:text-lg">
                        We've shipped 4 projects together now
                      </p>
                      <p className="mb-3 line-clamp-9 font-extralight text-base text-white/85 tracking-tight md:line-clamp-10">
                        First project was a simple landing page. Then he rebuilt
                        our client portal, added a blog with headless CMS, and
                        just finished an analytics dashboard. Every project is
                        ahead of schedule. He's basically our dev team at this
                        point. If you're a small agency that needs a reliable
                        build partner, stop looking.
                      </p>
                    </blockquote>
                    <footer className="mt-1 flex items-center gap-3">
                      <img
                        alt="Ryan H."
                        loading="lazy"
                        width={56}
                        height={56}
                        decoding="async"
                        data-nimg={1}
                        className="size-11 rounded-full"
                        style={{ color: "transparent" }}
                        srcSet="/images/image_75.jpg 1x, /images/image_13.jpg 2x"
                        src="/images/image_13.jpg"
                      />
                      <div>
                        <cite className="font-medium text-base text-white/95 not-italic tracking-wide sm:text-lg">
                          Ryan H.
                        </cite>
                        <p className="text-white/80 text-xs sm:text-sm">
                          Founder, B2B agency
                        </p>
                      </div>
                    </footer>
                  </article>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 px-4 sticky bottom-4 z-20 mt-8">
            <div
              className="pasito-container carousel-stepper"
              role="tablist"
              aria-label="Progress steps"
              style={{ "--pillDuration": "500ms" } as React.CSSProperties}
            >
              <div className="pasito-track" style={{ transform: "none" }}>
                <button
                  className="pasito-step pasito-step-active"
                  style={
                    {
                      "--pillDuration": "500ms",
                    } as React.CSSProperties
                  }
                  role="tab"
                  aria-selected="true"
                  aria-label="Step 1"
                  tabIndex={0}
                />
                <button
                  className="pasito-step"
                  style={
                    {
                      "--pillDuration": "500ms",
                    } as React.CSSProperties
                  }
                  role="tab"
                  aria-selected="false"
                  aria-label="Step 2"
                  tabIndex={-1}
                />
                <button
                  className="pasito-step"
                  style={
                    {
                      "--pillDuration": "500ms",
                    } as React.CSSProperties
                  }
                  role="tab"
                  aria-selected="false"
                  aria-label="Step 3"
                  tabIndex={-1}
                />
                <button
                  className="pasito-step"
                  style={
                    {
                      "--pillDuration": "500ms",
                    } as React.CSSProperties
                  }
                  role="tab"
                  aria-selected="false"
                  aria-label="Step 4"
                  tabIndex={-1}
                />
                <button
                  className="pasito-step"
                  style={
                    {
                      "--pillDuration": "500ms",
                    } as React.CSSProperties
                  }
                  role="tab"
                  aria-selected="false"
                  aria-label="Step 5"
                  tabIndex={-1}
                />
                <button
                  className="pasito-step"
                  style={
                    {
                      "--pillDuration": "500ms",
                    } as React.CSSProperties
                  }
                  role="tab"
                  aria-selected="false"
                  aria-label="Step 6"
                  tabIndex={-1}
                />
              </div>
            </div>
            <button
              aria-label="Play autoplay"
              className="group flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/70 text-black backdrop-blur-md backdrop-saturate-150 transition-transform duration-150 ease-out active:scale-[0.97] dark:bg-white/10 dark:text-white"
              type="button"
            >
              <span
                className="flex items-center justify-center"
                style={{
                  opacity: 1,
                  filter: "blur(0px)",
                  transform: "none",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  className="size-4 transition-transform duration-150 ease-out group-hover:scale-110"
                >
                  <path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
