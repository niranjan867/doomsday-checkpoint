const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const masterPath = path.join(__dirname, '..', 'data', 'master_dataset.json');
if (!fs.existsSync(masterPath)) {
  console.error('ERROR: master_dataset.json not found at', masterPath);
  process.exit(1);
}

const fileBuffer = fs.readFileSync(masterPath);
const sha256 = crypto.createHash('sha256').update(fileBuffer).digest('hex');
const raw = JSON.parse(fileBuffer.toString('utf8'));
const masterData = Array.isArray(raw) ? raw : (raw.master_watchlist || []);

console.log('====================================================');
console.log('DOOMSDAY CHECKPOINT — MASTER DATA FORENSIC AUDIT');
console.log('====================================================');
console.log(`SHA-256 Hash: ${sha256}`);
console.log('----------------------------------------------------');

let errors = 0;

// 1. Total entities count
const totalEntities = masterData.length;
console.log(`1. Total Entities: ${totalEntities} (Expected: 86)`);
if (totalEntities !== 86) {
  console.error(`   FAIL: Expected 86 entities, found ${totalEntities}`);
  errors++;
}

// 2. Canonical vs Article-Only
const canonicalItems = masterData.filter(i => typeof i.order === 'number' && i.order !== null);
const articleOnlyItems = masterData.filter(i => i.order === null || i.order === undefined);

console.log(`2. Canonical Checkpoints: ${canonicalItems.length} (Expected: 72)`);
if (canonicalItems.length !== 72) {
  console.error(`   FAIL: Expected 72 canonical checkpoints, found ${canonicalItems.length}`);
  errors++;
}

console.log(`3. Article-Only Entities: ${articleOnlyItems.length} (Expected: 14)`);
if (articleOnlyItems.length !== 14) {
  console.error(`   FAIL: Expected 14 article-only entities, found ${articleOnlyItems.length}`);
  errors++;
}

// 3. Format Breakdown of Canonical Items
const canonicalMovies = canonicalItems.filter(i => i.type === 'Movie');
const canonicalTV = canonicalItems.filter(i => i.type === 'TV Show');
const canonicalSpecials = canonicalItems.filter(i => i.type === 'Special');

console.log(`4. Canonical Movies: ${canonicalMovies.length} (Expected: 49)`);
if (canonicalMovies.length !== 49) {
  console.error(`   FAIL: Expected 49 movies, found ${canonicalMovies.length}`);
  errors++;
}

console.log(`5. Canonical TV Shows: ${canonicalTV.length} (Expected: 11)`);
if (canonicalTV.length !== 11) {
  console.error(`   FAIL: Expected 11 TV checkpoints, found ${canonicalTV.length}`);
  errors++;
}

console.log(`6. Canonical Specials: ${canonicalSpecials.length} (Expected: 12)`);
if (canonicalSpecials.length !== 12) {
  console.error(`   FAIL: Expected 12 specials, found ${canonicalSpecials.length}`);
  errors++;
}

// 4. Sequence Continuity 1..72
const orders = canonicalItems.map(i => i.order).sort((a, b) => a - b);
let sequenceValid = true;
for (let i = 0; i < 72; i++) {
  if (orders[i] !== i + 1) {
    console.error(`   FAIL: Sequence mismatch at index ${i}: expected ${i + 1}, found ${orders[i]}`);
    sequenceValid = false;
    errors++;
  }
}
console.log(`7. Sequence Continuity (1..72): ${sequenceValid ? 'PASS' : 'FAIL'}`);

// 5. Stop Points
const stopPoints = canonicalItems.filter(i => i.stop_point && i.stop_point.enabled);
console.log(`8. Canonical Stop Points: ${stopPoints.length} (Expected: 7)`);
if (stopPoints.length !== 7) {
  console.error(`   FAIL: Expected 7 stop points, found ${stopPoints.length}`);
  errors++;
}

// 6. Doomsday Connections
const canonicalDoomsday = canonicalItems.filter(i => i.doomsday && i.doomsday.confidence);
const totalDoomsday = masterData.filter(i => i.doomsday && i.doomsday.confidence);

console.log(`9. Canonical Doomsday Connections: ${canonicalDoomsday.length} (Expected: 49)`);
if (canonicalDoomsday.length !== 49) {
  console.error(`   FAIL: Expected 49 canonical Doomsday connections, found ${canonicalDoomsday.length}`);
  errors++;
}

console.log(`10. Total Doomsday Connected Entities: ${totalDoomsday.length} (Expected: 63)`);
if (totalDoomsday.length !== 63) {
  console.error(`   FAIL: Expected 63 total Doomsday connected entities, found ${totalDoomsday.length}`);
  errors++;
}

// Confidence breakdown
const confirmed = canonicalDoomsday.filter(i => i.doomsday.confidence === 'confirmed').length;
const established = canonicalDoomsday.filter(i => i.doomsday.confidence === 'established').length;
const relevant = canonicalDoomsday.filter(i => i.doomsday.confidence === 'relevant').length;

console.log(`   - Confirmed: ${confirmed} (Expected: 18)`);
console.log(`   - Established: ${established} (Expected: 25 canonical, 37 total)`);
console.log(`   - Relevant: ${relevant} (Expected: 6 canonical, 8 total)`);

// 7. Side Quests Definition File
const watchOrderPath = path.join(__dirname, '..', 'data', 'watch_order_metadata.json');
if (fs.existsSync(watchOrderPath)) {
  const watchOrderData = JSON.parse(fs.readFileSync(watchOrderPath, 'utf8'));
  const sideQuestsCount = (watchOrderData.side_quests || []).length;
  console.log(`11. Side Quest Definitions: ${sideQuestsCount} (Expected: 3)`);
  if (sideQuestsCount !== 3) {
    console.error(`   FAIL: Expected 3 side quests, found ${sideQuestsCount}`);
    errors++;
  }
}

// 8. Spoilers Check
const spoilerEntities = masterData.filter(i => i.doomsday && i.doomsday.spoiler && i.doomsday.spoiler.contains_spoiler);
console.log(`12. Gated Spoiler Entities: ${spoilerEntities.length} (Expected: 63)`);
if (spoilerEntities.length !== 63) {
  console.error(`   FAIL: Expected 63 spoiler entities, found ${spoilerEntities.length}`);
  errors++;
}

console.log('====================================================');
if (errors === 0) {
  console.log('AUDIT RESULT: 100% PASSED — ALL INVARIANTS VERIFIED');
  process.exit(0);
} else {
  console.error(`AUDIT RESULT: FAILED WITH ${errors} ERROR(S)`);
  process.exit(1);
}
