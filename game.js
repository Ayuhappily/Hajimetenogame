// game.js
const rules = require('./rules.js');
const { character, phases, gauge, onEnd } = rules;
let heart = character.initialHeart;
const rl = require('readline').createInterface(process.stdin, process.stdout);

console.log(character.greeting);
let idx = 0;

function nextPhase() {
  if (idx >= phases.length) {
    console.log('\n' + onEnd(heart));
    return rl.close();
  }
  const p = phases[idx];
  console.log(`\n=== Phase ${p.id}: ${p.title} ===`);
  console.log(`🕴️ ${character.name}「${p.prompt}」`);
  rl.question('あなたの回答> ', input => {
    const hit = p.keywords.some(k => input.includes(k));
    const fb = hit ? p.success : p.failure;
    heart = Math.min(gauge.max, Math.max(gauge.min, heart + fb.change));
    console.log(`${fb.text}  [❤ ${heart}/${gauge.max}]`);
    idx++;
    nextPhase();
  });
}

nextPhase(); 