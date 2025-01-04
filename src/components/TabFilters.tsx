"use client";

import { Fragment, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import ButtonPrimary from "./button/ButtonPrimary";
import ButtonThird from "./button/ButtonThird";
import Checkbox from "./Checkbox";

// DEMO DATA
const typeOfCar = [
  { name: "Small", description: "$68" },
  { name: "Medium", description: "$128" },
  { name: "Large", description: "$268" },
  { name: "SUV", description: "$268" },
  { name: "Van", description: "$268" },
  { name: "Luxury", description: "$268" },
];

const carSpecifications = [
  { name: "With air conditioning" },
  { name: "Automatic transmission" },
  { name: "Manual transmission" },
  { name: "2 doors" },
  { name: "4+ doors" },
];

//
const mileage = [{ name: "Unlimited" }, { name: "Limited" }];
const supplier = [
  { name: "Alamo", defaultChecked: true },
  { name: "Avis", defaultChecked: true },
  { name: "Budget" },
  { name: "Dollar" },
];
const insurance = [
  { name: "No insurance", defaultChecked: true },
  { name: "Zero excess " },
  { name: "Inclusive" },
];

const TabFilters = () => {
  const [isOpenMoreFilter, setisOpenMoreFilter] = useState(false);
  const [isOpenMoreFilterMobile, setisOpenMoreFilterMobile] = useState(false);
  const [rangePrices, setRangePrices] = useState([0, 1000]);
  const [isOnSale, setIsOnSale] = useState(true);
  //
  const closeModalMoreFilter = () => setisOpenMoreFilter(false);
  const openModalMoreFilter = () => setisOpenMoreFilter(true);
  //
  const closeModalMoreFilterMobile = () => setisOpenMoreFilterMobile(false);
  const openModalMoreFilterMobile = () => setisOpenMoreFilterMobile(true);

  const renderXClear = () => {
    return (
      <span className="w-4 h-4 rounded-full bg-primary-500 text-white flex items-center justify-center ml-3 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  };

  const renderTabsTypeOfCars = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 hover:border-neutral-400 focus:outline-none ${
                open ? "!border-primary-500 " : ""
              }`}
            >
              <span>Car type</span>
              <i className="las la-angle-down ml-2"></i>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white border border-neutral-200">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {typeOfCar.map((item) => (
                      <div key={item.name} className="">
                        <Checkbox
                          name={item.name}
                          label={item.name}
                          subLabel={item.description}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="p-5 bg-neutral-50 flex items-center justify-between">
                    <ButtonThird onClick={close} sizeClass="px-4 py-2 sm:px-5">
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={close}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  return (
    <div className="flex lg:space-x-4">
      <div className="hidden lg:flex space-x-4">{renderTabsTypeOfCars()}</div>
    </div>
  );
};

export default TabFilters;
