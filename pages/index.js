import Head from 'next/head'
import React from "react";
import AudioVisualizer from '@/components/audio_visualizer';
import TestVisualizer from '@/components/test_visualizer';

// extraction but changing the beginPath
const drawCircle = ([x, y], diameter, ctx, options = {}) => {
    let { color, lineColor = ctx.strokeStyle } = options
    let radius = (diameter / 2);

    ctx.lineWidth = 1;

    ctx.arc(x, y, radius, 0, 2 * Math.PI);

    ctx.strokeStyle = lineColor

    ctx.stroke();

    ctx.fillStyle = color

    if (color) ctx.fill()

    ctx.beginPath();
};

// Alternative way to render the bars in Wave
const altBars = (functionContext) => {
  let { data, options, ctx, h, w } = functionContext;

    let point_count = options.point_count || 64;
    let percent = h / 255;
    let buffer = (options.stroke * 2)
    let increase = ((w / point_count) - buffer);

    let breakpoint = Math.floor(point_count / options.colors.length);

    for (let point = 1; point <= point_count; point++) {
      let p = data[point]; //get value
      p *= percent;

      let x = (increase * (point)) + options.stroke;

      console.log("x", x);

      let startY = h;

      let endY = (h - p);

      let i = (point / breakpoint) - 1;

      let color = options.colors[i] || options.colors[0];

      ctx.strokeStyle = color;
      ctx.lineWidth = options.stroke;

      // line stroke
      ctx.beginPath();
      ctx.moveTo(x, startY);
      ctx.lineTo(x, endY);
      ctx.stroke();
      
      // circle stroke
      let diameter = (options.stroke - 1);
      if (endY > 2) {
        drawCircle([x, endY], diameter, ctx, { color: color });
      }
    }
};

// Extraction
const realBars = (functionContext) => {
  let { data, options, ctx, h, w } = functionContext;

  let point_count = options.point_count || 64;
  let percent = h / 255;
  let increase = w / point_count;
  let breakpoint = Math.floor(point_count / options.colors.length);

  for (let point = 1; point <= point_count; point++) {
    let p = data[point]; //get value
    p *= percent;

    let x = increase * point;

    ctx.moveTo(x, h);
    ctx.lineTo(x, h - p);

    if (point % breakpoint === 0) {
        let i = (point / breakpoint) - 1;
        ctx.strokeStyle = options.colors[i];
        ctx.stroke();
        ctx.beginPath();
    }
  }
};

const Home = () => {

  let testVisualizations = [
    {
      id: 1,
      options: {
        stroke: 4,
        type: altBars,
        colors: ['white'],
        point_count: 7,
        width: 320,
        // height: 100,
      }
    },

    {
      id: 2,
      options: {
        stroke: 3,
        background: 'https://media.giphy.com/media/FnGJfc18tDDHy/source.gif',
        type: realBars,
        colors: ['blue'],
        point_count: 32,
        width: 288,
        // height: 100,
      }
    },
  ];

  let audioVisualizations = [
    // {
    //   id: 1,
    //   audio: '/audio/uds_good-grief.mp4',
    //   options: {
    //     stroke: 4,
    //     type: altBars,
    //     colors: ['white'],
    //     point_count: 32,
    //     width: 300,
    //     // height: 100,
    //   }
    // },
    // {
    //   id: 2,
    //   audio: '/audio/bt_never-gonna-come-back-down.mp3',
    //   options: {
    //     background: 'https://media.giphy.com/media/YQitE4YNQNahy/source.gif',
    //     stroke: 3,
    //     type: altBars,
    //     colors: ['red'],
    //     point_count: 32,
    //     width: 288,
    //   }
    // },
    // {
    //   id: 4,
    //   audio: '/audio/prodigy_diesel-power.mp3',
    //   options: {
    //     background: 'https://media.giphy.com/media/RyXVu4ZW454IM/source.gif',
    //     stroke: 3,
    //     type: altBars,
    //     colors: ['white'],
    //     point_count: 32,
    //   }
    // },
    // {
    //   id: 3,
    //   audio: '/audio/orbital_halycon+on+on.mp3',
    //   options: {
    //     background: 'https://media.giphy.com/media/FnGJfc18tDDHy/source.gif',
    //     stroke: 3,
    //     type: altBars,
    //     colors: ['white'],
    //     point_count: 32,
    //   }
    // },
  ]

  return (
    <div className="container">
      <Head>
        <title>Fathom Audio Visualizer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Listen to <a href="https://www.fathom.fm">fathom.fm</a>
        </h1>

        <p className="description">
          Audio visualizer examples
        </p>

        <div className="grid">

          {
            testVisualizations.map(
              testData => (
                <div className="card">
                  <TestVisualizer {...testData} />
                </div>
              )
            )
          }

          {
            audioVisualizations.map(
              avData => (
                <div className="card">
                  <AudioVisualizer {...avData} />
                </div>
              )
            )
          }
        </div>
      </main>

      <footer>
        <a
          href="http://www.fathom.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/logo.svg" alt="Fathom Logo" className="logo" />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        #audio-visual {
          overflow: hidden;
          opacity: 1;
        }

        .inner_bottom {
          // position: absolute;
          // right:0;
          // bottom 0;
        }

        .visualizer_container {
          // position: relative;
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

        .av-canvas {
          image-rendering: pixelated;
        }
      `}</style>
    </div>
  )
}

export default Home;
