import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { CustomEase } from "gsap/CustomEase";
import { CustomBounce } from "gsap/CustomBounce";
import { CustomWiggle } from "gsap/CustomWiggle";
import { RoughEase, ExpoScaleEase, SlowMo } from "gsap/EasePack";

import { Draggable } from "gsap/Draggable";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { EaselPlugin } from "gsap/EaselPlugin";
import { Flip } from "gsap/Flip";
import { GSDevTools } from "gsap/GSDevTools";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { MotionPathHelper } from "gsap/MotionPathHelper";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { Observer } from "gsap/Observer";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { PhysicsPropsPlugin } from "gsap/PhysicsPropsPlugin";
import { PixiPlugin } from "gsap/PixiPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";

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

