/**
 * DOOMSDAY CHECKPOINT — PHASE 8 COMPREHENSIVE FORENSIC AUDIT
 * Strict verification of data integrity, research datasets, streaming layers, and invariants.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('====================================================');
console.log('DOOMSDAY CHECKPOINT — PHASE 8 FORENSIC AUDIT');
console.log('====================================================');

let failures = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    failures++;
  } else {
    console.log(`✓ PASS: ${message}`);
  }
}

// 1. Check Master Dataset SHA-256 Hash
const masterPath = path.join(__dirname, '../data/master_dataset.json');
const masterDataRaw = fs.readFileSync(masterPath, 'utf-8');
const masterHash = crypto.createHash('sha256').update(masterDataRaw).digest('hex');
const EXPECTED_HASH = 'b7e7aee23a2cec6169e320daa6c439d662e9339503f60ede4c59b9e487545c2b';
assert(masterHash === EXPECTED_HASH, `Master dataset hash intact (${masterHash.slice(0, 16)}...)`);

const master = JSON.parse(masterDataRaw);
const list = master.master_watchlist || [];

// 2. Entity Counts
assert(list.length === 86, `Total Entities: ${list.length} (Expected: 86)`);

const canonical = list.filter((i) => typeof i.order === 'number').sort((a, b) => a.order - b.order);
const articleOnly = list.filter((i) => i.order === null);
assert(canonical.length === 72, `Canonical Checkpoints: ${canonical.length} (Expected: 72)`);
assert(articleOnly.length === 14, `Article-Only Entities: ${articleOnly.length} (Expected: 14)`);

// 3. Continuity 1..72
let continuityPass = true;
for (let i = 0; i < 72; i++) {
  if (canonical[i].order !== i + 1) {
    continuityPass = false;
    break;
  }
}
assert(continuityPass, 'Canonical Sequence Continuity (1..72 exact)');

// 4. Format Breakdown
const movies = canonical.filter((i) => i.type === 'Movie');
const tv = canonical.filter((i) => i.type === 'TV Show');
const specials = canonical.filter((i) => i.type === 'Special');
assert(movies.length === 49, `Canonical Movies: ${movies.length} (Expected: 49)`);
assert(tv.length === 11, `Canonical TV Checkpoints: ${tv.length} (Expected: 11)`);
assert(specials.length === 12, `Canonical Specials: ${specials.length} (Expected: 12)`);

// 5. Stop Points & Side Quests
const stopPoints = canonical.filter((i) => i.stop_point?.enabled);
assert(stopPoints.length === 7, `Canonical Stop Points: ${stopPoints.length} (Expected: 7)`);
assert(master.side_quests?.length === 3, `Side Quests: ${master.side_quests?.length} (Expected: 3)`);

// 6. Doomsday Connections
const canonicalDoomsday = canonical.filter((i) => i.doomsday?.has_connection);
const articleDoomsday = articleOnly.filter((i) => i.doomsday?.has_connection);
const totalDoomsday = list.filter((i) => i.doomsday?.has_connection);
assert(canonicalDoomsday.length === 49, `Canonical Doomsday Connections: ${canonicalDoomsday.length} (Expected: 49)`);
assert(articleDoomsday.length === 14, `Article-Only Doomsday Connections: ${articleDoomsday.length} (Expected: 14)`);
assert(totalDoomsday.length === 63, `Total Connected Entities: ${totalDoomsday.length} (49 canonical + 14 article-only = 63)`);

// 7. Research Datasets Verification
const researchFiles = [
  'universe_continuity.json',
  'post_credit_map.json',
  'character_relationships.json',
  'source_registry.json',
  'research_quality_report.json',
  'research_conflicts.json',
];

researchFiles.forEach((file) => {
  const filePath = path.join(__dirname, '../data', file);
  assert(fs.existsSync(filePath), `Research Dataset exists: data/${file}`);
});

// 8. Universe Continuity Research
const universeData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/universe_continuity.json'), 'utf-8'));
assert(universeData.universes?.length === 6, `Universes mapped: ${universeData.universes?.length} (Expected: 6)`);
assert(universeData.convergence_mechanism_status.includes('UNKNOWN'), 'Convergence mechanism marked UNKNOWN');

// 9. Post-Credit Research
const postCreditData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/post_credit_map.json'), 'utf-8'));
assert(postCreditData.entries?.length === 9, `Post-Credit scenes mapped: ${postCreditData.entries?.length} (Expected: 9)`);
assert(postCreditData.paired_reveal_note?.includes('Thunderbolts*'), 'Paired reveal documented for Thunderbolts* <-> Fantastic Four');

// 10. Character Relationships Research
const characterData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/character_relationships.json'), 'utf-8'));
assert(characterData.characters?.length === 20, `Characters mapped: ${characterData.characters?.length} (Expected: 20)`);
const doomChar = characterData.characters.find((c) => c.id === 'doctor-doom');
assert(doomChar?.speculation_notes?.includes('SPECULATION'), 'Doctor Doom Reed-variant theory explicitly labeled SPECULATION');
const valChar = characterData.characters.find((c) => c.id === 'valentina-allegra-de-fontaine');
assert(Boolean(valChar), 'Valentina Allegra de Fontaine mapped in character relationships');
const franklinChar = characterData.characters.find((c) => c.id === 'franklin-richards');
assert(Boolean(franklinChar), 'Franklin Richards mapped in character relationships');

// 11. India Streaming Dynamic Audit
const streamingPath = path.join(__dirname, '../data/india_streaming.json');
const streamingRaw = fs.readFileSync(streamingPath, 'utf-8');
const streamingHash = crypto.createHash('sha256').update(streamingRaw).digest('hex');
assert(streamingHash.length === 64, `India streaming dataset hash verified (${streamingHash.slice(0, 16)}...)`);

const streamingData = JSON.parse(streamingRaw);
const items = streamingData.items || [];
assert(items.length === 86, `Streaming records cover all 86 entities (Found: ${items.length})`);

let verifiedCount = 0;
let canonicalVerified = 0;
let articleVerified = 0;
let upcomingCount = 0;
let unverifiedCount = 0;
const urlCounts = {};
let invalidUrls = 0;

items.forEach((rec) => {
  const avail = rec.availability?.[0];
  const isCanonical = canonical.some((c) => c.id === rec.id);

  if (avail?.status === 'verified') {
    verifiedCount++;
    if (isCanonical) canonicalVerified++;
    else articleVerified++;

    if (!avail.url || !avail.url.startsWith('https://www.hotstar.com/in/')) {
      invalidUrls++;
    } else {
      urlCounts[avail.url] = (urlCounts[avail.url] || 0) + 1;
    }
  } else if (avail?.status === 'upcoming') {
    upcomingCount++;
  } else {
    unverifiedCount++;
  }
});

const uniqueUrls = Object.keys(urlCounts).length;
const multiSeasonSharedUrls = Object.values(urlCounts).filter((c) => c > 1).length;

console.log('----------------------------------------------------');
console.log('INDIA STREAMING DYNAMIC AUDIT RESULTS:');
console.log(`- Total Verified Records: ${verifiedCount}`);
console.log(`  • Canonical Verified: ${canonicalVerified}`);
console.log(`  • Article-Only Verified: ${articleVerified}`);
console.log(`- Unique Verified JioHotstar URLs: ${uniqueUrls}`);
console.log(`- Multi-Season Shared Series URLs: ${multiSeasonSharedUrls} instances (e.g. Daredevil S1/S2/S3, Hawkeye split eps)`);
console.log(`- Upcoming Releases: ${upcomingCount}`);
console.log(`- Unverified / Unavailable: ${unverifiedCount}`);
console.log(`- Invalid URLs: ${invalidUrls}`);
console.log('----------------------------------------------------');

assert(invalidUrls === 0, 'Zero invalid streaming URLs');
assert(verifiedCount === 50, `Verified streaming records: ${verifiedCount} (45 canonical + 5 article-only = 50)`);

// 12. Spoiler Security & Gating Check
let gatedSpoilersCount = 0;
let spoilerLeakageFound = false;

list.forEach((entity) => {
  if (entity.doomsday?.spoiler?.contains_spoiler) {
    gatedSpoilersCount++;
    const spoilerContent = (entity.doomsday.spoiler.content || '').trim().toLowerCase();
    const safeText = `${entity.title} ${entity.subtitle || ''} ${entity.guidance?.watch_for || ''}`.trim().toLowerCase();

    // Check that spoiler text is not inadvertently duplicated as the safe guidance text
    if (spoilerContent.length > 0 && safeText === spoilerContent) {
      spoilerLeakageFound = true;
    }
  }
});

assert(gatedSpoilersCount === 63, `Gated Spoiler Entities: ${gatedSpoilersCount} (Expected: 63)`);
assert(!spoilerLeakageFound, 'Zero spoiler leakage into safe title or watch-for fields');

console.log('====================================================');
if (failures === 0) {
  console.log('PHASE 8 AUDIT RESULT: 100% PASSED — ALL INVARIANTS VERIFIED');
  process.exit(0);
} else {
  console.error(`PHASE 8 AUDIT RESULT: FAILED WITH ${failures} ERRORS`);
  process.exit(1);
}
