// --- CONFIGURACIÓN ---
const Prefixes = ["Infernal", "Abyssal", "Titanic", "Solar", "Glitch", "Frozen", "Aqua", "Holy", "Zenith", "Nebula", "Void", "Cursed"];
const Nouns = ["Dragon", "Kraken", "Singularity", "Monolith", "Spirit", "Echo", "Core", "Aura", "Nova", "Serpent", "Phoenix", "Wraith"];

const AURAS = [{name:"Common", chance:1, color:"#888"}, {name:"Good", chance:5, color:"#fff"}];
for(let i=0; i<500; i++){
    const chance = Math.floor(Math.pow(i+2, 4) * 15 + 100);
    let color = "#1eff00";
    if(chance > 1000000) color = "#ff4444";
    else if(chance > 100000) color = "#00ffff";
    AURAS.push({
        name: `${Prefixes[i%Prefixes.length]} ${Nouns[Math.floor(i/Prefixes.length)%Nouns.length]}`,
        chance, color, 
        theme: chance > 1000000 ? (i%2==0?"fire":"fish") : (i%2==0?"smoke":"stars")
    });
}

const GLOVES = Array.from({length: 20}, (_, i) => ({
    id: 'g'+i, name: `Guante MK-${i+1}`, luck: Math.pow(i+1, 3.5)*10, price: Math.floor(Math.pow(i+1, 4.8)*300 + 200)
}));

const POTIONS = [
    { name: "Bound Vial", luck: 20, dur: 20, price: 1000 },
    { name: "Heavenly I", luck: 1500, dur: 10, price: 150000 },
    { name: "Heavenly II", luck: 15000, dur: 5, price: 2500000 },
    { name: "Fish Oil", luck: 50, dur: 30, price: 5000 },
    { name: "Void Essence", luck: 80000, dur: 3, price: 20000000 },
    { name: "Zenith Brew", luck: 1000000, dur: 1, price: 500000000 }
];

// --- ESTADO ---
let state = { 
    money: 0, rolls: 0, 
    ownedG: [], eqG: [], 
    pots: [], inv: {}, 
    muted: false, skipKnown: false, lastColor: '#fff', lastTheme: 'stars' 
};

// --- MOTOR DE PARTÍCULAS ---
const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');
let particles = [];

class Particle {
    constructor(theme, color) {
        this.x = cvs.width/2; this.y = cvs.height/2;
        this.theme = theme; this.color = color;
        this.life = 1; this.s = Math.random()*3+1;
        this.vx = (Math.random()-0.5)*10; this.vy = (Math.random()-0.5)*10;
        if(theme === "fire") { this.vy = -Math.random()*8; this.vx *= 0.5; }
        if(theme === "fish") { this.vx = Math.cos(Math.random()*Math.PI*2)*5; this.vy = Math.sin(Math.random()*Math.PI*2)*5; }
    }
    update() {
        this.life -= 0.015;
        if(this.theme === "fish") { this.x += this.vx; this.y += this.vy + Math.sin(this.life*10)*2; }
        else { this.x += this.vx; this.y += this.vy; }
    }
    draw() {
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        if(this.theme === "fish") {
            ctx.beginPath(); ctx.ellipse(this.x, this.y, this.s*3, this.s, Math.atan2(this.vy, this.vx), 0, 7); ctx.fill();
        } else if(this.theme === "fire") {
            ctx.beginPath(); ctx.arc(this.x, this.y, this.s*2, 0, 7); ctx.fill();
        } else {
            ctx.beginPath(); ctx.arc(this.x, this.y, this.s, 0, 7); ctx.fill();
        }
    }
}

// --- LOGICA PRINCIPAL ---
function roll() {
    state.rolls++;
    let luck = 1;
    state.eqG.forEach(id => { const g = GLOVES.find(x=>x.id===id); if(g) luck += g.luck; });
    state.pots.forEach(p => luck += p.luck);
    if(state.rolls % 10 === 0) luck *= 3;

    let rolled = AURAS[0];
    const r = Math.random();
    for(let i=AURAS.length-1; i>=0; i--) {
        if(r <= (1/AURAS[i].chance)*luck) { rolled = AURAS[i]; break; }
    }

    state.money = Math.round(state.money + Math.pow(Math.log10(rolled.chance+1), 4)*50 + 10);
    const isNew = !state.inv[rolled.name];
    state.inv[rolled.name] = (state.inv[rolled.name] || 0) + 1;
    state.lastColor = rolled.color;
    state.lastTheme = rolled.theme;

    if(rolled.chance >= 100000 && (isNew || !state.skipKnown)) {
        triggerCinematic(rolled);
    } else {
        showAura(rolled);
    }

    state.pots.forEach(p => p.dur--);
    state.pots = state.pots.filter(p => p.dur > 0);
    updateUI();
}

function triggerCinematic(aura) {
    const cs = document.getElementById('cutscene');
    const name = document.getElementById('cs-name');
    name.innerText = aura.name;
    name.style.color = aura.color;
    name.style.textShadow = `0 0 50px ${aura.color}`;
    name.classList.remove('reveal-name');
    
    document.getElementById('cs-msg').innerText = "FRECUENCIA ENCONTRADA...";
    cs.className = 'cutscene-show';

    // Fase 1: Solo partículas especiales
    setTimeout(() => {
        document.getElementById('cs-msg').innerText = `1 EN ${aura.chance.toLocaleString()}`;
        document.getElementById('flash').className = 'flash-anim';
        // Spawn masivo de partículas temáticas
        for(let i=0; i<100; i++) particles.push(new Particle(aura.theme, aura.color));
    }, 1000);

    // Fase 2: Revelar nombre
    setTimeout(() => { name.classList.add('reveal-name'); }, 2000);

    // Fase 3: Cerrar
    setTimeout(() => { 
        cs.className = 'cutscene-hide'; 
        document.getElementById('flash').className = ''; 
        showAura(aura);
    }, 4500);
}

function showAura(aura) {
    document.getElementById('aura-name').innerText = aura.name;
    document.getElementById('aura-name').style.color = aura.color;
    document.getElementById('aura-name').style.textShadow = `0 0 30px ${aura.color}`;
    document.getElementById('aura-rar').innerText = `HALLADO: 1 EN ${aura.chance.toLocaleString()}`;
    
    const glow = document.getElementById('character-glow');
    glow.style.background = aura.color;
    glow.style.opacity = 0.6;
}

function updateUI() {
    document.getElementById('money-display').innerText = `$${Math.floor(state.money).toLocaleString()}`;
    document.getElementById('count-display').innerText = state.rolls % 10;
    
    // Render Tienda
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
        d.className = 'item';
        d.innerHTML = `<span class="price">$${p.price.toLocaleString()}</span><b>${p.name}</b><small>+${p.luck.toLocaleString()} L (${p.dur} rolls)</small>`;
        d.onclick = () => {
            if(state.money >= p.price) { state.money -= p.price; state.pots.push({...p}); updateUI(); }
        };
        pCont.appendChild(d);
    });

    // Render Colección
    const iCont = document.getElementById('inventory-container');
    iCont.innerHTML = '';
    AURAS.slice().reverse().forEach(a => {
        if(state.inv[a.name]) {
            const row = document.createElement('div');
            row.className = 'item'; row.style.borderLeft = `4px solid ${a.color}`;
            row.innerHTML = `<b style="color:${a.color}">${a.name}</b> x${state.inv[a.name]}<br><small>1 EN ${a.chance.toLocaleString()}</small>`;
            iCont.appendChild(row);
        }
    });
}

// Loop de Animación (60fps)
function loop() {
    cvs.width = cvs.offsetWidth; cvs.height = cvs.offsetHeight;
    ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.fillRect(0,0,cvs.width,cvs.height);
    
    if(particles.length < 150) particles.push(new Particle(state.lastTheme, state.lastColor));

    particles.forEach((p, i) => {
        p.update(); p.draw();
        if(p.life <= 0) particles.splice(i, 1);
    });
    requestAnimationFrame(loop);
}

// Utils
function toggleCollapse(id) {
    const el = document.getElementById(id);
    el.style.maxHeight = el.style.maxHeight ? null : "1000px";
}

function toggleTab(t) {
    ['shop','inv','settings'].forEach(id => document.getElementById(id+'-tab').style.display = id===t?'block':'none');
    document.querySelectorAll('.tab-btn').forEach((b,i) => b.classList.toggle('active', [0,1,2][i] === ['shop','inv','settings'].indexOf(t)));
}

document.getElementById('roll-btn').onclick = roll;
document.getElementById('btn-shop').onclick = () => toggleTab('shop');
document.getElementById('btn-inv').onclick = () => toggleTab('inv');
document.getElementById('btn-settings').onclick = () => toggleTab('settings');
document.getElementById('skip-known').onchange = (e) => state.skipKnown = e.target.checked;

loop();
updateUI();