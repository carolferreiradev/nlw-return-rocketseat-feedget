import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
interface Props {
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
  imageURL: string;
  altImageURL: string;
}
export function ModalShowPhoto({
  altImageURL,
  imageURL,
  isOpenModal,
  setIsOpenModal,
}: Props) {
  let [isOpen, setIsOpen] = useState(isOpenModal);

  function closeModal() {
    setIsOpen(false);
    setIsOpenModal(false);
  }

  useEffect(() => {
    if (isOpenModal) {
      setIsOpen(true);
    }
  }, [isOpenModal]);
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl dark:bg-black bg-white p-6 text-left align-middle shadow-xl transition-all">
                <img src={imageURL} alt={altImageURL} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
