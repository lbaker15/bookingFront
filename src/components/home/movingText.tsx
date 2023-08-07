import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";

const Child = ({ item, i }: any) => {
    gsap.registerPlugin(ScrollTrigger);
    const ref = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (ref.current) {
                const st = i % 2 === 0 ? -200 : 0;
                const end = i % 2 === 0 ? 0 : -200;
                const r = ref.current as any;

                gsap.fromTo(
                    ref.current,
                    { x: st },
                    {
                        x: end,
                        scrollTrigger: {
                            trigger: r.parentElement.parentElement,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1,
                        },
                    }
                );
            }
        });
        return () => ctx.revert();
    }, []);
    return (
        <div className="flex w-full py-10 text-6xl uppercase whitespace-pre border-t border-b border-pink dark:border-white-100 text-pink dark:text-white-100">
            <span className="w-full" ref={ref}>
                {item.text} {item.text}
            </span>
        </div>
    );
};
const MovingText = ({ data }: any) => {
    const text = data.acf.items_moving_text;

    return (
        <div className="py-20 pb-40 overflow-hidden">
            {text.map((item: any, i: number) => {
                return <Child key={"movingText" + i} item={item} i={i} />;
            })}
        </div>
    );
};
export default MovingText;
