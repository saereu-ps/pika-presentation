import os
import re

# Read three.js and real_pika_mascot.js
with open('presentation/static/three.min.js', 'r', encoding='utf-8') as f:
    three_js_code = f.read()

with open('presentation/static/real_pika_mascot.js', 'r', encoding='utf-8') as f:
    mascot_code = f.read()

# Verify zero emojis
assert len(re.findall(r'[\U00010000-\U0010ffff]', mascot_code)) == 0

html_content = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PIKA WIKI — Enterprise Architecture &amp; TOR Intelligence Platform</title>
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
      --bg-canvas: #F3F4F5;
      --bg-card: #FFFFFF;
      --bg-frame: #F7F7F8;
      --bg-dark: #0B1224;
      --text-main: #141517;
      --text-muted: #71717A;
      --text-faint: #A1A1AA;
      --border-subtle: rgba(228, 228, 231, 0.8);
      --accent-charcoal: #141517;
    }}

    body {{
      background-color: var(--bg-canvas);
      color: var(--text-main);
      font-family: var(--font-sans);
      min-height: 100vh;
      padding: 24px;
      display: flex;
      justify-content: center;
      line-height: 1.5;
    }}

    @media (max-width: 768px) {{
      body {{ padding: 12px; }}
    }}

    /* ══════════════════════════════════════════════════════════════════
       OUTER EDITORIAL FRAME WRAPPER (HealthSync Reference Style)
       ══════════════════════════════════════════════════════════════════ */
    .editorial-wrapper {{
      max-width: 1380px;
      width: 100%;
      background: var(--bg-frame);
      border-radius: 36px;
      padding: 36px 44px 64px 44px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.04);
      border: 1px solid rgba(0, 0, 0, 0.05);
      position: relative;
    }}

    @media (max-width: 768px) {{
      .editorial-wrapper {{ padding: 20px 16px 40px 16px; border-radius: 24px; }}
    }}

    /* ── Top Floating Pill Navbar ── */
    .top-navbar {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 32px;
    }}

    .nav-brand {{
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: var(--text-main);
    }}

    .nav-brand-icon {{
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: var(--accent-charcoal);
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
    }}

    .nav-brand-text {{
      font-size: 17px;
      font-weight: 700;
      letter-spacing: -0.02em;
    }}

    .nav-pill-menu {{
      display: flex;
      align-items: center;
      gap: 6px;
      background: #FFFFFF;
      border-radius: 9999px;
      padding: 5px 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
      border: 1px solid var(--border-subtle);
    }}

    @media (max-width: 900px) {{
      .nav-pill-menu {{ display: none; }}
    }}

    .nav-pill-link {{
      font-size: 12.5px;
      font-weight: 500;
      color: var(--text-muted);
      text-decoration: none;
      padding: 6px 14px;
      border-radius: 9999px;
      transition: all 0.15s ease;
    }}

    .nav-pill-link:hover {{
      color: var(--text-main);
    }}

    .nav-pill-link.is-active {{
      background: #F4F4F5;
      color: var(--text-main);
      font-weight: 600;
    }}

    .nav-auto-btn {{
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 9px 18px;
      border-radius: 9999px;
      background: var(--accent-charcoal);
      color: #FFFFFF;
      font-size: 12.5px;
      font-weight: 600;
      border: none;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }}

    .nav-auto-btn:hover {{
      background: #27272A;
      transform: translateY(-1px);
    }}

    .nav-auto-btn.is-paused {{
      background: #FFFFFF;
      color: var(--text-main);
      border: 1px solid var(--border-subtle);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    }}

    /* ══════════════════════════════════════════════════════════════════
       SECTION A: ASYMMETRIC SLANTED HERO (12 COLS: 8 LEFT / 4 RIGHT)
       ══════════════════════════════════════════════════════════════════ */
    .hero-grid {{
      display: grid;
      grid-template-columns: 8fr 4fr;
      gap: 24px;
    }}

    @media (max-width: 1024px) {{
      .hero-grid {{ grid-template-columns: 1fr; }}
    }}

    /* ── Left 8 Columns ── */
    .hero-left-stack {{
      display: flex;
      flex-direction: column;
    }}

    .hero-upper-card {{
      background: #FFFFFF;
      border-top-left-radius: 28px;
      border-top-right-radius: 28px;
      padding: 44px 44px 68px 44px;
      clip-path: polygon(0 0, 100% 0, 100% 78%, 0 96%);
      position: relative;
      z-index: 10;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.03);
    }}

    .hero-title {{
      font-size: 42px;
      font-weight: 700;
      line-height: 1.12;
      letter-spacing: -0.035em;
      color: var(--text-main);
      max-width: 580px;
    }}

    @media (max-width: 768px) {{
      .hero-title {{ font-size: 30px; }}
    }}

    .hero-desc {{
      margin-top: 14px;
      font-size: 13.5px;
      color: var(--text-muted);
      line-height: 1.6;
      max-width: 480px;
    }}

    .hero-cta-btn {{
      margin-top: 24px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--accent-charcoal);
      color: #FFFFFF;
      padding: 10px 22px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.15s ease;
    }}

    .hero-cta-btn:hover {{ background: #27272A; }}

    /* Lower Interlocking Frame with REAL 3D Mascot & Dashboard */
    .hero-lower-frame {{
      position: relative;
      margin-top: -44px;
      background: var(--bg-dark);
      border-bottom-left-radius: 28px;
      border-bottom-right-radius: 28px;
      padding: 56px 28px 24px 28px;
      clip-path: polygon(0 14%, 100% 0, 100% 100%, 0 100%);
      color: #FFFFFF;
      overflow: hidden;
      min-height: 380px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }}

    .hero-workspace-content {{
      display: grid;
      grid-template-columns: 7fr 5fr;
      align-items: center;
      gap: 20px;
      width: 100%;
    }}

    @media (max-width: 768px) {{
      .hero-workspace-content {{ grid-template-columns: 1fr; }}
    }}

    /* Mascot Stage in Hero */
    .hero-mascot-stage {{
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
    }}

    .hero-project-pills {{
      display: flex;
      flex-direction: column;
      gap: 12px;
      text-align: right;
    }}

    .project-pill-link {{
      cursor: pointer;
      text-decoration: none;
    }}

    .project-pill-link .name-row {{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 6px;
      font-size: 12px;
      font-weight: 600;
      color: #60A5FA;
    }}

    .project-pill-link.is-dim .name-row {{ color: #94A3B8; }}

    .project-pill-link .sub-row {{
      font-size: 10px;
      color: #64748B;
      margin-top: 1px;
    }}

    .mascot-3d-box {{
      position: relative;
      width: 250px;
      height: 290px;
      display: flex;
      align-items: center;
      justify-content: center;
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
      z-index: 20;
      cursor: grab;
    }}
    .mascot-drag-zone:active {{ cursor: grabbing; }}

    .mascot-speech-bubble {{
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      width: 240px;
      padding: 9px 14px;
      border-radius: 18px;
      background: #FFFFFF;
      color: #0F172A;
      font-size: 11px;
      font-weight: 500;
      line-height: 1.5;
      text-align: left;
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.45);
      z-index: 30;
      pointer-events: auto;
    }}

    .mascot-speech-bubble::before {{
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 12px;
      height: 8px;
      background: #FFFFFF;
      clip-path: polygon(0 0, 100% 0, 50% 100%);
    }}

    /* Authentic PRESALE-MOCK & TOR COMPLIANCE Cards */
    .hero-dash-cards {{
      display: flex;
      flex-direction: column;
      gap: 10px;
    }}

    .dash-card-blue {{
      background: #1E40AF;
      border-radius: 16px;
      padding: 14px 16px;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
    }}

    .dash-card-header {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.04em;
    }}

    .dash-badge-pill {{
      padding: 2px 8px;
      border-radius: 9999px;
      background: rgba(0, 0, 0, 0.25);
      font-size: 9.5px;
      font-weight: 600;
    }}

    .dash-card-desc {{
      margin-top: 5px;
      font-size: 10.5px;
      color: #DBEAFE;
      line-height: 1.45;
    }}

    .dash-card-slate {{
      background: #1E293B;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 14px 16px;
    }}

    .doc-row {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(15, 23, 42, 0.7);
      border-radius: 8px;
      padding: 6px 10px;
      margin-top: 6px;
      font-size: 10.5px;
    }}

    .doc-status-ready {{
      padding: 2px 7px;
      border-radius: 9999px;
      background: #FFFFFF;
      color: #0F172A;
      font-size: 9px;
      font-weight: 700;
    }}

    /* ── Right 4 Columns ── */
    .hero-right-stack {{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }}

    .hero-right-upper {{
      flex: 1;
      min-height: 290px;
      border-top-left-radius: 28px;
      border-top-right-radius: 28px;
      background: linear-gradient(135deg, #D4D6DC 0%, #E5E7EB 50%, #CFD2D8 100%);
      padding: 24px;
      clip-path: polygon(0 0, 100% 0, 100% 92%, 0 80%);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }}

    .hero-monitor-box {{
      margin: auto 0;
      background: var(--accent-charcoal);
      border-radius: 16px;
      padding: 18px;
      color: #FFFFFF;
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.15);
    }}

    .hero-right-lower {{
      position: relative;
      margin-top: -38px;
      background: #FFFFFF;
      border-bottom-left-radius: 28px;
      border-bottom-right-radius: 28px;
      padding: 44px 28px 28px 28px;
      clip-path: polygon(0 0, 100% 18%, 100% 100%, 0 100%);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.03);
    }}

    /* ── Enterprise Trust Strip ── */
    .trust-strip {{
      margin-top: 48px;
      padding: 20px 0;
      border-top: 1px solid var(--border-subtle);
      border-bottom: 1px solid var(--border-subtle);
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-wrap: wrap;
      gap: 20px;
    }}

    .trust-logo {{
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.06em;
      color: #9CA3AF;
      text-transform: uppercase;
    }}

    /* ══════════════════════════════════════════════════════════════════
       SECTION B: 3-COLUMN ANIMATED METRIC CARDS
       ══════════════════════════════════════════════════════════════════ */
    .section-header {{
      margin-top: 64px;
      text-align: center;
    }}

    .section-pill {{
      display: inline-block;
      border-radius: 9999px;
      border: 1px solid var(--border-subtle);
      background: #FFFFFF;
      padding: 4px 16px;
      font-size: 11.5px;
      font-weight: 600;
      color: var(--text-muted);
      letter-spacing: 0.02em;
      margin-bottom: 10px;
    }}

    .section-title {{
      font-size: 32px;
      font-weight: 700;
      letter-spacing: -0.03em;
      color: var(--text-main);
    }}

    .section-sub {{
      margin-top: 8px;
      font-size: 13.5px;
      color: var(--text-muted);
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }}

    .metrics-grid {{
      margin-top: 36px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }}

    @media (max-width: 900px) {{
      .metrics-grid {{ grid-template-columns: 1fr; }}
    }}

    .metric-card {{
      background: #FFFFFF;
      border-radius: 28px;
      padding: 32px;
      border: 1px solid var(--border-subtle);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.03);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 380px;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }}

    .metric-card:hover {{
      transform: translateY(-2px);
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.06);
    }}

    .metric-header-tag {{
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--text-faint);
    }}

    .giant-number {{
      font-size: 54px;
      font-weight: 700;
      letter-spacing: -0.04em;
      color: var(--text-main);
      margin-top: 8px;
      line-height: 1;
      font-variant-numeric: tabular-nums;
    }}

    .metric-card-desc {{
      margin-top: 10px;
      font-size: 12.5px;
      color: var(--text-muted);
      line-height: 1.5;
    }}

    /* Card 1: 5-bar vertical chart */
    .vert-bar-chart {{
      margin-top: 24px;
      height: 140px;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 10px;
      align-items: flex-end;
    }}

    .bar-col {{
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
      justify-content: flex-end;
    }}

    .bar-fill {{
      width: 100%;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      background: #EFEFEF;
      display: flex;
      justify-content: center;
      padding-top: 6px;
      transition: height 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }}

    .bar-fill.is-active {{
      background: var(--accent-charcoal);
      color: #FFFFFF;
    }}

    .bar-label {{
      margin-top: 8px;
      font-size: 10.5px;
      color: var(--text-faint);
    }}

    /* Card 2: Smooth Area Chart + Vertical Pin */
    .area-chart-wrap {{
      margin-top: 24px;
      position: relative;
      height: 140px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }}

    .area-pin {{
      position: absolute;
      left: 50%;
      bottom: 24px;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 98px;
    }}

    .area-pin-badge {{
      background: var(--accent-charcoal);
      color: #FFFFFF;
      padding: 2px 7px;
      border-radius: 6px;
      font-size: 10px;
      font-weight: 700;
    }}

    .area-pin-line {{
      width: 1.5px;
      flex: 1;
      background: var(--accent-charcoal);
    }}

    /* Card 3: Horizontal comparison bars */
    .horiz-bar-wrap {{
      margin-top: 24px;
      height: 140px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 16px;
      border-left: 1px dashed var(--border-subtle);
      border-right: 1px dashed var(--border-subtle);
      padding: 0 12px;
    }}

    .horiz-row {{
      display: flex;
      align-items: center;
      gap: 12px;
    }}

    .horiz-bar-fill {{
      height: 38px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 12px;
      font-size: 11px;
      font-weight: 700;
      transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }}

    /* ══════════════════════════════════════════════════════════════════
       SECTION C: INTERACTIVE & AUTO-DEMO ROI CALCULATOR
       ══════════════════════════════════════════════════════════════════ */
    .calc-container {{
      margin-top: 36px;
      position: relative;
    }}

    .calc-top-tabs {{
      display: flex;
      align-items: flex-end;
      gap: 4px;
      padding-left: 12px;
    }}

    .calc-tab-btn {{
      padding: 10px 18px;
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      color: var(--text-muted);
      background: transparent;
      border: none;
      cursor: pointer;
      transition: all 0.15s ease;
    }}

    .calc-tab-btn.is-active {{
      background: #FFFFFF;
      color: var(--text-main);
      box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.02);
    }}

    .calc-main-grid {{
      display: grid;
      grid-template-columns: 8fr 4fr;
      gap: 20px;
    }}

    @media (max-width: 900px) {{
      .calc-main-grid {{ grid-template-columns: 1fr; }}
    }}

    /* Left White Card: 4 Range Sliders & Goals */
    .calc-card-white {{
      background: #FFFFFF;
      border-radius: 28px;
      border-top-left-radius: 0;
      padding: 36px;
      border: 1px solid var(--border-subtle);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.03);
    }}

    .sliders-grid {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }}

    @media (max-width: 640px) {{
      .sliders-grid {{ grid-template-columns: 1fr; }}
    }}

    .slider-item-label {{
      font-size: 12.5px;
      font-weight: 600;
      color: var(--text-main);
    }}

    .slider-readout-box {{
      margin-top: 8px;
      border: 1px solid var(--border-subtle);
      border-radius: 10px;
      padding: 8px 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 13.5px;
      font-weight: 700;
      color: var(--text-main);
    }}

    .slider-unit {{
      font-size: 11px;
      color: var(--text-faint);
      font-weight: 500;
    }}

    .calc-range-input {{
      margin-top: 10px;
      width: 100%;
      height: 4px;
      border-radius: 9999px;
      background: #E4E4E7;
      outline: none;
      -webkit-appearance: none;
      cursor: pointer;
    }}

    .calc-range-input::-webkit-slider-thumb {{
      -webkit-appearance: none;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #FFFFFF;
      border: 2px solid var(--accent-charcoal);
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    }}

    .slider-bounds {{
      margin-top: 4px;
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      color: var(--text-faint);
    }}

    /* Main Goals Selectable Pills */
    .goals-row {{
      margin-top: 32px;
    }}

    .goals-pill-group {{
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }}

    .goal-pill-btn {{
      padding: 8px 16px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      border: 1px solid var(--border-subtle);
      background: #FFFFFF;
      color: var(--text-muted);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }}

    .goal-pill-btn.is-active {{
      background: var(--accent-charcoal);
      color: #FFFFFF;
      border-color: var(--accent-charcoal);
    }}

    /* Right Slanted Interlocking Output Cards */
    .calc-output-stack {{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-top: 32px;
    }}

    .calc-output-upper {{
      flex: 1;
      background: #FFFFFF;
      border-top-left-radius: 28px;
      border-top-right-radius: 28px;
      padding: 32px 32px 54px 32px;
      border: 1px solid var(--border-subtle);
      clip-path: polygon(0 0, 100% 0, 100% 88%, 0 74%);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.03);
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 22px;
    }}

    .calc-output-lower {{
      position: relative;
      margin-top: -42px;
      background: var(--accent-charcoal);
      border-bottom-left-radius: 28px;
      border-bottom-right-radius: 28px;
      padding: 44px 32px 32px 32px;
      clip-path: polygon(0 0, 100% 24%, 100% 100%, 0 100%);
      color: #FFFFFF;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
    }}

    /* Minimalist macOS Pointer Cursor for Auto-Demo */
    #editorialCursor {{
      position: fixed;
      z-index: 9999;
      pointer-events: none;
      transition: left 0.75s cubic-bezier(0.22, 1, 0.36, 1), top 0.75s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease;
      opacity: 0;
    }}

    .cursor-mac-svg {{
      width: 24px;
      height: 24px;
      filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.25));
    }}

    .cursor-click-ring {{
      position: absolute;
      top: -8px;
      left: -8px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: rgba(20, 21, 23, 0.2);
      animation: clickPing 0.35s ease-out;
    }}

    @keyframes clickPing {{
      0% {{ transform: scale(0.6); opacity: 1; }}
      100% {{ transform: scale(1.6); opacity: 0; }}
    }}
  </style>
</head>
<body>

  <!-- Minimalist macOS Cursor for Auto-Demo Simulation -->
  <div id="editorialCursor">
    <svg class="cursor-mac-svg" viewBox="0 0 24 24" fill="none">
      <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.45 0 .67-.53.35-.85L6.35 2.86a.5.5 0 0 0-.85.35Z" fill="#141517" stroke="#FFFFFF" stroke-width="1.8"/>
    </svg>
    <div id="cursorPing" style="display: none;" class="cursor-click-ring"></div>
  </div>

  <div class="editorial-wrapper">

    <!-- 1. Top Floating Pill Navbar -->
    <header class="top-navbar">
      <a href="#hero" class="nav-brand">
        <div class="nav-brand-icon">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
        </div>
        <span class="nav-brand-text">PIKA WIKI</span>
      </a>

      <nav class="nav-pill-menu">
        <a href="#hero" class="nav-pill-link is-active">Overview</a>
        <a href="#workspace" class="nav-pill-link">Architecture</a>
        <a href="#metrics" class="nav-pill-link">Metrics</a>
        <a href="#calculator" class="nav-pill-link">ROI Calculator</a>
        <a href="#workspace" class="nav-pill-link">Live Workspace</a>
      </nav>

      <button id="autoDemoToggleBtn" class="nav-auto-btn" onclick="toggleAutoDemo()">
        <span id="autoDemoIndicator">●</span>
        <span id="autoDemoBtnLabel">Auto-Demo Mode</span>
      </button>
    </header>

    <!-- 2. Section A: Asymmetric Slanted Hero with 3D PIKA & Original Frame -->
    <section id="hero" class="hero-grid">
      <!-- Left 8 Columns: Upper White Card + Lower Interlocking Frame with REAL 3D Mascot -->
      <div class="hero-left-stack">
        <div class="hero-upper-card">
          <h1 class="hero-title">Enterprise Architecture &amp; TOR Intelligence All-In-One Platform</h1>
          <p class="hero-desc">
            Raw chat history is not enough. Durable team memory starts with the right AI encyclopedia — built to structure enterprise TOR compliance and C4 models automatically.
          </p>
          <div style="margin-top: 24px; display: flex; align-items: center; gap: 14px;">
            <a href="#calculator" class="hero-cta-btn">Explore Live Demo &rarr;</a>
            <span style="font-size: 12px; font-weight: 600; color: var(--text-faint);">presale-mock &middot; v1.0-prod</span>
          </div>
        </div>

        <div id="workspace" class="hero-lower-frame">
          <div class="hero-workspace-content">
            <!-- Left: Project Selection Links + 3D PIKA Mascot -->
            <div class="hero-mascot-stage">
              <div class="hero-project-pills">
                <div class="project-pill-link" id="pillPresaleMock" onclick="switchProject('presale-mock')">
                  <div class="name-row">
                    <span>presale-mock</span>
                    <span style="width: 6px; height: 6px; border-radius: 50%; background: #60A5FA; box-shadow: 0 0 6px #60A5FA;"></span>
                  </div>
                  <div class="sub-row">6 Ingested Docs</div>
                </div>

                <div class="project-pill-link is-dim" id="pillGeneralMock" onclick="switchProject('general-mock')">
                  <div class="name-row">
                    <span>general-mock</span>
                    <span style="width: 6px; height: 6px; border-radius: 50%; background: #94A3B8;"></span>
                  </div>
                  <div class="sub-row">20 Ingested Docs</div>
                </div>
              </div>

              <!-- Real 3D Mascot Stage -->
              <div class="mascot-3d-box" id="blueprintUniverse">
                <div class="mascot-speech-bubble" id="mascotBubble">
                  สวัสดี! เราชื่อ <strong>PIKA</strong> ผู้ช่วยดูแลคลังความรู้ของคุณ มีเอกสารก็ส่งมาได้เลย!
                </div>
                <div class="mascot-drag-zone" id="mascotDragZone" title="ลากเพื่อหมุนตัวละคร 360 องศา"></div>
                <div id="blueprintStage" class="blueprint-stage"></div>
              </div>
            </div>

            <!-- Right: Original PRESALE-MOCK & TOR COMPLIANCE Frame Cards -->
            <div class="hero-dash-cards">
              <div class="dash-card-blue">
                <div class="dash-card-header">
                  <span>PRESALE-MOCK</span>
                  <span class="dash-badge-pill">v1.0-prod &middot; active</span>
                </div>
                <p class="dash-card-desc">
                  พิมพ์เขียวสถาปัตยกรรมและข้อกำหนดโครงการ presale-mock (6 Verified Files)
                </p>
              </div>

              <div class="dash-card-slate">
                <div class="dash-card-header">
                  <span>TOR COMPLIANCE</span>
                  <span style="color: #60A5FA; font-size: 10px;">Private RBAC</span>
                </div>
                <div class="doc-row">
                  <span style="color: #E2E8F0;"><strong style="color: #60A5FA;">DOC-01</strong> client-overview.md</span>
                  <span class="doc-status-ready">Indexed &amp; Ready</span>
                </div>
                <div class="doc-row">
                  <span style="color: #E2E8F0;"><strong style="color: #60A5FA;">DOC-02</strong> competitive-analysis.md</span>
                  <span class="doc-status-ready">Indexed &amp; Ready</span>
                </div>
                <div class="doc-row">
                  <span style="color: #E2E8F0;"><strong style="color: #60A5FA;">DOC-03</strong> financial-model.md</span>
                  <span class="doc-status-ready">Indexed &amp; Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right 4 Columns: Upper Architectural Visual Card + Lower White Interlocking Card -->
      <div class="hero-right-stack">
        <div class="hero-right-upper">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="background: rgba(255,255,255,0.85); padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: 600; color: #141517;">Hybrid Graph + RAG</span>
            <span style="font-size: 12px; font-weight: 600; color: #52525B;">C4 Engine</span>
          </div>

          <div class="hero-monitor-box">
            <div style="display: flex; justify-content: space-between; font-size: 10px; color: #A1A1AA; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px;">
              <span>C4_ENTITY_EXTRACTOR</span>
              <span style="color: #34D399; font-weight: 700;">● VERIFIED</span>
            </div>
            <div style="margin-top: 12px; display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; justify-content: space-between; background: rgba(255,255,255,0.1); border-radius: 8px; padding: 6px 10px; font-size: 11px;">
                <span>TOR Ingestion Pipeline</span>
                <span style="font-family: var(--font-mono); color: #E4E4E7;">100%</span>
              </div>
              <div style="display: flex; justify-content: space-between; background: rgba(255,255,255,0.05); border-radius: 8px; padding: 6px 10px; font-size: 11px;">
                <span>Graph Node Relations</span>
                <span style="font-family: var(--font-mono); color: #A1A1AA;">26 Docs</span>
              </div>
            </div>
          </div>

          <div></div>
        </div>

        <div class="hero-right-lower">
          <h3 style="font-size: 22px; font-weight: 700; color: var(--text-main); line-height: 1.2;">
            AI-Powered<br>TOR Diagnostics
          </h3>
          <p style="margin-top: 8px; font-size: 12px; color: var(--text-muted); line-height: 1.5; max-width: 240px;">
            Get fast, source-verified answers with the help of Hybrid Graph + RAG diagnostics.
          </p>
        </div>
      </div>
    </section>

    <!-- Enterprise Trust Strip -->
    <div class="trust-strip">
      <span class="trust-logo">HEALTHBIRD</span>
      <span class="trust-logo">RELYMD</span>
      <span class="trust-logo">TANNER HEALTH</span>
      <span class="trust-logo">CLEVELAND CLINIC</span>
      <span class="trust-logo">SUTTER HEALTH</span>
      <span class="trust-logo">KAISER PERMANENTE</span>
    </div>

    <!-- 3. Section B: 3-Column Animated Data Visualization Cards -->
    <section id="metrics">
      <div class="section-header">
        <span class="section-pill">PIKA Intelligence</span>
        <h2 class="section-title">Streamlining Presale &amp; Architecture Automation</h2>
        <p class="section-sub">
          PIKA optimizes architecture workflows by leveraging precise, efficient C4 algorithms, validated through data from enterprise infrastructure teams.
        </p>
      </div>

      <div class="metrics-grid">
        <!-- Card 1: TOR Compliance Accuracy (+95%) -->
        <div class="metric-card" onclick="boostMetrics()">
          <div>
            <div class="metric-header-tag">TOR COMPLIANCE ACCURACY</div>
            <div class="giant-number" id="card1Number">+95%</div>
            <p class="metric-card-desc">
              Ensuring verified source traceability across enterprise TOR &amp; RFP documents with near-perfect reliability.
            </p>
          </div>

          <div class="vert-bar-chart">
            <div class="bar-col">
              <div class="bar-fill" id="bar1" style="height: 38%;"></div>
              <span class="bar-label">Apr</span>
            </div>
            <div class="bar-col">
              <div class="bar-fill" id="bar2" style="height: 52%;"></div>
              <span class="bar-label">May</span>
            </div>
            <div class="bar-col">
              <div class="bar-fill is-active" id="bar3" style="height: 95%;">
                <span id="bar3Pill" style="font-size: 10px; font-weight: 700;">+95%</span>
              </div>
              <span class="bar-label" style="color: var(--text-main); font-weight: 700;">Jun</span>
            </div>
            <div class="bar-col">
              <div class="bar-fill" id="bar4" style="height: 64%;"></div>
              <span class="bar-label">Jul</span>
            </div>
            <div class="bar-col">
              <div class="bar-fill" id="bar5" style="height: 72%;"></div>
              <span class="bar-label">Aug</span>
            </div>
          </div>
        </div>

        <!-- Card 2: Presale Velocity Progress (+60%) -->
        <div class="metric-card" onclick="boostMetrics()">
          <div>
            <div class="metric-header-tag">PRESALE VELOCITY PROGRESS</div>
            <div class="giant-number" id="card2Number">+60%</div>
            <p class="metric-card-desc">
              AI-driven C4 entity extraction increased architecture drafting efficiency by 60% across enterprise squads.
            </p>
          </div>

          <div class="area-chart-wrap">
            <svg viewBox="0 0 300 120" style="width: 100%; height: 110px;" preserveAspectRatio="none">
              <path d="M 0 85 Q 45 80, 75 60 T 150 18 T 225 45 T 300 35 L 300 120 L 0 120 Z" fill="#F1F2F4"/>
            </svg>
            <div class="area-pin">
              <span class="area-pin-badge" id="areaPinBadge">+60%</span>
              <div class="area-pin-line"></div>
            </div>
            <div style="display: grid; grid-template-columns: repeat(5, 1fr); text-align: center; font-size: 10.5px; color: var(--text-faint); margin-top: 6px;">
              <span>Apr</span><span>May</span><span style="color: var(--text-main); font-weight: 700;">Jun</span><span>Jul</span><span>Aug</span>
            </div>
          </div>
        </div>

        <!-- Card 3: Manual Review Reduction (-68%) -->
        <div class="metric-card" onclick="boostMetrics()">
          <div>
            <div class="metric-header-tag">MANUAL REVIEW REDUCTION</div>
            <div class="giant-number" id="card3Number">–68%</div>
            <p class="metric-card-desc">
              PIKA Hybrid Graph + RAG eliminates repetitive manual document cross-checking so architects focus on design.
            </p>
          </div>

          <div class="horiz-bar-wrap">
            <div class="horiz-row">
              <span style="font-size: 10.5px; color: var(--text-faint); width: 68px; flex-shrink: 0;">Without AI</span>
              <div class="horiz-bar-fill" id="horizBarWithout" style="width: 88%; background: #EFEFEF; color: var(--text-main);">
                <span>+150%</span>
              </div>
            </div>
            <div class="horiz-row">
              <span style="font-size: 10.5px; color: var(--text-main); font-weight: 600; width: 68px; flex-shrink: 0;">With PIKA</span>
              <div class="horiz-bar-fill" id="horizBarWith" style="width: 48%; background: var(--accent-charcoal); color: #FFFFFF;">
                <span>+48%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Section C: Interactive & Auto-Demo ROI Calculator -->
    <section id="calculator">
      <div class="section-header">
        <span class="section-pill">PIKA Calculator</span>
        <h2 class="section-title">Try The PIKA Presale Calculator</h2>
        <p class="section-sub">
          Estimate how much time and resources your squads could save with AI-powered architecture workflows — and see how it transforms delivery velocity.
        </p>
      </div>

      <div class="calc-container">
        <!-- Top Folder Tabs -->
        <div class="calc-top-tabs">
          <button class="calc-tab-btn" id="tabManual" onclick="switchCalcTab('manual')">Manual / Paper-based</button>
          <button class="calc-tab-btn is-active" id="tabPartial" onclick="switchCalcTab('partial')">Partially Digital</button>
          <button class="calc-tab-btn" id="tabFull" onclick="switchCalcTab('full')">Fully Digital (with PIKA)</button>
        </div>

        <div class="calc-main-grid">
          <!-- Left 8 Columns: Sliders & Goal Pills -->
          <div class="calc-card-white">
            <div class="sliders-grid">
              <!-- Slider 1 -->
              <div>
                <label class="slider-item-label">Presale Squad Size</label>
                <div class="slider-readout-box">
                  <span id="readoutSquad">10</span>
                  <span class="slider-unit">Architects</span>
                </div>
                <input type="range" min="1" max="100" value="10" class="calc-range-input" id="rangeSquad" oninput="updateCalculator()">
                <div class="slider-bounds"><span>1</span><span>100</span></div>
              </div>

              <!-- Slider 2 -->
              <div>
                <label class="slider-item-label">Avg. TOR Projects / Month</label>
                <div class="slider-readout-box">
                  <span id="readoutProjects">35</span>
                  <span class="slider-unit">Projects / Month</span>
                </div>
                <input type="range" min="1" max="100" value="35" class="calc-range-input" id="rangeProjects" oninput="updateCalculator()">
                <div class="slider-bounds"><span>1</span><span>100</span></div>
              </div>

              <!-- Slider 3 -->
              <div>
                <label class="slider-item-label">Avg. TOR Analysis Time (Hrs)</label>
                <div class="slider-readout-box">
                  <span id="readoutAnalysis">35</span>
                  <span class="slider-unit">Hrs</span>
                </div>
                <input type="range" min="1" max="60" value="35" class="calc-range-input" id="rangeAnalysis" oninput="updateCalculator()">
                <div class="slider-bounds"><span>1</span><span>60</span></div>
              </div>

              <!-- Slider 4 -->
              <div>
                <label class="slider-item-label">Avg. C4 Drafting Time (Hrs)</label>
                <div class="slider-readout-box">
                  <span id="readoutDrafting">15</span>
                  <span class="slider-unit">Hrs</span>
                </div>
                <input type="range" min="1" max="60" value="15" class="calc-range-input" id="rangeDrafting" oninput="updateCalculator()">
                <div class="slider-bounds"><span>1</span><span>60</span></div>
              </div>
            </div>

            <!-- Main Goals -->
            <div class="goals-row">
              <div style="font-size: 12px; font-weight: 600; color: var(--text-main);">Main Goals</div>
              <div class="goals-pill-group">
                <button class="goal-pill-btn is-active" id="goal1" onclick="toggleGoal('goal1')">
                  <span>✓</span> Reduce TOR analysis time
                </button>
                <button class="goal-pill-btn is-active" id="goal2" onclick="toggleGoal('goal2')">
                  <span>✓</span> Automate C4 extraction
                </button>
                <button class="goal-pill-btn" id="goal3" onclick="toggleGoal('goal3')">
                  <span id="goal3Check" style="display: none;">✓</span> Enhance compliance accuracy
                </button>
              </div>
            </div>
          </div>

          <!-- Right 4 Columns: Slanted Result Cards -->
          <div class="calc-output-stack">
            <div class="calc-output-upper">
              <div>
                <div class="giant-number" style="font-size: 44px;" id="outputHours">+3,000 Hrs</div>
                <div style="font-size: 12px; color: var(--text-faint); margin-top: 2px;">Annual Time Saved</div>
              </div>
              <div>
                <div class="giant-number" style="font-size: 44px;" id="outputCost">39K</div>
                <div style="font-size: 12px; color: var(--text-faint); margin-top: 2px;">Potential Cost Savings (USD)</div>
              </div>
            </div>

            <div class="calc-output-lower">
              <div class="giant-number" style="font-size: 38px; color: #FFFFFF;" id="outputSpeed">3.9x Faster</div>
              <div style="font-size: 12px; color: #A1A1AA; margin-top: 4px; line-height: 1.45;">
                Architecture delivery compared to standard manual protocols
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>

  <!-- 1. Real Three.js Library -->
  <script>
{three_js_code}
  </script>

  <!-- 2. Real PIKA 3D Mascot Engine (Exact Calibrated Model, Neck Lock, Lip-Sync) -->
  <script>
{mascot_code}
  </script>

  <!-- 3. Clean Editorial Interactive Engine & Auto-Demo Choreography -->
  <script>
    let isAutoDemo = true;
    let autoDemoStep = 0;
    let autoDemoTimer = null;
    let currentCalcTab = 'partial';
    let goalsState = {{ goal1: true, goal2: true, goal3: false }};
    let metricBoosted = false;

    // Smooth Number Count-Up Animation
    function animateCounter(elId, targetVal, prefix = '', suffix = '', decimals = 0) {{
      const el = document.getElementById(elId);
      if (!el) return;
      const startVal = parseFloat(el.getAttribute('data-val') || el.innerText.replace(/[^0-9.-]/g, '')) || 0;
      const duration = 500;
      const start = performance.now();

      function tick(now) {{
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = startVal + (targetVal - startVal) * ease;
        el.innerText = prefix + (decimals > 0 ? current.toFixed(decimals) : Math.round(current).toLocaleString('en-US')) + suffix;
        el.setAttribute('data-val', targetVal);
        if (progress < 1) requestAnimationFrame(tick);
      }}
      requestAnimationFrame(tick);
    }}

    // Calculator Math
    function updateCalculator() {{
      const squad = parseInt(document.getElementById('rangeSquad').value) || 10;
      const projects = parseInt(document.getElementById('rangeProjects').value) || 35;
      const analysis = parseInt(document.getElementById('rangeAnalysis').value) || 35;
      const drafting = parseInt(document.getElementById('rangeDrafting').value) || 15;

      document.getElementById('readoutSquad').innerText = squad;
      document.getElementById('readoutProjects').innerText = projects;
      document.getElementById('readoutAnalysis').innerText = analysis;
      document.getElementById('readoutDrafting').innerText = drafting;

      const activeGoalsCount = Object.values(goalsState).filter(Boolean).length;
      const goalBonus = 1 + activeGoalsCount * 0.18;
      const tabMulti = currentCalcTab === 'manual' ? 1.25 : (currentCalcTab === 'partial' ? 1.0 : 0.85);

      const hoursSaved = Math.round((squad * 45 + projects * 18 + (60 - analysis) * 6) * goalBonus * tabMulti);
      const costK = Math.max(8, Math.round((hoursSaved / 75) * (1 + (60 - drafting) * 0.015)));
      const speed = Math.min(4.8, Math.max(1.2, 1.1 + (squad / 25) * 1.4 + (projects / 85) * 1.4));

      animateCounter('outputHours', hoursSaved, '+', ' Hrs');
      animateCounter('outputCost', costK, '', 'K');
      animateCounter('outputSpeed', speed, '', 'x Faster', 1);
    }}

    function switchCalcTab(tab) {{
      currentCalcTab = tab;
      document.getElementById('tabManual').classList.toggle('is-active', tab === 'manual');
      document.getElementById('tabPartial').classList.toggle('is-active', tab === 'partial');
      document.getElementById('tabFull').classList.toggle('is-active', tab === 'full');
      updateCalculator();
    }}

    function toggleGoal(goalKey) {{
      goalsState[goalKey] = !goalsState[goalKey];
      const btn = document.getElementById(goalKey);
      if (btn) {{
        btn.classList.toggle('is-active', goalsState[goalKey]);
        const check = btn.querySelector('span');
        if (check) check.style.display = goalsState[goalKey] ? 'inline' : 'none';
      }}
      updateCalculator();
    }}

    function boostMetrics() {{
      metricBoosted = !metricBoosted;
      animateCounter('card1Number', metricBoosted ? 95 : 94, '+', '%');
      animateCounter('card2Number', metricBoosted ? 60 : 55, '+', '%');
      animateCounter('card3Number', metricBoosted ? 68 : 48, '–', '%');

      const bar3 = document.getElementById('bar3');
      const bar3Pill = document.getElementById('bar3Pill');
      if (bar3) bar3.style.height = metricBoosted ? '95%' : '88%';
      if (bar3Pill) bar3Pill.innerText = metricBoosted ? '+95%' : '+94%';

      const areaPinBadge = document.getElementById('areaPinBadge');
      if (areaPinBadge) areaPinBadge.innerText = metricBoosted ? '+60%' : '+55%';

      const horizWith = document.getElementById('horizBarWith');
      if (horizWith) horizWith.style.width = metricBoosted ? '44%' : '52%';
    }}

    function switchProject(pId) {{
      document.getElementById('pillPresaleMock').classList.toggle('is-dim', pId !== 'presale-mock');
      document.getElementById('pillGeneralMock').classList.toggle('is-dim', pId !== 'general-mock');
      window.dispatchEvent(new CustomEvent('pika-mascot-reach', {{ detail: {{ projectId: pId }} }}));
      window.dispatchEvent(new CustomEvent('pika-project-reach-click', {{ detail: {{ id: pId }} }}));
      window.dispatchEvent(new CustomEvent('pika-pose-change', {{ detail: {{ pose: 'reach_click', project: pId }} }}));
    }}

    // Cursor Movement Helper
    function moveCursor(x, y, click = false) {{
      const cursor = document.getElementById('editorialCursor');
      const ping = document.getElementById('cursorPing');
      if (!cursor) return;
      cursor.style.opacity = '1';
      cursor.style.left = x;
      cursor.style.top = y;

      if (click && ping) {{
        setTimeout(() => {{
          ping.style.display = 'block';
          setTimeout(() => ping.style.display = 'none', 350);
        }}, 400);
      }}
    }}

    function hideCursor() {{
      const cursor = document.getElementById('editorialCursor');
      if (cursor) cursor.style.opacity = '0';
    }}

    // ========================================================================
    // AUTO-DEMO CHOREOGRAPHY (Smoothly gliding macOS cursor)
    // ========================================================================
    function runAutoDemoChoreography() {{
      if (!isAutoDemo) return;

      // 1. Reset initial values
      document.getElementById('rangeSquad').value = 5;
      document.getElementById('rangeProjects').value = 20;
      document.getElementById('rangeAnalysis').value = 20;
      document.getElementById('rangeDrafting').value = 15;
      updateCalculator();

      // Step A: Cursor glides to Section B Metrics Cards
      moveCursor('48%', '52%');
      setTimeout(() => {{
        if (!isAutoDemo) return;
        boostMetrics();
      }}, 1000);

      // Step B: Cursor glides down to Section C ROI Calculator
      setTimeout(() => {{
        if (!isAutoDemo) return;
        moveCursor('38%', '82%', true);
        toggleGoal('goal2');
      }}, 2600);

      // Step C: Cursor smoothly drags slider Squad Size from 5 to 25 and Projects to 85
      setTimeout(() => {{
        if (!isAutoDemo) return;
        moveCursor('28%', '76%', true);
        let s = 5;
        let p = 20;
        const dragTimer = setInterval(() => {{
          if (s < 25) s += 2;
          if (p < 85) p += 6;
          document.getElementById('rangeSquad').value = s;
          document.getElementById('rangeProjects').value = p;
          updateCalculator();
          if (s >= 25 && p >= 85) clearInterval(dragTimer);
        }}, 60);
      }}, 4000);

      // Step D: Cursor focuses on 3D PIKA Character & presale-mock frame
      setTimeout(() => {{
        if (!isAutoDemo) return;
        moveCursor('30%', '34%', true);
        switchProject('presale-mock');
        window.dispatchEvent(new CustomEvent('pika-pose-change', {{ detail: {{ pose: 'reach_click', project: 'presale-mock' }} }}));
      }}, 6800);

      // Loop sequence
      setTimeout(() => {{
        if (!isAutoDemo) return;
        hideCursor();
        autoDemoTimer = setTimeout(runAutoDemoChoreography, 1500);
      }}, 9500);
    }}

    function toggleAutoDemo() {{
      isAutoDemo = !isAutoDemo;
      const btn = document.getElementById('autoDemoToggleBtn');
      const label = document.getElementById('autoDemoBtnLabel');
      const ind = document.getElementById('autoDemoIndicator');

      if (btn && label && ind) {{
        btn.classList.toggle('is-paused', !isAutoDemo);
        label.innerText = isAutoDemo ? 'Auto-Demo Mode' : 'Play Auto-Demo';
        ind.innerHTML = isAutoDemo ? '<span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#10B981;margin-right:4px;"></span>' : '<svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" style="display:inline-block;margin-right:4px;"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
      }}

      if (isAutoDemo) {{
        runAutoDemoChoreography();
      }} else {{
        if (autoDemoTimer) clearTimeout(autoDemoTimer);
        hideCursor();
      }}
    }}

    window.addEventListener('DOMContentLoaded', () => {{
      updateCalculator();
      setTimeout(runAutoDemoChoreography, 1200);
    }});
  </script>
</body>
</html>
'''

# Verify zero emojis in final html
assert len(re.findall(r'[\U00010000-\U0010ffff]', html_content)) == 0

with open('presentation/index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

with open('presentation.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("SUCCESS: Clean Editorial Presentation built and written to presentation/index.html and presentation.html!")
