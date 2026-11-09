/* =====================================================================
   한국사능력검정 심화 기출 (사이드바 '한국사')
   ---------------------------------------------------------------------
   문항·이미지는 이 저장소에 없다. 로그인한 본인 Firestore(users/{uid}/hs, hsimg)에만 두고
   '한국사 > 불러오기'에서 history-cram의 data/hanguksa-bank.json을 골라 한 번 올린다.
   회차는 가상 주제 'hs-<회차>'로 BY_ID에 등록해 기출 시험지(renderSheet)를 그대로 쓴다.
   기록 키: 'hs-<회차>:<번호-1>' (state.hist·wrong·done·sheets·score, 클라우드 동기화 포함)
   ===================================================================== */
const HS = {
  status: 'out',   // out 로그아웃 · loading · empty 아직 안 올림 · denied 규칙 막힘 · error · ready
  rounds: [],      // 최신 회차부터 [회차 번호]
  MIN: 80,         // 심화 시험 시간(분)
  imgs: new Map(), // 문항 id → 이미지 data URL (ponytail: 메모리 캐시, 새로고침하면 다시 받음)
  mouseInk: false, // 마우스로도 필기 (펜이 없는 PC에서 시험용)
  eraser: false,
};

HS.setStatus = s => { HS.status = s; if (s !== 'ready') { HS.rounds.forEach(r => delete BY_ID['hs-' + r]); HS.rounds = []; } HS.refresh(); };
HS.setBank = qs => {
  HS.rounds = [...new Set(qs.map(q => q.r))].sort((a, b) => b - a);
  for (const r of HS.rounds) BY_ID['hs-' + r] = {
    id: 'hs-' + r, title: `제${r}회 심화`, hs: true,
    quiz: qs.filter(q => q.r === r).sort((a, b) => a.n - b.n).map(q => ({
      type: q.era, pts: q.pts, answer: q.ans,
      q: `<span class="hs-pts">[${q.pts}점]</span> ${esc(q.prompt)}<div class="hs-q" data-id="${q.id}"><img alt="제${r}회 ${q.n}번 문제 원본 (사료·선지 포함)"><canvas class="ink"></canvas><button class="hs-clear" title="이 문항 필기 지우기">지우기</button></div>`,
      options: q.choices.map(c => c ? esc(c) : '<span class="muted">그림 선지 · 문제 이미지 참고</span>'),
      explain: `<p><b>${esc(q.topic)}</b> · ${esc(q.clue)}</p>${q.context && q.context !== q.clue ? `<p>${esc(q.context)}</p>` : ''}<ol>${q.exps.map(x => `<li>${esc(x)}</li>`).join('')}</ol><p class="sm muted">${esc(q.era)} · ${esc(q.field)} · 공식 정답표 기준 자체 작성 해설 (공식 해설 아님)</p>`,
    })),
  };
  HS.status = 'ready'; HS.refresh();
};
HS.refresh = () => { if (location.hash.startsWith('#/hs')) route(); else renderSidebar(); };

HS.title = id => id === 'hs-wrong' ? '한국사 오답' : BY_ID[id]?.title || '한국사';
HS.items = id => id === 'hs-wrong'
  ? HS.rounds.flatMap(r => BY_ID['hs-' + r].quiz.map((_, qi) => [BY_ID['hs-' + r], qi])).filter(([t, qi]) => state.wrong[t.id + ':' + qi])
  : (BY_ID[id]?.quiz || []).map((_, qi) => [BY_ID[id], qi]);
HS.grade = sc => sc >= 80 ? '1급' : sc >= 70 ? '2급' : sc >= 60 ? '3급' : '불합격';
const hsWrongN = () => HS.status === 'ready' ? HS.items('hs-wrong').length : 0;

HS.nav = () => {
  const on = h => location.hash === h ? ' class="active"' : '';
  return `<div class="nav-group">한국사</div><div class="nav-top"><a href="#/hs"${on('#/hs')}>한능검 심화 기출</a>`
    + HS.rounds.map(r => `<a href="#/hs/${r}"${on('#/hs/' + r)} style="padding-left:22px">제${r}회</a>`).join('')
    + (hsWrongN() ? `<a href="#/hs/wrong"${on('#/hs/wrong')} style="padding-left:22px">오답 ${hsWrongN()}</a>` : '') + `</div>`;
};

HS.render = arg => {
  const head = `<h1>한국사능력검정 심화</h1>`;
  if (HS.status === 'ready' && (arg === 'wrong' || HS.rounds.includes(+arg))) {
    if (arg === 'wrong' && state.sheets['hs-wrong']?.e && sheet?.id !== 'hs-wrong') delete state.sheets['hs-wrong'];   // 지난번 채점한 오답 묶음 대신 지금 오답으로 새로
    return renderSheet('hs-' + arg, head, '#/hs');
  }
  if (arg === 'import') return head + HS.importPage();
  const msg = {
    out: '오른쪽 위에서 로그인하면 내 계정에 올린 기출을 풀 수 있습니다.',
    loading: '기출을 불러오는 중…',
    empty: `아직 올린 기출이 없습니다. <a href="#/hs/import">불러오기 →</a>`,
    denied: `클라우드 규칙이 한국사 자료를 막고 있습니다. <a href="#/hs/import">불러오기</a> 화면의 안내를 확인하세요.`,
    error: '기출을 불러오지 못했습니다. 연결을 확인하고 새로고침하세요.',
  }[HS.status];
  if (msg) return head + `<p class="lead">${msg}</p>`;
  const rec = k => state.score[k] ? ` · 최근 ${state.score[k][0]}점(${HS.grade(state.score[k][0])}) · 최고 ${state.score[k][1]}점` : '';
  const going = k => (v => v && !v.e && v.p.some(x => x != null) ? ` <span class="pill">푸는 중 ${v.p.filter(x => x != null).length}/${v.k.length}</span>` : '')(state.sheets[k]);
  return head + `<p class="lead">실제 시험처럼 50문항을 풀고 한 번에 제출합니다. 배점대로 채점하고 급수(80점 1급 · 70점 2급 · 60점 3급)를 판정합니다.</p>
    <ul class="tlist">${HS.rounds.map(r => `<li><a href="#/hs/${r}"><strong>제${r}회 심화</strong></a>${going('hs-' + r)}<div class="sm">50문항 · ${HS.MIN}분${rec('hs-' + r)}</div></li>`).join('')}
    ${hsWrongN() ? `<li><a href="#/hs/wrong"><strong>오답 다시 풀기</strong></a><div class="sm">최근 답이 틀린 ${hsWrongN()}문항 · 시간 제한 없음</div></li>` : ''}</ul>
    <h2>아이패드 · Apple Pencil</h2><ul><li>펜으로 문제 이미지 위에 바로 밑줄·소거 표시를 할 수 있습니다. 손가락은 그대로 스크롤입니다.</li>
    <li>필기는 이 기기에만 남고, 다시 풀기·초기화하면 지워집니다. 답과 점수는 로그인한 모든 기기에 동기화됩니다.</li></ul>
    <p class="hist-tools"><button class="ghost-btn hs-reset">한국사 풀이 기록 모두 지우기</button></p>
    <p class="legend"><a href="#/hs/import">기출 다시 불러오기</a> · 문항: 국사편찬위원회 공식 문제지·정답표 (개인 학습용, 내 계정에만 저장)</p>`;
};

HS.importPage = () => {
  if (HS.status === 'out') return `<p class="lead">먼저 로그인하세요. 기출은 로그인한 본인 계정에만 저장됩니다.</p>`;
  return `<p class="lead">PC의 <code>history-cram</code> 폴더에서 <code>node 클라우드-내보내기.js</code>를 실행해 만든 <code>data/hanguksa-bank.json</code>을 고르세요. 문항 이미지는 내 계정에만 올라가고, 지금까지의 풀이 기록(맞힌 횟수·오답)도 합칩니다.</p>
    <p><input type="file" id="hsFile" accept="application/json,.json"></p><p id="hsProg" class="sm"></p>
    ${HS.status === 'denied' ? `<div class="box"><p>Firebase 콘솔 → Firestore → 규칙에서 <code>users</code> 규칙을 하위 경로까지 본인만 읽고 쓰도록 바꿔 주세요.</p><pre><code>match /users/{uid}/{rest=**} {
  allow read, write: if request.auth != null &amp;&amp; request.auth.uid == uid;
}</code></pre></div>` : ''}`;
};
document.addEventListener('change', async e => {
  if (e.target.id !== 'hsFile' || !e.target.files[0]) return;
  const prog = $('#hsProg'), input = e.target;
  try {
    const data = JSON.parse(await input.files[0].text());
    if (data.app !== 'hanguksa-bank' || !Array.isArray(data.qs) || !data.qs.length) throw Error('hanguksa-bank.json 파일이 아닙니다.');
    input.disabled = true;
    await hsCloud.importBank(data.qs, i => prog.textContent = `이미지 올리는 중 ${i} / ${data.qs.length}`);
    let added = 0;   // 기존 기록이 없는 문항만 채운다
    for (const [k, v] of Object.entries(data.rec?.hist || {})) if (!state.hist[k] && /^hs-\d+:\d+$/.test(k)) {
      state.hist[k] = v; state.done[k] = 1; if (data.rec.wrong?.[k]) state.wrong[k] = 1; added++;
    }
    state = cleanState(state); save();
    toast(`기출 ${data.qs.length}문항을 올렸습니다${added ? ` · 풀이 기록 ${added}문항 합침` : ''}`);
    location.hash = '#/hs';
  } catch (err) {
    input.disabled = false;
    prog.textContent = err.code === 'permission-denied' ? '클라우드 규칙이 막고 있습니다. 아래 규칙을 적용한 뒤 다시 고르세요.' : '실패: ' + (err.message || err.code);
    if (err.code === 'permission-denied') { HS.status = 'denied'; $('#view').innerHTML = `<h1>한국사능력검정 심화</h1>` + HS.importPage(); $('#hsProg').textContent = '클라우드 규칙이 막고 있습니다.'; }
  }
});

/* 한국사 풀이 기록 초기화: 점수·오답·맞힌 횟수·푸는 중인 답안·필기. 한 번 더 눌러야 실행. 기출 문항은 그대로 */
document.addEventListener('click', e => {
  const b = e.target.closest('.hs-reset'); if (!b) return;
  if (!b.classList.contains('warn')) { b.textContent = '정말 지우기 (되돌릴 수 없음)'; b.classList.add('warn'); return; }
  for (const box of [state.hist, state.wrong, state.done, state.score, state.sheets])
    for (const k of Object.keys(box)) if (k.startsWith('hs-')) delete box[k];
  if (sheet?.id.startsWith('hs-')) sheet = null;
  HS.ink = {}; inkSave(); save();
  toast('한국사 풀이 기록을 지웠습니다'); route();
});

/* 시험 시간: 첫 답을 고를 때 시작. 지나면 초과 시간을 빨갛게 표시만 하고 제출은 직접 (ponytail: 기기 시계 기준) */
const hsLeft = S => S.t ? Math.round((S.t + HS.MIN * 6e4 - Date.now()) / 1000) : HS.MIN * 60;
const hsClock = left => { const a = Math.abs(left); return (left < 0 ? '+' : '') + Math.floor(a / 60) + ':' + String(a % 60).padStart(2, '0') + (left < 0 ? ' 초과' : ''); };
HS.timer = S => !S.id.startsWith('hs-') || S.id === 'hs-wrong' ? '' : `<span class="hs-timer${hsLeft(S) < 0 ? ' over' : ''}" id="hsTimer" title="첫 답을 고르면 시작">${hsClock(hsLeft(S))}</span>`;
setInterval(() => {
  const el = document.getElementById('hsTimer'); if (!el || !sheet?.t) return;
  const left = hsLeft(sheet); el.textContent = hsClock(left); el.classList.toggle('over', left < 0);
}, 1000);
document.addEventListener('click', e => {   // 첫 답을 고르면 시간 시작 (index.html의 .mopt 처리보다 먼저 실행)
  if (e.target.closest('.mopt') && sheet?.id.startsWith('hs-') && sheet.id !== 'hs-wrong' && !sheet.t && !sheet.end) sheet.t = Date.now();
}, true);

/* 문항 이미지 + Apple Pencil 필기
   펜(pointerType 'pen')은 항상 필기, 손가락은 스크롤, 마우스는 '마우스 필기'를 켰을 때만.
   획은 이미지 크기 기준 0~1 좌표로 저장해 화면을 돌려도 위치가 맞는다. 시험지별로 localStorage에 둔다. */
const INK_KEY = 'cs-ai-study:hs-ink';
HS.ink = (() => { try { return JSON.parse(lsGet(INK_KEY)) || {}; } catch { return {}; } })();   // { 시험지 id: { 문항 id: [획…] } }
const inkSave = () => { if (!lsSet(INK_KEY, JSON.stringify(HS.ink))) toast('필기를 저장할 공간이 부족합니다'); };
HS.clearInk = id => { if (HS.ink[id]) { delete HS.ink[id]; inkSave(); } };
const strokesOf = qid => HS.ink[sheet?.id]?.[qid] || [];   // 읽기 (빈 칸은 만들지 않음)
const strokesFor = qid => ((HS.ink[sheet?.id || 'free'] ||= {})[qid] ||= []);   // 쓰기

function inkDraw(cv, strokes) {
  const c = cv.getContext('2d'), W = cv.width, H = cv.height;
  c.clearRect(0, 0, W, H); c.lineCap = c.lineJoin = 'round';
  for (const s of strokes) {
    c.globalCompositeOperation = s.e ? 'destination-out' : 'source-over';
    c.strokeStyle = '#e11d48';
    for (let i = 1; i < s.p.length; i++) {
      const [x0, y0] = s.p[i - 1], [x1, y1, pr] = s.p[i];
      c.lineWidth = (s.e ? 14 : 1 + 2.2 * (pr || 0.5)) * W / 800;
      c.beginPath(); c.moveTo(x0 * W, y0 * H); c.lineTo(x1 * W, y1 * H); c.stroke();
    }
  }
}
function inkFit(box) {
  const img = box.querySelector('img'), cv = box.querySelector('canvas'), r = devicePixelRatio || 1;
  if (!img.naturalWidth) return;
  cv.width = Math.round(img.clientWidth * r); cv.height = Math.round(img.clientHeight * r);
  inkDraw(cv, strokesOf(box.dataset.id));
}
addEventListener('resize', () => document.querySelectorAll('.hs-q').forEach(inkFit));

HS.enhance = view => {
  view.querySelectorAll('.hs-q').forEach(box => {
    const id = box.dataset.id, img = box.querySelector('img'), cv = box.querySelector('canvas');
    img.onload = () => inkFit(box);
    if (HS.imgs.has(id)) img.src = HS.imgs.get(id);
    else hsCloud.img(id).then(src => { if (src) { HS.imgs.set(id, src); img.src = src; } else img.alt = '이미지를 불러오지 못했습니다'; }, () => img.alt = '이미지를 불러오지 못했습니다');
    let cur = null;
    const pt = e => { const b = cv.getBoundingClientRect(); return [+((e.clientX - b.left) / b.width).toFixed(4), +((e.clientY - b.top) / b.height).toFixed(4), +(e.pressure || 0.5).toFixed(2)]; };
    const can = e => e.pointerType === 'pen' || (e.pointerType === 'mouse' && HS.mouseInk);
    cv.addEventListener('touchstart', e => { if ([...e.touches].some(t => t.touchType === 'stylus')) e.preventDefault(); }, { passive: false });   // 펜이 스크롤하지 않게 (iPad Safari)
    cv.addEventListener('pointerdown', e => {
      if (!can(e)) return;
      e.preventDefault(); try { cv.setPointerCapture(e.pointerId); } catch {}
      cur = { e: HS.eraser || e.button === 5 ? 1 : 0, p: [pt(e)] }; strokesFor(id).push(cur);
    });
    cv.addEventListener('pointermove', e => {
      if (!cur) return;
      const evs = e.getCoalescedEvents?.() || []; for (const ev of evs.length ? evs : [e]) cur.p.push(pt(ev));   // 펜 샘플을 빠짐없이
      inkDraw(cv, strokesOf(id));
    });
    const end = () => { if (cur) { cur = null; inkSave(); } };
    cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);
    box.querySelector('.hs-clear').onclick = () => { if (HS.ink[sheet?.id]) delete HS.ink[sheet.id][id]; inkDraw(cv, []); inkSave(); };
  });
  if (view.querySelector('.hs-q') && !view.querySelector('.ink-tools')) view.insertAdjacentHTML('beforeend',
    `<div class="ink-tools"><button data-ink="pen" class="${HS.eraser ? '' : 'on'}">펜</button><button data-ink="eraser" class="${HS.eraser ? 'on' : ''}">지우개</button><button data-ink="mouse" class="${HS.mouseInk ? 'on' : ''}" title="펜이 없을 때 마우스로 필기">마우스 필기</button></div>`);
};
document.addEventListener('click', e => {
  const b = e.target.closest('[data-ink]'); if (!b) return;
  if (b.dataset.ink === 'mouse') HS.mouseInk = !HS.mouseInk; else HS.eraser = b.dataset.ink === 'eraser';
  b.parentElement.querySelectorAll('button').forEach(x => x.classList.toggle('on', x.dataset.ink === 'mouse' ? HS.mouseInk : (x.dataset.ink === 'eraser') === HS.eraser));
});
