import React, {
    Suspense,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import Matter, {
    Mouse,
    MouseConstraint,
    Engine,
    World,
    Bodies,
    Composites,
} from "matter-js";
import image from "../../images/record.png";
import "matter-wrap";
import { Context } from "../../store/store";
import Form from "./form";
import Loader from "../dashboard/loader";
import Motion from "../../wrappers/motion";

const Contact = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [completed, setCompleted] = useState(false);
    Matter.use("matter-wrap");
    const ctx: any = useContext(Context);
    const { state } = ctx;
    const [reloadPage, setReloadPage] = useState(false);

    const handleResize = useCallback(() => {
        setReloadPage(true);
    }, []);

    useEffect(() => {
        if (reloadPage) {
            window.location.reload();
        }
    }, [reloadPage]);

    useEffect(() => {
        const bg1 = state.darkMode ? "#323186" : "#000";
        const bg2 = state.darkMode ? "#000" : "#323186";
        const section = sectionRef.current;
        const canvas = canvasRef.current;

        if (!section || !canvas) return;

        // create a matter.js engine
        const engine = Engine.create();
        const canvasWidth = window.innerWidth;
        const canvasHeight = window.innerHeight;
        const canvasBounds: Matter.Bounds = {
            min: { x: 0, y: 0 },
            max: { x: canvasWidth, y: canvasHeight },
        };

        // create a renderer using the created canvas element
        const renderer = Matter.Render.create({
            element: section,
            canvas: canvas,
            engine: engine,
            options: {
                width: canvasWidth,
                height: canvasHeight,
                background: bg2,
                wireframes: false,
            },
        });

        // create shapes after image is loaded
        const createShapes = () => {
            console.log(window, canvasWidth, window.innerHeight);
            const createShape = (x: number, y: number) => {
                const shape = Matter.Bodies.rectangle(x, y, 40, 40, {
                    render: {
                        sprite: {
                            texture: image,
                            xScale: 0.025,
                            yScale: 0.025,
                        },
                    },
                    restitution: 0.2,
                });
                shape.plugin.wrap = canvasBounds;
                return shape;
            };

            const shapes = Composites.stack(
                100,
                50,
                10,
                10,
                100,
                40,
                (x: number, y: number) => {
                    return createShape(x, y);
                }
            );

            // Create a floor object as a boundary
            const floor = Matter.Bodies.rectangle(
                canvasWidth / 2,
                canvasHeight,
                canvasWidth,
                20,
                { isStatic: true }
            );
            const leftWall = Matter.Bodies.rectangle(
                0,
                canvasHeight / 2,
                20,
                canvasHeight,
                { isStatic: true }
            );
            const rightWall = Matter.Bodies.rectangle(
                canvasWidth,
                canvasHeight / 2,
                20,
                canvasHeight,
                { isStatic: true }
            );
            const circularBoundary = Bodies.circle(
                canvasWidth / 2,
                canvasHeight / 2,
                canvasWidth / 3.5,
                {
                    isStatic: true,
                    restitution: 1,
                    render: {
                        fillStyle: bg1,
                        // strokeStyle: '#000000',
                        // lineWidth: 20,
                    },
                }
            );

            // Add the boundaries to the world
            World.add(engine.world, [
                shapes,
                floor,
                leftWall,
                rightWall,
                circularBoundary,
            ]);
        };

        // preload the image and create shapes after it's loaded
        const preloadImage = new Image();
        preloadImage.src = image;
        preloadImage.onload = () => {
            createShapes();
            Matter.Render.run(renderer);
            const mouse = Matter.Mouse.create(canvas);
            const mouseConstraint = Matter.MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: {
                        visible: false,
                    },
                },
            });
            World.add(engine.world, mouseConstraint);

            // run the engine
            Engine.run(engine);
            setCompleted(true);
        };

        window.addEventListener("resize", handleResize);

        // clean up
        return () => {
            Matter.Render.stop(renderer);
            World.clear(engine.world, false);
            Engine.clear(engine);
            window.removeEventListener("resize", handleResize);
        };
    }, [state.darkMode]);

    return (
        <Motion>
            <section className="relative block w-full h-screen overflow-hidden bg-purple">
                {!completed && <Loader fixed={true} />}
                <div
                    className="absolute -left-[1%] top-0 block w-[102%] h-full bg-purple"
                    ref={sectionRef}
                >
                    <canvas className="w-full h-full " ref={canvasRef} />
                </div>
                {ctx.state.mainUrl && <Form />}
            </section>
        </Motion>
    );
};

export default Contact;
