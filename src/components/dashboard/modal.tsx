import { useState } from "react";
import { getCookie } from "../../helpers/main";
import { Link } from "react-router-dom";
import { ModalProps } from "./types";

const ModalBuy = ({
    modal,
    handleModal,
    handleChange,
    value,
    handleClick,
    item,
}: ModalProps) => {
    const [reject, setReject] = useState(false);
    console.log(item);
    if (modal) {
        return (
            <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-blackR-50 backdrop-blur-sm">
                <div className="flex flex-col gap-8 p-[36px] max-w-[35rem] rounded h-fit w-fit bg-white-100 text-purple relative">
                    <button
                        className=" absolute top-[18px] right-[18px] u-button--purple w-[36px] h-[36px] p-0"
                        onClick={() => handleModal(false)}
                    >
                        X
                    </button>
                    {reject ? (
                        <>
                            <div className="w-full text-center px-[2rem]">
                                <p className="text-xl ">
                                    Please login to purchase tickets
                                </p>
                            </div>
                            <Link
                                className="px-6 py-2 mx-auto rounded-full u-button--purple w-fit"
                                to="/login"
                            >
                                Login/Create Account
                            </Link>
                        </>
                    ) : (
                        <>
                            <p className="text-xl pr-[1rem]">
                                Please select how many tickets you would like to
                                add to checkout
                            </p>
                            <div className="flex gap-2">
                                <label className="" htmlFor="quantity">
                                    Quantity:
                                </label>
                                <input
                                    className="border-b border-blackR-100"
                                    id="quantity"
                                    onChange={handleChange}
                                    value={value}
                                    type="number"
                                    min="1"
                                    max="10"
                                />
                            </div>
                            <button
                                className="px-6 py-2 rounded-full u-button--purple w-fit"
                                onClick={(e) => {
                                    const email = getCookie("httpEmail");
                                    const token = getCookie("httpCookie");

                                    if (email && token) {
                                        handleClick(e);
                                    } else {
                                        setReject(true);
                                    }
                                }}
                                data-title={item.name}
                                data-id={item._id}
                                data-price={
                                    item.price
                                        ? item.price
                                        : process.env.REACT_APP_PAYMENT_TWO_ID
                                }
                            >
                                Continue to checkout
                            </button>
                        </>
                    )}
                </div>
            </div>
        );
    } else {
        return <></>;
    }
};
export default ModalBuy;
