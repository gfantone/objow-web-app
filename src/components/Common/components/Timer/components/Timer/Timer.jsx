import React, { Component } from 'react';
import Countdown from 'react-countdown-now';

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    return <span>Terminé</span>;
  } else {
    return (
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    );
  }
};

const overtimeRenderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    return <span>En retard</span>;
  } else {
    return (
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    );
  }
};

const Timer = ({ date, overtime }) => {
  const currentRenderer = overtime ? overtimeRenderer : renderer;
  return (
    <div>
      <Countdown date={date} renderer={currentRenderer} />
    </div>
  );
};

export default Timer;
