import Heading from "../../components/molecules/text/Heading";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";

export interface People {
  name: string;
  job: string;
  avatar: string;
}

const fetchLecturerCollection = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "lecturers"));
    const dataArray = querySnapshot.docs.map((doc) => ({
      name: doc.data().name,
      job: doc.data().job,
      avatar: doc.data().avatar,
    }));
    return dataArray;
  } catch (error) {
    console.error("Error fetching collection:", error);
    return [];
  }
};

const SectionLecturer = () => {
  const [data, setData] = useState<
    { name: string; job: string; avatar: string }[]
  >([]);
  // fetch lecturers collection from firestore
  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchLecturerCollection();
      setData(fetchedData);
    };
    getData();
  }, []);

  return (
    <div className="nc-SectionFounder relative">
      <Heading
        className="items-center"
        desc="We’re impartial and independent, and every day we create distinctive, world-class programmes and content"
      >
        ⛱ Meet our Lecturers
      </Heading>
      <div className="grid pt-8 sm:grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4 xl:gap-x-8">
        {data.map((item, index) => (
          <div key={index} className="max-w-sm">
            <div className="relative w-full h-64 rounded-xl overflow-hidden">
              <img
                src={item.avatar}
                alt={item.name}
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="text-black font-semibold text-neutral-900 mt-4 md:text-xl">
              {item.name}
            </h3>
            <span className="block text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
              {item.job}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionLecturer;
