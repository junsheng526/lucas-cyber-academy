import { FC } from "react";
import { CheckCircle, AlertTriangle, XCircle, X } from "lucide-react";
import { motion } from "framer-motion";
import ButtonPrimary from "../../molecules/button/ButtonPrimary";

interface PopupProps {
  type: "success" | "warning" | "error";
  title: string;
  description: string;
  onClose: () => void;
}

const iconMap = {
  success: <CheckCircle className="text-green-500 w-16 h-16" />,
  warning: <AlertTriangle className="text-yellow-500 w-16 h-16" />,
  error: <XCircle className="text-red-500 w-16 h-16" />,
};

const Popup: FC<PopupProps> = ({ type, title, description, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/30"
    >
      <div className="bg-white rounded-3xl p-8 w-full max-w-sm text-center shadow-xl">
        <div className="flex justify-center">{iconMap[type]}</div>
        <h2 className="text-xl font-semibold text-neutral-800 mt-4">{title}</h2>
        <p className="text-gray-500 mt-2">{description}</p>
        <ButtonPrimary onClick={onClose} className="my-6">
          {"Close"}
        </ButtonPrimary>
      </div>
    </motion.div>
  );
};

export default Popup;
