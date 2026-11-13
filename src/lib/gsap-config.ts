import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Not "gsap/SplitText": in gsap 3.14.1 that build turns `[...segmenter.segment(word)]` into
// `[].concat(...)`, which yields one empty character per word, so every title split by chars
// renders blank. The source build keeps the real spread. Re-check when gsap is upgraded.
import { SplitText } from "gsap/src/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

// Register only the plugins that are actually used in the codebase
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, CustomEase, ScrambleTextPlugin);

if (typeof window !== "undefined") {
    // Site-wide eases (names mirrored by EASE in @/lib/motion)
    CustomEase.create("pb", ".2,.75,.2,1");
    CustomEase.create("pbInOut", ".7,0,.2,1");

    // No `limitCallbacks: true` here. With it, a trigger that is passed in one jump (anchor link,
    // scroll position restored after a reload, End key) fires no callback at all, and `once` then
    // removes it: every reveal above the landing point would stay invisible for good.
    ScrollTrigger.config({
        ignoreMobileResize: true,
    });

    ScrollTrigger.defaults({
        invalidateOnRefresh: true,
        anticipatePin: 1,
        markers: false,
    });

    // Refresh ScrollTrigger après un changement de taille avec debounce
    let resizeTimer: NodeJS.Timeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 250);
    });
}

export { gsap, useGSAP, ScrollTrigger, SplitText, CustomEase, ScrambleTextPlugin };

export default gsap;

