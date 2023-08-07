import gsap from "gsap";
import React, {
    useContext,
    createRef,
    useEffect,
    useRef,
    useTransition,
    useLayoutEffect,
    useCallback,
    useState,
} from "react";
import Burger from "./burger";
import { ScrollTrigger } from "gsap/all";
import { Context, DispatchContext, State } from "../../store/store";
import { Link, useLocation } from "react-router-dom";
import DarkMode from "./darkMode";
import Aside from "./aside";
import MenuItem from "./menuItem";
import useSWR from "swr";
import { fetcher } from "../home/swr";
import Logout from "./logout";

type GSAPTimelineType = gsap.core.Timeline & {};
gsap.registerPlugin(ScrollTrigger);
type Props = {};
const Header = ({}: Props) => {
    const location = useLocation();
    const { state }: State = useContext(Context);
    const { menuState, darkMode } = state;
    const [auth, setAuth] = useState("");
    const { data, error } = useSWR(
        "https://headless.local/wp-json/wp/v2/menus/header",
        fetcher
    );
    const refHeader = useRef(null);
    const line = useRef(null);

    const prevScrollY = useRef(0);
    const scrollDirection = useRef("");
    const loc = useRef(null);
    const tlRef = useRef<GSAPTimeline>();

    useEffect(() => {
        if (refHeader.current && line.current && loc.current && data) {
            const r = refHeader.current as any;
            const items = r.children;
            const tl = gsap.timeline({});

            tl.add("start");
            for (const item of items) {
                const link = item.children[0];
                tl.fromTo(link, { y: 0 }, { y: -50, duration: 0.4 }, "-=0.2");
            }
            tl.fromTo(
                line.current,
                { scaleX: 0 },
                { scaleX: 1, duration: 0.2 },
                "start"
            );
            tl.fromTo(
                loc.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.2 },
                "start+=0.2"
            );
            tlRef.current = tl;
            tl.reverse();
        }
    }, [data]);

    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;
        const r = refHeader.current as any;
        const items = r.children;
        if (currentScrollY > prevScrollY.current && tlRef.current) {
            // Scrolling down
            if (scrollDirection.current !== "down") {
                scrollDirection.current = "down";
                tlRef.current.restart();
                for (const item of items) {
                    item.classList.add("before:hidden");
                }
            }
        } else if (currentScrollY < prevScrollY.current && tlRef.current) {
            // Scrolling up
            if (scrollDirection.current !== "up") {
                scrollDirection.current = "up";
                tlRef.current.reverse();
                for (const item of items) {
                    item.classList.remove("before:hidden");
                }
            }
        }

        prevScrollY.current = currentScrollY;
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

    useEffect(() => {
        setAuth(state.auth);
    }, [state.auth]);

    return (
        <div
            className={
                state.darkMode
                    ? "headerMotion dark fixed top-0 left-0 z-50 flex w-full py-4 bg-purple text-pink dark:bg-transparent dark:text-white-100"
                    : "headerMotion fixed top-0 left-0 z-50 flex w-full py-4 bg-purple text-pink dark:bg-transparent dark:text-white-100"
            }
        >
            <header className="relative z-30 flex items-center justify-between u-wrapper ">
                <div className="flex items-center gap-2 text-sm uppercase lg:text-md">
                    <Link to="/" className="text-pink dark:text-white-100">
                        Brand Name
                    </Link>
                    <span
                        ref={line}
                        className="h-[1px] bg-pink dark:bg-white-100 w-[40px] block origin-left"
                    ></span>
                    <p className="text-pink dark:text-white-100" ref={loc}>
                        {location && location.pathname.length > 1
                            ? location.pathname.replace(/^\//, "")
                            : "Home"}
                    </p>
                </div>
                <div className="hidden md:flex">
                    <ul ref={refHeader} className="flex">
                        {data &&
                            data.map((item: any, i: number) => {
                                return (
                                    <MenuItem
                                        key={"headermenu" + i}
                                        string={item.post_title}
                                        url={item.url}
                                    />
                                );
                            })}
                        {auth === "user" ? (
                            <>
                                <Logout setAuth={setAuth} />
                            </>
                        ) : auth === "admin" ? (
                            <>
                                <MenuItem string={"Admin"} url={"/admin"} />
                                <Logout setAuth={setAuth} />
                            </>
                        ) : (
                            <>
                                <MenuItem string="Login" url="login" />
                            </>
                        )}
                    </ul>
                    <DarkMode darkMode={darkMode} />
                </div>
                <Burger />
            </header>
            <Aside data={data} menuState={menuState} />
        </div>
    );
};

export default Header;
