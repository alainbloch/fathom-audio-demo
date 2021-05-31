import Wave from 'wave-visualizer';
import React, {useEffect} from "react";
import GIF from '@/components/gif';


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
    width: options.width,
  }
  
  useEffect( () => {
    let canvas = document.getElementById(canvasId);

    let ctx = canvas.getContext("2d");

    let wave = new Wave();


    let h = options.height || canvas.height;
    
    let w = options.width || canvas.width;


    if (options.background) {

      let background = new Image();

      background.src = options.background;

      // let background = GIF();

      // background.load(options.background);

      background.onload = () => {
        ctx.drawImage(background, 0,0, w, h);
        options.background = background;
        wave.fromElement(audioId, canvasId, options);
      }
    } else {
      wave.fromElement(audioId, canvasId, options);
    }
  }, [])

  return (
    <div id={containerId}>
      <div className="visualizer_container">
        <div className="inner_bottom">
          <canvas id={canvasId} className="av-canvas" style={inlineStyle}></canvas>
        </div>
      </div>
      <audio controls id={audioId} src={audio}>
        Your browser does not support the <code>audio</code> element.
      </audio>
    </div>
  )
}

export default AudioVisualizer;