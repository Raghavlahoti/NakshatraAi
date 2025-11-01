// Minimal placeholder: deterministic sample positions for demo and unit tests
// Replace with real ephemeris provider logic (JPL DE430/DE440 or astro-lib) or API client
const axios = require('axios');

exports.getPositions = async ({ date, time, timezone, lat, lon }) => {
  // For now return simulated planetary longitudes
  const samplePlanets = [
    'Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto'
  ];
  const base = new Date(`${date}T${time}:00`);
  const positions = samplePlanets.map((p, i) => ({
    name: p,
    longitude: (i * 30 + (base.getUTCDate() % 30)) % 360, // deterministic test value
    house: ((i + 1) % 12) + 1,
    degrees: ((i * 30) % 30) + 0.5
  }));
  return positions;
};

exports.getTransits = async ({ chart, days = 30 }) => {
  // produce a few demo transit events spaced over days
  const now = new Date();
  const out = [];
  for (let i = 1; i <= Math.min(days, 14); i += 3) {
    out.push({
      timestamp: new Date(now.getTime() + i * 24*60*60*1000),
      description: `Transit demo event in ${i} days`,
      type: 'planetary-aspect',
      severity: i % 2 === 0 ? 'medium' : 'low',
      planets: ['Mars','Saturn'].slice(0, (i%2)+1)
    });
  }
  return out;
};
