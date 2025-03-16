import React, { useState } from "react";
import Heading from "../../components/molecules/text/Heading";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { variants } from "../../utils/animationVariants";

import clientSayMain from "../../assets/client-say-avatars/clientSayMain.png";
import clientSay1 from "../../assets/client-say-avatars/clientSay1.png";
import clientSay2 from "../../assets/client-say-avatars/clientSay2.png";
import clientSay3 from "../../assets/client-say-avatars/clientSay3.png";
import clientSay4 from "../../assets/client-say-avatars/clientSay4.png";
import clientSay5 from "../../assets/client-say-avatars/clientSay5.png";
import clientSay6 from "../../assets/client-say-avatars/clientSay6.png";
import quotationImg from "../../assets/client-say-avatars/quotation.png";
import quotationImg2 from "../../assets/client-say-avatars/quotation2.png";

const DEMO_DATA = [
  {
    id: 1,
    clientName: "Tiana Abie",
    clientAddress: "Malaysia",
    content:
      "Loved the course! Super easy to follow and packed with useful info.",
  },
  {
    id: 2,
    clientName: "Lennie Swiffan",
    clientAddress: "London",
    content: "The lessons were clear and well-structured. Totally worth it!",
  },
  {
    id: 3,
    clientName: "Berta Emili",
    clientAddress: "Tokyo",
    content:
      "Engaging content and practical examples. Best course I've taken so far!",
  },
];

const SectionClientSay = ({ className = "", data = DEMO_DATA }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  function changeItemId(newVal: number) {
    setDirection(newVal > index ? 1 : -1);
    setIndex(newVal);
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < data.length - 1) {
        changeItemId(index + 1);
      }
    },
    onSwipedRight: () => {
      if (index > 0) {
        changeItemId(index - 1);
      }
    },
    trackMouse: true,
  });

  let currentItem = data[index];

  const renderBg = () => (
    <div className="hidden md:block">
      <img
        className="absolute top-9 -left-20"
        src={clientSay1}
        alt="client 1"
      />
      <img
        className="absolute bottom-[100px] right-full mr-40"
        src={clientSay2}
        alt="client 2"
      />
      <img
        className="absolute top-full left-[140px]"
        src={clientSay3}
        alt="client 3"
      />
      <img
        className="absolute -bottom-10 right-[140px]"
        src={clientSay4}
        alt="client 4"
      />
      <img
        className="absolute left-full ml-32 bottom-[80px]"
        src={clientSay5}
        alt="client 5"
      />
      <img
        className="absolute -right-10 top-10 "
        src={clientSay6}
        alt="client 6"
      />
    </div>
  );

  return (
    <div className={`nc-SectionClientSay relative ${className}`}>
      <Heading desc="Let's see what people think of Chisfis" isCenter>
        Good news from far away
      </Heading>
      <div className="relative md:mb-16 max-w-2xl mx-auto">
        {renderBg()}
        <img className="mx-auto" src={clientSayMain} alt="Main client" />
        <div className="mt-12 lg:mt-16 relative">
          <img
            className="opacity-50 md:opacity-100 absolute -mr-16 lg:mr-3 right-full top-1"
            src={quotationImg}
            alt="Quotation"
          />
          <img
            className="opacity-50 md:opacity-100 absolute -ml-16 lg:ml-3 left-full top-1"
            src={quotationImg2}
            alt="Quotation 2"
          />

          <MotionConfig
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            <div
              className="relative whitespace-nowrap overflow-hidden"
              {...handlers}
            >
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={index}
                  custom={direction}
                  variants={variants(200, 1)}
                  initial="enter"
                  animate="center"
                  className="inline-flex flex-col items-center text-center whitespace-normal"
                >
                  <span className="block text-2xl">{currentItem.content}</span>
                  <span className="block mt-8 text-2xl font-semibold">
                    {currentItem.clientName}
                  </span>
                  <div className="flex items-center space-x-2 text-lg mt-2 text-neutral-400">
                    <MapPinIcon className="h-5 w-5" />
                    <span>{currentItem.clientAddress}</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-10 flex items-center justify-center space-x-2">
                {data.map((item, i) => (
                  <button
                    className={`w-2 h-2 rounded-full ${
                      i === index ? "bg-black/70" : "bg-black/10"
                    }`}
                    onClick={() => changeItemId(i)}
                    key={i}
                  />
                ))}
              </div>
            </div>
          </MotionConfig>
        </div>
      </div>
    </div>
  );
};

export default SectionClientSay;
