
const chatToggle = document.getElementById("chatToggle");
const chatBox = document.getElementById("chatBox");
const chatClose = document.getElementById("chatClose");
const voiceForm = document.getElementById("voiceForm");
const voiceQuestion = document.getElementById("voiceQuestion");
const voiceEnable = document.getElementById("voiceEnable");
const voiceStatus = document.getElementById("voiceStatus");
const voiceRobot = document.getElementById("voiceRobot");
const speakingIndicator = document.getElementById("speakingIndicator");
const voiceHint = document.querySelector(".voice-hint");

let selectedVoice = null;
let welcomeSpoken = false;
let voiceReady = false;

const welcomeMessage = "Hi, welcome to my portfolio!";

const answers = [
    {
        keywords: ["who are you", "your name", "introduce yourself"],
        answer: "Hi! I am Sashi's portfolio assistant. I will help you explore her skills, education and projects."
    },
    {
        keywords: ["about sashi", "about me", "who is sashi", "full name"],
        answer: "Sashi's full name is Vasarla Lakshmi Sashi. She is a Bachelor of Technology student interested in software development, artificial intelligence and test automation."
    },
    {
        keywords: ["skill", "technologies", "tech stack"],
        answer: "Sashi’s skills include Python, HTML, CSS, JavaScript, Power BI, AI and machine learning, Google Colab, Git, GitHub and VS Code, along with communication and teamwork skills."
    },
    {
        keywords: ["playwright", "automation testing", "testing"],
        answer: "Playwright is a browser automation tool. Sashi uses Python, Playwright and Pytest to automate website tests and generate HTML test reports."
    },
    {
        keywords: ["welfareai", "welfare ai", "welfare project", "government scheme"],
        answer: "WelfareAI is an AI-powered personalized welfare, job and skill course recommendation project. It uses Python, Streamlit, semantic search and profile matching to help users discover relevant opportunities. It also uses local language model technology through Ollama."
    },
    {
        keywords: ["project", "projects", "your work", "her work"],
        answer: "Sashi’s projects include WelfareAI, Diabetic Retinopathy Detection, AI Stress Detection and Precautions, and Playwright Test Automation. Explore the Projects section for details."
    },
    {
        keywords: ["education", "college", "degree", "study"],
        answer: "Sashi is pursuing a Bachelor of Technology degree. Please refer to the Education section for her college, specialization and academic details."
    },
    {
        keywords: ["contact", "email", "linkedin", "hire"],
        answer: "Thank you for your interest in connecting with Sashi. Please visit the Contact section to find her professional contact details."
    },
    {
        keywords: ["thank you", "thanks"],
        answer: "You're welcome! Thank you for visiting Sashi's portfolio. Have a wonderful day!"
    },
    {
        keywords: ["hello", "hi", "hey"],
        answer: "Hi there! Welcome to Sashi's portfolio. What would you like to know about her?"
    }
];

function loadFemaleVoice() {
    if (!("speechSynthesis" in window)) return;

    const voices = window.speechSynthesis.getVoices();
    const englishVoices = voices.filter(v =>
        v.lang.toLowerCase().startsWith("en")
    );

    selectedVoice =
        englishVoices.find(v =>
            /samantha|victoria|karen|zira|aria|jenny|libby|susan/i.test(v.name)
        ) ||
        englishVoices.find(v =>
            /female/i.test(v.name)
        ) ||
        englishVoices.find(v =>
            /google.*english/i.test(v.name)
        ) ||
        englishVoices[0] ||
        null;
}

if ("speechSynthesis" in window) {
    loadFemaleVoice();
    window.speechSynthesis.onvoiceschanged = loadFemaleVoice;
}

function speak(text, isWelcome = false) {
    if (!("speechSynthesis" in window)) {
        voiceStatus.textContent = "Voice is not supported in this browser.";
        return;
    }

    const synth = window.speechSynthesis;
    synth.cancel();
    loadFemaleVoice();

    const utterance = new SpeechSynthesisUtterance(text);

    if (selectedVoice) {
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang;
    } else {
        utterance.lang = "en-US";
    }

    utterance.rate = 0.9;
    utterance.pitch = 1.2;
    utterance.volume = 1;

    utterance.onstart = () => {
        voiceReady = true;

        if (isWelcome) welcomeSpoken = true;

        voiceStatus.textContent = "Your portfolio assistant is speaking";
        document.querySelectorAll(".robot-figure").forEach(robot => robot.classList.add("speaking"));
        voiceRobot.classList.add("speaking");
        speakingIndicator.textContent = "🔊";
    };

    utterance.onend = () => {
        voiceStatus.textContent = "Ready to talk";
        document.querySelectorAll(".robot-figure").forEach(robot => robot.classList.remove("speaking"));
        voiceRobot.classList.remove("speaking");
        speakingIndicator.textContent = "💙";
    };

    utterance.onerror = (event) => {
        document.querySelectorAll(".robot-figure").forEach(robot => robot.classList.remove("speaking"));
        document.querySelectorAll(".robot-figure").forEach(robot => robot.classList.remove("speaking"));
        voiceRobot.classList.remove("speaking");
        speakingIndicator.textContent = "💙";
        voiceStatus.textContent = "Click anywhere on the page to start voice.";
        console.log("Speech status:", event.error);
    };

    synth.speak(utterance);
}

function getAnswer(question) {
    const cleaned = question.toLowerCase()
        .replace(/[?!.,]/g, "")
        .trim();

    for (const item of answers) {
        if (item.keywords.some(keyword => cleaned.includes(keyword))) {
            return item.answer;
        }
    }

    return "You can ask me about Sashi's education, technical skills, WelfareAI project, automation testing or contact details.";
}

// Show the robot and welcome message when the page opens.
window.addEventListener("DOMContentLoaded", () => {
    chatBox.hidden = false;
    voiceEnable.hidden = true;

    if (voiceHint) {
        voiceHint.textContent = welcomeMessage;
    }

    voiceStatus.textContent = "Welcome!";

    // Try automatic welcome speech. The browser may block autoplay.
    setTimeout(() => {
        speak(welcomeMessage, true);
    }, 700);
});

// If Chrome blocks autoplay, the visitor's first page click starts the welcome.
document.addEventListener("click", function startWelcomeOnFirstClick() {
    if (!welcomeSpoken && !voiceReady) {
        speak(welcomeMessage, true);
    }
}, { once: true });

chatToggle.addEventListener("click", () => {
    chatBox.hidden = !chatBox.hidden;

    if (!chatBox.hidden) {
        voiceQuestion.focus();
    }
});

chatClose.addEventListener("click", () => {
    chatBox.hidden = true;

    if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
    }

    document.querySelectorAll(".robot-figure").forEach(robot => robot.classList.remove("speaking"));
    voiceRobot.classList.remove("speaking");
    speakingIndicator.textContent = "💙";
    voiceStatus.textContent = "Ready to talk";
});

voiceForm.addEventListener("submit", event => {
    event.preventDefault();

    const question = voiceQuestion.value.trim();
    if (!question) return;

    if (!voiceReady) {
        voiceStatus.textContent = "Click once on the page to enable voice.";
        return;
    }

    const answer = getAnswer(question);
    voiceQuestion.value = "";
    speak(answer);
});

window.addEventListener("beforeunload", () => {
    if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
    }
});
// Clickable project details: only describe confirmed project information.
const projectDetails = {
  welfare: { label: "AI RECOMMENDATION PROJECT", title: "WelfareAI — Personalized Opportunity Finder", description: "Helps users explore relevant government welfare schemes, jobs and skill courses based on profile information. The project uses semantic retrieval and profile matching to make recommendations easier to discover.", tech: "Python, Streamlit, ChromaDB, Sentence Transformers, RAG, Ollama / Gemma 3", note: "Add live app link and screenshots here when you want to publish them. Confirm eligibility and application details with official sources." },
  retina: { label: "COMPUTER VISION PROJECT", title: "Diabetic Retinopathy Detection", description: "Processes retinal fundus images and displays a model prediction such as Diabetic Retinopathy or No Diabetic Retinopathy.", tech: "Python, MobileNetV2, image preprocessing and Gaussian filtering", note: "This is an educational model output, not a medical diagnosis. A qualified eye-care professional should assess real health concerns." },
  stress: { label: "EMOTION-BASED PROJECT", title: "AI Stress Detection & Precautions", description: "Displays facial emotion output and a stress-related estimate, followed by general wellness suggestions such as breathing exercises, mindfulness and walking.", tech: "DeepFace, OpenCV, Flask, HTML, CSS, JavaScript", note: "Facial emotion is not a reliable clinical stress diagnosis. Suggestions are general wellness information only." },
  playwright: { label: "TEST AUTOMATION PROJECT", title: "Playwright Test Automation", description: "Automates browser checks for the portfolio, including checking the page title and verifying that the robot chat panel opens. Pytest can generate an HTML test report.", tech: "Python, Playwright, Pytest, pytest-html", note: "Run the local web server first, then run: python -m pytest tests/test_portfolio.py -v" }
};
const detailPanel = document.getElementById("projectDetail");
const detailClose = document.getElementById("detailClose");
document.querySelectorAll(".know-more").forEach(button => {
  button.addEventListener("click", () => {
    const item = projectDetails[button.dataset.project];
    if (!item || !detailPanel) return;
    document.getElementById("detailLabel").textContent = item.label;
    document.getElementById("detailTitle").textContent = item.title;
    document.getElementById("detailDescription").textContent = item.description;
    document.getElementById("detailTech").textContent = item.tech;
    document.getElementById("detailNote").textContent = item.note;
    detailPanel.hidden = false;
    detailPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
});
if (detailClose) detailClose.addEventListener("click", () => { detailPanel.hidden = true; });

// Use the exact short welcome/closing lines requested. Browser autoplay may block speech.
const requestedWelcome = "Hi, welcome to my portfolio!";
const requestedClosing = "This is my portfolio. Thank you!";

// Optional closing narration button; browsers may require a user click before speech.
const closingVoiceButton = document.getElementById("closingVoiceButton");
if (closingVoiceButton) {
    closingVoiceButton.addEventListener("click", () => {
        speak(requestedClosing);
    });
}
