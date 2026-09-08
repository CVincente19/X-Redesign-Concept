(() => {
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
  const mediaEl = () => $("#player video") || document.querySelector("video");
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));

  const ICONS = {
    x: `<svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    home: `<svg viewBox="0 0 24 24" width="26.25" height="26.25" fill="currentColor"><path d="M21.591 7.146L12.52 1.157c-.307-.21-.726-.21-1.031 0L2.408 7.146c-.31.212-.49.562-.49.935v13.307c0 .645.523 1.167 1.167 1.167h6.875c.645 0 1.167-.522 1.167-1.167v-6.481h3.438v6.481c0 .645.522 1.167 1.167 1.167h6.875c.645 0 1.167-.522 1.167-1.167V8.081c0-.373-.18-.723-.49-.935z"/></svg>`,
    homeOut: `<svg viewBox="0 0 24 24" width="26.25" height="26.25" fill="currentColor"><path d="M21.591 7.146L12.52 1.157c-.307-.21-.726-.21-1.031 0L2.408 7.146c-.31.212-.49.562-.49.935v13.307c0 .645.523 1.167 1.167 1.167h6.875c.645 0 1.167-.522 1.167-1.167v-6.481h3.438v6.481c0 .645.522 1.167 1.167 1.167h6.875c.645 0 1.167-.522 1.167-1.167V8.081c0-.373-.18-.723-.49-.935zM20 20h-4.5v-7.648c0-.645-.523-1.167-1.167-1.167H9.667c-.644 0-1.167.522-1.167 1.167V20H4V8.697l8-5.227 8 5.227V20z"/></svg>`,
    search: `<svg viewBox="0 0 24 24" width="26.25" height="26.25" fill="currentColor"><path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"/></svg>`,
    bell: `<svg viewBox="0 0 24 24" width="26.25" height="26.25" fill="currentColor"><path d="M19.993 9.042C19.48 5.017 16.054 2 12 2s-7.48 3.018-7.993 7.042L3.336 18H7.5c0 2.485 2.015 4.5 4.5 4.5s4.5-2.015 4.5-4.5h4.164l-.671-8.958zM12 20.5c-1.38 0-2.5-1.12-2.5-2.5h5c0 1.38-1.12 2.5-2.5 2.5zM5.355 16l.557-7.458C6.27 6.07 8.895 4 12 4s5.73 2.07 6.088 4.542L18.645 16H5.355z"/></svg>`,
    chat: `<svg viewBox="0 0 24 24" width="26.25" height="26.25" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12.05 4.35c-4.6 0-8.3 3.1-8.3 6.9 0 2.15 1.15 4.1 3.05 5.4-.22 1.15-.9 2.55-2.2 3.7 1.95-.12 3.6-.88 4.8-1.88.85.22 1.75.33 2.65.33 4.6 0 8.3-3.1 8.3-6.9s-3.7-6.9-8.3-6.9z"/></svg>`,
    grok: `<img class="grok-logo" src="assets/grok-logo.png" alt="Grok">`,
    premium: `<svg viewBox="0 0 24 24" width="26.25" height="26.25" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"><path d="M9.26 5.39C10.47 3.33 13.53 3.33 14.74 5.39C17.05 4.79 19.21 6.95 18.61 9.26C20.67 10.47 20.67 13.53 18.61 14.74C19.21 17.05 17.05 19.21 14.74 18.61C13.53 20.67 10.47 20.67 9.26 18.61C6.95 19.21 4.79 17.05 5.39 14.74C3.33 13.53 3.33 10.47 5.39 9.26C4.79 6.95 6.95 4.79 9.26 5.39Z"/><path d="M8.9 12.2 11.05 14.45 15.4 9.7" stroke-width="1.85"/></svg>`,
    money: `<svg viewBox="0 0 24 24" width="26.25" height="26.25" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"><path d="M12 2.75v18.5"/><path d="M16.35 6.2c-.85-1.15-2.2-1.85-4.35-1.85-2.7 0-4.35 1.5-4.35 3.45 0 1.85 1.35 2.85 4.45 3.45 3.2.6 4.65 1.75 4.65 3.8 0 2.15-1.9 3.8-4.75 3.8-2.4 0-4.05-.85-5-2.2"/></svg>`,
    bookmark: `<svg viewBox="0 0 24 24" width="26.25" height="26.25" fill="currentColor"><path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"/></svg>`,
    studio: `<svg viewBox="0 0 24 24" width="26.25" height="26.25" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round" stroke-linecap="round"><path d="M9.4 14.9c.85-2.85 2.7-6.35 5.7-8.55 2.45 1.25 4.55 3.5 5.6 5.75-2.25 2.85-5.75 4.7-8.6 5.5z"/><circle cx="15.15" cy="9.35" r="1.3"/><path d="M9.4 14.9 6.15 15.35 7.7 18.6"/><path d="M11.95 16.75 12.4 20l-3.15-1.25"/><path d="M7.85 17.7 6.2 19.7"/></svg>`,
    article: `<svg viewBox="0 0 24 24" width="26.25" height="26.25" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"><path d="M6.25 5h7.15L18 9.6v3.1"/><path d="M13.4 5v4.45H18"/><path d="M6.25 5v12.15c0 .7.55 1.25 1.25 1.25H12"/><path d="M8.2 11.15h5.1M8.2 14.05h3.3"/><path d="M14.15 19.85 20.1 13.9l1.4 1.4-5.95 5.95-1.9.5.5-1.9z"/><path d="M16.2 15.15l1.4 1.4"/></svg>`,
    user: `<svg viewBox="0 0 24 24" width="26.25" height="26.25" fill="currentColor"><path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .896-2 2s.895 2 2 2 2-.896 2-2-.895-2-2-2zM9 6c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3z"/></svg>`,
    more: `<svg viewBox="0 0 24 24" width="26.25" height="26.25" fill="currentColor" fill-rule="evenodd"><path d="M12 3.75c-4.56 0-8.25 3.69-8.25 8.25s3.69 8.25 8.25 8.25 8.25-3.69 8.25-8.25S16.56 3.75 12 3.75zM5.25 12c0-3.73 3.02-6.75 6.75-6.75s6.75 3.02 6.75 6.75-3.02 6.75-6.75 6.75S5.25 15.73 5.25 12z"/><circle cx="8" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="16" cy="12" r="1.2"/></svg>`,
    dots: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>`,
    image: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.28 0-.5.224-.5.5v13c0 .276.22.5.5.5h13c.28 0 .5-.224.5-.5v-13c0-.276-.22-.5-.5-.5h-13zM12 16l-4-4 1.414-1.414L12 13.172l6.586-6.586L20 8l-8 8z"/></svg>`,
    gif: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.28 0-.5.224-.5.5v13c0 .276.22.5.5.5h13c.28 0 .5-.224.5-.5v-13c0-.276-.22-.5-.5-.5h-13zM7 8h3v2H9v4h2v2H7V8zm5 0h2v8h-2V8zm3 0h2.5c1.38 0 2.5 1.12 2.5 2.5v3c0 1.38-1.12 2.5-2.5 2.5H15V8zm2 2v4h.5c.28 0 .5-.22.5-.5v-3c0-.28-.22-.5-.5-.5H17z"/></svg>`,
    poll: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M6 11h2v7H6v-7zm5-5h2v12h-2V6zm5 8h2v4h-2v-4z"/></svg>`,
    emoji: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM3.5 12c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5-3.806 8.5-8.5 8.5-8.5-3.806-8.5-8.5zM8.5 9.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm4 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM7.18 13.7a5.5 5.5 0 009.64 0l-1.32-.7a4 4 0 01-7 0l-1.32.7z"/></svg>`,
    loc: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.594 11.116 7.917 11.332l.583.388.583-.388C12.906 21.616 20.5 16.467 20.5 10.5 20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.222-6.5-5.118-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.152-4.835 8.048-6.5 9.27z"/></svg>`,
    reply: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"/></svg>`,
    repost: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"/></svg>`,
    heart: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.562 1.12-.523 2.55.403 4.11.881 1.5 2.544 3.16 4.744 4.88C11.16 17.93 12 18.5 12 18.5s.84-.57 2.459-1.6c2.2-1.72 3.863-3.38 4.744-4.88.926-1.56.965-2.99.403-4.11-.561-1.13-1.667-1.84-2.91-1.91z"/></svg>`,
    heartOn: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 8.31-4.378-3.19-7.028-5.83-8.379-8.31C2.723 10.341 2.54 7.47 4.048 5.72 5.337 4.22 7.604 3.98 9.12 5.23c.758.62 1.436 1.38 1.88 1.96.444-.58 1.122-1.34 1.88-1.96 1.515-1.25 3.782-1.01 5.071.49 1.508 1.75 1.325 4.62.033 7.47z"/></svg>`,
    views: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"/></svg>`,
    share: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"/></svg>`,
    bookmarkSm: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"/></svg>`,
    play: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`,
    pause: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z"/></svg>`,
    playSm: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`,
    pauseSm: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z"/></svg>`,
    vol: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`,
    mute: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v4h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>`,
    cc: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M19 4H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm-8 7H9.5c-.83 0-1.5.67-1.5 1.5v1c0 .83.67 1.5 1.5 1.5H11v1H9.5A2.5 2.5 0 017 13.5v-1A2.5 2.5 0 019.5 10H11v1zm7 0h-1.5c-.83 0-1.5.67-1.5 1.5v1c0 .83.67 1.5 1.5 1.5H18v1h-1.5A2.5 2.5 0 0114 13.5v-1a2.5 2.5 0 012.5-2.5H18v1z"/></svg>`,
    gear: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58a.5.5 0 00.12-.64l-1.92-3.32a.5.5 0 00-.61-.22l-2.39.96a7.03 7.03 0 00-1.63-.94l-.36-2.54A.5.5 0 0014.9 2h-3.8a.5.5 0 00-.49.42l-.36 2.54c-.59.24-1.13.55-1.63.94l-2.39-.96a.5.5 0 00-.61.22L3.7 8.48a.5.5 0 00.12.64l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94L3.82 14.1a.5.5 0 00-.12.64l1.92 3.32c.13.23.4.32.64.22l2.39-.96c.5.39 1.04.7 1.63.94l.36 2.54c.05.24.26.42.49.42h3.8c.24 0 .44-.18.49-.42l.36-2.54c.59-.24 1.13-.55 1.63-.94l2.39.96c.24.1.51.01.64-.22l1.92-3.32a.5.5 0 00-.12-.64l-2.03-1.58zM12 15.6A3.6 3.6 0 1112 8.4a3.6 3.6 0 010 7.2z"/></svg>`,
    mini: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M21 3H3v18h18V3zm-2 16H5V5h14v14zm-8-2h7v-5h-7v5z"/></svg>`,
    theater: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"/></svg>`,
    fs: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>`,
    autoplay: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>`,
    close: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"/></svg>`,
    chevL: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M14.586 12L8.293 5.707l1.414-1.414L17.414 12l-7.707 7.707-1.414-1.414L14.586 12z" transform="scale(-1,1) translate(-24,0)"/></svg>`,
    chevR: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M14.586 12L8.293 5.707l1.414-1.414L17.414 12l-7.707 7.707-1.414-1.414L14.586 12z"/></svg>`,
    collapse: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" transform="scale(-1,1) translate(-24,0)"/></svg>`,
    thumbUp: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.77 11h-4.23l1.52-4.94C16.38 5.03 15.54 4 14.38 4c-.58 0-1.14.24-1.52.65L7 11H3v10h4v-1.07c.55.3 1.26.47 2 .47h8.14c1.15 0 2.14-.83 2.31-1.97l1.34-9C21.05 11.7 20 11 18.77 11zM7 20H4v-8h3v8zm12.98-8.83l-1.34 9c-.05.38-.38.83-.98.83H9c-1.65 0-3-.9-3-2.5v-.03L10.65 6c.06-.1.15-.15.26-.15.23 0 .45.19.39.42L9.74 11H18.77c.38 0 .73.2.73.67 0 .11-.02.22-.05.33z"/></svg>`,
    thumbDown: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"/></svg>`,
    check: `<svg viewBox="0 0 22 22" width="16" height="16" fill="currentColor"><path d="M11 1.75C5.89 1.75 1.75 5.89 1.75 11S5.89 20.25 11 20.25 20.25 16.11 20.25 11 16.11 1.75 11 1.75zm-.47 13.16L6.8 11.18l1.4-1.42 2.32 2.3 4.47-4.53 1.42 1.4-5.88 5.98z"/></svg>`,
    note: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M4 4.5C4 3.12 5.12 2 6.5 2h8.66c.4 0 .78.16 1.06.44l3.34 3.34c.28.28.44.66.44 1.06V19.5c0 1.38-1.12 2.5-2.5 2.5h-11C5.12 22 4 20.88 4 19.5v-15zM6.5 4c-.28 0-.5.22-.5.5v15c0 .28.22.5.5.5h11c.28 0 .5-.22.5-.5V7.38L14.62 4H6.5zM8 11h8v2H8v-2zm0 4h5v2H8v-2z"/></svg>`,
    bellSm: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19.993 9.042C19.48 5.017 16.054 2 12 2s-7.48 3.018-7.993 7.042L3.336 18H7.5c0 2.485 2.015 4.5 4.5 4.5s4.5-2.015 4.5-4.5h4.164l-.671-8.958zM12 20.5c-1.38 0-2.5-1.12-2.5-2.5h5c0 1.38-1.12 2.5-2.5 2.5zM5.355 16l.557-7.458C6.27 6.07 8.895 4 12 4s5.73 2.07 6.088 4.542L18.645 16H5.355z"/></svg>`,
    sort: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M21 6H3V5h18v1zm-6 5H3v1h12v-1zm-6 6H3v1h6v-1z"/></svg>`,
    searchSm: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"/></svg>`,
  };

  const HOMES = [
    { id: "feed", label: "Feed" },
    { id: "videos", label: "Videos" },
    { id: "streams", label: "Streams" },
    { id: "spaces", label: "Spaces" },
    { id: "vine", label: "Vine" },
  ];

  const NAV = [
    { id: "home", label: "Home", icon: "homeOut", href: "#/feed" },
    { id: "explore", label: "Explore", icon: "search", href: "#/videos" },
    { id: "notifications", label: "Notifications", icon: "bell", page: "notifications" },
    { id: "chat", label: "Chat", icon: "chat", page: "chat" },
    { id: "grok", label: "Grok", icon: "grok", page: "grok" },
    { id: "premium", label: "Premium", icon: "premium", page: "premium" },
    { id: "money", label: "Money", icon: "money", page: "money" },
    { id: "history", label: "History", icon: "bookmark", page: "history" },
    { id: "studio", label: "Creator Studio", icon: "studio", page: "studio" },
    { id: "articles", label: "Articles", icon: "article", page: "articles" },
    { id: "profile", label: "Profile", icon: "user", page: "profile" },
    { id: "more", label: "More", icon: "more", page: "more" },
  ];

  const state = {
    route: { name: "feed", id: null },
    search: "",
    following: new Set(["mira", "lena", "omar"]),
    liked: new Set(),
    disliked: new Set(),
    saved: new Set(),
    vineLiked: new Set(),
    vineRevined: new Set(),
    featuredIndex: 1,
    liveRailCollapsed: false,
    navLiveTab: "streams",
    grokOpen: false,
    theater: false,
    autoplay: true,
    rate: 1,
    volume: 0.9,
    muted: false,
    cc: false,
    quality: "1080p",
    relatedFilter: "all",
    extraComments: {},
    extraPosts: [],
    chat: [],
    liveReplies: [],
    composer: "",
    commentDraft: "",
    chatDraft: "",
    playing: false,
    currentTime: 0,
    duration: 0,
    synth: null,
    hideTimer: null,
    showUi: true,
    settingsOpen: false,
    notifyOn: true,
    categoryFilter: null,
    spaceJoined: null,
    mini: null,
    watched: [],
  };

  let chatTimer = null;
  let playerRaf = null;

  function creator(id) { return CREATORS[id]; }
  function videoById(id) { return VIDEOS.find((v) => v.id === id); }
  function streamById(id) { return STREAMS.find((s) => s.id === id); }
  function vineById(id) { return VINES.find((v) => v.id === id); }
  function spaceById(id) { return SPACES.find((s) => s.id === id); }

  function fmt(n) {
    if (n >= 1e6) return (n / 1e6).toFixed(n >= 1e7 ? 0 : 1).replace(/\.0$/, "") + "M";
    if (n >= 1e3) return (n / 1e3).toFixed(n >= 1e4 ? 0 : 1).replace(/\.0$/, "") + "K";
    return String(n);
  }
  function clock(sec) {
    sec = Math.max(0, Math.floor(sec || 0));
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    if (h) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    return `${m}:${String(s).padStart(2, "0")}`;
  }
  function avatar(c, cls = "") {
    if (!c) return `<div class="avatar ${cls} initials">${ME.initials}</div>`;
    if (c.avatar) return `<img class="avatar ${cls}" src="${c.avatar}" alt="">`;
    return `<div class="avatar ${cls} initials">${(c.initials || c.name || "?").slice(0, 2)}</div>`;
  }
  function meAvatar(cls = "") {
    return `<div class="avatar ${cls} initials">${ME.initials}</div>`;
  }
  function badge(c) {
    return c?.verified ? `<span class="verified" title="Verified">${ICONS.check}</span>` : "";
  }
  function matches(q, ...parts) {
    if (!q) return true;
    const s = q.toLowerCase();
    return parts.some((p) => String(p || "").toLowerCase().includes(s));
  }

  function metricsFor(item) {
    const viewsN = item.viewsN || item.viewers || item.listeners || 0;
    const likes = item.likes ?? Math.max(1, Math.round(viewsN / 18));
    return {
      likes,
      dislikes: item.dislikes ?? Math.max(0, Math.round(likes / 14)),
      replies: item.replies ?? Math.max(0, Math.round(likes / 20)),
      reposts: item.reposts ?? Math.max(0, Math.round(likes / 8)),
      views: item.views || fmt(viewsN),
    };
  }

  function xActions(id, m, { dislike = false } = {}) {
    const liked = state.liked.has(id);
    const disliked = state.disliked.has(id);
    const likeN = m.likes + (liked ? 1 : 0);
    const dislikeN = m.dislikes + (disliked ? 1 : 0);
    return `
      <div class="post-actions">
        <button class="action" data-act="reply" data-id="${id}"><span class="icwrap">${ICONS.reply}</span>${fmt(m.replies)}</button>
        <button class="action repost" data-act="repost" data-id="${id}"><span class="icwrap">${ICONS.repost}</span>${fmt(m.reposts)}</button>
        <button class="action like ${liked ? "on" : ""}" data-act="like" data-id="${id}"><span class="icwrap">${liked ? ICONS.heartOn : ICONS.heart}</span>${fmt(likeN)}</button>
        ${dislike ? `<button class="action dislike ${disliked ? "on" : ""}" data-act="vdlike" data-id="${id}"><span class="icwrap">${ICONS.thumbDown}</span>${fmt(dislikeN)}</button>` : ""}
        <button class="action"><span class="icwrap">${ICONS.views}</span>${esc(m.views)}</button>
        <button class="action" data-act="save" data-id="${id}"><span class="icwrap">${ICONS.bookmarkSm}</span></button>
        <button class="action" data-act="share" data-id="${id}"><span class="icwrap">${ICONS.share}</span></button>
      </div>
    `;
  }

  function commentsFor(id) {
    return [...(state.extraComments[id] || []), ...(COMMENTS[id] || defaultComments({ id }))];
  }

  function renderReply(cm) {
    const u = cm.user === "me" ? CREATORS.me : creator(cm.user) || CREATORS.me;
    const id = cm.id || ("c-" + (cm.user || "u") + (cm.age || ""));
    const m = {
      likes: cm.likes || 0,
      replies: cm.replies || 0,
      reposts: cm.reposts || 0,
      views: cm.views || "12",
      dislikes: 0,
    };
    return `
      <article class="post reply">
        ${cm.user === "me" ? meAvatar() : avatar(u)}
        <div style="flex:1;min-width:0">
          <span class="post-name">${esc(u.name)} ${badge(u)}</span>
          <span class="post-handle">@${esc(u.handle)}</span>
          <span class="post-age">· ${esc(cm.age)}</span>
          <div class="post-text">${esc(cm.text)}</div>
          ${xActions(id, m)}
        </div>
      </article>
    `;
  }

  function repliesRail(id, comments, { live = false } = {}) {
    return `
      <aside class="replies-rail">
        <div class="replies-h">${live ? "Live replies" : "Replies"}</div>
        <form class="reply-composer" data-act="comment" data-id="${id}">
          ${meAvatar("sm")}
          <input name="text" placeholder="Post your reply" value="${esc(state.commentDraft)}" />
          <button class="reply-send ${state.commentDraft.trim() ? "ready" : ""}" type="submit">Reply</button>
        </form>
        <div class="reply-log" id="replylog">${comments.map(renderReply).join("")}</div>
      </aside>
    `;
  }

  function communityNote(id) {
    const text = NOTES[id];
    if (!text) return "";
    return `
      <div class="note">
        <div class="note-kicker"><span class="ic">${ICONS.note}</span> Viewers added context they thought people might want to know</div>
        <p>${esc(text)}</p>
        <div class="note-foot">Rated helpful by people who saw the post</div>
      </div>
    `;
  }

  function grokControls(kind) {
    return `
      <button class="grok-fab" data-act="grok-media" title="Ask Grok about this ${kind}">
        <span class="ic"><img class="grok-logo" src="assets/grok-logo.png" alt=""></span> Grok
      </button>
      <div class="grok-pop ${state.grokOpen ? "open" : ""}">
        <h4>Ask Grok</h4>
        <p>Grok can look at this ${kind} with you — summarize, fact-check, or pull related posts.</p>
        <button data-act="grok-ask" data-q="summarize">Summarize</button>
        <button data-act="grok-ask" data-q="fact">Fact-check</button>
        <button data-act="grok-ask" data-q="related">Find related</button>
      </div>
    `;
  }

  function statusBlock(item, c, { title, text, age, followId }) {
    const m = metricsFor(item);
    const on = state.following.has(followId || c.id);
    return `
      <div class="status-block">
        ${avatar(c, "lg")}
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
            <span class="post-name">${esc(c.name)} ${badge(c)}</span>
            <span class="post-handle">@${esc(c.handle)}</span>
            <span class="post-age">· ${esc(age || item.age || "now")}</span>
            <button class="follow-btn ${on ? "following" : ""}" data-follow="${followId || c.id}" style="margin-left:auto">${on ? "Following" : "Follow"}</button>
          </div>
          <h1 class="watch-title">${esc(title)}</h1>
          ${text ? `<div class="post-text">${esc(text)}</div>` : ""}
          ${xActions(item.id, m, { dislike: true })}
        </div>
      </div>
    `;
  }

  function recGrid(items, kind) {
    const href = kind === "stream" ? "live" : kind === "vine" ? "vinewatch" : kind === "space" ? "space" : "watch";
    return `
      <section class="rec-section">
        <h2>${kind === "stream" ? "More streams" : kind === "vine" ? "More Vines" : kind === "space" ? "More Spaces" : "More videos"}</h2>
        <div class="rec-grid">
          ${items.map((it) => {
            if (kind === "space") {
              const host = creator(it.host);
              return `
                <a class="space-card" href="#/space/${it.id}" style="--c:${it.color};min-height:160px">
                  <div class="space-top"><span>${it.live ? "LIVE" : "Scheduled"}</span><span>${esc(it.topic)}</span></div>
                  <h3>${esc(it.title)}</h3>
                  <div class="space-foot">${esc(host.name)} · ${it.live ? fmt(it.listeners) + " listening" : it.scheduled}</div>
                </a>`;
            }
            if (kind === "stream") return streamCard(it);
            if (kind === "vine") {
              const c = creator(it.creator);
              return `
                <a class="v-card" href="#/vinewatch/${it.id}">
                  <div class="thumb" style="aspect-ratio:1"><img src="${it.thumb}" alt=""></div>
                  <div class="v-meta" style="margin-top:8px">
                    ${avatar(c, "xs")}
                    <div class="v-info"><div class="v-title">${esc(it.title)}</div><div class="v-sub">@${esc(c.handle)}</div></div>
                  </div>
                </a>`;
            }
            return videoCard(it);
          }).join("")}
        </div>
      </section>
    `;
  }

  function liveDock() {
    const tab = state.navLiveTab;
    const rows = tab === "spaces"
      ? SPACES.filter((s) => s.live).slice(0, 6).map((s) => {
          const host = creator(s.host);
          return `
            <a class="lc" href="#/space/${s.id}">
              ${avatar(host, "sm")}
              <div style="min-width:0;flex:1">
                <div class="t">${esc(s.title)}</div>
                <div class="g">${esc(host.name)}</div>
              </div>
              <div class="v"><span class="dot-live"></span>${fmt(s.listeners)}</div>
            </a>`;
        }).join("")
      : STREAMS.slice(0, 6).map((s) => {
          const c = creator(s.creator);
          return `
            <a class="lc" href="#/live/${s.id}">
              ${avatar(c, "sm")}
              <div style="min-width:0;flex:1">
                <div class="t">${esc(c.name)}</div>
                <div class="g">${esc(s.category)}</div>
              </div>
              <div class="v"><span class="dot-live"></span>${fmt(s.viewers)}</div>
            </a>`;
        }).join("");
    return `
      <div class="live-dock">
        <div class="live-dock-h">Live now</div>
        <div class="seg">
          <button class="${tab === "streams" ? "on" : ""}" data-act="navlive" data-tab="streams">Streams</button>
          <button class="${tab === "spaces" ? "on" : ""}" data-act="navlive" data-tab="spaces">Spaces</button>
        </div>
        ${rows}
      </div>
    `;
  }

  function parseRoute() {
    const raw = (location.hash.replace(/^#\/?/, "") || "feed").split("/").filter(Boolean);
    const name = raw[0] || "feed";
    const id = raw[1] || null;
    return { name, id };
  }

  function go(hash) {
    if (!hash.startsWith("#")) hash = "#/" + hash.replace(/^\/+/, "");
    if (location.hash === hash) render();
    else location.hash = hash;
  }

  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(t._t);
    t._t = setTimeout(() => t.classList.remove("show"), 1800);
  }

  function stopChat() {
    if (chatTimer) { clearInterval(chatTimer); chatTimer = null; }
  }
  function stopSynth() {
    if (state.synth) { cancelAnimationFrame(state.synth); state.synth = null; }
  }
  function stopPlayerLoop() {
    if (playerRaf) { cancelAnimationFrame(playerRaf); playerRaf = null; }
  }

  function navActive() {
    const r = state.route.name;
    if (["feed", "videos", "streams", "spaces", "vine", "watch", "live", "vinewatch", "space"].includes(r)) return "home";
    return r;
  }

  function tabActive() {
    const r = state.route.name;
    if (r === "watch") return "videos";
    if (r === "live") return "streams";
    if (r === "space") return "spaces";
    if (r === "vinewatch") return "vine";
    if (HOMES.some((h) => h.id === r)) return r;
    return "feed";
  }

  function render() {
    const app = $("#app");
    const r = state.route;
    document.body.classList.toggle("theater", state.theater && ["watch", "live", "space", "vinewatch"].includes(r.name));
    document.body.classList.toggle("has-mini", Boolean(state.mini));
    document.title = titleFor(r);

    app.innerHTML = `
      ${leftNav()}
      <div class="main">
        ${topbar()}
        <div class="page">${page()}</div>
      </div>
    `;
    bindStatic();
    afterRender();
  }

  function titleFor(r) {
    if (r.name === "watch") return `${videoById(r.id)?.title || "Video"} / X`;
    if (r.name === "live") return `${streamById(r.id)?.title || "Live"} / X`;
    if (r.name === "space") return `${spaceById(r.id)?.title || "Space"} / X`;
    const map = { feed: "Home", videos: "Videos", streams: "Streams", spaces: "Spaces", vine: "Vine" };
    return `${map[r.name] || "X"} / X`;
  }

  function leftNav() {
    const active = navActive();
    return `
      <aside class="left-nav">
        <div class="nav-brandrow">
          <a class="brand" href="#/feed" title="X">${ICONS.x}</a>
          <div class="nav-search">
            <label class="search">
              <span class="ic">${ICONS.searchSm}</span>
              <input id="q" type="search" placeholder="Search" value="${esc(state.search)}" />
            </label>
          </div>
        </div>
        <div class="nav-scroll">
          <nav class="nav-list">
            ${NAV.map((n) => `
              <a class="nav-item" data-nav="${n.id}" href="${n.href || "#"}">
                <span class="ic">${ICONS[n.icon]}</span>
                <span class="lbl">${n.label}</span>
              </a>
            `).join("")}
          </nav>
        </div>
        <div class="nav-footer">
          ${liveDock()}
          <button class="post-btn" data-act="compose">Post</button>
          <button class="user-chip" data-nav="profile">
            ${meAvatar()}
            <div class="meta">
              <div class="name">${esc(ME.name)} <span class="verified">${ICONS.check}</span></div>
              <div class="handle">@${esc(ME.handle)}</div>
            </div>
            <span style="color:var(--muted)">${ICONS.dots}</span>
          </button>
        </div>
      </aside>
    `;
  }

  function topbar() {
    const active = tabActive();
    return `
      <header class="topbar">
        <nav class="home-tabs">
          ${HOMES.map((h) => `
            <a class="home-tab ${active === h.id ? "active" : ""}" href="#/${h.id}">${h.label}</a>
          `).join("")}
        </nav>
      </header>
    `;
  }

  function page() {
    switch (state.route.name) {
      case "videos": return videosHome();
      case "streams": return streamsHome();
      case "spaces": return spacesHome();
      case "vine": return vineHome();
      case "watch": return watchPage();
      case "live": return livePage();
      case "space": return spacePage();
      case "vinewatch": return vineWatch();
      case "notifications":
      case "chat":
      case "grok":
      case "premium":
      case "money":
      case "history":
      case "studio":
      case "articles":
      case "profile":
      case "more":
        return placeholderPage(state.route.name);
      default: return feedHome();
    }
  }

  function feedHome() {
    const posts = [...state.extraPosts, ...FEED_SEED];
    const q = state.search;
    const filtered = posts.filter((p) => {
      const c = creator(p.user);
      return matches(q, p.text, c?.name, c?.handle);
    });
    return `
      <div class="feed-layout">
        <div class="timeline">
          <div class="composer">
            ${meAvatar("lg")}
            <div class="composer-body">
              <textarea id="composer" rows="2" placeholder="What's happening?">${esc(state.composer)}</textarea>
              <div class="composer-tools">
                <button class="tool-btn" title="Media">${ICONS.image}</button>
                <button class="tool-btn" title="GIF">${ICONS.gif}</button>
                <button class="tool-btn" title="Poll">${ICONS.poll}</button>
                <button class="tool-btn" title="Emoji">${ICONS.emoji}</button>
                <button class="tool-btn" title="Location">${ICONS.loc}</button>
                <button class="composer-post ${state.composer.trim() ? "ready" : ""}" data-act="post">Post</button>
              </div>
            </div>
          </div>
          ${filtered.map(renderPost).join("")}
        </div>
        <aside class="right-rail">
          <section class="rail-card">
            <h3>Today's News</h3>
            ${NEWS.map((n) => `
              <div class="news-item">
                <div class="news-title">${esc(n.title)}</div>
                <div class="news-meta">${esc(n.meta)}</div>
              </div>`).join("")}
          </section>
          <section class="rail-card">
            <h3>What's happening</h3>
            ${TRENDS.map((t) => `
              <div class="trend-item">
                <div class="trend-ctx">${esc(t.context)}</div>
                <div class="trend-name">${esc(t.name)}</div>
                <div class="trend-posts">${esc(t.posts)}</div>
              </div>`).join("")}
            <a class="show-more" href="#/videos">Show more</a>
          </section>
          <section class="rail-card">
            <h3>Who to follow</h3>
            ${["kai", "yuki", "theo"].map((id) => {
              const c = creator(id);
              const on = state.following.has(id);
              return `
                <div class="follow-item">
                  ${avatar(c, "sm")}
                  <div class="meta">
                    <div class="post-name">${esc(c.name)} ${badge(c)}</div>
                    <div class="post-handle">@${esc(c.handle)}</div>
                  </div>
                  <button class="follow-btn ${on ? "following" : ""}" data-follow="${id}">${on ? "Following" : "Follow"}</button>
                </div>`;
            }).join("")}
            <a class="show-more" href="#/videos">Show more</a>
          </section>
          <p class="legal">Terms · Privacy · Cookies · Accessibility<br>© 2026 X Corp.</p>
        </aside>
      </div>
    `;
  }

  function renderPost(p) {
    const c = creator(p.user);
    let media = "";
    if (p.type === "video") {
      const v = videoById(p.video);
      media = `<a class="post-media" href="#/watch/${v.id}"><img src="${v.thumb}" alt=""><span class="duration">${v.duration}</span></a>`;
    } else if (p.type === "live") {
      const s = streamById(p.stream);
      media = `<a class="post-media" href="#/live/${s.id}"><img src="${s.thumb}" alt=""><span class="live-chip">LIVE</span><span class="viewers-ov">${fmt(s.viewers)} watching</span></a>`;
    }
    const quote = p.quote ? `
      <div class="quote">
        <span class="post-name">${esc(creator(p.quote.user).name)}</span>
        <span class="post-handle">@${esc(creator(p.quote.user).handle)} · ${esc(p.quote.age)}</span>
        <div class="post-text">${esc(p.quote.text)}</div>
      </div>` : "";
    return `
      <article class="post" data-post="${p.id}">
        ${avatar(c)}
        <div style="flex:1;min-width:0">
          <span class="post-name">${esc(c.name)} ${badge(c)}</span>
          <span class="post-handle">@${esc(c.handle)}</span>
          <span class="post-age">· ${esc(p.age)}</span>
          <div class="post-text">${esc(p.text)}</div>
          ${quote}
          ${media}
          ${xActions(p.id, { likes: p.likes || 0, replies: p.replies || 0, reposts: p.reposts || 0, views: p.views || "1", dislikes: 0 })}
        </div>
      </article>
    `;
  }

  function videosHome() {
    const q = state.search;
    const list = VIDEOS.filter((v) => {
      const c = creator(v.creator);
      return matches(q, v.title, c.name, c.handle, v.description);
    });
    return `
      <div class="media-page">
        <div class="video-grid">
          ${list.map((v) => videoCard(v)).join("")}
        </div>
      </div>
    `;
  }

  function videoCard(v) {
    const c = creator(v.creator);
    return `
      <a class="v-card" href="#/watch/${v.id}">
        <div class="thumb">
          <img src="${v.thumb}" alt="">
          <span class="duration">${v.duration}</span>
        </div>
        <div class="v-meta">
          ${avatar(c, "sm")}
          <div class="v-info">
            <div class="v-title">${esc(v.title)}</div>
            <div class="v-sub">${esc(c.name)} ${badge(c)}</div>
            <div class="v-stats">${v.views} views · ${v.age}</div>
          </div>
        </div>
      </a>
    `;
  }

  function relatedList(current) {
    const q = state.relatedFilter;
    let list = VIDEOS.filter((v) => v.id !== current.id);
    if (q === "from") list = list.filter((v) => v.creator === current.creator);
    return list.slice(0, 12);
  }

  function watchPage() {
    const v = videoById(state.route.id) || VIDEOS[0];
    const c = creator(v.creator);
    const comments = commentsFor(v.id);
    const related = VIDEOS.filter((x) => x.id !== v.id).slice(0, 6);
    return `
      <div class="watch-layout">
        <div class="watch-col">
          ${playerMarkup(v, "vod")}
          ${communityNote(v.id)}
          ${statusBlock(v, c, { title: v.title, text: v.description, age: v.age })}
          ${recGrid(related, "video")}
        </div>
        ${repliesRail(v.id, comments)}
      </div>
    `;
  }

  function defaultComments(v) {
    return [
      { user: "sage", text: "Came here from the feed. This holds up.", age: "20m", likes: 12 },
      { user: "cole", text: "The cut at the midpoint is doing a lot of work.", age: "11m", likes: 4 },
    ];
  }

  function dvrSeconds(item, mode) {
    if (mode === "live") return Math.max(60, (item.startedMin || 40) * 60);
    if (mode === "space") return 48 * 60;
    return item.seconds || 6;
  }

  function playerMarkup(item, mode, stageHTML) {
    const isLive = mode === "live" || mode === "space";
    const isVine = (item.id || "").startsWith("n");
    const src = mode === "space" ? "" : (item.src || "");
    const dur = dvrSeconds(item, mode);
    const kind = mode === "space" ? "Space" : isLive ? "stream" : isVine ? "Vine" : "video";
    return `
      <div class="player ${isLive ? "live-mode" : ""} ${mode === "space" ? "space-player" : ""} ${isVine ? "vine-mode" : ""} ${src ? "has-src" : ""} ${state.playing ? "playing" : "paused"}" id="player" data-mode="${mode}" data-id="${item.id}">
        <div class="player-stage">
          ${mode === "space" ? stageHTML : `
            <video id="media" ${src ? `src="${src}"` : ""} playsinline ${(isLive || (item.seconds && item.seconds <= 8)) ? "loop" : ""}></video>
            ${src ? "" : `<img class="poster kb" src="${item.thumb}" alt="">`}
          `}
          <div class="bigplay"><div class="disc">${ICONS.play}</div></div>
          <div class="live-badge">LIVE</div>
          ${grokControls(kind)}
          <div class="cc-overlay ${state.cc ? "on" : ""}">${esc(item.title)}</div>
          <div class="player-gradient"></div>
          <div class="player-controls">
            <div class="progress-hit" data-act="seek">
              <div class="progress-track">
                <div class="progress-play" id="pbar"></div>
                <div class="progress-knob" id="pknob"></div>
              </div>
            </div>
            <div class="ctrl-row">
              <button class="ctrl" data-act="toggle" title="Play (k)">${state.playing ? ICONS.pauseSm : ICONS.playSm}</button>
              <div class="vol">
                <button class="ctrl" data-act="mute" title="Mute (m)">${state.muted || state.volume === 0 ? ICONS.mute : ICONS.vol}</button>
                <input class="vol-slider" type="range" min="0" max="1" step="0.05" value="${state.volume}" data-act="volume" />
              </div>
              <div class="time-pill" id="ptime">${isLive ? "LIVE" : "0:00 / " + (item.duration || clock(item.seconds || 6))}</div>
              ${isLive ? `<button class="ctrl live-jump" data-act="golive">LIVE</button>` : ""}
              <div class="spacer"></div>
              ${isLive ? "" : `<button class="ctrl ${state.autoplay ? "on" : ""}" data-act="autoplay" title="Autoplay">${ICONS.autoplay}</button>`}
              <button class="ctrl ${state.cc ? "on" : ""}" data-act="cc" title="Captions">${ICONS.cc}</button>
              <button class="ctrl" data-act="settings" title="Settings">${ICONS.gear}</button>
              <button class="ctrl" data-act="mini" title="Miniplayer">${ICONS.mini}</button>
              <button class="ctrl" data-act="theater" title="Theater (t)">${ICONS.theater}</button>
              <button class="ctrl" data-act="fs" title="Fullscreen (f)">${ICONS.fs}</button>
            </div>
          </div>
          <div class="settings-menu ${state.settingsOpen ? "open" : ""}" id="settings">
            <button data-act="rate">Playback speed <span>${state.rate}x</span></button>
            <button data-act="quality">Quality <span>${state.quality}</span></button>
          </div>
        </div>
      </div>
    `;
  }

  function streamsHome() {
    const q = state.search;
    const cat = state.categoryFilter;
    const list = STREAMS.filter((s) => {
      const c = creator(s.creator);
      const okQ = matches(q, s.title, c.name, s.category, ...(s.tags || []));
      const slug = s.category.toLowerCase().replace(/\s+/g, "-");
      const okC = !cat || slug === cat || slug.includes(cat) || cat.includes(slug);
      return okQ && okC;
    });
    const featured = STREAMS;
    const i = state.featuredIndex;
    return `
      <div class="streams-layout">
        <div class="streams-main">
          <div class="coverflow">
            <button class="cover-nav" data-act="feat-prev">${ICONS.chevL}</button>
            <div class="cover-track">
              ${featured.map((s, idx) => {
                let off = idx - i;
                if (off > 2) off -= featured.length;
                if (off < -2) off += featured.length;
                if (Math.abs(off) > 2) return "";
                const c = creator(s.creator);
                return `
                  <a class="cover-card" data-off="${off}" href="#/live/${s.id}">
                    <img src="${s.thumb}" alt="">
                    <span class="live-chip">LIVE</span>
                    <div class="cover-info">
                      <div class="t">${esc(s.title)}</div>
                      <div class="s">${avatar(c, "xs")} ${esc(c.name)} · ${esc(s.category)} · ${fmt(s.viewers)} viewers</div>
                    </div>
                  </a>`;
              }).join("")}
            </div>
            <button class="cover-nav" data-act="feat-next">${ICONS.chevR}</button>
          </div>
          <h2 class="section-h">Live on X${cat ? ` · <button class="chip" data-act="clear-cat" style="vertical-align:middle">Clear filter</button>` : ""}</h2>
          <div class="live-row">
            ${list.slice(0, 5).map(streamCard).join("")}
          </div>
          <div class="more-link" data-act="more-live">Show more</div>
          <h2 class="section-h">Categories we think you'll like</h2>
          <div class="cat-row">
            ${CATEGORIES.map((catItem) => `
              <button class="cat" data-act="cat" data-cat="${catItem.id}">
                <img src="${catItem.art}" alt="">
                <div class="n">${esc(catItem.name)}</div>
                <div class="v">${fmt(catItem.viewers)} viewers</div>
                <div class="tags">${catItem.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
              </button>
            `).join("")}
          </div>
        </div>
      </div>
    `;
  }

  function streamCard(s) {
    const c = creator(s.creator);
    return `
      <a class="s-card" href="#/live/${s.id}">
        <div class="thumb">
          <img src="${s.thumb}" alt="">
          <span class="live-chip">LIVE</span>
          <span class="viewers-ov">${fmt(s.viewers)} viewers</span>
        </div>
        <div class="s-user">${avatar(c, "xs")} <span style="font-weight:700;color:var(--text)">${esc(s.title)}</span></div>
        <div class="s-user">${esc(c.name)}</div>
        <div class="s-user">${esc(s.category)}</div>
        <div class="tags">${s.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
      </a>
    `;
  }

  function livePage() {
    const s = streamById(state.route.id) || STREAMS[0];
    const c = creator(s.creator);
    const hours = Math.floor(s.startedMin / 60);
    const mins = s.startedMin % 60;
    const desc = `${s.category} · ${fmt(s.viewers)} watching · ${hours ? hours + "h " : ""}${mins}m live\n${c.bio}`;
    const comments = (state.liveReplies.length ? state.liveReplies : commentsFor(s.id));
    const recs = STREAMS.filter((x) => x.id !== s.id).slice(0, 6);
    return `
      <div class="watch-layout">
        <div class="watch-col">
          ${playerMarkup(s, "live")}
          ${statusBlock(s, c, { title: s.title, text: desc, age: "LIVE" })}
          ${recGrid(recs, "stream")}
        </div>
        ${repliesRail(s.id, comments, { live: true })}
      </div>
    `;
  }

  function chatLine(m) {
    return `<div class="chat-line"><span class="u" style="color:${m.color}">${esc(m.user)}</span>${esc(m.text)}</div>`;
  }

  function spaceCard(s) {
    const host = creator(s.host);
    const people = [s.host, ...s.speakers].map((id) => creator(id));
    return `
      <a class="space-card" href="#/space/${s.id}" style="--c:${s.color}">
        <div class="space-top">
          <span>${s.live ? "LIVE" : "Scheduled"}</span>
          <span>${esc(s.topic)}</span>
        </div>
        <h3>${esc(s.title)}</h3>
        <div class="speakers">${people.map((p) => avatar(p, "sm")).join("")}</div>
        <div class="space-foot">
          Hosted by ${esc(host.name)} · ${s.live ? fmt(s.listeners) + " listening" : s.scheduled}
        </div>
      </a>`;
  }

  function spacesHome() {
    const q = state.search;
    const list = SPACES.filter((s) => matches(q, s.title, s.topic, creator(s.host).name));
    const following = list.filter((s) => {
      const ids = [s.host, ...s.speakers];
      return ids.some((id) => state.following.has(id));
    });
    const now = list.filter((s) => s.live);
    return `
      <div class="spaces-page">
        <h2 class="section-h">Following</h2>
        <div class="spaces-grid">
          ${following.length ? following.map(spaceCard).join("") : `<p style="color:var(--muted)">Follow hosts to see their Spaces here.</p>`}
        </div>
        <h2 class="section-h" style="margin-top:28px">Happening now</h2>
        <div class="spaces-grid">${now.map(spaceCard).join("")}</div>
      </div>
    `;
  }

  function spacePage() {
    const s = spaceById(state.route.id) || SPACES[0];
    state.spaceJoined = s.id;
    const host = creator(s.host);
    const speakers = [s.host, ...s.speakers].map((id) => creator(id));
    const listeners = Object.values(CREATORS).filter((c) => c.id !== "me" && !speakers.includes(c)).slice(0, 10);
    const desc = `${s.topic} · ${fmt(s.listeners + 1)} listening\n${host.bio}`;
    const comments = state.liveReplies.length ? state.liveReplies : commentsFor(s.id);
    const recs = SPACES.filter((x) => x.id !== s.id);
    const stage = `
      <div class="space-canvas">
        <div class="stage-speakers">
          ${speakers.map((p, i) => `
            <div class="stage-person ${i === 0 ? "host" : ""}">
              ${avatar(p, i === 0 ? "xl" : "lg")}
              <div class="nm">${esc(p.name)}</div>
              <div class="role">${i === 0 ? "Host" : "Speaking"}</div>
            </div>`).join("")}
        </div>
        <div class="stage-listeners">
          <span class="lbl">Listening</span>
          ${listeners.map((p) => avatar(p, "xs")).join("")}
          ${meAvatar("xs")}
          <span class="lbl" style="margin-left:8px">${fmt(s.listeners + 1)}</span>
        </div>
      </div>
    `;
    return `
      <div class="watch-layout">
        <div class="watch-col">
          ${playerMarkup({ ...s, seconds: dvrSeconds(s, "space") }, "space", stage)}
          ${statusBlock({ ...s, viewsN: s.listeners + 1, views: fmt(s.listeners + 1) }, host, { title: s.title, text: desc, age: s.live ? "LIVE" : s.scheduled })}
          ${recGrid(recs, "space")}
        </div>
        ${repliesRail(s.id, comments, { live: true })}
      </div>
    `;
  }

  function vineHome() {
    const q = state.search;
    const list = VINES.filter((v) => matches(q, v.title, creator(v.creator).name));
    return `
      <div class="vine-page">
        <div class="vine-grid">
          ${list.map((v) => {
            const c = creator(v.creator);
            const m = metricsFor(v);
            return `
              <div class="vine-item">
                <a class="vine-card" href="#/vinewatch/${v.id}">
                  ${v.src ? `<video muted loop playsinline src="${v.src}"></video>` : ""}
                  <img src="${v.thumb}" alt="">
                  <div class="vine-ov">
                    <div class="vine-loop">LOOP · ${v.loops}</div>
                  </div>
                </a>
                <div class="v-title">${esc(v.title)}</div>
                <div class="v-sub">${esc(c.name)} ${badge(c)} · @${esc(c.handle)}</div>
                ${xActions(v.id, m, { dislike: true })}
              </div>`;
          }).join("")}
        </div>
      </div>
    `;
  }

  function vineWatch() {
    const current = vineById(state.route.id) || VINES[0];
    return `
      <div class="watch-layout vine-doom">
        <div class="watch-col">
          <div class="vine-scroller" id="vine-scroller">
            ${VINES.map((v) => {
              const c = creator(v.creator);
              const active = v.id === current.id;
              return `
                <section class="vine-slide" data-vine="${v.id}">
                  ${playerMarkup({ ...v, duration: "0:06" }, "vod").replace('id="player"', active ? 'id="player"' : "")}
                  ${statusBlock(v, c, { title: v.title, text: `${v.loops} loops`, age: v.age })}
                </section>`;
            }).join("")}
          </div>
        </div>
        ${repliesRail(current.id, commentsFor(current.id))}
      </div>
    `;
  }

  function placeholderPage(name) {
    const titles = {
      notifications: "Notifications",
      chat: "Chat",
      grok: "Grok",
      premium: "Premium",
      money: "Money",
      history: "History",
      studio: "Creator Studio",
      articles: "Articles",
      profile: ME.name,
      more: "More",
    };
    return `
      <div class="placeholder">
        <h2>${esc(titles[name] || name)}</h2>
        <p>This mock is focused on the media homes — Feed, Videos, Streams, Spaces, and Vine. ${esc(titles[name] || name)} is wired in the nav so the chrome matches X, without a full product surface behind it.</p>
        <p style="margin-top:12px"><a href="#/videos" style="color:var(--blue)">Open Videos</a> · <a href="#/streams" style="color:var(--blue)">Open Streams</a></p>
      </div>
    `;
  }

  function bindStatic() {
    $$("[data-nav]").forEach((el) => {
      el.addEventListener("click", (e) => {
        const id = el.getAttribute("data-nav");
        const item = NAV.find((n) => n.id === id);
        if (item?.page) {
          e.preventDefault();
          go("#/" + item.page);
        }
      });
    });

    const q = $("#q");
    if (q) {
      q.addEventListener("input", () => {
        state.search = q.value;
        const r = state.route.name;
        if (["videos", "streams", "spaces", "vine", "feed"].includes(r)) {
          const keep = q.selectionStart;
          render();
          const nq = $("#q");
          if (nq) { nq.focus(); nq.setSelectionRange(keep, keep); }
        }
      });
      q.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          if (state.route.name === "feed") go("#/videos");
        }
      });
    }

    const composer = $("#composer");
    if (composer) {
      composer.addEventListener("input", () => {
        state.composer = composer.value;
        const btn = $("[data-act=post]");
        if (btn) btn.classList.toggle("ready", state.composer.trim().length > 0);
      });
    }
  }

  let clickBound = false;
  let submitBound = false;
  let inputBound = false;
  function onClick(e) {
    const btn = e.target.closest("[data-act], [data-follow], [data-rel], [data-cat]");
    if (!btn) {
      if (state.settingsOpen && !e.target.closest("#settings") && !e.target.closest("[data-act=settings]")) {
        state.settingsOpen = false;
        const m = $("#settings");
        if (m) m.classList.remove("open");
      }
      if (state.grokOpen && !e.target.closest(".grok-pop") && !e.target.closest("[data-act=grok-media]")) {
        state.grokOpen = false;
        $(".grok-pop.open")?.classList.remove("open");
      }
      return;
    }
    const act = btn.getAttribute("data-act");
    const follow = btn.getAttribute("data-follow");
    if (follow) {
      e.preventDefault();
      toggleFollow(follow);
      return;
    }
    const rel = btn.getAttribute("data-rel");
    if (rel) {
      state.relatedFilter = rel;
      render();
      return;
    }
    if (btn.getAttribute("data-cat")) {
      state.categoryFilter = btn.getAttribute("data-cat");
      go("#/streams");
      return;
    }
    switch (act) {
      case "compose":
        go("#/feed");
        setTimeout(() => $("#composer")?.focus(), 0);
        break;
      case "post":
        publishPost();
        break;
      case "like":
        toggleSet(state.liked, btn.getAttribute("data-id"));
        snapshotMedia();
        render();
        restoreMedia();
        break;
      case "vlike": {
        const id = btn.getAttribute("data-id");
        toggleSet(state.liked, id);
        state.disliked.delete(id);
        snapshotMedia();
        render();
        restoreMedia();
        break;
      }
      case "vdlike": {
        const id = btn.getAttribute("data-id");
        toggleSet(state.disliked, id);
        state.liked.delete(id);
        snapshotMedia();
        render();
        restoreMedia();
        break;
      }
      case "navlive":
        state.navLiveTab = btn.getAttribute("data-tab");
        snapshotMedia();
        render();
        restoreMedia();
        break;
      case "grok-media":
        e.preventDefault();
        e.stopPropagation();
        state.grokOpen = !state.grokOpen;
        const pop = btn.parentElement?.querySelector(".grok-pop") || $(".grok-pop");
        pop?.classList.toggle("open", state.grokOpen);
        break;
      case "grok-ask": {
        e.stopPropagation();
        const ask = btn.getAttribute("data-q");
        toast(ask === "summarize" ? "Grok is summarizing this..." : ask === "fact" ? "Grok is fact-checking this..." : "Grok is finding related posts...");
        state.grokOpen = false;
        btn.closest(".grok-pop")?.classList.remove("open");
        break;
      }
      case "golive": {
        const { item, mode } = getItem();
        if (!item) break;
        const dur = dvrSeconds(item, mode);
        state.currentTime = dur;
        state.duration = dur;
        stopSynth();
        if (state.playing) startSynth(item);
        break;
      }
      case "save":
        toggleSet(state.saved, btn.getAttribute("data-id"));
        toast(state.saved.has(btn.getAttribute("data-id")) ? "Saved" : "Removed from saved");
        break;
      case "share":
        navigator.clipboard?.writeText(location.href);
        toast("Link copied");
        break;
      case "reply": {
        const input = document.querySelector(".reply-composer input");
        if (input) input.focus();
        else toast("Open a video, stream, Space, or Vine to reply");
        break;
      }
      case "repost":
        toast("Reposted");
        break;
      case "toggle":
        togglePlay();
        break;
      case "mute":
        state.muted = !state.muted;
        applyVolume();
        refreshPlayerChrome();
        break;
      case "cc":
        state.cc = !state.cc;
        const cc = $(".cc-overlay");
        if (cc) cc.classList.toggle("on", state.cc);
        btn.classList.toggle("on", state.cc);
        break;
      case "autoplay":
        state.autoplay = !state.autoplay;
        btn.classList.toggle("on", state.autoplay);
        toast(state.autoplay ? "Autoplay on" : "Autoplay off");
        break;
      case "settings":
        state.settingsOpen = !state.settingsOpen;
        $("#settings")?.classList.toggle("open", state.settingsOpen);
        break;
      case "rate": {
        const opts = [0.5, 0.75, 1, 1.25, 1.5, 2];
        state.rate = opts[(opts.indexOf(state.rate) + 1) % opts.length];
        const media = mediaEl();
        if (media) media.playbackRate = state.rate;
        refreshPlayerChrome();
        break;
      }
      case "quality": {
        const opts = ["720p", "1080p", "1440p"];
        state.quality = opts[(opts.indexOf(state.quality) + 1) % opts.length];
        refreshPlayerChrome();
        toast("Quality " + state.quality);
        break;
      }
      case "theater":
        snapshotMedia();
        state.theater = !state.theater;
        render();
        restoreMedia();
        break;
      case "fs":
        toggleFs();
        break;
      case "mini":
        popMini();
        break;
      case "seek":
        seekFromEvent(e);
        break;
      case "feat-prev":
        state.featuredIndex = (state.featuredIndex - 1 + STREAMS.length) % STREAMS.length;
        render();
        break;
      case "feat-next":
        state.featuredIndex = (state.featuredIndex + 1) % STREAMS.length;
        render();
        break;
      case "collapse-rail":
        state.liveRailCollapsed = !state.liveRailCollapsed;
        render();
        restoreMedia();
        break;
      case "more-live":
        toast("That's the full live set in this mock");
        break;
      case "clear-cat":
        state.categoryFilter = null;
        render();
        break;
      case "clear-chat":
        state.chat = [];
        const log = $("#chatlog");
        if (log) log.innerHTML = "";
        break;
      case "join-space":
        state.spaceJoined = state.spaceJoined === btn.getAttribute("data-id") ? null : btn.getAttribute("data-id");
        render();
        break;
      case "vinelike":
        toggleSet(state.vineLiked, btn.getAttribute("data-id"));
        render();
        restoreMedia();
        break;
      case "vinerevine":
        toggleSet(state.vineRevined, btn.getAttribute("data-id"));
        toast("Revined");
        break;
      case "notify":
        state.notifyOn = !state.notifyOn;
        toast(state.notifyOn ? "Notifications on" : "Notifications off");
        break;
      case "desc":
        btn.classList.toggle("open");
        break;
    }
  }
  function onSubmit(e) {
    const form = e.target.closest("form");
    if (!form) return;
    const act = form.getAttribute("data-act");
    if (act === "comment") {
      e.preventDefault();
      const text = form.text.value.trim();
      if (!text) return;
      const id = form.getAttribute("data-id");
      const cm = { user: "me", text, age: "now", likes: 0, replies: 0, reposts: 0, views: "1", id: "me" + Date.now() };
      if (state.route.name === "live" || state.route.name === "space") {
        state.liveReplies.unshift(cm);
        const log = $("#replylog");
        if (log) log.insertAdjacentHTML("afterbegin", renderReply(cm));
        form.text.value = "";
        state.commentDraft = "";
        return;
      }
      state.extraComments[id] = [cm, ...(state.extraComments[id] || [])];
      state.commentDraft = "";
      form.text.value = "";
      snapshotMedia();
      render();
      restoreMedia();
    }
  }
  function onInput(e) {
    if (e.target.matches("[data-act=volume]")) {
      state.volume = Number(e.target.value);
      state.muted = state.volume === 0;
      applyVolume();
    }
  }

  // bind once
  if (!window.__xmediaBound) {
    window.__xmediaBound = true;
    document.addEventListener("click", onClick);
    document.addEventListener("submit", onSubmit);
    document.addEventListener("input", onInput);
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousemove", () => {
      if (document.fullscreenElement) pulseUi();
    });
    document.addEventListener("fullscreenchange", () => pulseUi());
  }

  function toggleSet(set, id) {
    if (!id) return;
    if (set.has(id)) set.delete(id);
    else set.add(id);
  }
  function toggleFollow(id) {
    if (state.following.has(id)) state.following.delete(id);
    else state.following.add(id);
    $$("[data-follow='" + id + "']").forEach((b) => {
      const on = state.following.has(id);
      b.classList.toggle("following", on);
      b.textContent = on ? "Following" : "Follow";
    });
  }

  function publishPost() {
    const text = state.composer.trim();
    if (!text) return;
    state.extraPosts.unshift({
      id: "u" + Date.now(),
      type: "text",
      user: "me",
      age: "now",
      text,
      replies: 0, reposts: 0, likes: 0, views: "1",
    });
    CREATORS.me = { id: "me", name: ME.name, handle: ME.handle, avatar: null, initials: ME.initials, verified: true };
    state.composer = "";
    render();
    toast("Posted");
  }

  function getItem() {
    const r = state.route;
    if (r.name === "watch") return { item: videoById(r.id), mode: "vod" };
    if (r.name === "live") return { item: streamById(r.id), mode: "live" };
    if (r.name === "space") return { item: spaceById(r.id), mode: "space" };
    if (r.name === "vinewatch") return { item: vineById(r.id), mode: "vod" };
    return { item: null, mode: null };
  }

  function afterRender() {
    stopChat();
    stopSynth();
    stopPlayerLoop();
    if ($("#vine-scroller")) bindVineScroll();
    else if ($("#player")) setupPlayer();
    if (state.route.name === "live" || state.route.name === "space") startLiveReplies();
    $$(".vine-card video").forEach((v) => {
      const card = v.closest(".vine-card");
      card?.addEventListener("mouseenter", () => v.play().catch(() => {}));
      card?.addEventListener("mouseleave", () => { v.pause(); v.currentTime = 0; });
    });
  }

  function bindVineScroll() {
    const scroller = $("#vine-scroller");
    if (!scroller) return;
    const start = scroller.querySelector(`[data-vine="${state.route.id}"]`);
    if (start) start.scrollIntoView({ block: "start" });

    const activate = (id, force) => {
      if (!id || (id === state.route.id && !force)) return;
      state.route.id = id;
      history.replaceState(null, "", "#/vinewatch/" + id);
      $$(".vine-slide .player[id='player']").forEach((p) => p.removeAttribute("id"));
      const slide = scroller.querySelector(`[data-vine="${id}"]`);
      if (!slide) return;
      const player = slide.querySelector(".player");
      if (player) player.id = "player";
      $$(".vine-slide video").forEach((vid) => {
        if (!slide.contains(vid)) { vid.pause(); }
      });
      const rail = $(".replies-rail");
      if (rail) {
        const wrap = document.createElement("div");
        wrap.innerHTML = repliesRail(id, commentsFor(id));
        rail.replaceWith(wrap.firstElementChild);
      }
      setupPlayer();
    };

    const io = new IntersectionObserver((entries) => {
      const hit = entries
        .filter((e) => e.isIntersecting && e.intersectionRatio >= 0.55)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (hit) activate(hit.target.getAttribute("data-vine"));
    }, { root: scroller, threshold: [0.55, 0.75] });
    $$(".vine-slide", scroller).forEach((s) => io.observe(s));
    activate(state.route.id, true);
  }

  let mediaSnapshot = null;
  function snapshotMedia() {
    const media = mediaEl();
    const { item } = getItem();
    mediaSnapshot = {
      src: item?.src || "",
      t: media && item?.src ? media.currentTime : state.currentTime,
      playing: state.playing,
    };
  }
  function restoreMedia() {
    const media = mediaEl();
    if (media && mediaSnapshot) {
      try {
        if (mediaSnapshot.src && media.src !== mediaSnapshot.src) media.src = mediaSnapshot.src;
        media.currentTime = mediaSnapshot.t || 0;
        media.playbackRate = state.rate;
        applyVolume();
        if (mediaSnapshot.playing) media.play().catch(() => {});
      } catch (_) {}
    }
  }

  function setupPlayer() {
    const { item, mode } = getItem();
    if (!item) return;
    const player = $("#player");
    const media = mediaEl();
    const dvr = mode === "live" || mode === "space";
    const hasSrc = Boolean(item.src) && mode !== "space";
    state.duration = dvr ? dvrSeconds(item, mode) : (hasSrc ? (media.duration || item.seconds || 6) : (item.seconds || 6));
    state.currentTime = dvr ? state.duration : 0;
    state.playing = false;
    player.classList.add("show-ui");
    pulseUi();
    applyVolume();
    if (media) media.playbackRate = state.rate;

    const start = () => {
      state.playing = true;
      player.classList.add("playing");
      player.classList.remove("paused");
      player.classList.add("flash");
      setTimeout(() => player.classList.remove("flash"), 400);
      if (hasSrc) media.play().catch(() => {});
      if (dvr || !hasSrc) startSynth(item);
      refreshPlayerChrome();
      loopProgress();
    };

    if (player.dataset.bound !== item.id) {
    player.dataset.bound = item.id;
    player.addEventListener("click", (e) => {
      if (e.target.closest(".player-controls") || e.target.closest(".settings-menu") || e.target.closest(".ctrl") || e.target.closest(".grok-fab") || e.target.closest(".grok-pop")) return;
      togglePlay();
    });
    player.addEventListener("mousemove", () => pulseUi());
    media?.addEventListener("loadedmetadata", () => {
      if (!dvr) state.duration = media.duration || item.seconds;
      if (mediaSnapshot?.t && hasSrc && !dvr) {
        try { media.currentTime = mediaSnapshot.t; } catch (_) {}
      }
      refreshPlayerChrome();
    });
    media?.addEventListener("timeupdate", () => {
      if (hasSrc && !dvr) {
        state.currentTime = media.currentTime;
        state.duration = media.duration || state.duration;
      }
    });
    media?.addEventListener("ended", () => {
      if (dvr) {
        media.play().catch(() => {});
        return;
      }
      if (state.autoplay && state.route.name === "watch") {
        const next = VIDEOS[(VIDEOS.findIndex((v) => v.id === item.id) + 1) % VIDEOS.length];
        go("#/watch/" + next.id);
      } else {
        state.playing = false;
        player.classList.remove("playing");
        player.classList.add("paused");
        refreshPlayerChrome();
      }
    });
    }

    const snap = mediaSnapshot;
    mediaSnapshot = null;
    if (snap && (snap.src || "") === ((mode === "space" ? "" : item.src) || "")) {
      state.currentTime = snap.t || 0;
      if (hasSrc && media && !dvr) {
        try { media.currentTime = snap.t || 0; } catch (_) {}
      }
      if (snap.playing) start();
      else {
        state.playing = false;
        player.classList.add("paused");
        player.classList.remove("playing");
        refreshPlayerChrome();
        loopProgress();
      }
    } else {
      start();
    }
    if (!state.watched.includes(item.id)) state.watched.push(item.id);
  }

  function startSynth(item) {
    stopSynth();
    const { mode } = getItem();
    const dvr = mode === "live" || mode === "space";
    const durSec = dvr ? dvrSeconds(item, mode) : (item.seconds || 6);
    const t0 = performance.now() - state.currentTime * 1000;
    const step = (now) => {
      if (!state.playing) return;
      let t = (now - t0) / 1000;
      if (dvr) {
        state.duration = durSec;
        state.currentTime = Math.min(t, durSec);
      } else if (t >= durSec) {
        state.currentTime = durSec;
        state.playing = false;
        $("#player")?.classList.remove("playing");
        $("#player")?.classList.add("paused");
        refreshPlayerChrome();
        if (state.autoplay && state.route.name === "watch") {
          const next = VIDEOS[(VIDEOS.findIndex((v) => v.id === item.id) + 1) % VIDEOS.length];
          go("#/watch/" + next.id);
        }
        return;
      } else {
        state.currentTime = t;
      }
      state.synth = requestAnimationFrame(step);
    };
    state.synth = requestAnimationFrame(step);
  }

  function togglePlay() {
    const player = $("#player");
    const media = mediaEl();
    const { item, mode } = getItem();
    if (!player) return;
    const dvr = mode === "live" || mode === "space";
    const hasSrc = Boolean(item?.src) && mode !== "space";
    state.playing = !state.playing;
    player.classList.toggle("playing", state.playing);
    player.classList.toggle("paused", !state.playing);
    player.classList.add("flash");
    setTimeout(() => player.classList.remove("flash"), 400);
    if (state.playing) {
      if (hasSrc && media) media.play().catch(() => {});
      if (dvr || !hasSrc) startSynth(item);
      loopProgress();
    } else {
      media?.pause();
      stopSynth();
    }
    refreshPlayerChrome();
  }

  function applyVolume() {
    const media = mediaEl();
    if (media) {
      media.muted = state.muted;
      media.volume = state.volume;
    }
  }

  function loopProgress() {
    stopPlayerLoop();
    const tick = () => {
      const media = mediaEl();
      const { item, mode } = getItem();
      const dvr = mode === "live" || mode === "space";
      if (media && item?.src && !media.paused && !dvr) {
        state.currentTime = media.currentTime;
        state.duration = media.duration || state.duration;
      }
      const pbar = $("#pbar");
      const knob = $("#pknob");
      const ptime = $("#ptime");
      const dur = state.duration || item?.seconds || 1;
      const t = state.currentTime || 0;
      const pct = Math.min(100, (t / Math.max(dur, 0.001)) * 100);
      if (pbar) pbar.style.width = pct + "%";
      if (knob) knob.style.left = pct + "%";
      const atLive = dvr && t >= dur - 0.4;
      const playerEl = $("#player");
      if (playerEl) playerEl.classList.toggle("at-live", Boolean(dvr && atLive));
      const jump = playerEl?.querySelector("[data-act=golive]");
      if (jump) jump.classList.toggle("show", Boolean(dvr && !atLive));
      if (ptime) {
        if (dvr) ptime.textContent = atLive ? "LIVE" : clock(t);
        else ptime.textContent = `${clock(t)} / ${clock(dur)}`;
      }
      playerRaf = requestAnimationFrame(tick);
    };
    playerRaf = requestAnimationFrame(tick);
  }

  function seekFromEvent(e) {
    const { item, mode } = getItem();
    if (!item) return;
    const dvr = mode === "live" || mode === "space";
    const hit = e.target.closest(".progress-hit");
    const rect = hit.getBoundingClientRect();
    const pct = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const dur = dvr ? dvrSeconds(item, mode) : (state.duration || item.seconds);
    state.currentTime = pct * dur;
    state.duration = dur;
    const media = mediaEl();
    if (media && item.src && !dvr) media.currentTime = state.currentTime;
    else {
      stopSynth();
      if (state.playing) startSynth(item);
    }
  }

  function refreshPlayerChrome() {
    const player = $("#player");
    if (!player) return;
    const toggle = player.querySelector("[data-act=toggle]");
    if (toggle) toggle.innerHTML = state.playing ? ICONS.pauseSm : ICONS.playSm;
    const mute = player.querySelector("[data-act=mute]");
    if (mute) mute.innerHTML = state.muted || state.volume === 0 ? ICONS.mute : ICONS.vol;
    const rate = player.querySelector("[data-act=rate] span");
    if (rate) rate.textContent = state.rate + "x";
    const q = player.querySelector("[data-act=quality] span");
    if (q) q.textContent = state.quality;
  }

  function pulseUi() {
    const player = document.fullscreenElement?.classList?.contains("player")
      ? document.fullscreenElement
      : $("#player");
    if (!player) return;
    player.classList.add("show-ui");
    player.style.cursor = "";
    clearTimeout(state.hideTimer);
    state.hideTimer = setTimeout(() => {
      if (state.playing && !state.settingsOpen && !state.grokOpen) {
        player.classList.remove("show-ui");
        player.style.cursor = "none";
      }
    }, 2200);
  }

  function toggleFs() {
    const player = $("#player");
    if (!player) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else player.requestFullscreen?.();
  }

  function popMini() {
    const { item, mode } = getItem();
    if (!item) return;
    const media = mediaEl();
    state.mini = { id: item.id, mode, t: media?.currentTime || state.currentTime, playing: state.playing, src: item.src, thumb: item.thumb, title: item.title };
    const mini = $("#miniplayer");
    mini.classList.add("show");
    mini.innerHTML = `
      <div class="player playing">
        ${item.src ? `<video src="${item.src}" autoplay muted loop playsinline></video>` : `<img class="poster kb" src="${item.thumb}" style="position:relative;opacity:1">`}
      </div>
      <div class="mini-bar">
        <div class="t">${esc(item.title)}</div>
        <button data-act="mini-open">${ICONS.fs}</button>
        <button data-act="mini-close">${ICONS.close}</button>
      </div>
    `;
    mini.querySelector("[data-act=mini-close]").onclick = () => {
      mini.classList.remove("show");
      mini.innerHTML = "";
      state.mini = null;
      document.body.classList.remove("has-mini");
    };
    mini.querySelector("[data-act=mini-open]").onclick = () => {
      mini.classList.remove("show");
      const m = state.mini;
      state.mini = null;
      go(m.mode === "live" ? "#/live/" + m.id : "#/watch/" + m.id);
    };
    go("#/videos");
  }

  function startLiveReplies() {
    stopChat();
    const names = Object.keys(CREATORS).filter((k) => k !== "me");
    if (!state.liveReplies.length) {
      for (let i = 0; i < 6; i++) {
        const u = names[Math.floor(Math.random() * names.length)];
        state.liveReplies.push({
          user: u,
          text: CHAT_POOL[Math.floor(Math.random() * CHAT_POOL.length)],
          age: "now",
          likes: Math.floor(Math.random() * 48),
          replies: 0,
          reposts: 0,
          views: String(20 + Math.floor(Math.random() * 400)),
          id: "lr" + Date.now() + i,
        });
      }
      const log = $("#replylog");
      if (log) log.innerHTML = state.liveReplies.map(renderReply).join("");
    }
    chatTimer = setInterval(() => {
      if (state.route.name !== "live" && state.route.name !== "space") return;
      const u = names[Math.floor(Math.random() * names.length)];
      const cm = {
        user: u,
        text: CHAT_POOL[Math.floor(Math.random() * CHAT_POOL.length)],
        age: "now",
        likes: Math.floor(Math.random() * 24),
        replies: 0,
        reposts: 0,
        views: String(4 + Math.floor(Math.random() * 80)),
        id: "lr" + Date.now(),
      };
      state.liveReplies.unshift(cm);
      if (state.liveReplies.length > 40) state.liveReplies.pop();
      const log = $("#replylog");
      if (log) log.insertAdjacentHTML("afterbegin", renderReply(cm));
    }, 2200);
  }

  const CHAT_COLORS = ["#ff7a00", "#1d9bf0", "#00ba7c", "#f91880", "#ffd400", "#7856ff", "#ff6ad5"];
  function fakeChat() {
    const names = Object.values(CREATORS);
    const u = names[Math.floor(Math.random() * names.length)];
    const text = CHAT_POOL[Math.floor(Math.random() * CHAT_POOL.length)];
    const color = CHAT_COLORS[Math.floor(Math.random() * CHAT_COLORS.length)];
    pushChat(u.handle, text, color);
  }
  function pushChat(user, text, color) {
    state.chat.push({ user, text, color });
    if (state.chat.length > 80) state.chat.shift();
    const log = $("#chatlog");
    if (log && state.route.name === "live") {
      log.insertAdjacentHTML("beforeend", chatLine(state.chat[state.chat.length - 1]));
      log.scrollTop = log.scrollHeight;
    }
  }

  function onKey(e) {
    const tag = e.target.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA") return;
    if (state.route.name === "vinewatch" && (e.key === "ArrowDown" || e.key === "j")) {
      e.preventDefault();
      const i = VINES.findIndex((v) => v.id === state.route.id);
      const next = VINES[Math.min(VINES.length - 1, i + 1)];
      document.querySelector(`[data-vine="${next.id}"]`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (state.route.name === "vinewatch" && e.key === "ArrowUp") {
      e.preventDefault();
      const i = VINES.findIndex((v) => v.id === state.route.id);
      const prev = VINES[Math.max(0, i - 1)];
      document.querySelector(`[data-vine="${prev.id}"]`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    const player = $("#player");
    if (!player) return;
    if (e.key === " " || e.key === "k") { e.preventDefault(); togglePlay(); }
    if (e.key === "m") { state.muted = !state.muted; applyVolume(); refreshPlayerChrome(); }
    if (e.key === "f") { toggleFs(); }
    if (e.key === "t") { state.theater = !state.theater; render(); restoreMedia(); }
    if (e.key === "c") { state.cc = !state.cc; $(".cc-overlay")?.classList.toggle("on", state.cc); }
    if (e.key === "ArrowRight") {
      const media = mediaEl();
      if (media && getItem().item?.src) media.currentTime = Math.min(media.duration || 0, media.currentTime + 5);
      else state.currentTime = Math.min(state.duration, state.currentTime + 5);
    }
    if (e.key === "ArrowLeft") {
      const media = mediaEl();
      if (media && getItem().item?.src) media.currentTime = Math.max(0, media.currentTime - 5);
      else state.currentTime = Math.max(0, state.currentTime - 5);
    }
  }

  function routeFromHash() {
    const prev = state.route.name;
    state.route = parseRoute();
    if (["spaces", "space"].includes(state.route.name)) state.navLiveTab = "spaces";
    else if (["streams", "live"].includes(state.route.name)) state.navLiveTab = "streams";
    if ((state.route.name === "live" && prev !== "live") || (state.route.name === "space" && prev !== "space")) {
      state.liveReplies = [];
    }
    if (!["watch", "live", "vinewatch", "space"].includes(state.route.name)) {
      stopSynth();
      stopPlayerLoop();
    }
    if (state.route.name !== "live" && state.route.name !== "space") stopChat();
    state.grokOpen = false;
    render();
  }

  window.addEventListener("hashchange", routeFromHash);
  state.route = parseRoute();
  if (["spaces", "space"].includes(state.route.name)) state.navLiveTab = "spaces";
  else if (["streams", "live"].includes(state.route.name)) state.navLiveTab = "streams";
  render();
})();
