"use client";

import React from 'react';
import Lottie from "lottie-react";
import AnimationData from "./Arrow.json"


const AttentionArrow = () => {
  return (
    <Lottie animationData={AnimationData} loop autoplay />
  );
};

export default AttentionArrow
