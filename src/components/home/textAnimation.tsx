import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect, useLayoutEffect, useRef } from "react";
gsap.registerPlugin(ScrollTrigger);

interface TextAnimationProps {
	string: string;
	heading: "p" | 1 | 2 | 3 | 4 | 5 | 6;
	clip?: boolean;
	classes?: string;
}
//Clip determines whether clipped to right or from bottom
const TextAnimation: React.FC<TextAnimationProps> = ({
	string,
	heading,
	clip,
	classes,
}) => {
	const CustomTag = heading === "p" ? "p" : `h${heading}`;
	const customTagRef = useRef<HTMLElement>(null);
	const parentRef = useRef<HTMLDivElement>(null);
	useLayoutEffect(() => {
		if (customTagRef.current && parentRef.current) {
			if (clip) {
				gsap.fromTo(
					parentRef.current,
					{ y: 50 },
					{
						y: 0,
						scrollTrigger: {
							start: "top 80%",
							trigger: parentRef.current,
							end: "bottom 80%",
							scrub: 1,
							refreshPriority: -1,
						},
					}
				);
				gsap.fromTo(
					customTagRef.current,
					{ clipPath: "inset(0% 100% 0% 0)" },
					{
						clipPath: "inset(0% 0% 0% 0)",
						scrollTrigger: {
							start: "top 80%",
							trigger: parentRef.current,
							end: "bottom 80%",
							scrub: 1,
							refreshPriority: -1,
						},
					}
				);
			} else {
				gsap.set(customTagRef.current, {
					y: "100%",
					clipPath: "inset(0% 0% 100% 0)",
				});
				gsap.to(customTagRef.current, {
					y: "0",
					clipPath: "inset(0% 0% 0% 0)",
					scrollTrigger: {
						start: "top 80%",
						trigger: parentRef.current,
						end: "top 40%",
						scrub: 1,
						refreshPriority: -1,
					},
				});
			}
		}
	}, []);

	const customTagProps: React.HTMLProps<HTMLElement> = {
		ref: customTagRef,
		className: classes?.includes("items-end") ? "w-full lg:w-1/2" : "",
	};

	return (
		<div ref={parentRef} className={classes}>
			<CustomTag {...customTagProps}>{string}</CustomTag>
		</div>
	);
};

export default TextAnimation;
