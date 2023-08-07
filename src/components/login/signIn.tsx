import { connect, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Form from "../shared/form";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { getCookie } from "../../helpers/main";
import Topbar from "../shared/topbar";
import Motion from "../../wrappers/motion";
import { Context, DispatchContext } from "../../store/store";

const fetchData = async (state: any) => {
    try {
        const url = `${state.queryKey[1].stateContext.state.mainUrl}/signin`;
        const headers = {
            "Content-Type": "application/json",
        };

        const { data } = await axios.post(url, state.queryKey[1].final, {
            headers: headers,
        });
        return data;
    } catch (err: any) {
        if (err.response) {
            throw err.response.data;
        } else {
            throw err;
        }
    }
};

type State = {
    email: { valid: boolean; value: string };
    password: { valid: boolean; value: string };
};

const SignIn = React.memo(({}) => {
    const [state, setState] = useState<State | null>(null);
    const [final, setFinal] =
        useState<{ email: string; password: string } | null>(null);
    const dispatch = useContext(DispatchContext);
    const [click, setClick] = useState<boolean>(false);
    const navigate = useNavigate();
    const stateContext = useContext(Context);

    const { data, isIdle, error, status, isLoading, refetch }: any = useQuery({
        queryKey: ["siginquery", { final, stateContext }],
        queryFn: fetchData,
        enabled: click,
    });
    if (!error && data && state) {
        const { token } = data;
        const date = new Date(Date.now() + 3600 * 1000 * 24);
        document.cookie = `httpEmail=${state.email.value}; expires=${date}; path=/ `;
        document.cookie = `httpCookie=${token}; expires=${date}; path=/ `;
        document.cookie = `httpAdmin=${data.admin}; expires=${date}; path=/ `;
        setTimeout(() => {
            navigate("/dashboard");
            if (dispatch) {
                const payloadValue = data.admin === "true" ? "admin" : "user";
                dispatch({ type: "auth", payload: payloadValue });
            }
        }, 600);
    }

    useEffect(() => {
        if (click) {
            refetch();
        }
    }, [click]);

    const submit = () => {
        if (state && state.email.valid && state.password.valid) {
            const obj = {
                email: state.email.value,
                password: state.password.value,
            };
            setFinal(obj);
            setClick(true);
        }
    };

    return (
        <Motion>
            {stateContext.state.mainUrl && (
                <div className="min-h-screen">
                    <Topbar
                        centralText={true}
                        title="Welcome to Name, please login below"
                        filterUI={false}
                        links={[]}
                    />
                    <div className="form-1">
                        <Form
                            arr={[
                                { text: "email", type: "text" },
                                { text: "password", type: "password" },
                            ]}
                            submitFunc={submit}
                            setStateParent={setState}
                            stateParent={state}
                            submitText="Sign In"
                        />
                    </div>
                </div>
            )}
        </Motion>
    );
});

export default SignIn;
