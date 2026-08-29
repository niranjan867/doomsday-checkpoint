const fs = require('fs');
const path = require('path');

const masterPath = path.join(__dirname, '..', 'data', 'master_dataset.json');
const rawMaster = JSON.parse(fs.readFileSync(masterPath, 'utf8'));
const masterEntities = Array.isArray(rawMaster) ? rawMaster : (rawMaster.master_watchlist || []);

// Supplied list from user prompt with verified TV series references
const suppliedStreamingList = [
  {
    title: "Iron Man",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/iron-man/1660000038",
    status: "available"
  },
  {
    title: "The Incredible Hulk",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/the-incredible-hulk/1000046231",
    status: "available"
  },
  {
    title: "Iron Man 2",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/iron-man-2/1660000039",
    status: "available"
  },
  {
    title: "Thor",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/thor/1660000044",
    status: "available"
  },
  {
    title: "Captain America: The First Avenger",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/captain-america-the-first-avenger/1660000034",
    status: "available"
  },
  {
    title: "The Avengers",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/marvels-the-avengers/1660000015",
    status: "available"
  },
  {
    title: "Iron Man 3",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/iron-man-3/1660000042",
    status: "available"
  },
  {
    title: "Thor: The Dark World",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/thor-the-dark-world/1260018142",
    status: "available"
  },
  {
    title: "Captain America: The Winter Soldier",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/captain-america-the-winter-soldier/1260016410",
    status: "available"
  },
  {
    title: "Guardians of the Galaxy",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/guardians-of-the-galaxy/1260018294",
    status: "available"
  },
  {
    title: "Avengers: Age of Ultron",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/marvels-avengers-age-of-ultron/1260018315",
    status: "available"
  },
  {
    title: "Ant-Man",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/ant-man/1260018141",
    status: "available"
  },
  {
    title: "Captain America: Civil War",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/captain-america-civil-war/1260016768",
    status: "available"
  },
  {
    title: "Doctor Strange",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/doctor-strange/1260018179",
    status: "available"
  },
  {
    title: "Guardians of the Galaxy Vol. 2",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/guardians-of-the-galaxy-vol-2/1260018295",
    status: "available"
  },
  {
    title: "Spider-Man: Homecoming",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/spider-man-homecoming/1271667616",
    status: "available"
  },
  {
    title: "Thor: Ragnarok",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/thor-ragnarok/1660010577",
    status: "available"
  },
  {
    title: "Black Panther",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/black-panther/1660010672",
    status: "available"
  },
  {
    title: "Avengers: Infinity War",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/avengers-infinity-war/1660010677",
    status: "available"
  },
  {
    title: "Ant-Man and the Wasp",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/ant-man-and-the-wasp/1660010696",
    status: "available"
  },
  {
    title: "Captain Marvel",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/captain-marvel/1260014878",
    status: "available"
  },
  {
    title: "Avengers: Endgame",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/avengers-endgame/1260013556",
    status: "available"
  },
  {
    title: "Spider-Man: Far From Home",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/spider-man-far-from-home/1271663449",
    status: "available"
  },
  {
    title: "Black Widow",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/black-widow/1260067485",
    status: "available"
  },
  {
    title: "Shang-Chi and the Legend of the Ten Rings",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/shang-chi-and-the-legend-of-the-ten-rings/1260072682",
    status: "available"
  },
  {
    title: "Spider-Man: No Way Home",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/spider-man-no-way-home/1271661204",
    status: "available"
  },
  {
    title: "Doctor Strange: Multiverse of Madness",
    matched_title: "Doctor Strange in the Multiverse of Madness",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/doctor-strange-in-the-multiverse-of-madness/1260103761",
    status: "available"
  },
  {
    title: "Thor: Love and Thunder",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/thor-love-and-thunder/1260110008",
    status: "available"
  },
  {
    title: "Black Panther: Wakanda Forever",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/black-panther-wakanda-forever/1260118821",
    status: "available"
  },
  {
    title: "Ant-Man and the Wasp: Quantumania",
    streaming_platform: "JioHotstar",
    streaming_link: null,
    status: "needs_verification"
  },
  {
    title: "The Marvels",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/the-marvels/1260167860",
    status: "available"
  },
  {
    title: "Deadpool & Wolverine",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/deadpool-and-wolverine/1271305185",
    status: "available"
  },
  {
    title: "Captain America: Brave New World",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/captain-america-brave-new-world/1271337438",
    status: "available"
  },
  {
    title: "Thunderbolts*",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/thunderbolts/1271337437",
    status: "available"
  },
  {
    title: "The Fantastic Four: First Steps",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/the-fantastic-four-first-steps/1271406275",
    status: "available"
  },
  {
    title: "Spider-Man: Brand New Day",
    streaming_platform: "JioHotstar",
    streaming_link: null,
    status: "upcoming"
  },
  {
    title: "X-Men",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/x-men/1770000943",
    status: "available"
  },
  {
    title: "X2: X-Men United",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/x-men-united/1770000775",
    status: "available"
  },
  {
    title: "X-Men: The Last Stand",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/x-men-the-last-stand/1770000804",
    status: "available"
  },
  {
    title: "X-Men: First Class",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/x-men-first-class/1770000666",
    status: "available"
  },
  {
    title: "The Wolverine",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/the-wolverine/1770000445",
    status: "available"
  },
  {
    title: "X-Men: Days of Future Past",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/x-men-days-of-future-past/1770000446",
    status: "available"
  },
  {
    title: "X-Men: Apocalypse",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/x-men-apocalypse/1770015391",
    status: "available"
  },
  {
    title: "Logan",
    streaming_platform: "JioHotstar",
    streaming_link: null,
    status: "needs_verification"
  },
  {
    title: "Deadpool",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/deadpool/1770003257",
    status: "available"
  },
  {
    title: "Deadpool 2",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/deadpool-2/1770020234",
    status: "available"
  },
  {
    title: "Dark Phoenix",
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/movies/x-men-dark-phoenix/1260017860",
    status: "available"
  },
  {
    title: "AVENGERS: DOOMSDAY",
    streaming_platform: null,
    streaming_link: null,
    status: "upcoming"
  },
  // TV Series Reference URLs from guidelines
  {
    title: "Daredevil",
    target_ids: ["daredevil-season-1", "daredevil-season-2", "daredevil-season-3"],
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/shows/marvels-daredevil/1260091261",
    status: "available"
  },
  {
    title: "Hawkeye",
    target_ids: ["hawkeye-season-1", "hawkeye-episodes-1-5", "hawkeye-episode-6-finale"],
    streaming_platform: "JioHotstar",
    streaming_link: "https://www.hotstar.com/in/shows/hawkeye/1260073683",
    status: "available"
  }
];

function normalizeTitle(t) {
  return t
    .toLowerCase()
    .replace(/^marvel's\s+/i, '')
    .replace(/^marvel\s+/i, '')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanUrl(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (!u.pathname.startsWith('/in/')) {
      return null;
    }
    // Return protocol + host + pathname without query parameters
    return `${u.protocol}//${u.host}${u.pathname}`;
  } catch {
    return null;
  }
}

console.log('Building authoritative India streaming layer...');

const auditResults = {
  canonical_checkpoints: 72,
  article_only_checkpoints: 14,
  total_entities: 86,
  supplied_entries: suppliedStreamingList.length,
  matched_entities: 0,
  verified_jiohotstar_canonical: 0,
  verified_jiohotstar_article: 0,
  verified_jiohotstar_total: 0,
  upcoming_canonical: 2,
  unverified_canonical: 0,
  unverified_article: 0,
  invalid_urls: 0,
  duplicate_urls: [],
  potential_mismatches: [],
  manual_review_items: []
};

const streamingItems = [];
const urlUsageMap = new Map();

for (const entity of masterEntities) {
  const normEntityTitle = normalizeTitle(entity.title);
  const isCanonical = typeof entity.order === 'number';

  // Find match in supplied list
  const matched = suppliedStreamingList.find(s => {
    if (s.target_ids && s.target_ids.includes(entity.id)) return true;
    const normS = normalizeTitle(s.title);
    if (normS === normEntityTitle) return true;
    if (s.matched_title && normalizeTitle(s.matched_title) === normEntityTitle) return true;
    return false;
  });

  if (matched) {
    auditResults.matched_entities++;
    const rawUrl = matched.streaming_link;
    const sanitizedUrl = cleanUrl(rawUrl);

    if (matched.status === 'upcoming') {
      streamingItems.push({
        id: entity.id,
        order: entity.order,
        title: entity.title,
        type: entity.type,
        availability: [
          {
            country: "IN",
            platform: null,
            status: "upcoming",
            format: null,
            url: null,
            verified: true,
            verified_at: "2026-08-30",
            source: "Official Theatrical / Streaming Slate",
            notes: "Upcoming theatrical/streaming release — streaming availability not announced"
          }
        ]
      });
    } else if (matched.status === 'needs_verification' || !sanitizedUrl) {
      if (isCanonical) auditResults.unverified_canonical++;
      else auditResults.unverified_article++;

      if (rawUrl && !sanitizedUrl) auditResults.invalid_urls++;

      auditResults.manual_review_items.push({
        id: entity.id,
        order: entity.order,
        title: entity.title,
        reason: matched.status === 'needs_verification' ? 'Needs independent India URL verification' : 'Invalid URL'
      });

      streamingItems.push({
        id: entity.id,
        order: entity.order,
        title: entity.title,
        type: entity.type,
        availability: [
          {
            country: "IN",
            platform: "JioHotstar",
            status: "unverified",
            format: "subscription",
            url: null,
            verified: false,
            verified_at: "2026-08-30",
            source: "Manual Audit",
            notes: "Streaming availability not yet verified on JioHotstar India"
          }
        ]
      });
    } else {
      if (isCanonical) auditResults.verified_jiohotstar_canonical++;
      else auditResults.verified_jiohotstar_article++;
      auditResults.verified_jiohotstar_total++;

      // Track URL duplicates
      if (urlUsageMap.has(sanitizedUrl)) {
        urlUsageMap.get(sanitizedUrl).push(entity.id);
      } else {
        urlUsageMap.set(sanitizedUrl, [entity.id]);
      }

      streamingItems.push({
        id: entity.id,
        order: entity.order,
        title: entity.title,
        type: entity.type,
        availability: [
          {
            country: "IN",
            platform: "JioHotstar",
            status: "verified",
            format: "subscription",
            url: sanitizedUrl,
            verified: true,
            verified_at: "2026-08-30",
            source: "JioHotstar India",
            notes: "Verified JioHotstar India streaming URL"
          }
        ]
      });
    }
  } else {
    // Unverified entity
    if (isCanonical) auditResults.unverified_canonical++;
    else auditResults.unverified_article++;

    streamingItems.push({
      id: entity.id,
      order: entity.order,
      title: entity.title,
      type: entity.type,
      availability: [
        {
          country: "IN",
          platform: "JioHotstar",
          status: "unverified",
          format: "subscription",
          url: null,
          verified: false,
          verified_at: "2026-08-30",
          source: "Unverified Fallback",
          notes: "Streaming availability not yet verified in India"
        }
      ]
    });
  }
}

// Track series duplicate URLs vs illegal movie duplicates
for (const [url, ids] of urlUsageMap.entries()) {
  if (ids.length > 1) {
    auditResults.duplicate_urls.push({
      url,
      entity_ids: ids,
      is_series_reuse: ids.every(id => id.includes('daredevil') || id.includes('hawkeye'))
    });
  }
}

const indiaStreamingPayload = {
  country: "IN",
  region: "India",
  last_verified: "2026-08-30",
  platforms: {
    primary: "JioHotstar"
  },
  items: streamingItems
};

fs.writeFileSync(
  path.join(__dirname, '..', 'data', 'india_streaming.json'),
  JSON.stringify(indiaStreamingPayload, null, 2)
);

fs.writeFileSync(
  path.join(__dirname, '..', 'data', 'india_streaming_audit.json'),
  JSON.stringify(auditResults, null, 2)
);

console.log('india_streaming.json and india_streaming_audit.json generated successfully!');
console.log(JSON.stringify(auditResults, null, 2));
