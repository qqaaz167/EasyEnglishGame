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

const LEVEL_DATA_VOL2 = [
  null,
  { name: 'LV1 — 暗黑入門森林', boss: '暗黑青蛙魔',   bossEmoji: '🐸', bossAura: '🌑 🌑', bossWeapon: '☠️ ☠️', title: '暗影劍士' },
  { name: 'LV2 — 暗黑水果谷地', boss: '暗黑狡猾狐',   bossEmoji: '🦊', bossAura: '🌑 🌑', bossWeapon: '☠️ ☠️', title: '暗銅勇者' },
  { name: 'LV3 — 暗黑物品迷城', boss: '暗黑蠍子將軍', bossEmoji: '🦂', bossAura: '🌑 🛡️', bossWeapon: '☠️ ☠️', title: '暗鐵騎士' },
  { name: 'LV4 — 暗黑衣物城堡', boss: '暗黑冰狼王',   bossEmoji: '🐺', bossAura: '🌑 ❄️', bossWeapon: '☠️ ☠️', title: '暗黑詞彙士' },
  { name: 'LV5 — 暗黑學院廢墟', boss: '暗黑黑鷹將',   bossEmoji: '🦅', bossAura: '🌑 🌪️', bossWeapon: '☠️ ☠️', title: '暗黑法徒' },
  { name: 'LV6 — 暗黑颱風海域', boss: '暗黑深海鯊',   bossEmoji: '🦈', bossAura: '🌑 🌀', bossWeapon: '☠️ ☠️', title: '暗黑法師' },
  { name: 'LV7 — 暗黑競技場',   boss: '暗黑獅王',     bossEmoji: '🦁', bossAura: '🌑 🔥', bossWeapon: '☠️ ☠️', title: '暗黑風騎' },
  { name: 'LV8 — 暗黑時間迷宮', boss: '暗黑蝙蝠魔',   bossEmoji: '🦇', bossAura: '🌑 🌑', bossWeapon: '☠️ ☠️', title: '暗黑聖光' },
  { name: 'LV9 — 暗黑智慧神廟', boss: '暗黑古龍',     bossEmoji: '🐉', bossAura: '🌑 🔥', bossWeapon: '☠️ ☠️', title: '暗黑英雄' },
  { name: 'LV10 — 暗黑星際要塞', boss: '暗黑魔將',    bossEmoji: '👾', bossAura: '🌑 ⚡', bossWeapon: '☠️ ☠️', title: '暗黑星帝' },
];
const FINAL_BOSS_VOL2 = {
  name: '暗黑究極魔獸', bossEmoji: '🔥', bossAura: '🌑 👾',
  bossWeapon: '☠️ 🌑', title: '救世主', isFinalBoss: true,
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

// ===== 第二冊寶物資料（同 emoji，v2_ key 分開追蹤）=====
const TREASURE_DATA_VOL2 = {
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
const TREASURE_NAMES_VOL2 = {
  1:  ['暗銅幣','暗戒指','暗短劍','暗弓箭','暗藥水','暗魔法球','暗寶石','暗護符'],
  2:  ['暗盾牌','暗長劍','暗法杖','暗神珠','暗珠鍊','暗星石','暗聖杯','暗勳章'],
  3:  ['暗骨紋章','暗三叉戟','暗鈴鼓','暗玩偶','暗面具','暗古地圖','暗望遠鏡','暗木偶'],
  4:  ['暗珊瑚','暗磁石','暗煉丹爐','暗絲線','暗魔帳','暗旋渦石','暗藍鑽','暗古鑰'],
  5:  ['暗竹葉','暗草藥','暗蘑菇','暗月石','暗星砂','暗海珠','暗火晶','暗流星'],
  6:  ['暗冰晶','暗風渦','暗閃電石','暗彩虹石','暗花印','暗楓葉','暗熔岩石','暗星雲'],
  7:  ['暗牙印','暗鐵鉤','暗鎖鏈','暗骨鑰','暗符文磚','暗黑鍊','暗陷阱器','暗解鎖符'],
  8:  ['暗靶心石','暗骰子','暗命運牌','暗賭石','暗保齡球','暗遊戲機','暗搖桿','暗花牌'],
  9:  ['暗古城堡','暗高塔印','暗飛碟','暗火箭石','暗地球儀','暗翡翠珠','暗輝石','暗星球石'],
  10: ['暗學士帽','暗金牌','暗冠軍章','暗紀念花','暗絲帶','暗蝴蝶結','暗精靈偶','暗禮盒'],
};
const CROWN_TREASURE_VOL2 = { emoji: '🌑', name: '暗黑英語王冠' };

// ===== STATE =====
function buildDefaultProgress() {
  const p = {};
  for (let i = 1; i <= CONFIG.LEVELS; i++) {
    p[String(i)] = { winCount: 0, treasures: [], unlocked: i === 1 };
  }
  p['boss'] = { winCount: 0, treasures: [], unlocked: false };
  // 第二冊（v2_1 預設解鎖，整個第二冊 tab 由王冠狀態把關）
  for (let i = 1; i <= CONFIG.LEVELS; i++) {
    p[`v2_${i}`] = { winCount: 0, treasures: [], unlocked: i === 1 };
  }
  p['v2_boss'] = { winCount: 0, treasures: [], unlocked: false };
  return p;
}
function buildDefaultSavedQ() {
  const q = {};
  for (let i = 1; i <= CONFIG.LEVELS; i++) q[String(i)] = null;
  q['boss'] = null;
  for (let i = 1; i <= CONFIG.LEVELS; i++) q[`v2_${i}`] = null;
  q['v2_boss'] = null;
  return q;
}

let STATE = {
  levelProgress: buildDefaultProgress(),
  savedQuestions: buildDefaultSavedQ(),
  titlesEarned: [],
  displayTitle: '',
  totalCorrect: 0,
  currentVolume: 1,
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
        currentVolume: STATE.currentVolume,
        saveVersion: 3,
      }));
    } catch(e) {}
  },
  load() {
    try {
      const raw = localStorage.getItem(CONFIG.STORAGE_KEY);
      if (!raw) return;
      const d = JSON.parse(raw);
      // 支援 v2（第一冊舊存檔）和 v3（含第二冊）
      if (d.saveVersion !== 2 && d.saveVersion !== 3) return;
      STATE.levelProgress = d.levelProgress || buildDefaultProgress();
      STATE.savedQuestions = d.savedQuestions || buildDefaultSavedQ();
      STATE.titlesEarned = d.titlesEarned || [];
      STATE.displayTitle = d.displayTitle || '';
      STATE.totalCorrect = d.totalCorrect || 0;
      STATE.currentVolume = d.currentVolume || 1;
      // migration v2→v3：補齊 v2_ keys
      if (d.saveVersion === 2) {
        for (let i = 1; i <= CONFIG.LEVELS; i++) {
          if (!STATE.levelProgress[`v2_${i}`]) STATE.levelProgress[`v2_${i}`] = { winCount: 0, treasures: [], unlocked: i === 1 };
          if (!STATE.savedQuestions[`v2_${i}`]) STATE.savedQuestions[`v2_${i}`] = null;
        }
        if (!STATE.levelProgress['v2_boss']) STATE.levelProgress['v2_boss'] = { winCount: 0, treasures: [], unlocked: false };
        if (!STATE.savedQuestions['v2_boss']) STATE.savedQuestions['v2_boss'] = null;
      }
    } catch(e) {}
  },
  reset() {
    localStorage.removeItem(CONFIG.STORAGE_KEY);
    STATE.levelProgress = buildDefaultProgress();
    STATE.savedQuestions = buildDefaultSavedQ();
    STATE.titlesEarned = [];
    STATE.displayTitle = '';
    STATE.totalCorrect = 0;
    STATE.currentVolume = 1;
  },
};

// ===== WordEngine =====
const WordEngine = {
  getPool(levelKey) {
    const isVol2 = levelKey.startsWith('v2_');
    const words = isVol2 ? WORDS_VOL2 : WORDS;
    if (levelKey === 'boss' || levelKey === 'v2_boss') return words;
    const lv = isVol2 ? Number(levelKey.replace('v2_', '')) : Number(levelKey);
    return words.filter(w => w.level === lv);
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
    STATE.savedQuestions[levelKey] = null;
    TreasureEngine.award(levelKey);
    // 解鎖下一關
    const isVol2 = levelKey.startsWith('v2_');
    if (levelKey !== 'boss' && levelKey !== 'v2_boss') {
      if (prog.winCount >= CONFIG.WINS_TO_UNLOCK) {
        if (isVol2) {
          const lv = Number(levelKey.replace('v2_', ''));
          const nextKey = lv < CONFIG.LEVELS ? `v2_${lv + 1}` : 'v2_boss';
          if (STATE.levelProgress[nextKey]) STATE.levelProgress[nextKey].unlocked = true;
        } else {
          const nextKey = String(Number(levelKey) + 1);
          if (Number(nextKey) <= CONFIG.LEVELS && STATE.levelProgress[nextKey]) {
            STATE.levelProgress[nextKey].unlocked = true;
          } else if (nextKey === String(CONFIG.LEVELS + 1)) {
            STATE.levelProgress['boss'].unlocked = true;
          }
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
    const isVol2 = levelKey.startsWith('v2_');
    if (levelKey === 'boss' || levelKey === 'v2_boss') {
      const prog = STATE.levelProgress[levelKey];
      if (!prog.treasures.includes('crown')) {
        prog.treasures.push('crown');
        const boss = isVol2 ? FINAL_BOSS_VOL2 : FINAL_BOSS;
        STATE.displayTitle = boss.title;
        if (!STATE.titlesEarned.includes(boss.title)) {
          STATE.titlesEarned.push(boss.title);
        }
      }
      return;
    }
    const lv = isVol2 ? Number(levelKey.replace('v2_', '')) : Number(levelKey);
    const prog = STATE.levelProgress[levelKey];
    const pool = (isVol2 ? TREASURE_DATA_VOL2 : TREASURE_DATA)[lv] || [];
    const nextIdx = prog.treasures.length;
    if (nextIdx < pool.length) {
      prog.treasures.push(pool[nextIdx]);
    }
  },
  totalCollected(vol) {
    let n = 0;
    if (!vol || vol === 1) {
      for (let i = 1; i <= CONFIG.LEVELS; i++) {
        n += (STATE.levelProgress[String(i)].treasures || []).length;
      }
      if ((STATE.levelProgress['boss'].treasures || []).includes('crown')) n++;
    } else {
      for (let i = 1; i <= CONFIG.LEVELS; i++) {
        n += (STATE.levelProgress[`v2_${i}`].treasures || []).length;
      }
      if ((STATE.levelProgress['v2_boss'].treasures || []).includes('crown')) n++;
    }
    return n;
  },
  hasCrown()     { return (STATE.levelProgress['boss'].treasures    || []).includes('crown'); },
  hasVol2Crown() { return (STATE.levelProgress['v2_boss'].treasures || []).includes('crown'); },
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
    // 第二冊全程使用最高等
    if (levelKey.startsWith('v2_') || levelKey === 'v2_boss') return PLAYER_STAGES[3];
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
  getLevelData(levelKey) {
    if (levelKey === 'v2_boss') return FINAL_BOSS_VOL2;
    if (levelKey === 'boss')    return FINAL_BOSS;
    if (levelKey.startsWith('v2_')) return LEVEL_DATA_VOL2[Number(levelKey.replace('v2_', ''))];
    return LEVEL_DATA[Number(levelKey)];
  },
  renderBoss(levelKey) {
    const data = this.getLevelData(levelKey);
    const sprite = document.getElementById('boss-sprite');
    const nameEl = document.getElementById('boss-name');
    const isVol2 = levelKey.startsWith('v2_');
    const cssKey = (levelKey === 'boss' || levelKey === 'v2_boss') ? 'boss' : (isVol2 ? levelKey.replace('v2_', '') : levelKey);
    sprite.className = 'boss-sprite level-' + cssKey;
    sprite.innerHTML = `
      <div class="bv-aura">${data.bossAura}</div>
      <div class="bv-main">${data.bossEmoji}</div>
      <div class="bv-weapons">${data.bossWeapon}</div>
    `;
    nameEl.textContent = data.name;
    const titleBar = document.getElementById('boss-title-bar');
    if (titleBar) titleBar.textContent = data.boss || data.name;
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
  renderQuestion(q, idx) {
    document.getElementById('question-progress').textContent = `第 ${idx + 1} 題`;
    const prompt = document.getElementById('question-prompt');
    const lbl    = document.getElementById('question-type-label');
    if (q.type === 'emoji') {
      prompt.innerHTML = `<span class="question-emoji">${q.prompt}</span>`;
      lbl.textContent = '這個圖片的英文是？';
    } else {
      prompt.textContent = q.prompt;
      lbl.textContent = '選出正確的英文單字';
    }
    document.getElementById('btn-confirm-wrong').style.display = 'none';
    document.querySelectorAll('.btn-answer').forEach((btn, i) => {
      btn.textContent = q.options[i];
      btn.className = 'btn-answer';
      btn.disabled = false;
      btn.blur();
    });
  },
  renderBattleCounters() {},
  renderHomeLevelCards() {
    const vol = STATE.currentVolume;
    const isVol2 = vol === 2;
    const levelData = isVol2 ? LEVEL_DATA_VOL2 : LEVEL_DATA;
    const treasureData = isVol2 ? TREASURE_DATA_VOL2 : TREASURE_DATA;
    const keyOf = (lv) => isVol2 ? `v2_${lv}` : String(lv);
    const bossKey = isVol2 ? 'v2_boss' : 'boss';
    const bossLabel = isVol2 ? '暗黑究極魔獸 — 終極之戰' : '究極魔獸 — 終極之戰';

    // 更新 tab 狀態
    const tab1 = document.getElementById('tab-vol1');
    const tab2 = document.getElementById('tab-vol2');
    if (tab1) tab1.className = 'vol-tab' + (vol === 1 ? ' active' : '');
    if (tab2) {
      tab2.className = 'vol-tab' + (vol === 2 ? ' active' : '');
      tab2.disabled = !TreasureEngine.hasCrown();
    }

    const container = document.getElementById('level-cards');
    container.innerHTML = '';
    for (let lv = 1; lv <= CONFIG.LEVELS; lv++) {
      const key  = keyOf(lv);
      const data = levelData[lv];
      const prog = STATE.levelProgress[key];
      const isLocked   = !prog.unlocked;
      const statusIcon = isLocked ? '🔒' : (prog.winCount >= CONFIG.WINS_TO_UNLOCK ? '✅' : '⚔️');
      const progressPct = Math.min(100, (prog.winCount / CONFIG.WINS_TO_UNLOCK) * 100);

      let treasureHtml = '';
      const pool = treasureData[lv] || [];
      pool.forEach((emoji) => {
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
    const bossProg = STATE.levelProgress[bossKey];
    const hasCrown = isVol2 ? TreasureEngine.hasVol2Crown() : TreasureEngine.hasCrown();
    const bossCard = document.createElement('div');
    bossCard.className = 'level-card boss-card ' + (bossProg.unlocked ? 'unlocked' : 'locked');
    bossCard.innerHTML = `
      <div class="boss-icon">🔥</div>
      <div class="level-info">
        <div class="level-name" style="color:var(--gold)">${bossLabel}</div>
        <div class="level-progress">${bossProg.unlocked ? `勝：${bossProg.winCount} 場` : `🔒 通關全部10關後解鎖`}</div>
        <div class="card-treasures">${hasCrown ? (isVol2 ? '🌑' : '👑') : (bossProg.unlocked ? '❓' : '')}</div>
      </div>
      <div class="level-status">${hasCrown ? (isVol2 ? '🌑' : '👑') : (bossProg.unlocked ? '⚔️' : '🔒')}</div>
    `;
    if (bossProg.unlocked) bossCard.addEventListener('click', () => GameController.startBattle(bossKey));
    container.appendChild(bossCard);
  },
  renderHomeTitle() {
    const el = document.getElementById('home-title-text');
    el.textContent = STATE.displayTitle || (STATE.titlesEarned.length > 0 ? STATE.titlesEarned[STATE.titlesEarned.length - 1] : '——');
  },
  renderTreasury(vol) {
    const v = vol || STATE.treasuryVol || 1;
    STATE.treasuryVol = v;
    const isVol2 = v === 2;
    const levelData = isVol2 ? LEVEL_DATA_VOL2 : LEVEL_DATA;
    const treasureData = isVol2 ? TREASURE_DATA_VOL2 : TREASURE_DATA;
    const treasureNames = isVol2 ? TREASURE_NAMES_VOL2 : TREASURE_NAMES;
    const keyOf = (lv) => isVol2 ? `v2_${lv}` : String(lv);
    const hasCrown = isVol2 ? TreasureEngine.hasVol2Crown() : TreasureEngine.hasCrown();
    const crownEmoji = isVol2 ? '🌑' : '👑';
    const crownName  = isVol2 ? '暗黑英語王冠' : '英語王冠';

    // 更新圖鑑 tab
    const tt1 = document.getElementById('tt-vol1');
    const tt2 = document.getElementById('tt-vol2');
    if (tt1) tt1.className = 'treasury-tab' + (v === 1 ? ' active' : '');
    if (tt2) {
      tt2.className = 'treasury-tab' + (v === 2 ? ' active' : '');
      tt2.disabled = !TreasureEngine.hasCrown();
    }

    const container = document.getElementById('treasury-levels');
    container.innerHTML = '';
    let total = TreasureEngine.totalCollected(v);
    document.getElementById('total-collected').textContent = total;
    document.getElementById('total-max').textContent = '81';

    for (let lv = 1; lv <= CONFIG.LEVELS; lv++) {
      const key  = keyOf(lv);
      const data = levelData[lv];
      const prog = STATE.levelProgress[key];
      const pool = treasureData[lv];
      const names = treasureNames[lv];

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
    const crownSlot = document.getElementById('crown-slot');
    crownSlot.className = 'crown-slot' + (hasCrown ? ' collected' : '');
    crownSlot.innerHTML = hasCrown
      ? `<span class="crown-icon">${crownEmoji}</span><span class="crown-name">${crownName}</span>`
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
    const isVol2 = levelKey.startsWith('v2_');
    const data = CharacterRenderer.getLevelData(levelKey);
    const isBoss = levelKey === 'boss' || levelKey === 'v2_boss';
    const lvNum = isBoss ? null : (isVol2 ? Number(levelKey.replace('v2_', '')) : Number(levelKey));
    document.getElementById('levelup-title-text').textContent = data.title;
    document.getElementById('levelup-subtitle').textContent = `等級 ${isBoss ? '終關' : levelKey} 完成！`;
    let nextKey = null;
    if (!isBoss) {
      nextKey = lvNum < CONFIG.LEVELS
        ? (isVol2 ? `v2_${lvNum + 1}` : String(lvNum + 1))
        : (isVol2 ? 'v2_boss' : 'boss');
    }
    if (nextKey) {
      const nextData = CharacterRenderer.getLevelData(nextKey);
      document.getElementById('levelup-next-boss').textContent = nextData.bossEmoji;
      document.getElementById('levelup-next-label').textContent = `下一個挑戰：${nextData.name || nextData.boss}`;
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
    // 連點頭銜 7 下：過下一個未完成等級（補滿勝場、解鎖下一關、全寶物、授予稱號）
    let titleClickCount = 0, titleClickTimer = null;
    document.querySelector('.home-title-display').addEventListener('click', () => {
      titleClickCount++;
      clearTimeout(titleClickTimer);
      titleClickTimer = setTimeout(() => { titleClickCount = 0; }, 3000);
      if (titleClickCount >= 7) {
        titleClickCount = 0;
        const vol = STATE.currentVolume;
        const isVol2 = vol === 2;
        const keyOf = (lv) => isVol2 ? `v2_${lv}` : String(lv);
        const bossKey = isVol2 ? 'v2_boss' : 'boss';
        const td = isVol2 ? TREASURE_DATA_VOL2 : TREASURE_DATA;
        const ld = isVol2 ? LEVEL_DATA_VOL2 : LEVEL_DATA;
        const boss = isVol2 ? FINAL_BOSS_VOL2 : FINAL_BOSS;

        // 找第一個尚未完成的普通等級
        let advanced = false;
        for (let i = 1; i <= CONFIG.LEVELS; i++) {
          const key  = keyOf(i);
          const prog = STATE.levelProgress[key];
          if (prog.winCount < CONFIG.WINS_TO_UNLOCK) {
            // 補齊該等級
            prog.unlocked = true;
            prog.winCount = CONFIG.WINS_TO_UNLOCK;
            prog.treasures = [...(td[i] || [])];
            // 授予稱號
            const title = ld[i] && ld[i].title;
            if (title && !STATE.titlesEarned.includes(title)) STATE.titlesEarned.push(title);
            STATE.displayTitle = title || STATE.displayTitle;
            // 解鎖下一關
            if (i < CONFIG.LEVELS) {
              STATE.levelProgress[keyOf(i + 1)].unlocked = true;
            } else {
              STATE.levelProgress[bossKey].unlocked = true;
            }
            advanced = true;
            break;
          }
        }
        // 所有普通等級都完成，改推進大魔王
        if (!advanced) {
          const bossProg = STATE.levelProgress[bossKey];
          if (!bossProg.unlocked || bossProg.winCount < 1) {
            bossProg.unlocked = true;
            bossProg.winCount = Math.max(bossProg.winCount, 1);
            if (!bossProg.treasures.includes('crown')) bossProg.treasures.push('crown');
            if (!STATE.titlesEarned.includes(boss.title)) STATE.titlesEarned.push(boss.title);
            STATE.displayTitle = boss.title;
            advanced = true;
          }
        }
        if (advanced) {
          StorageManager.save();
          UIRenderer.renderHomeLevelCards();
          UIRenderer.renderHomeTitle();
        }
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
      UIRenderer.renderTreasury(STATE.treasuryVol || 1);
      ScreenManager.show('treasury');
    });
    document.getElementById('tab-vol1').addEventListener('click', () => {
      STATE.currentVolume = 1;
      UIRenderer.renderHomeLevelCards();
    });
    document.getElementById('tab-vol2').addEventListener('click', () => {
      if (!TreasureEngine.hasCrown()) return;
      STATE.currentVolume = 2;
      UIRenderer.renderHomeLevelCards();
    });
    document.getElementById('tt-vol1').addEventListener('click', () => UIRenderer.renderTreasury(1));
    document.getElementById('tt-vol2').addEventListener('click', () => {
      if (TreasureEngine.hasCrown()) UIRenderer.renderTreasury(2);
    });
    document.getElementById('btn-back-from-treasury').addEventListener('click', () => {
      ScreenManager.show('home');
    });
    document.querySelectorAll('.btn-answer').forEach(btn => {
      btn.addEventListener('mouseenter', () => { if (!btn.disabled) btn.classList.add('hovered'); });
      btn.addEventListener('mouseleave', () => { btn.classList.remove('hovered'); });
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
    b.attackTarget = (levelKey === 'boss' || levelKey === 'v2_boss') ? CONFIG.BOSS_ATTACK_TARGET : CONFIG.NORMAL_ATTACK_TARGET;
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
    UIRenderer.renderQuestion(b.questions[0], 0);
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
    if (isCorrect) {
      setTimeout(() => { b.locked = false; this.nextQuestion(); }, CONFIG.ANSWER_LOCK_MS);
    } else {
      const confirmBtn = document.getElementById('btn-confirm-wrong');
      confirmBtn.style.display = 'block';
      confirmBtn.onclick = () => {
        confirmBtn.style.display = 'none';
        b.locked = false;
        this.nextQuestion();
      };
    }
  },
  nextQuestion() {
    const b = STATE.battle;
    const result = BattleEngine.checkResult();
    if (result !== 'ongoing') { this.endBattle(result === 'win'); return; }
    b.currentQ++;
    if (b.currentQ >= b.questions.length) { this.endBattle(false); return; }
    UIRenderer.renderQuestion(b.questions[b.currentQ], b.currentQ);
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
    const isBossKilled = won && (lk === 'boss' || lk === 'v2_boss');

    const stats = won
      ? `答對 ${b.correctInBattle} 題・答錯 ${b.wrongInBattle} 題<br>${isNewlyUnlocked ? '🎊 解鎖下一等級！' : `累計勝場：${prog.winCount}`}`
      : `答對 ${b.correctInBattle} 題・答錯 ${b.wrongInBattle} 題<br>下次進來還是這組題目，繼續加油！`;

    const btn = document.getElementById('btn-result-continue');
    if (isBossKilled) btn.textContent = lk === 'v2_boss' ? '獲得暗黑王冠！' : '獲得王冠！';
    else if (isNewlyUnlocked) btn.textContent = '獲得頭銜！';
    else btn.textContent = won ? '繼續挑戰' : '再試一次';

    if (won) AnimationEngine.spawnParticles();
    ScreenManager.showResult(won, stats);
  },
  onResultContinue() {
    const lk = STATE.battle.levelKey;
    const prog = STATE.levelProgress[lk];
    const isNewlyUnlocked = prog.winCount === CONFIG.WINS_TO_UNLOCK;
    const isVol2Boss = lk === 'v2_boss';
    const isBossKilled = (lk === 'boss' && TreasureEngine.hasCrown()) || (isVol2Boss && TreasureEngine.hasVol2Crown());

    if (isBossKilled && prog.winCount === 1) {
      this._awardTitle(lk);
      if (isVol2Boss) {
        // 第二冊大魔王 → 特製完結畫面
        document.querySelector('.complete-title').textContent = '救世主！';
        document.querySelector('.complete-subtitle').textContent = '你消滅了暗黑究極魔獸，成為傳說！';
        ScreenManager.showGameComplete();
      } else {
        ScreenManager.showLevelUp(lk);
      }
    } else if (isNewlyUnlocked && lk !== 'boss' && lk !== 'v2_boss') {
      this._awardTitle(lk);
      ScreenManager.showLevelUp(lk);
    } else {
      UIRenderer.renderHomeLevelCards();
      UIRenderer.renderHomeTitle();
      ScreenManager.show('home');
    }
  },
  _awardTitle(levelKey) {
    const data = CharacterRenderer.getLevelData(levelKey);
    if (!STATE.titlesEarned.includes(data.title)) {
      STATE.titlesEarned.push(data.title);
      STATE.displayTitle = data.title;
      StorageManager.save();
    }
  },
};

document.addEventListener('DOMContentLoaded', () => GameController.init());
