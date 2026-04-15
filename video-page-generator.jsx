import { useState } from "react";

// ─── Dados iniciais de exemplo (Severance) ───────────────────────────────────
const INIT = {
  // Hero
  title: "Severance",
  tagline: "Mark lidera uma equipe de trabalhadores de escritório cujas memórias do trabalho e vida pessoal foram cirurgicamente separadas. Um thriller corporativo cheio de mistérios.",
  heroBg: "https://images.unsplash.com/photo-1634157703702-3c124b455499?w=1800&q=85",
  heroBgPos: "center 20%",
  badge: "Novo episódio disponível",
  rating: "8.7",
  years: "2022–2025",
  heroGenre: "Drama · Thriller",
  seasonsLabel: "2 Temporadas",
  classification: "+16",
  resolution: "4K HDR",
  // Player
  playerType: "video",
  videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  embedCode: "",
  // Synopsis
  synopsis: "Mark Scout (Adam Scott) lidera uma equipe de trabalhadores do departamento de refinamento de dados da Lumon Industries, cujas memórias foram cirurgicamente divididas entre suas vidas de trabalho e pessoal. Esse arranjo perturbador logo começa a desmoronar quando Mark e seus colegas se veem no centro de uma conspiração que ameaça tanto suas identidades internas quanto externas.",
  // Meta
  creator: "Dan Erickson",
  director: "Ben Stiller, Aoife McArdle",
  mainCast: "Adam Scott, Patricia Arquette, John Turturro",
  metaGenre: "Drama Psicológico · Thriller · Sci-Fi",
  languages: "Inglês · Português · Espanhol · Francês",
  studio: "Red Hour Productions · Unanimous Media",
  qualities: "4K,HDR10,Dolby Vision,Dolby Atmos",
  // Cast
  cast: [
    { name: "Adam Scott", role: "Mark Scout", img: "https://i.pravatar.cc/150?img=12" },
    { name: "Patricia Arquette", role: "Harmony Cobel", img: "https://i.pravatar.cc/150?img=47" },
    { name: "John Turturro", role: "Irving Bailiff", img: "https://i.pravatar.cc/150?img=53" },
    { name: "Britt Lower", role: "Helly R.", img: "https://i.pravatar.cc/150?img=32" },
    { name: "Zach Cherry", role: "Dylan George", img: "https://i.pravatar.cc/150?img=18" },
    { name: "Tramell Tillman", role: "Seth Milchick", img: "https://i.pravatar.cc/150?img=22" },
  ],
  // Seasons / episodes
  seasons: [
    {
      label: "Temporada 1",
      episodes: [
        { n: 1, title: "Bienvenidos", dur: "52 min", desc: "Mark começa seu primeiro dia no departamento de refinamento de dados da Lumon.", progress: 100, img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&q=60" },
        { n: 2, title: "Half Loop", dur: "46 min", desc: "Helly faz várias tentativas de renúncia enquanto o departamento recebe uma misteriosa caixa.", progress: 45, img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=300&q=60" },
        { n: 3, title: "In Perpetuity", dur: "50 min", desc: "Mark é promovido a supervisor e descobre detalhes perturbadores sobre a missão da Lumon.", progress: 0, img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=300&q=60" },
      ],
    },
    {
      label: "Temporada 2",
      episodes: [
        { n: 1, title: "Cold Harbor", dur: "58 min", desc: "Após os eventos do finale, Mark Innie enfrenta as consequências do Override.", progress: 0, img: "https://images.unsplash.com/photo-1634157703702-3c124b455499?w=300&q=60" },
        { n: 2, title: "Goodbye Mr. Graner", dur: "54 min", desc: "O departamento recebe um novo gerente. Helly R. confronta sua identidade como Helena.", progress: 0, img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&q=60" },
      ],
    },
  ],
  // Recs
  recs: [
    { title: "The Morning Show", sub: "Drama · 3 Temporadas", img: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=300&q=60" },
    { title: "Foundation", sub: "Sci-Fi · 3 Temporadas", img: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=300&q=60" },
    { title: "Slow Horses", sub: "Thriller · 4 Temporadas", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&q=60" },
    { title: "Black Mirror", sub: "Ficção · 6 Temporadas", img: "https://images.unsplash.com/photo-1531722569936-825d4ecea6cd?w=300&q=60" },
  ],
  // Details
  year: "2022",
  country: "Estados Unidos",
  ageRating: "+16 — Conteúdo adulto, violência psicológica",
  episodesCount: "18 episódios (2 temporadas)",
  avgDuration: "~55 min por episódio",
  subtitles: "PT-BR · EN · ES · FR · DE · JA · KO",
  audio: "Inglês (original) · Português · Espanhol",
  execProducer: "Ben Stiller, Dan Erickson, Mark Friedman",
  // Footer
  copyright: "Copyright © 2025 Apple Inc. Todos os direitos reservados.",
  navLinks: "Início,Originais,Filmes,Séries,Infantil",
};

// ─── Estilos internos do gerador ─────────────────────────────────────────────
const S = {
  wrap: { fontFamily: "'Inter', -apple-system, sans-serif", background: "#0a0a0a", color: "#f0f0f0", minHeight: "100vh", display: "flex", flexDirection: "column" },
  header: { background: "linear-gradient(135deg,#111 0%,#1a1a2e 100%)", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" },
  headerTitle: { fontSize: 22, fontWeight: 700, letterSpacing: "-0.03em", margin: 0, background: "linear-gradient(90deg,#fff 60%,#888)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  headerSub: { fontSize: 13, color: "#666", marginTop: 3 },
  genBtn: { background: "linear-gradient(135deg,#0071e3,#0058b0)", color: "#fff", border: "none", borderRadius: 12, padding: "12px 28px", fontSize: 14, fontWeight: 600, cursor: "pointer", letterSpacing: "-0.01em", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 8 },
  body: { display: "flex", flex: 1, overflow: "hidden" },
  sidebar: { width: 200, background: "#111", borderRight: "1px solid rgba(255,255,255,0.06)", padding: "20px 0", flexShrink: 0, overflowY: "auto" },
  sideItem: (active) => ({ display: "flex", alignItems: "center", gap: 10, padding: "10px 20px", cursor: "pointer", fontSize: 13, fontWeight: active ? 600 : 400, color: active ? "#fff" : "#666", background: active ? "rgba(255,255,255,0.07)" : "transparent", borderLeft: `2px solid ${active ? "#0071e3" : "transparent"}`, transition: "all 0.15s" }),
  main: { flex: 1, overflowY: "auto", padding: "32px 40px" },
  section: { maxWidth: 760, margin: "0 auto" },
  sectionTitle: { fontSize: 18, fontWeight: 700, marginBottom: 20, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 10 },
  icon: { fontSize: 18 },
  fieldRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 },
  fieldFull: { marginBottom: 16 },
  label: { display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#666", marginBottom: 6 },
  input: { width: "100%", background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "10px 14px", fontSize: 14, color: "#f0f0f0", outline: "none", boxSizing: "border-box", fontFamily: "inherit", transition: "border-color 0.2s" },
  textarea: { width: "100%", background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "10px 14px", fontSize: 14, color: "#f0f0f0", outline: "none", boxSizing: "border-box", fontFamily: "inherit", resize: "vertical", minHeight: 90 },
  radio: { display: "flex", gap: 12, marginBottom: 16 },
  radioItem: (active) => ({ display: "flex", alignItems: "center", gap: 8, padding: "9px 16px", borderRadius: 10, border: `1px solid ${active ? "#0071e3" : "rgba(255,255,255,0.1)"}`, cursor: "pointer", fontSize: 13, background: active ? "rgba(0,113,227,0.12)" : "transparent", color: active ? "#4da6ff" : "#888", transition: "all 0.2s" }),
  card: { background: "#141414", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: 16, marginBottom: 10 },
  cardHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  cardTitle: { fontSize: 13, fontWeight: 600, color: "#aaa" },
  addBtn: { display: "flex", alignItems: "center", gap: 6, background: "rgba(0,113,227,0.15)", border: "1px solid rgba(0,113,227,0.3)", borderRadius: 8, padding: "7px 14px", fontSize: 12, fontWeight: 600, color: "#4da6ff", cursor: "pointer", transition: "all 0.2s" },
  removeBtn: { background: "rgba(255,59,48,0.12)", border: "1px solid rgba(255,59,48,0.25)", borderRadius: 7, padding: "4px 10px", fontSize: 11, fontWeight: 600, color: "#ff6b6b", cursor: "pointer" },
  tagInput: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 },
  tag: { display: "flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 7, padding: "3px 10px", fontSize: 12 },
  tagX: { cursor: "pointer", color: "#666", fontSize: 14, lineHeight: 1 },
  hint: { fontSize: 11, color: "#555", marginTop: 4 },
  progressDot: (v) => ({ width: 8, height: 8, borderRadius: "50%", background: v > 0 ? "#30d158" : "#333", flexShrink: 0, marginTop: 2 }),
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 7);

function Field({ label, value, onChange, placeholder, type = "text", full }) {
  return (
    <div style={full ? S.fieldFull : {}}>
      <label style={S.label}>{label}</label>
      <input style={S.input} type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}

function TextArea({ label, value, onChange, placeholder, rows = 4 }) {
  return (
    <div style={S.fieldFull}>
      <label style={S.label}>{label}</label>
      <textarea style={{ ...S.textarea, minHeight: rows * 22 + 20 }} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}

// ─── Gerador de HTML ──────────────────────────────────────────────────────────
function buildHTML(d) {
  const qualityBadges = d.qualities.split(",").map((q) => {
    const t = q.trim();
    const dolby = t.toLowerCase().includes("dolby");
    return `<span class="q-badge${dolby ? " dolby" : ""}">${t}</span>`;
  }).join("\n              ");

  const castJS = JSON.stringify(d.cast.map((c) => ({ name: c.name, role: c.role, img: c.img || "" })), null, 2);

  const seasonsOptions = d.seasons.map((s, i) =>
    `<option value="${i + 1}"${i === 0 ? " selected" : ""}>${s.label}</option>`
  ).join("\n        ");

  const seasonsJS = d.seasons.map((s, si) => {
    const varName = `EPISODES_S${si + 1}`;
    const eps = JSON.stringify(s.episodes.map((ep) => ({ n: ep.n, title: ep.title, dur: ep.dur, desc: ep.desc, progress: Number(ep.progress) || 0, img: ep.img || "" })), null, 2);
    return `const ${varName} = ${eps};`;
  }).join("\n\n");

  const seasonsSwitchJS = d.seasons.map((_, i) =>
    i === 0 ? `if(s==='1') eps=EPISODES_S1;` : `else if(s==='${i + 1}') eps=EPISODES_S${i + 1};`
  ).join("\n  ");

  const recsJS = JSON.stringify(d.recs.map((r) => ({ title: r.title, sub: r.sub, img: r.img || "" })), null, 2);

  const navLinksArr = d.navLinks.split(",").map((l) => l.trim());
  const navLinksHTML = navLinksArr.map((l, i) =>
    `<a href="#"${i === 1 ? ' class="active"' : ""}>${l}</a>`
  ).join("\n    ");

  const playerHTML = d.playerType === "embed"
    ? `<div style="width:100%;height:100%;position:relative">
      ${d.embedCode}
    </div>`
    : `<video class="player-video" id="mainVideo"
      src="${d.videoUrl}"
      preload="metadata"
      ontimeupdate="onTimeUpdate()"
      onprogress="onProgress()"
      onended="onVideoEnded()"
      onclick="togglePlayPause()">
    </video>
    <!-- Controls -->
    <div class="player-controls" id="playerControls">
      <div class="player-progress-wrap" id="progressWrap" onmousedown="startScrub(event)" onclick="seekTo(event)">
        <div class="player-progress-track">
          <div class="player-progress-buf" id="progressBuf" style="width:0%"></div>
          <div class="player-progress-fill" id="progressFill" style="width:0%"></div>
        </div>
      </div>
      <div class="ctrl-row">
        <button class="ctrl-btn" id="playPauseBtn" onclick="togglePlayPause()">
          <svg id="playIcon" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </button>
        <button class="ctrl-btn" onclick="skip(-10)">
          <svg viewBox="0 0 24 24"><path d="M11.99 5V1l-5 5 5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6h-2c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg>
        </button>
        <button class="ctrl-btn" onclick="skip(10)">
          <svg viewBox="0 0 24 24"><path d="M18 13c0 3.31-2.69 6-6 6s-6-2.69-6-6 2.69-6 6-6v4l5-5-5-5v4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8h-2z"/></svg>
        </button>
        <div class="vol-wrap">
          <button class="ctrl-btn" onclick="toggleMute()" id="muteBtn">
            <svg id="volIcon" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
          </button>
          <input class="vol-slider" type="range" id="volSlider" min="0" max="1" step="0.05" value="1" oninput="setVolume(this.value)">
        </div>
        <span class="time-label" id="timeLabel">0:00 / 0:00</span>
        <div class="ctrl-row-right">
          <div class="ctrl-pill" onclick="toggleCC(this)">
            <svg viewBox="0 0 24 24" style="width:14px;height:14px;fill:currentColor"><path d="M19 4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 7H9.5v-.5h-2v3h2V13H11v1c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1zm7 0h-1.5v-.5h-2v3h2V13H18v1c0 .55-.45 1-1 1h-3c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1z"/></svg>
            CC
          </div>
          <button class="ctrl-btn" onclick="toggleFullscreen()">
            <svg id="fsIcon" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
          </button>
        </div>
      </div>
    </div>`;

  const videoControlsJS = d.playerType === "embed" ? "// Embed mode — sem controles personalizados" : `
function togglePlayPause(){
  const v=document.getElementById('mainVideo');
  const icon=document.getElementById('playIcon');
  if(v.paused){v.play();icon.innerHTML='<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';}
  else{v.pause();icon.innerHTML='<path d="M8 5v14l11-7z"/>';}
}
function skip(sec){const v=document.getElementById('mainVideo');v.currentTime=Math.max(0,Math.min(v.duration||0,v.currentTime+sec));}
function onTimeUpdate(){const v=document.getElementById('mainVideo');if(!v.duration)return;const pct=(v.currentTime/v.duration)*100;document.getElementById('progressFill').style.width=pct+'%';document.getElementById('timeLabel').textContent=fmtTime(v.currentTime)+' / '+fmtTime(v.duration);saveCurrent(v.currentTime);}
function onProgress(){const v=document.getElementById('mainVideo');if(!v.duration)return;try{const buf=v.buffered;if(buf.length>0){const pct=(buf.end(buf.length-1)/v.duration)*100;document.getElementById('progressBuf').style.width=pct+'%';}}catch(e){}}
function onVideoEnded(){document.getElementById('playIcon').innerHTML='<path d="M8 5v14l11-7z"/>';saveCurrent(0);}
function seekTo(e){const v=document.getElementById('mainVideo');if(!v.duration)return;const wrap=document.getElementById('progressWrap');const rect=wrap.getBoundingClientRect();const pct=Math.max(0,Math.min(1,(e.clientX-rect.left)/rect.width));v.currentTime=pct*v.duration;}
function startScrub(e){let scrubbing=true;const move=ev=>{const v=document.getElementById('mainVideo');if(!v.duration)return;const wrap=document.getElementById('progressWrap');const rect=wrap.getBoundingClientRect();const pct=Math.max(0,Math.min(1,(ev.clientX-rect.left)/rect.width));v.currentTime=pct*v.duration;};const up=()=>{scrubbing=false;window.removeEventListener('mousemove',move);window.removeEventListener('mouseup',up);};window.addEventListener('mousemove',move);window.addEventListener('mouseup',up);}
function toggleMute(){const v=document.getElementById('mainVideo');v.muted=!v.muted;const icon=document.getElementById('volIcon');icon.innerHTML=v.muted?'<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>':'<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>';}
function setVolume(val){document.getElementById('mainVideo').volume=parseFloat(val);}
function toggleCC(el){el._cc=!el._cc;el.style.background=el._cc?'rgba(0,113,227,.3)':'';el.style.color=el._cc?'#0a84ff':'';toast(el._cc?'Legendas ativadas':'Legendas desativadas');}
function toggleFullscreen(){const cont=document.getElementById('playerContainer');const icon=document.getElementById('fsIcon');if(!document.fullscreenElement){cont.requestFullscreen&&cont.requestFullscreen();icon.innerHTML='<path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>';}else{document.exitFullscreen&&document.exitFullscreen();icon.innerHTML='<path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>';}}
function fmtTime(s){s=Math.floor(s)||0;const m=Math.floor(s/60),sec=s%60;return m+':'+(sec<10?'0':'')+sec;}`;

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${d.title}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#0d0d0d;--bg2:#161616;--bg3:#222222;--bg4:#2c2c2c;
  --accent:#0071e3;--red:#ff3b30;--green:#30d158;
  --text:#f5f5f7;--text2:#a1a1a6;--text3:#6e6e73;
  --radius:14px;--nav-h:64px;
}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,'SF Pro Display','Helvetica Neue',sans-serif;overflow-x:hidden;min-height:100vh}
nav{position:fixed;top:0;left:0;right:0;height:var(--nav-h);z-index:900;display:flex;align-items:center;justify-content:space-between;padding:0 40px;background:linear-gradient(to bottom,rgba(13,13,13,.98),transparent);transition:background .4s}
nav.solid{background:rgba(13,13,13,.96);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border-bottom:1px solid rgba(255,255,255,.05)}
.nav-logo{display:flex;align-items:center;gap:7px;font-size:18px;font-weight:600;color:var(--text);text-decoration:none;letter-spacing:-.01em}
.nav-logo svg{width:22px;height:22px;fill:currentColor}
.nav-center{display:flex;gap:2px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);border-radius:24px;padding:4px 6px}
.nav-center a{color:var(--text2);text-decoration:none;font-size:14px;padding:6px 16px;border-radius:20px;transition:all .2s;white-space:nowrap}
.nav-center a:hover{color:var(--text);background:rgba(255,255,255,.08)}
.nav-center a.active{background:var(--text);color:#000;font-weight:500}
.nav-right{display:flex;align-items:center;gap:8px}
.nav-icon{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--text2);cursor:pointer;border:none;background:transparent;transition:all .2s}
.nav-icon:hover{color:var(--text);background:rgba(255,255,255,.1)}
.nav-icon svg{width:19px;height:19px;fill:currentColor}
.hero{position:relative;min-height:100vh;display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden}
.hero-bg{position:absolute;inset:0;background-size:cover;background-position:${d.heroBgPos};filter:saturate(1.05)}
.hero-vignette{position:absolute;inset:0;background:linear-gradient(to top,var(--bg) 0%,rgba(13,13,13,.75) 35%,rgba(13,13,13,.2) 70%,transparent 100%)}
.hero-vignette2{position:absolute;inset:0;background:linear-gradient(to right,rgba(13,13,13,.92) 0%,rgba(13,13,13,.4) 55%,transparent 100%)}
.hero-content{position:relative;z-index:2;padding:0 56px 60px;max-width:600px}
.hero-badge{display:inline-flex;align-items:center;gap:7px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);border-radius:20px;padding:5px 14px;font-size:12px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;margin-bottom:18px;backdrop-filter:blur(10px);color:var(--text)}
.hero-badge .dot-new{width:6px;height:6px;border-radius:50%;background:#30d158;flex-shrink:0}
.hero-logo-title{font-size:clamp(46px,5.5vw,74px);font-weight:700;line-height:1;letter-spacing:-.03em;margin-bottom:14px}
.hero-tagline{font-size:16px;color:var(--text2);line-height:1.55;margin-bottom:12px;font-weight:300;max-width:480px}
.hero-meta{display:flex;align-items:center;flex-wrap:wrap;gap:8px;font-size:13px;color:var(--text3);margin-bottom:30px}
.hero-meta-dot{width:3px;height:3px;border-radius:50%;background:var(--text3)}
.hero-meta .rating-badge{background:rgba(255,200,0,.14);color:#ffc800;border:1px solid rgba(255,200,0,.3);border-radius:6px;padding:2px 7px;font-size:12px;font-weight:700}
.hero-meta .res-badge{background:rgba(0,113,227,.15);color:#0a84ff;border:1px solid rgba(0,113,227,.3);border-radius:6px;padding:2px 7px;font-size:11px;font-weight:700}
.hero-actions{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.btn-play{display:inline-flex;align-items:center;gap:9px;background:var(--text);color:#000;border:none;border-radius:12px;padding:14px 30px;font-size:16px;font-weight:600;cursor:pointer;transition:all .22s;font-family:inherit;letter-spacing:-.01em}
.btn-play:hover{background:#e5e5ea;transform:scale(1.025)}
.btn-play:active{transform:scale(.98)}
.btn-play svg{width:18px;height:18px;fill:currentColor}
.btn-secondary{display:inline-flex;align-items:center;gap:9px;background:rgba(255,255,255,.1);color:var(--text);border:1px solid rgba(255,255,255,.18);border-radius:12px;padding:14px 24px;font-size:15px;font-weight:500;cursor:pointer;transition:all .22s;font-family:inherit;backdrop-filter:blur(10px)}
.btn-secondary:hover{background:rgba(255,255,255,.18)}
.btn-secondary svg{width:18px;height:18px;fill:currentColor}
.btn-icon{width:50px;height:50px;border-radius:50%;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);display:inline-flex;align-items:center;justify-content:center;color:var(--text);cursor:pointer;transition:all .22s;backdrop-filter:blur(10px)}
.btn-icon:hover{background:rgba(255,255,255,.2);transform:scale(1.05)}
.btn-icon svg{width:20px;height:20px;fill:currentColor}
.btn-icon.liked{background:rgba(255,59,48,.15);border-color:rgba(255,59,48,.4);color:var(--red)}
.player-overlay{position:fixed;inset:0;z-index:2000;background:rgba(0,0,0,0);backdrop-filter:blur(0px);display:flex;align-items:center;justify-content:center;transition:all .35s cubic-bezier(.4,0,.2,1);pointer-events:none;opacity:0}
.player-overlay.open{background:rgba(0,0,0,.92);backdrop-filter:blur(18px);pointer-events:all;opacity:1}
.player-container{position:relative;width:min(1100px,96vw);border-radius:20px;overflow:hidden;background:#000;box-shadow:0 40px 100px rgba(0,0,0,.9);transform:scale(.92) translateY(24px);transition:transform .35s cubic-bezier(.34,1.3,.64,1);aspect-ratio:16/9}
.player-overlay.open .player-container{transform:scale(1) translateY(0)}
.player-video{width:100%;height:100%;object-fit:contain;background:#000;display:block}
.player-close{position:absolute;top:16px;right:16px;width:38px;height:38px;border-radius:50%;background:rgba(20,20,20,.75);border:1px solid rgba(255,255,255,.15);color:var(--text);cursor:pointer;font-size:20px;display:flex;align-items:center;justify-content:center;z-index:10;transition:background .2s;backdrop-filter:blur(10px)}
.player-close:hover{background:rgba(60,60,60,.9)}
.player-controls{position:absolute;bottom:0;left:0;right:0;padding:0 20px 20px;background:linear-gradient(to top,rgba(0,0,0,.9) 0%,transparent 100%);opacity:0;transition:opacity .25s}
.player-container:hover .player-controls{opacity:1}
.player-progress-wrap{margin-bottom:14px;cursor:pointer;position:relative;padding:6px 0}
.player-progress-track{height:4px;background:rgba(255,255,255,.2);border-radius:2px;position:relative;transition:height .15s}
.player-progress-wrap:hover .player-progress-track{height:6px}
.player-progress-fill{height:100%;background:var(--text);border-radius:2px;pointer-events:none;position:relative}
.player-progress-fill::after{content:'';position:absolute;right:-6px;top:50%;transform:translateY(-50%);width:12px;height:12px;border-radius:50%;background:var(--text);opacity:0;transition:opacity .15s}
.player-progress-wrap:hover .player-progress-fill::after{opacity:1}
.player-progress-buf{position:absolute;top:0;left:0;height:100%;background:rgba(255,255,255,.35);border-radius:2px;pointer-events:none}
.ctrl-row{display:flex;align-items:center;gap:12px}
.ctrl-row-right{margin-left:auto;display:flex;align-items:center;gap:10px}
.ctrl-btn{width:38px;height:38px;border-radius:50%;border:none;background:transparent;color:var(--text);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s;flex-shrink:0}
.ctrl-btn:hover{background:rgba(255,255,255,.12)}
.ctrl-btn svg{width:20px;height:20px;fill:currentColor}
.vol-wrap{display:flex;align-items:center;gap:8px}
.vol-slider{width:80px;height:3px;appearance:none;background:rgba(255,255,255,.25);border-radius:2px;outline:none;cursor:pointer}
.vol-slider::-webkit-slider-thumb{appearance:none;width:13px;height:13px;border-radius:50%;background:var(--text);cursor:pointer}
.time-label{font-size:13px;color:rgba(255,255,255,.75);font-variant-numeric:tabular-nums;white-space:nowrap;letter-spacing:.01em}
.ctrl-pill{display:flex;align-items:center;gap:5px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);border-radius:8px;padding:5px 12px;font-size:12px;font-weight:600;cursor:pointer;color:var(--text);transition:background .2s}
.ctrl-pill:hover{background:rgba(255,255,255,.2)}
.section{padding:0 48px;margin-bottom:48px}
.sec-title{font-size:20px;font-weight:600;letter-spacing:-.01em;margin-bottom:20px}
.sec-title-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px}
.sec-title-row .sec-title{margin-bottom:0}
.see-all{font-size:13px;color:var(--accent);background:none;border:none;cursor:pointer;font-family:inherit;font-weight:500;display:flex;align-items:center;gap:3px;transition:opacity .2s}
.see-all:hover{opacity:.7}
.see-all svg{width:13px;height:13px;fill:currentColor}
.synopsis-wrap{display:grid;grid-template-columns:1fr 280px;gap:48px;align-items:start}
.synopsis-text{font-size:16px;color:var(--text2);line-height:1.7;overflow:hidden;position:relative}
.synopsis-text.collapsed{max-height:90px}
.synopsis-text.collapsed::after{content:'';position:absolute;bottom:0;left:0;right:0;height:40px;background:linear-gradient(to top,var(--bg),transparent)}
.see-more-btn{background:none;border:none;color:var(--accent);font-size:14px;font-weight:500;cursor:pointer;font-family:inherit;margin-top:12px;display:inline-flex;align-items:center;gap:4px;padding:0}
.see-more-btn svg{width:14px;height:14px;fill:currentColor;transition:transform .2s}
.see-more-btn.expanded svg{transform:rotate(180deg)}
.meta-grid{display:flex;flex-direction:column;gap:14px}
.meta-row{display:flex;flex-direction:column;gap:4px}
.meta-label{font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--text3)}
.meta-value{font-size:14px;color:var(--text2)}
.meta-value a{color:var(--accent);text-decoration:none}
.meta-value a:hover{text-decoration:underline}
.quality-row{display:flex;gap:6px;flex-wrap:wrap}
.q-badge{display:inline-flex;align-items:center;gap:4px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:7px;padding:3px 9px;font-size:11px;font-weight:700;color:var(--text2);letter-spacing:.04em}
.q-badge.dolby{background:rgba(255,190,0,.08);border-color:rgba(255,190,0,.25);color:#ffc800}
.cast-row{display:flex;gap:16px;overflow-x:auto;padding-bottom:6px;scroll-behavior:smooth;-webkit-overflow-scrolling:touch}
.cast-row::-webkit-scrollbar{height:0}
.cast-card{flex:0 0 auto;width:108px;cursor:pointer;text-align:center}
.cast-avatar{width:80px;height:80px;border-radius:50%;object-fit:cover;background:var(--bg3);margin:0 auto 8px;display:block;border:2px solid rgba(255,255,255,.08);transition:border-color .2s}
.cast-card:hover .cast-avatar{border-color:rgba(255,255,255,.3)}
.cast-name{font-size:12px;font-weight:500;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cast-role{font-size:11px;color:var(--text3);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.episodes-header{display:flex;align-items:center;gap:16px;margin-bottom:20px}
.season-select{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:8px 14px;font-size:14px;font-weight:500;color:var(--text);cursor:pointer;font-family:inherit;appearance:none;outline:none;transition:background .2s}
.season-select:hover{background:rgba(255,255,255,.14)}
.episode-list{display:flex;flex-direction:column;gap:2px}
.ep-item{display:grid;grid-template-columns:auto 120px 1fr;gap:16px;align-items:center;padding:14px 16px;border-radius:12px;cursor:pointer;transition:background .2s;position:relative}
.ep-item:hover{background:rgba(255,255,255,.05)}
.ep-item.playing{background:rgba(0,113,227,.08);border:1px solid rgba(0,113,227,.2)}
.ep-num{font-size:16px;font-weight:600;color:var(--text3);width:28px;text-align:center;flex-shrink:0}
.ep-thumb-wrap{position:relative;border-radius:10px;overflow:hidden;background:var(--bg3)}
.ep-thumb{width:120px;height:68px;object-fit:cover;display:block}
.ep-thumb-play{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.5);opacity:0;transition:opacity .2s}
.ep-item:hover .ep-thumb-play{opacity:1}
.ep-thumb-play svg{width:28px;height:28px;fill:#fff}
.ep-progress{position:absolute;bottom:0;left:0;right:0;height:3px;background:rgba(255,255,255,.15)}
.ep-progress-fill{height:100%;background:var(--accent);border-radius:0 2px 2px 0}
.ep-title-row{display:flex;align-items:center;justify-content:space-between;gap:8px}
.ep-title{font-size:15px;font-weight:500}
.ep-duration{font-size:13px;color:var(--text3);flex-shrink:0}
.ep-desc{font-size:13px;color:var(--text3);margin-top:5px;line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.ep-playing-label{font-size:11px;font-weight:700;color:var(--accent);letter-spacing:.04em;text-transform:uppercase;margin-top:4px}
.rec-row{display:flex;gap:14px;overflow-x:auto;padding-bottom:6px;scroll-behavior:smooth;-webkit-overflow-scrolling:touch}
.rec-row::-webkit-scrollbar{height:0}
.rec-card{flex:0 0 auto;width:200px;cursor:pointer;border-radius:12px;overflow:hidden;background:var(--bg2);border:1px solid rgba(255,255,255,.06);transition:transform .3s,border-color .3s;position:relative}
.rec-card:hover{transform:scale(1.04);border-color:rgba(255,255,255,.15);z-index:5}
.rec-card:hover .rec-overlay{opacity:1}
.rec-thumb{width:100%;height:112px;object-fit:cover;display:block;background:var(--bg3)}
.rec-overlay{position:absolute;top:0;left:0;right:0;height:112px;background:linear-gradient(to top,rgba(0,0,0,.8),transparent 60%);opacity:0;transition:opacity .25s;display:flex;align-items:flex-end;padding:10px}
.rec-play-btn{width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.9);display:flex;align-items:center;justify-content:center;margin-left:auto}
.rec-play-btn svg{width:14px;height:14px;fill:#000;margin-left:1px}
.rec-info{padding:10px 12px 12px}
.rec-title{font-size:13px;font-weight:500;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rec-sub{font-size:11px;color:var(--text3);margin-top:3px}
.interactions-bar{display:flex;align-items:center;gap:16px;padding:20px 48px;background:rgba(255,255,255,.025);border-top:1px solid rgba(255,255,255,.06);border-bottom:1px solid rgba(255,255,255,.06)}
.interact-btn{display:inline-flex;align-items:center;gap:8px;background:none;border:1px solid rgba(255,255,255,.12);border-radius:24px;padding:9px 18px;font-size:13px;font-weight:500;color:var(--text2);cursor:pointer;transition:all .22s;font-family:inherit}
.interact-btn:hover{background:rgba(255,255,255,.08);color:var(--text)}
.interact-btn svg{width:16px;height:16px;fill:currentColor}
.interact-btn.active{background:rgba(255,59,48,.1);border-color:rgba(255,59,48,.35);color:var(--red)}
.interact-btn.in-list{background:rgba(48,209,88,.1);border-color:rgba(48,209,88,.35);color:var(--green)}
.divider{height:1px;background:rgba(255,255,255,.06);margin:0 48px}
.toast{position:fixed;bottom:36px;left:50%;transform:translateX(-50%) translateY(16px);background:rgba(36,36,38,.97);border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:12px 24px;font-size:14px;color:var(--text);opacity:0;transition:all .28s;z-index:9999;pointer-events:none;backdrop-filter:blur(20px);white-space:nowrap}
.toast.show{opacity:1;transform:translateX(-50%) translateY(0)}
::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:rgba(255,255,255,.12);border-radius:3px}
footer{padding:48px 48px 36px;border-top:1px solid rgba(255,255,255,.06);margin-top:48px}
.footer-links{display:flex;gap:24px;flex-wrap:wrap;margin-bottom:16px}
.footer-links a{color:var(--text3);font-size:12px;text-decoration:none;transition:color .2s}
.footer-links a:hover{color:var(--text2)}
.footer-copy{font-size:12px;color:var(--text3)}
@media(max-width:900px){.hero-content{padding:0 24px 48px;max-width:100%}.section{padding:0 20px}.divider{margin:0 20px}.interactions-bar{padding:16px 20px;flex-wrap:wrap;gap:10px}.synopsis-wrap{grid-template-columns:1fr;gap:32px}nav{padding:0 20px}.nav-center{display:none}footer{padding:32px 20px}}
@media(max-width:600px){.hero-logo-title{font-size:38px}.ep-item{grid-template-columns:auto 96px 1fr}.ep-thumb{width:96px;height:54px}}
@keyframes shimmer{0%{background-position:-600px 0}100%{background-position:600px 0}}
.shimmer{background:linear-gradient(90deg,var(--bg3) 25%,rgba(255,255,255,.04) 50%,var(--bg3) 75%);background-size:1200px 100%;animation:shimmer 1.8s infinite}
</style>
</head>
<body>

<nav id="mainNav">
  <a class="nav-logo" href="#">
    <svg viewBox="0 0 814 1000"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-127.4C46 790.6 0 663 0 541.8c0-207.5 135.4-317.3 268.3-317.3 99.8 0 176.3 65.7 235.1 65.7 56.1 0 144.1-69.3 256.8-69.3z"/></svg>
    TV+
  </a>
  <div class="nav-center">
    ${navLinksHTML}
  </div>
  <div class="nav-right">
    <button class="nav-icon" onclick="toast('Busca em breve')">
      <svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
    </button>
    <button class="nav-icon" onclick="toast('Conta')">
      <svg viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
    </button>
  </div>
</nav>

<section class="hero">
  <div class="hero-bg" style="background-image:url('${d.heroBg}')"></div>
  <div class="hero-vignette"></div>
  <div class="hero-vignette2"></div>
  <div class="hero-content">
    <div class="hero-badge"><span class="dot-new"></span>${d.badge}</div>
    <h1 class="hero-logo-title">${d.title}</h1>
    <p class="hero-tagline">${d.tagline}</p>
    <div class="hero-meta">
      <span class="rating-badge">⭐ ${d.rating}</span>
      <span class="hero-meta-dot"></span>
      <span>${d.years}</span>
      <span class="hero-meta-dot"></span>
      <span>${d.heroGenre}</span>
      <span class="hero-meta-dot"></span>
      <span>${d.seasonsLabel}</span>
      <span class="hero-meta-dot"></span>
      <span>${d.classification}</span>
      <span class="res-badge">${d.resolution}</span>
    </div>
    <div class="hero-actions">
      <button class="btn-play" onclick="openPlayer()">
        <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        Assistir
      </button>
      <button class="btn-secondary" id="heroAddBtn" onclick="toggleList(this)">
        <svg viewBox="0 0 24 24" id="heroAddIcon"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
        Minha Lista
      </button>
      <button class="btn-icon" id="heroLikeBtn" onclick="toggleLike(this)">
        <svg viewBox="0 0 24 24"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>
      </button>
      <button class="btn-icon" onclick="shareContent()">
        <svg viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>
      </button>
    </div>
  </div>
</section>

<div class="player-overlay" id="playerOverlay" onclick="handleOverlayClick(event)">
  <div class="player-container" id="playerContainer">
    ${playerHTML}
    <button class="player-close" onclick="closePlayer()">✕</button>
  </div>
</div>

<div class="page-body">

  <div class="interactions-bar">
    <button class="interact-btn" id="likeBtn2" onclick="toggleLike2()">
      <svg viewBox="0 0 24 24"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>
      Curtir
    </button>
    <button class="interact-btn" id="listBtn2" onclick="toggleList2()">
      <svg viewBox="0 0 24 24" id="listIcon2"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
      Minha Lista
    </button>
    <button class="interact-btn" onclick="shareContent()">
      <svg viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>
      Compartilhar
    </button>
  </div>

  <div class="section" style="padding-top:40px">
    <div class="synopsis-wrap">
      <div>
        <h2 class="sec-title">Sobre</h2>
        <div class="synopsis-text collapsed" id="synopsisText">${d.synopsis}</div>
        <button class="see-more-btn" id="seeMoreBtn" onclick="toggleSynopsis()">
          <span id="seeMoreLabel">Ver mais</span>
          <svg viewBox="0 0 24 24"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>
        </button>
      </div>
      <div>
        <div class="meta-grid">
          <div class="meta-row"><span class="meta-label">Criador</span><span class="meta-value">${d.creator}</span></div>
          <div class="meta-row"><span class="meta-label">Diretor</span><span class="meta-value">${d.director}</span></div>
          <div class="meta-row"><span class="meta-label">Elenco principal</span><span class="meta-value">${d.mainCast}</span></div>
          <div class="meta-row"><span class="meta-label">Gênero</span><span class="meta-value">${d.metaGenre}</span></div>
          <div class="meta-row"><span class="meta-label">Idiomas</span><span class="meta-value">${d.languages}</span></div>
          <div class="meta-row"><span class="meta-label">Estúdio</span><span class="meta-value">${d.studio}</span></div>
          <div class="meta-row">
            <span class="meta-label">Qualidade</span>
            <div class="quality-row">
              ${qualityBadges}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="divider"></div>

  <div class="section" style="padding-top:36px">
    <div class="sec-title-row">
      <h2 class="sec-title">Elenco & Equipe</h2>
      <button class="see-all" onclick="toast('Ver todo o elenco')">Ver todos <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg></button>
    </div>
    <div class="cast-row" id="castRow"></div>
  </div>

  <div class="divider"></div>

  <div class="section" style="padding-top:36px">
    <div class="episodes-header">
      <h2 class="sec-title" style="margin-bottom:0">Episódios</h2>
      <select class="season-select" id="seasonSelect" onchange="renderEpisodes()">
        ${seasonsOptions}
      </select>
    </div>
    <div class="episode-list" id="episodeList"></div>
  </div>

  <div class="divider"></div>

  <div class="section" style="padding-top:36px">
    <div class="sec-title-row">
      <h2 class="sec-title">Você também pode gostar</h2>
      <button class="see-all" onclick="toast('Ver mais recomendações')">Ver mais <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg></button>
    </div>
    <div class="rec-row" id="recRow"></div>
  </div>

  <div class="divider"></div>

  <div class="section" style="padding-top:36px">
    <h2 class="sec-title">Detalhes</h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:20px">
      <div class="meta-row"><span class="meta-label">Ano de lançamento</span><span class="meta-value">${d.year}</span></div>
      <div class="meta-row"><span class="meta-label">País de origem</span><span class="meta-value">${d.country}</span></div>
      <div class="meta-row"><span class="meta-label">Classificação indicativa</span><span class="meta-value">${d.ageRating}</span></div>
      <div class="meta-row"><span class="meta-label">Episódios</span><span class="meta-value">${d.episodesCount}</span></div>
      <div class="meta-row"><span class="meta-label">Duração média</span><span class="meta-value">${d.avgDuration}</span></div>
      <div class="meta-row"><span class="meta-label">Legendas disponíveis</span><span class="meta-value">${d.subtitles}</span></div>
      <div class="meta-row"><span class="meta-label">Áudios disponíveis</span><span class="meta-value">${d.audio}</span></div>
      <div class="meta-row"><span class="meta-label">Produtora executiva</span><span class="meta-value">${d.execProducer}</span></div>
    </div>
  </div>

</div>

<footer>
  <div class="footer-links">
    <a href="#">Privacidade</a>
    <a href="#">Termos de uso</a>
    <a href="#">Suporte</a>
    <a href="#">Acessibilidade</a>
  </div>
  <div class="footer-copy">${d.copyright}</div>
</footer>

<div class="toast" id="toastEl"></div>

<script>
const CAST = ${castJS};

${seasonsJS}

const RECS = ${recsJS};

let isLiked=false,inList=false;

function renderCast(){
  const row=document.getElementById('castRow');
  row.innerHTML=CAST.map(c=>\`
    <div class="cast-card">
      <img class="cast-avatar" src="\${c.img}" alt="\${c.name}" loading="lazy" onerror="this.src='https://ui-avatars.com/api/?name=\${encodeURIComponent(c.name)}&background=333&color=fff&size=80'">
      <div class="cast-name">\${c.name}</div>
      <div class="cast-role">\${c.role}</div>
    </div>
  \`).join('');
}

function renderEpisodes(){
  const s=document.getElementById('seasonSelect').value;
  let eps=EPISODES_S1;
  ${seasonsSwitchJS}
  const list=document.getElementById('episodeList');
  list.innerHTML=eps.map((ep,i)=>\`
    <div class="ep-item\${ep.progress>0&&ep.progress<100?' playing':''}">
      <div class="ep-num">\${ep.n}</div>
      <div class="ep-thumb-wrap">
        <img class="ep-thumb" src="\${ep.img}" alt="\${ep.title}" loading="lazy">
        <div class="ep-thumb-play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>
        \${ep.progress>0?\`<div class="ep-progress"><div class="ep-progress-fill" style="width:\${ep.progress}%"></div></div>\`:''}
      </div>
      <div class="ep-info">
        <div class="ep-title-row">
          <span class="ep-title">\${ep.title}</span>
          <span class="ep-duration">\${ep.dur}</span>
        </div>
        <div class="ep-desc">\${ep.desc}</div>
        \${ep.progress>0&&ep.progress<100?\`<div class="ep-playing-label">Continuar — \${ep.progress}%</div>\`:''}
      </div>
    </div>
  \`).join('');
}

function renderRecs(){
  const row=document.getElementById('recRow');
  row.innerHTML=RECS.map(r=>\`
    <div class="rec-card" onclick="toast('Abrindo: \${r.title}')">
      <img class="rec-thumb" src="\${r.img}" alt="\${r.title}" loading="lazy">
      <div class="rec-overlay"><div class="rec-play-btn"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div></div>
      <div class="rec-info"><div class="rec-title">\${r.title}</div><div class="rec-sub">\${r.sub}</div></div>
    </div>
  \`).join('');
}

function openPlayer(){
  document.getElementById('playerOverlay').classList.add('open');
  document.body.style.overflow='hidden';
}
function closePlayer(){
  document.getElementById('playerOverlay').classList.remove('open');
  document.body.style.overflow='';
  try{document.getElementById('mainVideo').pause();}catch(e){}
}
function handleOverlayClick(e){if(e.target===document.getElementById('playerOverlay'))closePlayer();}

${videoControlsJS}

function toggleLike(btn){
  isLiked=!isLiked;
  btn.classList.toggle('liked',isLiked);
  const btn2=document.getElementById('likeBtn2');
  btn2.classList.toggle('active',isLiked);
  toast(isLiked?'👍 Curtido!':'Curtida removida');
}
function toggleLike2(){
  isLiked=!isLiked;
  document.getElementById('likeBtn2').classList.toggle('active',isLiked);
  toast(isLiked?'👍 Curtido!':'Curtida removida');
}
function toggleList(btn){
  inList=!inList;
  btn.style.borderColor=inList?'rgba(48,209,88,.4)':'';
  btn.style.color=inList?'var(--green)':'';
  const btn2=document.getElementById('listBtn2');
  btn2.classList.toggle('in-list',inList);
  toast(inList?'✅ Adicionado à lista':'Removido da lista');
}
function toggleList2(){
  inList=!inList;
  document.getElementById('listBtn2').classList.toggle('in-list',inList);
  toast(inList?'✅ Adicionado à lista':'Removido da lista');
}
function shareContent(){
  if(navigator.share){navigator.share({title:'${d.title}',url:window.location.href}).catch(()=>{});}
  else{navigator.clipboard&&navigator.clipboard.writeText(window.location.href);toast('🔗 Link copiado!');}
}
function toggleSynopsis(){
  const txt=document.getElementById('synopsisText');
  const lbl=document.getElementById('seeMoreLabel');
  const btn=document.getElementById('seeMoreBtn');
  const exp=!txt.classList.contains('collapsed');
  txt.classList.toggle('collapsed',exp);
  lbl.textContent=exp?'Ver mais':'Ver menos';
  btn.classList.toggle('expanded',!exp);
}
let toastTimer;
function toast(msg){
  const el=document.getElementById('toastEl');
  el.textContent=msg;el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>el.classList.remove('show'),2600);
}
window.addEventListener('scroll',()=>{
  document.getElementById('mainNav').classList.toggle('solid',window.scrollY>60);
});
document.addEventListener('keydown',e=>{
  const open=document.getElementById('playerOverlay').classList.contains('open');
  if(e.key==='Escape'&&open)closePlayer();
});
renderCast();
renderEpisodes();
renderRecs();
</script>
</body>
</html>`;
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────
const TABS = [
  { id: "hero", label: "Hero", icon: "🎬" },
  { id: "player", label: "Player", icon: "▶️" },
  { id: "synopsis", label: "Sinopse", icon: "📝" },
  { id: "cast", label: "Elenco", icon: "👥" },
  { id: "episodes", label: "Episódios", icon: "🎞️" },
  { id: "recs", label: "Recomendações", icon: "⭐" },
  { id: "details", label: "Detalhes", icon: "📋" },
  { id: "footer", label: "Footer & Nav", icon: "🔗" },
];

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [data, setData] = useState(INIT);
  const [tab, setTab] = useState("hero");
  const [generated, setGenerated] = useState(false);

  const set = (key, val) => setData((d) => ({ ...d, [key]: val }));

  const generate = () => {
    const html = buildHTML(data);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.title.replace(/\s+/g, "-").toLowerCase()}-videopage.html`;
    a.click();
    URL.revokeObjectURL(url);
    setGenerated(true);
    setTimeout(() => setGenerated(false), 3000);
  };

  // ── Helpers for dynamic lists ─────────────────────────────────────────────
  const addCast = () => set("cast", [...data.cast, { id: uid(), name: "", role: "", img: "" }]);
  const removeCast = (i) => set("cast", data.cast.filter((_, idx) => idx !== i));
  const setCast = (i, k, v) => set("cast", data.cast.map((c, idx) => idx === i ? { ...c, [k]: v } : c));

  const addSeason = () => set("seasons", [...data.seasons, { id: uid(), label: `Temporada ${data.seasons.length + 1}`, episodes: [] }]);
  const removeSeason = (i) => set("seasons", data.seasons.filter((_, idx) => idx !== i));
  const setSeason = (i, k, v) => set("seasons", data.seasons.map((s, idx) => idx === i ? { ...s, [k]: v } : s));
  const addEp = (si) => {
    const ns = data.seasons.map((s, idx) => idx === si ? { ...s, episodes: [...s.episodes, { id: uid(), n: s.episodes.length + 1, title: "", dur: "", desc: "", progress: 0, img: "" }] } : s);
    set("seasons", ns);
  };
  const removeEp = (si, ei) => set("seasons", data.seasons.map((s, idx) => idx === si ? { ...s, episodes: s.episodes.filter((_, eidx) => eidx !== ei) } : s));
  const setEp = (si, ei, k, v) => set("seasons", data.seasons.map((s, idx) => idx === si ? { ...s, episodes: s.episodes.map((ep, eidx) => eidx === ei ? { ...ep, [k]: v } : ep) } : s));

  const addRec = () => set("recs", [...data.recs, { id: uid(), title: "", sub: "", img: "" }]);
  const removeRec = (i) => set("recs", data.recs.filter((_, idx) => idx !== i));
  const setRec = (i, k, v) => set("recs", data.recs.map((r, idx) => idx === i ? { ...r, [k]: v } : r));

  // ── Render current tab ────────────────────────────────────────────────────
  const renderTab = () => {
    if (tab === "hero") return (
      <div>
        <div style={S.sectionTitle}><span style={S.icon}>🎬</span> Hero</div>
        <Field label="Título" value={data.title} onChange={(v) => set("title", v)} placeholder="Ex: Severance" full />
        <TextArea label="Tagline (hero)" value={data.tagline} onChange={(v) => set("tagline", v)} placeholder="Descrição curta exibida no hero..." rows={3} />
        <Field label="URL da imagem de fundo (hero)" value={data.heroBg} onChange={(v) => set("heroBg", v)} placeholder="https://..." full />
        <div style={S.fieldRow}>
          <Field label="Posição do fundo" value={data.heroBgPos} onChange={(v) => set("heroBgPos", v)} placeholder="center 20%" />
          <Field label="Badge (ex: Novo episódio)" value={data.badge} onChange={(v) => set("badge", v)} placeholder="Novo episódio disponível" />
        </div>
        <div style={S.fieldRow}>
          <Field label="Avaliação (ex: 8.7)" value={data.rating} onChange={(v) => set("rating", v)} placeholder="8.7" />
          <Field label="Anos (ex: 2022–2025)" value={data.years} onChange={(v) => set("years", v)} placeholder="2022–2025" />
        </div>
        <div style={S.fieldRow}>
          <Field label="Gênero (hero)" value={data.heroGenre} onChange={(v) => set("heroGenre", v)} placeholder="Drama · Thriller" />
          <Field label="Qtd. temporadas" value={data.seasonsLabel} onChange={(v) => set("seasonsLabel", v)} placeholder="2 Temporadas" />
        </div>
        <div style={S.fieldRow}>
          <Field label="Classificação indicativa" value={data.classification} onChange={(v) => set("classification", v)} placeholder="+16" />
          <Field label="Resolução badge" value={data.resolution} onChange={(v) => set("resolution", v)} placeholder="4K HDR" />
        </div>
      </div>
    );

    if (tab === "player") return (
      <div>
        <div style={S.sectionTitle}><span style={S.icon}>▶️</span> Player</div>
        <div style={S.fieldFull}>
          <label style={S.label}>Tipo de player</label>
          <div style={S.radio}>
            <div style={S.radioItem(data.playerType === "video")} onClick={() => set("playerType", "video")}>
              🎥 Arquivo de vídeo (URL .mp4)
            </div>
            <div style={S.radioItem(data.playerType === "embed")} onClick={() => set("playerType", "embed")}>
              🔗 Incorporação (YouTube, Vimeo, etc.)
            </div>
          </div>
        </div>
        {data.playerType === "video" ? (
          <>
            <Field label="URL do vídeo (.mp4 ou stream)" value={data.videoUrl} onChange={(v) => set("videoUrl", v)} placeholder="https://cdn.exemplo.com/video.mp4" full />
            <p style={S.hint}>Controles personalizados (play/pause, volume, progresso, fullscreen) são gerados automaticamente para vídeo direto.</p>
          </>
        ) : (
          <>
            <TextArea label="Código de incorporação (iframe)" value={data.embedCode} onChange={(v) => set("embedCode", v)} placeholder='<iframe src="https://www.youtube.com/embed/..." width="100%" height="100%" frameborder="0" allowfullscreen></iframe>' rows={6} />
            <p style={S.hint}>Cole o código iframe completo. O modal de player será exibido, mas os controles personalizados não estarão disponíveis no modo embed.</p>
          </>
        )}
      </div>
    );

    if (tab === "synopsis") return (
      <div>
        <div style={S.sectionTitle}><span style={S.icon}>📝</span> Sinopse & Metadados</div>
        <TextArea label="Sinopse completa" value={data.synopsis} onChange={(v) => set("synopsis", v)} placeholder="Descrição completa do conteúdo..." rows={6} />
        <div style={{ height: 16 }} />
        <div style={S.sectionTitle} style={{ fontSize: 14, fontWeight: 600, color: "#888", marginBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: 10 }}>Grade de metadados</div>
        <div style={S.fieldRow}>
          <Field label="Criador" value={data.creator} onChange={(v) => set("creator", v)} placeholder="Dan Erickson" />
          <Field label="Diretor(es)" value={data.director} onChange={(v) => set("director", v)} placeholder="Ben Stiller, Aoife McArdle" />
        </div>
        <Field label="Elenco principal" value={data.mainCast} onChange={(v) => set("mainCast", v)} placeholder="Adam Scott, Patricia Arquette, John Turturro" full />
        <div style={S.fieldRow}>
          <Field label="Gênero (detalhado)" value={data.metaGenre} onChange={(v) => set("metaGenre", v)} placeholder="Drama Psicológico · Thriller · Sci-Fi" />
          <Field label="Idiomas" value={data.languages} onChange={(v) => set("languages", v)} placeholder="Inglês · Português · Espanhol" />
        </div>
        <div style={S.fieldRow}>
          <Field label="Estúdio" value={data.studio} onChange={(v) => set("studio", v)} placeholder="Red Hour Productions" />
          <div>
            <Field label="Qualidade (vírgula)" value={data.qualities} onChange={(v) => set("qualities", v)} placeholder="4K,HDR10,Dolby Vision,Dolby Atmos" />
            <p style={S.hint}>Use "Dolby" no nome para badge dourado.</p>
          </div>
        </div>
      </div>
    );

    if (tab === "cast") return (
      <div>
        <div style={S.sectionTitle}><span style={S.icon}>👥</span> Elenco</div>
        {data.cast.map((c, i) => (
          <div key={i} style={S.card}>
            <div style={S.cardHeader}>
              <span style={S.cardTitle}>Membro {i + 1}</span>
              <button style={S.removeBtn} onClick={() => removeCast(i)}>Remover</button>
            </div>
            <div style={S.fieldRow}>
              <Field label="Nome" value={c.name} onChange={(v) => setCast(i, "name", v)} placeholder="Adam Scott" />
              <Field label="Personagem / Função" value={c.role} onChange={(v) => setCast(i, "role", v)} placeholder="Mark Scout" />
            </div>
            <Field label="URL da foto" value={c.img} onChange={(v) => setCast(i, "img", v)} placeholder="https://..." full />
          </div>
        ))}
        <button style={S.addBtn} onClick={addCast}>+ Adicionar membro</button>
      </div>
    );

    if (tab === "episodes") return (
      <div>
        <div style={S.sectionTitle}><span style={S.icon}>🎞️</span> Episódios por Temporada</div>
        {data.seasons.map((s, si) => (
          <div key={si} style={{ ...S.card, marginBottom: 20 }}>
            <div style={S.cardHeader}>
              <Field label="Nome da temporada" value={s.label} onChange={(v) => setSeason(si, "label", v)} placeholder="Temporada 1" full />
              {data.seasons.length > 1 && <button style={{ ...S.removeBtn, marginLeft: 12, flexShrink: 0 }} onClick={() => removeSeason(si)}>Remover</button>}
            </div>
            {s.episodes.map((ep, ei) => (
              <div key={ei} style={{ background: "#111", borderRadius: 10, padding: 14, marginBottom: 8, border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#555" }}>Ep. {ep.n}</span>
                  <button style={S.removeBtn} onClick={() => removeEp(si, ei)}>✕</button>
                </div>
                <div style={S.fieldRow}>
                  <Field label="Título" value={ep.title} onChange={(v) => setEp(si, ei, "title", v)} placeholder="Título do episódio" />
                  <Field label="Duração" value={ep.dur} onChange={(v) => setEp(si, ei, "dur", v)} placeholder="52 min" />
                </div>
                <TextArea label="Descrição" value={ep.desc} onChange={(v) => setEp(si, ei, "desc", v)} placeholder="Breve descrição do episódio..." rows={2} />
                <div style={S.fieldRow}>
                  <Field label="Progresso (0-100)" value={ep.progress} onChange={(v) => setEp(si, ei, "progress", v)} placeholder="0" type="number" />
                  <Field label="URL da thumbnail" value={ep.img} onChange={(v) => setEp(si, ei, "img", v)} placeholder="https://..." />
                </div>
              </div>
            ))}
            <button style={S.addBtn} onClick={() => addEp(si)}>+ Adicionar episódio</button>
          </div>
        ))}
        <button style={S.addBtn} onClick={addSeason}>+ Adicionar temporada</button>
      </div>
    );

    if (tab === "recs") return (
      <div>
        <div style={S.sectionTitle}><span style={S.icon}>⭐</span> Recomendações</div>
        {data.recs.map((r, i) => (
          <div key={i} style={S.card}>
            <div style={S.cardHeader}>
              <span style={S.cardTitle}>Item {i + 1}</span>
              <button style={S.removeBtn} onClick={() => removeRec(i)}>Remover</button>
            </div>
            <div style={S.fieldRow}>
              <Field label="Título" value={r.title} onChange={(v) => setRec(i, "title", v)} placeholder="The Morning Show" />
              <Field label="Subtítulo" value={r.sub} onChange={(v) => setRec(i, "sub", v)} placeholder="Drama · 3 Temporadas" />
            </div>
            <Field label="URL da capa" value={r.img} onChange={(v) => setRec(i, "img", v)} placeholder="https://..." full />
          </div>
        ))}
        <button style={S.addBtn} onClick={addRec}>+ Adicionar recomendação</button>
      </div>
    );

    if (tab === "details") return (
      <div>
        <div style={S.sectionTitle}><span style={S.icon}>📋</span> Seção Detalhes</div>
        <div style={S.fieldRow}>
          <Field label="Ano de lançamento" value={data.year} onChange={(v) => set("year", v)} placeholder="2022" />
          <Field label="País de origem" value={data.country} onChange={(v) => set("country", v)} placeholder="Estados Unidos" />
        </div>
        <div style={S.fieldRow}>
          <Field label="Classificação indicativa (detalhada)" value={data.ageRating} onChange={(v) => set("ageRating", v)} placeholder="+16 — Conteúdo adulto" />
          <Field label="Total de episódios" value={data.episodesCount} onChange={(v) => set("episodesCount", v)} placeholder="18 episódios (2 temporadas)" />
        </div>
        <div style={S.fieldRow}>
          <Field label="Duração média" value={data.avgDuration} onChange={(v) => set("avgDuration", v)} placeholder="~55 min por episódio" />
          <Field label="Legendas disponíveis" value={data.subtitles} onChange={(v) => set("subtitles", v)} placeholder="PT-BR · EN · ES · FR" />
        </div>
        <div style={S.fieldRow}>
          <Field label="Áudios disponíveis" value={data.audio} onChange={(v) => set("audio", v)} placeholder="Inglês (original) · Português" />
          <Field label="Produtora executiva" value={data.execProducer} onChange={(v) => set("execProducer", v)} placeholder="Ben Stiller, Dan Erickson" />
        </div>
      </div>
    );

    if (tab === "footer") return (
      <div>
        <div style={S.sectionTitle}><span style={S.icon}>🔗</span> Footer & Navegação</div>
        <Field label="Texto de copyright" value={data.copyright} onChange={(v) => set("copyright", v)} placeholder="Copyright © 2025 ..." full />
        <div style={{ height: 8 }} />
        <Field label="Links de navegação (vírgula)" value={data.navLinks} onChange={(v) => set("navLinks", v)} placeholder="Início,Originais,Filmes,Séries,Infantil" full />
        <p style={S.hint}>O segundo item da nav fica ativo por padrão.</p>
      </div>
    );
  };

  return (
    <div style={S.wrap}>
      {/* Header */}
      <div style={S.header}>
        <div>
          <h1 style={S.headerTitle}>🎬 Video Page Generator</h1>
          <p style={S.headerSub}>Preencha os dados e gere seu HTML completo pronto para usar</p>
        </div>
        <button style={{ ...S.genBtn, background: generated ? "linear-gradient(135deg,#30d158,#28a745)" : "linear-gradient(135deg,#0071e3,#0058b0)" }} onClick={generate}>
          {generated ? "✅ Baixado!" : "⬇️ Gerar HTML"}
        </button>
      </div>

      {/* Body */}
      <div style={S.body}>
        {/* Sidebar */}
        <div style={S.sidebar}>
          {TABS.map((t) => (
            <div key={t.id} style={S.sideItem(tab === t.id)} onClick={() => setTab(t.id)}>
              <span>{t.icon}</span>
              {t.label}
            </div>
          ))}
          <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "16px 0" }} />
          <div style={{ padding: "8px 20px", fontSize: 11, color: "#444" }}>
            {data.cast.length} cast · {data.seasons.reduce((a, s) => a + s.episodes.length, 0)} eps · {data.recs.length} recs
          </div>
        </div>

        {/* Main */}
        <div style={S.main}>
          <div style={S.section}>{renderTab()}</div>
        </div>
      </div>
    </div>
  );
}
