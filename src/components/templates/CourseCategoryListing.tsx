import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import ButtonClose from "../molecules/button/ButtonClose";

// Define props type for CourseCategoryListing
interface CourseCategoryListingProps {
  isOpenModalSyllabus: boolean;
  setIsOpenModalSyllabus: (isOpen: boolean) => void;
  syllabus: string[]; // Pass syllabus as an array of strings
}

export const CourseCategoryListing: React.FC<CourseCategoryListingProps> = ({
  isOpenModalSyllabus,
  setIsOpenModalSyllabus,
  syllabus,
}) => {
  const closeModalSyllabus = () => setIsOpenModalSyllabus(false);

  return (
    <Transition appear show={isOpenModalSyllabus} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeModalSyllabus}
      >
        {/* Background Overlay (Replaces Dialog.Overlay) */}
        <div
          className="fixed inset-0 bg-black bg-opacity-40"
          aria-hidden="true"
        ></div>

        <div className="min-h-screen px-4 text-center">
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block py-8 h-screen w-full max-w-4xl">
              <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white shadow-xl h-full">
                <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 text-center">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Course Syllabus
                  </h3>
                  <span className="absolute left-3 top-3">
                    <ButtonClose onClick={closeModalSyllabus} />
                  </span>
                </div>

                {/* Syllabus List */}
                <div className="px-8 overflow-auto text-neutral-700 divide-y divide-neutral-200">
                  {syllabus.map((topic, index) => (
                    <div
                      key={index}
                      className="flex items-center py-2.5 sm:py-4 lg:py-5 space-x-5 lg:space-x-8"
                    >
                      <i className="text-4xl text-neutral-6000 las la-book"></i>
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
