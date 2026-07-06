"use client";
import Image from "next/image";

export default function Contact() {
  return (
    <>
      <section className="relative z-0 py-pagebuilder" id="contact">
        <div aria-hidden="true" className="w-full border-t" />
        <div className="relative w-full overflow-hidden rounded-2xl ring-1 ring-border">
          {/*$!*/}
          <template data-dgst="BAILOUT_TO_CLIENT_SIDE_RENDERING"></template>
          {/*/$*/}
          <div className="relative z-10 mx-auto flex w-full flex-col items-center justify-center gap-y-2 py-10 text-center">
            <div
              className="absolute z-50 cursor-grab overflow-hidden rounded-full top-10 left-1/2 -translate-x-1/2 lg:top-1/2 lg:left-1/2 lg:translate-x-[280px] lg:-translate-y-[70px]"
              tabIndex={0}
              style={{
                WebkitTouchCallout: "none",
                WebkitUserSelect: "none",
                userSelect: "none",
                touchAction: "none",
              }}
            >
              <div className="relative rounded-full bg-blue-700 p-1.5 font-medium leading-none">
                <div className="relative size-23.75 rounded-full bg-black p-2 text-white">
                  <div className="absolute top-1/2 left-1/2 size-20 -translate-x-1/2 -translate-y-1/2 rounded-full">
                    <svg
                      className="absolute inset-0 size-full"
                      overflow="visible"
                      viewBox="0 0 100 100"
                    >
                      <path
                        d="M 0 50 L 0 50 A 1 1 0 0 1 100 50 L 100 50 L 100 50 A 1 1 0 0 1 0 50 L 0 50"
                        fill="transparent"
                        id="_R_hil1lb_"
                      />
                      <text>
                        <textPath
                          dominantBaseline="hanging"
                          href="#_R_hil1lb_"
                          startOffset={0}
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            wordSpacing: 5,
                            letterSpacing: "2.1px",
                            fill: "currentColor",
                          }}
                        >
                          OPEN TO WORK · OPEN TO WORK ·
                        </textPath>
                      </text>
                    </svg>
                  </div>
                  <svg
                    height={24}
                    viewBox="0 0 24 24"
                    width={24}
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-1/2 left-1/2 size-10 -translate-x-1/2 -translate-y-1/2 rotate-45 fill-white text-white opacity-80 hidden lg:block"
                  >
                    <path d="M12 1C12 1 12 8 10 10C8 12 1 12 1 12C1 12 8 12 10 14C12 16 12 23 12 23C12 23 12 16 14 14C16 12 23 12 23 12C23 12 16 12 14 10C12 8 12 1 12 1Z" />
                  </svg>
                </div>
                <span className="sr-only">OPEN TO WORK · OPEN TO WORK ·</span>
              </div>
            </div>
            <div className="relative pointer-events-none">
              <Image
                alt="wings"
                aria-hidden="true"
                loading="lazy"
                width={338}
                height={110}
                className="select-none"
                style={{ color: "transparent" }}
                src="/images/wings.1kcr10vzfjw84.svg"
              />
              <svg
                viewBox="0 0 5350 5350"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-1/2 left-1/2 z-50 w-8 -translate-x-1/2 -translate-y-1/2 md:w-10 lg:invert dark:lg:invert-0"
              >
                <path
                  d="M265 4069c-70-20-71-59-4-197 29-59 78-161 109-227 32-66 85-178 119-248 77-159 167-347 236-492 29-60 81-168 115-240 34-71 79-166 100-210 21-44 62-132 93-195 30-63 101-212 157-330 240-504 311-652 373-780 35-74 101-210 145-303 90-186 96-193 186-184 58 5 76 23 124 121 341 693 462 946 462 968 0 10 3 18 8 18 4 0 17 19 29 42 27 52 229 469 288 593 23 50 88 182 143 295 55 113 165 340 245 505 80 165 188 389 241 499 53 109 103 214 112 235 18 44 11 91-17 117-20 18-41 19-303 19-281 0-281 0-344-29-110-51-132-84-347-521-106-214-303-613-437-886-135-273-251-499-257-503-19-12-39 11-73 83-17 36-85 176-151 311-66 135-134 277-152 315-18 39-65 138-105 220-82 169-166 344-250 520-153 323-181 373-230 419-73 68-112 76-369 75-119 0-229-5-246-10z"
                  fill="#fff"
                />
                <path
                  d="M3922 3999c-42-21-47-29-134-208-143-293-148-310-107-347 19-17 43-20 253-24 274-7 308-16 406-107 209-193 166-551-82-696-100-58-168-67-520-67-344 0-370-3-403-53-9-14-54-107-101-206-92-200-101-237-59-269 24-19 45-20 373-24 347-4 347-4 422-39 137-65 210-175 210-317 0-176-102-308-267-348-46-10-182-13-642-14-584 0-584 0-618-38-30-32-93-155-234-460-37-80-38-124-3-151 26-21 33-21 788-21 708 0 769 1 876 20 238 40 409 119 565 262 120 109 221 278 266 443 45 169 34 388-28 557-30 81-104 197-157 247-20 19-36 43-36 52 0 10 32 40 78 72 309 217 445 544 388 927-66 435-413 770-851 820-49 5-146 10-215 10-108 0-131-3-168-21z"
                  fill="#fff"
                />
              </svg>
            </div>
            <span className="mt-4 font-light text-2xl text-black tracking-wide sm:text-4xl lg:text-5xl dark:text-white">
              <h3 className="text-nowrap">
                FROM CONCEPT TO <span className="font-extrabold">CREATION</span>
              </h3>
              <h3 className="mt-3 text-nowrap">
                LET&apos;S MAKE IT{/* */}{" "}
                <span className="font-extrabold">HAPPEN!</span>
              </h3>
            </span>
            <div style={{ transform: "none" }}>
              <button  onClick={() => window.dispatchEvent(new CustomEvent('open-modal', { detail: { view: 'contact' } }))}
               className="group relative inline-flex w-fit cursor-pointer items-center justify-between overflow-hidden rounded-full border border-black/30 bg-black/20 py-1 pr-1 pl-3 font-medium text-base opacity-85 backdrop-blur-xs transition-all duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:border-black/50 hover:bg-black hover:opacity-100 hover:shadow-black/20 hover:shadow-lg active:scale-[0.98] dark:border-white/10 dark:bg-white/10 dark:hover:border-white/30 dark:hover:bg-white dark:hover:shadow-white/20 my-10 max-md:scale-110 md:hover:scale-125">
                <span className="z-10 px-3 text-black transition-colors duration-450 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:text-white dark:text-white dark:group-hover:text-black">
                  Get In Touch
                </span>
                <span
                  aria-hidden="true"
                  className="absolute inset-y-1 right-1 w-10 rounded-full bg-black transition-[width] duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:w-[calc(100%-8px)] dark:bg-white"
                />
                <span className="z-10 flex items-center justify-center overflow-hidden rounded-full bg-black p-2.5 transition-colors duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:bg-transparent dark:bg-white">
                  <svg
                    fill="none"
                    height={24}
                    viewBox="0 0 24 24"
                    width={24}
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-[18px] text-white transition-all duration-400 group-hover:translate-x-6 group-hover:opacity-0 dark:text-black ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                  >
                    <path
                      d="M18.5 12L4.99997 12"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <svg
                    fill="none"
                    height={24}
                    viewBox="0 0 24 24"
                    width={24}
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute size-[18px] -translate-x-6 text-white opacity-0 transition-all delay-75 duration-400 group-hover:translate-x-0 group-hover:opacity-100 dark:text-black ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                  >
                    <path
                      d="M18.5 12L4.99997 12"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                </span>
              </button>
            </div>
            <p className="font-semibold text-base lg:text-2xl">
              I&apos;m available for full-time roles &amp; freelance projects.
            </p>
            <p className="my-2 text-balance font-extralight text-sm tracking-wide opacity-75 lg:text-xl">
              I thrive on crafting dynamic web applications, and
              <br />
              delivering seamless user experiences.
            </p>
          </div>
        </div>
        <span className="absolute bottom-6 left-8">
          <svg
            fill="none"
            height={14}
            viewBox="0 0 24 14"
            width={24}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.827592 6.88352V6.01349C1.39104 6.01349 1.7838 5.89915 2.00586 5.67045C2.23124 5.43845 2.34393 5.06226 2.34393 4.5419V3.27415C2.34393 2.71401 2.41353 2.25497 2.55273 1.89702C2.69525 1.53906 2.9024 1.26065 3.17418 1.06179C3.44596 0.862926 3.7774 0.725378 4.1685 0.649147C4.5596 0.569602 5.00373 0.52983 5.50089 0.52983V1.91193C5.10979 1.91193 4.80984 1.96662 4.60103 2.07599C4.39222 2.18205 4.24805 2.34612 4.1685 2.56818C4.09227 2.79025 4.05415 3.07363 4.05415 3.41832V5.04901C4.05415 5.30421 4.01107 5.54285 3.92489 5.76491C3.83872 5.98698 3.68129 6.18253 3.45259 6.35156C3.2239 6.51728 2.89743 6.6482 2.47319 6.74432C2.05226 6.83712 1.50373 6.88352 0.827592 6.88352ZM5.50089 13.1626C5.00373 13.1626 4.5596 13.1229 4.1685 13.0433C3.7774 12.9671 3.44596 12.8295 3.17418 12.6307C2.9024 12.4318 2.69525 12.1534 2.55273 11.7955C2.41353 11.4375 2.34393 10.9785 2.34393 10.4183V9.15554C2.34393 8.63518 2.23124 8.26065 2.00586 8.03196C1.7838 7.79995 1.39104 7.68395 0.827592 7.68395V6.81392C1.50373 6.81392 2.05226 6.86198 2.47319 6.9581C2.89743 7.0509 3.2239 7.18182 3.45259 7.35085C3.68129 7.51657 3.83872 7.71046 3.92489 7.93253C4.01107 8.15459 4.05415 8.39157 4.05415 8.64347V10.2741C4.05415 10.6188 4.09227 10.9022 4.1685 11.1243C4.24805 11.3464 4.39222 11.5121 4.60103 11.6214C4.80984 11.7308 5.10979 11.7855 5.50089 11.7855V13.1626ZM0.827592 7.68395V6.01349H2.40359V7.68395H0.827592ZM14.4286 0.340908L11.1474 12.5312H9.57138L12.8526 0.340908H14.4286ZM23.1712 6.81392V7.68395C22.6077 7.68395 22.2133 7.79995 21.9879 8.03196C21.7659 8.26065 21.6548 8.63518 21.6548 9.15554V10.4183C21.6548 10.9785 21.5836 11.4375 21.4411 11.7955C21.3018 12.1534 21.0964 12.4318 20.8246 12.6307C20.5528 12.8295 20.2214 12.9671 19.8303 13.0433C19.4392 13.1229 18.995 13.1626 18.4979 13.1626V11.7855C18.889 11.7855 19.1889 11.7308 19.3977 11.6214C19.6065 11.5121 19.7491 11.3464 19.8253 11.1243C19.9048 10.9022 19.9446 10.6188 19.9446 10.2741V8.64347C19.9446 8.39157 19.9877 8.15459 20.0739 7.93253C20.16 7.71046 20.3175 7.51657 20.5462 7.35085C20.7749 7.18182 21.0997 7.0509 21.5206 6.9581C21.9448 6.86198 22.495 6.81392 23.1712 6.81392ZM18.4979 0.52983C18.995 0.52983 19.4392 0.569602 19.8303 0.649147C20.2214 0.725378 20.5528 0.862926 20.8246 1.06179C21.0964 1.26065 21.3018 1.53906 21.4411 1.89702C21.5836 2.25497 21.6548 2.71401 21.6548 3.27415V4.5419C21.6548 5.06226 21.7659 5.43845 21.9879 5.67045C22.2133 5.89915 22.6077 6.01349 23.1712 6.01349V6.88352C22.495 6.88352 21.9448 6.83712 21.5206 6.74432C21.0997 6.6482 20.7749 6.51728 20.5462 6.35156C20.3175 6.18253 20.16 5.98698 20.0739 5.76491C19.9877 5.54285 19.9446 5.30421 19.9446 5.04901V3.41832C19.9446 3.07363 19.9048 2.79025 19.8253 2.56818C19.7491 2.34612 19.6065 2.18205 19.3977 2.07599C19.1889 1.96662 18.889 1.91193 18.4979 1.91193V0.52983ZM23.1712 6.01349V7.68395H21.5952V6.01349H23.1712Z"
              fill="#A5AEB8"
              opacity="0.24"
            />
          </svg>
        </span>
        <span className="absolute right-8 bottom-6">
          <svg
            fill="none"
            height={8}
            viewBox="0 0 24 8"
            width={24}
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_i_185_3210)">
              <rect
                className="fill-[#EDEEF2] dark:fill-[#1b1c1f]"
                height={8}
                rx={1}
                width={24}
              />
            </g>
            <defs>
              <filter
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
                height="9.5"
                id="filter0_i_185_3210"
                width={24}
                x={0}
                y={0}
              >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feBlend
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  mode="normal"
                  result="shape"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  result="hardAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset dy={2} />
                <feGaussianBlur stdDeviation="0.75" />
                <feComposite
                  in2="hardAlpha"
                  k2={-1}
                  k3={1}
                  operator="arithmetic"
                />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.647059 0 0 0 0 0.682353 0 0 0 0 0.721569 0 0 0 0.32 0"
                />
                <feBlend
                  in2="shape"
                  mode="normal"
                  result="effect1_innerShadow_185_3210"
                />
              </filter>
            </defs>
          </svg>
        </span>
        <div aria-hidden="true" className="w-full border-t" />
      </section>
    </>
  );
}
