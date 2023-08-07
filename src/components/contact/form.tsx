import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { Context } from "../../store/store";
import Input from "../shared/input";

const Form = () => {
    const [stateValues, setState] = useState({
        name: "",
        message: "",
        email: "",
    });

    return (
        <>
            <div className="absolute left-0 top-0 block w-[101%] h-full pointer-events-none flex items-center justify-center ">
                <div className="w-[75%] xsm:w-[60%] p-6 md:w-[47.5%] md:max-w-[475px] bg-blackR-100 dark:bg-purple md:rounded-full h-[70vh] md:h-auto lg:h-[47.5%] pointer-events-auto flex flex-col justify-center ">
                    <h2 className="mb-10 text-4xl text-center uppercase">
                        Send Us A Message
                    </h2>
                    <Input
                        type="text"
                        name="name"
                        value={stateValues.name}
                        onChange={(e) =>
                            setState({
                                ...stateValues,
                                ["name"]: e.target.value,
                            })
                        }
                        hideLabel={true}
                        label={"Full Name"}
                    />
                    <Input
                        type="text"
                        name="email"
                        value={stateValues.email}
                        onChange={(e) =>
                            setState({
                                ...stateValues,
                                ["email"]: e.target.value,
                            })
                        }
                        hideLabel={true}
                        label={"Email"}
                    />
                    <Input
                        type="textarea"
                        name="message"
                        value={stateValues.message}
                        onChange={(e) =>
                            setState({
                                ...stateValues,
                                ["message"]: e.target.value,
                            })
                        }
                        hideLabel={true}
                        label={"Message"}
                    />
                    <button className="mx-auto u-button--pink">Submit</button>
                </div>
            </div>
        </>
    );
};

export default Form;
