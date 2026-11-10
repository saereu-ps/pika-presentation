import os
import re

# Read three.js and real_pika_mascot.js
with open('presentation/static/three.min.js', 'r', encoding='utf-8') as f:
    three_js_code = f.read()

with open('presentation/static/real_pika_mascot.js', 'r', encoding='utf-8') as f:
    mascot_code = f.read()

# Verify zero emojis in mascot_code
emojis = re.findall(r'[\U00010000-\U0010ffff]', mascot_code)
assert len(emojis) == 0, f"Found emojis in mascot code: {emojis}"

html_content = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PIKA WIKI — Executive Presentation Deck</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
  
  <style>
    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }}

    :root {{
      --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --bg-page: #F4F5F7;
      --bg-card: #FFFFFF;
      --bg-dark: #0B1224;
      --text-main: #141517;
      --text-muted: #71717A;
      --text-faint: #A1A1AA;
      --border-subtle: rgba(228, 228, 231, 0.8);
      --accent-charcoal: #141517;
    }}

    body {{
      background-color: var(--bg-page);
      color: var(--text-main);
      font-family: var(--font-sans);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      overflow-x: hidden;
    }}

    /* ══════════════════════════════════════════════════════════════════
       OUTER PRESENTATION DECK WRAPPER (10-Slide Interactive Canvas)
       ══════════════════════════════════════════════════════════════════ */
    .deck-wrapper {{
      max-width: 1420px;
      width: 100%;
      height: 94vh;
      max-height: 900px;
      min-height: 740px;
      background: #FFFFFF;
      border-radius: 36px;
      padding: 24px 36px 20px 36px;
      box-shadow: 0 24px 70px rgba(0, 0, 0, 0.05);
      border: 1px solid var(--border-subtle);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
    }}

    @media (max-width: 900px) {{
      .deck-wrapper {{
        height: auto;
        min-height: 100vh;
        border-radius: 20px;
        padding: 16px;
      }}
    }}

    /* ── Top Header Navigation ── */
    .deck-header {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(244, 245, 247, 0.8);
      z-index: 30;
    }}

    .header-brand {{
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: var(--text-main);
    }}

    .brand-icon {{
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--accent-charcoal);
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 800;
    }}

    .brand-title {{
      font-size: 16px;
      font-weight: 800;
      letter-spacing: -0.02em;
    }}

    .brand-tag {{
      border-radius: 9999px;
      background: #F4F5F7;
      border: 1px solid #E4E4E7;
      padding: 2px 8px;
      font-size: 10px;
      font-weight: 700;
      color: #52525B;
      letter-spacing: 0.04em;
    }}

    .header-center-info {{
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 11px;
      color: var(--text-muted);
    }}

    .header-right-actions {{
      display: flex;
      align-items: center;
      gap: 10px;
    }}

    .project-indicator-pill {{
      display: flex;
      align-items: center;
      gap: 6px;
      border-radius: 9999px;
      background: #FFFFFF;
      border: 1px solid #E4E4E7;
      padding: 4px 12px;
      font-size: 11px;
      font-weight: 600;
      box-shadow: 0 1px 3px rgba(0,0,0,0.02);
    }}

    .indicator-dot {{
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #2563EB;
    }}

    .auto-deck-btn {{
      border-radius: 9999px;
      padding: 5px 14px;
      font-size: 11px;
      font-weight: 600;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
      background: var(--accent-charcoal);
      color: #FFFFFF;
    }}

    .auto-deck-btn.is-paused {{
      background: #FFFFFF;
      color: var(--text-main);
      border: 1px solid #D4D4D8;
    }}

    .auto-pulse-dot {{
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #10B981;
      animation: pulseDot 1.4s infinite;
    }}

    @keyframes pulseDot {{
      0%, 100% {{ opacity: 1; transform: scale(1); }}
      50% {{ opacity: 0.4; transform: scale(1.3); }}
    }}

    /* ══════════════════════════════════════════════════════════════════
       MAIN STAGE: PERSISTENT LEFT STAGE + MULTI-DIRECTIONAL RIGHT STAGE
       ══════════════════════════════════════════════════════════════════ */
    .deck-stage-container {{
      flex: 1;
      margin: 12px 0;
      perspective: 1400px;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }}

    .deck-grid {{
      display: grid;
      grid-template-columns: 4fr 8fr;
      gap: 22px;
      height: 100%;
      min-height: 540px;
      max-height: 610px;
      align-items: stretch;
    }}

    @media (max-width: 900px) {{
      .deck-grid {{
        grid-template-columns: 1fr;
        height: auto;
        max-height: none;
      }}
    }}

    /* ── LEFT STAGE: Persistent 3D PIKA Presenter Dock ── */
    .left-presenter-dock {{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      position: relative;
    }}

    /* Upper White Speech Card with Slanted Cut */
    .speech-bubble-card {{
      clip-path: polygon(0 0, 100% 0, 100% 84%, 0 98%);
      background: #FFFFFF;
      border-radius: 26px 26px 0 0;
      padding: 18px 20px 32px 20px;
      border: 1px solid rgba(228, 228, 231, 0.7);
      box-shadow: 0 4px 18px rgba(0, 0, 0, 0.02);
      position: relative;
      z-index: 20;
    }}

    .speech-header-row {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #71717A;
    }}

    .pose-badge {{
      background: #F4F5F7;
      color: #141517;
      padding: 2px 8px;
      border-radius: 9999px;
      font-weight: 700;
    }}

    .speech-body-text {{
      margin-top: 8px;
      font-size: 12.5px;
      line-height: 1.55;
      font-weight: 500;
      color: #141517;
      min-height: 54px;
    }}

    /* Lower Interlocking Dark Container with 3D Mascot */
    .mascot-dark-dock {{
      clip-path: polygon(0 12%, 100% 0, 100% 100%, 0 100%);
      background: var(--bg-dark);
      border-radius: 0 0 26px 26px;
      margin-top: -24px;
      flex: 1;
      min-height: 310px;
      padding: 34px 18px 18px 18px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 16px 36px rgba(11, 18, 36, 0.35);
      overflow: hidden;
    }}

    .dock-glow-bg {{
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 50% 30%, #1E3A8A 0%, #0B1224 75%);
      opacity: 0.7;
      pointer-events: none;
    }}

    /* Project Switcher Buttons */
    .dock-project-buttons {{
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      gap: 12px;
      z-index: 20;
    }}

    .project-pill-btn {{
      background: transparent;
      border: none;
      text-align: left;
      cursor: pointer;
      color: #94A3B8;
      transition: all 0.2s ease;
    }}

    .project-pill-btn.is-active {{
      color: #60A5FA;
    }}

    .project-pill-btn:hover {{
      transform: scale(1.04);
    }}

    .pill-btn-top {{
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      font-weight: 700;
    }}

    .pill-dot {{
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #64748B;
    }}

    .project-pill-btn.is-active .pill-dot {{
      background: #60A5FA;
      box-shadow: 0 0 8px rgba(96, 165, 250, 0.6);
    }}

    .pill-btn-sub {{
      font-size: 9px;
      color: #64748B;
      margin-top: 1px;
      padding-left: 13px;
    }}

    /* 3D Mascot Stage Box */
    .mascot-3d-stage {{
      position: relative;
      width: 250px;
      height: 290px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
    }}

    .blueprint-stage {{
      width: 250px;
      height: 290px;
      pointer-events: none;
      position: relative;
    }}

    .blueprint-stage canvas {{
      width: 100% !important;
      height: 100% !important;
      display: block;
      object-fit: contain;
    }}

    .mascot-drag-zone {{
      position: absolute;
      inset: 0;
      z-index: 25;
      cursor: grab;
    }}

    .mascot-drag-zone:active {{
      cursor: grabbing;
    }}

    /* ── RIGHT STAGE: Animated Slide Views ── */
    .right-slide-viewport {{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      position: relative;
      overflow: hidden;
    }}

    .slide-view {{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.65s cubic-bezier(0.22, 1, 0.36, 1);
    }}

    /* Multi-Directional Transition Variants */
    .slide-view.transition-monitor-zoom {{
      animation: monitorZoomIn 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }}

    .slide-view.transition-rise-bottom-3d {{
      animation: riseBottom3D 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }}

    .slide-view.transition-diagonal-lock {{
      animation: diagonalLock 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }}

    .slide-view.transition-cascade-up {{
      animation: cascadeUp 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }}

    @keyframes monitorZoomIn {{
      0% {{ opacity: 0; transform: scale(0.82) translateY(60px) rotateX(12deg); }}
      100% {{ opacity: 1; transform: scale(1) translateY(0) rotateX(0); }}
    }}

    @keyframes riseBottom3D {{
      0% {{ opacity: 0; transform: translateY(120px) scale(0.94) rotateX(16deg); }}
      100% {{ opacity: 1; transform: translateY(0) scale(1) rotateX(0); }}
    }}

    @keyframes diagonalLock {{
      0% {{ opacity: 0; transform: translateY(80px) translateX(-25px) skewY(2.5deg); }}
      100% {{ opacity: 1; transform: translateY(0) translateX(0) skewY(0); }}
    }}

    @keyframes cascadeUp {{
      0% {{ opacity: 0; transform: translateY(90px) scale(0.96); }}
      100% {{ opacity: 1; transform: translateY(0) scale(1); }}
    }}

    /* Slide Header */
    .slide-header {{
      margin-bottom: 12px;
    }}

    .slide-tag-row {{
      display: flex;
      align-items: center;
      gap: 8px;
    }}

    .slide-tag-pill {{
      border-radius: 9999px;
      border: 1px solid #E4E4E7;
      background: #FFFFFF;
      padding: 2px 10px;
      font-size: 10px;
      font-weight: 700;
      color: #71717A;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }}

    .demo-live-badge {{
      border-radius: 9999px;
      background: #ECFDF5;
      border: 1px solid #A7F3D0;
      padding: 2px 9px;
      font-size: 10px;
      font-weight: 800;
      color: #059669;
      letter-spacing: 0.04em;
    }}

    .slide-title {{
      font-size: 26px;
      font-weight: 700;
      letter-spacing: -0.03em;
      color: var(--text-main);
      line-height: 1.2;
      margin-top: 4px;
    }}

    .slide-subtitle {{
      font-size: 12px;
      color: var(--text-muted);
      margin-top: 3px;
    }}

    /* Slide Content Card Area */
    .slide-body-cards {{
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }}

    /* ══════════════════════════════════════════════════════════════════
       SLIDE-SPECIFIC DESIGNS (All 10 Slides)
       ══════════════════════════════════════════════════════════════════ */
    
    /* SLIDE 1: Hero Cards */
    .hero-split-grid {{
      display: grid;
      grid-template-columns: 7fr 5fr;
      gap: 16px;
      height: 100%;
      align-items: stretch;
    }}

    .hero-main-card {{
      background: #FFFFFF;
      border-radius: 26px;
      border: 1px solid rgba(228, 228, 231, 0.8);
      padding: 24px 28px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 4px 20px rgba(0,0,0,0.02);
    }}

    .hero-cta-btn {{
      border-radius: 9999px;
      background: var(--accent-charcoal);
      color: #FFFFFF;
      padding: 10px 20px;
      font-size: 12px;
      font-weight: 600;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
      cursor: pointer;
      border: none;
    }}

    .hero-cta-btn:hover {{ background: #27272A; }}

    .hero-interlocking-stack {{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }}

    .hero-stack-top {{
      clip-path: polygon(0 0, 100% 0, 100% 90%, 0 76%);
      background: var(--accent-charcoal);
      color: #FFFFFF;
      border-radius: 24px 24px 0 0;
      padding: 20px 20px 40px 20px;
      flex: 1;
    }}

    .hero-stack-bot {{
      clip-path: polygon(0 0, 100% 24%, 100% 100%, 0 100%);
      background: #FFFFFF;
      border-radius: 0 0 24px 24px;
      border: 1px solid rgba(228, 228, 231, 0.8);
      padding: 30px 20px 20px 20px;
      margin-top: -26px;
    }}

    /* SLIDE 2 & 4: Two Interlocking Comparison Cards */
    .two-cards-grid {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      height: 100%;
      align-items: stretch;
    }}

    .card-legacy {{
      clip-path: polygon(0 0, 100% 0, 100% 92%, 0 100%);
      background: #FFFFFF;
      border-radius: 26px;
      padding: 24px;
      border: 1px solid rgba(228, 228, 231, 0.8);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 2px 10px rgba(0,0,0,0.02);
    }}

    .card-modern {{
      clip-path: polygon(0 6%, 100% 0, 100% 100%, 0 100%);
      background: var(--accent-charcoal);
      color: #FFFFFF;
      border-radius: 26px;
      padding: 28px 24px 24px 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 12px 30px rgba(0,0,0,0.15);
    }}

    /* SLIDE 3, 5, 8: Original PIKA Workspace / Ingestion / Governance */
    .workspace-split-grid {{
      display: grid;
      grid-template-columns: 7fr 5fr;
      gap: 14px;
      height: 100%;
      align-items: stretch;
    }}

    .dash-card-blue {{
      border-radius: 24px;
      background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
      color: #FFFFFF;
      padding: 22px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 8px 24px rgba(37, 99, 235, 0.25);
    }}

    .dash-right-stack {{
      display: flex;
      flex-direction: column;
      gap: 12px;
      justify-content: space-between;
    }}

    .ingest-trigger-card {{
      background: var(--accent-charcoal);
      color: #FFFFFF;
      border-radius: 20px;
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      transition: all 0.2s ease;
    }}

    .ingest-trigger-card:hover {{
      transform: scale(1.02);
    }}

    .compliance-docs-card {{
      background: linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%);
      color: #FFFFFF;
      border-radius: 20px;
      padding: 18px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }}

    .doc-status-item {{
      background: rgba(0, 0, 0, 0.24);
      border-radius: 12px;
      padding: 8px 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      font-size: 11px;
    }}

    .status-badge-ready {{
      background: #FFFFFF;
      color: #0F172A;
      border-radius: 9999px;
      padding: 2px 10px;
      font-size: 10px;
      font-weight: 700;
    }}

    .status-badge-extracting {{
      background: rgba(251, 191, 36, 0.2);
      color: #FDE68A;
      border-radius: 9999px;
      padding: 2px 10px;
      font-size: 10px;
      font-weight: 700;
      animation: pulseDot 1.2s infinite;
    }}

    /* SLIDE 6: 3-Column Clean Data Visualization Cards */
    .metrics-3col-grid {{
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
      height: 100%;
      align-items: stretch;
    }}

    .bento-metric-card {{
      background: #FFFFFF;
      border-radius: 24px;
      border: 1px solid rgba(228, 228, 231, 0.8);
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 4px 18px rgba(0,0,0,0.02);
      cursor: pointer;
      transition: transform 0.2s ease;
    }}

    .bento-metric-card:hover {{ transform: translateY(-3px); }}

    .metric-tag {{
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--text-faint);
    }}

    .giant-stat-number {{
      font-size: 44px;
      font-weight: 700;
      letter-spacing: -0.03em;
      color: var(--text-main);
      font-variant-numeric: tabular-nums;
      margin: 4px 0;
    }}

    /* SLIDE 7: Live Search & Source-Verified Answers */
    .search-demo-container {{
      display: flex;
      flex-direction: column;
      height: 100%;
      gap: 14px;
    }}

    .search-capsule-bar {{
      display: flex;
      align-items: center;
      background: #FFFFFF;
      border-radius: 9999px;
      padding: 8px 18px;
      border: 1px solid #D4D4D8;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.03);
    }}

    .search-input-field {{
      flex: 1;
      border: none;
      outline: none;
      font-size: 13px;
      font-weight: 500;
      color: var(--text-main);
      background: transparent;
      padding: 0 10px;
    }}

    .search-action-btn {{
      background: var(--accent-charcoal);
      color: #FFFFFF;
      border: none;
      border-radius: 9999px;
      padding: 7px 18px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
    }}

    .answer-card-reveal {{
      background: #FFFFFF;
      border-radius: 24px;
      border: 1px solid rgba(228, 228, 231, 0.8);
      padding: 22px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.03);
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      animation: riseBottom3D 0.5s ease forwards;
    }}

    /* SLIDE 9: Live ROI Calculator */
    .calc-split-grid {{
      display: grid;
      grid-template-columns: 7.5fr 4.5fr;
      gap: 14px;
      height: 100%;
      align-items: stretch;
    }}

    .calc-controls-card {{
      background: #FFFFFF;
      border-radius: 24px;
      border: 1px solid rgba(228, 228, 231, 0.8);
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }}

    .calc-tabs-row {{
      display: flex;
      gap: 6px;
    }}

    .calc-tab-btn {{
      border-radius: 12px 12px 0 0;
      padding: 6px 14px;
      font-size: 11px;
      font-weight: 600;
      border: 1px solid transparent;
      border-bottom: none;
      background: transparent;
      color: var(--text-muted);
      cursor: pointer;
    }}

    .calc-tab-btn.is-active {{
      background: #FFFFFF;
      color: var(--text-main);
      border-color: rgba(228, 228, 231, 0.8);
      font-weight: 700;
    }}

    .sliders-2x2-grid {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin: 8px 0;
    }}

    .calc-range-slider {{
      width: 100%;
      height: 5px;
      background: #E4E4E7;
      border-radius: 9999px;
      outline: none;
      accent-color: #141517;
      cursor: pointer;
    }}

    .calc-results-stack {{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }}

    .result-card-white {{
      clip-path: polygon(0 0, 100% 0, 100% 88%, 0 74%);
      background: #FFFFFF;
      border-radius: 22px 22px 0 0;
      border: 1px solid rgba(228, 228, 231, 0.8);
      padding: 20px 20px 36px 20px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 14px;
    }}

    .result-card-dark {{
      clip-path: polygon(0 0, 100% 24%, 100% 100%, 0 100%);
      background: var(--accent-charcoal);
      color: #FFFFFF;
      border-radius: 0 0 22px 22px;
      padding: 28px 20px 20px 20px;
      margin-top: -24px;
    }}

    /* ══════════════════════════════════════════════════════════════════
       BOTTOM FOOTER NAVIGATION CONTROLS
       ══════════════════════════════════════════════════════════════════ */
    .deck-footer {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding-top: 14px;
      border-top: 1px solid rgba(244, 245, 247, 0.8);
      z-index: 30;
    }}

    .footer-counter {{
      font-size: 11px;
      color: var(--text-muted);
    }}

    .footer-counter strong {{
      color: var(--text-main);
    }}

    .slide-pills-nav {{
      display: flex;
      align-items: center;
      gap: 5px;
      background: #FFFFFF;
      border-radius: 9999px;
      padding: 4px 6px;
      border: 1px solid rgba(228, 228, 231, 0.8);
      box-shadow: 0 2px 6px rgba(0,0,0,0.02);
    }}

    .slide-num-btn {{
      height: 26px;
      min-width: 26px;
      border-radius: 9999px;
      border: none;
      background: transparent;
      color: var(--text-faint);
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 3px;
      padding: 0 6px;
      transition: all 0.2s ease;
    }}

    .slide-num-btn.is-active {{
      background: var(--accent-charcoal);
      color: #FFFFFF;
      font-weight: 700;
    }}

    .slide-num-btn:hover:not(.is-active) {{
      background: #F4F5F7;
      color: var(--text-main);
    }}

    .demo-dot-indicator {{
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #10B981;
    }}

    .nav-arrow-btn {{
      width: 26px;
      height: 26px;
      border-radius: 50%;
      border: none;
      background: transparent;
      color: var(--text-muted);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      transition: all 0.2s;
    }}

    .nav-arrow-btn:hover {{ background: #F4F5F7; color: var(--text-main); }}

    .quick-demo-pills {{
      display: flex;
      align-items: center;
      gap: 6px;
    }}

    .quick-pill-btn {{
      border-radius: 9999px;
      background: #FFFFFF;
      border: 1px solid #E4E4E7;
      padding: 4px 10px;
      font-size: 10px;
      font-weight: 600;
      color: #52525B;
      cursor: pointer;
      transition: all 0.2s;
    }}

    .quick-pill-btn:hover {{
      border-color: var(--accent-charcoal);
      color: var(--accent-charcoal);
    }}

    /* ── Mac-Style Auto-Demo Cursor ── */
    #editorialCursor {{
      position: fixed;
      z-index: 9999;
      pointer-events: none;
      display: none;
      align-items: center;
      gap: 8px;
      transition: left 0.7s cubic-bezier(0.22, 1, 0.36, 1), top 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.2s;
    }}

    .cursor-mac-svg {{
      width: 24px;
      height: 24px;
      filter: drop-shadow(0 3px 5px rgba(0,0,0,0.3));
    }}

    .cursor-badge-pill {{
      background: var(--accent-charcoal);
      color: #FFFFFF;
      border-radius: 9999px;
      padding: 3px 10px;
      font-size: 10px;
      font-weight: 600;
      white-space: nowrap;
      box-shadow: 0 4px 12px rgba(0,0,0,0.18);
    }}

    .cursor-click-ring {{
      position: absolute;
      top: -8px;
      left: -8px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.25);
      animation: ping 0.5s cubic-bezier(0, 0, 0.2, 1) infinite;
    }}

    @keyframes ping {{
      75%, 100% {{ transform: scale(2); opacity: 0; }}
    }}
  </style>
</head>
<body>

  <!-- Floating Mac AI Pointer -->
  <div id="editorialCursor">
    <svg class="cursor-mac-svg" viewBox="0 0 24 24" fill="none">
      <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.45 0 .67-.53.35-.85L6.35 2.86a.5.5 0 0 0-.85.35Z" fill="#141517" stroke="#FFFFFF" stroke-width="1.8"/>
    </svg>
    <div id="cursorPing" style="display: none;" class="cursor-click-ring"></div>
    <span id="cursorLabel" class="cursor-badge-pill">Auto-Demo</span>
  </div>

  <!-- Deck Container -->
  <div class="deck-wrapper">

    <!-- 1. Top Header -->
    <header class="deck-header">
      <div class="header-brand">
        <div class="brand-icon">P</div>
        <span class="brand-title">PIKA WIKI</span>
        <span class="brand-tag">EXECUTIVE DECK</span>
      </div>

      <div class="header-center-info">
        <span id="deckSlideTag">01 / EXECUTIVE OVERVIEW</span>
        <span>&middot;</span>
        <span id="deckSlideSubtitleTag">Interactive Presentation</span>
      </div>

      <div class="header-right-actions">
        <div class="project-indicator-pill">
          <span class="indicator-dot"></span>
          <span id="headerProjectName">presale-mock</span>
        </div>
        <button id="autoDeckToggleBtn" class="auto-deck-btn" onclick="toggleAutoDeck()">
          <span id="autoDeckPulse" class="auto-pulse-dot"></span>
          <span id="autoDeckBtnLabel">Auto-Deck: ON</span>
        </button>
      </div>
    </header>

    <!-- 2. Main Stage -->
    <main class="deck-stage-container">
      <div class="deck-grid">

        <!-- LEFT STAGE: Persistent 3D Presenter Stage -->
        <aside class="left-presenter-dock">
          <!-- Upper White Speech Card -->
          <div class="speech-bubble-card">
            <div class="speech-header-row">
              <span>PIKA 3D PRESENTER</span>
              <span id="mascotPoseBadge" class="pose-badge">Pose: wave</span>
            </div>
            <p id="typedSpeechText" class="speech-body-text">
              สวัสดีทุกท่านครับ! เราชื่อ PIKA ผู้ช่วยดูแลคลังความรู้ของคุณ วันนี้เราจะพามาชมระบบพร้อมสาธิต Live Demo แบบอัตโนมัติครับ
            </p>
          </div>

          <!-- Lower Interlocking Dark Container with 3D Mascot -->
          <div class="mascot-dark-dock" id="blueprintUniverse">
            <div class="dock-glow-bg"></div>

            <!-- Project Switcher Buttons -->
            <div class="dock-project-buttons">
              <button type="button" class="project-pill-btn is-active" id="btnPresaleMock" onclick="switchProject('presale-mock')">
                <div class="pill-btn-top">
                  <span>presale-mock</span>
                  <span class="pill-dot"></span>
                </div>
                <div class="pill-btn-sub">6 Ingested Docs</div>
              </button>

              <button type="button" class="project-pill-btn" id="btnGeneralMock" onclick="switchProject('general-mock')">
                <div class="pill-btn-top">
                  <span>general-mock</span>
                  <span class="pill-dot"></span>
                </div>
                <div class="pill-btn-sub">20 Ingested Docs</div>
              </button>
            </div>

            <!-- 3D Mascot Mount Point -->
            <div class="mascot-3d-stage">
              <div class="mascot-drag-zone" id="mascotDragZone" title="ลากเพื่อหมุนตัวละคร 360 องศา"></div>
              <div id="blueprintStage" class="blueprint-stage"></div>
            </div>
          </div>
        </aside>

        <!-- RIGHT STAGE: Animated Slide Viewport -->
        <section class="right-slide-viewport" id="rightViewport">
          <!-- Dynamically populated by renderSlide(idx) -->
        </section>

      </div>
    </main>

    <!-- 3. Bottom Footer Navigation Dock -->
    <footer class="deck-footer">
      <div class="footer-counter">
        Slide <strong id="footerSlideNum">1</strong> of 10 &middot; Use
        <kbd style="background:#FFFFFF; border:1px solid #E4E4E7; border-radius:4px; padding:1px 5px; font-size:10px;">&larr;</kbd>
        <kbd style="background:#FFFFFF; border:1px solid #E4E4E7; border-radius:4px; padding:1px 5px; font-size:10px;">&rarr;</kbd> keys
      </div>

      <!-- Slide Navigation Pills -->
      <nav class="slide-pills-nav">
        <button class="nav-arrow-btn" onclick="prevSlide()">&larr;</button>
        <div id="slidePillsContainer" style="display: flex; gap: 4px;">
          <!-- 10 pill buttons generated by JS -->
        </div>
        <button class="nav-arrow-btn" onclick="nextSlide()">&rarr;</button>
      </nav>

      <!-- Quick Demo Triggers -->
      <div class="quick-demo-pills">
        <button class="quick-pill-btn" onclick="jumpToSlide(2)">Demo 1: 3D Mascot</button>
        <button class="quick-pill-btn" onclick="jumpToSlide(4)">Demo 2: Ingest TOR</button>
        <button class="quick-pill-btn" onclick="jumpToSlide(6)">Demo 3: Live Search</button>
        <button class="quick-pill-btn" onclick="jumpToSlide(8)">Demo 4: ROI Calc</button>
      </div>
    </footer>

  </div>

  <!-- Embedded Three.js -->
  <script>{three_js_code}</script>

  <!-- Embedded Authentic PIKA 3D Mascot Engine -->
  <script>{mascot_code}</script>

  <!-- 10-Slide Interactive Presentation Engine -->
  <script>
    // ══════════════════════════════════════════════════════════════════════════
    // SLIDE DATA DEFINITIONS (10 Executive Slides + 4 Auto-Demos)
    // ══════════════════════════════════════════════════════════════════════════
    const SLIDES = [
      {{
        id: 1,
        tag: "01 / EXECUTIVE OVERVIEW",
        title: "Software & AI For Enterprise Architecture All-In-One Platform",
        subtitle: "ยกระดับการจัดการความรู้ทีม Presale & Architect ด้วยคลังปัญญาองค์กรที่เชื่อมโยงข้อมูลอัตโนมัติ",
        transition: "transition-monitor-zoom",
        pikaPose: "wave",
        pikaSpeech: "สวัสดีทุกท่านครับ! เราชื่อ PIKA ผู้ช่วยดูแลคลังความรู้ของคุณ วันนี้เราจะพามาชมระบบพร้อมสาธิต Live Demo แบบอัตโนมัติครับ",
        durationMs: 8500
      }},
      {{
        id: 2,
        tag: "02 / THE PROBLEM & PARADIGM SHIFT",
        title: "Moving Beyond 'Throwaway AI Chats' To Durable Team Memory",
        subtitle: "เปลี่ยนจากการถาม-ตอบในแชทที่ความรู้สูญหาย สู่ระบบ LLM Wiki ที่สกัดและสะสมองค์ความรู้ระยะยาว",
        transition: "transition-rise-bottom-3d",
        pikaPose: "think",
        pikaSpeech: "การคุยกับแชท AI ทั่วไป พอปิดหน้าต่างความรู้ก็หายไปทันที แต่ PIKA Wiki จะจัดเก็บทุกสเปก TOR และ C4 Model ไว้เป็นความจำถาวรของทีมครับ",
        durationMs: 8500
      }},
      {{
        id: 3,
        tag: "03 / LIVE AUTO-DEMO : 3D WORKSPACE",
        title: "Interactive 3D Hub & Domain-Isolated Repositories",
        subtitle: "แยกคลังความรู้ตามโครงการชัดเจน พร้อมตัวละคร 3D ที่หมุนได้ 360 องศา และเอื้อมมือเลือกโปรเจกต์ได้จริง",
        transition: "transition-diagonal-lock",
        pikaPose: "reach_click",
        pikaSpeech: "ดูนี่นะครับ! เดี๋ยวเราจะเอื้อมมือไปกดสลับคลังข้อมูลระหว่าง presale-mock (6 ฉบับ) และ general-mock (20 ฉบับ) ให้ดูอัตโนมัติเลย",
        isLiveDemo: true,
        durationMs: 9500
      }},
      {{
        id: 4,
        tag: "04 / CORE ENGINE : HYBRID GRAPHRAG",
        title: "Hybrid Graph Database + Vector Semantic RAG",
        subtitle: "ผสานความเข้าใจเชิงโครงสร้างสถาปัตยกรรม (C4 Graph) เข้ากับการค้นหาเนื้อหารายย่อหน้าความแม่นยำสูง",
        transition: "transition-rise-bottom-3d",
        pikaPose: "point",
        pikaSpeech: "เบื้องหลังความแม่นยำของเรา คือการผสาน Graph Database เข้ากับ RAG ทำให้เข้าใจความเชื่อมโยงของระบบใหญ่และตรวจสอบแหล่งที่มาได้ 100% ครับ",
        durationMs: 8500
      }},
      {{
        id: 5,
        tag: "05 / LIVE AUTO-DEMO : TOR INGESTION",
        title: "Automated TOR & RFP Ingestion Pipeline",
        subtitle: "อัปโหลดเอกสาร TOR/RFP เพื่อสกัด C4 Entities และตรวจสอบ TOR Compliance เข้าสู่คลังความรู้อัตโนมัติ",
        transition: "transition-cascade-up",
        pikaPose: "scan",
        pikaSpeech: "กำลังรัน Live Demo อัปโหลดไฟล์ TOR! สังเกตที่การ์ดขวาบนนะครับ ระบบกำลังสกัด C4 Entities และเปลี่ยนสถานะ DOC-01 ถึง DOC-03 เป็น Indexed & Ready!",
        isLiveDemo: true,
        durationMs: 10500
      }},
      {{
        id: 6,
        tag: "06 / AUTOMATION METRICS",
        title: "Streamlining Presale & Architecture Process Automation",
        subtitle: "วัดผลประสิทธิภาพจากการใช้งานจริงด้วยความแม่นยำในการอ้างอิงเอกสารและความเร็วที่เพิ่มขึ้น",
        transition: "transition-cascade-up",
        pikaPose: "celebrate",
        pikaSpeech: "ดูตัวเลขที่พุ่งขึ้นในการ์ดทั้ง 3 ใบสิครับ! ความแม่นยำในการตรวจสอบ TOR สูงถึง +95% ความเร็วเพิ่มขึ้น +60% และลดงานค้นหาซ้ำซ้อนลงถึง -68%!",
        isLiveDemo: true,
        durationMs: 9500
      }},
      {{
        id: 7,
        tag: "07 / LIVE AUTO-DEMO : INTELLIGENT Q&A",
        title: "Source-Verified Architecture Search & Live Querying",
        subtitle: "พิมพ์คำถามค้นหาสเปก TOR และสถาปัตยกรรมข้ามโดเมน พร้อมแสดงคำตอบที่ระบุไฟล์ต้นฉบับทันที",
        transition: "transition-rise-bottom-3d",
        pikaPose: "look_down",
        pikaSpeech: "ตอนนี้ระบบกำลังพิมพ์คำถามลงในช่องค้นหาอัตโนมัติ แล้วกด Search &rarr; เพื่อดึงคำตอบพร้อมอ้างอิงไฟล์ client-overview.md และ competitive-analysis.md ครับ!",
        isLiveDemo: true,
        durationMs: 11000
      }},
      {{
        id: 8,
        tag: "08 / ENTERPRISE GOVERNANCE",
        title: "Private Access Control & 100% Source Traceability",
        subtitle: "ปกป้องข้อมูลความลับของลูกค้าด้วยสิทธิ์การเข้าถึงระดับ Private Repository และตรวจสอบย้อนกลับได้ทุกบรรทัด",
        transition: "transition-rise-bottom-3d",
        pikaPose: "shield",
        pikaSpeech: "ข้อมูลขององค์กรปลอดภัยสูงสุดด้วย ACCESS CONTROL: private และ Local/Private Hosting มั่นใจได้ว่าข้อมูลสำคัญจะไม่รั่วไหลออกสู่ภายนอกครับ",
        durationMs: 8500
      }},
      {{
        id: 9,
        tag: "09 / LIVE AUTO-DEMO : ROI CALCULATOR",
        title: "Try The PIKA Presale Efficiency Calculator",
        subtitle: "จำลองการปรับขนาดทีมและปริมาณเอกสาร TOR เพื่อคำนวณชั่วโมงทำงานและงบประมาณที่ประหยัดได้จริง",
        transition: "transition-diagonal-lock",
        pikaPose: "point",
        pikaSpeech: "เมาส์อัตโนมัติกำลังเลื่อนปรับขนาดทีมและจำนวนเอกสาร TOR บนหลอด Slider ครับ! สังเกตตัวเลขด้านขวาที่พุ่งขึ้นเป็น +3,000 Hrs และ 3.9x Faster สดๆ เลย",
        isLiveDemo: true,
        durationMs: 11000
      }},
      {{
        id: 10,
        tag: "10 / INTERACTIVE SANDBOX",
        title: "Ready For Enterprise Deployment — Try Live Sandbox",
        subtitle: "พร้อมขยายผลสู่ทุกทีม Presale และ Architect สามารถคลิกทดสอบส่งคำถามหรืออัปโหลดไฟล์ได้ทันที",
        transition: "transition-monitor-zoom",
        pikaPose: "wave",
        pikaSpeech: "จบการนำเสนออัตโนมัติแล้วครับ! ตอนนี้ทุกท่านสามารถพิมพ์คำถามในช่องค้นหา กดปุ่ม Ingest เอกสาร หรือสลับดูแต่ละสไลด์ได้อย่างอิสระเลยครับ",
        durationMs: 15000
      }}
    ];

    let currentIdx = 0;
    let isAutoDeck = true;
    let autoDeckTimer = null;
    let selectedProject = "presale-mock";
    let ingestedCount = 3;
    let isIngesting = false;
    let typedSpeechTimer = null;

    // ROI Calculator State
    let squadSize = 10;
    let docsPerMonth = 35;
    let torTime = 35;
    let c4Time = 15;
    let calcTab = "partial";
    let goals = ["Reduce TOR analysis time"];

    // ── Render Function ──
    function renderSlide(idx) {{
      currentIdx = (idx + SLIDES.length) % SLIDES.length;
      const slide = SLIDES[currentIdx];

      // Update Header & Footer
      document.getElementById('deckSlideTag').innerText = slide.tag;
      document.getElementById('footerSlideNum').innerText = slide.id;
      document.getElementById('headerProjectName').innerText = selectedProject;
      document.getElementById('mascotPoseBadge').innerText = "Pose: " + slide.pikaPose;

      // Sync 3D Mascot Pose & Look
      if (typeof window !== "undefined") {{
        window.dispatchEvent(new CustomEvent("pika-pose-change", {{ detail: {{ pose: slide.pikaPose, project: selectedProject }} }}));
        window.dispatchEvent(new CustomEvent("pika-mascot-pose", {{ detail: {{ pose: slide.pikaPose, project: selectedProject }} }}));
      }}

      // Typewriter Speech
      clearInterval(typedSpeechTimer);
      const text = slide.pikaSpeech;
      let charIdx = 0;
      const speechEl = document.getElementById('typedSpeechText');
      speechEl.innerText = "";
      typedSpeechTimer = setInterval(() => {{
        charIdx++;
        speechEl.innerText = text.slice(0, charIdx);
        if (charIdx >= text.length) clearInterval(typedSpeechTimer);
      }}, 18);

      // Render Slide Content View
      const viewport = document.getElementById('rightViewport');
      let bodyHtml = "";

      const headerHtml = slide.id === 1 ? "" : `
        <div class="slide-header">
          <div class="slide-tag-row">
            <span class="slide-tag-pill">${{slide.tag}}</span>
            ${{slide.isLiveDemo ? '<span class="demo-live-badge">LIVE AUTO-DEMO</span>' : ''}}
          </div>
          <h1 class="slide-title">${{slide.title}}</h1>
          <p class="slide-subtitle">${{slide.subtitle}}</p>
        </div>
      `;

      if (slide.id === 1) {{
        // SLIDE 1: Hero Cards
        bodyHtml = `
          <div class="hero-split-grid">
            <div class="hero-main-card">
              <div>
                <span class="slide-tag-pill">The Enterprise Architecture Encyclopedia</span>
                <h2 style="font-size: 28px; font-weight: 700; line-height: 1.18; letter-spacing: -0.03em; margin-top: 14px; color: #141517;">
                  Software &amp; AI For Enterprise Architecture All-In-One Platform
                </h2>
                <p style="font-size: 12.5px; color: #71717A; line-height: 1.6; margin-top: 10px;">
                  Technology alone isn't enough. Intelligent presale architecture starts with a self-evolving AI Wiki — built to empower architects with source-verified C4 &amp; TOR intelligence.
                </p>
              </div>
              <div style="margin-top: 16px; display: flex; align-items: center; gap: 10px;">
                <button class="hero-cta-btn" onclick="jumpToSlide(4)">Jump to Live TOR Demo &rarr;</button>
                <button class="hero-cta-btn" style="background:#FFFFFF; color:#141517; border:1px solid #D4D4D8;" onclick="jumpToSlide(6)">Test Live Search</button>
              </div>
            </div>

            <div class="hero-interlocking-stack">
              <div class="hero-stack-top">
                <div style="display: flex; justify-content: space-between; font-size: 10px; color: #A1A1AA;">
                  <span>HYBRID ENGINE</span>
                  <span style="color: #34D399; font-weight: 700;">● ACTIVE</span>
                </div>
                <div style="margin-top: 14px;">
                  <p style="font-size: 26px; font-weight: 700; letter-spacing: -0.02em;">Graph + RAG</p>
                  <p style="font-size: 11px; color: #A1A1AA; margin-top: 2px;">26 Verified Markdown &amp; C4 Docs Indexed</p>
                </div>
              </div>

              <div class="hero-stack-bot">
                <h3 style="font-size: 18px; font-weight: 700; color: #141517; line-height: 1.2;">
                  AI-Powered<br>TOR Diagnostics
                </h3>
                <p style="margin-top: 6px; font-size: 11px; color: #71717A; line-height: 1.5;">
                  Get fast, source-verified answers with the help of Hybrid Graph + RAG.
                </p>
              </div>
            </div>
          </div>
        `;
      }} else if (slide.id === 2 || slide.id === 4) {{
        // SLIDE 2 & 4: Two Interlocking Comparison Cards
        const isS2 = slide.id === 2;
        bodyHtml = `
          <div class="two-cards-grid">
            <div class="card-legacy">
              <div>
                <span class="slide-tag-pill">${{isS2 ? "Legacy Approach" : "Layer 01 · Semantic Vector"}}</span>
                <h3 style="margin-top: 12px; font-size: 22px; font-weight: 700; color: #141517;">
                  ${{isS2 ? "Throwaway AI Chats" : "Dense Vector RAG Retrieval"}}
                </h3>
                <p style="margin-top: 8px; font-size: 11.5px; line-height: 1.55; color: #71717A;">
                  ${{isS2 ? "การถาม-ตอบในแชททั่วไปไม่สามารถสะสมเป็นฐานความรู้ของทีมได้ เมื่อปิดแชทบริบทของโปรเจกต์ก็สูญหายทันที" : "ค้นหาเนื้อหารายย่อหน้าจากเอกสาร TOR และ Proposal ด้วย Embedding ความแม่นยำสูง พร้อมผูก Citation ย้อนกลับ"}}
                </p>
              </div>
              <div style="margin-top: 16px; background: #F4F5F7; border-radius: 16px; padding: 12px 16px;">
                <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: 700;">
                  <span>Knowledge Retention</span>
                  <span>${{isS2 ? "12%" : "98.4%"}}</span>
                </div>
                <div style="margin-top: 8px; height: 7px; width: 100%; background: #E4E4E7; border-radius: 9999px; overflow: hidden;">
                  <div style="height: 100%; background: #141517; width: ${{isS2 ? "12%" : "98.4%"}};"></div>
                </div>
              </div>
            </div>

            <div class="card-modern">
              <div>
                <span class="slide-tag-pill" style="background: rgba(255,255,255,0.15); color: #FFFFFF; border: none;">${{isS2 ? "PIKA Wiki Standard" : "Layer 02 · C4 Knowledge Graph"}}</span>
                <h3 style="margin-top: 12px; font-size: 22px; font-weight: 700; color: #FFFFFF;">
                  ${{isS2 ? "Self-Evolving Enterprise Wiki" : "Structural Graph Entities"}}
                </h3>
                <p style="margin-top: 8px; font-size: 11.5px; line-height: 1.55; color: #D4D4D8;">
                  ${{isS2 ? "เปลี่ยนทุกไฟล์ Markdown, TOR และ C4 Model ให้เป็นคลังปัญญากลางของทีมที่อัปเดตและเชื่อมโยงอัตโนมัติ" : "สกัดความสัมพันธ์ระหว่าง System, Container, Component และข้อกำหนด TOR ลงในฐานข้อมูลกราฟ"}}
                </p>
              </div>
              <div style="margin-top: 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <div style="background: rgba(255,255,255,0.1); border-radius: 14px; padding: 10px 14px;">
                  <p style="font-size: 20px; font-weight: 700;">100%</p>
                  <p style="font-size: 9px; color: #A1A1AA;">Source Traceable</p>
                </div>
                <div style="background: rgba(255,255,255,0.1); border-radius: 14px; padding: 10px 14px;">
                  <p style="font-size: 20px; font-weight: 700;">C4 Model</p>
                  <p style="font-size: 9px; color: #A1A1AA;">Auto-Extracted</p>
                </div>
              </div>
            </div>
          </div>
        `;
      }} else if (slide.id === 3 || slide.id === 5 || slide.id === 8) {{
        // SLIDE 3, 5, 8: Workspace, Ingestion, Governance
        const isS8 = slide.id === 8;
        const isS5 = slide.id === 5;
        bodyHtml = `
          <div class="workspace-split-grid">
            <div class="dash-card-blue">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <h3 style="font-size: 18px; font-weight: 800; text-transform: uppercase;">${{selectedProject}}</h3>
                  <div style="display: flex; gap: 6px;">
                    <span style="background: rgba(255,255,255,0.2); padding: 2px 10px; border-radius: 9999px; font-size: 10px;">${{selectedProject}}</span>
                    <span style="background: rgba(255,255,255,0.2); padding: 2px 10px; border-radius: 9999px; font-size: 10px; font-weight: 700;">active</span>
                  </div>
                </div>

                <div style="margin-top: 14px; background: rgba(0,0,0,0.2); border-radius: 16px; padding: 12px 16px;">
                  <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: 700;">
                    <span>${{selectedProject}}</span>
                    <span style="background: rgba(0,0,0,0.5); padding: 2px 8px; border-radius: 9999px; font-size: 9px;">v1.0-prod</span>
                  </div>
                  <p style="margin-top: 6px; font-size: 11.5px; color: #DBEAFE; line-height: 1.5;">
                    พิมพ์เขียวสถาปัตยกรรมและข้อกำหนดโครงการ ${{selectedProject}} บันทึกในคลังข้อมูล PIKA WIKI (มีเอกสารถูกประมวลผลแล้ว ${{selectedProject === "presale-mock" ? "6" : "20"}} ฉบับ)
                  </p>
                </div>
              </div>

              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 12px;">
                <div style="background: rgba(0,0,0,0.2); border-radius: 12px; padding: 8px 10px;">
                  <p style="font-size: 9px; color: #93C5FD;">PROJECT ID</p>
                  <p style="font-weight: 700; font-size: 11px; margin-top: 2px;">${{selectedProject}}</p>
                </div>
                <div style="background: rgba(0,0,0,0.2); border-radius: 12px; padding: 8px 10px;">
                  <p style="font-size: 9px; color: #93C5FD;">ARCHITECTURE</p>
                  <p style="font-weight: 700; font-size: 11px; margin-top: 2px;">presale</p>
                </div>
                <div style="${{isS8 ? 'background:#FFFFFF; color:#141517; font-weight:800; transform:scale(1.05); box-shadow:0 4px 14px rgba(0,0,0,0.3);' : 'background:rgba(0,0,0,0.2);'}} border-radius: 12px; padding: 8px 10px; transition: all 0.3s;">
                  <p style="font-size: 9px; opacity: 0.8;">ACCESS CONTROL</p>
                  <p style="font-weight: 700; font-size: 11px; margin-top: 2px;">private</p>
                </div>
              </div>
            </div>

            <div class="dash-right-stack">
              <div class="ingest-trigger-card" id="cardIngestTrigger" onclick="simulateIngest()">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <div style="width: 36px; height: 36px; background: #F59E0B; border-radius: 10px; color: #0F172A; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 11px;">
                    DOC
                  </div>
                  <div>
                    <h4 style="font-size: 11px; font-weight: 700;">TOR &amp; DOCUMENT INGESTION</h4>
                    <p style="font-size: 10px; color: #A1A1AA; margin-top: 2px;" id="ingestSubLabel">
                      ${{isIngesting ? "Extracting C4 Entities..." : "Click to simulate TOR/RFP ingestion"}}
                    </p>
                  </div>
                </div>
                <span style="width: 24px; height: 24px; border-radius: 50%; background: #FFFFFF; color: #141517; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700;">&nearr;</span>
              </div>

              <div class="compliance-docs-card">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <h4 style="font-size: 11px; font-weight: 800;">TOR COMPLIANCE</h4>
                  <span style="background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 9999px; font-size: 9px;">${{selectedProject}} &middot; v1.0-prod</span>
                </div>

                <div style="margin: 8px 0;" id="complianceDocsList">
                  <div class="doc-status-item">
                    <div>
                      <span style="background: rgba(0,0,0,0.4); padding: 1px 6px; border-radius: 4px; font-size: 9px; font-weight: 700;">DOC-01</span>
                      <strong style="margin-left: 4px;">client-overview.md</strong>
                    </div>
                    <span class="${{ingestedCount >= 1 ? 'status-badge-ready' : 'status-badge-extracting'}}">
                      ${{ingestedCount >= 1 ? "Indexed &amp; Ready" : "Extracting C4..."}}
                    </span>
                  </div>

                  <div class="doc-status-item">
                    <div>
                      <span style="background: rgba(0,0,0,0.4); padding: 1px 6px; border-radius: 4px; font-size: 9px; font-weight: 700;">DOC-02</span>
                      <strong style="margin-left: 4px;">competitive-analysis.md</strong>
                    </div>
                    <span class="${{ingestedCount >= 2 ? 'status-badge-ready' : 'status-badge-extracting'}}">
                      ${{ingestedCount >= 2 ? "Indexed &amp; Ready" : "Extracting C4..."}}
                    </span>
                  </div>

                  <div class="doc-status-item">
                    <div>
                      <span style="background: rgba(0,0,0,0.4); padding: 1px 6px; border-radius: 4px; font-size: 9px; font-weight: 700;">DOC-03</span>
                      <strong style="margin-left: 4px;">architecture-c4-spec.md</strong>
                    </div>
                    <span class="${{ingestedCount >= 3 ? 'status-badge-ready' : 'status-badge-extracting'}}">
                      ${{ingestedCount >= 3 ? "Indexed &amp; Ready" : "Extracting C4..."}}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      }} else if (slide.id === 6) {{
        // SLIDE 6: 3-Column Clean Data Visualization Cards
        bodyHtml = `
          <div class="metrics-3col-grid">
            <!-- Card 1: Vertical Bar Chart -->
            <div class="bento-metric-card" onclick="boostDeckMetrics()">
              <div>
                <span class="metric-tag">TOR COMPLIANCE ACCURACY</span>
                <div class="giant-stat-number" id="deckMetric1">+95%</div>
                <p style="font-size: 11px; color: #71717A; line-height: 1.5;">
                  Ensuring verified source traceability across enterprise TOR &amp; RFP documents.
                </p>
              </div>
              <div style="height: 110px; display: flex; align-items: flex-end; justify-content: space-between; gap: 8px; border-bottom: 1px solid #E4E4E7; padding-bottom: 6px;">
                <div style="flex:1; background: #F4F5F7; border-radius: 6px 6px 0 0; height: 38%;"></div>
                <div style="flex:1; background: #F4F5F7; border-radius: 6px 6px 0 0; height: 54%;"></div>
                <div style="flex:1; background: #141517; border-radius: 6px 6px 0 0; height: 95%; display: flex; align-items: flex-start; justify-content: center; padding-top: 4px;">
                  <span style="color:#FFFFFF; font-size:9px; font-weight:700;">+95%</span>
                </div>
                <div style="flex:1; background: #F4F5F7; border-radius: 6px 6px 0 0; height: 62%;"></div>
                <div style="flex:1; background: #F4F5F7; border-radius: 6px 6px 0 0; height: 70%;"></div>
              </div>
            </div>

            <!-- Card 2: Area Chart with Vertical Pin -->
            <div class="bento-metric-card" onclick="boostDeckMetrics()">
              <div>
                <span class="metric-tag">PRESALE VELOCITY PROGRESS</span>
                <div class="giant-stat-number" id="deckMetric2">+60%</div>
                <p style="font-size: 11px; color: #71717A; line-height: 1.5;">
                  AI-driven C4 entity extraction increased architecture drafting efficiency.
                </p>
              </div>
              <div style="position: relative; height: 110px; display: flex; flex-direction: column; justify-content: flex-end;">
                <svg viewBox="0 0 300 120" style="width: 100%; height: 90px;" preserveAspectRatio="none">
                  <path d="M 0 85 Q 45 80, 75 60 T 150 18 T 225 45 T 300 35 L 300 120 L 0 120 Z" fill="#F4F5F7"/>
                </svg>
                <div style="position: absolute; left: 50%; bottom: 0; height: 95px; width: 1px; background: #141517; display: flex; flex-direction: column; align-items: center;">
                  <span style="background: #141517; color: #FFFFFF; font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 9999px; transform: translateY(-50%);">+60%</span>
                </div>
              </div>
            </div>

            <!-- Card 3: Horizontal Comparison -->
            <div class="bento-metric-card" onclick="boostDeckMetrics()">
              <div>
                <span class="metric-tag">MANUAL REVIEW REDUCTION</span>
                <div class="giant-stat-number" id="deckMetric3">-68%</div>
                <p style="font-size: 11px; color: #71717A; line-height: 1.5;">
                  Eliminates repetitive manual document cross-checking across squads.
                </p>
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 9px; color: #A1A1AA; width: 55px;">Without AI</span>
                  <div style="flex: 1; background: #E4E4E7; border-radius: 6px; height: 26px; display: flex; align-items: center; justify-content: flex-end; padding-right: 8px;">
                    <span style="font-size: 10px; font-weight: 700; color: #141517;">+150%</span>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 9px; font-weight: 700; color: #141517; width: 55px;">With PIKA</span>
                  <div style="width: 48%; background: #141517; border-radius: 6px; height: 26px; display: flex; align-items: center; justify-content: flex-end; padding-right: 8px;">
                    <span style="font-size: 10px; font-weight: 700; color: #FFFFFF;">+48%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      }} else if (slide.id === 7 || slide.id === 10) {{
        // SLIDE 7 & 10: Live Search & Q&A
        bodyHtml = `
          <div class="search-demo-container">
            <form onsubmit="handleSearchSubmit(event)" class="search-capsule-bar">
              <span style="font-size: 11px; font-weight: 700; color: #A1A1AA; text-transform: uppercase;">Query</span>
              <input type="text" id="demoSearchInput" class="search-input-field" placeholder="ค้นหาโปรเจกต์ สถาปัตยกรรม สเปก TOR หรือพิมพ์ถาม PIKA ได้เลย..." value="">
              <button type="submit" class="search-action-btn" id="searchSubmitBtn">Search &rarr;</button>
            </form>

            <div class="answer-card-reveal" id="answerCardReveal">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span class="slide-tag-pill" style="background: #ECFDF5; color: #059669; border-color: #A7F3D0;">VERIFIED ANSWER &middot; HYBRID GRAPHRAG</span>
                  <span style="font-size: 11px; color: #A1A1AA;">Latency: 742ms</span>
                </div>
                <h3 style="font-size: 17px; font-weight: 700; color: #141517; margin-top: 10px;">
                  ผลการสกัดโครงสร้างสถาปัตยกรรมและข้อกำหนด TOR:
                </h3>
                <p style="font-size: 12px; color: #52525B; line-height: 1.6; margin-top: 6px;" id="answerParagraph">
                  ระบบ <strong>presale-mock</strong> ประกอบด้วย C4 Container ทั้งหมด 4 ชิ้นส่วนหลัก ได้แก่ Frontend Portal, Hybrid Graph Service, Semantic Embedder และ Secure Vault ผ่านการตรวจสอบข้อกำหนด TOR ครบถ้วน 100%
                </p>
              </div>

              <div style="margin-top: 12px; background: #F4F5F7; border-radius: 14px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center;">
                <div style="font-size: 11px; color: #52525B;">
                  <span style="font-weight: 700;">Verified Citations:</span> DOC-01 client-overview.md &middot; DOC-02 competitive-analysis.md
                </div>
                <button class="hero-cta-btn" style="padding: 4px 12px; font-size: 10px;" onclick="simulateIngest()">+ Re-run Ingestion</button>
              </div>
            </div>
          </div>
        `;
      }} else if (slide.id === 9) {{
        // SLIDE 9: Live ROI Calculator
        const goalBonus = 1 + goals.length * 0.18;
        const annualHoursSaved = Math.round((squadSize * 45 + docsPerMonth * 18 + (60 - torTime) * 6) * goalBonus);
        const costSavingsK = Math.max(12, Math.round((annualHoursSaved / 75) * (1 + (60 - c4Time) * 0.015)));
        const speedMultiplier = Math.min(4.5, Math.max(1.2, 1.1 + (squadSize / 25) * 1.4 + (docsPerMonth / 85) * 1.4));

        bodyHtml = `
          <div class="calc-split-grid">
            <div class="calc-controls-card">
              <div class="calc-tabs-row">
                <button class="calc-tab-btn is-active">Partially Digital</button>
                <button class="calc-tab-btn">Manual / Paper-based</button>
                <button class="calc-tab-btn">Fully Digital (without AI)</button>
              </div>

              <div class="sliders-2x2-grid">
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: 600;">
                    <span>Presale Squad Size</span>
                    <span id="readoutSquad">${{squadSize}} Architects</span>
                  </div>
                  <input type="range" min="1" max="100" value="${{squadSize}}" class="calc-range-slider" id="sliderSquad" oninput="updateDeckCalc()">
                </div>

                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: 600;">
                    <span>Avg. TOR Docs / Month</span>
                    <span id="readoutDocs">${{docsPerMonth}} Docs</span>
                  </div>
                  <input type="range" min="1" max="100" value="${{docsPerMonth}}" class="calc-range-slider" id="sliderDocs" oninput="updateDeckCalc()">
                </div>

                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: 600;">
                    <span>Avg. TOR Analysis Time</span>
                    <span id="readoutTor">${{torTime}} Hrs</span>
                  </div>
                  <input type="range" min="1" max="60" value="${{torTime}}" class="calc-range-slider" id="sliderTor" oninput="updateDeckCalc()">
                </div>

                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: 600;">
                    <span>Avg. C4 Drafting Time</span>
                    <span id="readoutC4">${{c4Time}} Hrs</span>
                  </div>
                  <input type="range" min="1" max="60" value="${{c4Time}}" class="calc-range-slider" id="sliderC4" oninput="updateDeckCalc()">
                </div>
              </div>

              <div>
                <p style="font-size: 10px; font-weight: 700; color: #71717A; text-transform: uppercase;">Main Goals</p>
                <div style="display: flex; gap: 8px; margin-top: 6px;" id="deckGoalsContainer">
                  <span class="slide-tag-pill" style="background:#141517; color:#FFFFFF; border:none; cursor:pointer;">&check; Reduce TOR analysis time</span>
                  <span class="slide-tag-pill" style="cursor:pointer;" onclick="toggleDeckGoal('Automate C4 routine tasks')">&check; Automate C4 routine tasks</span>
                </div>
              </div>
            </div>

            <div class="calc-results-stack">
              <div class="result-card-white">
                <div>
                  <div style="font-size: 32px; font-weight: 700; color: #141517;" id="resultHours">+${{annualHoursSaved.toLocaleString()}} Hrs</div>
                  <p style="font-size: 11px; color: #A1A1AA; margin-top: 2px;">Annual Time Saved</p>
                </div>
                <div>
                  <div style="font-size: 32px; font-weight: 700; color: #141517;" id="resultCost">${{costSavingsK}}K</div>
                  <p style="font-size: 11px; color: #A1A1AA; margin-top: 2px;">Potential Cost Savings</p>
                </div>
              </div>

              <div class="result-card-dark">
                <div style="font-size: 26px; font-weight: 700;" id="resultSpeed">${{speedMultiplier.toFixed(1)}}x Faster</div>
                <p style="font-size: 11px; color: #A1A1AA; margin-top: 2px;">Diagnostics compared to standard protocols</p>
              </div>
            </div>
          </div>
        `;
      }}

      viewport.innerHTML = `
        <div class="slide-view ${{slide.transition}}">
          ${{headerHtml}}
          <div class="slide-body-cards">
            ${{bodyHtml}}
          </div>
        </div>
      `;

      // Update Navigation Pills
      updateSlidePills();

      // Trigger Auto-Demo Sequencer for this slide
      handleAutoDemoForSlide(slide);

      // Auto-Deck Timer
      if (isAutoDeck) {{
        clearTimeout(autoDeckTimer);
        autoDeckTimer = setTimeout(() => {{
          renderSlide(currentIdx + 1);
        }}, slide.durationMs);
      }}
    }}

    function updateSlidePills() {{
      const container = document.getElementById('slidePillsContainer');
      container.innerHTML = SLIDES.map((s, idx) => `
        <button class="slide-num-btn ${{currentIdx === idx ? 'is-active' : ''}}" onclick="jumpToSlide(${{idx}})" title="${{s.title}}">
          <span>${{s.id}}</span>
          ${{s.isLiveDemo && currentIdx !== idx ? '<span class="demo-dot-indicator"></span>' : ''}}
        </button>
      `).join('');
    }}

    function jumpToSlide(idx) {{
      isAutoDeck = false;
      document.getElementById('autoDeckBtnLabel').innerText = "Play Auto-Deck";
      document.getElementById('autoDeckToggleBtn').classList.add('is-paused');
      clearTimeout(autoDeckTimer);
      hidePointer();
      renderSlide(idx);
    }}

    function prevSlide() {{ jumpToSlide(currentIdx - 1); }}
    function nextSlide() {{ jumpToSlide(currentIdx + 1); }}

    function toggleAutoDeck() {{
      isAutoDeck = !isAutoDeck;
      const btn = document.getElementById('autoDeckToggleBtn');
      const label = document.getElementById('autoDeckBtnLabel');
      if (isAutoDeck) {{
        btn.classList.remove('is-paused');
        label.innerText = "Auto-Deck: ON";
        renderSlide(currentIdx);
      }} else {{
        btn.classList.add('is-paused');
        label.innerText = "Play Auto-Deck";
        clearTimeout(autoDeckTimer);
        hidePointer();
      }}
    }}

    // Project Switcher
    function switchProject(p) {{
      selectedProject = p;
      document.getElementById('headerProjectName').innerText = p;
      document.getElementById('btnPresaleMock').classList.toggle('is-active', p === 'presale-mock');
      document.getElementById('btnGeneralMock').classList.toggle('is-active', p === 'general-mock');
      if (typeof window !== "undefined") {{
        window.dispatchEvent(new CustomEvent("pika-project-reach-click", {{ detail: {{ id: p }} }}));
        window.dispatchEvent(new CustomEvent("pika-pose-change", {{ detail: {{ pose: "reach_click", project: p }} }}));
      }}
    }}

    // Auto-Demo Cursor Controls
    function showPointer(x, y, label, clicking = false) {{
      const c = document.getElementById('editorialCursor');
      const ping = document.getElementById('cursorPing');
      const lbl = document.getElementById('cursorLabel');
      c.style.display = 'flex';
      c.style.left = x;
      c.style.top = y;
      lbl.innerText = label || "Auto-Demo";
      ping.style.display = clicking ? 'block' : 'none';
    }}

    function hidePointer() {{
      const c = document.getElementById('editorialCursor');
      c.style.display = 'none';
    }}

    // Auto-Demo Sequencer
    function handleAutoDemoForSlide(slide) {{
      hidePointer();

      // SLIDE 3: Auto-Demo 1 (Mascot & Project Switch)
      if (slide.id === 3) {{
        setTimeout(() => {{
          showPointer("160px", "48%", "Click general-mock", true);
          switchProject("general-mock");
        }}, 1400);

        setTimeout(() => {{
          showPointer("160px", "40%", "Switch back to presale-mock", true);
          switchProject("presale-mock");
        }}, 4800);

        setTimeout(hidePointer, 7200);
      }}

      // SLIDE 5: Auto-Demo 2 (TOR Ingestion Pipeline)
      if (slide.id === 5) {{
        ingestedCount = 0;
        isIngesting = false;
        setTimeout(() => {{
          showPointer("68%", "34%", "Simulate Ingesting TOR_Enterprise_Spec.pdf", true);
          simulateIngest();
        }}, 1200);

        setTimeout(() => {{ ingestedCount = 1; updateDocsList(); }}, 3200);
        setTimeout(() => {{ ingestedCount = 2; updateDocsList(); }}, 4800);
        setTimeout(() => {{
          ingestedCount = 3;
          updateDocsList();
          showPointer("74%", "62%", "All 3 Docs Indexed & Ready");
        }}, 6400);

        setTimeout(hidePointer, 8200);
      }}

      // SLIDE 7: Auto-Demo 3 (Live Search & Q&A)
      if (slide.id === 7) {{
        const q = "สรุปโครงสร้าง C4 Architecture และสถานะ TOR Compliance ของ presale-mock";
        const input = document.getElementById('demoSearchInput');
        if (input) {{
          input.value = "";
          setTimeout(() => {{
            showPointer("55%", "24%", "Typing architectural query...");
            let i = 0;
            const t = setInterval(() => {{
              i++;
              input.value = q.slice(0, i);
              if (i >= q.length) {{
                clearInterval(t);
                showPointer("82%", "24%", "Click Search &rarr;", true);
                setTimeout(() => {{
                  const rev = document.getElementById('answerCardReveal');
                  if (rev) rev.style.display = 'flex';
                  hidePointer();
                }}, 700);
              }}
            }}, 32);
          }}, 1200);
        }}
      }}

      // SLIDE 9: Auto-Demo 4 (ROI Calculator)
      if (slide.id === 9) {{
        setTimeout(() => {{
          showPointer("45%", "64%", "Enable C4 Automation Goal", true);
          toggleDeckGoal("Automate C4 routine tasks");
        }}, 1400);

        setTimeout(() => {{
          showPointer("38%", "45%", "Scale Squad to 25 & Docs to 85", true);
          squadSize = 25;
          docsPerMonth = 85;
          torTime = 20;
          c4Time = 8;
          updateDeckCalc();
        }}, 3400);

        setTimeout(hidePointer, 6400);
      }}
    }}

    function simulateIngest() {{
      isIngesting = true;
      const sub = document.getElementById('ingestSubLabel');
      if (sub) sub.innerText = "Uploading & Extracting C4 Entities...";
      setTimeout(() => {{
        isIngesting = false;
        ingestedCount = 3;
        updateDocsList();
        if (sub) sub.innerText = "All Documents Ingested & Verified";
      }}, 3000);
    }}

    function updateDocsList() {{
      const list = document.getElementById('complianceDocsList');
      if (!list) return;
      list.innerHTML = `
        <div class="doc-status-item">
          <div>
            <span style="background: rgba(0,0,0,0.4); padding: 1px 6px; border-radius: 4px; font-size: 9px; font-weight: 700;">DOC-01</span>
            <strong style="margin-left: 4px;">client-overview.md</strong>
          </div>
          <span class="${{ingestedCount >= 1 ? 'status-badge-ready' : 'status-badge-extracting'}}">
            ${{ingestedCount >= 1 ? "Indexed &amp; Ready" : "Extracting C4..."}}
          </span>
        </div>

        <div class="doc-status-item">
          <div>
            <span style="background: rgba(0,0,0,0.4); padding: 1px 6px; border-radius: 4px; font-size: 9px; font-weight: 700;">DOC-02</span>
            <strong style="margin-left: 4px;">competitive-analysis.md</strong>
          </div>
          <span class="${{ingestedCount >= 2 ? 'status-badge-ready' : 'status-badge-extracting'}}">
            ${{ingestedCount >= 2 ? "Indexed &amp; Ready" : "Extracting C4..."}}
          </span>
        </div>

        <div class="doc-status-item">
          <div>
            <span style="background: rgba(0,0,0,0.4); padding: 1px 6px; border-radius: 4px; font-size: 9px; font-weight: 700;">DOC-03</span>
            <strong style="margin-left: 4px;">architecture-c4-spec.md</strong>
          </div>
          <span class="${{ingestedCount >= 3 ? 'status-badge-ready' : 'status-badge-extracting'}}">
            ${{ingestedCount >= 3 ? "Indexed &amp; Ready" : "Extracting C4..."}}
          </span>
        </div>
      `;
    }}

    function handleSearchSubmit(e) {{
      e.preventDefault();
      const rev = document.getElementById('answerCardReveal');
      if (rev) rev.style.display = 'flex';
    }}

    function updateDeckCalc() {{
      const sInput = document.getElementById('sliderSquad');
      const dInput = document.getElementById('sliderDocs');
      const tInput = document.getElementById('sliderTor');
      const cInput = document.getElementById('sliderC4');
      if (sInput) squadSize = parseInt(sInput.value) || 10;
      if (dInput) docsPerMonth = parseInt(dInput.value) || 35;
      if (tInput) torTime = parseInt(tInput.value) || 35;
      if (cInput) c4Time = parseInt(cInput.value) || 15;

      const rS = document.getElementById('readoutSquad');
      const rD = document.getElementById('readoutDocs');
      const rT = document.getElementById('readoutTor');
      const rC = document.getElementById('readoutC4');
      if (rS) rS.innerText = squadSize + " Architects";
      if (rD) rD.innerText = docsPerMonth + " Docs";
      if (rT) rT.innerText = torTime + " Hrs";
      if (rC) rC.innerText = c4Time + " Hrs";

      const goalBonus = 1 + goals.length * 0.18;
      const annualHoursSaved = Math.round((squadSize * 45 + docsPerMonth * 18 + (60 - torTime) * 6) * goalBonus);
      const costSavingsK = Math.max(12, Math.round((annualHoursSaved / 75) * (1 + (60 - c4Time) * 0.015)));
      const speedMultiplier = Math.min(4.5, Math.max(1.2, 1.1 + (squadSize / 25) * 1.4 + (docsPerMonth / 85) * 1.4));

      const rH = document.getElementById('resultHours');
      const rCost = document.getElementById('resultCost');
      const rSp = document.getElementById('resultSpeed');
      if (rH) rH.innerText = "+" + annualHoursSaved.toLocaleString() + " Hrs";
      if (rCost) rCost.innerText = costSavingsK + "K";
      if (rSp) rSp.innerText = speedMultiplier.toFixed(1) + "x Faster";
    }}

    function toggleDeckGoal(g) {{
      const idx = goals.indexOf(g);
      if (idx >= 0) goals.splice(idx, 1);
      else goals.push(g);
      updateDeckCalc();
    }}

    function boostDeckMetrics() {{
      const m1 = document.getElementById('deckMetric1');
      if (m1) m1.innerText = m1.innerText === "+95%" ? "+98%" : "+95%";
    }}

    // Keyboard Navigation
    window.addEventListener('keydown', (e) => {{
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextSlide();
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevSlide();
    }});

    // Initialize Presentation on Load
    window.addEventListener('DOMContentLoaded', () => {{
      renderSlide(0);
    }});
  </script>
</body>
</html>
'''

# Write to presentation/index.html and presentation.html
with open('presentation/index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

with open('presentation.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

# Final emoji check
emojis_out = re.findall(r'[\U00010000-\U0010ffff]', html_content)
assert len(emojis_out) == 0, f"Found emojis in output HTML: {emojis_out}"

print("SUCCESS: 10-Slide Interactive Executive Presentation Deck built!")
print(f"Generated {len(html_content)} bytes to presentation/index.html and presentation.html")
