import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useLayoutEffect, useEffect, useRef } from "react";

const GalleryImage = React.forwardRef(({ i, item }: any, ref: any) => {
    const elementRef: any = useRef(null);
    const imageRef: any = useRef(null);
    const num = i % 2 === 1 || i % 7 === 6 ? 100 : -100;
    useEffect(() => {
        const ctx = gsap.context(() => {
            if (elementRef.current && ref.current) {
                const grow = i % 7 === 2 ? true : false;
                gsap.fromTo(
                    elementRef.current,
                    { y: num },
                    {
                        y: 0,
                        scrollTrigger: {
                            start: "top 100%",
                            end: "top 0%",

                            scrub: 1,
                            trigger: ref.current,
                        },
                    }
                );
                if (grow) {
                    const mediaQuery: any = gsap.matchMedia();
                    mediaQuery.add(
                        {
                            mobile: "(max-width: 1024px)",
                            desktop: "(min-width: 1024px)",
                        },
                        (context: any) => {
                            const { mobile } = context.conditions;

                            gsap.to(imageRef.current, {
                                width: "100vw",
                                scrollTrigger: {
                                    start: () =>
                                        mobile ? "top 10%" : "top 5%",
                                    end: `top+=${window.innerHeight * 2} top`,
                                    // markers: true,
                                    scrub: 1,
                                    pin: ref.current,
                                    trigger: ref.current,
                                },
                            });
                        }
                    );
                }
            }
        });
        return () => ctx.revert();
    }, []);
    return (
        <div
            ref={elementRef}
            className={` b-gallery__image b-gallery__image--${
                num > 0 && "half"
            }`}
        >
            <div ref={imageRef}>
                <img src={item.url} />
            </div>
        </div>
    );
});
export default GalleryImage;
