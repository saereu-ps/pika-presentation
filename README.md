# PIKA Presentation Keynote & Auto-Demo

ระบบนำเสนอแพลตฟอร์มแบบอัตโนมัติ (Executive Presentation Deck) พร้อมตัวละคร 3D PIKA (Three.js WebGL 60FPS) สไตล์ Apple Keynote และระบบจำลองการทำงานจริง (Live Auto-Demo Sequencer)

---

## จุดเด่นของระบบนำเสนอ (Key Highlights)

1. **ตัวละคร 3D PIKA (Three.js WebGL 60FPS)**:
   - ปั้นด้วยโมเดล 3D ดินน้ำมัน Procedural Clay Shader ที่มีความเงาและมิติแสงสมจริง
   - สวมเสื้อยืดสีขาวสกรีนโลโก้ MFEC ด้วย Canvas Texture ความละเอียดสูง
   - หมุนตัวได้อิสระ 360 องศา ด้วยการคลิกลากเมาส์ (Drag to Rotate) หรือทัชสกรีน
   - ขยับท่าทางตามเนื้อหาสไลด์ครบทุกท่าทาง (Waving, Thinking, Pointing, Scanning, Guard Shield, Inspecting, Celebrating)
   - มีระบบจำลองการกระพริบตา (Blinking), หายใจ (Breathing) และขยับปากขณะพูด (Talking Lip-sync)

2. **ระบบ Auto-Demo Sequencer & Keynote Acts**:
   - **Act 01**: Executive Vision — ภาพรวมแพลตฟอร์มคลังความรู้ระดับองค์กร
   - **Act 02**: The Problem & Paradigm Shift — ทำไมต้อง PIKA และการจัดการความรู้แบบวิวัฒน์
   - **Act 03**: Concurrent Ingestion — ระบบสกัดข้อมูลคู่ขนาน 5 ช่องทาง และ Vision LLM OCR
   - **Act 04**: Interactive Knowledge Graph — กราฟความรู้เชิงโครงข่ายแบบตอบสนอง 60FPS
   - **Act 05**: Deep Search & Hybrid RAG — การสืบค้น 2 มิติ Dense + Sparse BM25 พร้อม Dynamic Gate
   - **Act 06**: Data Governance & Surgical Unlearn — ความปลอดภัยและระบบลบข้อมูลเฉพาะจุด
   - **Act 07**: Ecosystem & Multi-Project — ระบบแยกโปรเจกต์และการเชื่อมต่อ FastMCP Server
   - **Act 08**: Engineering Roadmap & Spec Sheet — บันทึกสถาปัตยกรรม 8 สัปดาห์ และ Deep-Dive Modal
   - **Act 09**: Finale & Handover — สรุปความพร้อมใช้งานระดับ Production Ready

---

## วิธีเปิดใช้งาน

### 1. รันแบบ Standalone Server
```bash
python3 serve.py 8085
```
แล้วเปิดเบราว์เซอร์ไปที่ http://localhost:8085

### 2. คีย์ลัดบนคีย์บอร์ด (Presenter Shortcuts)
- **ลูกศรขวา (->) / Spacebar**: ถัดไป (Next Slide)
- **ลูกศรซ้าย (<-)**: ก่อนหน้า (Previous Slide)
- **แป้นพิมพ์ 1-9**: ข้ามไปยังสไลด์ที่เลือกโดยตรง
- **แป้นพิมพ์ F**: สลับโหมดเต็มหน้าจอ (Toggle Fullscreen)
- **แป้นพิมพ์ ESC**: ปิดหน้าต่าง Modal หรือออกจากโหมดเต็มหน้าจอ
