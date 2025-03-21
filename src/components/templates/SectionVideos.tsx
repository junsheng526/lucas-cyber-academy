import { FC, useState } from "react";
import Heading from "../molecules/text/Heading";
import NcPlayIcon from "../molecules/NcPlayIcon";
import NcPlayIcon2 from "../molecules/NcPlayIcon2";

export interface VideoType {
  id: string;
  title: string;
  thumbnail: string;
}

export interface SectionVideosProps {
  videos: VideoType[]; // Make videos a required prop
  className?: string;
}

const SectionVideos: FC<SectionVideosProps> = ({ videos, className = "" }) => {
  const [isPlay, setIsPlay] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);

  // Ensure videos array is valid
  if (!videos || videos.length === 0) {
    return <p className="text-center text-gray-500">No videos available.</p>;
  }

  const renderMainVideo = () => {
    const video: VideoType = videos[currentVideo];
    return (
      <div
        className="group aspect-w-16 aspect-h-9 bg-neutral-800 rounded-3xl overflow-hidden border-4 border-white sm:rounded-[50px] sm:border-[10px]"
        title={video.title}
      >
        {isPlay ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            className="w-full h-[40vh] lg:min-h-[80vh]"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <>
            <div
              onClick={() => setIsPlay(true)}
              className="cursor-pointer absolute inset-0 flex items-center justify-center z-10"
            >
              <NcPlayIcon />
            </div>
            <img
              className="object-cover w-full h-full transform transition-transform group-hover:scale-105 duration-300"
              src={video.thumbnail}
              alt={video.title}
            />
          </>
        )}
      </div>
    );
  };

  const renderSubVideo = (video: VideoType, index: number) => {
    if (index === currentVideo) return null;
    return (
      <div
        className="h-[20vh] group relative aspect-w-16 aspect-h-9 rounded-2xl cursor-pointer overflow-hidden"
        onClick={() => {
          setCurrentVideo(index);
          !isPlay && setIsPlay(true);
        }}
        key={index}
        title={video.title}
      >
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <NcPlayIcon2 />
        </div>
        <img
          className="object-cover w-full h-full transform transition-transform group-hover:scale-110 duration-300"
          src={video.thumbnail}
          alt={video.title}
        />
      </div>
    );
  };

  return (
    <div className={`nc-SectionVideos ${className}`}>
      <Heading
        desc="Check out our hottest videos. View more and share more new
          perspectives on just about any topic. Everyone’s welcome."
      >
        🎬 The Videos
      </Heading>

      <div className="flex flex-col relative pr-4 py-4 md:pr-6 md:py-6 xl:pr-14 xl:py-14 lg:flex-row">
        <div className="absolute -top-4 -bottom-4 -right-4 w-2/3 rounded-3xl z-0 bg-[#F0FDFA]"></div>
        <div className="flex-grow relative pb-2 sm:pb-4 lg:pb-0 lg:pr-5 xl:pr-6">
          {renderMainVideo()}
        </div>
        <div className="flex-shrink-0 grid gap-2 md:gap-4 grid-cols-2 lg:gap-6 lg:grid-cols-1 lg:w-40">
          {videos.map(renderSubVideo)}
        </div>
      </div>
    </div>
  );
};

export default SectionVideos;
