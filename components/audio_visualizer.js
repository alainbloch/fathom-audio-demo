import Wave from 'wave-visualizer';
import React, {useEffect} from "react";

// AudioVisualizer component
// @props id (String) distinct id for component
// @props audio (String) url for the audio file
// @props options (Object) properties set options:
//   type (String|Function) can refer to one of the preset visualizer types or a function can be passed in
//   stroke (Integer) Number of pixels wide the stroke is
//   colors (Array) an array of color values (hex or color name)
//   point_count (Integer) number of data channels to display
//   width (Integer) width of the rendered visualizer
//   height (Integer) height of the rendered visualizer
//   frameRate (Integer) Determines how many frames in between rendered (1 is default)
const AudioVisualizer = props => {
  const {
    id,
    audio,
    background,
    options
  } = props;

  let containerId = `av-container-${id}`
  let audioId = `av-audio-${id}`;
  let canvasId = `av-canvas-${id}`;
  let inlineStyle = { 
    "background-image": `url('${background}')`
  }
  
  useEffect( () => {
    let wave = new Wave();

console.log(options);

    wave.fromElement(audioId, canvasId, options);
  }, [])

  return (
    <div id={containerId}>
      <div className="visualizer_container" style={inlineStyle} >
        <div className="inner_bottom">
          <canvas id={canvasId}></canvas>
        </div>
      </div>
      <audio controls id={audioId} src={audio}>
        Your browser does not support the <code>audio</code> element.
      </audio>
      <style jsx>{`
        #audio-visual {
          overflow: hidden;
          opacity: 1;
        }

        .inner_bottom {
          position: absolute;
          right:0;
          bottom 0;
        }

        .visualizer_container {
          position: relative;
          min-height:160px;
          background-repeat: no-repeat;
          background-color: black;
          display: flex;
          background-size: contain;
        }

        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  )
}

export default AudioVisualizer;