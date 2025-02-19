// Create stars background with enhanced density
const starsContainer = document.querySelector('.stars');
for(let i = 0; i < 300; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.width = `${Math.random() * 3 + 1}px`;
    star.style.height = star.style.width;
    star.style.setProperty('--duration', `${2 + Math.random() * 4}s`);
    starsContainer.appendChild(star);
}

// Audio context for sound effects
let audioContext;
let oscillator;
let gainNode;
let crackleInterval;

// Enhanced click animation with "dangerous" effects
function activateDangerousLamp(element) {
    const isActive = element.classList.toggle('active');
    const glitchEffect = document.querySelector('.glitch-effect');
    const particles = document.querySelector('.particles');
    
    // Show glitch effect
    glitchEffect.style.display = 'block';
    setTimeout(() => {
        glitchEffect.style.display = 'none';
    }, 300);
    
    // Generate intense spark particles
    for(let i = 0; i < 30; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        const lampBulb = element.querySelector('.lamp__bulb');
        const rect = lampBulb.getBoundingClientRect();
        
        const centerX = rect.left + rect.width/2;
        const centerY = rect.top + rect.height/2;
        
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 50;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.width = `${3 + Math.random() * 5}px`;
        sparkle.style.height = sparkle.style.width;
        
        const hue = 0 + Math.random() * 30;
        sparkle.style.background = `hsl(${hue}, 100%, 60%)`;
        sparkle.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px hsl(${hue}, 100%, 70%)`;
        
        particles.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1500);
    }

    // Update background and lighting effects
    if (isActive) {
        // Create intense red glow overlay
        const redGlow = document.createElement('div');
        redGlow.className = 'red-glow-overlay';
        document.body.appendChild(redGlow);
        
        // Start sound effects
        startSoundEffects();
    } else {
        // Remove red glow
        const existingGlow = document.querySelector('.red-glow-overlay');
        if (existingGlow) {
            existingGlow.remove();
        }
        
        // Stop sound effects
        stopSoundEffects();
    }

    // Update mockup data readouts
    document.getElementById('status-value').innerText = isActive ? 'CRITICAL' : 'STANDBY';
    document.getElementById('status-value').style.color = isActive ? '#ff3a3a' : '#3af7ff';
    
    document.getElementById('power-value').innerText = isActive ? '142.67 kW' : '0.00 kW';
    document.getElementById('power-value').style.color = isActive ? '#ff3a3a' : '#3af7ff';
    
    document.getElementById('risk-value').innerText = isActive ? 'EXTREME' : 'MINIMAL';
    document.getElementById('risk-value').style.color = isActive ? '#ff3a3a' : '#3af7ff';
    
    // Simulate screen shake for dangerous activation
    if (isActive) {
        document.body.style.animation = 'none';
        setTimeout(() => {
            document.body.style.animation = 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both';
        }, 10);
    }
}

// Sound effects functions
function startSoundEffects() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Base hum
    oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(50, audioContext.currentTime);
    
    gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.start();
    
    // Crackling effect
    crackleInterval = setInterval(() => {
        if (Math.random() > 0.7) {
            const crackle = audioContext.createOscillator();
            crackle.type = 'sawtooth';
            crackle.frequency.setValueAtTime(100 + Math.random() * 900, audioContext.currentTime);
            
            const crackleGain = audioContext.createGain();
            crackleGain.gain.setValueAtTime(0.03, audioContext.currentTime);
            crackleGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
            
            crackle.connect(crackleGain);
            crackleGain.connect(audioContext.destination);
            
            crackle.start();
            crackle.stop(audioContext.currentTime + 0.1);
        }
    }, 100);
}

function stopSoundEffects() {
    if (oscillator) {
        gainNode.gain.exponentialRampToValueAtTime(0.001, oscillator.context.currentTime + 1);
        setTimeout(() => {
            oscillator.stop();
        }, 1000);
    }
    
    if (crackleInterval) {
        clearInterval(crackleInterval);
    }
}
