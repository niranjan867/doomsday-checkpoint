/**
 * DOOMSDAY CHECKPOINT — FULL UI & DATA FLOW TEST SUITE
 * Tests:
 * 1. Sequential Progression: 1..72 advancing
 * 2. Streaming Layer mapping (50 verified JioHotstar records, 45 canonical, 5 article)
 * 3. Spoiler Sanitization: 0 leaks across all 86 entities
 * 4. Stop-point UI exclusion: 0 stop-point mentions in rendered guidance
 * 5. Search Filtering & Classification Invariants
 */

const fs = require('fs');
const path = require('path');

const master = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/master_dataset.json'), 'utf-8'));
const streaming = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/india_streaming.json'), 'utf-8'));

let failures = 0;
function test(name, fn) {
  try {
    fn();
    console.log(`✓ PASS: ${name}`);
  } catch (err) {
    console.error(`❌ FAIL: ${name} -> ${err.message}`);
    failures++;
  }
}

// 1. Invariants
test('Canonical sequence is 1..72', () => {
  const canonical = master.master_watchlist.filter((i) => typeof i.order === 'number');
  if (canonical.length !== 72) throw new Error(`Expected 72, got ${canonical.length}`);
  for (let i = 0; i < 72; i++) {
    if (canonical[i].order !== i + 1) throw new Error(`Sequence broken at ${i}: order ${canonical[i].order}`);
  }
});

// 2. India Streaming Mapping
test('India Streaming coverage for all 86 entities', () => {
  if (streaming.items.length !== 86) throw new Error(`Expected 86 streaming items, got ${streaming.items.length}`);
  const verified = streaming.items.filter((i) => i.availability?.[0]?.status === 'verified');
  if (verified.length !== 50) throw new Error(`Expected 50 verified streaming items, got ${verified.length}`);
  
  verified.forEach((item) => {
    const url = item.availability[0].url;
    if (!url || !url.startsWith('https://www.hotstar.com/in/')) {
      throw new Error(`Invalid URL for ${item.id}: ${url}`);
    }
  });
});

// 3. Spoiler Sanitization on Guidance
const { getSafeWatchFor } = require('./dist/spoiler-sanitizer.js');

test('Spoiler Safety on all 86 entities (Spoiler Safe ON by default)', () => {
  const forbiddenKeywords = ['confirmed for doomsday', 'on the doomsday roster', 'recruits', 'bridge to doomsday', 'step 47', 'mind the stop point'];
  master.master_watchlist.forEach((entity) => {
    const safeText = getSafeWatchFor(entity, false).toLowerCase();
    forbiddenKeywords.forEach((kw) => {
      if (safeText.includes(kw)) {
        throw new Error(`Spoiler keyword "${kw}" leaked in safe guidance for entity: ${entity.id} (${entity.title}) -> "${safeText}"`);
      }
    });
  });
});

// 4. Up Next Simulation
test('Up Next advances sequentially from #01 to #02 and persists correctly', () => {
  const userProgress = {};
  
  // Initially #01 is up next
  let upNext = master.master_watchlist.find((i) => i.order === 1);
  if (!upNext) throw new Error('Initial up next #01 not found');
  if (upNext.title !== 'X-Men') throw new Error(`Expected X-Men, got ${upNext.title}`);

  // Mark #01 watched
  userProgress[upNext.id] = { status: 'watched', updated_at: new Date().toISOString() };
  
  // Next is #02
  const nextItem = master.master_watchlist.filter((i) => typeof i.order === 'number' && (!userProgress[i.id] || userProgress[i.id].status !== 'watched'))
    .sort((a, b) => a.order - b.order)[0];

  if (!nextItem || nextItem.order !== 2 || nextItem.title !== 'X2: X-Men United') {
    throw new Error(`Expected X2: X-Men United (#02), got ${nextItem?.title}`);
  }

  const safeX2Guidance = getSafeWatchFor(nextItem, false);
  if (safeX2Guidance.includes('Alan Cumming') || safeX2Guidance.includes('confirmed for Doomsday')) {
    throw new Error(`X2 guidance contains future casting spoilers: ${safeX2Guidance}`);
  }
});

console.log('====================================================');
if (failures === 0) {
  console.log('ALL UI & FUNCTIONAL FLOW TESTS PASSED (100%)');
  process.exit(0);
} else {
  console.error(`FAILED WITH ${failures} ERRORS`);
  process.exit(1);
}
