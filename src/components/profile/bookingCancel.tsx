import { ChangeEvent, useContext, useEffect, useState } from "react";
import { CancelBookingMultiple } from "../../hooks/cancelBookingMultiple";
import Modal from "./modal";
import { Booking, RefetchFunction } from "./types";
import Message from "./message";

type ID = {
    _id: string;
};
const BookingCancel = ({
    item,
    token,
    refetch,
    setRerender,
}: {
    item: Booking;
    token: string | null | undefined;
    setRerender: React.Dispatch<React.SetStateAction<number>> | undefined;
    refetch?: RefetchFunction;
}) => {
    const [enabled, setEnabled] = useState(false);
    const [modal, setModal] = useState(false);
    const [value, setValue] = useState(1);
    const [ids, setIds] = useState<ID[]>([]);
    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState(false);
    const { data, error } = CancelBookingMultiple({ enabled, ids: ids, token });

    useEffect(() => {
        if (data && !error && setRerender) {
            setModal(false);
            setMessage(true);
            setLoader(false);
            setRerender(Date.now());
        }
    }, [data]);

    const handleModal = () => {
        if (!modal) {
            setModal(true);
        }
    };

    const cancelFunction = () => {
        const multiple = item.userBookingIds.length > 1;
        if (!multiple) {
            const id = item.userBookingId;

            setEnabled(true);
            //init loader
            setLoader(true);
            setIds([{ _id: id }]);
        } else {
            const array: ID[] = [];
            Promise.all(
                item.userBookingIds.map((item: string, i: number) => {
                    if (i <= value - 1) {
                        const obj = { _id: item };
                        array.push(obj);
                    }
                })
            ).then(() => setIds(array));
        }
    };

    useEffect(() => {
        if (ids.length) {
            setEnabled(true);
            //init loader
            setLoader(true);
        }
    }, [ids]);

    return (
        <>
            <Message setMessage={setMessage} message={message} />
            <Modal
                modal={modal}
                multiple={item.userBookingIds.length > 1}
                cancel={cancelFunction}
                setModal={setModal}
                value={value}
                loader={loader}
            />
            {item.userBookingIds.length < 2 ? (
                <button
                    className="text-sm u-button--pink"
                    onClick={handleModal}
                >
                    Cancel booking
                </button>
            ) : (
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col mb-4">
                        <label className="text-[12px] font-light uppercase">
                            Amount of tickets to cancel:
                        </label>
                        <input
                            className="bg-transparent"
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setValue(Number(e.target.value))
                            }
                            value={value}
                            type="number"
                            min="1"
                            max={item.userBookingIds.length}
                        />
                    </div>
                    <button
                        className="text-sm u-button--pink"
                        onClick={handleModal}
                    >
                        Adjust Booking
                    </button>
                </div>
            )}
        </>
    );
};
export default BookingCancel;
