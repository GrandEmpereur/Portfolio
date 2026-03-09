import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Register only the plugins that are actually used in the codebase
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, CustomEase);

if (typeof window !== "undefined") {
    // Configuration globale optimisée pour ScrollTrigger
    ScrollTrigger.config({
        limitCallbacks: true,
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

export { gsap, useGSAP, ScrollTrigger, SplitText, CustomEase };

export default gsap;

