import { Component } from '@angular/core';

@Component({
  selector: 'app-maintenance',
  imports: [],
  template: `
    <div class="maintenance">
      <div class="noise"></div>
      <div class="grid-lines"></div>

      <div class="content">
        <div class="badge">
          <span class="dot"></span>
          En maintenance
        </div>

        <h1 class="title">
          <span class="title-line">Je reviens</span>
          <span class="title-line accent">bientôt.</span>
        </h1>

        <p class="description">
          Le site est temporairement hors ligne pour maintenance.<br />
          Merci de votre patience.
        </p>

        <div class="divider"></div>

        <div class="links">
          <a href="https://github.com/bukxy" target="_blank" class="link">GitHub</a>
          <span class="sep">·</span>
          <a href="https://www.linkedin.com/in/peron-nicolas/" target="_blank" class="link"
            >LinkedIn</a
          >
          <span class="sep">·</span>
          <a href="mailto:pro.peron.nicolas2@gmail.com" class="link">Email</a>
        </div>
      </div>

      <div class="corner top-left"></div>
      <div class="corner top-right"></div>
      <div class="corner bottom-left"></div>
      <div class="corner bottom-right"></div>

      <div class="scanline"></div>
    </div>
  `,
  styles: [
    `
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=JetBrains+Mono:wght@300;400&display=swap');

      :host {
        display: block;
        width: 100vw;
        height: 100vh;
      }

      .maintenance {
        position: relative;
        width: 100%;
        height: 100%;
        background: #080808;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        font-family: 'JetBrains Mono', monospace;
      }

      /* Noise texture */
      .noise {
        position: absolute;
        inset: -50%;
        width: 200%;
        height: 200%;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
        opacity: 0.4;
        pointer-events: none;
        animation: drift 8s ease-in-out infinite alternate;
      }

      @keyframes drift {
        from {
          transform: translate(0, 0);
        }
        to {
          transform: translate(-2%, -2%);
        }
      }

      /* Grid lines */
      .grid-lines {
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(rgba(239, 68, 68, 0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(239, 68, 68, 0.04) 1px, transparent 1px);
        background-size: 60px 60px;
        pointer-events: none;
      }

      /* Scanline effect */
      .scanline {
        position: absolute;
        inset: 0;
        background: linear-gradient(transparent 50%, rgba(0, 0, 0, 0.03) 50%);
        background-size: 100% 4px;
        pointer-events: none;
      }

      /* Corner decorations */
      .corner {
        position: absolute;
        width: 24px;
        height: 24px;
        border-color: rgba(239, 68, 68, 0.4);
        border-style: solid;
      }

      .top-left {
        top: 24px;
        left: 24px;
        border-width: 1px 0 0 1px;
      }
      .top-right {
        top: 24px;
        right: 24px;
        border-width: 1px 1px 0 0;
      }
      .bottom-left {
        bottom: 24px;
        left: 24px;
        border-width: 0 0 1px 1px;
      }
      .bottom-right {
        bottom: 24px;
        right: 24px;
        border-width: 0 1px 1px 0;
      }

      /* Content */
      .content {
        position: relative;
        z-index: 10;
        text-align: center;
        padding: 40px;
        animation: fadeUp 0.8s ease both;
      }

      @keyframes fadeUp {
        from {
          opacity: 0;
          transform: translateY(24px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* Badge */
      .badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        border: 1px solid rgba(239, 68, 68, 0.3);
        border-radius: 100px;
        padding: 6px 16px;
        font-size: 0.7rem;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: rgba(239, 68, 68, 0.8);
        margin-bottom: 40px;
        animation: fadeUp 0.8s 0.1s ease both;
      }

      .dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #ef4444;
        animation: pulse 2s ease-in-out infinite;
      }

      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
          transform: scale(1);
        }
        50% {
          opacity: 0.4;
          transform: scale(0.8);
        }
      }

      /* Title */
      .title {
        font-family: 'Syne', sans-serif;
        font-weight: 800;
        font-size: clamp(3rem, 10vw, 7rem);
        line-height: 1;
        letter-spacing: -0.04em;
        margin: 0 0 24px;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .title-line {
        display: block;
        color: #ffffff;
        animation: fadeUp 0.8s 0.2s ease both;
      }

      .title-line.accent {
        color: #ef4444;
        animation-delay: 0.3s;
      }

      /* Description */
      .description {
        font-size: 0.85rem;
        color: rgba(255, 255, 255, 0.4);
        line-height: 1.8;
        margin: 0 0 32px;
        animation: fadeUp 0.8s 0.4s ease both;
      }

      /* Divider */
      .divider {
        width: 40px;
        height: 1px;
        background: rgba(239, 68, 68, 0.4);
        margin: 0 auto 32px;
        animation: fadeUp 0.8s 0.5s ease both;
      }

      /* Links */
      .links {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        animation: fadeUp 0.8s 0.6s ease both;
      }

      .link {
        font-size: 0.75rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.3);
        text-decoration: none;
        transition: color 0.2s;
      }

      .link:hover {
        color: #ef4444;
      }

      .sep {
        color: rgba(255, 255, 255, 0.15);
        font-size: 0.75rem;
      }
    `,
  ],
})
export class Maintenance {}
