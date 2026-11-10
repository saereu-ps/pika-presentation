/**
 * ============================================================================
 * PIKA WIKI // APPLE PRODUCT LAUNCH KEYNOTE & 1:1 LIVE DEMO DIRECTOR (keynote.js)
 * ----------------------------------------------------------------------------
 * - Choreographs the 100% original 3D Clay Boy mascot (static/pika_mascot.js)
 * - Powers 1:1 authentic Live Demos of Upload Note, Chat (Bento + Deep Search
 *   Trace), File Browser, Relationship Graph, Unlearn Provenance Map & Projects
 * - Supports full-screen Interactive Workbench Modal + Dark/Light Theme Toggle
 * - Strictly ZERO emojis anywhere
 * ============================================================================
 */
(function () {
  'use strict';

  var TOTAL_SCENES = 9;
  var currentScene = 1;
  var isTransitioning = false;
  var isAutoPlaying = false;
  var autoPlayTimer = null;
  var ingestDemoTimer = null;
  var unlearnDemoTimer = null;
  var bubbleHideTimer = null;
  var isMacroZoom = false;
  var isDeepSearchOn = true;

  // Dedicated Auto-Play Durations for Each Scene (allows full Live Demo simulation to complete)
  var SCENE_AUTOPLAY_DURATIONS = {
    1: 15000, // Scene 1: Hero Cover & Bento Capability Grid (Intro speech & sequential card focus)
    2: 14000, // Scene 2: Why Wiki & 4 Core Categories (Clients, Projects, Technologies, Syntheses)
    3: 17500, // Scene 3: 5x Ingestion Live Simulation (Type title -> drop 5 files -> 5-stage parallel progress 0-100% -> log finish)
    4: 17500, // Scene 4: Graph Explorer & Markdown Previews (Click node 1 -> node 2 -> switch FB -> open scb-enterprise -> open boq-pricing)
    5: 19500, // Scene 5: Deep Search Chat & Thinking Steps (Type question -> send -> 3-step deep thinking -> stream response -> click follow-up chip -> follow-up answer)
    6: 17000, // Scene 6: Unlearn & Failover Simulation (Type reason -> type DELETE -> run 6-step unlearn -> trigger failover banner)
    7: 17000, // Scene 7: MCP v2 Terminal Execution Steps (4 execution steps across projects with terminal logs)
    8: 18000, // Scene 8: Engineering Roadmap (8-Week Architecture Evolution)
    9: 16000  // Scene 9: Production Bento & Grand Finale celebration
  };

  function updateAutoPlayProgressBar(durationMs) {
    var bar = document.getElementById('autoPlayProgressBar');
    if (!bar) return;
    if (!isAutoPlaying) {
      bar.classList.remove('active');
      bar.style.transition = 'none';
      bar.style.width = '0%';
      return;
    }
    bar.classList.add('active');
    bar.style.transition = 'none';
    bar.style.width = '0%';
    void bar.offsetWidth; // Force CSS reflow
    bar.style.transition = 'width ' + durationMs + 'ms linear';
    bar.style.width = '100%';
  }

  function clearAutoPlayTimer() {
    if (autoPlayTimer) {
      clearTimeout(autoPlayTimer);
      autoPlayTimer = null;
    }
    var bar = document.getElementById('autoPlayProgressBar');
    if (bar && !isAutoPlaying) {
      bar.classList.remove('active');
      bar.style.transition = 'none';
      bar.style.width = '0%';
    }
  }

  function scheduleNextAutoPlaySlide() {
    clearAutoPlayTimer();
    if (!isAutoPlaying) return;

    var duration = SCENE_AUTOPLAY_DURATIONS[currentScene] || 16000;
    updateAutoPlayProgressBar(duration);
    autoPlayTimer = setTimeout(function () {
      if (!isAutoPlaying) return;
      nextScene();
    }, duration);
  }

  // --------------------------------------------------------------------------
  // 1. NATURAL THAI SCENE SCRIPT & MASCOT CHOREOGRAPHY
  // --------------------------------------------------------------------------
  var SCENE_SCRIPT = {
    1: {
      speech:
        'สวัสดีครับ ผม <strong>Pika</strong> ผู้ช่วยคลังความรู้ของทีม ลองคลิกที่หัวข้อบนหน้าจอ หรือกดปุ่ม <strong>ทดลอง Live Demo</strong> เพื่อลองเล่นหน้าเว็บจริงได้เลยครับ',
      expression: 'happy',
      gesture: 'wave',
      backlight:
        'radial-gradient(ellipse at center, rgba(41,151,255,0.28) 0%, rgba(100,210,255,0.10) 42%, rgba(0,0,0,0) 72%)'
    },
    2: {
      speech:
        'แทนที่จะตัดเอกสารเป็นท่อนสั้นๆ จนขาดความต่อเนื่อง ผมช่วยอ่านและเรียบเรียงข้อมูลใหม่ให้เป็นหน้าวิกิที่เชื่อมโยงกันอย่างเป็นระบบครับ',
      expression: 'think',
      gesture: 'think',
      backlight:
        'radial-gradient(ellipse at center, rgba(100,210,255,0.24) 0%, rgba(41,151,255,0.10) 42%, rgba(0,0,0,0) 72%)'
    },
    3: {
      speech:
        'นี่คือหน้า <strong>Upload Note</strong> ของจริงครับ ลองกดปุ่ม <strong>Upload and Process Note</strong> ดูสิครับ ผมจะสกัดข้อมูลและเขียนหน้าวิกิพร้อมกัน 5 ช่องทางให้ดูสดๆ เลยครับ',
      expression: 'surprised',
      gesture: 'point',
      pointSide: -1,
      backlight:
        'radial-gradient(ellipse at center, rgba(255,214,10,0.22) 0%, rgba(41,151,255,0.12) 45%, rgba(0,0,0,0) 72%)'
    },
    4: {
      speech:
        'นี่คือหน้า <strong>Relationship Graph</strong> และ <strong>File Browser</strong> จริงครับ ลองลากโหนดในกราฟ หรือสลับไปดูเนื้อหาหน้าวิกิได้เลยครับ',
      expression: 'look',
      gesture: 'point',
      pointSide: 1,
      backlight:
        'radial-gradient(ellipse at center, rgba(41,151,255,0.28) 0%, rgba(191,90,242,0.12) 45%, rgba(0,0,0,0) 72%)'
    },
    5: {
      speech:
        'นี่คือหน้า <strong>Chat</strong> จริงของผมครับ ลองคลิกที่การ์ดคำถาม หรือพิมพ์ข้อความถามผมได้เลย เดี๋ยวผมเปิดขั้นตอนการคิดวิเคราะห์ให้ดูทีละขั้นครับ',
      expression: 'happy',
      gesture: 'wave',
      backlight:
        'radial-gradient(ellipse at center, rgba(255,159,10,0.24) 0%, rgba(41,151,255,0.12) 45%, rgba(0,0,0,0) 72%)'
    },
    6: {
      speech:
        'และนี่คือหน้าต่าง <strong>Unlearn Provenance Map</strong> ของจริงครับ ก่อนลบไฟล์ ระบบจะแสดงให้เห็นชัดเจนว่าหน้าไหนจะถูกลบ และหน้าไหนที่ผมจะช่วยเขียนใหม่ให้ครับ',
      expression: 'think',
      gesture: 'point',
      pointSide: 1,
      backlight:
        'radial-gradient(ellipse at center, rgba(48,209,88,0.22) 0%, rgba(41,151,255,0.10) 45%, rgba(0,0,0,0) 72%)'
    },
    7: {
      speech:
        'ในหน้า <strong>Projects</strong> แต่ละทีมสามารถสร้างคลังความรู้ของตัวเอง กำหนดสิทธิ์สมาชิก และเชื่อมต่อกับเครื่องมือ AI ภายนอกได้อย่างอิสระครับ',
      expression: 'happy',
      gesture: 'point',
      pointSide: -1,
      backlight:
        'radial-gradient(ellipse at center, rgba(100,210,255,0.25) 0%, rgba(41,151,255,0.10) 45%, rgba(0,0,0,0) 72%)'
    },
    8: {
      speech:
        'นี่คือเส้นทางการพัฒนาระบบตลอด <strong>8 สัปดาห์</strong> ครับ ตั้งแต่วางรากฐานคลังความรู้ กราฟเชื่อมโยง การสืบค้นเชิงลึก จนถึงความพร้อมใช้งานระดับองค์กรครับ',
      expression: 'happy',
      gesture: 'point',
      pointSide: 1,
      backlight:
        'radial-gradient(ellipse at center, rgba(56,189,248,0.24) 0%, rgba(168,85,247,0.12) 45%, rgba(0,0,0,0) 72%)'
    },
    9: {
      speech:
        'พร้อมลุยงานไปกับทุกทีมในองค์กรแล้วครับ สามารถกด <strong>เปิดหน้าแอป Live Demo เต็มรูปแบบ</strong> เพื่อสำรวจทุกเมนูต่อได้เลยนะครับ',
      expression: 'happy',
      gesture: 'cheer',
      backlight:
        'radial-gradient(ellipse at center, rgba(255,214,10,0.26) 0%, rgba(41,151,255,0.18) 45%, rgba(0,0,0,0) 74%)'
    }
  };

  // --------------------------------------------------------------------------
  // 2. NATURAL THAI DIALOGUE FOR INTERACTIVE CARDS
  // --------------------------------------------------------------------------
  var CARD_SPEECH_MAP = {
    'timeline-w1': {
      expr: 'happy',
      text: 'สัปดาห์ที่ 1 วางรากฐานระบบยืนยันตัวตน Local Auth PBKDF2 และสร้างโครงข่ายกราฟความรู้ด้วย Cytoscape Cola ครับ'
    },
    'timeline-w2': {
      expr: 'surprised',
      text: 'สัปดาห์ที่ 2 เปิดตัวเอนจินประมวลผลคู่ขนาน 5 ช่องทาง และไปป์ไลน์ Vision LLM OCR สกัดเอกสารสแกน PDF ครับ'
    },
    'timeline-w3': {
      expr: 'look',
      text: 'สัปดาห์ที่ 3 ติดตั้งระบบ Safe Reader แสดงเชิงอรรถเจาะจงบรรทัด พร้อมเอนจินถอนความรู้แบบกลุ่ม Bulk Unlearn ครับ'
    },
    'timeline-w45': {
      expr: 'think',
      text: 'สัปดาห์ที่ 4 และ 5 ทดสอบความเสถียร เสริมระบบป้องกันข้อมูลสูญหาย และเตรียมกลไกสลับโมเดลสำรองอัตโนมัติครับ'
    },
    'timeline-w6': {
      expr: 'happy',
      text: 'สัปดาห์ที่ 6 พัฒนาระบบ Deep Search Engine แสดงกระบวนการคิดของ AI และระบบค้นหาแบบ 2 มิติ Hybrid Retrieval ครับ'
    },
    'timeline-w7': {
      expr: 'surprised',
      text: 'สัปดาห์ที่ 7 ติดตั้งระบบ relate.py เชื่อมโยงความสัมพันธ์ข้ามเอกสารอัตโนมัติ และระบบซ่อมแซมเชิงอรรถ 100% ครับ'
    },
    'timeline-w8': {
      expr: 'cheer',
      text: 'สัปดาห์ที่ 8 สถาปัตยกรรมระดับ Production พร้อมระบบแยกเซสชันรายแท็บ และเชื่อมต่อเครื่องมือ AI ภายนอกผ่าน MCP v2 ครับ'
    },
    'hero-ingest-5x': {
      expr: 'surprised',
      text: 'แม้จะมีเอกสารโครงการหลายสิบไฟล์ ผมก็สามารถอ่านและสรุปพร้อมกันได้ถึง <strong>5 ช่องทาง</strong> ช่วยประหยัดเวลาเตรียมข้อมูลได้มากเลยครับ'
    },
    'hero-bento-project': {
      expr: 'happy',
      text: 'การ์ดนี้คือพื้นที่ตั้งต้นสร้างสถาปัตยกรรมโครงการใหม่ พร้อมระบบ C4 Hierarchy และการกำหนดสิทธิ์ของทีมอย่างสมบูรณ์แบบครับ'
    },
    'hero-bento-graph': {
      expr: 'think',
      text: 'เมื่อมีการนำเข้าเอกสาร กราฟจะเชื่อมโยง Entity, โมดูลระบบ และ API เข้าด้วยกันแบบ 2 มิติทันทีครับ'
    },
    'hero-bento-gov': {
      expr: 'happy',
      text: 'ส่วน Governance ช่วยให้ตรวจสอบความพร้อม การรับรองมาตรฐาน และสถาปัตยกรรมระบบได้โปร่งใสทุกขั้นตอนครับ'
    },
    'hero-bento-ingest': {
      expr: 'surprised',
      text: 'คลิกการ์ดนี้หรือลากไฟล์เอกสาร บันทึก หรือ URL มาวาง เพื่อให้ผมเริ่มสกัดข้อมูลเข้าสู่คลังความรู้แบบคู่ขนาน 5 ช่องทางได้ทันทีครับ'
    },
    'hero-bento-files': {
      expr: 'look',
      text: 'เบราว์เซอร์ไฟล์ช่วยจัดระเบียบเนื้อหาวิกิที่สร้างขึ้นใหม่ สามารถคลิกเปิดอ่านหรือตรวจสอบความถูกต้องได้ทุกเมื่อครับ'
    },
    'hero-bento-ai': {
      expr: 'happy',
      text: 'คุณสามารถพิมพ์ถามคำถามเกี่ยวกับโครงการ หรือกดปุ่มด้านล่างเพื่อสรุปสาระสำคัญของเอกสารให้เห็นภาพรวมได้ทันทีครับ'
    },
    'finale-bento-project': {
      expr: 'happy',
      text: 'โครงการ Transmission Tower AI ผ่านการทดสอบระดับ Production และเชื่อมต่อคลังความรู้อย่างสมบูรณ์แบบแล้วครับ'
    },
    'finale-bento-graph': {
      expr: 'think',
      text: 'แผนผังกราฟสถาปัตยกรรม C4 ทั้ง 8 โหนดเชื่อมโยงโครงข่าย Edge Drone และ AI เข้าด้วยกันอย่างแม่นยำครับ'
    },
    'finale-bento-gov': {
      expr: 'happy',
      text: 'ผ่านการรับรองมาตรฐานสถาปัตยกรรมและพร้อมใช้งานในศูนย์ข้อมูลหลักอย่างเป็นทางการครับ'
    },
    'finale-bento-ingest': {
      expr: 'happy',
      text: 'ระบบประมวลผลเอกสารนำเข้าไฟล์ครบทั้ง 5 ไฟล์เรียบร้อย พร้อมสร้างการค้นหาแบบ 2 มิติทันทีครับ'
    },
    'finale-bento-files': {
      expr: 'look',
      text: 'ไฟล์วิกิทั้ง SOP, C4 Container และ Drone Telemetry ถูกจัดเก็บพร้อมใช้งานสำหรับทีมงานทุกคนครับ'
    },
    'finale-bento-ai': {
      expr: 'happy',
      text: 'ผมพร้อมตอบคำถามทุกข้อกำหนดและช่วยทุกทีมทำงานได้อย่างมั่นใจแล้วครับ'
    },
    'hero-hybrid-rrf': {
      expr: 'think',
      text: 'ไม่ว่าจะค้นหาด้วยรหัสเอกสารตรงๆ หรือถามด้วยประโยคทั่วไป ผมก็ผสมผสานการค้นหาทั้งสองแบบเพื่อหาหน้าที่ตรงที่สุดให้ครับ'
    },
    'hero-verified-cite': {
      expr: 'happy',
      text: 'ทุกคำตอบของผมจะระบุที่มาชัดเจนครับ ว่านำมาจากหน้าวิกิไหนและอ้างอิงจากไฟล์ต้นฉบับใด เพื่อให้ทีมตรวจสอบกลับได้เสมอ'
    },
    'hero-zero-downtime': {
      expr: 'happy',
      text: 'ระหว่างเตรียมงานสำคัญไม่ต้องกลัวระบบค้างครับ หากโมเดลหลักตอบช้าหรือโควตาเต็ม ผมจะสลับไปใช้ระบบสำรองให้โดยอัตโนมัติครับ'
    },
    'rag-pain-chunk': {
      expr: 'no',
      text: 'ระบบแบบเดิมชอบตัดเอกสารเป็นท่อนสั้นๆ ครับ พอตารางหรือเนื้อหาถูกตัดขาดจากกัน คำตอบที่ได้ก็มักจะไม่ครบถ้วนครับ'
    },
    'wiki-karpathy-model': {
      expr: 'happy',
      text: 'แต่ผมจะอ่านเอกสารทั้งหมดแล้วเรียบเรียงเป็นบทความวิกิที่สมบูรณ์ครับ ทำให้เข้าใจภาพรวมของโครงการและเชื่อมโยงข้อมูลข้ามไฟล์ได้ทันที'
    },
    'cat-entities': {
      expr: 'happy',
      text: 'หมวด<strong>ลูกค้าและองค์กร</strong> จะรวบรวมข้อมูลประวัติลูกค้า พันธมิตร และหน่วยงานที่เกี่ยวข้องไว้ให้ค้นหาง่ายๆ ครับ'
    },
    'cat-concepts': {
      expr: 'think',
      text: 'หมวด<strong>เทคโนโลยี</strong> ใช้เก็บสถาปัตยกรรมระบบ มาตรฐานความปลอดภัย และแนวทางการออกแบบที่ทีมเราใช้บ่อยครับ'
    },
    'cat-projects': {
      expr: 'happy',
      text: 'หมวด<strong>ข้อมูลโครงการ</strong> จะรวบรวมรายละเอียดสำคัญของแต่ละงาน ทั้งข้อกำหนด สเปกเทคนิค และแผนการส่งมอบครับ'
    },
    'cat-syntheses': {
      expr: 'surprised',
      text: 'หมวด<strong>บทสรุปวิเคราะห์</strong> ช่วยเปรียบเทียบจุดเด่นและแนวทางแก้ปัญหาจากหลายๆ โครงการ เพื่อใช้เป็นแนวทางในงานถัดไปครับ'
    },
    'mcp-v2-server': {
      expr: 'happy',
      text: 'คลัง <strong>presale-enterprise</strong> เป็นคลังหลักของทีมที่มีหน้าวิกิครบ 42 หน้า และเปิดเชื่อมต่อกับเครื่องมือ AI ผ่าน MCP เรียบร้อยแล้วครับ'
    },
    'self-service-proj': {
      expr: 'happy',
      text: 'คลัง <strong>cloud-migration-2026</strong> แยกพื้นที่เฉพาะสำหรับทีมดูแลโครงการ Cloud ERP สามารถกำหนดสิทธิ์ผู้ร่วมงานได้เองเลยครับ'
    },
    'occ-etag-card': {
      expr: 'think',
      text: 'ทีมสามารถนำรหัสเชื่อมต่อจากเมนู Connect AI assistant ไปผูกกับโปรแกรมที่ใช้งานประจำเพื่อดึงข้อมูลวิกิได้ทันทีครับ'
    },
    'federated-search-card': {
      expr: 'surprised',
      text: 'มีระบบตรวจสอบเวอร์ชันก่อนบันทึกทุกครั้ง มั่นใจได้ว่าข้อมูลจะไม่ถูกเขียนทับแม้ช่วยกันอัปเดตหลายคนครับ'
    },
    'finale-stat-5x': {
      expr: 'surprised',
      text: 'ประมวลผลเอกสารชุดใหญ่ได้รวดเร็วขึ้นถึง <strong>5 เท่า</strong> ช่วยให้ทีมมีเวลาโฟกัสกับการวางกลยุทธ์มากขึ้นครับ'
    },
    'finale-stat-hybrid': {
      expr: 'happy',
      text: 'ค้นหาแม่นยำทั้งคำเฉพาะทางและบริบท พร้อมแผนผังความรู้ที่เชื่อมโยงทุกมิติของโครงการเข้าด้วยกันครับ'
    },
    'finale-stat-failover': {
      expr: 'happy',
      text: 'มั่นใจได้ในความเสถียรด้วยระบบสลับโมเดลสำรองอัตโนมัติ และการอ้างอิงที่มาที่ตรวจสอบได้ทุกบรรทัดครับ'
    },
    'finale-stat-mcp': {
      expr: 'happy',
      text: 'พร้อมเชื่อมต่อเข้ากับการทำงานของทุกทีมได้ทันทีครับ'
    }
  };

  // --------------------------------------------------------------------------
  // 3. REALISTIC PRESALE DATA FOR FILE BROWSER & CHAT LIVE DEMO
  // --------------------------------------------------------------------------
  var WIKI_ARTICLES = {
    'proj-cloud': {
      path: 'projects/cloud-erp-2026.md',
      props: 'type: project · client: [[clients/scb-enterprise]] · status: active · sources: 3 files',
      title: 'โครงการพัฒนาแพลตฟอร์ม Cloud ERP และ Data Lakehouse ประจำปี 2569',
      bodyHtml:
        '<p style="margin-bottom:8px;">โครงการยกระดับระบบฐานข้อมูลหลักขององค์กรสู่สถาปัตยกรรม Hybrid Cloud รองรับผู้ใช้งานพร้อมกันกว่า 15,000 ราย โดยมีข้อกำหนด SLA ความพร้อมใช้งานของระบบหลักที่ <strong>99.95%</strong> และระบบสำรองข้อมูลข้ามภูมิภาค (Cross-Region DR) ภายใน 15 นาที [1]</p>' +
        '<table style="width:100%; border-collapse:collapse; font-size:11.5px; margin:8px 0;">' +
        '<tr style="background:rgba(59,130,246,0.14);"><th style="border:1px solid var(--border); padding:5px 8px; text-align:left;">หมวดงานหลัก</th><th style="border:1px solid var(--border); padding:5px 8px; text-align:left;">รายละเอียดตาม TOR</th><th style="border:1px solid var(--border); padding:5px 8px; text-align:left;">ระยะเวลาส่งมอบ</th></tr>' +
        '<tr><td style="border:1px solid var(--border); padding:5px 8px;">1. Cloud Infrastructure</td><td style="border:1px solid var(--border); padding:5px 8px;">Kubernetes Cluster + Auto-scaling</td><td style="border:1px solid var(--border); padding:5px 8px;">งวดที่ 1 (60 วัน)</td></tr>' +
        '<tr><td style="border:1px solid var(--border); padding:5px 8px;">2. Data Lakehouse</td><td style="border:1px solid var(--border); padding:5px 8px;">Real-time CDC Pipeline & Analytics</td><td style="border:1px solid var(--border); padding:5px 8px;">งวดที่ 2 (120 วัน)</td></tr>' +
        '</table>' +
        '<p style="color:var(--text-secondary); font-size:11.5px;">เชื่อมโยงกับ: <span style="color:#38BDF8; text-decoration:underline;">[[clients/scb-enterprise]]</span> · <span style="color:#38BDF8; text-decoration:underline;">[[solutions/zero-trust-arch]]</span> · <span style="color:#38BDF8; text-decoration:underline;">[[syntheses/boq-pricing-bench]]</span> [2]</p>',
      speech:
        'หน้าวิกิ <strong>projects/cloud-erp-2026.md</strong> สรุปทั้งตารางงวดงาน เกณฑ์ SLA 99.95% และลิงก์เชื่อมไปยังหน้าลูกค้าและมาตรฐานความปลอดภัยให้ครบในหน้าเดียวครับ'
    },
    'ent-bank': {
      path: 'clients/scb-enterprise.md',
      props: 'type: client · sector: Banking & Finance · compliance: PDPA, ISO 27001 · projects: 4',
      title: 'ข้อมูลลูกค้า: กลุ่มธุรกิจการเงินและธนาคาร (Enterprise Banking)',
      bodyHtml:
        '<p style="margin-bottom:8px;">ลูกค้ากลุ่มสถาบันการเงินที่มีข้อกำหนดด้านการกำกับดูแลข้อมูลเข้มงวด ข้อมูลสำคัญทั้งหมดต้องเข้ารหัสระดับ AES-256 และจัดเก็บภายในศูนย์ข้อมูลในประเทศ (Domestic Data Residency) เท่านั้น [1]</p>' +
        '<ul style="padding-left:18px; margin-bottom:8px;">' +
        '<li><strong>ระบบที่ใช้งานปัจจุบัน:</strong> Core Banking เดิมเชื่อมต่อผ่าน API Gateway มาตรฐาน OAuth 2.0 / mTLS</li>' +
        '<li><strong>ความต้องการสำคัญ:</strong> ระบบตรวจสอบย้อนหลัง (Audit Trail) ครบทุกธุรกรรม และแผนสำรองฉุกเฉิน RTO ไม่เกิน 15 นาที [2]</li>' +
        '</ul>',
      speech:
        'หน้าวิกิ <strong>clients/scb-enterprise.md</strong> รวบรวมข้อกำหนดเฉพาะของลูกค้ารายนี้ เช่น กฎการจัดเก็บข้อมูลในประเทศและมาตรฐานความปลอดภัยที่ต้องใช้ทุกโครงการครับ'
    },
    'concept-sec': {
      path: 'solutions/zero-trust-arch.md',
      props: 'type: solution · category: Cybersecurity · standard: ISO 27001 / Zero Trust',
      title: 'สถาปัตยกรรมความปลอดภัย Zero Trust และการควบคุมสิทธิ์ระดับองค์กร',
      bodyHtml:
        '<p style="margin-bottom:8px;">แนวทางการออกแบบระบบความปลอดภัยมาตรฐานระดับองค์กร สำหรับโครงการภาครัฐและสถาบันการเงิน ประกอบด้วย 3 ชั้นหลัก [1]:</p>' +
        '<ul style="padding-left:18px;">' +
        '<li><strong>Identity & Access:</strong> ยืนยันตัวตนผ่านระบบ SSO องค์กร พร้อมแบ่งสิทธิ์รายโครงการ (OWNER / MEMBER)</li>' +
        '<li><strong>Network Micro-segmentation:</strong> แยกเครือข่ายฐานข้อมูลออกจากส่วนประมวลผลภายนอกอย่างเด็ดขาด</li>' +
        '<li><strong>Data Governance:</strong> รองรับการถอนข้อมูลรายไฟล์ (Surgical Unlearn) พร้อมบันทึก Audit Log ทุกครั้ง [2]</li>' +
        '</ul>',
      speech:
        'หน้าวิกิ <strong>solutions/zero-trust-arch.md</strong> สรุปแบบแผนสถาปัตยกรรมความปลอดภัยที่ทีมสามารถนำไปอ้างอิงในการเขียนข้อเสนอทางเทคนิคได้ทันทีครับ'
    },
    'syn-price': {
      path: 'syntheses/boq-pricing-bench.md',
      props: 'type: synthesis · compared_projects: 5 · updated: 2026-11-06',
      title: 'บทสรุปเปรียบเทียบโครงสร้างราคา BOQ และต้นทุนระบบ Cloud ย้อนหลัง 5 โครงการ',
      bodyHtml:
        '<p style="margin-bottom:8px;">จากการสังเคราะห์ข้อมูลใบเสนอราคาและ BOQ ทั้งหมด 5 โครงการ พบว่าสัดส่วนงบประมาณที่เหมาะสมที่สุดแบ่งเป็น [1]:</p>' +
        '<ul style="padding-left:18px;">' +
        '<li><strong>Cloud Compute & Storage:</strong> 45% (แนะนำจอง Reserved Instance 3 ปี เพื่อลดต้นทุนลง 28%)</li>' +
        '<li><strong>Security & Compliance License:</strong> 25%</li>' +
        '<li><strong>Implementation & Managed Service (SLA 24x7):</strong> 30% [2]</li>' +
        '</ul>',
      speech:
        'หน้าวิกิ <strong>syntheses/boq-pricing-bench.md</strong> เกิดจากการที่ผมช่วยอ่าน BOQ หลายๆ โครงการแล้วสังเคราะห์เป็นเกณฑ์เปรียบเทียบงบประมาณให้ทีมครับ'
    }
  };

  var CHAT_RESPONSES = {
    default: {
      title: 'วิเคราะห์ TOR โครงการ Cloud ERP 2026',
      trace: [
        { step: '1. วางแผนค้นหา (Query Planning): แยกประเด็นเป็น "ขอบเขตงาน TOR", "เกณฑ์ SLA" และ "กำหนดการส่งมอบ"', time: '0.3s' },
        { step: '2. ค้นหา 2 มิติ (Hybrid Search RRF): ดึงข้อมูลจาก Qdrant Dense Vectors ร่วมกับ BM25 Keyword', time: '0.6s' },
        { step: '3. คัดกรองเนื้อหา (Gemini Reranker): คัดหน้าวิกิที่เกี่ยวข้องสูงสุด 3 หน้า พร้อมขยายกราฟ 2-Hop', time: '0.5s' },
        { step: '4. ตรวจสอบความครบถ้วน (Self-Reflection): ข้อมูลครบทุกประเด็น พร้อมแนบแหล่งอ้างอิง [1] [2]', time: '0.4s' }
      ],
      answerHtml:
        '<p style="margin-bottom:8px;">จากการตรวจสอบคลังความรู้โครงการ <strong>Cloud ERP 2026</strong> สรุปสาระสำคัญและเงื่อนไข TOR ได้ดังนี้ครับ:</p>' +
        '<table style="width:100%; border-collapse:collapse; font-size:11.5px; margin:8px 0;">' +
        '<tr style="background:rgba(59,130,246,0.16);"><th style="border:1px solid var(--border); padding:5px 8px; text-align:left;">หัวข้อสำคัญ</th><th style="border:1px solid var(--border); padding:5px 8px; text-align:left;">ข้อกำหนดตามเอกสาร TOR</th><th style="border:1px solid var(--border); padding:5px 8px; text-align:left;">หน้าอ้างอิง</th></tr>' +
        '<tr><td style="border:1px solid var(--border); padding:5px 8px;"><strong>ความพร้อมใช้งาน (SLA)</strong></td><td style="border:1px solid var(--border); padding:5px 8px;">ไม่ต่ำกว่า 99.95% พร้อมระบบสำรอง DR ภายใน 15 นาที</td><td style="border:1px solid var(--border); padding:5px 8px; color:#38BDF8;">[[projects/cloud-erp-2026]] [1]</td></tr>' +
        '<tr><td style="border:1px solid var(--border); padding:5px 8px;"><strong>ความปลอดภัยข้อมูล</strong></td><td style="border:1px solid var(--border); padding:5px 8px;">เข้ารหัส AES-256 และเก็บข้อมูลในประเทศ (PDPA / ISO 27001)</td><td style="border:1px solid var(--border); padding:5px 8px; color:#38BDF8;">[[clients/scb-enterprise]] [2]</td></tr>' +
        '<tr><td style="border:1px solid var(--border); padding:5px 8px;"><strong>แนวทางจัดทำ BOQ</strong></td><td style="border:1px solid var(--border); padding:5px 8px;">ใช้ Reserved Instance 3 ปี ช่วยประหยัดงบโครงสร้างพื้นฐาน 28%</td><td style="border:1px solid var(--border); padding:5px 8px; color:#38BDF8;">[[syntheses/boq-pricing-bench]] [3]</td></tr>' +
        '</table>' +
        '<div style="font-size:11px; color:var(--text-muted); margin-top:6px; padding-top:6px; border-top:1px solid var(--border-light);">' +
        'แหล่งที่มา: <sup>[1]</sup> TOR_Main.pdf (หน้า 14) · <sup>[2]</sup> SCB_Security_SLA.docx (หน้า 6) · <sup>[3]</sup> BOQ_Matrix.xlsx' +
        '</div>',
      followUps: [
        'เปรียบเทียบสเปกเทคนิค Cloud Data Platform และงบประมาณอ้างอิง',
        'มีข้อกำหนดเรื่องค่าปรับ SLA หรือความเสี่ยงอะไรที่ต้องระวังบ้าง'
      ],
      speech:
        'ผมค้นหาทั้งจากหน้าโครงการ หน้าข้อมูลลูกค้า และบทสรุปราคา แล้วเรียบเรียงเป็นตารางพร้อมระบุไฟล์อ้างอิงให้ครบทุกข้อเลยครับ'
    },
    spec: {
      title: 'สืบค้น Solution & สเปกอุปกรณ์ Cloud Data Platform',
      trace: [
        { step: '1. วางแผนค้นหา: สืบค้นสถาปัตยกรรม Zero Trust, สเปก Kubernetes Cluster และสัดส่วนราคา BOQ', time: '0.3s' },
        { step: '2. ดึงหน้าวิกิที่เชื่อมโยงกัน: solutions/zero-trust-arch.md และ syntheses/boq-pricing-bench.md', time: '0.5s' },
        { step: '3. สังเคราะห์ตารางสเปกอุปกรณ์และแนวทางประหยัดงบประมาณโครงการ', time: '0.4s' }
      ],
      answerHtml:
        '<p style="margin-bottom:8px;">สำหรับสเปกทางเทคนิคและโครงสร้างงบประมาณของ <strong>Cloud Data Platform</strong> แนะนำตามมาตรฐานที่ผ่านการอนุมัติในโครงการก่อนหน้าดังนี้ครับ [1]:</p>' +
        '<ul style="padding-left:18px; margin-bottom:8px;">' +
        '<li><strong>Compute & Container:</strong> Production Kubernetes Cluster แยกส่วนกับ Database พร้อมระบบ Auto-scaling รองรับ 15,000 ผู้ใช้งาน</li>' +
        '<li><strong>Security Architecture:</strong> ใช้โครงสร้าง Micro-segmentation และยืนยันตัวตนแบบ mTLS / OAuth 2.0 ตามหน้า <span style="color:#38BDF8;">[[solutions/zero-trust-arch]]</span> [1]</li>' +
        '<li><strong>การบริหารงบประมาณ BOQ:</strong> สัดส่วน Compute 45% / Security 25% / Managed Service 30% ตามหน้า <span style="color:#38BDF8;">[[syntheses/boq-pricing-bench]]</span> [2]</li>' +
        '</ul>' +
        '<div style="font-size:11px; color:var(--text-muted); margin-top:6px; padding-top:6px; border-top:1px solid var(--border-light);">' +
        'แหล่งที่มา: <sup>[1]</sup> Spec_Cloud.docx · <sup>[2]</sup> BOQ_Matrix.xlsx' +
        '</div>',
      followUps: [
        'สรุปภาพรวมโครงการ Cloud ERP 2026 และเงื่อนไข SLA สำคัญ',
        'ขอรายละเอียดแผนสำรองฉุกเฉิน Cross-Region DR ภายใน 15 นาที'
      ],
      speech:
        'ได้ข้อมูลสเปกอุปกรณ์พร้อมแนวทางจัดงบประมาณ BOQ จากโครงการที่ผ่านๆ มาครบถ้วนเลยครับ'
    }
  };

  // --------------------------------------------------------------------------
  // 4. SPEECH BUBBLE & MASCOT HELPERS
  // --------------------------------------------------------------------------
  function updateMascotSpeech(htmlText, expr, gesture, gestureOpts, forceShowOnHero) {
    var bubble = document.getElementById('mascotSpeech');
    if (bubble && htmlText) {
      bubble.innerHTML = htmlText;
      bubble.classList.remove('pop-pulse');
      void bubble.offsetWidth;
      bubble.classList.add('pop-pulse');

      if (forceShowOnHero) {
        bubble.classList.add('force-show');
        if (bubbleHideTimer) clearTimeout(bubbleHideTimer);
        bubbleHideTimer = setTimeout(function () {
          bubble.classList.remove('force-show');
        }, 5500);
      }
    }

    if (window.PikaMascot) {
      if (expr) window.PikaMascot.express(expr, 3.6);
      if (gesture) window.PikaMascot.play(gesture, gestureOpts || {});
    }
  }

  // --------------------------------------------------------------------------
  // 5. SCENE TRANSITION ENGINE
  // --------------------------------------------------------------------------
  function goToScene(targetIdx) {
    var next = Math.max(1, Math.min(TOTAL_SCENES, parseInt(targetIdx, 10)));
    if (next === currentScene || isTransitioning) return;

    isTransitioning = true;
    var prev = currentScene;
    currentScene = next;

    var bubble = document.getElementById('mascotSpeech');
    if (bubble) bubble.classList.remove('force-show');

    document.body.setAttribute('data-scene', String(currentScene));

    var rig = document.getElementById('pikaActorRig');
    if (rig && !isMacroZoom && !document.body.classList.contains('live-demo-open')) {
      var glideClass = next > prev ? 'glide-right' : 'glide-left';
      rig.classList.add(glideClass);
      setTimeout(function () {
        rig.classList.remove('glide-right', 'glide-left');
      }, 460);
    }

    var allScenes = document.querySelectorAll('.apple-scene');
    for (var i = 0; i < allScenes.length; i++) {
      var sc = allScenes[i];
      var idx = parseInt(sc.getAttribute('data-scene-idx'), 10);
      sc.classList.remove('active-scene', 'prev-scene');
      if (idx === currentScene) {
        sc.classList.add('active-scene');
      } else if (idx < currentScene) {
        sc.classList.add('prev-scene');
      }
    }

    var navItems = document.querySelectorAll('.apple-nav-item');
    for (var j = 0; j < navItems.length; j++) {
      var item = navItems[j];
      var gotoVal = parseInt(item.getAttribute('data-goto'), 10);
      item.classList.toggle('active', gotoVal === currentScene);
    }

    var cfg = SCENE_SCRIPT[currentScene];
    if (cfg) {
      var backlight = document.getElementById('xdrBacklight');
      if (backlight && cfg.backlight) {
        backlight.style.background = cfg.backlight;
      }
      setTimeout(function () {
        var opts = cfg.pointSide ? { side: cfg.pointSide } : {};
        updateMascotSpeech(cfg.speech, cfg.expression, cfg.gesture, opts, false);
      }, 220);
    }

    // Immediately trigger the new scene's automatic Live Demo choreography!
    runSceneAutoDirector(currentScene);

    if (isAutoPlaying) {
      scheduleNextAutoPlaySlide();
    }

    setTimeout(function () {
      isTransitioning = false;
    }, 650);
  }

  function nextScene() {
    if (currentScene < TOTAL_SCENES) {
      goToScene(currentScene + 1);
    } else {
      goToScene(1);
    }
  }

  function prevScene() {
    if (currentScene > 1) {
      goToScene(currentScene - 1);
    } else {
      goToScene(TOTAL_SCENES);
    }
  }

  // --------------------------------------------------------------------------
  // 6. NAVIGATION, WHEEL, KEYBOARD & THEME TOGGLES
  // --------------------------------------------------------------------------
  function bindNavigation() {
    var gotoBtns = document.querySelectorAll('[data-goto]');
    for (var i = 0; i < gotoBtns.length; i++) {
      gotoBtns[i].addEventListener('click', function (e) {
        var target = this.getAttribute('data-goto');
        if (target) {
          e.stopPropagation();
          closeLiveWorkbench();
          goToScene(parseInt(target, 10));
        }
      });
    }

    var btnPrev = document.getElementById('btnPrevSlide');
    var btnNext = document.getElementById('btnNextSlide');
    if (btnPrev) btnPrev.addEventListener('click', prevScene);
    if (btnNext) btnNext.addEventListener('click', nextScene);

    window.addEventListener('keydown', function (e) {
      var tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
      if (e.key === 'Escape') {
        closeKpiTechModal();
        closeLiveWorkbench();
        return;
      }
      if (document.body.classList.contains('live-demo-open') || document.body.classList.contains('kpi-modal-open')) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        nextScene();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevScene();
      } else if (e.key >= '1' && e.key <= '9') {
        goToScene(parseInt(e.key, 10));
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      }
    });

    // Trackpad / Mouse wheel slide transition (ignores scrolling inside inner scrollable panes)
    var wheelLock = false;
    window.addEventListener(
      'wheel',
      function (e) {
        if (document.body.classList.contains('live-demo-open')) return;
        if (e.target && e.target.closest('.real-ingest-log, .real-chat-messages, .real-fb-tree, .real-fb-viewer-body, .timeline-cards-scroll')) {
          return;
        }
        if (wheelLock || isTransitioning) return;
        if (Math.abs(e.deltaY) < 32) return;
        wheelLock = true;
        if (e.deltaY > 0) {
          if (currentScene < TOTAL_SCENES) nextScene();
        } else {
          if (currentScene > 1) prevScene();
        }
        setTimeout(function () {
          wheelLock = false;
        }, 900);
      },
      { passive: true }
    );


    // Auto-play presentation toggle
    var btnAuto = document.getElementById('btnAutoPlay');
    if (btnAuto) {
      btnAuto.addEventListener('click', function () {
        if (isAutoPlaying) {
          isAutoPlaying = false;
          clearAutoPlayTimer();
          btnAuto.classList.remove('active-play');
          btnAuto.textContent = 'เล่นอัตโนมัติ';
          updateMascotSpeech(
            'หยุดการเล่นอัตโนมัติแล้วครับ สามารถคลิกทดลองเล่นหน้าเว็บจริงในสไลด์นี้ได้ตามสบายเลยครับ',
            'happy',
            null,
            {},
            true
          );
        } else {
          isAutoPlaying = true;
          btnAuto.classList.add('active-play');
          btnAuto.textContent = 'หยุดเล่น';
          updateMascotSpeech(
            'เริ่มการนำเสนออัตโนมัติแล้วครับ ระบบจะเล่น Live Demo ของแต่ละหน้าจนเสร็จสมบูรณ์ก่อนเปลี่ยนสไลด์ครับ',
            'happy',
            'wave',
            {},
            true
          );
          // Restart current scene director from beginning so full demo is witnessed
          runSceneAutoDirector(currentScene);
          scheduleNextAutoPlaySlide();
        }
      });
    }

    // App Window Dark/Light Theme Toggle buttons
    var themeBtns = document.querySelectorAll('[data-toggle-app-theme]');
    for (var k = 0; k < themeBtns.length; k++) {
      themeBtns[k].addEventListener('click', function () {
        var targetId = this.getAttribute('data-toggle-app-theme');
        var win = document.getElementById(targetId);
        if (win) {
          var cur = win.getAttribute('data-app-theme') || 'dark';
          var nextTheme = cur === 'dark' ? 'light' : 'dark';
          win.setAttribute('data-app-theme', nextTheme);
          updateMascotSpeech(
            nextTheme === 'light'
              ? 'สลับเป็น<strong>โหมดสว่าง (Light Mode)</strong> แล้วครับ หน้าเว็บจริงของเรารองรับทั้งโหมดมืดและโหมดสว่างเลยครับ'
              : 'สลับเป็น<strong>โหมดมืด (Luxury Dark Mode)</strong> แล้วครับ สบายตาและเหมาะกับการทำงานต่อเนื่องครับ',
            'happy',
            null,
            {},
            true
          );
        }
      });
    }

    // Fullscreen toggle button
    var btnFs = document.getElementById('btnFullscreen');
    if (btnFs) {
      btnFs.addEventListener('click', function () {
        toggleFullscreen();
      });
    }

    bindTimelineTabs();
  }

  function isFullscreenActive() {
    var doc = document;
    return !!(
      doc.fullscreenElement ||
      doc.webkitFullscreenElement ||
      doc.mozFullScreenElement ||
      doc.msFullscreenElement
    );
  }

  function toggleFullscreen() {
    var doc = document;
    var docEl = document.documentElement;

    if (!isFullscreenActive()) {
      var req =
        docEl.requestFullscreen ||
        docEl.webkitRequestFullscreen ||
        docEl.mozRequestFullScreen ||
        docEl.msRequestFullscreen;
      if (req) {
        try {
          var p = req.call(docEl);
          if (p && p.catch) {
            p.catch(function (err) {
              console.warn('Fullscreen request rejected:', err);
            });
          }
        } catch (err) {
          console.warn('Fullscreen error:', err);
        }
      }
    } else {
      var exit =
        doc.exitFullscreen ||
        doc.webkitExitFullscreen ||
        doc.mozCancelFullScreen ||
        doc.msExitFullscreen;
      if (exit) {
        try {
          var p = exit.call(doc);
          if (p && p.catch) {
            p.catch(function (err) {
              console.warn('Exit fullscreen rejected:', err);
            });
          }
        } catch (err) {
          console.warn('Exit fullscreen error:', err);
        }
      }
    }
  }

  function updateFullscreenBtnState() {
    var isFs = isFullscreenActive();
    var btn = document.getElementById('btnFullscreen');
    if (!btn) return;

    var iconEnter = btn.querySelector('.fs-icon-enter');
    var iconExit = btn.querySelector('.fs-icon-exit');
    var label = btn.querySelector('.fs-label');

    if (isFs) {
      btn.classList.add('active-fullscreen');
      btn.title = 'ออกจากเต็มหน้าจอ (ESC หรือ F)';
      if (iconEnter) iconEnter.style.display = 'none';
      if (iconExit) iconExit.style.display = 'inline-block';
      if (label) label.textContent = 'ออกจากเต็มจอ';
    } else {
      btn.classList.remove('active-fullscreen');
      btn.title = 'เต็มหน้าจอ (F)';
      if (iconEnter) iconEnter.style.display = 'inline-block';
      if (iconExit) iconExit.style.display = 'none';
      if (label) label.textContent = 'เต็มหน้าจอ';
    }
  }

  document.addEventListener('fullscreenchange', updateFullscreenBtnState);
  document.addEventListener('webkitfullscreenchange', updateFullscreenBtnState);
  document.addEventListener('mozfullscreenchange', updateFullscreenBtnState);
  document.addEventListener('MSFullscreenChange', updateFullscreenBtnState);

  var currentTimelineWeek = 'w1';

  function setTimelineWeek(targetWeek, userTriggered) {
    if (!targetWeek) targetWeek = 'w1';
    currentTimelineWeek = targetWeek;

    var nav = document.getElementById('timelineWeekNav');
    if (nav) {
      var pills = nav.querySelectorAll('.timeline-nav-pill');
      for (var j = 0; j < pills.length; j++) {
        var tabId = pills[j].getAttribute('data-week-tab');
        pills[j].classList.toggle('active', tabId === targetWeek);
      }
    }

    var cards = document.querySelectorAll('.timeline-week-card');
    for (var k = 0; k < cards.length; k++) {
      var card = cards[k];
      var weekId = card.getAttribute('data-week-id');
      if (weekId === targetWeek) {
        card.style.display = 'flex';
        card.classList.add('active-week-card');
      } else {
        card.style.display = 'none';
        card.classList.remove('active-week-card');
      }
    }

    if (userTriggered && CARD_SPEECH_MAP['timeline-' + targetWeek]) {
      var item = CARD_SPEECH_MAP['timeline-' + targetWeek];
      updateMascotSpeech(item.text, item.expr, null, {}, true);
    }
  }

  function bindTimelineTabs() {
    var nav = document.getElementById('timelineWeekNav');
    if (!nav) return;
    var pills = nav.querySelectorAll('.timeline-nav-pill');
    for (var i = 0; i < pills.length; i++) {
      pills[i].addEventListener('click', function () {
        var targetWeek = this.getAttribute('data-week-tab');
        setTimelineWeek(targetWeek, true);
      });
    }

    // Default to Week 1
    setTimelineWeek('w1', false);
  }

  // --------------------------------------------------------------------------
  // 7. 3D RAYCAST CARD POINTING & MASCOT DIRECT INTERACTIONS
  // --------------------------------------------------------------------------
  function bindMascotAndCardInteractions() {
    window.addEventListener('pika-project-reach-click', function (ev) {
      var detail = ev.detail || {};
      var id = detail.id;
      var card = detail.card;

      if (card) {
        var siblings = document.querySelectorAll('.wiki-project-link');
        for (var i = 0; i < siblings.length; i++) {
          siblings[i].classList.remove('pika-tapped', 'active-step');
        }
        card.classList.add('pika-tapped');
      }

      var item = CARD_SPEECH_MAP[id];
      if (item) {
        updateMascotSpeech(item.text, item.expr, null, {}, true);
      }
    });

    window.addEventListener('pika-hand-tapped-card', function (ev) {
      var card = ev.detail && ev.detail.card;
      if (card) {
        card.classList.add('pika-tapped');
        setTimeout(function () {
          card.classList.remove('pika-tapped');
        }, 900);
      }
    });

    var dragZone = document.getElementById('mascotDragZone');
    var clickIdx = 0;
    var directReactions = [
      {
        expr: 'happy',
        gesture: 'wave',
        text: 'ยินดีที่ได้รู้จักครับ ลองกดปุ่ม <strong>ทดลอง Live Demo</strong> ด้านบนเพื่อเล่นหน้าเว็บจริงของผมได้ทุกฟีเจอร์เลยนะครับ'
      },
      {
        expr: 'surprised',
        gesture: 'cheer',
        text: 'คุณสามารถลองกดอัปโหลดไฟล์จำลอง หรือพิมพ์แชทถามคำถามในหน้าต่าง Live Demo บนสไลด์ได้จริงๆ เลยครับ'
      },
      {
        expr: 'think',
        gesture: 'think',
        text: 'มีเอกสารโครงการหรือคู่มือเล่มไหนอยากให้ผมช่วยอ่านสรุป โยนใส่หน้า Upload Note ได้เลยครับ'
      },
      {
        expr: 'shy',
        gesture: 'wave',
        text: 'คลิกค้างที่ตัวผมแล้วลากซ้าย-ขวา เพื่อหมุนดูตัวผมแบบ 3 มิติได้ด้วยนะครับ'
      }
    ];

    if (dragZone) {
      var downX = 0;
      var downY = 0;
      dragZone.addEventListener('pointerdown', function (e) {
        downX = e.clientX;
        downY = e.clientY;
      });
      dragZone.addEventListener('pointerup', function (e) {
        var dist = Math.hypot(e.clientX - downX, e.clientY - downY);
        if (dist < 6) {
          var r = directReactions[clickIdx % directReactions.length];
          clickIdx++;
          updateMascotSpeech(r.text, r.expr, r.gesture, {}, true);
        }
      });
    }
  }

  // --------------------------------------------------------------------------
  // 8. LIVE DEMO 1: UPLOAD NOTE & 5x PARALLEL INGESTION (SCENE 3)
  // --------------------------------------------------------------------------
  function runLiveIngestSimulation(progFillEl, progPctEl, stageLabelEl, logContainerEl) {
    if (ingestDemoTimer) clearInterval(ingestDemoTimer);

    var stages = [
      {
        pct: 18,
        label: 'ขั้นตอน 1/5: ตรวจสอบไฟล์ซ้ำด้วย SHA-256 (Deduplication)...',
        logClass: 'info',
        logText: '[1/5] ตรวจสอบ SHA-256 ทั้ง 5 ไฟล์: ไม่พบไฟล์ซ้ำ พร้อมเริ่มการสกัดเนื้อหา',
        expr: 'look',
        speech: '<strong>ขั้นที่ 1:</strong> ผมตรวจสอบรหัสไฟล์ก่อนครับว่าเคยอัปโหลดหรือยัง เพื่อไม่ให้ประมวลผลซ้ำซ้อนครับ'
      },
      {
        pct: 42,
        label: 'ขั้นตอน 2/5: แกะข้อความ ตาราง และอ่านภาพสแกน (OCR & Parser)...',
        logClass: 'info',
        logText: '[2/5] แกะตารางจาก BOQ_Matrix.xlsx และถอดข้อความ OCR จาก TOR_Main.pdf (48 หน้า) สำเร็จ',
        expr: 'think',
        speech: '<strong>ขั้นที่ 2:</strong> ดึงข้อความและตารางออกมาจากทั้งไฟล์ PDF, Word, Excel และรูปภาพสแกนครับ'
      },
      {
        pct: 68,
        label: 'ขั้นตอน 3/5: จัดหมวดหมู่เนื้อหาเข้าสู่โครงสร้างวิกิ 4 หมวด...',
        logClass: 'warn',
        logText: '[3/5] แยกหมวดหมู่: ลูกค้า (scb-enterprise), โครงการ (cloud-erp-2026), เทคโนโลยี (zero-trust-arch)',
        expr: 'think',
        speech: '<strong>ขั้นที่ 3:</strong> แยกแยะว่าข้อมูลส่วนไหนเป็นของลูกค้า โครงการ หรือเทคโนโลยี เพื่อจัดเข้าหมวดหมู่ครับ'
      },
      {
        pct: 90,
        label: 'ขั้นตอน 4/5: เขียนบทความวิกิแบบขนาน 5 ช่องทาง (5x Parallel Synthesis)...',
        logClass: 'ok',
        logText: '[4/5] Worker #1-#5 เขียนหน้าวิกิและแทรกลิงก์ [[wikilinks]] เชื่อมโยงระหว่างหน้าเสร็จสมบูรณ์',
        expr: 'surprised',
        speech: '<strong>ขั้นที่ 4:</strong> เดินเครื่องเขียนบทความวิกิพร้อมกัน <strong>5 ช่องทาง</strong> พร้อมผูกจุดเชื่อมโยงระหว่างหน้าอัตโนมัติครับ'
      },
      {
        pct: 100,
        label: 'เสร็จสมบูรณ์: อัปเดตฐานข้อมูลค้นหา Qdrant และแผนผังความรู้เรียบร้อย (ใช้เวลา 3.8 วินาที)',
        logClass: 'ok',
        logText: '[5/5] บันทึกเข้าสู่ Qdrant Hybrid Vectors + อัปเดต Relationship Graph พร้อมใช้งานทันที!',
        expr: 'happy',
        speech: '<strong>เสร็จเรียบร้อยครบ 5 ขั้นตอนครับ!</strong> ตอนนี้เอกสารทั้ง 5 ไฟล์กลายเป็นหน้าวิกิที่พร้อมค้นหาและถาม-ตอบได้ทันทีครับ'
      }
    ];

    if (logContainerEl) logContainerEl.innerHTML = '';
    if (progFillEl) progFillEl.style.width = '5%';
    if (progPctEl) progPctEl.textContent = '5%';

    var idx = 0;
    function stepExec() {
      var st = stages[idx];
      if (!st) return;
      if (progFillEl) progFillEl.style.width = st.pct + '%';
      if (progPctEl) progPctEl.textContent = st.pct + '%';
      if (stageLabelEl) stageLabelEl.textContent = st.label;
      if (logContainerEl) {
        var line = document.createElement('div');
        line.className = 'real-log-line ' + st.logClass;
        line.textContent = st.logText;
        logContainerEl.appendChild(line);
        logContainerEl.scrollTop = logContainerEl.scrollHeight;
      }
      updateMascotSpeech(st.speech, st.expr, st.pct === 100 ? 'cheer' : null, {}, false);
    }

    stepExec();
    ingestDemoTimer = setInterval(function () {
      idx++;
      if (idx >= stages.length) {
        clearInterval(ingestDemoTimer);
        ingestDemoTimer = null;
        return;
      }
      stepExec();
    }, 1150);
  }

  // --------------------------------------------------------------------------
  // 9. LIVE DEMO 2: CHAT WITH PIKA & DEEP SEARCH TRACE (SCENE 5)
  // --------------------------------------------------------------------------
  function runLiveChatQuery(questionText, welcomeEl, convoEl, messagesEl, sessionTitleEl) {
    if (!questionText) return;
    if (welcomeEl) welcomeEl.style.display = 'none';
    if (convoEl) convoEl.classList.add('active');

    var data =
      questionText.indexOf('สเปก') !== -1 || questionText.indexOf('Solution') !== -1 || questionText.indexOf('BOQ') !== -1
        ? CHAT_RESPONSES.spec
        : CHAT_RESPONSES.default;

    if (sessionTitleEl) sessionTitleEl.textContent = data.title;
    if (!messagesEl) return;

    messagesEl.innerHTML = '';

    // 1. User Bubble
    var userDiv = document.createElement('div');
    userDiv.className = 'real-user-bubble';
    userDiv.textContent = questionText;
    messagesEl.appendChild(userDiv);

    // 2. Assistant Bubble with Live Expandable Trace + Answer + Follow-up Chips
    var botDiv = document.createElement('div');
    botDiv.className = 'real-bot-bubble';

    var traceHtml = '';
    if (isDeepSearchOn) {
      traceHtml =
        '<div class="real-trace-box">' +
        '<div class="real-trace-head">' +
        '<span class="real-chat-dot"></span>' +
        '<span>ขั้นตอนการคิดวิเคราะห์เชิงลึก (Deep Search Reasoning Trace — ' +
        data.trace.length +
        ' ขั้นตอน)</span>' +
        '<span style="margin-left:auto; font-size:10.5px; color:#38BDF8;">Context: 24% (31k / 128k)</span>' +
        '</div>' +
        '<div class="real-trace-steps" id="liveTraceStepsList"></div>' +
        '</div>';
    }

    botDiv.innerHTML =
      '<div style="display:flex; align-items:center; gap:7px; margin-bottom:6px;">' +
      '<span style="width:22px; height:22px; border-radius:50%; background:#2563EB; color:#fff; display:inline-flex; align-items:center; justify-content:center; font-size:11px; font-weight:700;">P</span>' +
      '<strong style="font-size:13px;">Pika Assistant</strong>' +
      '<span style="font-size:10.5px; color:var(--text-muted);">' +
      (isDeepSearchOn ? 'โหมดค้นคว้าเชิงลึก (Deep Search)' : 'โหมดค้นหาทันใจ (Fast Mode)') +
      '</span>' +
      '</div>' +
      traceHtml +
      '<div id="liveBotAnswerBody" style="opacity:0.35; transition:opacity 0.35s ease;">กำลังค้นหาและเรียบเรียงคำตอบจากคลังวิกิ...</div>';

    messagesEl.appendChild(botDiv);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    updateMascotSpeech(
      'กำลังค้นหาข้อมูลจากคลังวิกิให้ครับ สังเกตในกล่อง <strong>Deep Search Reasoning Trace</strong> จะเห็นขั้นตอนการวางแผนและคัดกรองข้อมูลทีละขั้นเลยครับ',
      'think',
      'think',
      {},
      false
    );

    var stepsList = botDiv.querySelector('#liveTraceStepsList');
    var answerBody = botDiv.querySelector('#liveBotAnswerBody');

    if (isDeepSearchOn && stepsList) {
      var sIdx = 0;
      var stepTimer = setInterval(function () {
        if (sIdx < data.trace.length) {
          var t = data.trace[sIdx];
          var row = document.createElement('div');
          row.style.display = 'flex';
          row.style.justifyContent = 'space-between';
          row.innerHTML =
            '<span><strong style="color:#4ADE80; font-family:var(--font-mono);">[OK]</strong> ' +
            t.step +
            '</span><span style="color:var(--text-muted); font-family:var(--font-mono); font-size:10.5px;">' +
            t.time +
            '</span>';
          stepsList.appendChild(row);
          sIdx++;
        } else {
          clearInterval(stepTimer);
          revealFinalAnswer(answerBody, data, welcomeEl, convoEl, messagesEl, sessionTitleEl);
        }
      }, 360);
    } else {
      setTimeout(function () {
        revealFinalAnswer(answerBody, data, welcomeEl, convoEl, messagesEl, sessionTitleEl);
      }, 420);
    }
  }

  function revealFinalAnswer(answerBody, data, welcomeEl, convoEl, messagesEl, sessionTitleEl) {
    if (!answerBody) return;
    answerBody.style.opacity = '1';

    var chipsHtml = '<div style="display:flex; flex-wrap:wrap; gap:6px; margin-top:8px;">';
    for (var i = 0; i < data.followUps.length; i++) {
      chipsHtml +=
        '<button type="button" class="chrome-mini-btn follow-up-chip" data-followup="' +
        data.followUps[i] +
        '" style="font-weight:500;">คำถามแนะนำ: ' +
        data.followUps[i] +
        ' ↗</button>';
    }
    chipsHtml += '</div>';

    answerBody.innerHTML = data.answerHtml + chipsHtml;

    var chipBtns = answerBody.querySelectorAll('.follow-up-chip');
    for (var j = 0; j < chipBtns.length; j++) {
      chipBtns[j].addEventListener('click', function () {
        var q = this.getAttribute('data-followup');
        runLiveChatQuery(q, welcomeEl, convoEl, messagesEl, sessionTitleEl);
      });
    }

    if (messagesEl) messagesEl.scrollTop = messagesEl.scrollHeight;
    updateMascotSpeech(data.speech, 'happy', 'point', { side: -1 }, false);
  }

  // --------------------------------------------------------------------------
  // 10. BIND ALL SLIDE LIVE DEMOS (SCENES 1, 3, 4, 5, 6, 7, 8)
  // --------------------------------------------------------------------------
  function bindInteractiveDemos() {
    // Scene 1: Greet Pika
    var btnHeroGreet = document.getElementById('btnHeroGreet');
    if (btnHeroGreet) {
      btnHeroGreet.addEventListener('click', function () {
        updateMascotSpeech(
          'สวัสดีทุกคนครับ วันนี้ผมนำหน้าเว็บจริงของ <strong>Pika Wiki</strong> มาให้ทดลองเล่นสดๆ บนเวทีเลยครับ!',
          'happy',
          'cheer',
          {},
          true
        );
      });
    }

    // Scene 3: Upload Note Live Demo
    var btnRunIngest = document.getElementById('btnRunIngestDemo');
    if (btnRunIngest) {
      btnRunIngest.addEventListener('click', function () {
        runLiveIngestSimulation(
          document.getElementById('demoIngestFill'),
          document.getElementById('demoIngestPct'),
          document.getElementById('demoIngestStageLabel'),
          document.getElementById('demoIngestLog')
        );
      });
    }

    var dropZone = document.getElementById('demoDropZone');
    var fileBundles = [
      'เลือกแล้ว 5 ไฟล์: TOR_Main.pdf, Spec_Cloud.docx, BOQ_Matrix.xlsx, SLA_Diagram.pdf, Meeting_Note.jot',
      'เลือกแล้ว 3 ไฟล์: RFP_Banking_Security_2026.pdf, Network_Topology_Scan.png, Compliance_Matrix.xlsx',
      'เลือกแล้ว 4 ไฟล์: Proposal_DataPlatform_Final.docx, Pricing_Comparison.csv, Architecture_Spec.pdf, Kickoff.jot'
    ];
    var bundleIdx = 0;
    if (dropZone) {
      dropZone.addEventListener('click', function () {
        bundleIdx = (bundleIdx + 1) % fileBundles.length;
        var pill = document.getElementById('demoSelectedFilesPill');
        if (pill) pill.textContent = fileBundles[bundleIdx];
        updateMascotSpeech(
          'เปลี่ยนชุดไฟล์ตัวอย่างที่จะอัปโหลดเรียบร้อยครับ กดปุ่ม <strong>Upload and Process Note</strong> เพื่อเริ่มสกัดข้อมูลได้เลยครับ',
          'happy',
          null,
          {},
          false
        );
      });
    }

    // Scene 4: Switch between Relationship Graph & File Browser
    var btnGraphView = document.getElementById('btnSwitchGraphView');
    var btnFbView = document.getElementById('btnSwitchFbView');
    var paneGraph = document.getElementById('slidePaneGraph');
    var paneFb = document.getElementById('slidePaneFb');
    var chromeUrl4 = document.getElementById('slideGraphChromeUrl');

    if (btnGraphView && btnFbView && paneGraph && paneFb) {
      btnGraphView.addEventListener('click', function () {
        paneGraph.style.display = 'block';
        paneFb.style.display = 'none';
        btnGraphView.classList.add('active');
        btnFbView.classList.remove('active');
        if (chromeUrl4) chromeUrl4.textContent = 'Pika Wiki — Relationship Graph';
        updateMascotSpeech(
          'กลับมาที่มุมมอง <strong>Relationship Graph</strong> ครับ ลองใช้เมาส์ลากโหนดในกราฟเพื่อดูความเชื่อมโยงได้เลยครับ',
          'look',
          'point',
          { side: 1 },
          false
        );
      });

      btnFbView.addEventListener('click', function () {
        paneGraph.style.display = 'none';
        paneFb.style.display = 'block';
        btnFbView.classList.add('active');
        btnGraphView.classList.remove('active');
        if (chromeUrl4) chromeUrl4.textContent = 'Pika Wiki — File Browser';
        updateMascotSpeech(
          'นี่คือหน้า <strong>File Browser</strong> ของจริงครับ คลิกเลือกชื่อไฟล์ด้านซ้ายเพื่ออ่านบทความวิกิและตารางที่สกัดได้ด้านขวาได้เลยครับ',
          'happy',
          'point',
          { side: 1 },
          false
        );
      });
    }

    var fbItems = document.querySelectorAll('#slideFbTree .real-fb-item');
    for (var f = 0; f < fbItems.length; f++) {
      fbItems[f].addEventListener('click', function () {
        for (var k = 0; k < fbItems.length; k++) fbItems[k].classList.remove('active');
        this.classList.add('active');
        var docKey = this.getAttribute('data-fb-doc');
        var art = WIKI_ARTICLES[docKey];
        if (art) {
          var fnEl = document.getElementById('slideFbFilename');
          var bodyEl = document.getElementById('slideFbBody');
          if (fnEl) fnEl.textContent = art.path;
          if (bodyEl) {
            bodyEl.innerHTML =
              '<div style="font-family:var(--font-mono); font-size:10.5px; color:var(--text-muted); background:var(--surface-2); padding:6px 10px; border-radius:7px; margin-bottom:8px;">' +
              art.props +
              '</div>' +
              '<h3 style="font-size:14.5px; font-weight:700; margin-bottom:6px;">' +
              art.title +
              '</h3>' +
              art.bodyHtml;
          }
          updateMascotSpeech(art.speech, 'happy', 'point', { side: 1 }, false);
        }
      });
    }

    // Scene 5: Chat with Pika Live Demo
    var welcomeEl = document.getElementById('slideChatWelcome');
    var convoEl = document.getElementById('slideChatConvo');
    var messagesEl = document.getElementById('slideChatMessages');
    var sessionTitleEl = document.getElementById('slideChatSessionTitle');

    var bentoCards = document.querySelectorAll('#slideChatWelcome [data-chat-prompt]');
    for (var b = 0; b < bentoCards.length; b++) {
      bentoCards[b].addEventListener('click', function () {
        var prompt = this.getAttribute('data-chat-prompt');
        runLiveChatQuery(prompt, welcomeEl, convoEl, messagesEl, sessionTitleEl);
      });
    }

    var btnWelcomeSend = document.getElementById('btnSlideWelcomeSend');
    var welcomeInput = document.getElementById('slideWelcomeInput');
    if (btnWelcomeSend && welcomeInput) {
      btnWelcomeSend.addEventListener('click', function () {
        var q = welcomeInput.value.trim() || 'สรุปภาพรวมโครงการ Cloud ERP 2026 และเงื่อนไข SLA สำคัญ';
        welcomeInput.value = '';
        runLiveChatQuery(q, welcomeEl, convoEl, messagesEl, sessionTitleEl);
      });
      welcomeInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          btnWelcomeSend.click();
        }
      });
    }

    var btnConvoSend = document.getElementById('btnSlideConvoSend');
    var convoInput = document.getElementById('slideConvoInput');
    if (btnConvoSend && convoInput) {
      btnConvoSend.addEventListener('click', function () {
        var q = convoInput.value.trim() || 'เปรียบเทียบสเปกเทคนิค Cloud Data Platform และงบประมาณอ้างอิง';
        convoInput.value = '';
        runLiveChatQuery(q, welcomeEl, convoEl, messagesEl, sessionTitleEl);
      });
      convoInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          btnConvoSend.click();
        }
      });
    }

    var btnRunLoop = document.getElementById('btnRunAgentLoop');
    if (btnRunLoop) {
      btnRunLoop.addEventListener('click', function () {
        isDeepSearchOn = true;
        var deepBtn = document.getElementById('btnToggleDeepPill');
        if (deepBtn) {
          deepBtn.classList.add('active');
          deepBtn.querySelector('span').textContent = 'Deep search: ON';
        }
        runLiveChatQuery(
          'สรุปภาพรวมโครงการ Cloud ERP 2026 และเงื่อนไข SLA สำคัญ',
          welcomeEl,
          convoEl,
          messagesEl,
          sessionTitleEl
        );
      });
    }

    function resetSlideChatToWelcome() {
      if (welcomeEl) welcomeEl.style.display = 'flex';
      if (convoEl) convoEl.classList.remove('active');
      if (sessionTitleEl) sessionTitleEl.textContent = 'New chat';
      updateMascotSpeech(
        'กลับมาที่หน้าต้อนรับ <strong>New chat</strong> แล้วครับ ลองคลิกเลือกการ์ด Bento ทั้ง 3 ใบ หรือพิมพ์คำถามในช่องด้านล่างได้เลยครับ',
        'happy',
        null,
        {},
        false
      );
    }

    var btnResetWelcome = document.getElementById('btnResetChatWelcome');
    var btnSlideNewChat = document.getElementById('btnSlideNewChat');
    if (btnResetWelcome) btnResetWelcome.addEventListener('click', resetSlideChatToWelcome);
    if (btnSlideNewChat) btnSlideNewChat.addEventListener('click', resetSlideChatToWelcome);

    var btnToggleDeep = document.getElementById('btnToggleDeepPill');
    if (btnToggleDeep) {
      btnToggleDeep.addEventListener('click', function () {
        isDeepSearchOn = !isDeepSearchOn;
        btnToggleDeep.classList.toggle('active', isDeepSearchOn);
        btnToggleDeep.querySelector('span').textContent = isDeepSearchOn
          ? 'Deep search: ON'
          : 'Deep search: OFF';
        updateMascotSpeech(
          isDeepSearchOn
            ? 'เปิด <strong>Deep search</strong> แล้วครับ ผมจะวางแผนค้นหาหลายมุมมองและตรวจสอบความครบถ้วนก่อนสรุปคำตอบครับ'
            : 'ปิด Deep search เพื่อใช้<strong>โหมดค้นหาทันใจ</strong>แล้วครับ เหมาะสำหรับถามข้อมูลสั้นๆ ที่ต้องการคำตอบทันทีครับ',
          'happy',
          null,
          {},
          false
        );
      });
    }

    // Scene 6: Failover Banner & Surgical Unlearn Live Demo
    var btnFailover = document.getElementById('btnTestFailover');
    var failoverBanner = document.getElementById('demoFailoverBanner');
    var btnCloseBanner = document.getElementById('btnCloseFailoverBanner');

    if (btnFailover && failoverBanner) {
      btnFailover.addEventListener('click', function () {
        failoverBanner.style.display = 'flex';
        updateMascotSpeech(
          'เมื่อโมเดลหลักตอบช้าหรือโควตาเต็ม แถบแจ้งเตือนด้านบนจะแสดงสถานะการสลับไปใช้<strong>โมเดลสำรองอัตโนมัติ</strong> โดยที่ผู้ใช้งานไม่ต้องกดเริ่มใหม่เลยครับ',
          'surprised',
          'point',
          { side: 1 },
          false
        );
      });
    }
    if (btnCloseBanner && failoverBanner) {
      btnCloseBanner.addEventListener('click', function () {
        failoverBanner.style.display = 'none';
      });
    }

    function runSurgicalUnlearnLive(statusBoxEl) {
      if (!statusBoxEl) return;
      if (unlearnDemoTimer) clearInterval(unlearnDemoTimer);

      var uStages = [
        'ขั้นที่ 1/6: ตรวจสอบ Provenance Map ของไฟล์ TOR_Cloud_ERP_Draft_Old.pdf...',
        'ขั้นที่ 2/6: ลบหน้าวิกิ projects/cloud-erp-draft-old.md ที่มีไฟล์นี้เป็นแหล่งข้อมูลเดียว...',
        'ขั้นที่ 3/6: AI กำลังเขียนหน้า clients/scb-enterprise.md และ syntheses/boq-pricing-bench.md ใหม่โดยคงข้อมูลจากไฟล์อื่นไว้...',
        'ขั้นที่ 4/6: ปรับปรุงลิงก์เชื่อมโยง [[wikilinks]] และลบเวกเตอร์เฉพาะของไฟล์นี้ออกจาก Qdrant...',
        'ขั้นที่ 5/6: อัปเดตแผนผัง Relationship Graph และสารบัญคลังความรู้...',
        'เสร็จสมบูรณ์ (6/6): ถอนความรู้จากไฟล์ TOR_Cloud_ERP_Draft_Old.pdf ออกสะอาดหมดจด พร้อมบันทึก Audit Log เรียบร้อย!'
      ];

      var s = 0;
      statusBoxEl.style.color = '#38BDF8';
      statusBoxEl.innerHTML = '<strong>กำลังดำเนินการ:</strong> ' + uStages[0];
      updateMascotSpeech(
        'กำลังถอนความรู้เฉพาะที่มาจากไฟล์ร่างชุดเก่าออกครับ สังเกตว่าหน้าที่ใช้ข้อมูลร่วมกับไฟล์อื่น ผมจะช่วยเรียบเรียงใหม่ให้โดยข้อมูลสำคัญไม่หายครับ',
        'think',
        'think',
        {},
        false
      );

      unlearnDemoTimer = setInterval(function () {
        s++;
        if (s >= uStages.length) {
          clearInterval(unlearnDemoTimer);
          unlearnDemoTimer = null;
          statusBoxEl.style.color = '#4ADE80';
          updateMascotSpeech(
            'ถอนข้อมูลเสร็จสมบูรณ์ทั้ง 6 ขั้นตอนแล้วครับ! ข้อมูลจากไฟล์เก่าถูกลบออกหมดจด ส่วนเนื้อหาจากไฟล์อื่นยังคงอยู่ครบถ้วนครับ',
            'happy',
            'cheer',
            {},
            false
          );
          return;
        }
        statusBoxEl.innerHTML = '<strong>' + uStages[s] + '</strong>';
      }, 950);
    }

    var btnUnlearnTop = document.getElementById('btnRunUnlearnDemo');
    var btnUnlearnBox = document.getElementById('btnConfirmUnlearnBox');
    var statusBox = document.getElementById('demoUnlearnStatusBox');
    if (btnUnlearnTop) {
      btnUnlearnTop.addEventListener('click', function () {
        runSurgicalUnlearnLive(statusBox);
      });
    }
    if (btnUnlearnBox) {
      btnUnlearnBox.addEventListener('click', function () {
        runSurgicalUnlearnLive(statusBox);
      });
    }

    // Scene 7: New Project Simulation
    var btnSimProj = document.getElementById('btnSimNewProject');
    if (btnSimProj) {
      btnSimProj.addEventListener('click', function () {
        openLiveWorkbench('projects');
      });
    }


  }

  // --------------------------------------------------------------------------
  // 11. FULL-SCREEN 1:1 INTERACTIVE WORKBENCH MODAL (#liveDemoModal)
  // --------------------------------------------------------------------------
  function openLiveWorkbench(initialTab) {
    var modal = document.getElementById('liveDemoModal');
    if (!modal) return;
    modal.classList.add('open');
    document.body.classList.add('live-demo-open');
    if (isAutoPlaying) {
      clearAutoPlayTimer();
    }
    renderWorkbenchTab(initialTab || 'report');
  }

  function closeLiveWorkbench() {
    var modal = document.getElementById('liveDemoModal');
    if (!modal || !modal.classList.contains('open')) return;
    modal.classList.remove('open');
    document.body.classList.remove('live-demo-open');
    if (isAutoPlaying) {
      scheduleNextAutoPlaySlide();
    }
    updateMascotSpeech(
      'กลับมาที่หน้าสไลด์นำเสนอแล้วครับ สามารถเลื่อนชมฉากถัดไปได้เลยครับ',
      'happy',
      null,
      {},
      true
    );
  }

  function renderWorkbenchTab(tabName) {
    var stage = document.getElementById('wbDynamicStage');
    var crumb = document.getElementById('wbBreadcrumb');
    if (!stage) return;

    var sbItems = document.querySelectorAll('.real-floating-sidebar [data-wb-tab]');
    for (var i = 0; i < sbItems.length; i++) {
      sbItems[i].classList.toggle('active', sbItems[i].getAttribute('data-wb-tab') === tabName);
    }

    if (tabName === 'analyze') {
      if (crumb) crumb.textContent = 'Pika Wiki / Upload Note (#analyze)';
      stage.innerHTML =
        '<div style="max-width:920px; margin:0 auto;">' +
        '<div class="real-upload-header" style="margin-bottom:16px;">' +
        '<div class="real-upload-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg></div>' +
        '<div><div style="font-size:11px; color:var(--text-muted); font-weight:600;">PIKA WIKI</div><h2 style="font-size:22px; font-weight:700;">Upload Note</h2><div style="font-size:12.5px; color:var(--text-secondary);">Turn meeting notes and documents into wiki pages the whole team can search.</div></div>' +
        '</div>' +
        '<div class="real-upload-card">' +
        '<div>' +
        '<div style="font-size:15px; font-weight:700; margin-bottom:4px;">File Metadata</div>' +
        '<div style="font-size:12px; color:var(--text-muted); margin-bottom:14px;">Information to organize this note in the wiki.</div>' +
        '<div class="real-field"><label>Upload into project *</label><select class="real-premium-input"><option>enterprise-knowledge (คลังความรู้กลางระดับองค์กร)</option><option>cloud-migration-2026</option></select></div>' +
        '<div class="real-field"><label>Author *</label><input type="text" class="real-premium-input" value="Admin"/></div>' +
        '<div class="real-field"><label>Title (optional)</label><input type="text" class="real-premium-input" value="เอกสารข้อกำหนดและสเปกเทคนิค Cloud Data Platform 2026"/></div>' +
        '</div>' +
        '<div>' +
        '<div class="real-drop-zone" id="wbDropZone" style="padding:26px 18px;">' +
        '<div class="real-drop-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg></div>' +
        '<div style="font-size:14px; font-weight:600;">Click or drag files here</div>' +
        '<div style="font-size:12px; color:var(--text-muted); margin-top:4px;">Supports .txt, .md, .csv, .xlsx, .docx, .pptx, .pdf, .jot</div>' +
        '<div style="margin-top:10px; display:inline-block; background:rgba(37,99,235,0.18); border:1px solid rgba(96,165,250,0.4); color:#93C5FD; font-size:11.5px; padding:4px 12px; border-radius:999px;">เลือกแล้ว 5 ไฟล์พร้อมประมวลผลขนาน 5 ช่องทาง</div>' +
        '</div>' +
        '<button class="real-upload-btn" id="wbRunIngestBtn" style="margin-top:14px;">Upload and Process Note (เริ่มสกัดข้อมูลสด)</button>' +
        '<div class="real-ingest-prog"><div class="real-ingest-prog-head"><span id="wbIngestLabel">พร้อมประมวลผล</span><span id="wbIngestPct" style="font-weight:700; color:#38BDF8;">0%</span></div><div class="real-ingest-prog-track"><div class="real-ingest-prog-fill" id="wbIngestFill"></div></div></div>' +
        '<div class="real-ingest-log" id="wbIngestLog" style="max-height:140px;"><div class="real-log-line info">กดปุ่ม Upload and Process Note เพื่อดูการทำงานจริง...</div></div>' +
        '</div>' +
        '</div>' +
        '</div>';

      var wbBtn = document.getElementById('wbRunIngestBtn');
      if (wbBtn) {
        wbBtn.addEventListener('click', function () {
          runLiveIngestSimulation(
            document.getElementById('wbIngestFill'),
            document.getElementById('wbIngestPct'),
            document.getElementById('wbIngestLabel'),
            document.getElementById('wbIngestLog')
          );
        });
      }
      updateMascotSpeech(
        'นี่คือหน้า <strong>Upload Note</strong> แบบเต็มจอครับ กดปุ่มสีน้ำเงินเพื่อดูการสกัดไฟล์พร้อมกัน 5 ช่องทางได้เลยครับ',
        'happy',
        'point',
        { side: -1 },
        true
      );
    } else if (tabName === 'report') {
      if (crumb) crumb.textContent = 'Pika Wiki / Chat (#report)';
      stage.innerHTML =
        '<div class="real-chat-shell" style="height:100%; max-width:900px; margin:0 auto;">' +
        '<div class="real-chat-welcome" id="wbChatWelcome">' +
        '<svg width="42" height="42" viewBox="0 0 24 24" fill="none" style="margin-bottom:8px;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="#38BDF8" stroke="#FFFFFF" stroke-width="0.8"/></svg>' +
        '<div style="font-size:13.5px; font-weight:600; color:#93C5FD;">Good afternoon, Admin</div>' +
        '<div style="font-size:26px; font-weight:700; margin:4px 0 6px;">How Can I Assist You Today?</div>' +
        '<div style="font-size:12.5px; color:var(--text-muted); margin-bottom:14px;">ค้นหาข้อมูล สรุปสาระสำคัญของเอกสาร หรือเริ่มต้นแชทสอบถามคลังความรู้ได้ทันที</div>' +
        '<div class="real-bento-grid" style="max-width:640px;">' +
        '<div class="real-bento-card" data-wb-q="สรุปภาพรวมโครงการ Cloud ERP 2026 และเงื่อนไข SLA สำคัญ" style="min-height:170px; display:flex; flex-direction:column; justify-content:space-between;"><div><div class="real-bento-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg></div><div style="font-size:15px; font-weight:600; margin-bottom:4px;">Chat with Pika</div><div style="font-size:11.5px; color:var(--text-muted);">ถาม-ตอบ สรุปข้อมูลโครงการ วิเคราะห์ข้อกำหนด และสืบค้นคำตอบจากคลังความรู้ส่วนกลาง</div></div><span style="align-self:flex-start; padding:6px 16px; border-radius:999px; background:linear-gradient(135deg,#3B82F6,#1D4ED8); color:#fff; font-size:12px; font-weight:600;">Ask Pika ↗</span></div>' +
        '<div style="display:flex; flex-direction:column; gap:10px;">' +
        '<div class="real-bento-card" data-wb-q="ช่วยสรุปสาระสำคัญ ขอบเขตงาน และกำหนดการสำคัญจากเอกสารล่าสุด"><div style="font-size:14px; font-weight:600; margin-bottom:3px;">วิเคราะห์เงื่อนไข &amp; ข้อกำหนดโครงการ</div><div style="font-size:11.5px; color:var(--text-muted);">สรุปสาระสำคัญ สกัดขอบเขตงาน เกณฑ์ประเมิน และกำหนดการสำคัญ</div></div>' +
        '<div class="real-bento-card" data-wb-q="เปรียบเทียบสเปกเทคนิค Cloud Data Platform และงบประมาณอ้างอิง"><div style="font-size:14px; font-weight:600; margin-bottom:3px;">สืบค้น Solution &amp; สถาปัตยกรรมระบบ</div><div style="font-size:11.5px; color:var(--text-muted);">ค้นหาแนวทางการออกแบบ โครงสร้างระบบ มาตรฐานเทคโนโลยี และเคสจริง</div></div>' +
        '</div>' +
        '</div>' +
        '<div class="real-pill-bar" style="max-width:640px; margin-top:8px;"><input type="text" class="real-pill-input" id="wbWelcomeInput" placeholder="Ask Pika anything..."/><button class="real-pill-send" id="wbWelcomeSend">Send ↗</button></div>' +
        '</div>' +
        '<div class="real-chat-convo" id="wbChatConvo">' +
        '<div class="real-chat-messages" id="wbChatMessages"></div>' +
        '<div class="real-composer-wrap"><div class="real-composer-card"><span class="real-deepsearch-pill active">Deep search: ON</span><input type="text" class="real-pill-input" id="wbConvoInput" placeholder="Ask away — Pika will find it..."/><button class="real-pill-send" id="wbConvoSend">Send</button></div></div>' +
        '</div>' +
        '</div>';

      var wbWelcome = document.getElementById('wbChatWelcome');
      var wbConvo = document.getElementById('wbChatConvo');
      var wbMsgs = document.getElementById('wbChatMessages');
      var cards = stage.querySelectorAll('[data-wb-q]');
      for (var c = 0; c < cards.length; c++) {
        cards[c].addEventListener('click', function () {
          runLiveChatQuery(this.getAttribute('data-wb-q'), wbWelcome, wbConvo, wbMsgs, crumb);
        });
      }
      var wbWSend = document.getElementById('wbWelcomeSend');
      var wbWIn = document.getElementById('wbWelcomeInput');
      if (wbWSend && wbWIn) {
        wbWSend.addEventListener('click', function () {
          var q = wbWIn.value.trim() || 'สรุปภาพรวมโครงการ Cloud ERP 2026 และเงื่อนไข SLA สำคัญ';
          runLiveChatQuery(q, wbWelcome, wbConvo, wbMsgs, crumb);
        });
      }
      var wbCSend = document.getElementById('wbConvoSend');
      var wbCIn = document.getElementById('wbConvoInput');
      if (wbCSend && wbCIn) {
        wbCSend.addEventListener('click', function () {
          var q = wbCIn.value.trim() || 'เปรียบเทียบสเปกเทคนิค Cloud Data Platform และงบประมาณอ้างอิง';
          wbCIn.value = '';
          runLiveChatQuery(q, wbWelcome, wbConvo, wbMsgs, crumb);
        });
      }
      updateMascotSpeech(
        'นี่คือหน้า <strong>Chat with Pika</strong> แบบเต็มจอครับ คลิกที่การ์ด Bento หรือพิมพ์คำถามด้านล่างได้เลยครับ',
        'happy',
        'wave',
        {},
        true
      );
    } else if (tabName === 'history') {
      if (crumb) crumb.textContent = 'Pika Wiki / File Browser (#history)';
      var art0 = WIKI_ARTICLES['proj-cloud'];
      stage.innerHTML =
        '<div style="max-width:960px; margin:0 auto;">' +
        '<h2 style="font-size:22px; font-weight:700; margin-bottom:4px;">File Browser</h2>' +
        '<div style="font-size:12.5px; color:var(--text-secondary); margin-bottom:12px;">Browse, review, and clean up every wiki page, source file, and metadata record.</div>' +
        '<div class="real-fb-split" style="height:410px; padding:0;">' +
        '<div class="real-fb-tree" id="wbFbTree">' +
        '<div style="font-size:10.5px; font-weight:700; color:var(--text-muted); padding:4px 6px;">WIKI PAGES</div>' +
        '<div class="real-fb-item active" data-wb-doc="proj-cloud">projects/cloud-erp-2026.md</div>' +
        '<div class="real-fb-item" data-wb-doc="ent-bank">clients/scb-enterprise.md</div>' +
        '<div class="real-fb-item" data-wb-doc="concept-sec">solutions/zero-trust-arch.md</div>' +
        '<div class="real-fb-item" data-wb-doc="syn-price">syntheses/boq-pricing-bench.md</div>' +
        '</div>' +
        '<div class="real-fb-viewer">' +
        '<div class="real-fb-viewer-bar"><span id="wbFbTitle">' +
        art0.path +
        '</span><span style="color:#38BDF8; font-size:11px;">Markdown Preview</span></div>' +
        '<div class="real-fb-viewer-body" id="wbFbBody">' +
        '<div style="font-family:var(--font-mono); font-size:11px; color:var(--text-muted); background:var(--surface-2); padding:7px 10px; border-radius:7px; margin-bottom:10px;">' +
        art0.props +
        '</div>' +
        '<h3 style="font-size:16px; font-weight:700; margin-bottom:8px;">' +
        art0.title +
        '</h3>' +
        art0.bodyHtml +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';

      var wbItems = stage.querySelectorAll('[data-wb-doc]');
      for (var w = 0; w < wbItems.length; w++) {
        wbItems[w].addEventListener('click', function () {
          for (var z = 0; z < wbItems.length; z++) wbItems[z].classList.remove('active');
          this.classList.add('active');
          var a = WIKI_ARTICLES[this.getAttribute('data-wb-doc')];
          if (a) {
            document.getElementById('wbFbTitle').textContent = a.path;
            document.getElementById('wbFbBody').innerHTML =
              '<div style="font-family:var(--font-mono); font-size:11px; color:var(--text-muted); background:var(--surface-2); padding:7px 10px; border-radius:7px; margin-bottom:10px;">' +
              a.props +
              '</div><h3 style="font-size:16px; font-weight:700; margin-bottom:8px;">' +
              a.title +
              '</h3>' +
              a.bodyHtml;
            updateMascotSpeech(a.speech, 'happy', 'point', { side: -1 }, true);
          }
        });
      }
    } else if (tabName === 'unlearn') {
      if (crumb) crumb.textContent = 'Pika Wiki / Unlearn Provenance Map (#raw-unlearn-modal)';
      stage.innerHTML =
        '<div style="max-width:860px; margin:0 auto;">' +
        '<h2 style="font-size:22px; font-weight:700; margin-bottom:4px;">Surgical Unlearn & Provenance Map</h2>' +
        '<div style="font-size:12.5px; color:var(--text-secondary); margin-bottom:14px;">ตรวจสอบผลกระทบรายหน้าวิกิและถอนความรู้เฉพาะไฟล์ออกจากระบบอย่างปลอดภัย</div>' +
        '<div style="background:var(--surface); border:1px solid var(--border); border-radius:16px; padding:20px;">' +
        '<div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:14px;">' +
        '<div style="background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); border-radius:10px; padding:12px;"><div style="font-size:12px; font-weight:700; color:#F87171; margin-bottom:4px;">หน้าที่ต้องลบทิ้งทั้งหมด (1 หน้า)</div><div style="font-family:var(--font-mono); font-size:12px;">• projects/cloud-erp-draft-old.md</div></div>' +
        '<div style="background:rgba(56,189,248,0.1); border:1px solid rgba(56,189,248,0.3); border-radius:10px; padding:12px;"><div style="font-size:12px; font-weight:700; color:#38BDF8; margin-bottom:4px;">หน้าที่ AI จะเขียนใหม่โดยคงข้อมูลไฟล์อื่นไว้ (2 หน้า)</div><div style="font-family:var(--font-mono); font-size:12px;">• clients/scb-enterprise.md<br/>• syntheses/boq-pricing-bench.md</div></div>' +
        '</div>' +
        '<button class="real-upload-btn" id="wbRunUnlearnBtn" style="background:linear-gradient(135deg,#DC2626,#B91C1C); border-color:#F87171;">ยืนยันการถอนความรู้ (Unlearn DELETE)</button>' +
        '<div id="wbUnlearnStatus" style="margin-top:12px; padding:10px 14px; border-radius:10px; background:var(--surface-2); font-size:12.5px; color:var(--text-secondary);">พร้อมสาธิตการถอนข้อมูล 6 ขั้นตอน</div>' +
        '</div>' +
        '</div>';

      var wbUnBtn = document.getElementById('wbRunUnlearnBtn');
      if (wbUnBtn) {
        wbUnBtn.addEventListener('click', function () {
          var stEl = document.getElementById('wbUnlearnStatus');
          stEl.style.color = '#4ADE80';
          stEl.innerHTML =
            '<strong>ดำเนินการสำเร็จครบ 6 ขั้นตอน:</strong> ลบหน้า projects/cloud-erp-draft-old.md และเขียนหน้า clients/scb-enterprise.md กับ syntheses/boq-pricing-bench.md ใหม่พร้อมอัปเดตฐานข้อมูลค้นหาเรียบร้อย!';
          updateMascotSpeech(
            'ถอนความรู้เฉพาะไฟล์ที่ต้องการลบออกเรียบร้อยแล้วครับ เนื้อหาสำคัญจากไฟล์อื่นยังคงอยู่ครบถ้วนครับ',
            'happy',
            'cheer',
            {},
            true
          );
        });
      }
    } else if (tabName === 'projects') {
      if (crumb) crumb.textContent = 'Pika Wiki / Projects (#projects)';
      stage.innerHTML =
        '<div style="max-width:920px; margin:0 auto;">' +
        '<h2 style="font-size:22px; font-weight:700; margin-bottom:4px;">Projects</h2>' +
        '<div style="font-size:12.5px; color:var(--text-secondary); margin-bottom:16px;">Group knowledge by engagement and control who can upload, read, and search each one.</div>' +
        '<div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">' +
        '<div style="background:var(--surface); border:1px solid var(--border); border-radius:16px; padding:18px;"><div style="display:flex; justify-content:space-between; margin-bottom:6px;"><span style="font-family:var(--font-mono); color:#38BDF8; font-weight:600;">enterprise-knowledge</span><span style="color:#4ADE80; font-size:11px; font-weight:700;">OWNER</span></div><div style="font-size:16px; font-weight:700; margin-bottom:6px;">คลังความรู้กลางระดับองค์กร</div><p style="font-size:12.5px; color:var(--text-secondary); margin-bottom:10px;">รวบรวมเอกสารมาตรฐาน ข้อกำหนดระบบ และบทสรุปราคาอ้างอิงสำหรับทุกทีม</p><div style="font-size:11.5px; color:var(--text-muted);">42 หน้าวิกิ · สมาชิก 18 คน · เปิดใช้งาน MCP แล้ว</div></div>' +
        '<div style="background:var(--surface); border:1px solid var(--border); border-radius:16px; padding:18px;"><div style="display:flex; justify-content:space-between; margin-bottom:6px;"><span style="font-family:var(--font-mono); color:#A78BFA; font-weight:600;">cloud-migration-2026</span><span style="color:#38BDF8; font-size:11px; font-weight:700;">MEMBER</span></div><div style="font-size:16px; font-weight:700; margin-bottom:6px;">โครงการ Cloud ERP & Data Platform</div><p style="font-size:12.5px; color:var(--text-secondary); margin-bottom:10px;">พื้นที่เฉพาะกิจสำหรับทีมเสนอราคา Cloud ERP พร้อมสิทธิ์ตรวจสอบเอกสารแยกรายทีม</p><div style="font-size:11.5px; color:var(--text-muted);">19 หน้าวิกิ · สมาชิก 7 คน · ค้นหาข้ามโครงการได้</div></div>' +
        '</div>' +
        '</div>';
    }
  }

  function bindWorkbenchModal() {
    var btnOpen = document.getElementById('btnOpenLiveDemo');
    if (btnOpen) {
      btnOpen.addEventListener('click', function () {
        var defaultTab = 'report';
        if (currentScene === 3) defaultTab = 'analyze';
        else if (currentScene === 4) defaultTab = 'history';
        else if (currentScene === 6) defaultTab = 'unlearn';
        else if (currentScene === 7) defaultTab = 'projects';
        openLiveWorkbench(defaultTab);
      });
    }

    var openTriggers = document.querySelectorAll('[data-open-workbench]');
    for (var i = 0; i < openTriggers.length; i++) {
      openTriggers[i].addEventListener('click', function () {
        var tab = this.getAttribute('data-open-workbench') || 'report';
        if (tab === 'graph') tab = 'history';
        openLiveWorkbench(tab);
      });
    }

    var btnClose = document.getElementById('btnCloseLiveDemo');
    if (btnClose) btnClose.addEventListener('click', closeLiveWorkbench);

    var sbTabs = document.querySelectorAll('.real-floating-sidebar [data-wb-tab]');
    for (var j = 0; j < sbTabs.length; j++) {
      sbTabs[j].addEventListener('click', function () {
        renderWorkbenchTab(this.getAttribute('data-wb-tab'));
      });
    }

    var recentChatBtns = document.querySelectorAll('[data-wb-chat-q]');
    for (var r = 0; r < recentChatBtns.length; r++) {
      recentChatBtns[r].addEventListener('click', function () {
        var q = this.getAttribute('data-wb-chat-q');
        renderWorkbenchTab('report');
        setTimeout(function () {
          runLiveChatQuery(
            q,
            document.getElementById('wbChatWelcome'),
            document.getElementById('wbChatConvo'),
            document.getElementById('wbChatMessages'),
            document.getElementById('wbBreadcrumb')
          );
        }, 60);
      });
    }
  }

  // --------------------------------------------------------------------------
  // 11B. TECHNICAL ARCHITECTURE DEEP-DIVE MODAL (#kpiTechModal)
  // --------------------------------------------------------------------------
  var KPI_TECH_DATA = {
    'kpi-w8': {
      eyebrow: 'ENGINEERING TIMELINE & ARCHITECTURE EVOLUTION',
      title: '8 สัปดาห์: วิวัฒนาการสถาปัตยกรรม (Evolutionary Cycles)',
      subtitle: 'จากพิมพ์เขียวฐานความรู้ C4 Model สู่แพลตฟอร์ม Enterprise-Grade ครบวงจร 41 Commits ต่อเนื่อง',
      badges: [
        'C4 Architecture Model',
        'PBKDF2-HMAC-SHA256',
        'Cytoscape Cola Physics',
        'YAML Schema Linting',
        'Staging & Review Queue',
        '41 Production Commits'
      ],
      points: [
        {
          title: 'สถาปัตยกรรมแบบแยกเลเยอร์อิสระ (C4 Modular Separation)',
          desc: 'แยกเลเยอร์การทำงานอย่างเข้มงวดระหว่าง Ingestion Engine, FastMCP Server, และ Interactive UI Client ทำให้ปรับปรุงโมเดลหรือสับเปลี่ยนฐานข้อมูลได้โดยไม่กระทบส่วนอื่น'
        },
        {
          title: 'ระบบยืนยันตัวตนและการเข้าถึงระดับองค์กร (Zero-Trust Local Auth & RBAC)',
          desc: 'ป้องกันความปลอดภัยด้วยการ Hash รหัสผ่าน PBKDF2 (100,000 รอบ) พร้อม Salt แบบสุ่ม แยกสิทธิ์ Multi-Project และผูก Session Token รายแท็บเบราว์เซอร์อย่างปลอดภัย'
        },
        {
          title: 'ระบบตรวจสอบโครงสร้างเอกสารเชิงรุก (Strict Schema Validation)',
          desc: 'เอกสารทุกฉบับต้องผ่านการตรวจสอบ Frontmatter บังคับ (author, date, tags, project) พร้อมเข้าคิว Staging Area เพื่อให้ทีมงานตรวจสอบก่อน Publish เข้าสู่คลังหลัก ป้องกัน Data Pollution'
        }
      ],
      benchmarks: [
        { val: '8 สัปดาห์', lbl: 'ระยะเวลาพัฒนาสมบูรณ์' },
        { val: '41 Commits', lbl: 'Production Iterations' },
        { val: '100%', lbl: 'Zero Data Loss' },
        { val: '< 150 ms', lbl: 'Graph Render Latency' }
      ],
      mascot: {
        text: 'นี่คือบันทึกวิวัฒนาการทางเทคนิคตลอด 8 สัปดาห์ครับ เราเริ่มต้นจากพิมพ์เขียว C4 Model และพัฒนาต่อเนื่อง 41 รอบ จนได้ระบบระดับองค์กรที่มีความปลอดภัยและเสถียรภาพสูงสุดครับ',
        emotion: 'happy',
        action: 'wave'
      }
    },
    'kpi-5lane': {
      eyebrow: 'CONCURRENT INGESTION & VISION PIPELINE',
      title: '5-Lane Engine: ระบบสกัดข้อมูลคู่ขนานความเร็วสูง',
      subtitle: 'สกัดและแปลงเอกสาร PDF / Excel / Word ขนาดใหญ่พร้อมกัน 5 ช่องทาง ด้วย ThreadPoolExecutor และ Vision LLM',
      badges: [
        'ThreadPoolExecutor (5 Lanes)',
        'Vision LLM OCR Engine',
        'PyMuPDF Text Stream',
        'pdfplumber Table Extraction',
        'openpyxl Matrix Parser',
        'SHA-256 Checksum Guard'
      ],
      points: [
        {
          title: 'ท่อส่งข้อมูลคู่ขนาน 5 ช่องทาง (5 Concurrent Worker Lanes)',
          desc: 'จัดสรร Python ThreadPoolExecutor แยกตามประเภทเอกสาร รันพร้อมกัน 5 ท่อส่ง ลดระยะเวลานำเข้าเอกสารโครงการขนาดใหญ่จาก 15 นาทีเหลือเพียง 3 นาที'
        },
        {
          title: 'ระบบแยกแยะและสกัดตารางอัจฉริยะ (Vision LLM + Hybrid Parsers)',
          desc: 'ตรวจจับโครงสร้างเอกสารอัตโนมัติ หากเป็นดิจิทัลใช้ PyMuPDF ความเร็วสูง หากเป็นภาพสแกนหรือสเปกที่ซับซ้อนจะส่งเข้า Vision LLM OCR สกัดตารางและตัวเลขได้ตรงตำแหน่ง 100%'
        },
        {
          title: 'กระบวนการตรวจสอบคุณภาพ Human-in-the-Loop (HITL Review Plan)',
          desc: 'ข้อมูลที่สกัดเสร็จจะถูกพักไว้ที่ Staging Queue พร้อมสรุป SHA-256 Manifest เพื่อให้ผู้เชี่ยวชาญตรวจสอบความถูกต้องของ Entity ก่อนบันทึกลงคลังความรู้จริง'
        }
      ],
      benchmarks: [
        { val: '5x เร็วกว่าเดิม', lbl: 'ความเร็วในการประมวลผล' },
        { val: '99.2%', lbl: 'Vision OCR Accuracy' },
        { val: '5 Lanes', lbl: 'Concurrent Processing' },
        { val: '0 Byte Loss', lbl: 'SHA-256 Integrity' }
      ],
      mascot: {
        text: 'ระบบ 5-Lane Engine ใช้การประมวลผลคู่ขนานร่วมกับ Vision LLM ครับ ทำให้สกัดข้อมูลและอ่านตารางที่ซับซ้อนได้เร็วกว่าเดิมถึง 5 เท่า และมีความแม่นยำสูงถึง 99.2% ครับ',
        emotion: 'happy',
        action: 'cheer'
      }
    },
    'kpi-hybrid': {
      eyebrow: 'MULTI-DIMENSIONAL RETRIEVAL ENGINE',
      title: 'Hybrid + Graph: การสืบค้น 2 มิติเชิงความหมายและโครงข่าย',
      subtitle: 'ผสาน Dense Cosine Embedding + Sparse BM25 + Dynamic Gate + Seed-First Graph Traversal',
      badges: [
        'Tri-Factor Scoring Formula',
        'Dense Cosine Embeddings',
        'Sparse BM25 Tokenizer',
        'Seed-First Graph Traversal',
        'Dynamic Relevance Gate',
        'Recency Exponential Boost'
      ],
      points: [
        {
          title: 'สูตรคำนวณคะแนนสืบค้น 2 มิติ (Tri-Factor Hybrid Formula)',
          desc: 'คำนวณคะแนน Score = α(Dense Cosine) + β(Sparse BM25) + γ(Recency Decay) แก้จุดอ่อนของ Vector Search ทั่วไปที่มักจำชื่อเฉพาะหรือรหัสรุ่นสินค้าผิดพลาด'
        },
        {
          title: 'การขยายบริบทผ่านกราฟความรู้ (Seed-First Expansion)',
          desc: 'เริ่มต้นจากเอกสาร Seed ที่ตรงที่สุด แล้วขยายสำรวจกราฟ Cytoscape 1-2 hops เพื่อดึงเอกสารคู่สัญญา พิมพ์เขียว หรือข้อกำหนดที่เกี่ยวข้องมาป้อนให้ LLM ตอบได้ครบถ้วนรอบด้าน'
        },
        {
          title: 'ระบบป้องกันภาพหลอนเชิงรุก (Dynamic Gate & Off-Topic Cutoff)',
          desc: 'กรองเอกสารที่มีคะแนนต่ำกว่า (0.70-0.85) * Max Score และตัดทิ้งข้อความที่คะแนนรวมต่ำกว่า 0.20 ทันที ป้องกันไม่ให้ Context ปะปนข้อมูลขยะ'
        }
      ],
      benchmarks: [
        { val: '3.2x ดีขึ้น', lbl: 'ความแม่นยำเทียบกับ Vector ปกติ' },
        { val: '< 85 ms', lbl: 'Hybrid Search Latency' },
        { val: '99.4%', lbl: 'F1 Relevance Score' },
        { val: '0% Drift', lbl: 'Off-Topic Rejection' }
      ],
      mascot: {
        text: 'ระบบ Hybrid + Graph ของเราไม่ใช่แค่การค้นหาเวกเตอร์ทั่วไปครับ แต่ผสมผสาน BM25 เข้ากับ Graph Traversal ทำให้ค้นหาลึกและแม่นยำกว่าเดิมถึง 3.2 เท่า และหมดปัญหา AI ตอบมั่วครับ',
        emotion: 'think',
        action: 'point'
      }
    },
    'kpi-prod': {
      eyebrow: 'MISSION-CRITICAL ENTERPRISE READINESS',
      title: 'Production Ready: เสถียรภาพและความพร้อมระดับองค์กร',
      subtitle: 'ระบบความพร้อมใช้งานระดับภารกิจสำคัญ พร้อม LLM Circuit Breaker, Tab Isolation, และ FastMCP Server',
      badges: [
        'LLM Circuit Breaker',
        'FastMCP v2 Protocol (SSE)',
        'Tab-Isolated Session',
        'Surgical Unlearn Engine',
        'Line-Level Provenance',
        'Private Cloud & On-Prem'
      ],
      points: [
        {
          title: 'ระบบสำรองคู่ขนานป้องกัน AI ล่ม (LLM Guard & Circuit Breaker)',
          desc: 'ตรวจจับ HTTP 429 / 5xx หรือ Timeout จากโมเดลหลัก หากเกิดปัญหาจะสลับไปยังโหนดสำรอง (Secondary API Key / Local LLM) ในเวลาไม่ถึง 200 ms เพื่อให้ระบบทำงานต่อเนื่อง 100%'
        },
        {
          title: 'สถาปัตยกรรมเชื่อมต่อมาตรฐานอุตสาหกรรม (FastMCP v2 Protocol)',
          desc: 'รองรับการเชื่อมต่อผ่าน SSE และ STDIO Transport ทำให้ต่อขยายเข้ากับ Agent Tools ระดับองค์กร เช่น Claude Code, Antigravity, และเครื่องมืออัตโนมัติได้อย่างปลอดภัย'
        },
        {
          title: 'ระบบตรวจสอบย้อนกลับทุกคำตอบ (Line-Level Provenance Tracking)',
          desc: 'ทุกประโยคที่ AI ให้คำตอบจะระบุหมายเลขบรรทัดและชื่อไฟล์เอกสารต้นทาง สามารถกดตรวจสอบย้อนกลับไปยังสัญญารูปเล่มจริงได้ทันที 100% โปร่งใสและพร้อมสำหรับการ Audit'
        }
      ],
      benchmarks: [
        { val: '99.9%', lbl: 'SLA Uptime Availability' },
        { val: '< 200 ms', lbl: 'Circuit Breaker Failover' },
        { val: '75+ โครงการ', lbl: 'Multi-Tenant Scalability' },
        { val: '100%', lbl: 'Line-Level Auditability' }
      ],
      mascot: {
        text: 'ระบบ Production Ready ของเรามาพร้อมเกราะป้องกัน Circuit Breaker และมาตรฐาน FastMCP ครับ ทำให้ระบบเสถียร 99.9% และพร้อมสำหรับงานระดับภารกิจสำคัญขององค์กรครับ',
        emotion: 'happy',
        action: 'nod'
      }
    }
  };

  function openKpiTechModal(kpiId) {
    var data = KPI_TECH_DATA[kpiId];
    if (!data) return;

    var modal = document.getElementById('kpiTechModal');
    if (!modal) return;

    var eyebrowEl = document.getElementById('kpiModalEyebrow');
    var titleEl = document.getElementById('kpiModalTitle');
    var subtitleEl = document.getElementById('kpiModalSubtitle');
    var badgesEl = document.getElementById('kpiModalBadges');
    var pointsEl = document.getElementById('kpiModalPoints');
    var benchmarksEl = document.getElementById('kpiModalBenchmarks');

    if (eyebrowEl) eyebrowEl.textContent = data.eyebrow;
    if (titleEl) titleEl.textContent = data.title;
    if (subtitleEl) subtitleEl.textContent = data.subtitle;

    if (badgesEl) {
      badgesEl.innerHTML = '';
      data.badges.forEach(function (badge) {
        var span = document.createElement('span');
        span.className = 'kpi-tech-badge';
        span.textContent = badge;
        badgesEl.appendChild(span);
      });
    }

    if (pointsEl) {
      pointsEl.innerHTML = '';
      data.points.forEach(function (p) {
        var div = document.createElement('div');
        div.className = 'kpi-tech-point-item';
        div.innerHTML = '<div><strong>' + p.title + ':</strong> ' + p.desc + '</div>';
        pointsEl.appendChild(div);
      });
    }

    if (benchmarksEl) {
      benchmarksEl.innerHTML = '';
      data.benchmarks.forEach(function (bm) {
        var card = document.createElement('div');
        card.className = 'kpi-tech-bm-card';
        card.innerHTML =
          '<span class="kpi-tech-bm-val">' + bm.val + '</span>' +
          '<span class="kpi-tech-bm-lbl">' + bm.lbl + '</span>';
        benchmarksEl.appendChild(card);
      });
    }

    modal.style.display = 'flex';
    document.body.classList.add('kpi-modal-open');

    if (isAutoPlaying) {
      clearAutoPlayTimer();
    }

    if (data.mascot && typeof updateMascotSpeech === 'function') {
      updateMascotSpeech(
        data.mascot.text,
        data.mascot.emotion || 'happy',
        data.mascot.action || 'nod',
        {},
        true
      );
    }
  }

  function closeKpiTechModal() {
    var modal = document.getElementById('kpiTechModal');
    if (!modal || modal.style.display === 'none') return;
    modal.style.display = 'none';
    document.body.classList.remove('kpi-modal-open');

    if (isAutoPlaying) {
      scheduleNextAutoPlaySlide();
    }
  }

  function bindKpiTechModal() {
    var kpiItems = document.querySelectorAll('.timeline-kpi-item[data-kpi-id]');
    kpiItems.forEach(function (item) {
      item.addEventListener('click', function (e) {
        e.stopPropagation();
        var kpiId = this.getAttribute('data-kpi-id');
        openKpiTechModal(kpiId);
      });
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          var kpiId = this.getAttribute('data-kpi-id');
          openKpiTechModal(kpiId);
        }
      });
    });

    var closeBtn = document.getElementById('btnKpiModalClose');
    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        closeKpiTechModal();
      });
    }

    var footerCloseBtn = document.getElementById('btnKpiModalFooterClose');
    if (footerCloseBtn) {
      footerCloseBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        closeKpiTechModal();
      });
    }

    var backdrop = document.getElementById('kpiTechBackdrop');
    if (backdrop) {
      backdrop.addEventListener('click', function (e) {
        e.stopPropagation();
        closeKpiTechModal();
      });
    }
  }

  // --------------------------------------------------------------------------
  // 12. INTERACTIVE OBSIDIAN-STYLE PHYSICS KNOWLEDGE GRAPH CANVAS (SCENE 4)
  // --------------------------------------------------------------------------
  function initKnowledgeGraphCanvas() {
    var canvas = document.getElementById('appleGraphCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');

    var nodes = [
      {
        id: 'proj-cloud',
        label: 'projects/cloud-erp-2026',
        color: '#60A5FA',
        rx: 0.5,
        ry: 0.48,
        r: 20,
        speech:
          'โหนด <strong>projects/cloud-erp-2026</strong> เป็นหน้าโครงการหลักที่เชื่อมโยงข้อมูลลูกค้า มาตรฐานความปลอดภัย และตารางเปรียบเทียบราคาเข้าด้วยกันครับ'
      },
      {
        id: 'ent-bank',
        label: 'clients/scb-enterprise',
        color: '#22D3EE',
        rx: 0.22,
        ry: 0.26,
        r: 16,
        speech:
          'โหนด <strong>clients/scb-enterprise</strong> เก็บข้อกำหนดด้านความปลอดภัยและประวัติโครงการทั้งหมดของลูกค้ารายนี้ครับ'
      },
      {
        id: 'concept-sec',
        label: 'solutions/zero-trust-arch',
        color: '#4ADE80',
        rx: 0.78,
        ry: 0.26,
        r: 16,
        speech:
          'โหนด <strong>solutions/zero-trust-arch</strong> เชื่อมโยงมาตรฐานความปลอดภัย Zero Trust ที่ต้องใช้ในโครงการนี้ครับ'
      },
      {
        id: 'syn-price',
        label: 'syntheses/boq-pricing-bench',
        color: '#FBBF24',
        rx: 0.24,
        ry: 0.75,
        r: 16,
        speech:
          'โหนด <strong>syntheses/boq-pricing-bench</strong> สรุปเกณฑ์เปรียบเทียบงบประมาณ BOQ จาก 5 โครงการย้อนหลังครับ'
      },
      {
        id: 'doc-tor',
        label: 'sources/TOR_Main.pdf',
        color: '#A78BFA',
        rx: 0.76,
        ry: 0.75,
        r: 16,
        speech:
          'โหนด <strong>sources/TOR_Main.pdf</strong> เชื่อมกลับไปยังไฟล์เอกสารต้นฉบับเพื่อตรวจสอบความถูกต้องได้ทุกบรรทัดครับ'
      }
    ];

    var edges = [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [1, 2],
      [3, 4]
    ];

    var selectedIdx = 0;
    var draggingIdx = -1;
    var pulsePhase = 0;

    function resize() {
      var rect = canvas.parentElement.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    window.addEventListener('resize', resize);
    setTimeout(resize, 120);

    canvas.addEventListener('pointerdown', function (e) {
      var rect = canvas.getBoundingClientRect();
      var mx = e.clientX - rect.left;
      var my = e.clientY - rect.top;
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        var nx = n.rx * rect.width;
        var ny = n.ry * rect.height;
        if (Math.hypot(mx - nx, my - ny) <= n.r + 12) {
          selectedIdx = i;
          draggingIdx = i;
          updateMascotSpeech(n.speech, 'look', 'point', { side: 1 }, false);
          break;
        }
      }
    });

    window.addEventListener('pointermove', function (e) {
      if (draggingIdx < 0) return;
      var rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      var mx = Math.max(30, Math.min(rect.width - 30, e.clientX - rect.left));
      var my = Math.max(25, Math.min(rect.height - 25, e.clientY - rect.top));
      nodes[draggingIdx].rx = mx / rect.width;
      nodes[draggingIdx].ry = my / rect.height;
    });

    window.addEventListener('pointerup', function () {
      draggingIdx = -1;
    });

    window.pikaSelectGraphNode = function (idx) {
      if (idx >= 0 && idx < nodes.length) {
        selectedIdx = idx;
        var n = nodes[idx];
        updateMascotSpeech(n.speech, 'look', 'point', { side: 1 }, false);
        var rect = canvas.getBoundingClientRect();
        return {
          x: rect.left + n.rx * rect.width,
          y: rect.top + n.ry * rect.height
        };
      }
      return null;
    };

    function renderGraph() {
      var rect = canvas.parentElement.getBoundingClientRect();
      if (rect.width > 0 && canvas.width !== Math.floor(rect.width * Math.min(window.devicePixelRatio || 1, 2))) {
        resize();
      }
      var w = rect.width || 400;
      var h = rect.height || 260;
      pulsePhase += 0.035;

      ctx.clearRect(0, 0, w, h);

      for (var i = 0; i < edges.length; i++) {
        var a = nodes[edges[i][0]];
        var b = nodes[edges[i][1]];
        var ax = a.rx * w;
        var ay = a.ry * h;
        var bx = b.rx * w;
        var by = b.ry * h;

        var isHighlighted = edges[i][0] === selectedIdx || edges[i][1] === selectedIdx;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.strokeStyle = isHighlighted ? 'rgba(96, 165, 250, 0.72)' : 'rgba(148, 163, 184, 0.22)';
        ctx.lineWidth = isHighlighted ? 2.2 : 1.2;
        ctx.stroke();
      }

      for (var j = 0; j < nodes.length; j++) {
        var nd = nodes[j];
        var x = nd.rx * w;
        var y = nd.ry * h + (draggingIdx === j ? 0 : Math.sin(pulsePhase + j * 1.3) * 2.5);
        var active = j === selectedIdx;

        if (active) {
          ctx.beginPath();
          ctx.arc(x, y, nd.r + 8 + Math.sin(pulsePhase * 2) * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(56, 189, 248, 0.22)';
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(x, y, nd.r, 0, Math.PI * 2);
        ctx.fillStyle = nd.color;
        ctx.fill();
        ctx.lineWidth = active ? 2.5 : 1.2;
        ctx.strokeStyle = active ? '#ffffff' : 'rgba(255,255,255,0.35)';
        ctx.stroke();

        ctx.font = (active ? '600 ' : '500 ') + '11.5px "JetBrains Mono", "Inter", sans-serif';
        ctx.fillStyle = active ? '#ffffff' : 'rgba(226, 232, 240, 0.85)';
        ctx.textAlign = 'center';
        ctx.fillText(nd.label, x, y + nd.r + 15);
      }

      requestAnimationFrame(renderGraph);
    }

    requestAnimationFrame(renderGraph);
  }

  // --------------------------------------------------------------------------
  // 13. SCENE AUTO-PLAY LIVE DEMO DIRECTOR (AUTOMATIC CHOREOGRAPHY ON SLIDE ENTRY)
  // --------------------------------------------------------------------------
  var sceneAutoTimers = [];
  var sceneAutoIntervals = [];

  function scheduleAutoTimeout(fn, delayMs) {
    var id = setTimeout(fn, delayMs);
    sceneAutoTimers.push(id);
    return id;
  }

  function scheduleAutoInterval(fn, intervalMs) {
    var id = setInterval(fn, intervalMs);
    sceneAutoIntervals.push(id);
    return id;
  }

  function clearFocusHighlights() {
    var focused = document.querySelectorAll('.auto-demo-focus');
    for (var i = 0; i < focused.length; i++) {
      focused[i].classList.remove('auto-demo-focus');
    }
  }

  function hideGhostCursor() {
    var cursor = document.getElementById('demoGhostCursor');
    if (cursor) {
      cursor.classList.remove('visible', 'clicking');
    }
    clearFocusHighlights();
  }

  function clearSceneAutoDirector() {
    for (var i = 0; i < sceneAutoTimers.length; i++) {
      clearTimeout(sceneAutoTimers[i]);
    }
    sceneAutoTimers = [];

    for (var j = 0; j < sceneAutoIntervals.length; j++) {
      clearInterval(sceneAutoIntervals[j]);
    }
    sceneAutoIntervals = [];

    if (ingestDemoTimer) {
      clearInterval(ingestDemoTimer);
      ingestDemoTimer = null;
    }
    if (unlearnDemoTimer) {
      clearInterval(unlearnDemoTimer);
      unlearnDemoTimer = null;
    }
    hideGhostCursor();
  }

  function moveGhostCursorToXY(x, y, labelText, doClick, onClicked) {
    if (document.body.classList.contains('live-demo-open')) return;
    var cursor = document.getElementById('demoGhostCursor');
    var labelEl = document.getElementById('demoGhostLabel');
    if (!cursor) {
      if (onClicked) onClicked();
      return;
    }
    if (labelEl && labelText) {
      labelEl.textContent = labelText;
    }
    cursor.classList.remove('clicking');
    cursor.classList.add('visible');
    if (y > window.innerHeight - 85) {
      cursor.classList.add('flip-up');
    } else {
      cursor.classList.remove('flip-up');
    }
    cursor.style.transform = 'translate3d(' + Math.round(x) + 'px, ' + Math.round(y) + 'px, 0)';

    if (doClick) {
      scheduleAutoTimeout(function () {
        cursor.classList.add('clicking');
        if (onClicked) onClicked();
        scheduleAutoTimeout(function () {
          cursor.classList.remove('clicking');
        }, 420);
      }, 540);
    } else if (onClicked) {
      scheduleAutoTimeout(onClicked, 540);
    }
  }

  function moveGhostCursorToEl(el, labelText, doClick, onClicked) {
    if (!el || document.body.classList.contains('live-demo-open')) return;
    var rect = el.getBoundingClientRect();
    if (!rect.width && !rect.height) return;
    clearFocusHighlights();
    el.classList.add('auto-demo-focus');
    var tx = rect.left + Math.min(rect.width * 0.48, 140);
    var ty = rect.top + rect.height * 0.55;
    moveGhostCursorToXY(tx, ty, labelText, doClick, onClicked);
  }

  function autoTypeIntoInput(inputEl, text, charSpeedMs, onComplete) {
    if (!inputEl) {
      if (onComplete) onComplete();
      return;
    }
    inputEl.value = '';
    var i = 0;
    var iv = scheduleAutoInterval(function () {
      i++;
      inputEl.value = text.slice(0, i);
      if (i >= text.length) {
        clearInterval(iv);
        if (onComplete) onComplete();
      }
    }, charSpeedMs || 28);
  }

  function highlightCardSequence(selector, intervalMs) {
    var cards = document.querySelectorAll(selector);
    if (!cards.length) return;
    var idx = 0;
    function stepCard() {
      for (var i = 0; i < cards.length; i++) {
        cards[i].classList.remove('pika-tapped');
      }
      var c = cards[idx % cards.length];
      if (c) {
        c.classList.add('pika-tapped');
        var id = c.getAttribute('data-id');
        if (id && CARD_SPEECH_MAP[id]) {
          updateMascotSpeech(CARD_SPEECH_MAP[id].text, CARD_SPEECH_MAP[id].expr, null, {}, false);
        }
      }
      idx++;
    }
    scheduleAutoTimeout(stepCard, 900);
    scheduleAutoInterval(stepCard, intervalMs || 2800);
  }

  function runSceneAutoDirector(sceneIdx) {
    clearSceneAutoDirector();

    // Pause automatic ghost cursor if user clicks manually inside any demo window
    if (sceneIdx === 1) {
      highlightCardSequence('#scene-1 .wiki-project-link', 3200);
    } else if (sceneIdx === 2) {
      highlightCardSequence('#scene-2 .wiki-project-link', 2500);
    } else if (sceneIdx === 3) {
      // SCENE 3 AUTO-DEMO: Upload Note -> Type Title -> Select Files -> Click Upload & Run 5x Parallel Ingest
      var batchCounter = 0;
      var autoBatches = [
        {
          title: 'ชุดเอกสาร TOR & BOQ โครงการ Cloud ERP 2026 (5 ไฟล์)',
          files: 'เลือกแล้ว 5 ไฟล์: TOR_Main.pdf, Spec_Cloud.docx, BOQ_Matrix.xlsx, SLA_Diagram.pdf, Meeting_Note.jot'
        },
        {
          title: 'เอกสารข้อกำหนดความปลอดภัย Cloud Banking SLA 2026 (3 ไฟล์)',
          files: 'เลือกแล้ว 3 ไฟล์: RFP_Banking_Security_2026.pdf, Network_Topology_Scan.png, Compliance_Matrix.xlsx'
        }
      ];

      function runScene3Cycle() {
        if (currentScene !== 3) return;
        var b = autoBatches[batchCounter % autoBatches.length];
        batchCounter++;

        var titleIn = document.getElementById('demoUploadTitle');
        var dropZone = document.getElementById('demoDropZone');
        var filesPill = document.getElementById('demoSelectedFilesPill');
        var btnUpload = document.getElementById('btnRunIngestDemo');
        var fillEl = document.getElementById('demoIngestFill');
        var pctEl = document.getElementById('demoIngestPct');
        var stageEl = document.getElementById('demoIngestStageLabel');
        var logEl = document.getElementById('demoIngestLog');

        if (fillEl) fillEl.style.width = '0%';
        if (pctEl) pctEl.textContent = '0%';
        if (stageEl) stageEl.textContent = 'กำลังเตรียมข้อมูลสำหรับประมวลผลแบบขนาน 5 ช่องทาง...';
        if (logEl) logEl.innerHTML = '<div class="real-log-line info">[Auto-Demo] กำลังจำลองการกรอกข้อมูลและโยนไฟล์เข้าสู่หน้า Upload Note...</div>';

        // Step 1: Move to Title field & type title
        scheduleAutoTimeout(function () {
          moveGhostCursorToEl(titleIn, '1. กรอกชื่อชุดเอกสารโครงการ', true, function () {
            autoTypeIntoInput(titleIn, b.title, 22);
          });
        }, 420);

        // Step 2: Move to Drag & Drop zone & drop 5 files
        scheduleAutoTimeout(function () {
          moveGhostCursorToEl(dropZone, '2. โยนไฟล์เอกสาร 5 ไฟล์เข้าสู่ระบบ', true, function () {
            if (filesPill) filesPill.textContent = b.files;
          });
        }, 1850);

        // Step 3: Move to "Upload and Process Note" button & click to start 5x Parallel Ingest
        scheduleAutoTimeout(function () {
          moveGhostCursorToEl(btnUpload, '3. คลิก Upload and Process Note', true, function () {
            runLiveIngestSimulation(fillEl, pctEl, stageEl, logEl);
            scheduleAutoTimeout(hideGhostCursor, 650);
          });
        }, 2950);
      }

      runScene3Cycle();
      scheduleAutoInterval(runScene3Cycle, 20000);
    } else if (sceneIdx === 4) {
      // SCENE 4 AUTO-DEMO: Relationship Graph Node Exploration -> Switch to File Browser -> Click Markdown Pages
      function runScene4Cycle() {
        if (currentScene !== 4) return;
        var btnGraph = document.getElementById('btnSwitchGraphView');
        var btnFb = document.getElementById('btnSwitchFbView');

        // Ensure starting on Graph View
        if (btnGraph) btnGraph.click();

        // Step 1: Click node 1 on Graph Canvas
        scheduleAutoTimeout(function () {
          if (window.pikaSelectGraphNode) {
            var pt1 = window.pikaSelectGraphNode(1);
            if (pt1) moveGhostCursorToXY(pt1.x, pt1.y, 'สำรวจโหนดลูกค้า: scb-enterprise', true);
          }
        }, 550);

        // Step 2: Click node 2 on Graph Canvas
        scheduleAutoTimeout(function () {
          if (window.pikaSelectGraphNode) {
            var pt2 = window.pikaSelectGraphNode(2);
            if (pt2) moveGhostCursorToXY(pt2.x, pt2.y, 'เชื่อมโยงมาตรฐาน: zero-trust-arch', true);
          }
        }, 2100);

        // Step 3: Switch to File Browser view
        scheduleAutoTimeout(function () {
          moveGhostCursorToEl(btnFb, 'สลับไปดูหน้า File Browser', true, function () {
            if (btnFb) btnFb.click();
          });
        }, 3700);

        // Step 4: Click clients/scb-enterprise.md in File Browser tree
        scheduleAutoTimeout(function () {
          var item1 = document.querySelector('#slideFbTree .real-fb-item[data-fb-doc="ent-bank"]');
          moveGhostCursorToEl(item1, 'เปิดอ่านหน้าวิกิ clients/scb-enterprise.md', true, function () {
            if (item1) item1.click();
          });
        }, 5100);

        // Step 5: Click syntheses/boq-pricing-bench.md in File Browser tree
        scheduleAutoTimeout(function () {
          var item2 = document.querySelector('#slideFbTree .real-fb-item[data-fb-doc="syn-price"]');
          moveGhostCursorToEl(item2, 'เปิดดูตารางเปรียบเทียบ BOQ อ้างอิง', true, function () {
            if (item2) item2.click();
            scheduleAutoTimeout(hideGhostCursor, 700);
          });
        }, 7400);
      }

      runScene4Cycle();
      scheduleAutoInterval(runScene4Cycle, 22000);
    } else if (sceneIdx === 5) {
      // SCENE 5 AUTO-DEMO: Welcome Screen -> Type Question -> Click Send -> Stream Deep Search Trace -> Click Follow-up Chip
      function runScene5Cycle() {
        if (currentScene !== 5) return;
        var welcomeEl = document.getElementById('slideChatWelcome');
        var convoEl = document.getElementById('slideChatConvo');
        var messagesEl = document.getElementById('slideChatMessages');
        var sessionTitleEl = document.getElementById('slideChatSessionTitle');
        var welcomeInput = document.getElementById('slideWelcomeInput');
        var btnWelcomeSend = document.getElementById('btnSlideWelcomeSend');

        // Reset to Welcome screen first so user sees the Bento cards & typing
        if (welcomeEl) welcomeEl.style.display = 'flex';
        if (convoEl) convoEl.classList.remove('active');
        if (sessionTitleEl) sessionTitleEl.textContent = 'New chat';
        if (welcomeInput) welcomeInput.value = '';

        var q1 = 'สรุปภาพรวมโครงการ Cloud ERP 2026 และเงื่อนไข SLA สำคัญ';

        // Step 1: Move to Welcome Pill Input & type question
        scheduleAutoTimeout(function () {
          moveGhostCursorToEl(welcomeInput, '1. พิมพ์คำถามค้นหาข้อมูลโครงการ', true, function () {
            autoTypeIntoInput(welcomeInput, q1, 24);
          });
        }, 500);

        // Step 2: Click Send -> Transitions to Active Chat & streams Deep Search Reasoning Trace
        scheduleAutoTimeout(function () {
          moveGhostCursorToEl(btnWelcomeSend, '2. ส่งคำถาม (เปิดโหมด Deep Search)', true, function () {
            if (welcomeInput) welcomeInput.value = '';
            runLiveChatQuery(q1, welcomeEl, convoEl, messagesEl, sessionTitleEl);
            scheduleAutoTimeout(hideGhostCursor, 600);
          });
        }, 2350);

        // Step 3: After first answer reveals, automatically click a Follow-up Chip!
        scheduleAutoTimeout(function () {
          var chip = document.querySelector('#slideChatMessages .follow-up-chip');
          if (chip) {
            moveGhostCursorToEl(chip, '3. คลิกคำถามแนะนำต่อเนื่อง (Follow-up)', true, function () {
              chip.click();
              scheduleAutoTimeout(hideGhostCursor, 650);
            });
          }
        }, 7600);
      }

      runScene5Cycle();
      scheduleAutoInterval(runScene5Cycle, 24000);
    } else if (sceneIdx === 6) {
      // SCENE 6 AUTO-DEMO: Type Audit Reason -> Type DELETE -> Click Unlearn -> Run 6-Step Unlearn -> Trigger Failover Banner
      function runScene6Cycle() {
        if (currentScene !== 6) return;
        var reasonIn = document.getElementById('demoUnlearnReason');
        var deleteIn = document.getElementById('demoUnlearnTyped');
        var btnUnlearn = document.getElementById('btnConfirmUnlearnBox');
        var btnFailover = document.getElementById('btnTestFailover');
        var failoverBanner = document.getElementById('demoFailoverBanner');
        var statusBox = document.getElementById('demoUnlearnStatusBox');

        if (failoverBanner) failoverBanner.style.display = 'none';
        if (deleteIn) deleteIn.value = '';
        if (statusBox) {
          statusBox.style.color = 'var(--text-secondary)';
          statusBox.innerHTML = 'กำลังเตรียมตรวจสอบ Provenance Map ของไฟล์ TOR_Cloud_ERP_Draft_Old.pdf...';
        }

        // Step 1: Type Reason
        scheduleAutoTimeout(function () {
          moveGhostCursorToEl(reasonIn, '1. ระบุเหตุผลใน Audit Log', true, function () {
            autoTypeIntoInput(reasonIn, 'อัปเดตเป็นเอกสาร TOR ฉบับสมบูรณ์แทนฉบับร่างเดิม', 22);
          });
        }, 450);

        // Step 2: Type DELETE confirmation
        scheduleAutoTimeout(function () {
          moveGhostCursorToEl(deleteIn, '2. พิมพ์ DELETE เพื่อยืนยันความปลอดภัย', true, function () {
            autoTypeIntoInput(deleteIn, 'DELETE', 70);
          });
        }, 1850);

        // Step 3: Click Unlearn button
        scheduleAutoTimeout(function () {
          moveGhostCursorToEl(btnUnlearn, '3. เริ่มการถอนความรู้รายไฟล์ (Surgical Unlearn)', true, function () {
            if (btnUnlearn) btnUnlearn.click();
            scheduleAutoTimeout(hideGhostCursor, 650);
          });
        }, 2850);

        // Step 4: Trigger LLM Failover banner after Unlearn completes
        scheduleAutoTimeout(function () {
          moveGhostCursorToEl(btnFailover, '4. จำลองการสลับโมเดลสำรองอัตโนมัติ (Failover)', true, function () {
            if (btnFailover) btnFailover.click();
            scheduleAutoTimeout(hideGhostCursor, 700);
          });
        }, 8800);
      }

      runScene6Cycle();
      scheduleAutoInterval(runScene6Cycle, 22000);
    } else if (sceneIdx === 7) {
      // SCENE 7 AUTO-DEMO: Highlight Projects & Stream Live MCP v2 Tool Execution Calls
      function runScene7Cycle() {
        if (currentScene !== 7) return;
        var card1 = document.getElementById('projCardEnterprise');
        var card2 = document.getElementById('projCardCloud');
        var mcpLog = document.getElementById('demoMcpLogBox');
        var mcpStatus = document.getElementById('demoMcpStatusLabel');

        if (mcpLog) mcpLog.innerHTML = '';

        var mcpSteps = [
          {
            target: card1,
            cursorLabel: 'เลือกคลัง presale-enterprise (OWNER)',
            status: 'กำลังรัน: wiki_search (MCP v2)',
            logClass: 'info',
            logText: '> เรียกใช้ MCP Tool: wiki_search({ project: "presale-enterprise", query: "SLA Cloud ERP" })',
            speech: 'เริ่มจากเลือกโครงการ <strong>presale-enterprise</strong> แล้วส่งคำสั่งค้นหาผ่าน <strong>MCP Server v2</strong> จากโปรแกรมภายนอกครับ'
          },
          {
            target: null,
            cursorLabel: '',
            status: 'ตอบกลับสำเร็จ (18ms)',
            logClass: 'ok',
            logText: '[OK] ผลลัพธ์: พบ 3 หน้าวิกิ (projects/cloud-erp-2026.md, clients/scb-enterprise.md) พร้อมข้อมูลอ้างอิง',
            speech: 'ระบบส่งเนื้อหาหน้าวิกิและจุดอ้างอิงกลับไปยัง Claude หรือ VS Code ทันทีภายในเสี้ยววินาทีครับ'
          },
          {
            target: card2,
            cursorLabel: 'สลับดูโครงการ cloud-migration-2026 (MEMBER)',
            status: 'กำลังรัน: wiki_ingest_text (MCP v2)',
            logClass: 'warn',
            logText: '> เรียกใช้ MCP Tool: wiki_ingest_text({ project: "cloud-migration-2026", title: "Meeting_Kickoff.md" })',
            speech: 'นอกจากค้นหาแล้ว ยังสั่งบันทึกสรุปการประชุมใหม่เข้าสู่โครงการ <strong>cloud-migration-2026</strong> ผ่าน MCP ได้โดยตรงครับ'
          },
          {
            target: null,
            cursorLabel: '',
            status: 'บันทึกและตรวจ ETag สำเร็จ',
            logClass: 'ok',
            logText: '[OK] บันทึกหน้าวิกิสำเร็จ (ETag v4 Verified — ป้องกันการเขียนทับเมื่อทำงานพร้อมกันหลายคน)',
            speech: 'ทุกการแก้ไขจะตรวจสอบเวอร์ชันล่าสุดก่อนบันทึกเสมอ ช่วยให้ทีมทำงานร่วมกันได้อย่างปลอดภัยครับ'
          }
        ];

        var sIdx = 0;
        function execMcpStep() {
          if (currentScene !== 7) return;
          var st = mcpSteps[sIdx];
          if (!st) return;

          if (st.target) {
            moveGhostCursorToEl(st.target, st.cursorLabel, true, function () {
              scheduleAutoTimeout(hideGhostCursor, 650);
            });
          }
          if (mcpStatus) mcpStatus.textContent = st.status;
          if (mcpLog) {
            var line = document.createElement('div');
            line.className = 'real-log-line ' + st.logClass;
            line.textContent = st.logText;
            mcpLog.appendChild(line);
            mcpLog.scrollTop = mcpLog.scrollHeight;
          }
          updateMascotSpeech(st.speech, 'happy', 'point', { side: -1 }, false);
        }

        scheduleAutoTimeout(execMcpStep, 500);
        scheduleAutoInterval(function () {
          sIdx++;
          if (sIdx < mcpSteps.length) {
            execMcpStep();
          }
        }, 2200);
      }

      runScene7Cycle();
      scheduleAutoInterval(runScene7Cycle, 22000);
    } else if (sceneIdx === 8) {
      setTimelineWeek('w1', false);
    } else if (sceneIdx === 9) {
      highlightCardSequence('#scene-9 .wiki-project-link', 2600);
    }
  }

  // --------------------------------------------------------------------------
  // 13B. AUTHENTIC BENTO 3D PARALLAX TILT & INTERACTIVE CONTROLS
  // --------------------------------------------------------------------------
  function initBentoCardInteractions() {
    var tiltCards = document.querySelectorAll('.bento-tilt-card');
    tiltCards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        card.classList.add('is-tilting');
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        var rotX = -y * 12;
        var rotY = x * 12;
        card.style.transform = 'perspective(900px) rotateX(' + rotX.toFixed(2) + 'deg) rotateY(' + rotY.toFixed(2) + 'deg) translateZ(10px) scale3d(1.018, 1.018, 1.018)';
      });
      card.addEventListener('mouseleave', function () {
        card.classList.remove('is-tilting');
        card.style.transform = '';
      });
    });

    // Interactive Architecture Spec Pills
    var specPills = document.querySelectorAll('.interactive-spec-pill');
    specPills.forEach(function (pill) {
      pill.addEventListener('click', function (e) {
        e.stopPropagation();
        var speech = pill.getAttribute('data-speech');
        var bubble = document.getElementById('heroAiBubbleText') || document.getElementById('finaleAiBubbleText');
        if (bubble && speech) {
          bubble.innerHTML = speech;
          bubble.classList.remove('pop-pulse');
          void bubble.offsetWidth;
          bubble.classList.add('pop-pulse');
        }
        if (typeof updateMascotSpeech === 'function') {
          updateMascotSpeech(speech, 'happy', 'nod', {}, true);
        }
        pill.style.transform = 'scale(0.96)';
        setTimeout(function () { pill.style.transform = ''; }, 160);
      });
    });

    // Quick action pills in Scene 1 AI card
    var quickTorBtn = document.getElementById('btnHeroQuickTor');
    if (quickTorBtn) {
      quickTorBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var text = '<strong>สรุปจุดเด่น 5x Parallel Ingest:</strong> สกัดและสรุปไฟล์โครงการพร้อมกัน 5 ช่องทาง รองรับทั้ง PDF, Word, Excel รักษารูปแบบตาราง ไม่ตัดท่อนข้อความ ร่นเวลาทำงานเหลือเพียงไม่กี่วินาทีครับ';
        var bubble = document.getElementById('heroAiBubbleText');
        if (bubble) bubble.innerHTML = text;
        if (typeof updateMascotSpeech === 'function') {
          updateMascotSpeech(text, 'surprised', 'cheer', {}, true);
        }
      });
    }

    var quickBlueBtn = document.getElementById('btnHeroQuickBlue');
    if (quickBlueBtn) {
      quickBlueBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var text = '<strong>การค้นหา 2 มิติ (Hybrid GraphRAG):</strong> ผสานการค้นหาคำเฉพาะทาง (BM25) เข้ากับความหมายเชิงลึก (Vector Search) และเชื่อมโยง C4 Architecture ไม่พลาดทุกรหัสอ้างอิงครับ';
        var bubble = document.getElementById('heroAiBubbleText');
        if (bubble) bubble.innerHTML = text;
        if (typeof updateMascotSpeech === 'function') {
          updateMascotSpeech(text, 'think', 'think', {}, true);
        }
      });
    }

    // Quick chat input submit for Scene 1
    window.submitHeroInlineChat = function () {
      var input = document.getElementById('heroAiInput');
      if (!input) return;
      var val = (input.value || '').trim();
      if (!val) return;
      var bubble = document.getElementById('heroAiBubbleText');
      if (bubble) {
        bubble.innerHTML = '<strong>คำถาม:</strong> ' + val + '<br><span style="color:#60A5FA;">กำลังค้นหาในฐานความรู้ C4 Model...</span> พบคู่มือและข้อมูลที่เกี่ยวข้องในคลังโครงการ พร้อมอ้างอิงครับ';
      }
      if (typeof updateMascotSpeech === 'function') {
        updateMascotSpeech('ผมค้นหาคำตอบสำหรับ <em>"' + val + '"</em> ให้เรียบร้อยแล้วครับ ข้อมูลนี้ถูกบันทึกไว้ในคลังความรู้พร้อมใช้งานครับ', 'happy', 'nod', {}, true);
      }
      input.value = '';
    };

    var heroSendBtn = document.getElementById('btnHeroSendChat');
    if (heroSendBtn) {
      heroSendBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        window.submitHeroInlineChat();
      });
    }

    // Quick action pills in Scene 8 Finale AI card
    var finaleMetricsBtn = document.getElementById('btnFinaleQuickMetrics');
    if (finaleMetricsBtn) {
      finaleMetricsBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var text = '<strong>สถิติการทำงานระดับ Production:</strong> ความเร็วสกัดเอกสารเฉลี่ย 3.8 วินาทีต่อ 5 ไฟล์ ความแม่นยำ Hybrid Search 99.4% และความพร้อมของระบบสำรอง Failover 100% ครับ';
        var bubble = document.getElementById('finaleAiBubbleText');
        if (bubble) bubble.innerHTML = text;
        if (typeof updateMascotSpeech === 'function') {
          updateMascotSpeech(text, 'happy', 'cheer', {}, true);
        }
      });
    }

    var finaleDeckBtn = document.getElementById('btnFinaleQuickDeck');
    if (finaleDeckBtn) {
      finaleDeckBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var text = '<strong>ส่งออกสไลด์และพิมพ์เขียว C4:</strong> แผนผังความรู้และข้อกำหนดทั้งหมดถูกรวบรวมเข้าสู่เอกสารส่งมอบโครงการ พร้อมนำเสนอต่อลูกค้าได้ทันทีครับ';
        var bubble = document.getElementById('finaleAiBubbleText');
        if (bubble) bubble.innerHTML = text;
        if (typeof updateMascotSpeech === 'function') {
          updateMascotSpeech(text, 'happy', 'wave', {}, true);
        }
      });
    }

    // Quick chat input submit for Scene 8
    window.submitFinaleInlineChat = function () {
      var input = document.getElementById('finaleAiInput');
      if (!input) return;
      var val = (input.value || '').trim();
      if (!val) return;
      var bubble = document.getElementById('finaleAiBubbleText');
      if (bubble) {
        bubble.innerHTML = '<strong>คำถาม:</strong> ' + val + '<br><span style="color:#60A5FA;">เชื่อมต่อกับคลังข้อมูลสถาปัตยกรรมระดับ Production...</span> ระบบตรวจสอบยืนยันข้อมูลพร้อมเอกสารอ้างอิงชัดเจนครับ';
      }
      if (typeof updateMascotSpeech === 'function') {
        updateMascotSpeech('ระบบตอบคำถามเกี่ยวกับ <em>"' + val + '"</em> พร้อมระบุแหล่งอ้างอิงและพิมพ์เขียวเสร็จสมบูรณ์ครับ', 'happy', 'cheer', {}, true);
      }
      input.value = '';
    };

    var finaleSendBtn = document.getElementById('btnFinaleSendChat');
    if (finaleSendBtn) {
      finaleSendBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        window.submitFinaleInlineChat();
      });
    }
  }

  // --------------------------------------------------------------------------
  // 14. INITIALIZE ON DOM READY
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', function () {
    bindNavigation();
    bindMascotAndCardInteractions();
    initBentoCardInteractions();
    bindInteractiveDemos();
    bindWorkbenchModal();
    bindKpiTechModal();
    initKnowledgeGraphCanvas();

    // Pause ghost cursor temporarily if user manually clicks inside any slide app window
    var appWindows = document.querySelectorAll('.pika-app-window');
    for (var i = 0; i < appWindows.length; i++) {
      appWindows[i].addEventListener('pointerdown', function () {
        hideGhostCursor();
      });
    }

    // Start Scene 1 automatic choreography on load
    runSceneAutoDirector(1);

    setTimeout(function () {
      if (window.PikaMascot) {
        window.PikaMascot.express('happy', 4.0);
        window.PikaMascot.play('wave');
      }
    }, 650);
  });
})();
