import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useLayoutEffect, useRef } from "react";

const Image = React.forwardRef(({ i, item }: any, ref: any) => {
    const elementRef: any = useRef(null);
    const imageRef: any = useRef(null);
    const num = i % 2 === 1 || i % 7 === 6 ? 100 : -100;
    useLayoutEffect(() => {
        console.log("layout effect");
        const ctx = gsap.context(() => {
            console.log("ctx", elementRef.current, ref.current);
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
                            markers: true,
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

const Gallery = ({ data }: any) => {
    const parentRef: any = useRef(null);
    const images = ["", "", "", "", "", "", ""];
    console.log(data);
    return (
        <div
            ref={parentRef}
            className="relative w-full overflow-hidden b-gallery my-80"
        >
            <div className="b-gallery__inner grid  grid-rows-2 gap-[30px] h-[80vh] lg:h-[90vh] relative -ml-[70vw] w-[240vw] sm:-ml-[40vw] sm:w-[180vw] lg:-ml-[10vw]  lg:w-[120vw] lg:max-w-[120vw]">
                {data.map((item: any, i: number) => {
                    return (
                        <Image
                            item={item}
                            key={"image" + i}
                            ref={parentRef}
                            i={i}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Gallery;
