import React, {useEffect} from "react";
import WaveHelper from '@/components/wave_helper';

const visualize = (canvas, ctx, options) => {
  let data = [];

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  for (let point = 1; point <= 64; point++) {
    data.push(getRandomArbitrary(1,100));  
  };

  let h = options.height || canvas.height;
  
  let w = options.width || canvas.width;
  
  ctx.strokeStyle = options.colors[0];
  
  ctx.lineWidth = options.stroke;

  let functionContext = {
    data, options, ctx, h, w
  };

  options.type(functionContext);
}

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
const TestVisualizer = props => {
  const {
    id,
    options
  } = props;

  let containerId = `tv-container-${id}`
  let canvasId = `tv-canvas-${id}`;
  let inlineStyle = {
    width: options.width,
  }
  
  useEffect( () => {

    let canvas = document.getElementById(canvasId);

    let ctx = canvas.getContext("2d");

    if (options.background) {
      let background = new Image();

      let h = options.height || canvas.height;
      
      let w = options.width || canvas.width;


      background.src = options.background;

      background.onload = () => {
        ctx.drawImage(background, 0,0, w, h);
        visualize(canvas, ctx, options);
      }

    } else {
      visualize(canvas, ctx, options);
    }

  }, [])

  return (
    <div id={containerId}>
      <div className="visualizer_container">
        <div className="inner_bottom">
          <canvas id={canvasId} className="av-canvas" style={inlineStyle}></canvas>
        </div>
      </div>
    </div>
  )
}

export default TestVisualizer;