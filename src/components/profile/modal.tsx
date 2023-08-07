const Modal = ({
    modal,
    value,
    multiple,
    cancel,
    loader,
    setModal,
}: {
    modal: boolean;
    value?: number;
    multiple: boolean;
    cancel: () => void;
    loader?: boolean;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    return (
        <>
            {modal && (
                <div className="fixed top-0 left-0 z-50 flex items-center justify-between w-screen h-screen backdrop-blur-sm">
                    <div className="relative flex flex-col items-center justify-center w-auto h-auto gap-6 p-8 mx-auto font-sans text-xl text-center rounded-sm bg-white-100 text-purple">
                        {loader && (
                            <div className=" absolute w-full h-full inset-0 flex items-center justify-center z-[9999] ">
                                <span className='loader w-[48px] h-[48px] inline-block relative before:w-[48px] before:h-[48px] before:border-[2px] before:border-purple before:absolute before:top-0  before:rounded-full before:left-0  after:w-[48px] after:h-[48px] after:border-[2px] after:border-purple after:opacity-0 after:absolute after:top-0  after:rounded-full after:left-0 before:content-[""] after:content-[""] '></span>
                            </div>
                        )}
                        <span>
                            {multiple ? (
                                <p>
                                    Are you sure you wish to cancel {value}{" "}
                                    tickets?
                                </p>
                            ) : (
                                <p>
                                    Are you sure you wish to cancel your ticket?
                                </p>
                            )}
                            <p>This cannot be reversed.</p>
                        </span>

                        <div className="flex gap-2 ">
                            <button
                                className="px-4 py-1 text-[1rem] u-button--purple"
                                onClick={cancel}
                            >
                                Yes
                            </button>
                            <button
                                className="px-4 py-1 text-[1rem] u-button--purple"
                                onClick={() => setModal(false)}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default Modal;
