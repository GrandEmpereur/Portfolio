import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { CustomEase } from "gsap/CustomEase";
import { CustomBounce } from "gsap/CustomBounce";
import { CustomWiggle } from "gsap/CustomWiggle";
import { RoughEase, ExpoScaleEase, SlowMo } from "gsap/EasePack";

import { Draggable } from "gsap/all";
import { DrawSVGPlugin } from "gsap/all";
import { EaselPlugin } from "gsap/all";
import { Flip } from "gsap/all";
import { GSDevTools } from "gsap/all";
import { InertiaPlugin } from "gsap/all";
import { MotionPathHelper } from "gsap/all";
import { MotionPathPlugin } from "gsap/all";
import { MorphSVGPlugin } from "gsap/all";
import { Observer } from "gsap/all";
import { Physics2DPlugin } from "gsap/all";
import { PhysicsPropsPlugin } from "gsap/all";
import { PixiPlugin } from "gsap/all";
import { ScrambleTextPlugin } from "gsap/all";
import { ScrollTrigger } from "gsap/all";
import { ScrollSmoother } from "gsap/all";
import { ScrollToPlugin } from "gsap/all";
import { SplitText } from "gsap/all";
import { TextPlugin } from "gsap/all";

// Enregistrer tous les plugins GSAP premium
gsap.registerPlugin(
    useGSAP,
    Draggable,
    DrawSVGPlugin,
    EaselPlugin,
    Flip,
    GSDevTools,
    InertiaPlugin,
    MotionPathHelper,
    MotionPathPlugin,
    MorphSVGPlugin,
    Observer,
    Physics2DPlugin,
    PhysicsPropsPlugin,
    PixiPlugin,
    ScrambleTextPlugin,
    ScrollTrigger,
    ScrollSmoother,
    ScrollToPlugin,
    SplitText,
    TextPlugin,
    RoughEase,
    ExpoScaleEase,
    SlowMo,
    CustomEase,
    CustomBounce,
    CustomWiggle
);

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

// Exporter tous les plugins utiles
export {
    gsap,
    useGSAP,
    ScrollTrigger,
    ScrollSmoother,
    SplitText,
    Flip,
    Draggable,
    Observer,
    ScrollToPlugin,
    DrawSVGPlugin,
    MorphSVGPlugin,
    MotionPathPlugin,
    TextPlugin,
    ScrambleTextPlugin,
    CustomEase,
    CustomBounce,
    CustomWiggle,
    RoughEase,
    ExpoScaleEase,
    SlowMo,
    GSDevTools,
    InertiaPlugin,
};

// Export par défaut pour faciliter l'import
export default gsap;

