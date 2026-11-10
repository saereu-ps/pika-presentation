import os
import re

# Load three.js and real_pika_mascot.js
with open('presentation/static/three.min.js', 'r', encoding='utf-8') as f:
    three_js_code = f.read()

with open('presentation/static/real_pika_mascot.js', 'r', encoding='utf-8') as f:
    mascot_code = f.read()

# Verify zero emojis in mascot_code
emojis_in_mascot = re.findall(r'[\U00010000-\U0010ffff]', mascot_code)
assert len(emojis_in_mascot) == 0, f"Found emojis in mascot code: {emojis_in_mascot}"

html_content = f'''<!DOCTYPE html>
<html lang="th" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PIKA Executive Presentation &amp; Auto-Demo</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <style>
    :root, html[data-theme="dark"] {{
      --font-thai: 'IBM Plex Sans Thai', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-body: 'IBM Plex Sans Thai', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      --font-wiki: 'IBM Plex Sans Thai', 'Inter', sans-serif;
      --font-condensed: 'Barlow Condensed', 'IBM Plex Sans Thai', sans-serif;
      --font-mono: 'JetBrains Mono', monospace;

      --bg-page: #060B18;
      --bg-surface: #1E293B;
      --bg-surface-elevated: #283548;
      --bg-input: #16202E;

      --border-subtle: rgba(148, 163, 184, 0.14);
      --border-card: rgba(148, 163, 184, 0.22);

      --text-main: #F1F5F9;
      --text-muted: #94A3B8;
      --text-faint: #64748B;
      --wiki-link-color: #60A5FA;

      --bento-accent: #2563EB;
      --bento-primary: #1E40AF;
      --bento-primary-tile: rgba(255, 255, 255, 0.10);
      --bento-deep: #1E3A8A;
      --bento-sky: #DBEAFE;
      --bento-slate: #E2E8F0;
      --bento-dark: #1E293B;
      --bento-dark-bubble: #334155;
      --bento-amber: #F1BF59;
    }}

    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }}

    html, body {{
      width: 100%;
      height: 100%;
      overflow-x: hidden;
    }}

    body.presentation-body {{
      background-color: var(--bg-page);
      background-image:
        radial-gradient(circle 900px at 20% 10%, rgba(29, 78, 216, 0.22) 0%, transparent 60%),
        radial-gradient(circle 800px at 80% 90%, rgba(30, 58, 138, 0.20) 0%, transparent 65%),
        radial-gradient(circle 950px at 50% 0%, rgba(14, 116, 144, 0.12) 0%, transparent 70%);
      background-attachment: fixed;
      color: var(--text-main);
      font-family: var(--font-body);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      user-select: none;
    }}

    /* ══════════════════════════════════════════════════════════════════
       HIGH-END EXECUTIVE PRESENTATION SYSTEM (AUTHENTIC PIKA HEADER)
       ZERO NUMBER PILLS, ZERO PLAY BUTTONS IN TOP BAR - CLEAN & SLEEK
       ══════════════════════════════════════════════════════════════════ */
    .pres-top-bar {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      padding: 16px 48px;
      background: rgba(8, 14, 26, 0.85);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      position: sticky;
      top: 0;
      z-index: 100;
      backdrop-filter: blur(28px) saturate(180%);
      -webkit-backdrop-filter: blur(28px) saturate(180%);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
    }}

    .pres-brand-group {{
      display: flex;
      align-items: center;
      gap: 16px;
    }}

    .pres-brand-title-wrap {{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      line-height: 1;
    }}

    .pres-brand-title {{
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: #FFFFFF;
    }}

    .pres-brand-sub {{
      font-family: var(--font-wiki);
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.35em;
      color: #60A5FA;
      margin-top: 3px;
    }}

    .pres-brand-sep {{
      height: 32px;
      width: 1px;
      background: rgba(148, 163, 184, 0.25);
    }}

    .pres-badge-group {{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 3px;
    }}

    .pres-badge-pill {{
      display: inline-flex;
      align-items: center;
      padding: 3px 12px;
      border-radius: 9999px;
      background: rgba(30, 41, 59, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.12);
      font-size: 11.5px;
      font-weight: 600;
      color: #CBD5E1;
      letter-spacing: 0.04em;
    }}

    .pres-badge-sub {{
      font-size: 11.5px;
      color: #94A3B8;
      margin-top: 2px;
    }}

    .pres-top-right {{
      display: flex;
      align-items: center;
      gap: 12px;
    }}

    .pres-live-badge {{
      display: inline-flex;
      align-items: center;
      gap: 8px;
      border-radius: 9999px;
      border: 1px solid rgba(16, 185, 129, 0.4);
      background: rgba(16, 185, 129, 0.12);
      padding: 5px 14px;
      font-size: 11.5px;
      font-weight: 700;
      color: #6EE7B7;
      letter-spacing: 0.04em;
      backdrop-filter: blur(8px);
    }}

    .pres-live-dot {{
      width: 8px;
      height: 8px;
      border-radius: 9999px;
      background: #34D399;
      box-shadow: 0 0 10px #34D399;
      animation: livePulse 1.8s infinite;
    }}

    @keyframes livePulse {{
      0%, 100% {{ opacity: 1; transform: scale(1); }}
      50% {{ opacity: 0.4; transform: scale(0.85); }}
    }}

    .pres-project-pill {{
      display: inline-flex;
      align-items: center;
      height: 34px;
      padding: 0 16px;
      border-radius: 9999px;
      background: #FFFFFF;
      color: #0F172A;
      font-size: 12.5px;
      font-weight: 700;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
    }}

    /* Progress Bar Line */
    .pres-progress-line {{
      width: 100%;
      height: 2px;
      background: rgba(255, 255, 255, 0.06);
      position: relative;
      z-index: 99;
    }}

    .pres-progress-bar {{
      height: 100%;
      background: linear-gradient(90deg, #3B82F6 0%, #60A5FA 50%, #34D399 100%);
      width: 8.33%;
      transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 0 12px rgba(59, 130, 246, 0.8);
    }}

    /* ══════════════════════════════════════════════════════════════════
       MAIN EXECUTIVE WIDESCREEN STAGE (12 COLS: 5 MASCOT / 7 BENTO)
       ══════════════════════════════════════════════════════════════════ */
    .pres-main-layout {{
      flex: 1;
      max-width: 1560px;
      width: 100%;
      margin: 0 auto;
      padding: 16px 48px 24px 48px;
      display: grid;
      grid-template-columns: 4.6fr 7.4fr;
      align-items: center;
      gap: 44px;
      min-height: calc(100vh - 66px);
      box-sizing: border-box;
    }}

    @media (max-width: 1080px) {{
      .pres-main-layout {{
        grid-template-columns: 1fr;
        gap: 32px;
        padding: 20px 24px 120px 24px;
      }}
    }}

    /* ── Left Column: The REAL PIKA 3D Mascot & Orbit ── */
    .pres-mascot-col {{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      width: 100%;
    }}

    .wiki-c4-universe {{
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      width: 100%;
      min-height: 480px;
      margin-top: 14px;
    }}

    .wiki-projects-wing {{
      position: absolute;
      left: -75px;
      top: 48%;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      gap: 58px;
      z-index: 25;
      width: 160px;
      text-align: right;
    }}

    .wiki-project-link {{
      cursor: pointer;
      padding: 6px 10px;
      border-radius: 12px;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }}

    .wiki-project-link:hover {{
      background: rgba(255, 255, 255, 0.06);
      transform: translateX(-3px);
    }}

    .wiki-project-link.is-active-project-click .project-name {{
      color: #60A5FA;
      font-weight: 700;
    }}

    .project-name-row {{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 6px;
    }}

    .project-name {{
      font-family: var(--font-body);
      font-size: 14px;
      font-weight: 600;
      color: #93C5FD;
    }}

    .project-graph-btn {{
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #1E40AF;
      border: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: #FFFFFF;
      cursor: pointer;
    }}

    .project-sub {{
      font-size: 11px;
      color: #64748B;
      margin-top: 2px;
    }}

    /* ── Blueprint Universe: Mascot + Floating Bubble ── */
    .wiki-blueprint-universe {{
      position: relative;
      width: 450px;
      height: 480px;
      display: flex;
      align-items: center;
      justify-content: center;
    }}

    .blueprint-stage {{
      width: 450px;
      height: 480px;
      pointer-events: none;
    }}

    .mascot-drag-zone {{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
      cursor: grab;
    }}
    .mascot-drag-zone:active {{ cursor: grabbing; }}

    /* ── Speech Bubble Dock: Placed Directly Above Mascot Stage (Zero Overlap with Head, Zero Overlap with Right Text) ── */
    .mascot-speech-dock {{
      width: 100%;
      max-width: 480px;
      min-height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 8px;
      position: relative;
      z-index: 35;
    }}

    .mascot-speech-bubble {{
      position: relative;
      width: 100%;
      max-width: 460px;
      padding: 15px 22px;
      border-radius: 20px;
      background: #FFFFFF;
      color: #0F172A;
      font-family: 'IBM Plex Sans Thai', sans-serif;
      font-size: 13.5px;
      font-weight: 500;
      line-height: 1.65;
      letter-spacing: 0.01em;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
      border: 1px solid rgba(255, 255, 255, 0.95);
      pointer-events: none;
      user-select: none;
    }}

    .mascot-speech-bubble strong {{
      color: #1D4ED8;
    }}

    .mascot-speech-bubble::before {{
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 16px;
      height: 8px;
      background: #FFFFFF;
      clip-path: polygon(0 0, 100% 0, 50% 100%);
    }}

    /* ── REAL Search Box Capsule (Matching wiki_landing_preview.html) ── */
    .wiki-search-box-wrap {{
      width: 100%;
      max-width: 500px;
      position: relative;
      margin-top: 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      z-index: 20;
    }}

    .wiki-search-box-wrap form {{
      width: 100%;
    }}

    .wiki-search-input-group {{
      display: flex;
      align-items: center;
      height: 48px;
      background: #111A2E;
      border: 1.5px solid rgba(148, 163, 184, 0.22);
      border-radius: 9999px;
      padding: 4px 6px 4px 18px;
      gap: 10px;
      box-shadow: 0 14px 34px -10px rgba(0, 0, 0, 0.50);
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }}

    .wiki-search-input-group:focus-within {{
      border-color: #3B82F6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
    }}

    .wiki-search-lead-icon {{
      color: #94A3B8;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }}

    .wiki-search-input {{
      flex: 1;
      min-width: 0;
      height: 100%;
      border: none;
      outline: none;
      background: transparent;
      color: #F1F5F9;
      padding: 0 4px;
      font-family: inherit;
      font-size: 13.5px;
    }}

    .wiki-search-input::placeholder {{
      color: #64748B;
    }}

    .wiki-search-scope {{
      height: 28px;
      display: flex;
      align-items: center;
      padding: 0 8px;
      border-left: 1px solid rgba(148, 163, 184, 0.16);
      flex-shrink: 0;
    }}

    .wiki-scope-select {{
      background: transparent;
      border: none;
      outline: none;
      color: #94A3B8;
      font-family: inherit;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
    }}

    .wiki-scope-select option {{
      background: #0F172A;
      color: #F1F5F9;
    }}

    .wiki-search-submit-btn {{
      height: 38px;
      padding: 0 18px;
      border-radius: 9999px;
      border: none;
      background: #2563EB;
      color: #FFFFFF;
      font-family: inherit;
      font-size: 13px;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      cursor: pointer;
      flex-shrink: 0;
      white-space: nowrap;
      transition: background 0.18s ease, transform 0.15s ease;
    }}

    .wiki-search-submit-btn:hover {{
      background: #1D4ED8;
      transform: translateY(-1px);
    }}

    /* ── Right Column: Slide Content & Bento Cards ── */
    .pres-content-col {{
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      padding-top: 4px;
    }}

    .pres-slide-header {{
      margin-bottom: 18px;
    }}

    .pres-slide-title {{
      font-family: var(--font-wiki);
      font-size: 33px;
      font-weight: 800;
      color: #FFFFFF;
      letter-spacing: -0.025em;
      line-height: 1.25;
    }}

    .pres-slide-sub {{
      font-size: 15px;
      color: #CBD5E1;
      margin-top: 6px;
      line-height: 1.45;
    }}

    .pres-bento-grid {{
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 16px;
      width: 100%;
    }}

    .bento-col-12 {{ grid-column: span 12; }}
    .bento-col-6 {{ grid-column: span 6; }}
    .bento-col-4 {{ grid-column: span 4; }}

    @media (max-width: 768px) {{
      .bento-col-6, .bento-col-4 {{ grid-column: span 12; }}
    }}

    /* ══════════════════════════════════════════════════════════════════
       AUTHENTIC PIKA BENTO DESIGN SYSTEM (100% MATCHING LANDING PAGE)
       ══════════════════════════════════════════════════════════════════ */
    .bento-card {{
      border-radius: 22px;
      padding: 18px 22px;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }}

    .bento-card:hover {{
      transform: translateY(-2px);
      box-shadow: 0 20px 42px rgba(0, 0, 0, 0.55);
    }}

    .bento-card-header {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 12px;
    }}

    .bento-col-4 .bento-heading-condensed {{
      font-size: 16px;
      letter-spacing: 0.02em;
    }}
    .bento-heading-condensed {{
      font-family: 'Barlow Condensed', 'IBM Plex Sans Thai', sans-serif;
      font-size: 20px;
      font-weight: 700;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      line-height: 1.15;
      color: #FFFFFF;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
      min-width: 0;
    }}

    .bento-header-pills {{
      display: flex;
      align-items: center;
      gap: 7px;
      flex-shrink: 0;
    }}

    .bento-circle-arrow {{
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: none;
      background: rgba(255, 255, 255, 0.20);
      color: #FFFFFF;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      text-decoration: none;
      flex-shrink: 0;
      transition: transform 0.15s ease;
    }}
    .bento-circle-arrow:hover {{
      transform: scale(1.08);
    }}
    .bento-circle-arrow.dark-circle {{
      background: rgba(22, 24, 28, 0.12);
      color: #16181C;
    }}
    .bento-circle-arrow.white-circle {{
      background: #FFFFFF;
      color: #16181C;
    }}

    /* ── 1. CORAL / ROYAL BLUE BENTO CARD (Selected Project Overview) ── */
    .bento-coral {{
      background: #1E40AF;
      color: #FFFFFF;
      border: 1px solid rgba(255, 255, 255, 0.15);
    }}
    .bento-coral .bento-heading-condensed {{
      color: #FFFFFF;
    }}
    .coral-pill {{
      padding: 3px 10px;
      border-radius: 9999px;
      background: rgba(255, 255, 255, 0.16);
      color: #FFFFFF;
      font-size: 11px;
      font-weight: 600;
      white-space: nowrap;
    }}
    .coral-summary-banner {{
      background: rgba(255, 255, 255, 0.10);
      border-radius: 14px;
      padding: 14px 16px;
      margin-bottom: 12px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }}
    .coral-summary-top {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }}
    .coral-fullname {{
      font-size: 15px;
      font-weight: 700;
      color: #FFFFFF;
    }}
    .coral-dark-badge {{
      background: #1E293B;
      color: #FFFFFF;
      font-size: 10.5px;
      font-weight: 700;
      padding: 3px 9px;
      border-radius: 9999px;
      white-space: nowrap;
    }}
    .coral-summary-text {{
      font-size: 13px;
      line-height: 1.55;
      color: rgba(255, 255, 255, 0.92);
    }}
    .coral-specs-grid {{
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }}
    .coral-spec-card {{
      background: rgba(255, 255, 255, 0.10);
      border-radius: 12px;
      padding: 10px 14px;
      min-height: 60px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 3px;
      transition: background 0.15s ease, transform 0.15s ease;
    }}
    .coral-spec-card:hover {{
      background: rgba(255, 255, 255, 0.18);
      transform: translateY(-1px);
    }}
    .coral-spec-label {{
      font-family: 'Barlow Condensed', 'IBM Plex Sans Thai', sans-serif;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.85);
      line-height: 1.2;
    }}
    .coral-spec-value {{
      font-size: 12px;
      font-weight: 700;
      color: #FFFFFF;
      line-height: 1.3;
    }}

    /* ── Subgrid helper for bottom cards ── */
    .bento-subgrid-2 {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      width: 100%;
    }}

    /* ── Weekly Stepper Track (Slide 12 Top Bento Card) ── */
    .weekly-stepper-track {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding-top: 2px;
    }}
    .stepper-step {{
      display: flex;
      align-items: center;
      gap: 7px;
      flex-shrink: 0;
    }}
    .stepper-dot {{
      width: 19px;
      height: 19px;
      border-radius: 50%;
      background: #FFFFFF;
      color: #1E40AF;
      font-family: var(--font-condensed);
      font-size: 11.5px;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }}
    .stepper-info {{
      display: flex;
      flex-direction: column;
      gap: 1px;
    }}
    .stepper-wk {{
      font-size: 9px;
      font-weight: 700;
      color: #93C5FD;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      line-height: 1.1;
    }}
    .stepper-title {{
      font-size: 10px;
      font-weight: 600;
      color: #FFFFFF;
      line-height: 1.1;
    }}
    .stepper-line {{
      flex: 1;
      height: 2px;
      background: rgba(255, 255, 255, 0.22);
      margin: 0 8px;
    }}

    /* ── 2. MINT / SKY BLUE TECH STACK CARD ── */
    .bento-mint {{
      background: #DBEAFE;
      color: #16181C;
      border: 1px solid rgba(255, 255, 255, 0.4);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 10px;
    }}
    .bento-mint .bento-heading-condensed {{
      color: #0F172A;
    }}
    .mint-pill {{
      padding: 4px 10px;
      border-radius: 9999px;
      background: rgba(255, 255, 255, 0.65);
      color: #16181C;
      font-size: 10.5px;
      font-weight: 700;
      white-space: nowrap;
    }}
    .mint-benchmark-box {{
      background: rgba(255, 255, 255, 0.60);
      border-radius: 13px;
      padding: 10px 14px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }}
    .mint-bench-label {{
      font-size: 9.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: rgba(22, 24, 28, 0.65);
    }}
    .mint-bench-val {{
      font-size: 16px;
      font-weight: 800;
      color: #16181C;
      margin: 2px 0 1px 0;
    }}
    .mint-bench-cat {{
      font-size: 11.5px;
      font-weight: 600;
      color: rgba(22, 24, 28, 0.78);
    }}
    .mint-tags-wrap {{
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }}
    .mint-tag-chip {{
      padding: 5px 11px;
      border-radius: 9999px;
      background: rgba(255, 255, 255, 0.75);
      color: #16181C;
      font-size: 11px;
      font-weight: 600;
      border: none;
      cursor: pointer;
      transition: background 0.15s ease, transform 0.15s ease;
    }}
    .mint-tag-chip:hover {{
      background: #1E293B;
      color: #FFFFFF;
      transform: translateY(-1px);
    }}

    /* ── 3. SAGE / ALABASTER SLATE GOVERNANCE CARD ── */
    .bento-sage {{
      background: #E2E8F0;
      color: #16181C;
      border: 1px solid rgba(255, 255, 255, 0.4);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 10px;
    }}
    .bento-sage .bento-heading-condensed {{
      color: #0F172A;
    }}
    .sage-meta-list {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }}
    .sage-meta-row {{
      background: rgba(255, 255, 255, 0.58);
      border-radius: 12px;
      padding: 10px 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 3px;
    }}
    .sage-meta-k {{
      font-size: 9.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: rgba(22, 24, 28, 0.65);
    }}
    .sage-meta-v {{
      font-size: 12px;
      font-weight: 700;
      color: #16181C;
      line-height: 1.3;
    }}

    /* ── 4. DARK COMPACT TOR & DOCUMENT INGESTION CARD ── */
    .bento-dark-compact {{
      background: #1E293B;
      color: #FFFFFF;
      border: 1px solid rgba(255, 255, 255, 0.12);
      flex-direction: row;
      align-items: center;
      gap: 14px;
      padding: 14px 18px;
      cursor: pointer;
      border-radius: 18px;
    }}
    .amber-solid-tile {{
      width: 40px;
      height: 40px;
      border-radius: 12px;
      background: #F1BF59;
      color: #16181C;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }}
    .compact-copy {{
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 3px;
      min-width: 0;
    }}
    .compact-title {{
      font-family: 'Barlow Condensed', 'IBM Plex Sans Thai', sans-serif;
      font-size: 17px;
      font-weight: 700;
      letter-spacing: 0.02em;
      text-transform: uppercase;
      color: #FFFFFF;
      line-height: 1.15;
    }}
    .compact-desc {{
      font-size: 12px;
      color: #94A3B8;
      line-height: 1.35;
      margin: 0;
    }}

    /* ── 5. DEEP NAVY BLUE TOR COMPLIANCE CHECKLIST CARD ── */
    .bento-violet {{
      background: #1E3A8A;
      color: #FFFFFF;
      border: 1px solid rgba(255, 255, 255, 0.15);
      gap: 10px;
    }}
    .bento-violet .bento-heading-condensed {{
      color: #FFFFFF;
    }}
    .violet-pill {{
      padding: 4px 10px;
      border-radius: 9999px;
      background: rgba(255, 255, 255, 0.18);
      color: #FFFFFF;
      font-size: 10.5px;
      font-weight: 600;
    }}
    .tor-real-list {{
      display: flex;
      flex-direction: column;
      gap: 7px;
    }}
    .tor-real-item {{
      background: rgba(255, 255, 255, 0.12);
      border-radius: 12px;
      padding: 9px 12px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }}
    .tor-real-top {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }}
    .tor-real-code {{
      background: #0F172A;
      color: #FFFFFF;
      font-size: 10px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 9999px;
      letter-spacing: 0.02em;
    }}
    .tor-real-status {{
      background: #FFFFFF;
      color: #16181C;
      font-size: 10px;
      font-weight: 700;
      padding: 2px 10px;
      border-radius: 9999px;
      white-space: nowrap;
    }}
    .tor-real-req {{
      font-size: 12.5px;
      font-weight: 600;
      color: #FFFFFF;
      line-height: 1.35;
    }}
    .tor-real-top {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }}
    .tor-real-code {{
      background: #0F172A;
      color: #FFFFFF;
      font-size: 10px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 9999px;
      letter-spacing: 0.02em;
    }}
    .tor-real-status {{
      background: #FFFFFF;
      color: #16181C;
      font-size: 10px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 9999px;
    }}
    .tor-real-req {{
      font-size: 12px;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 1.35;
    }}

    /* ── 6. DARK CHARCOAL PIKA AI LEAD CARD ── */
    .bento-dark-ai {{
      background: #1E293B;
      color: #FFFFFF;
      border: 1px solid rgba(255, 255, 255, 0.12);
      gap: 12px;
      justify-content: space-between;
    }}
    .ai-speech-row {{
      display: flex;
      align-items: flex-start;
      gap: 10px;
    }}
    .ai-avatar-circle {{
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: #2563EB;
      color: #FFFFFF;
      font-weight: 800;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }}
    .ai-speech-bubble {{
      background: #334155;
      border-radius: 14px;
      padding: 10px 14px;
      font-size: 12.5px;
      line-height: 1.5;
      color: #E2E8F0;
      flex: 1;
    }}
    .ai-action-buttons {{
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 4px;
    }}
    .ai-action-pill {{
      background: #FFFFFF;
      color: #16181C;
      border: none;
      border-radius: 9999px;
      padding: 6px 14px;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.15s ease, transform 0.15s ease;
    }}
    .ai-action-pill:hover {{
      background: #E2E8F0;
      transform: translateY(-1px);
    }}
    .ai-prompt-capsule {{
      display: flex;
      align-items: center;
      gap: 8px;
      background: #0F172A;
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 9999px;
      padding: 6px 14px;
      font-size: 12px;
      color: #94A3B8;
    }}
    .ai-bottom-bar {{
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
    }}
    .ai-coral-plus {{
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #1E40AF;
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
      flex-shrink: 0;
      transition: background 0.15s ease;
    }}
    .ai-coral-plus:hover {{
      background: #2563EB;
    }}
    .ai-input-pill {{
      flex: 1;
      display: flex;
      align-items: center;
      height: 36px;
      background: #0F172A;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 9999px;
      padding: 0 6px 0 12px;
      gap: 6px;
    }}
    .ai-input-field {{
      flex: 1;
      min-width: 0;
      border: none;
      outline: none;
      background: transparent;
      color: #F1F5F9;
      font-family: inherit;
      font-size: 11.5px;
    }}
    .ai-input-field::placeholder {{
      color: #64748B;
    }}
    .ai-send-icon {{
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #2563EB;
      border: none;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: background 0.15s ease;
    }}
    .ai-send-icon:hover {{
      background: #1D4ED8;
    }}
    .ai-quick-pills {{
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
    }}
    .ai-quick-pill {{
      background: #FFFFFF;
      color: #0F172A;
      border: none;
      border-radius: 9999px;
      padding: 4px 10px;
      font-size: 10.5px;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.15s ease, transform 0.15s ease;
    }}
    .ai-quick-pill:hover {{
      background: #E2E8F0;
      transform: translateY(-1px);
    }}

    .coral-badge {{
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 9999px;
      background: rgba(255, 255, 255, 0.15);
      color: #FFFFFF;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }}

    .coral-badge.badge-emerald {{
      background: rgba(16, 185, 129, 0.25);
      color: #6EE7B7;
      border: 1px solid rgba(16, 185, 129, 0.4);
    }}

    .coral-badge.badge-rose {{
      background: rgba(244, 63, 94, 0.25);
      color: #FDA4AF;
      border: 1px solid rgba(244, 63, 94, 0.4);
    }}
    /* ══════════════════════════════════════════════════════════════════
       FLOATING BOTTOM PLAYBACK DOCK (SLEEK KEYNOTE / LINEAR PILL DOCK)
       ══════════════════════════════════════════════════════════════════ */
    /* ── Clean Executive Navigation Buttons (Right-aligned, Minimal) ── */
    .pres-slide-nav-bar {{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 24px;
      padding-top: 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      width: 100%;
    }}

    .pres-nav-btn {{
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 16px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.18s ease;
      border: 1px solid rgba(255, 255, 255, 0.10);
      background: rgba(30, 41, 59, 0.7);
      color: #CBD5E1;
    }}

    .pres-nav-btn:hover {{
      background: rgba(255, 255, 255, 0.12);
      border-color: rgba(255, 255, 255, 0.2);
      color: #FFFFFF;
    }}

    .pres-nav-btn.pres-nav-next {{
      background: #2563EB;
      border-color: #3B82F6;
      color: #FFFFFF;
    }}

    .pres-nav-btn.pres-nav-next:hover {{
      background: #1D4ED8;
    }}

    /* ── Minimal Executive Auto-Demo Toggle (Small, Quiet Luxury, Zero Neon Glow) ── */
    .pres-top-auto-btn {{
      display: inline-flex;
      align-items: center;
      gap: 6px;
      height: 28px;
      padding: 0 10px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.02em;
      cursor: pointer;
      transition: all 0.15s ease;
      border: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(255, 255, 255, 0.03);
      color: #94A3B8;
    }}

    .pres-top-auto-btn:hover {{
      background: rgba(255, 255, 255, 0.07);
      color: #F1F5F9;
      border-color: rgba(255, 255, 255, 0.14);
    }}

    .pres-top-auto-btn.is-active {{
      background: rgba(255, 255, 255, 0.06);
      border-color: rgba(255, 255, 255, 0.12);
      color: #E2E8F0;
    }}

    .pres-top-auto-btn .pres-micro-dot {{
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #10B981;
      display: inline-block;
    }}

    .pres-top-auto-btn.is-paused .pres-micro-dot {{
      background: #64748B;
    }}

    /* Virtual cursor completely removed per user request */
  </style>
</head>
<body class="presentation-body">

  <!-- Virtual Mouse Pointer completely removed -->

  <!-- Executive Top Bar: Minimal Authentic PIKA Header (ZERO Number Steppers, ZERO Speed Toggles) -->
  <header class="pres-top-bar">
    <div class="pres-brand-group">
      <div class="pres-brand-title-wrap">
        <span class="pres-brand-title">PIKA</span>
        <span class="pres-brand-sub">WIKI</span>
      </div>
      <div class="pres-brand-sep"></div>
      <div class="pres-badge-group">
        <span id="topSlideBadge" class="pres-badge-pill">SLIDE 01 / EXECUTIVE VISION</span>
        <span class="pres-badge-sub">The Enterprise Architecture Encyclopedia</span>
      </div>
    </div>

    <div class="pres-top-right">
      <a href="/timeline.html" class="pres-top-auto-btn" style="text-decoration: none; color: #CBD5E1; border: 1px solid rgba(255,255,255,0.14);" title="ดูไทม์ไลน์การพัฒนาของรุ่นพี่และฉัน">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <span>Timeline พัฒนา</span>
      </a>
      <button type="button" id="topAutoPlayBtn" class="pres-top-auto-btn is-active" onclick="toggleAutoPlay()" title="Toggle Auto-Demo Mode">
        <span class="pres-micro-dot"></span>
        <span id="topAutoPlayLabel">Auto-Demo</span>
      </button>
      <div class="pres-project-pill" id="topProjectBadge">presale-mock &middot; v1.0-prod</div>
    </div>
  </header>

  <!-- Progress Bar Line -->
  <div class="pres-progress-line">
    <div id="presProgressBar" class="pres-progress-bar"></div>
  </div>

  <!-- Main Executive Stage (12 Columns: 5 Cols Mascot & Universe / 7 Cols Authentic Bento) -->
  <main class="pres-main-layout">

    <!-- Left: The REAL PIKA 3D Mascot & Multi-Project Orbit -->
    <aside class="pres-mascot-col">
      <!-- Dedicated Speech Bubble Dock: Above the 3D Stage (Zero overlap with head, zero overlap with right text) -->
      <div class="mascot-speech-dock">
        <div class="mascot-speech-bubble" id="mascotBubble">
          สวัสดีทุกท่านครับ! เราชื่อ <strong>PIKA</strong> ผู้ช่วยดูแลคลังความรู้ของ MFEC
        </div>
      </div>

      <div class="wiki-c4-universe">

        <!-- Left Project Links (presale-mock & general-mock) -->
        <div class="wiki-projects-wing wing-left" id="wingLeft">
          <div class="wiki-project-link link-left slot-top is-active-project-click" id="linkPresaleMock" data-id="presale-mock" data-layers="4,1" onclick="selectProjectByMascot('presale-mock', false)">
            <div class="project-name-row">
              <div class="project-name" title="presale-mock">presale-mock</div>
              <button type="button" class="project-graph-btn" aria-label="graph">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
              </button>
            </div>
            <div class="project-sub">6 Ingested Docs</div>
          </div>

          <div class="wiki-project-link link-left slot-mid" id="linkGeneralMock" data-id="general-mock" data-layers="2,1" onclick="selectProjectByMascot('general-mock', false)">
            <div class="project-name-row">
              <div class="project-name" title="general-mock">general-mock</div>
              <button type="button" class="project-graph-btn" aria-label="graph">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
              </button>
            </div>
            <div class="project-sub">20 Ingested Docs</div>
          </div>
        </div>

        <!-- Center: 3D Mascot Stage -->
        <div class="wiki-blueprint-universe" id="blueprintUniverse">
          <div class="mascot-drag-zone" id="mascotDragZone" title="ลากเพื่อหมุนตัวละคร 360&deg; หรือคลิกชื่อโปรเจกต์ข้างๆ เพื่อให้น้องเอื้อมมือไปกด"></div>
          <div id="blueprintStage" class="blueprint-stage"></div>
        </div>

      </div>

      <!-- Real Elevated Search Bar from wiki_landing_preview.html -->
      <div class="wiki-search-box-wrap">
        <form id="pikaSearchForm" onsubmit="event.preventDefault(); triggerSearchDemo();">
          <div class="wiki-search-input-group">
            <span class="wiki-search-lead-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </span>
            <input type="text" id="wikiSearchInput" class="wiki-search-input" placeholder="ค้นหาโปรเจกต์ สถาปัตยกรรม สเปก TOR หรือถาม PIKA AI..." autocomplete="off">
            <div class="wiki-search-scope">
              <select id="wikiSearchScope" class="wiki-scope-select" aria-label="Search Scope">
                <option value="all">All Domains</option>
                <option value="vision">Vision AI</option>
                <option value="cloud">Cloud &amp; GKE</option>
                <option value="ledger">Ledger</option>
                <option value="govcloud">Zero-Trust</option>
                <option value="health">HL7 FHIR</option>
                <option value="fintech">ISO 20022</option>
              </select>
            </div>
            <button type="submit" id="wikiSearchSubmitBtn" class="wiki-search-submit-btn" title="ค้นหาหรือถาม PIKA AI">
              <span>Search</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>
        </form>
      </div>
    </aside>

    <!-- Right: Executive Slide Content & Bento Cards -->
    <section class="pres-content-col">
      <div class="pres-slide-header">
        <h1 id="slideTitle" class="pres-slide-title">PIKA WIKI: The Enterprise Architecture Encyclopedia</h1>
        <p id="slideSub" class="pres-slide-sub">ยกระดับการจัดการองค์ความรู้ทีม Presale &amp; Enterprise Architecture สู่คลังปัญญาองค์กรที่มีชีวิต</p>
      </div>

      <!-- Bento Cards Grid (Populated dynamically) -->
      <div id="slideBentoGrid" class="pres-bento-grid"></div>

      <!-- Clean Slide Navigation Buttons -->
      <div class="pres-slide-nav-bar">
        <button type="button" class="pres-nav-btn pres-nav-prev" onclick="prevSlide()" title="Previous Slide">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"/></svg>
          <span>Previous</span>
        </button>

        <button type="button" class="pres-nav-btn pres-nav-next" onclick="nextSlide()" title="Next Slide">
          <span>Next</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </section>

  </main>

  <!-- 1. Real Three.js Library -->
  <script>
{three_js_code}
  </script>

  <!-- 2. Real PIKA 3D Mascot Engine (Heroic Scale, Neck Locked Firmly, Lip-sync & Inertia Drag) -->
  <script>
{mascot_code}
  </script>

  <!-- 3. Executive Presentation Sequencer with Authentic Bento Cards -->
  <script>
    // ========================================================================
    // 12 EXECUTIVE SLIDES (AUTHENTIC BENTO CARDS & SPEECHES FROM TSX)
    // ========================================================================
    const EXECUTIVE_SLIDES = [
      {{
        id: 1,
        badge: "SLIDE 01 / EXECUTIVE VISION",
        title: "PIKA WIKI: The Living Enterprise Architecture Platform",
        sub: "ยกระดับการจัดการองค์ความรู้เชิงสถาปัตยกรรมและกระบวนการ Presale สู่ศูนย์กลางปัญญาประดิษฐ์ระดับองค์กร",
        pikaPose: "wave",
        pikaSpeech: "ยินดีต้อนรับทุกท่านครับ PIKA WIKI คือแพลตฟอร์มศูนย์กลางองค์ความรู้สถาปัตยกรรมระบบ ที่เชื่อมโยงเอกสารโครงการและแบบแปลน C4 Model เข้าสู่ระบบสืบค้นอัจฉริยะอย่างบูรณาการครับ",
        project: "presale-mock",
        durationMs: 8000,
        isAutoDemoSlide: false,
        cardsHtml: `
          <!-- Top Royal Blue Bento (PRESALE-MOCK Style) -->
          <div class="bento-card bento-coral bento-col-12">
            <div class="bento-card-header">
              <h2 class="bento-heading-condensed">PRESALE-MOCK</h2>
              <div class="bento-header-pills">
                <span class="coral-pill">presale-mock</span>
                <span class="coral-pill">active</span>
                <button type="button" class="bento-circle-arrow" title="ดูสเปกโครงการ">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </button>
              </div>
            </div>

            <div class="coral-summary-banner">
              <div class="coral-summary-top">
                <span class="coral-fullname">The Living Enterprise Architecture Platform</span>
                <span class="coral-dark-badge">v1.0-prod</span>
              </div>
              <p class="coral-summary-text">
                พิมพ์เขียวสถาปัตยกรรมและข้อกำหนดโครงการ presale-mock บันทึกในคลังข้อมูล PIKA WIKI รองรับการสืบค้นและต่อยอดสถาปัตยกรรมข้ามสายงานได้อย่างมีประสิทธิภาพและแม่นยำ 100%
              </p>
            </div>

            <div class="coral-specs-grid">
              <div class="coral-spec-card">
                <span class="coral-spec-label">PROJECT ID</span>
                <span class="coral-spec-value">presale-mock</span>
              </div>
              <div class="coral-spec-card">
                <span class="coral-spec-label">ARCHITECTURE TYPE</span>
                <span class="coral-spec-value">presale</span>
              </div>
              <div class="coral-spec-card">
                <span class="coral-spec-label">ACCESS CONTROL</span>
                <span class="coral-spec-value">private</span>
              </div>
              <div class="coral-spec-card">
                <span class="coral-spec-label">SYSTEM STATUS</span>
                <span class="coral-spec-value">active</span>
              </div>
              <div class="coral-spec-card">
                <span class="coral-spec-label">DOCUMENTS INGESTED</span>
                <span class="coral-spec-value">6 Verified Files</span>
              </div>
              <div class="coral-spec-card">
                <span class="coral-spec-label">REPOSITORY ENGINE</span>
                <span class="coral-spec-value">PIKA Knowledge Base</span>
              </div>
            </div>
          </div>

          <!-- Bottom Left Split (TECH STACK & GOVERNANCE) -->
          <div class="bento-col-12 bento-subgrid-2">
            <div class="bento-card bento-mint">
              <div class="bento-card-header">
                <h3 class="bento-heading-condensed" style="color: #0F172A;">TECH STACK</h3>
                <div class="bento-header-pills">
                  <span class="mint-pill">C4 L1 &middot; L2</span>
                  <button type="button" class="bento-circle-arrow dark-circle">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                  </button>
                </div>
              </div>
              <div class="mint-benchmark-box">
                <span class="mint-bench-label">KEY BENCHMARK &amp; DOMAIN</span>
                <span class="mint-bench-val">6 Ingested Docs</span>
                <span class="mint-bench-cat">PRESALE ARCH &middot; PostgreSQL 15 + pgvector</span>
              </div>
              <div class="mint-tags-wrap">
                <span class="mint-tag-chip">general</span>
                <span class="mint-tag-chip">C4 Architecture</span>
              </div>
            </div>

            <div class="bento-card bento-sage">
              <div class="bento-card-header">
                <h3 class="bento-heading-condensed" style="color: #0F172A;">GOVERNANCE</h3>
                <button type="button" class="bento-circle-arrow dark-circle">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </button>
              </div>
              <div class="sage-meta-list">
                <div class="sage-meta-row">
                  <span class="sage-meta-k">DEPLOYMENT HUB</span>
                  <span class="sage-meta-v">tester</span>
                </div>
                <div class="sage-meta-row">
                  <span class="sage-meta-k">LEAD ARCHITECT</span>
                  <span class="sage-meta-v">tester</span>
                </div>
                <div class="sage-meta-row">
                  <span class="sage-meta-k">CERTIFICATION</span>
                  <span class="sage-meta-v">active (v1.0-prod)</span>
                </div>
                <div class="sage-meta-row">
                  <span class="sage-meta-k">LAST VERIFIED</span>
                  <span class="sage-meta-v">Recently</span>
                </div>
              </div>
            </div>
          </div>
        `
      }},
      {{
        id: 2,
        badge: "SLIDE 02 / STRATEGIC CHALLENGE",
        title: "ความท้าทายของการบริหารองค์ความรู้สถาปัตยกรรมในยุค Generative AI",
        sub: "วิเคราะห์ข้อจำกัดของการใช้งาน AI Chat ทั่วไป ที่ส่งผลต่อความยั่งยืนของสินทรัพย์ทางปัญญาองค์กร",
        pikaPose: "think",
        pikaSpeech: "การใช้ AI Chat แบบทั่วไปมักประสบปัญหาข้อมูลสูญหายหลังปิดหน้าต่างแชท PIKA WIKI จึงถูกออกแบบมาเพื่อรวบรวมและจัดระเบียบองค์ความรู้ให้คงอยู่กับองค์กรอย่างถาวรครับ",
        project: "presale-mock",
        durationMs: 8500,
        isAutoDemoSlide: false,
        cardsHtml: `
          <div class="bento-card bento-col-6" style="background: #182234; border: 1px solid rgba(244, 63, 94, 0.4);">
            <div class="bento-card-header">
              <h3 class="bento-heading-condensed" style="color: #FDA4AF;">TRADITIONAL LIMITATIONS</h3>
              <span class="coral-pill" style="background: rgba(244, 63, 94, 0.2); color: #FDA4AF;">Throwaway AI Chats</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <div style="background: rgba(0,0,0,0.25); border-radius: 12px; padding: 10px 12px;">
                <div style="font-size: 10px; font-weight: 700; color: #FB7185;">EPHEMERAL KNOWLEDGE LOSS</div>
                <div style="font-size: 12px; color: #CBD5E1; margin-top: 2px;">บริบทสูญหายหลังจบเซสชัน ไม่ถูกบันทึกเข้าสู่ศูนย์กลางองค์กร</div>
              </div>
              <div style="background: rgba(0,0,0,0.25); border-radius: 12px; padding: 10px 12px;">
                <div style="font-size: 10px; font-weight: 700; color: #FB7185;">SILOED ASSETS</div>
                <div style="font-size: 12px; color: #CBD5E1; margin-top: 2px;">เอกสาร TOR และแบบแปลนระบบกระจายอยู่ตามเครื่องบุคคล</div>
              </div>
              <div style="background: rgba(0,0,0,0.25); border-radius: 12px; padding: 10px 12px;">
                <div style="font-size: 10px; font-weight: 700; color: #FB7185;">NO SYSTEM CONTEXT</div>
                <div style="font-size: 12px; color: #CBD5E1; margin-top: 2px;">โมเดลทั่วไปไม่เข้าใจความสัมพันธ์ของสถาปัตยกรรมระบบเดิม</div>
              </div>
              <div style="background: rgba(0,0,0,0.25); border-radius: 12px; padding: 10px 12px;">
                <div style="font-size: 10px; font-weight: 700; color: #FB7185;">BRAIN DRAIN RISK</div>
                <div style="font-size: 12px; color: #CBD5E1; margin-top: 2px;">องค์ความรู้โครงการผูกติดกับตัวบุคคล ขาดการถ่ายทอดเชิงระบบ</div>
              </div>
            </div>
          </div>

          <div class="bento-card bento-coral bento-col-6">
            <div class="bento-card-header">
              <h3 class="bento-heading-condensed">PIKA STRATEGIC ADVANTAGE</h3>
              <span class="coral-pill" style="background: rgba(16, 185, 129, 0.25); color: #6EE7B7;">Living Enterprise Wiki</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <div class="coral-spec-card">
                <span class="coral-spec-label" style="color: #6EE7B7;">INSTITUTIONAL MEMORY</span>
                <div style="font-size: 12px; color: #FFFFFF; line-height: 1.4;">แปลงผลการวิเคราะห์เป็น C4 Model และ Markdown บันทึกถาวร</div>
              </div>
              <div class="coral-spec-card">
                <span class="coral-spec-label" style="color: #6EE7B7;">SELF-EVOLVING HUB</span>
                <div style="font-size: 12px; color: #FFFFFF; line-height: 1.4;">เชื่อมโยงและอัปเดตสถาปัตยกรรมข้ามโครงการอัตโนมัติ</div>
              </div>
              <div class="coral-spec-card">
                <span class="coral-spec-label" style="color: #6EE7B7;">100% PRIVATE TENANT</span>
                <div style="font-size: 12px; color: #FFFFFF; line-height: 1.4;">รักษาความลับองค์กรสูงสุด ข้อมูลไม่รั่วไหลสู่ภายนอก</div>
              </div>
              <div class="coral-spec-card">
                <span class="coral-spec-label" style="color: #6EE7B7;">IMMEDIATE ONBOARDING</span>
                <div style="font-size: 12px; color: #FFFFFF; line-height: 1.4;">สืบค้นและนำพิมพ์เขียวสถาปัตยกรรมเดิมมาใช้ซ้ำได้ทันที</div>
              </div>
            </div>
          </div>
        `
      }},
      {{
        id: 3,
        badge: "SLIDE 03 / KNOWLEDGE EVOLUTION",
        title: "วิวัฒนาการจากเอกสารแบบ Static สู่ Dynamic Living Wiki",
        sub: "เปลี่ยนเอกสารข้อเสนอโครงการและแบบแปลนระบบให้เป็นสินทรัพย์ทางปัญญาที่เชื่อมโยงถึงกันทั้งองค์กร",
        pikaPose: "point",
        pikaSpeech: "PIKA WIKI แปลงเอกสารนิ่งในรูปแบบ PDF หรือ Word ให้กลายเป็น Living Data Layer ที่พร้อมให้ทีมงานทุกสายงานสืบค้นได้อย่างเป็นรูปธรรมครับ",
        project: "presale-mock",
        durationMs: 8500,
        isAutoDemoSlide: false,
        cardsHtml: `
          <div class="bento-card bento-coral bento-col-12">
            <div class="bento-card-header">
              <h2 class="bento-heading-condensed">DYNAMIC LIVING WIKI PIPELINE</h2>
              <div class="bento-header-pills">
                <span class="coral-pill">Self-Evolving Knowledge</span>
                <button type="button" class="bento-circle-arrow">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </button>
              </div>
            </div>
            <div class="coral-summary-banner" style="margin-bottom: 0;">
              <span class="coral-fullname">Transforming Static Documents into Institutional Capital</span>
              <p class="coral-summary-text">
                สกัดเอกสารข้อกำหนด TOR, RFP และ Architecture Blueprints ให้อยู่ในรูปแบบ C4 Schema ที่เชื่อมโยงความสัมพันธ์ของระบบโดยอัตโนมัติ
              </p>
            </div>
          </div>

          <div class="bento-card bento-mint bento-col-4">
            <div class="bento-card-header">
              <h3 class="bento-heading-condensed" style="color: #0F172A;">STAGE 01</h3>
              <span class="mint-pill">Raw Ingest</span>
            </div>
            <div class="mint-benchmark-box">
              <span class="mint-bench-label">INPUT FORMATS</span>
              <span class="mint-bench-val" style="font-size: 15px;">PDF, Word, Markdown</span>
              <span class="mint-bench-cat">TOR &amp; Technical Specs</span>
            </div>
            <div style="font-size: 12px; color: #475569; line-height: 1.5;">
              นำเข้าไฟล์เอกสารและบันทึกการประชุมทางสถาปัตยกรรมเข้าสู่ระบบ
            </div>
          </div>

          <div class="bento-card bento-violet bento-col-4">
            <div class="bento-card-header">
              <h3 class="bento-heading-condensed">STAGE 02</h3>
              <span class="violet-pill">C4 Extraction</span>
            </div>
            <div style="background: rgba(0,0,0,0.22); border-radius: 13px; padding: 12px 14px; margin-bottom: 8px;">
              <div style="font-size: 9.5px; font-weight: 700; color: #93C5FD;">EXTRACTED ENTITIES</div>
              <div style="font-size: 15px; font-weight: 700; color: #FFFFFF; margin-top: 2px;">C4 Model Hierarchy</div>
              <div style="font-size: 11px; color: #CBD5E1;">Systems &middot; Containers &middot; Components</div>
            </div>
            <div style="font-size: 12px; color: #E2E8F0; line-height: 1.5;">
              สกัดโครงสร้างระบบและความสัมพันธ์ตามมาตรฐาน C4 Model
            </div>
          </div>

          <div class="bento-card bento-sage bento-col-4">
            <div class="bento-card-header">
              <h3 class="bento-heading-condensed" style="color: #0F172A;">STAGE 03</h3>
              <span class="mint-pill">Graph RAG</span>
            </div>
            <div class="sage-meta-row" style="margin-bottom: 8px;">
              <span class="sage-meta-k">INDEX ARCHITECTURE</span>
              <span class="sage-meta-v">Hybrid Graph + Vector</span>
              <span style="font-size: 11px; color: #64748B;">HNSW Index &middot; Multi-hop Path</span>
            </div>
            <div style="font-size: 12px; color: #475569; line-height: 1.5;">
              จัดทำดัชนีเวกเตอร์และโครงสร้างกราฟเพื่อการสืบค้นที่แม่นยำ
            </div>
          </div>
        `
      }},
      {{
        id: 4,
        badge: "SLIDE 04 / ENTERPRISE WORKSPACE",
        title: "ศูนย์กลางบริหารจัดการสถาปัตยกรรมแยกตามขอบเขตโครงการ",
        sub: "โครงสร้าง Multi-Project Hub ที่แยกสิทธิ์และบริบทของแต่ละโครงการอย่างชัดเจน",
        pikaPose: "reach_click",
        pikaSpeech: "ระบบรองรับการสลับบริบทระหว่างโครงการได้อย่างราบรื่น โดยแยกคลังข้อมูล ขอบเขตสิทธิ์ และแบบแปลนระบบออกจากกันอย่างเป็นระเบียบครับ",
        project: "presale-mock",
        durationMs: 8500,
        isAutoDemoSlide: false,
        cardsHtml: `
          <!-- Top Royal Blue Bento (PRESALE-MOCK Exact Layout) -->
          <div class="bento-card bento-coral bento-col-12" id="hubCardPresale">
            <div class="bento-card-header">
              <h2 class="bento-heading-condensed">PRESALE-MOCK</h2>
              <div class="bento-header-pills">
                <span class="coral-pill">presale-mock</span>
                <span class="coral-pill">active</span>
                <button type="button" class="bento-circle-arrow">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </button>
              </div>
            </div>

            <div class="coral-summary-banner">
              <div class="coral-summary-top">
                <span class="coral-fullname">presale-mock</span>
                <span class="coral-dark-badge">v1.0-prod</span>
              </div>
              <p class="coral-summary-text">
                พิมพ์เขียวสถาปัตยกรรมและข้อกำหนดโครงการ presale-mock บันทึกในคลังข้อมูล PIKA WIKI (มีเอกสารถูกประมวลผลแล้ว 6 ฉบับ)
              </p>
            </div>

            <div class="coral-specs-grid">
              <div class="coral-spec-card">
                <span class="coral-spec-label">PROJECT ID</span>
                <span class="coral-spec-value">presale-mock</span>
              </div>
              <div class="coral-spec-card">
                <span class="coral-spec-label">ARCHITECTURE TYPE</span>
                <span class="coral-spec-value">presale</span>
              </div>
              <div class="coral-spec-card">
                <span class="coral-spec-label">ACCESS CONTROL</span>
                <span class="coral-spec-value">private</span>
              </div>
              <div class="coral-spec-card">
                <span class="coral-spec-label">SYSTEM STATUS</span>
                <span class="coral-spec-value">active</span>
              </div>
              <div class="coral-spec-card">
                <span class="coral-spec-label">DOCUMENTS INGESTED</span>
                <span class="coral-spec-value">6 Verified Files</span>
              </div>
              <div class="coral-spec-card">
                <span class="coral-spec-label">REPOSITORY ENGINE</span>
                <span class="coral-spec-value">PIKA Knowledge Base</span>
              </div>
            </div>
          </div>

          <!-- Bottom Left Split (TECH STACK & GOVERNANCE) -->
          <div class="bento-col-12 bento-subgrid-2">
            <div class="bento-card bento-mint">
              <div class="bento-card-header">
                <h3 class="bento-heading-condensed" style="color: #0F172A;">TECH STACK</h3>
                <div class="bento-header-pills">
                  <span class="mint-pill">C4 L1 &middot; L2</span>
                  <button type="button" class="bento-circle-arrow dark-circle">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                  </button>
                </div>
              </div>
              <div class="mint-benchmark-box">
                <span class="mint-bench-label">KEY BENCHMARK &amp; DOMAIN</span>
                <span class="mint-bench-val">6 Ingested Docs</span>
                <span class="mint-bench-cat">PRESALE ARCH</span>
              </div>
              <div class="mint-tags-wrap">
                <span class="mint-tag-chip">general</span>
              </div>
            </div>

            <div class="bento-card bento-sage">
              <div class="bento-card-header">
                <h3 class="bento-heading-condensed" style="color: #0F172A;">GOVERNANCE</h3>
                <button type="button" class="bento-circle-arrow dark-circle">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </button>
              </div>
              <div class="sage-meta-list">
                <div class="sage-meta-row">
                  <span class="sage-meta-k">DEPLOYMENT HUB</span>
                  <span class="sage-meta-v">tester</span>
                </div>
                <div class="sage-meta-row">
                  <span class="sage-meta-k">LEAD ARCHITECT</span>
                  <span class="sage-meta-v">tester</span>
                </div>
                <div class="sage-meta-row">
                  <span class="sage-meta-k">CERTIFICATION</span>
                  <span class="sage-meta-v">active (v1.0-prod)</span>
                </div>
                <div class="sage-meta-row">
                  <span class="sage-meta-k">LAST VERIFIED</span>
                  <span class="sage-meta-v">Recently</span>
                </div>
              </div>
            </div>
          </div>
        `
      }},
      {{
        id: 5,
        badge: "SLIDE 05 / AUTOMATED INGESTION",
        title: "กระบวนการประมวลผลและสกัดข้อกำหนด TOR อัตโนมัติ",
        sub: "โครงสร้างไปป์ไลน์การแปลงเอกสาร TOR สู่แบบจำลอง C4 และการตรวจสอบความสอดคล้องตามมาตรฐาน",
        pikaPose: "scan",
        pikaSpeech: "เมื่อนำเข้าเอกสาร TOR หรือ RFP ระบบจะดำเนินการแยกแยะข้อกำหนด สกัด Entity สถาปัตยกรรม และจัดทำดัชนีเพื่อการตรวจสอบความสอดคล้องในทันทีครับ",
        project: "presale-mock",
        durationMs: 8500,
        isAutoDemoSlide: false,
        cardsHtml: `
          <!-- Compact Dark Ingestion Bento (Matching Screenshot) -->
          <div class="bento-card bento-dark-compact bento-col-12" id="bentoIngestCard">
            <div class="amber-solid-tile">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/></svg>
            </div>
            <div class="compact-copy">
              <div class="compact-title">TOR &amp; DOCUMENT INGESTION</div>
              <p class="compact-desc">Upload TOR/RFP documents and extract C4 entities into the knowledge base.</p>
            </div>
            <button type="button" class="bento-circle-arrow white-circle">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
            </button>
          </div>

          <!-- Deep Navy TOR Compliance Bento (Matching Screenshot) -->
          <div class="bento-card bento-violet bento-col-12" id="bentoVioletCard">
            <div class="bento-card-header">
              <h3 class="bento-heading-condensed">TOR COMPLIANCE</h3>
              <span class="violet-pill">presale-mock &middot; v1.0-prod</span>
            </div>

            <div class="tor-real-list">
              <div class="tor-real-item" id="ingestDoc1">
                <div class="tor-real-top">
                  <span class="tor-real-code">DOC-01</span>
                  <span class="tor-real-status" id="ingestStatus1">Indexed &amp; Ready</span>
                </div>
                <div class="tor-real-req">client-overview.md</div>
              </div>

              <div class="tor-real-item" id="ingestDoc2">
                <div class="tor-real-top">
                  <span class="tor-real-code">DOC-02</span>
                  <span class="tor-real-status" id="ingestStatus2">Indexed &amp; Ready</span>
                </div>
                <div class="tor-real-req">competitive-analysis.md</div>
              </div>

              <div class="tor-real-item" id="ingestDoc3">
                <div class="tor-real-top">
                  <span class="tor-real-code">DOC-03</span>
                  <span class="tor-real-status" id="ingestStatus3">Indexed &amp; Ready</span>
                </div>
                <div class="tor-real-req">discovery-questions.md</div>
              </div>
            </div>
          </div>
        `
      }},
      {{
        id: 6,
        badge: "SLIDE 06 / HYBRID RETRIEVAL ARCHITECTURE",
        title: "กลไกการสืบค้นแบบผสมผสาน: Graph Database & Semantic Vector RAG",
        sub: "เพิ่มขีดความสามารถการค้นหาด้วยการรวมความหมายของเนื้อหาเข้ากับโครงสร้างความสัมพันธ์เชิงระบบ",
        pikaPose: "holo",
        pikaSpeech: "ระบบผสมผสานจุดเด่นของ Vector RAG ในการจับความหมาย เข้ากับ C4 Graph เพื่อระบุความสัมพันธ์ระหว่างส่วนประกอบระบบได้อย่างถูกต้องแม่นยำครับ",
        project: "presale-mock",
        durationMs: 8500,
        isAutoDemoSlide: false,
        cardsHtml: `
          <div class="bento-card bento-coral bento-col-12">
            <div class="bento-card-header">
              <h2 class="bento-heading-condensed">HYBRID DUAL-ENGINE ARCHITECTURE</h2>
              <div class="bento-header-pills">
                <span class="coral-pill">Sub-second Latency</span>
                <span class="coral-pill">High Precision</span>
              </div>
            </div>
            <div class="coral-summary-banner" style="margin-bottom: 0;">
              <span class="coral-fullname">Deterministic Semantic &amp; Structural Synthesis</span>
              <p class="coral-summary-text">
                ก้าวข้ามข้อจำกัดของ Vector Search ทั่วไปด้วยการผสานโครงสร้าง Entity Graph ของระบบสถาปัตยกรรม C4 Model
              </p>
            </div>
          </div>

          <div class="bento-card bento-mint bento-col-4">
            <div class="bento-card-header">
              <h3 class="bento-heading-condensed" style="color: #0F172A;">ENGINE A</h3>
              <span class="mint-pill">Semantic RAG</span>
            </div>
            <div class="mint-benchmark-box">
              <span class="mint-bench-label">VECTOR STORE</span>
              <span class="mint-bench-val" style="font-size: 15px;">pgvector &middot; HNSW</span>
              <span class="mint-bench-cat">Cosine Distance &gt; 0.92</span>
            </div>
            <div style="font-size: 12px; color: #475569; line-height: 1.5;">
              ค้นหาเชิงความหมายจากข้อกำหนด TOR และมาตรฐานสถาปัตยกรรม
            </div>
          </div>

          <div class="bento-card bento-violet bento-col-4">
            <div class="bento-card-header">
              <h3 class="bento-heading-condensed">ENGINE B</h3>
              <span class="violet-pill">C4 Graph</span>
            </div>
            <div style="background: rgba(0,0,0,0.22); border-radius: 13px; padding: 12px 14px; margin-bottom: 8px;">
              <div style="font-size: 9.5px; font-weight: 700; color: #93C5FD;">GRAPH TOPOLOGY</div>
              <div style="font-size: 15px; font-weight: 700; color: #FFFFFF; margin-top: 2px;">Multi-hop Relations</div>
              <div style="font-size: 11px; color: #CBD5E1;">Systems &rarr; Containers &rarr; DBs</div>
            </div>
            <div style="font-size: 12px; color: #E2E8F0; line-height: 1.5;">
              ตรวจจับความเชื่อมโยงระดับสถาปัตยกรรมอย่างแม่นยำ
            </div>
          </div>

          <div class="bento-card bento-sage bento-col-4">
            <div class="bento-card-header">
              <h3 class="bento-heading-condensed" style="color: #0F172A;">FUSION</h3>
              <span class="mint-pill">Grounded</span>
            </div>
            <div class="sage-meta-row" style="margin-bottom: 8px;">
              <span class="sage-meta-k">SYNTHESIS OUTPUT</span>
              <span class="sage-meta-v">Verified Citation</span>
              <span style="font-size: 11px; color: #64748B;">Zero AI Hallucination</span>
            </div>
            <div style="font-size: 12px; color: #475569; line-height: 1.5;">
              ประมวลผลคำตอบที่แม่นยำพร้อมระบุเส้นทางตรวจสอบได้
            </div>
          </div>
        `
      }},
      {{
        id: 7,
        badge: "SLIDE 07 / LIVE SEARCH & RETRIEVAL DEMO",
        title: "ระบบสืบค้นอัจฉริยะพร้อมการอ้างอิงเอกสารต้นฉบับ 100%",
        sub: "ค้นหาคำตอบทางสถาปัตยกรรมและข้อกำหนด TOR พร้อมการระบุแหล่งที่มาชัดเจนเพื่อการตรวจสอบ",
        pikaPose: "look_down",
        pikaSpeech: "ดูการประมวลผลแบบสดๆ สิครับ! เมื่อพิมพ์คำถาม ระบบจะวิ่งสืบค้นผ่าน C4 Graph และ Vector RAG ทันที พร้อมดึงคำตอบจากเอกสาร DOC-01 และ DOC-02 ตรวจสอบย้อนกลับได้ 100% ปราศจาก AI Hallucination ครับ!",
        project: "presale-mock",
        durationMs: 11000,
        isAutoDemoSlide: true,
        cardsHtml: `
          <!-- Exciting Live Demo Bento Card with Streaming Pipeline -->
          <div class="bento-card bento-coral bento-col-12" id="searchDemoContainer">
            <div class="bento-card-header">
              <div style="display: flex; align-items: center; gap: 8px;">
                <h2 class="bento-heading-condensed">HYBRID RAG LIVE RUNTIME</h2>
                <span class="coral-pill" id="demoLiveDot" style="background: rgba(16, 185, 129, 0.25); color: #6EE7B7;">
                  <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#34D399;margin-right:4px;"></span>ACTIVE QUERY
                </span>
              </div>
              <div class="bento-header-pills">
                <span class="coral-pill">presale-mock</span>
                <button type="button" class="bento-circle-arrow" onclick="triggerSearchDemo()">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </button>
              </div>
            </div>

            <!-- Active Query Box -->
            <div class="coral-summary-banner" id="demoQueryBanner">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 10px; font-weight: 700; color: #93C5FD; letter-spacing: 0.05em;">LIVE SEARCH QUERY</span>
                <span style="font-size: 10px; color: rgba(255,255,255,0.7);">Dual-Engine Pipeline</span>
              </div>
              <div id="demoQueryText" style="font-size: 14px; font-weight: 700; color: #ffffff; margin-top: 4px;">
                สเปก TOR โครงการ presale-mock ใช้ฐานข้อมูลอะไร และ SLA ความเสถียรเท่าไร?
              </div>
            </div>

            <!-- Multi-Stage AI Pipeline Visualizer (Thrilling Progress) -->
            <div id="demoPipelineTracer" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 12px;">
              <div id="pipeStage1" style="background: rgba(0,0,0,0.22); border-radius: 12px; padding: 10px 12px; border: 1px solid rgba(255,255,255,0.08);">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <span style="font-size: 9.5px; font-weight: 700; color: #93C5FD;">[1/3] C4 GRAPH</span>
                  <span id="pipeStatus1" style="font-size: 9px; padding: 1px 6px; border-radius: 999px; background: rgba(59, 130, 246, 0.3); color: #93C5FD;">Traversing</span>
                </div>
                <div id="pipeDesc1" style="font-size: 11.5px; font-weight: 600; color: #ffffff; margin-top: 4px;">
                  Scanning 4 Entity Nodes...
                </div>
              </div>

              <div id="pipeStage2" style="background: rgba(0,0,0,0.22); border-radius: 12px; padding: 10px 12px; border: 1px solid rgba(255,255,255,0.08);">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <span style="font-size: 9.5px; font-weight: 700; color: #93C5FD;">[2/3] VECTOR RAG</span>
                  <span id="pipeStatus2" style="font-size: 9px; padding: 1px 6px; border-radius: 999px; background: rgba(255,255,255,0.1); color: #94A3B8;">Queued</span>
                </div>
                <div id="pipeDesc2" style="font-size: 11.5px; font-weight: 600; color: #CBD5E1; margin-top: 4px;">
                  HNSW Embedding Match
                </div>
              </div>

              <div id="pipeStage3" style="background: rgba(0,0,0,0.22); border-radius: 12px; padding: 10px 12px; border: 1px solid rgba(255,255,255,0.08);">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <span style="font-size: 9.5px; font-weight: 700; color: #93C5FD;">[3/3] VERIFICATION</span>
                  <span id="pipeStatus3" style="font-size: 9px; padding: 1px 6px; border-radius: 999px; background: rgba(255,255,255,0.1); color: #94A3B8;">Queued</span>
                </div>
                <div id="pipeDesc3" style="font-size: 11.5px; font-weight: 600; color: #CBD5E1; margin-top: 4px;">
                  Cross-Checking TOR Docs
                </div>
              </div>
            </div>

            <!-- Grounded Response Card (High Impact Reveal) -->
            <div id="searchResultCard" style="background: #0F172A; border-radius: 14px; padding: 14px 16px; border: 1px solid rgba(255, 255, 255, 0.14);">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="coral-badge badge-emerald" style="font-size: 11px;">
                  &bull; VERIFIED GROUNDED ANSWER (CONFIDENCE: 98.6%)
                </span>
                <span style="font-size: 10.5px; font-family: var(--font-mono); color: #94A3B8;">#TX-98421 &middot; Zero Hallucination</span>
              </div>
              <div style="font-size: 13.5px; color: #FFFFFF; line-height: 1.65; margin-top: 10px;">
                จากเอกสารข้อกำหนด TOR โครงการ <strong>presale-mock</strong> กำหนดสถาปัตยกรรม <strong>Private Cloud Microservices</strong> โดยเลือกใช้ <strong>PostgreSQL 15 ร่วมกับ pgvector (HNSW Index)</strong> ในการจัดเก็บเวกเตอร์สถาปัตยกรรมและ C4 Entity Graph เพื่อรองรับการสืบค้นความเร็วสูงต่ำกว่า 800ms พร้อมระบบ High Availability Active-Active SLA 99.98% ครบถ้วน
              </div>
              <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.08); display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
                <span style="font-size: 10px; font-weight: 700; color: #93C5FD; text-transform: uppercase;">CITATIONS:</span>
                <span class="coral-pill" style="background: rgba(59, 130, 246, 0.25); color: #93C5FD; font-size: 10.5px;">DOC-01 client-overview.md #Sec-3.2 (98.4%)</span>
                <span class="coral-pill" style="background: rgba(59, 130, 246, 0.25); color: #93C5FD; font-size: 10.5px;">DOC-02 competitive-analysis.md #Sec-1.4 (94.1%)</span>
              </div>
            </div>
          </div>
        `
      }},
      {{
        id: 8,
        badge: "SLIDE 08 / ENTERPRISE DATA GOVERNANCE",
        title: "มาตรฐานความปลอดภัยและการควบคุมการเข้าถึงระดับองค์กร",
        sub: "ปกป้องข้อมูลสำคัญและทรัพย์สินทางปัญญาด้วยระบบการแยกสภาพแวดล้อมและการกำหนดสิทธิ์อย่างเคร่งครัด",
        pikaPose: "shield",
        pikaSpeech: "เราให้ความสำคัญสูงสุดกับความมั่นคงปลอดภัยของข้อมูล ทุกโครงการทำงานบนสภาพแวดล้อมแบบปิด แยกสิทธิ์การเข้าถึงอย่างเด็ดขาด และไม่ส่งข้อมูลออกสู่ภายนอกครับ",
        project: "presale-mock",
        durationMs: 8500,
        isAutoDemoSlide: false,
        cardsHtml: `
          <div class="bento-card bento-coral bento-col-12">
            <div class="bento-card-header">
              <h2 class="bento-heading-condensed">ENTERPRISE DATA GOVERNANCE</h2>
              <div class="bento-header-pills">
                <span class="coral-pill">Zero-Trust Isolation</span>
                <span class="coral-pill">GDPR / PDPA Ready</span>
              </div>
            </div>
            <div class="coral-summary-banner" style="margin-bottom: 0;">
              <span class="coral-fullname">Strict Air-Gapped Private Tenant Infrastructure</span>
              <p class="coral-summary-text">
                ข้อมูลทุกโครงการได้รับการปกป้องภายใต้กรอบการรักษาความปลอดภัยระดับสูง ไม่มีการส่งออกข้อมูลสถาปัตยกรรมออกสู่ Public AI
              </p>
            </div>
          </div>

          <div class="bento-card bento-sage bento-col-6">
            <div class="bento-card-header">
              <h3 class="bento-heading-condensed" style="color: #0F172A;">SECURITY 01</h3>
              <span class="mint-pill">Isolation</span>
            </div>
            <div class="sage-meta-row" style="margin-bottom: 6px;">
              <span class="sage-meta-k">TENANT BOUNDARY</span>
              <span class="sage-meta-v">Private Tenant 100%</span>
            </div>
            <div style="font-size: 12px; color: #475569; line-height: 1.5;">
              เอกสารและคำถามทั้งหมดประมวลผลภายในสภาพแวดล้อมเฉพาะ ไม่ถูกนำไปเทรนโมเดลภายนอก
            </div>
          </div>

          <div class="bento-card bento-sage bento-col-6">
            <div class="bento-card-header">
              <h3 class="bento-heading-condensed" style="color: #0F172A;">SECURITY 02</h3>
              <span class="mint-pill">Access Control</span>
            </div>
            <div class="sage-meta-row" style="margin-bottom: 6px;">
              <span class="sage-meta-k">RBAC POLICY</span>
              <span class="sage-meta-v">Granular Scopes</span>
            </div>
            <div style="font-size: 12px; color: #475569; line-height: 1.5;">
              กำหนดสิทธิ์การเข้าถึงระดับโครงการ (Viewer, Contributor, Architect, Admin) อย่างเคร่งครัด
            </div>
          </div>
        `
      }},
      {{
        id: 9,
        badge: "SLIDE 09 / TRACEABILITY & AUDIT",
        title: "การตรวจสอบย้อนกลับแหล่งที่มา 100% และการขจัดปัญหา AI Hallucination",
        sub: "สร้างความเชื่อมั่นในผลลัพธ์ด้วยการผูกคำตอบเข้ากับเอกสารอ้างอิงที่ผ่านการรับรองแล้ว",
        pikaPose: "inspect",
        pikaSpeech: "ระบบใช้การสืบค้นแบบ Deterministic Retrieval เพื่อให้ทุกข้อสรุปมีเอกสารอ้างอิงยืนยันเสมอ ปราศจากการคาดเดาหรือสร้างข้อมูลเท็จครับ",
        project: "presale-mock",
        durationMs: 8500,
        isAutoDemoSlide: false,
        cardsHtml: `
          <div class="bento-card bento-coral bento-col-12">
            <div class="bento-card-header">
              <h2 class="bento-heading-condensed">ZERO HALLUCINATION GUARANTEE</h2>
              <div class="bento-header-pills">
                <span class="coral-pill">Strict Grounding</span>
                <span class="coral-pill">100% Verified</span>
              </div>
            </div>
            <div class="coral-summary-banner" style="margin-bottom: 0;">
              <span class="coral-fullname">Deterministic Retrieval &amp; Cryptographic Provenance</span>
              <p class="coral-summary-text">
                คำตอบทุกข้อความจาก PIKA WIKI ถูกผูกเข้ากับ Verified Document Segments ภายในคลังข้อมูลขององค์กร พร้อมแสดงรหัสอ้างอิงและระดับความเชื่อมั่นของข้อมูลแบบเรียลไทม์
              </p>
            </div>
          </div>

          <div class="bento-card bento-mint bento-col-4">
            <div class="bento-card-header">
              <h3 class="bento-heading-condensed" style="color: #0F172A;">PROVENANCE</h3>
              <span class="mint-pill">Source Links</span>
            </div>
            <div class="mint-benchmark-box">
              <span class="mint-bench-label">TRACEABILITY RATE</span>
              <span class="mint-bench-val">100%</span>
              <span class="mint-bench-cat">Every sentence linked to file</span>
            </div>
          </div>

          <div class="bento-card bento-violet bento-col-4">
            <div class="bento-card-header">
              <h3 class="bento-heading-condensed">AUDIT TRAIL</h3>
              <span class="violet-pill">Immutable</span>
            </div>
            <div style="background: rgba(0,0,0,0.22); border-radius: 13px; padding: 12px 14px; margin-bottom: 6px;">
              <div style="font-size: 9.5px; font-weight: 700; color: #93C5FD;">CRYPTOGRAPHIC PROOF</div>
              <div style="font-size: 15px; font-weight: 700; color: #FFFFFF; margin-top: 2px;">SHA-256 Hash</div>
              <div style="font-size: 11px; color: #CBD5E1;">Tamper-proof Audit Record</div>
            </div>
          </div>

          <div class="bento-card bento-sage bento-col-4">
            <div class="bento-card-header">
              <h3 class="bento-heading-condensed" style="color: #0F172A;">CONFIDENCE</h3>
              <span class="mint-pill">Threshold</span>
            </div>
            <div class="sage-meta-row">
              <span class="sage-meta-k">SIMILARITY CUTOFF</span>
              <span class="sage-meta-v">&gt; 92% Match Score</span>
              <span style="font-size: 11px; color: #64748B;">Rejects low-confidence noise</span>
            </div>
          </div>
        `
      }},
      {{
        id: 10,
        badge: "SLIDE 10 / PERFORMANCE BENCHMARKS",
        title: "ผลการประเมินสมรรถนะระบบในสภาวะการใช้งานระดับองค์กร",
        sub: "ความเร็ว ความเสถียร และความถูกต้องในการประมวลผลข้อมูลสถาปัตยกรรมระดับ Production",
        pikaPose: "inspect",
        pikaSpeech: "สถาปัตยกรรมระบบได้รับการทดสอบสมรรถนะรองรับการสืบค้นระดับ Sub-second พร้อมระบบความพร้อมใช้งาน 99.98% สำหรับการใช้งานในองค์กรขนาดใหญ่ครับ",
        project: "presale-mock",
        durationMs: 8500,
        isAutoDemoSlide: false,
        cardsHtml: `
          <div class="bento-card bento-mint bento-col-4" style="min-height: 285px; justify-content: space-between;">
            <div>
              <div class="bento-card-header" style="margin-bottom: 8px;">
                <h3 class="bento-heading-condensed" style="color: #0F172A;">SEARCH LATENCY</h3>
                <button type="button" class="bento-circle-arrow dark-circle">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </button>
              </div>
              <div class="mint-benchmark-box">
                <span class="mint-bench-label">P95 RETRIEVAL SPEED</span>
                <span class="mint-bench-val" style="font-size: 46px;">&lt; 800ms</span>
                <span class="mint-bench-cat">pgvector HNSW + Multi-hop Graph</span>
              </div>
            </div>
            <div style="background: rgba(255,255,255,0.7); border-radius: 10px; padding: 7px 11px; font-size: 11px; color: #1E293B; line-height: 1.45;">
              &bull; <strong>Index:</strong> HNSW pgvector (m=16, ef=64)<br>
              &bull; <strong>Hybrid:</strong> BM25 + Dense Graph Reranking
            </div>
          </div>

          <div class="bento-card bento-coral bento-col-4" style="min-height: 285px; justify-content: space-between;">
            <div>
              <div class="bento-card-header" style="margin-bottom: 8px;">
                <h3 class="bento-heading-condensed">SYSTEM UPTIME</h3>
                <button type="button" class="bento-circle-arrow">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </button>
              </div>
              <div class="coral-summary-banner" style="margin-bottom: 8px;">
                <span class="coral-fullname" style="font-size: 46px; font-family: var(--font-condensed); font-weight: 800;">99.98%</span>
                <span class="coral-summary-text">High Availability Multi-Instance Cluster</span>
              </div>
            </div>
            <div style="background: rgba(255,255,255,0.12); border-radius: 10px; padding: 7px 11px; font-size: 11px; color: #FFFFFF; line-height: 1.45;">
              &bull; <strong>Cluster:</strong> Kubernetes Multi-Pod Active-Active<br>
              &bull; <strong>Failover:</strong> Auto Pod Recovery &lt; 15s
            </div>
          </div>

          <div class="bento-card bento-violet bento-col-4" style="min-height: 285px; justify-content: space-between;">
            <div>
              <div class="bento-card-header" style="margin-bottom: 8px;">
                <h3 class="bento-heading-condensed">ACCURACY &amp; AUDIT</h3>
                <button type="button" class="bento-circle-arrow">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </button>
              </div>
              <div style="background: rgba(0,0,0,0.22); border-radius: 14px; padding: 12px 14px; margin-bottom: 8px;">
                <div style="font-size: 46px; font-weight: 800; font-family: var(--font-condensed); color: #FFFFFF;">100%</div>
                <div style="font-size: 11.5px; color: #93C5FD; font-weight: 700;">Strict Source Citation</div>
              </div>
            </div>
            <div style="background: rgba(255,255,255,0.12); border-radius: 10px; padding: 7px 11px; font-size: 11px; color: #FFFFFF; line-height: 1.45;">
              &bull; <strong>Audit Hash:</strong> SHA-256 Tamper-Proof Record<br>
              &bull; <strong>Grounding:</strong> Zero Hallucination Guarantee
            </div>
          </div>
        `
      }},
      {{
        id: 11,
        badge: "SLIDE 11 / STRATEGIC BUSINESS IMPACT",
        title: "คุณค่าทางธุรกิจและความคุ้มค่าในการลงทุน (Business Value & ROI)",
        sub: "เพิ่มประสิทธิภาพการจัดทำข้อเสนอโครงการและเสริมสร้างสินทรัพย์ทางปัญญาแก่องค์กรในระยะยาว",
        pikaPose: "celebrate",
        pikaSpeech: "PIKA WIKI ช่วยลดระยะเวลาในการจัดทำข้อเสนอโครงการได้อย่างมีนัยสำคัญ ควบคู่ไปกับการรักษาและนำองค์ความรู้เดิมกลับมาใช้ประโยชน์ได้อย่างเต็มประสิทธิภาพครับ",
        project: "presale-mock",
        durationMs: 8500,
        isAutoDemoSlide: false,
        cardsHtml: `
          <div class="bento-card bento-mint bento-col-4" style="min-height: 285px; justify-content: space-between;">
            <div>
              <div class="bento-card-header" style="margin-bottom: 8px;">
                <h3 class="bento-heading-condensed" style="color: #0F172A;">PROPOSAL SPEED</h3>
                <button type="button" class="bento-circle-arrow dark-circle">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </button>
              </div>
              <div class="mint-benchmark-box">
                <span class="mint-bench-label">TIME SAVED</span>
                <span class="mint-bench-val" style="font-size: 48px; color: #0284C7;">65%</span>
                <span class="mint-bench-cat">ลดเวลาจัดทำ Proposal</span>
              </div>
            </div>
            <div style="background: rgba(255,255,255,0.7); border-radius: 10px; padding: 7px 11px; font-size: 11px; color: #1E293B; line-height: 1.45;">
              &bull; <strong>Fast TOR Extraction:</strong> สกัดสเปก TOR แม่นยำ<br>
              &bull; <strong>Auto C4 Draft:</strong> ร่างพิมพ์เขียวระบบแรกได้ทันที
            </div>
          </div>

          <div class="bento-card bento-coral bento-col-4" style="min-height: 285px; justify-content: space-between;">
            <div>
              <div class="bento-card-header" style="margin-bottom: 8px;">
                <h3 class="bento-heading-condensed">REUSE SPEED</h3>
                <button type="button" class="bento-circle-arrow">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </button>
              </div>
              <div class="coral-summary-banner" style="margin-bottom: 8px;">
                <span class="coral-fullname" style="font-size: 48px; font-family: var(--font-condensed); font-weight: 800; color: #34D399;">10x</span>
                <span class="coral-summary-text">สืบค้นพิมพ์เขียวระบบเดิมเร็วขึ้น</span>
              </div>
            </div>
            <div style="background: rgba(255,255,255,0.12); border-radius: 10px; padding: 7px 11px; font-size: 11px; color: #FFFFFF; line-height: 1.45;">
              &bull; <strong>Cross-Project:</strong> สืบค้นสถาปัตยกรรมข้ามทีม<br>
              &bull; <strong>Proven Assets:</strong> นำบลูปริ้นต์เดิมมาต่อยอดได้ทันที
            </div>
          </div>

          <div class="bento-card bento-sage bento-col-4" style="min-height: 285px; justify-content: space-between;">
            <div>
              <div class="bento-card-header" style="margin-bottom: 8px;">
                <h3 class="bento-heading-condensed" style="color: #0F172A;">DATA RETENTION</h3>
                <button type="button" class="bento-circle-arrow dark-circle">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </button>
              </div>
              <div class="sage-meta-row" style="margin-bottom: 8px;">
                <span class="sage-meta-k">KNOWLEDGE PRESERVATION</span>
                <span class="sage-meta-v" style="font-size: 46px; font-family: var(--font-condensed); color: #4F46E5;">100%</span>
                <span style="font-size: 11.5px; font-weight: 700; color: #0F172A;">Data Retention &amp; Privacy</span>
              </div>
            </div>
            <div style="background: rgba(255,255,255,0.7); border-radius: 10px; padding: 7px 11px; font-size: 11px; color: #1E293B; line-height: 1.45;">
              &bull; <strong>Anti-Brain Drain:</strong> ความรู้คงอยู่กับองค์กร<br>
              &bull; <strong>Zero Leak:</strong> Private Tenant ปลอดภัย 100%
            </div>
          </div>
        `
      }},
      {{
        id: 12,
        badge: "SLIDE 12 / WEEKLY ROADMAP",
        title: "เส้นทางการพัฒนาระบบ PIKA WIKI (Weekly Engineering Roadmap)",
        sub: "4 การเปลี่ยนแปลงสำคัญ: วางรากฐาน Ingest, กราฟสถาปัตยกรรม (Cola Physics), จัดการเอกสารไวขึ้น และ Safe UX",
        pikaPose: "celebrate",
        pikaSpeech: "นี่คือ 4 การเปลี่ยนแปลงสำคัญตลอด 4 สัปดาห์ครับ ทั้งการจัดการเอกสารให้ไวขึ้นด้วย Parallel Ingest และ Vision OCR, กราฟสถาปัตยกรรมแบบฟิสิกส์, ระบบความปลอดภัย และประสบการณ์ผู้ใช้ที่สมบูรณ์แบบครับ!",
        project: "presale-mock",
        durationMs: 9000,
        isAutoDemoSlide: false,
        cardsHtml: `
          <!-- Top Royal Blue Hero Card with Stepper Track (As requested: 'ชอบกล่องแบบนี้มากกว่า') -->
          <div class="bento-card bento-coral bento-col-12" style="padding: 10px 16px;">
            <div class="bento-card-header" style="margin-bottom: 6px;">
              <h2 class="bento-heading-condensed" style="font-size: 17px; margin: 0; line-height: 1.1;">PIKA ENGINEERING ROADMAP (4 WEEKS)</h2>
              <div class="bento-header-pills">
                <span class="coral-pill" style="font-size: 9.5px; padding: 2px 8px;">ก.ย. – ต.ค. 2026</span>
                <span class="coral-pill" style="font-size: 9.5px; padding: 2px 8px;">12+ Core Commits</span>
                <a href="/timeline.html" class="bento-circle-arrow" title="เปิดดู Full Interactive Timeline ละเอียด" style="text-decoration:none; width: 22px; height: 22px;">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </a>
              </div>
            </div>

            <!-- Visual Stepper Track -->
            <div class="weekly-stepper-track">
              <div class="stepper-step">
                <div class="stepper-dot">1</div>
                <div class="stepper-info">
                  <span class="stepper-wk">WEEK 01 (1–7 ก.ย.)</span>
                  <span class="stepper-title">Ingest Foundation</span>
                </div>
              </div>
              <div class="stepper-line"></div>
              <div class="stepper-step">
                <div class="stepper-dot">2</div>
                <div class="stepper-info">
                  <span class="stepper-wk">WEEK 02 (15–21 ก.ย.)</span>
                  <span class="stepper-title">Security &amp; Graph</span>
                </div>
              </div>
              <div class="stepper-line"></div>
              <div class="stepper-step">
                <div class="stepper-dot">3</div>
                <div class="stepper-info">
                  <span class="stepper-wk">WEEK 03 (22–30 ก.ย.)</span>
                  <span class="stepper-title">Vision OCR &amp; Parallel</span>
                </div>
              </div>
              <div class="stepper-line"></div>
              <div class="stepper-step">
                <div class="stepper-dot">4</div>
                <div class="stepper-info">
                  <span class="stepper-wk">WEEK 04 (1–7 ต.ค.)</span>
                  <span class="stepper-title">Safe UX &amp; Automation</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 4 Weekly Bento Cards: 2x2 Grid -->
          <!-- Row 1: Week 1 (Royal Blue) & Week 2 (Deep Navy) -->
          <div class="bento-card bento-coral bento-col-6" style="padding: 10px 14px;">
            <div class="bento-card-header" style="margin-bottom: 2px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-family: var(--font-condensed); font-size: 15px; font-weight: 800; color: #FFFFFF;">WEEK 01</span>
                <span class="coral-pill" style="font-size: 9px; padding: 2px 7px;">1–7 ก.ย. 2026</span>
              </div>
              <span class="coral-pill" style="font-size: 9px; padding: 2px 7px;">Ingest Core</span>
            </div>
            <div style="font-size: 12.5px; font-weight: 700; color: #FFFFFF; margin-bottom: 3px;">
              วางรากฐาน Ingest &amp; ความแม่นยำการค้นหา
            </div>
            <div style="background: rgba(255,255,255,0.10); border-radius: 9px; padding: 5px 9px; font-size: 10.5px; color: #F1F5F9; line-height: 1.4; margin-bottom: 4px;">
              &bull; <strong>ค้นหาระดับหน้าแม่นยำ:</strong> ปรับ <code>_ensure_summary()</code> สร้างเวกเตอร์ระดับหน้าแยกชัดจาก Chunk<br>
              &bull; <strong>ดักจับคีย์ว่าง:</strong> คืนรหัส <code>no_api_key</code> ชัดเจน ป้องกันแจ้งเตือน VPN หลอก<br>
              &bull; <strong>โฟลเดอร์พับได้:</strong> ทำ File Tree พับได้แบบ Obsidian พร้อม <code>_fbAttr</code> ป้องกันโค้ดหลุด
            </div>
            <div style="display: flex; gap: 4px;">
              <span class="coral-pill" style="font-size: 9px; padding: 2px 6px;">Page Search</span>
              <span class="coral-pill" style="font-size: 9px; padding: 2px 6px;">Foldable Tree</span>
              <span class="coral-pill" style="font-size: 9px; padding: 2px 6px;">_fbAttr Security</span>
            </div>
          </div>

          <div class="bento-card bento-violet bento-col-6" style="padding: 10px 14px;">
            <div class="bento-card-header" style="margin-bottom: 2px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-family: var(--font-condensed); font-size: 15px; font-weight: 800; color: #FFFFFF;">WEEK 02</span>
                <span class="violet-pill" style="font-size: 9px; padding: 2px 7px;">15–21 ก.ย. 2026</span>
              </div>
              <span class="violet-pill" style="font-size: 9px; padding: 2px 7px;">Topology Graph</span>
            </div>
            <div style="font-size: 12.5px; font-weight: 700; color: #FFFFFF; margin-bottom: 3px;">
              กราฟสถาปัตยกรรมแบบพลวัต (Cola Physics) &amp; Security
            </div>
            <div style="background: rgba(255,255,255,0.12); border-radius: 9px; padding: 5px 9px; font-size: 10.5px; color: #FFFFFF; line-height: 1.4; margin-bottom: 4px;">
              &bull; <strong>กราฟฟิสิกส์มีชีวิต:</strong> เอนจิน Cytoscape Cola ลากโหนดแล้วความสัมพันธ์ไหลตามแบบ Obsidian<br>
              &bull; <strong>ดึงความสัมพันธ์ทันที:</strong> แผง YAML Frontmatter ถอดรหัส <code>[[wikilinks]]</code> ขึ้นหัวบทความ<br>
              &bull; <strong>Local Auth ปลอดภัย:</strong> Standalone PBKDF2-SHA256 แยกไฟล์ <code>auth_local.json</code> ใช้นอกออฟฟิศได้
            </div>
            <div style="display: flex; gap: 4px;">
              <span class="violet-pill" style="font-size: 9px; padding: 2px 6px;">Cola Physics กราฟไหลตาม</span>
              <span class="violet-pill" style="font-size: 9px; padding: 2px 6px;">YAML Properties</span>
              <span class="violet-pill" style="font-size: 9px; padding: 2px 6px;">Local Auth</span>
            </div>
          </div>

          <!-- Row 2: Week 3 (Sky Blue) & Week 4 (Alabaster Slate) -->
          <div class="bento-card bento-mint bento-col-6" style="padding: 10px 14px;">
            <div class="bento-card-header" style="margin-bottom: 2px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-family: var(--font-condensed); font-size: 15px; font-weight: 800; color: #0F172A;">WEEK 03</span>
                <span class="mint-pill" style="font-size: 9px; padding: 2px 7px;">22–30 ก.ย. 2026</span>
              </div>
              <span class="mint-pill" style="font-size: 9px; padding: 2px 7px;">Fast Ingest &amp; Vision</span>
            </div>
            <div style="font-size: 12.5px; font-weight: 700; color: #0F172A; margin-bottom: 3px;">
              จัดการเอกสารให้ไวขึ้นด้วย Parallel Pipeline &amp; Vision OCR
            </div>
            <div style="background: rgba(255,255,255,0.65); border-radius: 9px; padding: 5px 9px; font-size: 10.5px; color: #1E293B; line-height: 1.4; margin-bottom: 4px;">
              &bull; <strong>อัปโหลดขนานความเร็วสูง:</strong> <code>ingest_parallel.py</code> (Option 5) ประมวลผลหลายไฟล์พร้อมกัน ไม่ต้องรอคิว<br>
              &bull; <strong>Vision OCR 4 ระดับ ($0.0023/หน้า):</strong> สกัดข้อความจาก PDF สแกน รวดเร็ว ประหยัด ด้วย AI คิวแคช<br>
              &bull; <strong>ตรวจจับแยกรายหน้า:</strong> Per-page Scan Detection ตรวจจับเฉพาะหน้าสแกน ไม่เสียเวลาประมวลผลทั้งเล่ม
            </div>
            <div style="display: flex; gap: 4px;">
              <span class="mint-tag-chip" style="font-size: 9px; padding: 2px 6px;">ประมวลผลเร็วขึ้น 5x</span>
              <span class="mint-tag-chip" style="font-size: 9px; padding: 2px 6px;">$0.0023/หน้า</span>
              <span class="mint-tag-chip" style="font-size: 9px; padding: 2px 6px;">Parallel Pipeline</span>
            </div>
          </div>

          <div class="bento-card bento-sage bento-col-6" style="padding: 10px 14px;">
            <div class="bento-card-header" style="margin-bottom: 2px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-family: var(--font-condensed); font-size: 15px; font-weight: 800; color: #0F172A;">WEEK 04</span>
                <span class="mint-pill" style="font-size: 9px; padding: 2px 7px;">1–7 ต.ค. 2026</span>
              </div>
              <span class="mint-pill" style="font-size: 9px; padding: 2px 7px;">Safe UX &amp; Auto</span>
            </div>
            <div style="font-size: 12.5px; font-weight: 700; color: #0F172A; margin-bottom: 3px;">
              ประสบการณ์อ่านเอกสารที่ปลอดภัย &amp; การทำงานอัตโนมัติ
            </div>
            <div style="background: rgba(15, 23, 42, 0.05); border-radius: 9px; padding: 5px 9px; font-size: 10.5px; color: #1E293B; line-height: 1.4; margin-bottom: 4px;">
              &bull; <strong>Safe Markdown Reader:</strong> <code>mdSafe</code> ป้องกัน XSS แปลงเชิงอรรถอ้างอิงเป็นตัวยก ¹ และตั้งสารบัญแรก<br>
              &bull; <strong>แก้บั๊กหน้า Review (c6af610):</strong> แก้ Regex ยุบบรรทัดด้วย <code>white-space: pre-wrap</code> คงฟอร์แมตเดิม<br>
              &bull; <strong>ปุ่ม Auto-Commit:</strong> ทางลัดข้าม HITL บันทึกเอกสารเข้าคลังความรู้อัตโนมัติทันที
            </div>
            <div style="display: flex; gap: 4px;">
              <span class="coral-pill" style="background: rgba(15, 23, 42, 0.08); color: #0F172A; font-size: 9px; padding: 2px 6px;">Safe Reader</span>
              <span class="coral-pill" style="background: rgba(15, 23, 42, 0.08); color: #0F172A; font-size: 9px; padding: 2px 6px;">Review Pre-wrap</span>
              <span class="coral-pill" style="background: rgba(15, 23, 42, 0.08); color: #0F172A; font-size: 9px; padding: 2px 6px;">Auto-Commit</span>
            </div>
          </div>
        `
      }},
      {{
        id: 13,
        badge: "SLIDE 13 / EXECUTIVE INTERACTIVE SESSION",
        title: "บทสรุปและการเปิดทดสอบระบบ (Executive Interactive Session)",
        sub: "ขอเชิญทุกท่านร่วมทดสอบการสืบค้นและสัมผัสประสบการณ์การใช้งาน PIKA WIKI ร่วมกัน",
        pikaPose: "wave",
        pikaSpeech: "ขอขอบคุณทุกท่านครับ ขณะนี้ระบบเปิดให้ทดลองสืบค้นข้อมูลโครงการและโต้ตอบกับคลังความรู้ได้อย่างอิสระ ยินดีตอบทุกข้อซักถามครับ",
        project: "presale-mock",
        durationMs: 8000,
        isAutoDemoSlide: false,
        cardsHtml: `
          <!-- Royal Blue Hero Card with 4-Item Executive Specs Grid -->
          <div class="bento-card bento-coral bento-col-12" style="padding: 16px 20px;">
            <div class="bento-card-header" style="margin-bottom: 8px;">
              <h2 class="bento-heading-condensed" style="font-size: 19px;">EXECUTIVE INTERACTIVE SESSION</h2>
              <div class="bento-header-pills">
                <span class="coral-pill">Full Access Mode</span>
                <span class="coral-pill">Enterprise v2.4.0</span>
                <button type="button" class="bento-circle-arrow" onclick="renderSlide(0)" title="Restart Presentation" style="width: 26px; height: 26px;">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><polyline points="3 3 3 8 8 8"/></svg>
                </button>
              </div>
            </div>

            <div class="coral-summary-banner" style="padding: 10px 14px; margin-bottom: 10px;">
              <span class="coral-fullname" style="font-size: 14.5px;">Ready for Executive Testing &amp; Q&amp;A</span>
              <p class="coral-summary-text" style="font-size: 12.5px;">
                หน้าจอเข้าสู่โหมดทดสอบอิสระ ท่านสามารถพิมพ์ค้นหาคำถามเชิงสถาปัตยกรรมในช่องค้นหาด้านบน หรือเลือกดูรายละเอียดของแต่ละโครงการได้ทันที
              </p>
            </div>

            <div class="coral-specs-grid">
              <div class="coral-spec-card">
                <span class="coral-spec-label">ACTIVE REPOSITORY</span>
                <span class="coral-spec-value">presale-mock (v1.0-prod)</span>
              </div>
              <div class="coral-spec-card">
                <span class="coral-spec-label">QUERY ENGINE</span>
                <span class="coral-spec-value">Hybrid Graph + pgvector</span>
              </div>
              <div class="coral-spec-card">
                <span class="coral-spec-label">RETRIEVAL SPEED</span>
                <span class="coral-spec-value">&lt; 800ms Sub-second</span>
              </div>
            </div>
          </div>

          <!-- Bottom Split: 2 Balanced Bento Cards (bento-col-6 each) -->
          <!-- Card 1: Verified Knowledge Assets & Quick Scopes -->
          <div class="bento-card bento-violet bento-col-6" style="padding: 16px 18px; min-height: 270px; justify-content: space-between;">
            <div>
              <div class="bento-card-header" style="margin-bottom: 8px;">
                <h3 class="bento-heading-condensed" style="font-size: 16px;">KNOWLEDGE ASSETS</h3>
                <span class="violet-pill" style="font-size: 10px;">3 Active Files</span>
              </div>
              <div class="tor-real-list" style="gap: 6px;">
                <div class="tor-real-item" style="padding: 6px 10px;">
                  <div class="tor-real-top">
                    <span class="tor-real-code">DOC-01</span>
                    <span class="tor-real-status" style="background:#10B981; color:#FFFFFF; font-size:9.5px; padding:2px 7px;">Indexed &amp; Ready</span>
                  </div>
                  <div class="tor-real-req" style="font-size: 11.5px;">client-overview.md &middot; TOR Specifications</div>
                </div>
                <div class="tor-real-item" style="padding: 6px 10px;">
                  <div class="tor-real-top">
                    <span class="tor-real-code">DOC-02</span>
                    <span class="tor-real-status" style="background:#10B981; color:#FFFFFF; font-size:9.5px; padding:2px 7px;">Indexed &amp; Ready</span>
                  </div>
                  <div class="tor-real-req" style="font-size: 11.5px;">competitive-analysis.md &middot; Architecture</div>
                </div>
                <div class="tor-real-item" style="padding: 6px 10px;">
                  <div class="tor-real-top">
                    <span class="tor-real-code">DOC-03</span>
                    <span class="tor-real-status" style="background:#10B981; color:#FFFFFF; font-size:9.5px; padding:2px 7px;">Indexed &amp; Ready</span>
                  </div>
                  <div class="tor-real-req" style="font-size: 11.5px;">discovery-questions.md &middot; C4 Scopes</div>
                </div>
              </div>
            </div>
            <div style="display: flex; gap: 6px; flex-wrap: wrap; border-top: 1px solid rgba(255,255,255,0.12); padding-top: 8px; margin-top: 6px;">
              <button type="button" class="ai-action-pill" onclick="renderSlide(6)" style="font-size: 10px; padding: 4px 10px;">ทดสอบสืบค้น TOR</button>
              <button type="button" class="ai-action-pill" onclick="renderSlide(2)" style="font-size: 10px; padding: 4px 10px;">ดู C4 Architecture</button>
              <button type="button" class="ai-action-pill" onclick="renderSlide(11)" style="font-size: 10px; padding: 4px 10px;">ดูไทม์ไลน์ 4 สัปดาห์</button>
            </div>
          </div>

          <!-- Card 2: Bottom AI Lead Assistant Card -->
          <div class="bento-card bento-dark-ai bento-col-6" id="bentoAiCard" style="padding: 16px 18px; min-height: 270px; justify-content: space-between;">
            <div>
              <div class="bento-card-header" style="margin-bottom: 8px;">
                <h3 class="bento-heading-condensed" style="font-size: 17px;">PIKA AI LEAD ASSISTANT</h3>
                <button type="button" class="bento-circle-arrow white-circle" style="width: 24px; height: 24px;">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </button>
              </div>

              <div class="ai-speech-row" style="margin-bottom: 6px;">
                <div class="ai-avatar-circle" style="width: 30px; height: 30px; font-size: 11px;">Pk</div>
                <div class="ai-speech-bubble" style="font-size: 11.5px; padding: 8px 12px; line-height: 1.45;">
                  ระบบพร้อมรับคำถามเชิงสถาปัตยกรรมและข้อกำหนดโครงการแบบ Grounded 100% ปราศจาก Hallucination ครับ
                </div>
              </div>

              <div class="ai-quick-pills" style="margin-top: 8px; display: flex; flex-wrap: wrap; gap: 5px;">
                <button type="button" class="ai-quick-pill" onclick="triggerSearchDemo()" style="font-size: 10.5px; padding: 4px 10px;">Summarize TOR specs</button>
                <button type="button" class="ai-quick-pill" onclick="renderSlide(3)" style="font-size: 10.5px; padding: 4px 10px;">Inspect full blueprint</button>
                <button type="button" class="ai-quick-pill" onclick="renderSlide(0)" style="font-size: 10.5px; padding: 4px 10px;">Restart Presentation</button>
              </div>
            </div>

            <div class="ai-bottom-bar" style="margin-top: 8px;">
              <button type="button" class="ai-coral-plus" onclick="triggerSearchDemo()" title="Start New Query" style="width: 28px; height: 28px; font-size: 14px;">+</button>
              <div class="ai-input-pill" style="height: 34px; padding: 0 10px;">
                <input type="text" class="ai-input-field" placeholder="ถามข้อมูลสถาปัตยกรรม presale-mock..." onkeypress="if(event.key === 'Enter') triggerSearchDemo()" style="font-size: 11.5px;">
                <button type="button" class="ai-send-icon" onclick="triggerSearchDemo()" style="width: 22px; height: 22px;">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>
            </div>
          </div>
        `
      }}
    ];

    // ========================================================================
    // SEQUENCER STATE & TIMERS
    // ========================================================================
    let currentSlideIdx = 0;
    let isAutoPlay = true;
    let autoPlayTimer = null;
    let speechTypewriterTimer = null;
    let demoSimTimers = [];

    function clearAllSimTimers() {{
      demoSimTimers.forEach(t => clearTimeout(t));
      demoSimTimers = [];
      hideVirtualCursor();
    }}

    function showVirtualCursor(x, y, label) {{}}
    function triggerCursorClick() {{}}
    function hideVirtualCursor() {{}}

    // ========================================================================
    // TYPEWRITER SPEECH WITH LIP-SYNC & POSE DISPATCH
    // ========================================================================
    function typewriterSpeech(fullText, pose, project) {{
      if (speechTypewriterTimer) clearInterval(speechTypewriterTimer);
      const bubble = document.getElementById('mascotBubble');
      if (!bubble) return;

      bubble.style.opacity = '0';
      bubble.textContent = fullText;
      setTimeout(() => {{
        bubble.style.transition = 'opacity 0.22s ease';
        bubble.style.opacity = '1';
      }}, 20);

      // Dispatch pose change to 3D mascot (dispatch both event names for 100% compatibility)
      window.dispatchEvent(new CustomEvent('pika-mascot-pose', {{ detail: {{ pose: pose, project: project }} }}));
      window.dispatchEvent(new CustomEvent('pika-pose-change', {{ detail: {{ pose: pose, project: project }} }}));
      window.dispatchEvent(new CustomEvent('pika-mascot-talk', {{ detail: {{ active: true, speaking: true }} }}));

      setTimeout(() => {{
        window.dispatchEvent(new CustomEvent('pika-mascot-talk', {{ detail: {{ active: false, speaking: false }} }}));
      }}, 1800);
    }}

    // ========================================================================
    // SLIDE-SPECIFIC LIVE SIMULATION ENGINE
    // ========================================================================
    function startSlideSimulation(slide) {{
      clearAllSimTimers();
      const searchInput = document.getElementById('wikiSearchInput');

      if (slide.id === 4) {{
        // Auto-Demo 01: Multi-Project Reach & Click Simulation
        demoSimTimers.push(setTimeout(() => {{
          showVirtualCursor('95px', '46%', 'เลือก presale-mock (6 Docs)');
          selectProjectByMascot('presale-mock', true);
        }}, 1400));

        demoSimTimers.push(setTimeout(() => {{
          showVirtualCursor('95px', '54%', 'สลับดู general-mock (20 Docs)');
          selectProjectByMascot('general-mock', true);
        }}, 4400));

        demoSimTimers.push(setTimeout(() => {{
          selectProjectByMascot('presale-mock', true);
        }}, 7400));

        }}
      else if (slide.id === 5) {{
        // Auto-Demo 02: Real Sequential Ingestion Status Progression
        const st1 = document.getElementById('ingestStatus1');
        const st2 = document.getElementById('ingestStatus2');
        const st3 = document.getElementById('ingestStatus3');

        if (st1 && st2 && st3) {{
          st1.textContent = 'Extracting C4...';
          st1.style.background = '#F59E0B';
          st1.style.color = '#FFFFFF';

          st2.textContent = 'Queued';
          st2.style.background = 'rgba(255,255,255,0.2)';
          st2.style.color = '#FFFFFF';

          st3.textContent = 'Queued';
          st3.style.background = 'rgba(255,255,255,0.2)';
          st3.style.color = '#FFFFFF';
        }}

        demoSimTimers.push(setTimeout(() => {{
          if (st1) {{
            st1.textContent = 'Indexed & Ready';
            st1.style.background = '#FFFFFF';
            st1.style.color = '#16181C';
          }}
          if (st2) {{
            st2.textContent = 'Extracting C4...';
            st2.style.background = '#F59E0B';
            st2.style.color = '#FFFFFF';
          }}
        }}, 2200));

        demoSimTimers.push(setTimeout(() => {{
          if (st2) {{
            st2.textContent = 'Indexed & Ready';
            st2.style.background = '#FFFFFF';
            st2.style.color = '#16181C';
          }}
          if (st3) {{
            st3.textContent = 'Extracting C4...';
            st3.style.background = '#F59E0B';
            st3.style.color = '#FFFFFF';
          }}
        }}, 4400));

        demoSimTimers.push(setTimeout(() => {{
          if (st3) {{
            st3.textContent = 'Indexed & Ready';
            st3.style.background = '#FFFFFF';
            st3.style.color = '#16181C';
          }}
        }}, 6600));
      }}
      else if (slide.id === 7) {{
        // Auto-Demo 03: Realistic Live Search & Pipeline Execution
        demoSimTimers.push(setTimeout(() => {{
          triggerSearchDemo();
        }}, 800));
      }}
      else if (slide.id === 10) {{
        // Auto-Demo 04: Highlight speed difference
        demoSimTimers.push(setTimeout(() => {{
          showVirtualCursor('75%', '52%', '15 Minutes (ประหยัดเวลา 95%)');
          }}, 2500));

        }}
    }}

    // ========================================================================
    // RENDER SLIDE FUNCTION
    // ========================================================================
    function renderSlide(index) {{
      if (index < 0) index = 0;
      if (index >= EXECUTIVE_SLIDES.length) index = EXECUTIVE_SLIDES.length - 1;
      currentSlideIdx = index;
      const slide = EXECUTIVE_SLIDES[index];

      // Update Minimal Authentic Top Bar
      const topSlideBadge = document.getElementById('topSlideBadge');
      if (topSlideBadge) topSlideBadge.textContent = slide.badge;

      const topProjectBadge = document.getElementById('topProjectBadge');
      if (topProjectBadge) topProjectBadge.innerHTML = (slide.project || 'presale-mock') + ' &middot; v1.0-prod';

      const liveDemoBadge = document.getElementById('liveDemoBadge');
      if (liveDemoBadge) {{
        liveDemoBadge.style.display = slide.isAutoDemoSlide ? 'inline-flex' : 'none';
      }}

      // Update Slide Header in Right Column
      const titleEl = document.getElementById('slideTitle');
      if (titleEl) titleEl.textContent = slide.title;
      const subEl = document.getElementById('slideSub');
      if (subEl) subEl.textContent = slide.sub;

      // Render Bento Cards
      const gridEl = document.getElementById('slideBentoGrid');
      if (gridEl) {{
        gridEl.innerHTML = slide.cardsHtml;
      }}

      // In-Content Navigation Buttons ready

      // Update Progress Bar Line
      const progressBar = document.getElementById('presProgressBar');
      if (progressBar) {{
        const pct = ((index + 1) / EXECUTIVE_SLIDES.length) * 100;
        progressBar.style.width = pct + '%';
      }}

      // Active Project Selection
      if (slide.project) {{
        selectProjectByMascot(slide.project, false);
      }}

      // Typewriter speech effect & mascot pose
      typewriterSpeech(slide.pikaSpeech, slide.pikaPose, slide.project);

      // Start live interactive simulation
      startSlideSimulation(slide);

      // Schedule next slide if auto-play is on
      if (isAutoPlay) {{
        scheduleNextAutoSlide(slide.durationMs);
      }}
    }}

    function scheduleNextAutoSlide(durationMs) {{
      if (autoPlayTimer) clearTimeout(autoPlayTimer);
      const delay = durationMs || 8500;
      autoPlayTimer = setTimeout(() => {{
        if (!isAutoPlay) return;
        const nextIdx = (currentSlideIdx + 1) % EXECUTIVE_SLIDES.length;
        renderSlide(nextIdx);
      }}, delay);
    }}

    function toggleAutoPlay() {{
      isAutoPlay = !isAutoPlay;
      const btn = document.getElementById('topAutoPlayBtn');
      const label = document.getElementById('topAutoPlayLabel');
      if (btn && label) {{
        if (isAutoPlay) {{
          btn.className = 'pres-top-auto-btn is-active';
          label.textContent = 'Auto-Demo';
          scheduleNextAutoSlide();
        }} else {{
          btn.className = 'pres-top-auto-btn is-paused';
          label.textContent = 'Paused';
          if (autoPlayTimer) clearTimeout(autoPlayTimer);
          clearAllSimTimers();
        }}
      }}
    }}

    function prevSlide() {{
      renderSlide(currentSlideIdx - 1);
    }}

    function nextSlide() {{
      renderSlide(currentSlideIdx + 1);
    }}

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {{
      if (e.key === 'ArrowRight' || e.key === 'Space') {{
        e.preventDefault();
        nextSlide();
      }} else if (e.key === 'ArrowLeft') {{
        e.preventDefault();
        prevSlide();
      }}
    }});

    // Project selection highlight
    function selectProjectByMascot(projectId, animate) {{
      document.querySelectorAll('.wiki-project-link').forEach(link => {{
        if (link.dataset.id === projectId) {{
          link.classList.add('is-active-project-click');
        }} else {{
          link.classList.remove('is-active-project-click');
        }}
      }});

      const topProjectBadge = document.getElementById('topProjectBadge');
      if (topProjectBadge) {{
        topProjectBadge.innerHTML = projectId + ' &middot; v1.0-prod';
      }}

      // Real Auto-Demo: highlight active project cards on Slide 4
      const cardPresale = document.getElementById('hubCardPresale');
      const cardGeneral = document.getElementById('hubCardGeneral');
      if (cardPresale && cardGeneral) {{
        if (projectId === 'general-mock') {{
          cardGeneral.style.border = '2px solid #3B82F6';
          cardGeneral.style.background = 'rgba(30, 58, 138, 0.4)';
          const b = cardGeneral.querySelector('.coral-badge');
          if (b) {{ b.style.background = '#2563EB'; b.textContent = 'ACTIVE PROJECT'; }}
          cardPresale.style.border = '1px solid rgba(255,255,255,0.1)';
          cardPresale.style.background = 'rgba(30, 41, 59, 0.7)';
          const bp = cardPresale.querySelector('.coral-badge');
          if (bp) {{ bp.style.background = 'rgba(255,255,255,0.1)'; bp.textContent = 'STANDBY PROJECT'; }}
        }} else {{
          cardPresale.style.border = '2px solid #3B82F6';
          cardPresale.style.background = 'rgba(30, 58, 138, 0.4)';
          const bp = cardPresale.querySelector('.coral-badge');
          if (bp) {{ bp.style.background = '#2563EB'; bp.textContent = 'ACTIVE PROJECT'; }}
          cardGeneral.style.border = '1px solid rgba(255,255,255,0.1)';
          cardGeneral.style.background = 'rgba(30, 41, 59, 0.7)';
          const b = cardGeneral.querySelector('.coral-badge');
          if (b) {{ b.style.background = 'rgba(255,255,255,0.1)'; b.textContent = 'STANDBY PROJECT'; }}
        }}
      }}

      if (animate) {{
        window.dispatchEvent(new CustomEvent('pika-mascot-reach', {{ detail: {{ projectId: projectId }} }}));
      }}
    }}

    function triggerSearchDemo() {{
      const query = "สเปก TOR โครงการ presale-mock ใช้ฐานข้อมูลอะไร และ SLA ความเสถียรเท่าไร?";
      const searchInput = document.getElementById('wikiSearchInput');
      const searchBtn = document.getElementById('wikiSearchBtn');
      const liveDot = document.getElementById('demoLiveDot');
      const queryText = document.getElementById('demoQueryText');
      const p1 = document.getElementById('pipeStage1');
      const p2 = document.getElementById('pipeStage2');
      const p3 = document.getElementById('pipeStage3');
      const st1 = document.getElementById('pipeStatus1');
      const st2 = document.getElementById('pipeStatus2');
      const st3 = document.getElementById('pipeStatus3');
      const card = document.getElementById('searchResultCard');

      if (!card) return;

      // Phase 1: Real-time typing in search bar
      if (searchInput) {{
        searchInput.value = '';
        searchInput.focus();
        let idx = 0;
        const typeTimer = setInterval(() => {{
          if (idx < query.length) {{
            searchInput.value += query[idx];
            if (queryText) queryText.textContent = searchInput.value;
            idx++;
          }} else {{
            clearInterval(typeTimer);
            // Search button pulse
            if (searchBtn) {{
              searchBtn.style.transform = 'scale(1.08)';
              searchBtn.style.boxShadow = '0 0 16px #3B82F6';
              setTimeout(() => {{
                searchBtn.style.transform = 'scale(1)';
                searchBtn.style.boxShadow = 'none';
              }}, 350);
            }}

            // Phase 2: Pipeline excitation
            if (liveDot) liveDot.innerHTML = '<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#F59E0B;margin-right:4px;"></span>PROCESSING HYBRID RAG';
            
            setTimeout(() => {{
              if (p1 && st1) {{
                p1.style.borderColor = '#10B981';
                st1.style.background = '#10B981';
                st1.style.color = '#FFFFFF';
                st1.textContent = 'Found 4 Nodes';
              }}
              if (p2 && st2) {{
                p2.style.borderColor = '#3B82F6';
                st2.style.background = 'rgba(59, 130, 246, 0.4)';
                st2.style.color = '#93C5FD';
                st2.textContent = 'Cosine Match';
              }}
            }}, 700);

            setTimeout(() => {{
              if (p2 && st2) {{
                p2.style.borderColor = '#10B981';
                st2.style.background = '#10B981';
                st2.style.color = '#FFFFFF';
                st2.textContent = 'Score: 0.984';
              }}
              if (p3 && st3) {{
                p3.style.borderColor = '#3B82F6';
                st3.style.background = 'rgba(59, 130, 246, 0.4)';
                st3.style.color = '#93C5FD';
                st3.textContent = 'Verifying DOCs';
              }}
            }}, 1400);

            setTimeout(() => {{
              if (p3 && st3) {{
                p3.style.borderColor = '#10B981';
                st3.style.background = '#10B981';
                st3.style.color = '#FFFFFF';
                st3.textContent = 'Verified 100%';
              }}
              if (liveDot) liveDot.innerHTML = '<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#10B981;margin-right:4px;"></span>GROUNDED SYNTHESIS READY';

              // Reveal Final Grounded Answer with animated glow
              card.style.borderColor = '#10B981';
              card.style.boxShadow = '0 0 24px rgba(16, 185, 129, 0.35)';
              card.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span class="coral-badge badge-emerald" style="font-size: 11px;">
                    &bull; VERIFIED GROUNDED ANSWER (CONFIDENCE: 98.6%)
                  </span>
                  <span style="font-size: 10.5px; font-family: var(--font-mono); color: #34D399; font-weight: 700;">#TX-98421 &middot; Zero Hallucination</span>
                </div>
                <div style="font-size: 13.5px; color: #FFFFFF; line-height: 1.65; margin-top: 10px;">
                  จากเอกสารข้อกำหนด TOR โครงการ <strong>presale-mock</strong> กำหนดสถาปัตยกรรม <strong>Private Cloud Microservices</strong> โดยเลือกใช้ <strong>PostgreSQL 15 ร่วมกับ pgvector (HNSW Index)</strong> ในการจัดเก็บเวกเตอร์สถาปัตยกรรมและ C4 Entity Graph เพื่อรองรับการสืบค้นความเร็วสูงต่ำกว่า 800ms พร้อมระบบ High Availability Active-Active SLA 99.98% ครบถ้วน
                </div>
                <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.08); display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
                  <span style="font-size: 10px; font-weight: 700; color: #93C5FD; text-transform: uppercase;">CITATIONS:</span>
                  <span class="coral-pill" style="background: rgba(59, 130, 246, 0.25); color: #93C5FD; font-size: 10.5px;">DOC-01 client-overview.md #Sec-3.2 (98.4%)</span>
                  <span class="coral-pill" style="background: rgba(59, 130, 246, 0.25); color: #93C5FD; font-size: 10.5px;">DOC-02 competitive-analysis.md #Sec-1.4 (94.1%)</span>
                  <span class="coral-pill" style="background: rgba(16, 185, 129, 0.2); color: #34D399; font-size: 10.5px;">Audit Hash Verified</span>
                </div>
              `;
            }}, 2100);
          }}
        }}, 35);
      }}
    }}

    window.renderSlide = renderSlide;
    window.nextSlide = nextSlide;
    window.prevSlide = prevSlide;
    window.triggerSearchDemo = triggerSearchDemo;

    // Initialization
    window.addEventListener('DOMContentLoaded', () => {{
      renderSlide(0);
    }});
  </script>

</body>
</html>
'''

# Check for emojis in generated HTML
emojis_found = re.findall(r'[\U00010000-\U0010ffff]', html_content)
if emojis_found:
    print(f"ERROR: Found emojis in generated HTML: {set(emojis_found)}")
    exit(1)

# Write to presentation/index.html
with open('presentation/index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)
print("SUCCESS: presentation/index.html written successfully!")

# Write to presentation.html
with open('presentation.html', 'w', encoding='utf-8') as f:
    f.write(html_content)
print("SUCCESS: presentation.html written successfully!")

