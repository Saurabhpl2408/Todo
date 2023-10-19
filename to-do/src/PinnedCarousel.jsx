// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import './styles/PinnedCarousel.css'
import PropTypes from 'prop-types';


function PinnedTaskCarousel({ pinnedTasks }) {
    const [currentSlide, setCurrentSlide] = useState(0);
  
    useEffect(() => {
      
      if (currentSlide >= (pinnedTasks ? pinnedTasks.length : 0)) {
        setCurrentSlide((pinnedTasks ? pinnedTasks.length : 0) - 1);
      }
    }, [pinnedTasks, currentSlide]);
  
    const handleNextSlide = () => {
      if (currentSlide < (pinnedTasks ? pinnedTasks.length - 1 : 0)) {
        setCurrentSlide(currentSlide + 1);
      }
    }
  
    const handlePrevSlide = () => {
      if (currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      }
    }
  
    // if (!pinnedTasks || pinnedTasks.length) {
    //   return <div className="pinned-task-carousel">No pinned tasks available.</div>;
    // }
  
    return (
      <div className="pinned-task-carousel">
        <div className="carousel-controls">
          <button onClick={handlePrevSlide} disabled={currentSlide === 0}>←</button>
          <button onClick={handleNextSlide} disabled={currentSlide === (pinnedTasks.length - 1)}>→</button>
        </div>
        <div className="carousel-content">
          {pinnedTasks.map((task, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <h3>{task.name}</h3>
              <p>Date: {task.date}</p>
              <p>Priority: {task.priority}</p>
              <p>Repetitive: {task.isRepetitive ? 'Yes' : 'No'}</p>
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
  