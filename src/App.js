import "./App.css";
import { useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { drawHand } from "./utils/util";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runHandpost = async () => {
    const net = await handpose.load();
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
     // get video properties 
     const video =webcamRef.current.video
     const videoWidth =webcamRef.current.video.videoWidth
     const videoHeight =webcamRef.current.video.videoHeight

    //set video properties
    webcamRef.current.video.width=videoWidth
    webcamRef.current.video.height=videoHeight

   //set canvas properties
   canvasRef.current.width=videoWidth
   canvasRef.current.height=videoHeight

   //make detection
   const  hand=await net.estimateHands(video)

   //draw mesh
   const ctx=canvasRef.current.getContext('2d')
    drawHand(hand,ctx)

    }
  };

useEffect(()=>{

  runHandpost()

  //eslint-disable-next-line
},[])

  return (
    <div className="App">
      <header className="App-header">
        <Webcam className="webcam" ref={webcamRef} />
        <canvas className="canvas" ref={canvasRef} />
      </header>
    </div>
  );
}

export default App;
