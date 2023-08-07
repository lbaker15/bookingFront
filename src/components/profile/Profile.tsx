import React, { useContext, useEffect, useState } from "react";
import { GetBookings } from "../../hooks/getBookings";
import { Context, State } from "../../store/store";
import Sidebar from "../shared/sidebar";
import Bookings from "./bookings";
import Topbar from "../shared/topbar";
import { ChangePassword } from "../../hooks/changePassword";
import Input from "../shared/input";
import { User } from "./types";
import Motion from "../../wrappers/motion";

const Child = React.memo(
    ({
        data,
        error,
        enabled,
        state,
        setState,
        setEnabled,
    }: {
        data: User | undefined;
        error: any;
        enabled?: boolean;
        state: { password: string; newPassword: string };
        setState: React.Dispatch<React.SetStateAction<any>>;
        setEnabled: React.Dispatch<React.SetStateAction<any>>;
    }) => {
        const [hideModal, setHideModal] = useState(false);
        const [validate, setValidate] = useState({ state: false, message: "" });
        useEffect(() => {
            if (error) {
                setValidate({
                    ...validate,
                    state: true,
                    message: "Incorrect details",
                });
            } else if (data && !error) {
                setValidate({ ...validate, state: false, message: "" });
            }
        }, [error, data]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setState({ ...state, [name]: value });
        };
        const handleClick = (e: React.MouseEvent) => {
            if (state.newPassword.length > 4) {
                setEnabled(true);
                if (validate) {
                    setValidate({ ...validate, state: false });
                }
            } else {
                setValidate({
                    ...validate,
                    state: true,
                    message: "Password must be at least 5 characters long",
                });
            }
        };
        const handleModalContentClick = (e: React.MouseEvent) => {
            e.stopPropagation();
        };

        return (
            <div className="flex flex-col py-20 md:flex-row u-wrapper">
                <h2 className="mb-10 text-2xl uppercase lg:pr-20 leading-[1.75]">
                    Please enter your current & new password{" "}
                </h2>
                {data && !error && !hideModal && (
                    <div
                        onClick={() => setHideModal(true)}
                        className="absolute top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-blackR-50 backdrop-blur-sm"
                    >
                        <div
                            onClick={handleModalContentClick}
                            className="flex flex-col gap-8 p-[36px] max-w-[35rem] rounded h-fit w-fit bg-white-100 relative"
                        >
                            <p className="w-full text-xl text-center text-purple">
                                Password successfully changed
                            </p>
                        </div>
                    </div>
                )}
                <div className="w-full md:w-1/2">
                    <div className="relative flex flex-col w-full">
                        {validate.state && (
                            <p className="mb-8 text-sm uppercase text-red">
                                {validate.message}
                            </p>
                        )}
                        <Input
                            type="password"
                            onChange={handleChange}
                            name="password"
                            value={state.password}
                            label={"Current Password"}
                            hideLabel={true}
                        />
                        <Input
                            type="password"
                            onChange={handleChange}
                            label={"New Password"}
                            name="newPassword"
                            value={state.newPassword}
                            hideLabel={true}
                        />
                    </div>
                    <button className="mt-6 u-button " onClick={handleClick}>
                        Change Password
                    </button>
                </div>
            </div>
        );
    }
);
const ProfileInfo = ({ token }: { token?: string }) => {
    const [state, setState] = useState({ password: "", newPassword: "" });
    const [enabled, setEnabled] = useState(false);
    const { data, error }: { error: any; data: any } = ChangePassword({
        enabled,
        token,
        input: state,
    });

    useEffect(() => {
        setEnabled(false);
    }, [data, error]);

    return (
        <Child
            data={data}
            error={error}
            enabled={enabled}
            state={state}
            setState={setState}
            setEnabled={setEnabled}
        />
    );
};

const Profile = () => {
    const [stateShow, setState] = useState(0);
    const { state }: State = useContext(Context);

    useEffect(() => {});
    const func = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { index } = e.target.dataset;
        setState(Number(index));
    };

    return (
        <>
            <Motion>
                {state.mainUrl && (
                    <>
                        <Topbar
                            title={
                                stateShow === 0
                                    ? "All Bookings"
                                    : "Profile Information"
                            }
                            filterUI={false}
                            links={[
                                { name: "View Bookings", callback: func },
                                { name: "Edit Password", callback: func },
                            ]}
                        />
                        {stateShow === 0 && (
                            <>
                                {state.token && (
                                    <Bookings token={state.token} />
                                )}
                            </>
                        )}
                        {stateShow === 1 && (
                            <>
                                <ProfileInfo token={state.token} />
                            </>
                        )}
                    </>
                )}
            </Motion>
        </>
    );
};
export default Profile;
