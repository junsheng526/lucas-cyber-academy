import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { ButtonHTMLAttributes, FC } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const PrevBtn: FC<Props> = ({ className = "", ...args }) => {
  return (
    <button
      className={`PrevBtn ${className} w-12 h-12 bg-white border border-neutral-300 rounded-full inline-flex items-center justify-center shadow-md hover:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
      {...args}
    >
      <ChevronLeftIcon className="w-6 h-6 text-neutral-800 " />
    </button>
  );
};

export default PrevBtn;
