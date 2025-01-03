import React from "react";
import Text from "../../components/Text";
// import {
//   VIDEO_1,
//   VIDEO_2,
//   VIDEO_3,
//   VIDEO_4,
//   VIDEO_5,
// } from "../../assets/assets";

interface VideoCardProps {
  videoSrc: string;
  title: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ videoSrc, title }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <video
        src={videoSrc}
        controls
        className="w-full h-auto rounded-lg shadow-md mb-2"
      />
      <Text as="p" className="text-sm text-gray-800 font-medium">
        {title}
      </Text>
    </div>
  );
};

const videos = [
  //   { videoSrc: VIDEO_1, title: "Intro to Web Development" },
  //   { videoSrc: VIDEO_2, title: "AI and Machine Learning" },
  //   { videoSrc: VIDEO_3, title: "Design Thinking" },
  //   { videoSrc: VIDEO_4, title: "Cyber Security Basics" },
  //   { videoSrc: VIDEO_5, title: "Cloud Infrastructure" },
];

export const VideoSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-12">
          <Text as="h2" className="text-4xl font-bold text-gray-900 mb-4">
            Featured Videos
          </Text>
          <Text as="p" className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our curated video content from industry-leading experts
            across various fields.
          </Text>
        </div>

        {/* Video Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Large Video on the Left */}
        </div>
      </div>
    </section>
  );
};
