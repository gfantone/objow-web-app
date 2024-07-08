import React from 'react';
import {
  BallAnimation,
  BicycleAnimation,
  CheckAnimation,
  ConfettiAnimation,
  FireworksAnimation,
  Like2Animation,
  LikeAnimation,
  Loading2Animation,
  LoadingAnimation,
  NinjaAnimation,
  PlanetAnimation,
  Rocket2Animation,
  RocketAnimation,
  Search2Animation,
  ShareAnimation,
  SparklesAnimation,
  SpeedAnimation,
  Stars2Animation,
  StarsAnimation,
  SuccessAnimation,
  WaterfallAnimation,
} from './components';

const animations = [
  <BallAnimation />,
  <BicycleAnimation />,
  <CheckAnimation />,
  <ConfettiAnimation />,
  <FireworksAnimation />,
  <LikeAnimation />,
  <Like2Animation />,
  <LoadingAnimation />,
  <Loading2Animation />,
  <NinjaAnimation />,
  <PlanetAnimation />,
  <RocketAnimation />,
  <Rocket2Animation />,
  <Search2Animation />,
  <SparklesAnimation />,
  <SpeedAnimation />,
  <ShareAnimation />,
  <StarsAnimation />,
  <Stars2Animation />,
  <SuccessAnimation />,
  <WaterfallAnimation />,
];

const AnimationController = ({ ...props }) => {
  const animation = animations[Math.floor(Math.random() * animations.length)];

  return <div>{animation}</div>;
};

export default AnimationController;
