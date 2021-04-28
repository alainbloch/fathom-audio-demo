import Head from 'next/head'
import Wave from 'wave-visualizer';
import React, {useEffect} from "react";

const alternateBars = (functionContext) => {
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

const createVisualizer = (audioId, canvasId) => {
  let options = {
    type: alternateBars,
    stroke: 3,
    colors: ["white"],
    point_count: 32,
    width: 288,
    height: 100,
    frameRate: 1,
  };
  let wave = new Wave();

  wave.fromElement(audioId, canvasId, options);
};

export default function Home() {
  useEffect( () => {
    createVisualizer('main-audio', 'audio-visual')
  }, [])

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

          <div className="card">
            <div className="visualizer_container">
              <div className="inner_bottom">
                <canvas id="audio-visual"></canvas>
              </div>
            </div>
            <audio controls id="main-audio" src="/uds_good-grief.mp4">
              Your browser does not support the <code>audio</code> element.
            </audio>
          </div>
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
          min-height:350px;
          background-repeat: no-repeat;
          background-color: black;
          display: flex;
          background-size: contain;
          background-image: url('https://fathom-production.s3.amazonaws.com/podcasts/this_week_in_startups/images/hero.jpg')
        }

        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

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
      `}</style>
    </div>
  )
}
