import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useLayoutEffect, useRef } from "react";

const Image = ({ half, image }: any) => {
    const parentRef: any = useRef(null);
    const imageRef: any = useRef(null);
    const containerRef: any = useRef(null);
    useLayoutEffect(() => {
        if (imageRef.current && parentRef.current) {
            gsap.fromTo(
                imageRef.current,
                { scale: 1.1 },
                {
                    scale: 1,
                    scrollTrigger: {
                        trigger: parentRef.current,
                        start: "0% 100%",
                        end: "0% 75%",
                        scrub: 1,
                    },
                }
            );
            gsap.fromTo(
                imageRef.current,
                { y: 0 },
                {
                    y: "-20%",

                    scrollTrigger: {
                        trigger: parentRef.current,
                        start: "0% 80%",
                        end: "100% 0%",
                        scrub: 1,
                    },
                }
            );
        }
        if (half && containerRef.current) {
            const mm = gsap.matchMedia();
            mm.add("(min-width: 1024px)", (context: any) => {
                gsap.fromTo(
                    containerRef.current,
                    { y: 50 },
                    {
                        y: 0,
                        scrollTrigger: {
                            trigger: parentRef.current,
                            start: "0% 80%",
                            end: "0% 40%",
                            scrub: 1,
                        },
                    }
                );
            });
        }
    }, []);
    return (
        <div ref={parentRef} className={half ? "w-full lg:w-[60%]" : "w-full"}>
            <div
                ref={containerRef}
                className="w-full h-[50vh] lg:h-[500px] overflow-hidden relative"
            >
                <img
                    className="w-full h-[70vh] lg:h-[120%] absolute top-0 object-cover"
                    height={600}
                    alt={image.alt}
                    ref={imageRef}
                    src={image.url}
                />
            </div>
        </div>
    );
};

export default Image;
