import React, { useEffect } from "react";

const cam = () => {
  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  const snap = document.getElementById("snap");
  const errorMsgElement = document.querySelector("span#errorMsg");

  const constraints = {
    audio: false,
    video: {
      width: 1280, height: 720
    }
  };

  // Success
  function handleSuccess(stream) {
    window.stream = stream;
    video.srcObject = stream;
  }

  // Draw image
  const context = canvas.getContext("2d");
  snap.addEventListener("click", () => {
    context.drawImage(video, 0, 0, 640, 480);
  });

  useEffect(() => {
    // Access webcam
    async function init() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        handleSuccess(stream);
      } catch (e) {
        errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
      }
    }
    // Load init
    init();
  }, []);


  return (
    <div>
      <div className="video-wrap">
        <video id="video" playsInline autoPlay />
      </div>

      <div className="controller">
        <button id="snap">Capture</button>
      </div>

      <canvas id="canvas" width="640" height="480" />
    </div>
  );
};

export default cam;
