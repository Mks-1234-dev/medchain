"use client";
import React, { useState, useRef } from "react";
import TeamCard from "./TeamCard";
import TeamTag from "./TeamTag";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const TeamData = [
  {
    id: 1,
    title: "Sabyasachi Mohanty",
    description: "Founder & CEO",
    image: "/sabya.png",
    tag: ["Leadership"],
    fulldescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus natus in, velit consequatur reiciendis exercitationem libero hic porro excepturi repellat nostrum quidem aut explicabo voluptas odio ab quas. Sint, mollitia.",
  },
  {
    id: 2,
    title: "Satyajit Parida",
    description: "CMO",
    image: "/Satyajit.png",
    tag: ["Leadership"],
    fulldescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus natus in, velit consequatur reiciendis exercitationem libero hic porro excepturi repellat nostrum quidem aut explicabo voluptas odio ab quas. Sint, mollitia.",
  },
  {
    id: 3,
    title: "Sabyasachi Mohanty",
    description: "Senior Leadership",
    image: "/sabya.png",
    tag: ["Board of Advisor"],
    fulldescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus natus in, velit consequatur reiciendis exercitationem libero hic porro excepturi repellat nostrum quidem aut explicabo voluptas odio ab quas. Sint, mollitia.",
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "This website is made using Next.js and Tailwind CSS.",
    image: "/dramin.png",
    tag: ["Board of Advisor"],
  },
  {
    id: 5,
    title: "Morse Code Keyer with raspberry pi",
    description:
      "Morse code keyer with raspberry pi pico which can be used to send morse code over internet.",
    image: "/sabya.png",
    tag: ["Board of Advisor"],
  },
  {
    id: 6,
    title: "Weather Station with raspberry pi",
    description:
      "Weather Station with raspberry pi and sensors which can be accessed from anywhere.",
    image: "/dramin.png",
    tag: ["Board of Advisor"],
  },
  {
    id: 7,
    title: "Mini Portable Game Console with raspberry pi",
    description:
      "Mini Portable Game Console with raspberry pi pico with audio,can run Java script games.",
    image: "/sabya.png",
    tag: ["Board of Advisor"],
  },
  {
    id: 8,
    title: "Controll over wifi car with raspberry pi",
    description:
      "Remote controll  car made with raspberry pi which can be controlled from phone.",
    image: "/dramin.png",
    tag: ["Board of Advisor"],
  },

  {
    id: 9,
    title: "Pritam Mohanty",
    description: "Co-Founder & CXO",
    image: "/pritam.png",
    tag: ["Leadership"],
  },
];

const Team = () => {
  const [tag, setTag] = useState("Leadership");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const filteredTeam = TeamData.filter((project) => project.tag.includes(tag));

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section
      id="Team"
      style={{
        marginTop: "200px;",
      }}
    >
      <h2
        className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12"
        style={{ marginTop: "100px" }}
      >
        Team
      </h2>
      <div className="flex justify-center gap-4 mb-8">
        <TeamTag
          onClick={handleTagChange}
          name="Leadership"
          isSelected={tag === "Leadership"}
        />
        <TeamTag
          onClick={handleTagChange}
          name="Board of Advisor"
          isSelected={tag === "Board of Advisor"}
        />
      </div>
      <ul ref={ref} className="horizontal-scroll">
        {filteredTeam.map((project, index) => (
          <motion.li
            key={project.id}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <TeamCard
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              onClick={() => handleCardClick(project)}
            />
          </motion.li>
        ))}
      </ul>
      <style jsx global>
        {`
          .horizontal-scroll {
            display: flex; /* Align children in a row */
            overflow-x: auto; /* Enable horizontal scrolling */
            -webkit-overflow-scrolling: touch; /* Smooth scrolling for touch devices */
            gap: 12px; /* Space between items */
            padding: 20px; /* Padding around the items for better spacing */
          }

          .horizontal-scroll::-webkit-scrollbar {
            height: 8px; /* Adjust scrollbar height */
          }

          .horizontal-scroll::-webkit-scrollbar-thumb {
            background-color: darkgrey; /* Scrollbar color */
            border-radius: 10px; /* Rounded corners for scrollbar */
          }
          @media (max-width: 768px) {
            .horizontal-scroll {
              padding: 0;
            }
            .horizontal-scroll::-webkit-scrollbar {
              height: 5px; /* Adjust scrollbar height */
            }
            .horizontal-scroll::-webkit-scrollbar-thumb {
              background-color: darkgrey; /* Scrollbar color */
              border-radius: 10px; /* Rounded corners for scrollbar */
            }
            // make display none for description
            .horizontal-scroll p {
              display: none;
            }
          }
        `}
      </style>
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={handleCloseModal}
        >
          <div
            className="modal-content p-4 bg-white rounded-lg max-w-lg w-full relative"
            style={{ maxHeight: "80vh", overflowY: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-black"
              onClick={handleCloseModal}
              style={{
                color: "black",
                backgroundColor: "grey",
                height: "30px",
                width: "30px",
                borderRadius: "50%",
                textAlign: "center",
                fontSize: "20px",
              }}
            >
              &times;
            </button>
            <Image
              src={selectedProject.image}
              width={500}
              height={300}
              alt="photo"
            />
            <div className="overflow-y">
              <p className="max-w-xl">
                <b>{selectedProject.title}</b>
                <br />
                {selectedProject.fulldescription ||
                  "No full description provided."}
              </p>
            </div>
            {/* <button
              style={{ color: "black", backgroundColor: "grey" }}
              onClick={handleCloseModal}
            >
              Close
            </button> */}
          </div>
        </div>
      )}
      <style jsx global>
        {`
          .modal-content {
            max-height: 80vh;
            overflow-y: auto;
          }
          .modal-content::-webkit-scrollbar {
            width: 10px;
          }
          .modal-content::-webkit-scrollbar-thumb {
            background-color: darkgrey;
            border-radius: 10px;
          }
          .modal-content::-webkit-scrollbar-track {
            background-color: lightgrey;
            border-radius: 10px;
          }
          .modal-content {
            display: flex;
            flex-direction: column;
            gap: 12px;
            padding: 20px;
          }
          p {
            color: black;
          }
          @media (max-width: 768px) {
            .modal-content {
              padding: 10px;
            }
            .modal-content::-webkit-scrollbar {
              width: 5px;
            }
            .modal-content::-webkit-scrollbar-thumb {
              background-color: darkgrey;
              border-radius: 5px;
            }
            .modal-content::-webkit-scrollbar-track {
              background-color: lightgrey;
              border-radius: 5px;
            }
            .modal-content p {
              color: white; /* Ensure text is white on mobile for visibility */
            }
            p {
              position: absolute;
              color: white;
              bottom: 1;
              left: 50;
              width: 96%;
              background-color: rgba(
                0,
                0,
                0,
                0.7
              ); // Semi-transparent black background
              font-size: 16px; // Smaller font size for small screens
              padding: 15px; // Appropriate padding for visibility
              text-align: center; // Center the text
            }
          }
        `}
      </style>
    </section>
  );
};

export default Team;
