
import { Dispatch } from "redux";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Form from "../shared/form";
import { CreateUserH } from "../../hooks/createUser";
import Topbar from "../shared/topbar";
import { Context, State } from "../../store/store";

const CreateUserInner = React.memo(({ ctx }: any) => {
    const [state, setState] = useState<any>(null);
    const [final, setFinal] = useState<any>(null);
    const [click, setClick] = useState<boolean>(false);
    const [enabled, setEnabled] = useState<boolean>(false);

    const { data, error, refetch }: any = CreateUserH({ final, enabled });
    const stateContext = useContext(Context);
    if (!error && data) {
    }

    useEffect(() => {
        if (click) {
            refetch();
            setEnabled(true);
        }
    }, [click]);

    const submit = () => {
        if (state.email.valid && state.name.valid && state.password.valid) {
            const obj = {
                name: state.name.value,
                email: state.email.value,
                password: state.password.value,
                admin: String(false),
            };
            setFinal(obj);
            setClick(true);
        }
    };

    return (
        <>
            {stateContext.state.mainUrl && (
                <>
                    {!error && data ? (
                        <div className="min-h-screen flex items-center">
                            <div className="u-wrapper ">
                                <p className="text-2xl w-full text-center">
                                    User Created
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="min-h-screen">
                            <Topbar
                                centralText={true}
                                title="Welcome to Name, please create your new login below"
                                filterUI={false}
                                links={[]}
                            />
                            <div className="form-1">
                                <Form
                                    arr={[
                                        { text: "name", type: "text" },
                                        { text: "email", type: "text" },
                                        { text: "password", type: "password" },
                                    ]}
                                    submitFunc={submit}
                                    setStateParent={setState}
                                    stateParent={state}
                                />
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
});

const CreateUser = () => {
    const { state }: State = useContext(Context);

    return <>{state.mainUrl && <CreateUserInner />}</>;
};

export default CreateUser;
