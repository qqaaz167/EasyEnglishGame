// game.js - 英語勇者大冒險 v2

// ===== CONFIG =====
const CONFIG = {
  LEVELS: 10,
  WINS_TO_UNLOCK: 3,
  MAX_WRONG_PER_BATTLE: 3,
  PLAYER_HP: 3,
  BOSS_MAX_HP: 200,
  NORMAL_DMG_MIN: 15, NORMAL_DMG_MAX: 25,
  CRIT_DMG_MIN: 40,   CRIT_DMG_MAX: 60,
  CRIT_CHANCE: 0.25,
  ANSWER_LOCK_MS: 900,
  TREASURES_PER_LEVEL: 8,
  NORMAL_ATTACK_TARGET: 6,
  BOSS_ATTACK_TARGET: 10,
  STORAGE_KEY: 'georgelearn_save',
};


// ===== 等級資料 =====
const LEVEL_DATA = [
  null,
  { name: 'LV1 — 入門森林', boss: '青蛙魔',   bossEmoji: '🐸', bossAura: '🫧 🫧',  bossWeapon: '💧 💧', title: '見習劍士' },
  { name: 'LV2 — 水果谷地', boss: '狡猾狐',   bossEmoji: '🦊', bossAura: '🗡️ 🗡️', bossWeapon: '💥 💥', title: '銅牌勇者' },
  { name: 'LV3 — 物品迷城', boss: '蠍子將軍', bossEmoji: '🦂', bossAura: '⚔️ 🛡️', bossWeapon: '💀 💀', title: '鐵甲騎士' },
  { name: 'LV4 — 衣物城堡', boss: '冰狼王',   bossEmoji: '🐺', bossAura: '❄️ ❄️',  bossWeapon: '🌨️ 🌨️', title: '詞彙戰士' },
  { name: 'LV5 — 學院廢墟', boss: '黑鷹將',   bossEmoji: '🦅', bossAura: '🌪️ 🌪️', bossWeapon: '⚡ ⚡',  title: '魔法學徒' },
  { name: 'LV6 — 颱風海域', boss: '深海鯊',   bossEmoji: '🦈', bossAura: '🌀 🌀',  bossWeapon: '💦 💦', title: '語言法師' },
  { name: 'LV7 — 動作競技場', boss: '獅王',     bossEmoji: '🦁', bossAura: '🔥 🔥',  bossWeapon: '💢 💢', title: '風暴騎士' },
  { name: 'LV8 — 時間迷宮', boss: '暗翼蝙蝠', bossEmoji: '🦇', bossAura: '🌑 🌑',  bossWeapon: '🌙 🌙', title: '聖光守護' },
  { name: 'LV9 — 智慧神廟', boss: '古龍',     bossEmoji: '🐉', bossAura: '🔥 🔥',  bossWeapon: '💨 💨', title: '傳說英雄' },
  { name: 'LV10 — 星際要塞', boss: '星際魔將', bossEmoji: '👾', bossAura: '⚡ ⚡',  bossWeapon: '🌌 🌌', title: '星空征服者' },
];

const FINAL_BOSS = {
  name: '究極魔獸', bossEmoji: '🔥', bossAura: '⚡ 👾',
  bossWeapon: '💀 🌑', title: '究極英語王', isFinalBoss: true,
};

const PLAYER_STAGES = [
  null,
  { levels: [1,2,3,4], emoji: '⚔️',   name: '小劍士',   cssClass: 'stage-1' },
  { levels: [5,6,7,8], emoji: '🛡️',   name: '騎士',     cssClass: 'stage-2' },
  { levels: [9,10,'boss'], emoji: '✨⚔️', name: '魔法劍士', cssClass: 'stage-3' },
];

// ===== 寶物資料 =====
const TREASURE_DATA = {
  1:  ['🪙','💍','🗡️','🏹','🧪','🔮','💎','🪬'],
  2:  ['🛡️','⚔️','🪄','🧿','📿','🌟','🏆','🎖️'],
  3:  ['🦴','🔱','🪅','🧸','🎭','🗺️','🔭','🪆'],
  4:  ['🪸','🧲','⚗️','🪡','🎪','🌀','💠','🔑'],
  5:  ['🎋','🌿','🍄','🌙','⭐','🌊','🔥','💫'],
  6:  ['❄️','🌪️','⚡','🌈','🌸','🍁','🌋','🌌'],
  7:  ['🦷','🪝','🔒','🗝️','🧱','⛓️','🪤','🔓'],
  8:  ['🎯','🎲','🃏','🎰','🎳','🎮','🕹️','🎴'],
  9:  ['🏰','🗼','🛸','🚀','🌍','🌏','🌎','🪐'],
  10: ['🎓','🏅','🥇','🏵️','🎗️','🎀','🪆','🎁'],
};
const TREASURE_NAMES = {
  1:  ['銅幣','戒指','短劍','弓箭','藥水','魔法球','寶石','護符'],
  2:  ['盾牌','長劍','法杖','神珠','珠鍊','星石','聖杯','勳章'],
  3:  ['骨紋章','三叉戟','鈴鼓','玩偶','面具','古地圖','望遠鏡','木偶'],
  4:  ['珊瑚','磁石','煉丹爐','絲線','魔帳','旋渦石','藍鑽','古鑰'],
  5:  ['竹葉','草藥','蘑菇','月石','星砂','海珠','火晶','流星'],
  6:  ['冰晶','風渦','閃電石','彩虹石','花印','楓葉','熔岩石','星雲'],
  7:  ['牙印','鐵鉤','鎖鏈','骨鑰','符文磚','黑鍊','陷阱器','解鎖符'],
  8:  ['靶心石','骰子','命運牌','賭石','保齡球','遊戲機','搖桿','花牌'],
  9:  ['古城堡','高塔印','飛碟','火箭石','地球儀','翡翠珠','輝石','星球石'],
  10: ['學士帽','金牌','冠軍章','紀念花','絲帶','蝴蝶結','精靈偶','禮盒'],
};
const CROWN_TREASURE = { emoji: '👑', name: '英語王冠' };

// ===== STATE =====
function buildDefaultProgress() {
  const p = {};
  for (let i = 1; i <= CONFIG.LEVELS; i++) {
    p[String(i)] = { winCount: 0, treasures: [], unlocked: i === 1 };
  }
  p['boss'] = { winCount: 0, treasures: [], unlocked: false };
  return p;
}
function buildDefaultSavedQ() {
  const q = {};
  for (let i = 1; i <= CONFIG.LEVELS; i++) q[String(i)] = null;
  q['boss'] = null;
  return q;
}

let STATE = {
  levelProgress: buildDefaultProgress(),
  savedQuestions: buildDefaultSavedQ(),
  titlesEarned: [],
  displayTitle: '',
  totalCorrect: 0,
  battle: {
    active: false,
    levelKey: '1',
    questions: [],
    currentQ: 0,
    wrongInBattle: 0,
    correctInBattle: 0,
    attackTarget: 5,
    bossHp: CONFIG.BOSS_MAX_HP,
    playerHp: CONFIG.PLAYER_HP,
    locked: false,
    _resultHandled: false,
  },
};

// ===== StorageManager =====
const StorageManager = {
  save() {
    try {
      localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify({
        levelProgress: STATE.levelProgress,
        savedQuestions: STATE.savedQuestions,
        titlesEarned: STATE.titlesEarned,
        displayTitle: STATE.displayTitle,
        totalCorrect: STATE.totalCorrect,
        saveVersion: 2,
      }));
    } catch(e) {}
  },
  load() {
    try {
      const raw = localStorage.getItem(CONFIG.STORAGE_KEY);
      if (!raw) return;
      const d = JSON.parse(raw);
      if (d.saveVersion !== 2) return; // v1 不相容，重置
      STATE.levelProgress = d.levelProgress || buildDefaultProgress();
      STATE.savedQuestions = d.savedQuestions || buildDefaultSavedQ();
      STATE.titlesEarned = d.titlesEarned || [];
      STATE.displayTitle = d.displayTitle || '';
      STATE.totalCorrect = d.totalCorrect || 0;
    } catch(e) {}
  },
  reset() {
    localStorage.removeItem(CONFIG.STORAGE_KEY);
    STATE.levelProgress = buildDefaultProgress();
    STATE.savedQuestions = buildDefaultSavedQ();
    STATE.titlesEarned = [];
    STATE.displayTitle = '';
    STATE.totalCorrect = 0;
  },
};

// ===== WordEngine =====
const WordEngine = {
  getPool(levelKey) {
    if (levelKey === 'boss') return WORDS;
    return WORDS.filter(w => w.level === Number(levelKey));
  },
  shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },
  generateQuestion(word, pool) {
    const canEmoji = word.emoji !== null;
    const useEmoji = canEmoji && Math.random() < 0.5;
    const type = useEmoji ? 'emoji' : 'translation';
    const others = pool.filter(w => w.word !== word.word);
    const wrongs = this.shuffle(others).slice(0, 3).map(w => w.word);
    const options = this.shuffle([word.word, ...wrongs]);
    return { type, wordObj: word, prompt: type === 'emoji' ? word.emoji : word.translation, options, correct: word.word };
  },
  buildQuestions(levelKey, count) {
    const pool = this.getPool(levelKey);
    const selected = this.shuffle(pool).slice(0, count);
    return selected.map(w => this.generateQuestion(w, pool));
  },
  // 從 localStorage 還原 saved questions（word 需重新對應）
  reconstructQuestions(savedQArray) {
    // savedQArray 是序列化後的 plain objects，直接還原即可
    return savedQArray.map(q => {
      // wordObj 可能是 plain obj，確保 correct/options 都在
      if (!q.correct || !q.options) return null;
      return q;
    }).filter(Boolean);
  },
};

// ===== BattleEngine =====
const BattleEngine = {
  calcDamage() {
    const isCrit = Math.random() < CONFIG.CRIT_CHANCE;
    const min = isCrit ? CONFIG.CRIT_DMG_MIN : CONFIG.NORMAL_DMG_MIN;
    const max = isCrit ? CONFIG.CRIT_DMG_MAX : CONFIG.NORMAL_DMG_MAX;
    return { amount: Math.floor(Math.random() * (max - min + 1)) + min, isCrit };
  },
  onCorrect() {
    const dmg = this.calcDamage();
    STATE.battle.bossHp = Math.max(0, STATE.battle.bossHp - dmg.amount);
    STATE.battle.correctInBattle++;
    STATE.totalCorrect++;
    return dmg;
  },
  onWrong() {
    STATE.battle.wrongInBattle++;
    STATE.battle.playerHp = Math.max(0, STATE.battle.playerHp - 1);
  },
  checkResult() {
    if (STATE.battle.wrongInBattle >= CONFIG.MAX_WRONG_PER_BATTLE) return 'fail';
    if (STATE.battle.correctInBattle >= STATE.battle.attackTarget) return 'win';
    return 'ongoing';
  },
  onWin(levelKey) {
    const prog = STATE.levelProgress[levelKey];
    prog.winCount++;
    // 清除失敗題目
    STATE.savedQuestions[levelKey] = null;
    // 發放寶物
    TreasureEngine.award(levelKey);
    // 解鎖下一關
    if (levelKey !== 'boss') {
      const nextKey = String(Number(levelKey) + 1);
      if (prog.winCount >= CONFIG.WINS_TO_UNLOCK) {
        if (Number(nextKey) <= 10 && STATE.levelProgress[nextKey]) {
          STATE.levelProgress[nextKey].unlocked = true;
        } else if (nextKey === '11') {
          // 解鎖大魔王
          STATE.levelProgress['boss'].unlocked = true;
        }
      }
    }
    StorageManager.save();
  },
  onFail(levelKey) {
    // 儲存題目供下次使用
    STATE.savedQuestions[levelKey] = STATE.battle.questions;
    StorageManager.save();
  },
};

// ===== TreasureEngine =====
const TreasureEngine = {
  award(levelKey) {
    if (levelKey === 'boss') {
      const prog = STATE.levelProgress['boss'];
      if (!prog.treasures.includes('crown')) {
        prog.treasures.push('crown');
        STATE.displayTitle = FINAL_BOSS.title;
        if (!STATE.titlesEarned.includes(FINAL_BOSS.title)) {
          STATE.titlesEarned.push(FINAL_BOSS.title);
        }
      }
      return;
    }
    const lv = Number(levelKey);
    const prog = STATE.levelProgress[levelKey];
    const pool = TREASURE_DATA[lv] || [];
    const nextIdx = prog.treasures.length;
    if (nextIdx < pool.length) {
      prog.treasures.push(pool[nextIdx]);
    }
  },
  totalCollected() {
    let n = 0;
    for (let i = 1; i <= 10; i++) {
      n += (STATE.levelProgress[String(i)].treasures || []).length;
    }
    if ((STATE.levelProgress['boss'].treasures || []).includes('crown')) n++;
    return n;
  },
  hasCrown() {
    return (STATE.levelProgress['boss'].treasures || []).includes('crown');
  },
};

// ===== AnimationEngine =====
const AnimationEngine = {
  spawnFloatingDamage(amount, isCrit) {
    const stage = document.getElementById('battle-stage');
    const el = document.createElement('div');
    el.className = 'float-dmg ' + (isCrit ? 'crit' : 'normal');
    el.textContent = '-' + amount;
    el.style.right = (20 + Math.random() * 60) + 'px';
    el.style.top  = (30 + Math.random() * 40) + 'px';
    stage.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  },
  bossHit() {
    const el = document.getElementById('boss-sprite');
    el.classList.remove('boss-hit'); void el.offsetWidth;
    el.classList.add('boss-hit');
    el.addEventListener('animationend', () => el.classList.remove('boss-hit'), { once: true });
  },
  playerHit() {
    const el = document.getElementById('player-sprite');
    el.classList.remove('player-hit'); void el.offsetWidth;
    el.classList.add('player-hit');
    el.addEventListener('animationend', () => el.classList.remove('player-hit'), { once: true });
  },
  slashEffect(isCrit) {
    const el = document.getElementById('slash-effect');
    el.textContent = isCrit ? '💥' : '⚔️';
    el.className = 'slash-active' + (isCrit ? ' slash-crit' : '');
    el.addEventListener('animationend', () => { el.className = ''; el.textContent = ''; }, { once: true });
  },
  spawnParticles() {
    const emojis = ['⭐','✨','🌟','💫','🎉','🎊'];
    for (let i = 0; i < 14; i++) {
      const el = document.createElement('div');
      el.className = 'particle';
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.left = (10 + Math.random() * 80) + 'vw';
      el.style.top  = (10 + Math.random() * 80) + 'vh';
      const dx = (Math.random() - 0.5) * 250;
      const dy = (Math.random() - 0.5) * 250 - 100;
      el.style.setProperty('--fly-to', `translate(${dx}px,${dy}px)`);
      el.style.animationDelay = (Math.random() * 0.4) + 's';
      document.body.appendChild(el);
      el.addEventListener('animationend', () => el.remove());
    }
  },
};

// ===== CharacterRenderer =====
const CharacterRenderer = {
  getPlayerStage(levelKey) {
    if (levelKey === 'boss' || Number(levelKey) >= 9) return PLAYER_STAGES[3];
    if (Number(levelKey) >= 5) return PLAYER_STAGES[2];
    return PLAYER_STAGES[1];
  },
  renderPlayer(levelKey) {
    const stage = this.getPlayerStage(levelKey);
    const sprite = document.getElementById('player-sprite');
    const name = document.getElementById('player-name');
    sprite.textContent = stage.emoji;
    sprite.className = 'player-sprite ' + stage.cssClass;
    name.textContent = stage.name;
  },
  renderBoss(levelKey) {
    const data = levelKey === 'boss' ? FINAL_BOSS : LEVEL_DATA[Number(levelKey)];
    const sprite = document.getElementById('boss-sprite');
    const nameEl = document.getElementById('boss-name');
    sprite.className = 'boss-sprite level-' + (levelKey === 'boss' ? 'boss' : levelKey);
    sprite.innerHTML = `
      <div class="bv-aura">${data.bossAura}</div>
      <div class="bv-main">${data.bossEmoji}</div>
      <div class="bv-weapons">${data.bossWeapon}</div>
    `;
    nameEl.textContent = data.name;
    // 大魔王標籤
    const badge = document.getElementById('boss-badge');
    if (badge) badge.style.display = levelKey === 'boss' ? 'block' : 'none';
  },
};

// ===== UIRenderer =====
const UIRenderer = {
  renderHearts(hp, max) {
    const el = document.getElementById('hearts');
    let h = '';
    for (let i = 0; i < max; i++)
      h += i < hp ? '<span style="color:#f44">♥</span>' : '<span style="color:#444">♡</span>';
    el.innerHTML = h;
  },
  renderBossHp(hp, max) {
    const pct = Math.max(0, (hp / max) * 100);
    const bar = document.getElementById('boss-hp-bar');
    bar.style.width = pct + '%';
    bar.style.background = pct > 50 ? '#f44336' : (pct > 25 ? '#ff9800' : '#ffeb3b');
  },
  renderQuestion(q, idx, total) {
    document.getElementById('question-progress').textContent = `第 ${idx + 1} / ${total} 題`;
    const prompt = document.getElementById('question-prompt');
    const lbl    = document.getElementById('question-type-label');
    if (q.type === 'emoji') {
      prompt.innerHTML = `<span class="question-emoji">${q.prompt}</span>`;
      lbl.textContent = '這個圖片的英文是？';
    } else {
      prompt.textContent = q.prompt;
      lbl.textContent = '選出正確的英文單字';
    }
    document.querySelectorAll('.btn-answer').forEach((btn, i) => {
      btn.textContent = q.options[i];
      btn.className = 'btn-answer';
      btn.disabled = false;
    });
  },
  renderBattleCounters() {
    const b = STATE.battle;
    const prog = STATE.levelProgress[b.levelKey];
    document.getElementById('attack-target').textContent = b.attackTarget;
    const echoEl = document.getElementById('attack-target-echo');
    if (echoEl) echoEl.textContent = b.attackTarget;
    document.getElementById('q-current').textContent = b.correctInBattle;
    document.getElementById('win-count').textContent  = prog.winCount;
  },
  renderHomeLevelCards() {
    const container = document.getElementById('level-cards');
    container.innerHTML = '';
    for (let lv = 1; lv <= CONFIG.LEVELS; lv++) {
      const key  = String(lv);
      const data = LEVEL_DATA[lv];
      const prog = STATE.levelProgress[key];
      const isLocked  = !prog.unlocked;
      const isNextUp  = prog.unlocked && !STATE.levelProgress[String(lv - 1)]?.unlocked === false;
      const statusIcon = isLocked ? '🔒' : (prog.winCount >= CONFIG.WINS_TO_UNLOCK ? '✅' : '⚔️');
      const progressPct = Math.min(100, (prog.winCount / CONFIG.WINS_TO_UNLOCK) * 100);

      // 寶物小格
      let treasureHtml = '';
      const pool = TREASURE_DATA[lv] || [];
      pool.forEach((emoji, idx) => {
        const collected = prog.treasures.includes(emoji);
        treasureHtml += `<span class="card-treasure ${collected ? 'got' : 'empty'}">${collected ? emoji : '❓'}</span>`;
      });

      const card = document.createElement('div');
      card.className = 'level-card ' + (isLocked ? 'locked' : (prog.winCount >= CONFIG.WINS_TO_UNLOCK ? 'unlocked advanced' : 'unlocked'));
      card.innerHTML = `
        <div class="boss-icon">${data.bossEmoji}</div>
        <div class="level-info">
          <div class="level-name">${data.name}</div>
          <div class="level-progress">${isLocked ? '🔒 尚未解鎖' : `勝：${prog.winCount} 場・${prog.winCount >= CONFIG.WINS_TO_UNLOCK ? '✅ 已解鎖' : `再贏 ${CONFIG.WINS_TO_UNLOCK - prog.winCount} 場解鎖下一關`}`}</div>
          <div class="card-treasures">${treasureHtml}</div>
          ${!isLocked ? `<div class="progress-bar-mini"><div class="progress-bar-mini-fill" style="width:${progressPct}%"></div></div>` : ''}
        </div>
        <div class="level-status">${statusIcon}</div>
      `;
      if (!isLocked) card.addEventListener('click', () => GameController.startBattle(key));
      container.appendChild(card);
    }
    // 大魔王卡片
    const bossProg = STATE.levelProgress['boss'];
    const bossCard = document.createElement('div');
    bossCard.className = 'level-card boss-card ' + (bossProg.unlocked ? 'unlocked' : 'locked');
    bossCard.innerHTML = `
      <div class="boss-icon">🔥</div>
      <div class="level-info">
        <div class="level-name" style="color:var(--gold)">究極魔獸 — 終極之戰</div>
        <div class="level-progress">${bossProg.unlocked ? `勝：${bossProg.winCount} 場` : '🔒 通關全部10關後解鎖'}</div>
        <div class="card-treasures">${TreasureEngine.hasCrown() ? '👑' : (bossProg.unlocked ? '❓' : '')}</div>
      </div>
      <div class="level-status">${TreasureEngine.hasCrown() ? '👑' : (bossProg.unlocked ? '⚔️' : '🔒')}</div>
    `;
    if (bossProg.unlocked) bossCard.addEventListener('click', () => GameController.startBattle('boss'));
    container.appendChild(bossCard);
  },
  renderHomeTitle() {
    const el = document.getElementById('home-title-text');
    el.textContent = STATE.displayTitle || (STATE.titlesEarned.length > 0 ? STATE.titlesEarned[STATE.titlesEarned.length - 1] : '——');
  },
  renderTreasury() {
    const container = document.getElementById('treasury-levels');
    container.innerHTML = '';
    let total = TreasureEngine.totalCollected();
    document.getElementById('total-collected').textContent = total;
    document.getElementById('total-max').textContent = '81';

    for (let lv = 1; lv <= CONFIG.LEVELS; lv++) {
      const key  = String(lv);
      const data = LEVEL_DATA[lv];
      const prog = STATE.levelProgress[key];
      const pool = TREASURE_DATA[lv];
      const names = TREASURE_NAMES[lv];

      const section = document.createElement('div');
      section.className = 'treasury-section';
      let gridHtml = '';
      pool.forEach((emoji, idx) => {
        const collected = prog.treasures.includes(emoji);
        gridHtml += `
          <div class="treasure-slot ${collected ? 'collected' : 'empty'}">
            <span class="ts-emoji">${collected ? emoji : '❓'}</span>
            <span class="ts-name">${collected ? names[idx] : '???'}</span>
          </div>`;
      });
      section.innerHTML = `
        <div class="treasury-level-header">
          <span>${data.bossEmoji}</span>
          <span>${data.name}</span>
          <span class="tl-count">${prog.treasures.length}/${pool.length}</span>
        </div>
        <div class="treasury-grid">${gridHtml}</div>
      `;
      container.appendChild(section);
    }

    // 王冠
    const hasCrown = TreasureEngine.hasCrown();
    const crownSlot = document.getElementById('crown-slot');
    crownSlot.className = 'crown-slot' + (hasCrown ? ' collected' : '');
    crownSlot.innerHTML = hasCrown
      ? `<span class="crown-icon">👑</span><span class="crown-name">英語王冠</span>`
      : `<span class="crown-icon" style="filter:grayscale(1) opacity(0.4)">❓</span><span class="crown-name" style="color:#555">???</span>`;
  },
};

// ===== ScreenManager =====
const ScreenManager = {
  show(name) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const el = document.getElementById('screen-' + name);
    if (el) el.classList.add('active');
  },
  showResult(won, stats) {
    document.getElementById('result-icon').textContent = won ? '🎉' : '💔';
    const title = document.getElementById('result-title');
    title.textContent = won ? '戰鬥勝利！' : '戰鬥失敗...';
    title.className = 'result-title ' + (won ? 'win' : 'lose');
    document.getElementById('result-stats').innerHTML = stats;
    this.show('result');
  },
  showLevelUp(levelKey) {
    const data = levelKey === 'boss' ? FINAL_BOSS : LEVEL_DATA[Number(levelKey)];
    document.getElementById('levelup-title-text').textContent = data.title;
    document.getElementById('levelup-subtitle').textContent = `等級 ${levelKey === 'boss' ? '終關' : levelKey} 完成！`;
    const nextLv = levelKey === 'boss' ? null : (Number(levelKey) < 10 ? String(Number(levelKey) + 1) : 'boss');
    if (nextLv) {
      const nextData = nextLv === 'boss' ? FINAL_BOSS : LEVEL_DATA[Number(nextLv)];
      document.getElementById('levelup-next-boss').textContent = nextData.bossEmoji;
      document.getElementById('levelup-next-label').textContent = `下一個挑戰：${nextData.name}`;
    } else {
      document.getElementById('levelup-next-boss').textContent = '🏆';
      document.getElementById('levelup-next-label').textContent = '全部挑戰已完成！';
    }
    this.show('levelup');
    AnimationEngine.spawnParticles();
  },
  showGameComplete() {
    const list = document.getElementById('all-titles-list');
    list.innerHTML = '';
    STATE.titlesEarned.forEach(t => {
      const item = document.createElement('div');
      item.className = 'earned-title-item';
      item.textContent = '🏅 ' + t;
      list.appendChild(item);
    });
    this.show('gamecomplete');
    AnimationEngine.spawnParticles();
    setTimeout(AnimationEngine.spawnParticles, 900);
  },
};

// ===== GameController =====
const GameController = {
  init() {
    StorageManager.load();
    UIRenderer.renderHomeLevelCards();
    UIRenderer.renderHomeTitle();
    this.bindEvents();
    ScreenManager.show('home');
  },
  bindEvents() {
    document.getElementById('btn-back-home').addEventListener('click', () => {
      if (STATE.battle.active) {
        if (confirm('確定要回首頁嗎？本場進度將不計算。')) {
          STATE.battle.active = false;
          UIRenderer.renderHomeLevelCards();
          UIRenderer.renderHomeTitle();
          ScreenManager.show('home');
        }
      } else {
        UIRenderer.renderHomeLevelCards();
        UIRenderer.renderHomeTitle();
        ScreenManager.show('home');
      }
    });
    document.getElementById('btn-reset').addEventListener('click', () => {
      if (confirm('確定要重置所有進度？這將無法復原。')) {
        StorageManager.reset();
        UIRenderer.renderHomeLevelCards();
        UIRenderer.renderHomeTitle();
        ScreenManager.show('home');
      }
    });
    document.getElementById('btn-open-treasury').addEventListener('click', () => {
      UIRenderer.renderTreasury();
      ScreenManager.show('treasury');
    });
    document.getElementById('btn-back-from-treasury').addEventListener('click', () => {
      ScreenManager.show('home');
    });
    document.querySelectorAll('.btn-answer').forEach(btn => {
      btn.addEventListener('click', () => {
        if (STATE.battle.locked) return;
        this.handleAnswer(btn.textContent);
      });
    });
    document.getElementById('btn-result-continue').addEventListener('click', () => this.onResultContinue());
    document.getElementById('btn-levelup-continue').addEventListener('click', () => {
      UIRenderer.renderHomeLevelCards();
      UIRenderer.renderHomeTitle();
      ScreenManager.show('home');
    });
    document.getElementById('btn-play-again').addEventListener('click', () => {
      StorageManager.reset();
      UIRenderer.renderHomeLevelCards();
      UIRenderer.renderHomeTitle();
      ScreenManager.show('home');
    });
  },
  startBattle(levelKey) {
    const b = STATE.battle;
    b.active = true;
    b.levelKey = levelKey;
    b.wrongInBattle = 0;
    b.correctInBattle = 0;
    b.playerHp = CONFIG.PLAYER_HP;
    b.locked = false;
    b._resultHandled = false;
    b.attackTarget = levelKey === 'boss' ? CONFIG.BOSS_ATTACK_TARGET : CONFIG.NORMAL_ATTACK_TARGET;
    b.bossHp = CONFIG.BOSS_MAX_HP;
    b.currentQ = 0;

    // 決定題目：有儲存的失敗題目就用那些，否則重新抽
    const saved = STATE.savedQuestions[levelKey];
    if (saved && saved.length > 0) {
      b.questions = WordEngine.reconstructQuestions(saved);
    } else {
      // 生成足夠的題目（目標 + 2 的緩衝）
      const count = Math.min(b.attackTarget + 2, 15);
      b.questions = WordEngine.buildQuestions(levelKey, count);
    }

    CharacterRenderer.renderPlayer(levelKey);
    CharacterRenderer.renderBoss(levelKey);
    UIRenderer.renderHearts(b.playerHp, CONFIG.PLAYER_HP);
    UIRenderer.renderBossHp(b.attackTarget, b.attackTarget);
    UIRenderer.renderBattleCounters();
    UIRenderer.renderQuestion(b.questions[0], 0, b.questions.length);
    ScreenManager.show('battle');
  },
  handleAnswer(chosen) {
    const b = STATE.battle;
    if (!b.active || b.locked) return;
    const q = b.questions[b.currentQ];
    const isCorrect = chosen === q.correct;

    document.querySelectorAll('.btn-answer').forEach(btn => {
      if (btn.textContent === q.correct) btn.classList.add('correct');
      else if (btn.textContent === chosen && !isCorrect) btn.classList.add('wrong');
      btn.disabled = true;
    });

    if (isCorrect) {
      const { amount, isCrit } = BattleEngine.onCorrect();
      AnimationEngine.slashEffect(isCrit);
      AnimationEngine.spawnFloatingDamage(amount, isCrit);
      AnimationEngine.bossHit();
    } else {
      BattleEngine.onWrong();
      AnimationEngine.playerHit();
    }
    UIRenderer.renderHearts(b.playerHp, CONFIG.PLAYER_HP);
    UIRenderer.renderBossHp(b.attackTarget - b.correctInBattle, b.attackTarget);

    b.locked = true;
    setTimeout(() => { b.locked = false; this.nextQuestion(); }, CONFIG.ANSWER_LOCK_MS);
  },
  nextQuestion() {
    const b = STATE.battle;
    const result = BattleEngine.checkResult();
    if (result !== 'ongoing') { this.endBattle(result === 'win'); return; }
    b.currentQ++;
    if (b.currentQ >= b.questions.length) { this.endBattle(false); return; }
    UIRenderer.renderQuestion(b.questions[b.currentQ], b.currentQ, b.questions.length);
    UIRenderer.renderBattleCounters();
  },
  endBattle(won) {
    if (STATE.battle._resultHandled) return;
    STATE.battle._resultHandled = true;
    STATE.battle.active = false;
    const b = STATE.battle;
    const lk = b.levelKey;

    if (won) {
      BattleEngine.onWin(lk);
    } else {
      BattleEngine.onFail(lk);
    }
    UIRenderer.renderBattleCounters();

    const prog = STATE.levelProgress[lk];
    const isNewlyUnlocked = won && prog.winCount === CONFIG.WINS_TO_UNLOCK;
    const isBossKilled = won && lk === 'boss';

    const stats = won
      ? `答對 ${b.correctInBattle} 題・答錯 ${b.wrongInBattle} 題<br>${isNewlyUnlocked ? '🎊 解鎖下一等級！' : `累計勝場：${prog.winCount}`}`
      : `答對 ${b.correctInBattle} 題・答錯 ${b.wrongInBattle} 題<br>下次進來還是這組題目，繼續加油！`;

    const btn = document.getElementById('btn-result-continue');
    if (isBossKilled) btn.textContent = '獲得王冠！';
    else if (isNewlyUnlocked) btn.textContent = '獲得頭銜！';
    else btn.textContent = won ? '繼續挑戰' : '再試一次';

    if (won) AnimationEngine.spawnParticles();
    ScreenManager.showResult(won, stats);
  },
  onResultContinue() {
    const lk = STATE.battle.levelKey;
    const prog = STATE.levelProgress[lk];
    const isNewlyUnlocked = prog.winCount === CONFIG.WINS_TO_UNLOCK;
    const isBossKilled = lk === 'boss' && TreasureEngine.hasCrown();

    if (isBossKilled && prog.winCount === 1) {
      // 第一次打倒大魔王，顯示升等畫面
      this._awardTitle(lk);
      ScreenManager.showLevelUp(lk);
    } else if (isNewlyUnlocked && lk !== 'boss') {
      this._awardTitle(lk);
      ScreenManager.showLevelUp(lk);
    } else {
      UIRenderer.renderHomeLevelCards();
      UIRenderer.renderHomeTitle();
      ScreenManager.show('home');
    }
  },
  _awardTitle(levelKey) {
    const data = levelKey === 'boss' ? FINAL_BOSS : LEVEL_DATA[Number(levelKey)];
    if (!STATE.titlesEarned.includes(data.title)) {
      STATE.titlesEarned.push(data.title);
      STATE.displayTitle = data.title;
      StorageManager.save();
    }
  },
};

document.addEventListener('DOMContentLoaded', () => GameController.init());
