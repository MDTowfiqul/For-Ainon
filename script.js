// --- CONFIGURATION ---
// Acceptable password variations (case-insensitive checks)
const ALLOWED_PASSWORDS = ["towfiqul", "towfiq", "towfik"]; 

const HINTS = [
    "Your future husband 💍",
    "Your only lover ❤️",
    "Your future soulmate ✨",
    "Your roommate in Jannah 🏔️",
    "The one who codes websites just to ask you out 😉",
    "Think of a name... 7 letters, starts with T!"
];

// Rejection sequence assets
const STAGES = [
    {
        text: "did you click NO by mistake? 🤔",
        gif: "https://media.tenor.com/w9v2g1vNlY8AAAAi/mochi-peach.gif"
    },
    {
        text: "are you like sure sure?? 🥺",
        gif: "https://media.tenor.com/00Kk9zP-u34AAAAi/pepe-cry.gif"
    },
    {
        text: "please Ainon pookie? 🥺😭😭",
        gif: "https://media.tenor.com/Z4vU_p_M_EAAAAAi/sad-cat-holding-phone.gif"
    },
    {
        text: "if you say no I will be very sad 😢",
        gif: "https://media.tenor.com/beXf77p1v7QAAAAi/the-office-michael-scott.gif"
    },
    {
        text: "maybe read the question one last time? last chance...",
        gif: "https://media.tenor.com/b_86h6Hl788AAAAi/shocked-michael-scott.gif"
    }
];

// --- DOM ELEMENTS ---
const passwordScreen = document.getElementById('passwordScreen');
const proposalScreen = document.getElementById('proposalScreen');
const passwordInput = document.getElementById('passwordInput');
const loginBtn = document.getElementById('loginBtn');
const hintBtn = document.getElementById('hintBtn');
const hintText = document.getElementById('hintText');
const loginError = document.getElementById('loginError');
const revealBtn = document.getElementById('revealBtn');

const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const question = document.getElementById('question');
const gif = document.getElementById('gif');

// --- STATE VARIABLES ---
let attemptCount = 0;
let hintIndex = 0;
let noCount = 0;

// --- PASSWORD SCREEN HANDLERS ---
loginBtn.addEventListener('click', checkPassword);
passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkPassword();
});

function checkPassword() {
    const userInput = passwordInput.value.trim().toLowerCase();
    
    // Check if the input matches any allowed variation
    if (ALLOWED_PASSWORDS.includes(userInput)) {
        passwordScreen.classList.add('hidden');
        proposalScreen.classList.remove('hidden');
    } else {
        attemptCount++;
        loginError.innerText = "Incorrect answer! Try again or check the hints.";
        
        // Show the reveal password option after 3 failed attempts
        if (attemptCount >= 3) {
            revealBtn.classList.remove('hidden');
        }
    }
}

// Hint button handling
hintBtn.addEventListener('click', () => {
    hintText.classList.remove('hidden');
    hintText.innerText = `Hint: ${HINTS[hintIndex]}`;
    
    // Cycle sequentially through the hint list
    hintIndex = (hintIndex + 1) % HINTS.length;
});

// Reveal password button action
revealBtn.addEventListener('click', () => {
    passwordInput.value = "Towfiqul";
    loginError.innerText = "Filled it out for you! Click Unlock 💖";
});

// --- PROPOSAL SCREEN HANDLERS ---
function handleNoProgress() {
    if (noCount < STAGES.length) {
        question.innerText = STAGES[noCount].text;
        gif.src = STAGES[noCount].gif;
        noCount++;
    } else {
        // Switch layout parameters to fixed position right before moving away
        if (noBtn.style.position !== 'fixed') {
            noBtn.style.position = 'fixed';
        }
        moveNoButton();
    }
}

function moveNoButton() {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
}

noBtn.addEventListener('click', handleNoProgress);
noBtn.addEventListener('mouseover', () => {
    if (noCount >= STAGES.length) moveNoButton();
});
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (noCount >= STAGES.length) {
        moveNoButton();
    } else {
        handleNoProgress();
    }
});

yesBtn.addEventListener('click', () => {
    question.innerHTML = "YAYY! 🎉 I can't believe you said yes! I love you, Ainon! 🥂✨";
    gif.src = "https://media.tenor.com/26FLdmIp6wJr91JAI/giphy.gif"; 
    noBtn.style.display = 'none';
    
    // Restore button back to static center if layout changes
    yesBtn.style.transform = "scale(1.2)";
});
