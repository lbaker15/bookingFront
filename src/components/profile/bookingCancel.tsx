import { ChangeEvent, useContext, useEffect, useState } from "react";
import { CancelBookingMultiple } from "../../hooks/cancelBookingMultiple";
import Modal from "./modal";
import { Booking, RefetchFunction } from "./types";

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

    const { data, error } = CancelBookingMultiple({ enabled, ids: ids, token });

    useEffect(() => {
        if (data && !error && setRerender) {
            setModal(false);
            setRerender(Date.now());
        }
    }, [data]);
    const cancel = () => {
        if (!modal) {
            setModal(true);
        } else {
            setModal(false);
        }
    };

    const cancelFunction = () => {
        const multiple = item.userBookingIds.length > 1;
        if (!multiple) {
            const id = item.userBookingId;

            setEnabled(true);
            //initloader
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
        }
    }, [ids]);

    return (
        <>
            <Modal
                modal={modal}
                multiple={item.userBookingIds.length > 1}
                cancel={cancelFunction}
                setModal={setModal}
            />
            {item.userBookingIds.length < 2 ? (
                <button className="text-sm u-button--pink" onClick={cancel}>
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
                    <button className="text-sm u-button--pink" onClick={cancel}>
                        Adjust Booking
                    </button>
                </div>
            )}
        </>
    );
};
export default BookingCancel;
