import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useLayoutEffect, useRef } from "react";
import GalleryImage from "./galleryImage";

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
                        <GalleryImage
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
