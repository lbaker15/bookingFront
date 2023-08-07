const Modal = ({
  modal,
  value,
  multiple,
  cancel,
  setModal,
}: {
  modal: boolean;
  value?: number;
  multiple: boolean;
  cancel: () => void;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      {modal && (
        <div className='fixed top-0 left-0 z-50 flex items-center justify-between w-screen h-screen backdrop-blur-sm'>
          <div className='flex flex-col items-center justify-center w-auto h-auto gap-6 p-8 mx-auto font-sans text-xl text-center rounded-sm bg-white-100 text-purple'>
            <span>
              {multiple ? <p>Are you sure you wish to cancel {value} tickets?</p> : <p>Are you sure you wish to cancel?</p>}
              <p>This cannot be reversed.</p>
            </span>

            <div className='flex gap-2 '>
              <button className='px-4 py-1 text-[1rem] u-button--purple' onClick={cancel}>
                Yes
              </button>
              <button className='px-4 py-1 text-[1rem] u-button--purple' onClick={() => setModal(false)}>
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
