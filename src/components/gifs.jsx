import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeMute, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import GIF_1 from "~/assets/1.mp4";
import GIF_2 from "~/assets/2.mp4";
import GIF_3 from "~/assets/3.mp4";
import GIF_4 from "~/assets/4.mp4";
import GIF_5 from "~/assets/5.mp4";

const topics = [
  {
    name: "Invention Disclosure From",
    gif: GIF_1,
  },
  {
    name: "Figures/Drawings of The Invention",
    gif: GIF_2,
  },
  {
    name: "Crafting Precise Claims With AI",
    gif: GIF_3,
  },
  {
    name: "Complete Specification Report",
    gif: GIF_4,
  },
  {
    name: "Export Finalized Documents",
    gif: GIF_5,
  },
];

function GIFS() {
  const [selectedGif, setSelectedGif] = useState(topics[0].gif);
  const [isFading, setIsFading] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedGif(topics[selectedIndex].gif);
    setIsFading(true);
    const timer = setTimeout(() => setIsFading(false), 500);
    return () => clearTimeout(timer);
  }, [selectedIndex]);

  const handleChangeGif = (index) => {
    if (index === selectedIndex) {
      const video = document.querySelector("video");
      if (video) {
        if (video.paused) {
          video.play();
        } else {
          video.currentTime = 0;
        }
      }
    } else {
      setSelectedIndex(index);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:w-3/4 w-full flex justify-center items-center">
        <div className="w-full flex justify-center items-center bg-transparent relative">
          {selectedGif && (
            <video
              src={selectedGif}
              alt="Selected GIF"
              className={`w-full object-cover transition-opacity duration-500 ${
                isFading ? "opacity-0" : "opacity-100"
              }`}
              loop
              muted={isMuted}
              autoPlay
              preload="auto"
            />
          )}
          <button
            className="absolute top-4 right-4 bg-white text-blue-500 font-bold rounded-full p-3 hover:bg-blue-600 hover:text-white transition-colors duration-300 shadow-lg"
            onClick={toggleMute}>
            <FontAwesomeIcon
              icon={isMuted ? faVolumeMute : faVolumeUp}
              size="sm"
            />
          </button>
        </div>
      </div>
      <div className="lg:w-1/4 flex flex-col justify-center items-center bg-transparent">
        {topics.map((topic, index) => (
          <div
            key={index}
            onClick={() => handleChangeGif(index)}
            className={`my-2 p-3 cursor-pointer border-1 bg-gray-100 text-gray-600 border-transparent 
            hover:border-gray-300 rounded-lg flex flex-col items-center w-full sm:w-1/2 md:w-1/3 lg:w-5/6 ${
              index === selectedIndex
                ? "border-white text-white bg-primary transform scale-110 transition-transform duration-300 ease-in-out"
                : ""
            } transition-transform duration-300 ease-in-out`}>
            <span className="text-2xl md:text-3xl lg:text-4xl font-medium lg:font-extrabold">
              {index + 1}
            </span>
            <span className="text-xs lg:text-base text-center">
              {topic.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GIFS;
