import Head from 'next/head'
import React from "react";
import AudioVisualizer from '@/components/audio_visualizer'

// Alternative way to render the bars in Wave
const altBars = (functionContext) => {
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

export default function Home() {

  let audioVisualizations = [
    {
      id: 1,
      audio: '/audio/uds_good-grief.mp4',
      background: 'https://i.gifer.com/MDP.gif',
      options: {
        stroke: 3,
        type: altBars,
        colors: ['orange'],
        point_count: 32,
        width: 200,
        height: 100,
      }
    },
    {
      id: 2,
      audio: '/audio/bt_never-gonna-come-back-down.mp3',
      background: 'https://media.giphy.com/media/YQitE4YNQNahy/source.gif',
      options: {
        stroke: 3,
        type: altBars,
        colors: ['red'],
        point_count: 32,
      }
    },
    {
      id: 4,
      audio: '/audio/prodigy_diesel-power.mp3',
      background: 'https://media.giphy.com/media/RyXVu4ZW454IM/source.gif',
      options: {
        stroke: 3,
        type: altBars,
        colors: ['white'],
        point_count: 32,
      }
    },
    {
      id: 3,
      audio: '/audio/orbital_halycon+on+on.mp3',
      background: 'https://media.giphy.com/media/FnGJfc18tDDHy/source.gif',
      options: {
        stroke: 3,
        type: altBars,
        colors: ['white'],
        point_count: 32,
      }
    },
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
          {audioVisualizations.map(
            avData => (
              <div className="card">
                <AudioVisualizer {...avData} />
              </div>
            )
          )}
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
      `}</style>
    </div>
  )
}
