import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DispatchContext } from "../store/store";

const ScrollTriggerWrapper = ({ children }: any) => {
    const location = useLocation();

    useEffect(() => {
        // Reset the body height on route change
        document.body.style.height = "auto";

        // Kill ScrollTrigger instances and markers when the component unmounts
        return () => {
            gsap.registerPlugin(ScrollTrigger);
            ScrollTrigger.getAll().forEach((trigger) => {
                trigger.kill();
            });
        };
    }, [location]);

    return <>{children}</>;
};

export default ScrollTriggerWrapper;
