const AURAS = [
    {n: "Common", c: 2, col: "#888"}, {n: "Uncommon", c: 4, col: "#aaa"}, {n: "Good", c: 5, col: "#fff"},
    {n: "Natural", c: 8, col: "#1eff00"}, {n: "Rare", c: 16, col: "#0070dd"}, {n: "Divinus", c: 32, col: "#00f2ff"},
    {n: "Crystallized", c: 64, col: "#a335ee"}, {n: "Star", c: 100, col: "#ffd700"}, {n: "Rage", c: 128, col: "#ff4444"},
    {n: "Topaz", c: 150, col: "#ffcc00"}, {n: "Glacier", c: 256, col: "#7fffff"}, {n: "Windy", c: 300, col: "#b0e0e6"},
    {n: "Ruby", c: 350, col: "#e0115f"}, {n: "Forbidden", c: 404, col: "#4b0082"}, {n: "Gilded", c: 512, col: "#ffd700"},
    {n: "Jackpot", c: 777, col: "#00ff00"}, {n: "Precious", c: 1024, col: "#9370db"}, {n: "Magnetic", c: 2048, col: "#00ced1"},
    {n: "Sidereal", c: 2500, col: "#191970"}, {n: "Solar", c: 5000, col: "#ff8c00"}, {n: "Lunar", c: 5000, col: "#dcdcdc"},
    {n: "Mercury", c: 6000, col: "#c0c0c0"}, {n: "Flushed", c: 6900, col: "#ff69b4"}, {n: "Hazel", c: 8000, col: "#8b4513"},
    {n: "Jade", c: 12500, col: "#00a86b"}, {n: "Aquatic", c: 40000, col: "#0000ff"}, {n: "Exotic", c: 99999, col: "#00ffff"},
    {n: "Diaboli: Void", c: 100400, col: "#4b0082"}, {n: "Comet", c: 120000, col: "#00bfff"}, {n: "Undead: Devil", c: 120000, col: "#8b0000"},
    {n: "Spectre", c: 140000, col: "#f5f5f5"}, {n: "Jazz", c: 160000, col: "#ffff00"}, {n: "Aether", c: 180000, col: "#9932cc"},
    {n: "Bounded", c: 200000, col: "#4682b4"}, {n: "Celestial", c: 350000, col: "#f0f8ff"}, {n: "Hope", c: 488725, col: "#fafad2"},
    {n: "Raven", c: 500000, col: "#2f4f4f"}, {n: "Solar: Solstice", c: 500000, col: "#ff4500"}, {n: "Lunar: Full Moon", c: 500000, col: "#ffffff"},
    {n: "Twilight", c: 600000, col: "#483d8b"}, {n: "Warlock", c: 666000, col: "#1a0033"}, {n: "Kyawthuite", c: 850000, col: "#ff0000"},
    {n: "Arcane", c: 1000000, col: "#800080"}, {n: "Hades", c: 1111111, col: "#660000"}, {n: "Astral", c: 1336000, col: "#00008b"},
    {n: "Cosmos", c: 1520000, col: "#1e90ff"}, {n: "Archmage", c: 1766000, col: "#4b0082"}, {n: "Player: Respawn", c: 1999999, col: "#00ff7f"},
    {n: "Bounded: Unbound", c: 2000000, col: "#0000cd"}, {n: "Gravitational", c: 2000000, col: "#708090"}, {n: "Poseidon", c: 4000000, col: "#008080"},
    {n: "Zeus", c: 4500000, col: "#ffd700"}, {n: "Virtual", c: 5000000, col: "#00ff00"}, {n: "Celestial: Divine", c: 7000000, col: "#ffea00"},
    {n: "Starscourge", c: 10000000, col: "#4a0000", anim: true}, {n: "Arcane: Legacy", c: 15000000, col: "#9400d3", anim: true},
    {n: "Chromatic", c: 20000000, col: "#ff00ff", anim: true}, {n: "Arcane: Dark", c: 30000000, col: "#220033", anim: true},
    {n: "Matrix", c: 50000000, col: "#003300", anim: true}, {n: "Chromatic: Genesis", c: 99999999, col: "#ffffff", anim: true},
    {n: "Abyssal Hunter", c: 100000000, col: "#000033", anim: true}, {n: "Overture", c: 150000000, col: "#0066ff", anim: true},
    {n: "Impeached", c: 200000000, col: "#ff0000", anim: true}, {n: "Archangel", c: 250000000, col: "#fffacd", anim: true},
    {n: "Overture: History", c: 300000000, col: "#ffd700", anim: true}, {n: "Bloodlust", c: 300000000, col: "#660000", anim: true},
    {n: "Gargantua", c: 430000000, col: "#00001a", anim: true}, {n: "Sovereign", c: 750000000, col: "#ffcc00", anim: true},
    {n: "Ascendant", c: 935000000, col: "#e6e6fa", anim: true}, {n: "Nyctophobia", c: 1011111010, col: "#0a0a0a", anim: true},
    {n: "Pixelation", c: 1073741824, col: "#00ff00", anim: true}, {n: "Luminosity", c: 1200000000, col: "#00ffff", anim: true},
    {n: "Leviathan", c: 1730400000, col: "#000044", anim: true}, {n: "Astraios", c: 1750000000, col: "#000080", anim: true},
    {n: "Equinox", c: 2500000000, col: "#808080", anim: true}, {n: "Monarch", c: 3000000000, col: "#ffd700", anim: true}
];

const GLOVES = Array.from({length: 20}, (_, i) => ({
    id: 'g'+i, name: `Glove T-${i+1}`, luck: Math.pow(i+1, 3.8)*10, price: Math.floor(Math.pow(i+1, 5)*400 + 300)
}));

const POTIONS = [
    { name: "Basic Luck", luck: 20, dur: 20, price: 500 },
    { name: "Fish Oil", luck: 50, dur: 30, price: 5000 },
    { name: "Heavenly I", luck: 2500, dur: 10, price: 800000 },
    { name: "Heavenly II", luck: 50000, dur: 5, price: 15000000 }
];

let state = { 
    money: 0, rolls: 0, ownedG: [], eqG: [], 
    pots: {}, // Format: { "LuckValue": RollDuration }
    inv: {}, lastCol: '#fff', buyQty: "1", skipKnown: false 
};

if(localStorage.getItem('aura_rng_v3')) state = {...state, ...JSON.parse(localStorage.getItem('aura_rng_v3'))};

const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');
let particles = [];

function roll() {
    state.rolls++;
    let luck = 1;
    state.eqG.forEach(id => { const g = GLOVES.find(x=>x.id===id); if(g) luck += g.luck; });
    
    // Potions: Only highest luck applies, but durations stack per tier
    let potLuck = 0;
    Object.keys(state.pots).forEach(val => {
        if(state.pots[val] > 0) potLuck = Math.max(potLuck, parseFloat(val));
    });
    luck += potLuck;

    if(state.rolls % 10 === 0) luck *= 3;

    let rolled = AURAS[0];
    const r = Math.random();
    for(let i=AURAS.length-1; i>=0; i--) {
        if(r <= (1/AURAS[i].c)*luck) { rolled = AURAS[i]; break; }
    }

    state.money = Math.round(state.money + Math.pow(Math.log10(rolled.c+1), 4)*70 + 10);
    const isNew = !state.inv[rolled.n];
    state.inv[rolled.n] = (state.inv[rolled.n] || 0) + 1;
    state.lastCol = rolled.col;

    if(rolled.anim && (isNew || !state.skipKnown)) triggerCinematic(rolled);
    else showAura(rolled);

    // Consume durations
    Object.keys(state.pots).forEach(val => { if(state.pots[val] > 0) state.pots[val]--; });
    
    updateUI(); save();
}

function triggerCinematic(aura) {
    const cs = document.getElementById('cutscene');
    const name = document.getElementById('cs-name');
    name.innerText = aura.n; name.style.color = aura.col;
    name.style.textShadow = `0 0 50px ${aura.col}`;
    name.classList.remove('reveal-name');
    cs.className = 'cutscene-show';
    setTimeout(() => { document.getElementById('flash').className = 'flash-anim'; }, 800);
    setTimeout(() => { name.classList.add('reveal-name'); }, 1800);
    setTimeout(() => { cs.className = 'cutscene-hide'; document.getElementById('flash').className = ''; showAura(aura); }, 4500);
}

function showAura(aura) {
    document.getElementById('aura-name').innerText = aura.n;
    document.getElementById('aura-name').style.color = aura.col;
    document.getElementById('aura-rar').innerText = `1 IN ${aura.c.toLocaleString()}`;
    document.getElementById('character-glow').style.background = aura.col;
    document.getElementById('character-glow').style.opacity = 0.5;
}

function updateUI() {
    document.getElementById('money-display').innerText = `$${state.money.toLocaleString()}`;
    document.getElementById('count-display').innerText = state.rolls % 10;
    
    let L = 1;
    state.eqG.forEach(id => { const g = GLOVES.find(x=>x.id===id); if(g) L += g.luck; });
    let pL = 0; Object.keys(state.pots).forEach(v => { if(state.pots[v]>0) pL = Math.max(pL, parseFloat(v)); });
    document.getElementById('luck-display').innerText = `🍀 Total Luck: x${Math.floor(L + pL).toLocaleString()}`;

    const gCont = document.getElementById('gloves-container');
    gCont.innerHTML = '';
    GLOVES.forEach(g => {
        const owned = state.ownedG.includes(g.id);
        const eq = state.eqG.includes(g.id);
        const d = document.createElement('div');
        d.className = `item ${owned?'owned':''} ${eq?'eq':''}`;
        d.innerHTML = `${owned?'':'<span class="price">$'+g.price.toLocaleString()+'</span>'}<b>${g.name}</b><small>+${Math.floor(g.luck).toLocaleString()} Luck</small>`;
        d.onclick = () => {
            if(eq) state.eqG = state.eqG.filter(x=>x!==g.id);
            else if(owned && state.eqG.length < 2) state.eqG.push(g.id);
            else if(!owned && state.money >= g.price) { state.money -= g.price; state.ownedG.push(g.id); }
            updateUI();
        };
        gCont.appendChild(d);
    });

    const pCont = document.getElementById('potions-container');
    pCont.innerHTML = '';
    POTIONS.forEach(p => {
        const d = document.createElement('div');
        const active = (state.pots[p.luck] || 0);
        d.className = 'item';
        d.innerHTML = `<span class="price">$${p.price.toLocaleString()}</span><b>${p.name}</b><small>+${p.luck} Luck (${active} left)</small>`;
        d.onclick = () => {
            let qty = state.buyQty === "max" ? Math.floor(state.money / p.price) : parseInt(state.buyQty);
            if(state.money >= p.price * qty && qty > 0) {
                state.money -= p.price * qty;
                state.pots[p.luck] = (state.pots[p.luck] || 0) + (p.dur * qty);
                updateUI();
            }
        };
        pCont.appendChild(d);
    });

    const iCont = document.getElementById('inventory-container');
    iCont.innerHTML = '';
    AURAS.slice().reverse().forEach(a => {
        if(state.inv[a.n]) {
            const d = document.createElement('div');
            d.className = 'item'; d.style.borderLeft = `4px solid ${a.col}`;
            d.innerHTML = `<b style="color:${a.col}">${a.n}</b> x${state.inv[a.n]}<br><small>1 IN ${a.c.toLocaleString()}</small>`;
            iCont.appendChild(d);
        }
    });
}

function loop() {
    cvs.width = cvs.offsetWidth; cvs.height = cvs.offsetHeight;
    ctx.fillStyle = 'rgba(0,0,0,0.15)'; ctx.fillRect(0,0,cvs.width,cvs.height);
    if(particles.length < 100) particles.push({x:cvs.width/2, y:cvs.height/2, vx:(Math.random()-0.5)*10, vy:(Math.random()-0.5)*10, l:1});
    particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy; p.l -= 0.015;
        ctx.globalAlpha = p.l; ctx.fillStyle = state.lastCol;
        ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, 7); ctx.fill();
        if(p.l <= 0) particles.splice(i, 1);
    });
    requestAnimationFrame(loop);
}

function toggleCollapse(id) {
    const el = document.getElementById(id);
    const arrow = document.getElementById(id.charAt(0)+'-arrow');
    const isHidden = el.style.maxHeight === "0px";
    el.style.maxHeight = isHidden ? "2000px" : "0px";
    arrow.innerText = isHidden ? "▼" : "▲";
}

document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.qty-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active'); state.buyQty = btn.dataset.qty;
    };
});

function toggleTab(t) {
    ['shop','inv','settings'].forEach(id => document.getElementById(id+'-tab').style.display = id===t?'block':'none');
    document.querySelectorAll('.tab-btn').forEach((b,i) => b.classList.toggle('active', [0,1,2][i] === ['shop','inv','settings'].indexOf(t)));
}

document.getElementById('roll-btn').onclick = roll;
document.getElementById('btn-shop').onclick = () => toggleTab('shop');
document.getElementById('btn-inv').onclick = () => toggleTab('inv');
document.getElementById('btn-settings').onclick = () => toggleTab('settings');
document.getElementById('skip-known').onchange = (e) => state.skipKnown = e.target.checked;
function save() { localStorage.setItem('aura_rng_v3', JSON.stringify(state)); }

loop(); updateUI();