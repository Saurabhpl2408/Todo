// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "./styles/PinnedCarousel.css";
import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
function PinnedTaskCarousel({ pinnedTasks }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [savedTasks, setSavedTasks] = useState([]);
  // JSON.parse(localStorage.getItem("tasks"))

  useEffect(() => {
    const stored_tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const filterpinned = stored_tasks.filter((task) => {
      return task.pinned === true;
    });
    setSavedTasks(filterpinned);
  }, []);
  // console.log(savedTasks);

  // const handleLocalStorageChange = (newTasks) => {
  //   const previousTasks = savedTasks; // Store the previous tasks
  //   setSavedTasks(newTasks);

  //   // Compare the previousTasks with newTasks to track pinned changes
  //   const changedTasks = findChangedPinnedTasks(previousTasks, newTasks);
  //   console.log("Pinned changes:", changedTasks);
  // };

  // useEffect(() => {
  //   const handleStorageChange = (e) => {
  //     console.log("Storage change event detected.");
  //     if (e.key === "tasks") {
  //       console.log("Tasks key change detected:", JSON.parse(e.newValue));
  //       handleLocalStorageChange(JSON.parse(e.newValue));
  //     }
  //   };

  //   console.log("Adding storage event listener");
  //   window.addEventListener("storage", handleStorageChange);

  //   return () => {
  //     console.log("Removing storage event listener");
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, []);

  const findChangedPinnedTasks = (previousTasks, newTasks) => {
    return newTasks.filter((newTask) => {
      const prevTask = previousTasks.find(
        (prevTask) => prevTask.id === newTask.id
      );
      return prevTask && prevTask.pinned !== newTask.pinned;
    });
  };

  // useEffect(() => {
  //   if (currentSlide >= (pinnedTasks ? pinnedTasks.length : 0)) {
  //     setCurrentSlide((pinnedTasks ? pinnedTasks.length : 0) - 1);
  //   }
  // }, [pinnedTasks, currentSlide]);

  const handleNextSlide = () => {
    if (currentSlide < (pinnedTasks ? pinnedTasks.length - 1 : 0)) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // if (!pinnedTasks || pinnedTasks.length) {
  //   return <div className="pinned-task-carousel">No pinned tasks available.</div>;
  // }

  return (
    <div className="pinned-task-carousel">
      <div className="carousel-controls">
        <button onClick={handlePrevSlide} disabled={currentSlide === 0}>
          ←
        </button>
        <button
          onClick={handleNextSlide}
          disabled={currentSlide === pinnedTasks.length - 1}
        >
          →
        </button>
      </div>
      <div className="carousel-content">
        {savedTasks.map((task, index) => (
          <div
            key={index}
            className={`carousel-slide ${
              index === currentSlide ? "active" : ""
            }`}
          >
            <h3>{task.name}</h3>
            <p>Date: {task.date}</p>
            <p>Priority: {task.priority}</p>
            <p>Repetitive: {task.isRepetitive ? "Yes" : "No"}</p>
            {task.image && <img src={task.image} alt="Task" />}
          </div>
        ))}
      </div>
    </div>
  );
}

PinnedTaskCarousel.propTypes = {
  pinnedTasks: PropTypes.array.isRequired,
};

export default PinnedTaskCarousel;
