const output = document.getElementById("terminal-output");
const terminalWrapper = document.querySelector(".terminal-wrapper");

// Array of different log messages with types
const logMessages = [
  { text: "initializing hidden service...", type: "system" },
  { text: "loading encryption modules", type: "info" },
  { text: "routing traffic via relay nodes", type: "info" },
  { text: "verifying device identity", type: "success" },
  { text: "connection established: node_#84729", type: "success" },
  { text: "WARNING: unauthorized access detected", type: "warn" },
  { text: "establishing anonymous session", type: "info" },
  { text: "access granted", type: "success" },
  { text: "decrypting data packets...", type: "info" },
  { text: "tunnel secured", type: "success" },
  { text: "ERROR: timeout on relay 4", type: "error" },
  { text: "retrying connection...", type: "warn" },
  { text: "scanning for threats...", type: "success" },
  { text: "syncing with tor network", type: "info" },
  { text: "downloading directory info", type: "info" },
  { text: "building circuits...", type: "system" },
  { text: "circuit established: 3 hops", type: "success" },
  { text: "requesting hidden service descriptor", type: "info" },
  { text: "rendezvous point selected", type: "success" },
  { text: "WARNING: unusual traffic pattern", type: "warn" },
  { text: "validating onion address", type: "info" },
  { text: "connection encrypted: AES-256", type: "success" },
  { text: "processing request...", type: "system" },
  { text: "streaming data: 34.2 KB/s", type: "info" },
  { text: "ERROR: packet loss detected", type: "error" },
  { text: "switching to backup relay", type: "warn" },
  { text: "buffer overflow prevented", type: "success" },
  { text: "monitoring network activity", type: "system" },
  { text: "scanning for threats...", type: "info" },
  { text: "no anomalies detected", type: "success" }
];

let lineIndex = 0;
let charIndex = 0;
let isTyping = false;
let currentLine = "";
let maxLines = 50; // Maximum lines before clearing old ones

// Function to get a random log message
function getRandomLog() {
  return logMessages[Math.floor(Math.random() * logMessages.length)];
}

// Function to add a complete line to terminal
function addLine(text, type = "info") {
  const line = document.createElement("div");
  line.className = type;
  line.textContent = `> ${text}`;
  output.appendChild(line);
  
  // Auto scroll to bottom
  if (terminalWrapper) {
    terminalWrapper.scrollTop = terminalWrapper.scrollHeight;
  }
  
  // Remove old lines if too many
  if (output.children.length > maxLines) {
    output.removeChild(output.firstChild);
  }
}

// Initial typing animation
function typeLine() {
  if (lineIndex >= 6) {
    // After initial 6 lines, start unlimited processing
    setTimeout(startUnlimitedProcessing, 1000);
    return;
  }

  const messages = [
    { text: "initializing hidden service...", type: "system" },
    { text: "loading encryption modules", type: "info" },
    { text: "routing traffic via relay nodes", type: "info" },
    { text: "verifying device identity", type: "success" },
    { text: "WARNING: unauthorized access detected", type: "warn" },
    { text: "establishing anonymous session", type: "info" }
  ];

  if (charIndex < messages[lineIndex].text.length) {
    currentLine += messages[lineIndex].text[charIndex];
    output.textContent = currentLine;
    charIndex++;
    setTimeout(typeLine, 40);
  } else {
    addLine(messages[lineIndex].text, messages[lineIndex].type);
    output.textContent = "";
    currentLine = "";
    charIndex = 0;
    lineIndex++;
    setTimeout(typeLine, 600);
  }
}

// Unlimited processing mode
function startUnlimitedProcessing() {
  addProcessingLine();
}

function addProcessingLine() {
  const log = getRandomLog();
  const delay = Math.random() * 2000 + 500; // Random delay between 0.5-2.5 seconds
  
  addLine(log.text, log.type);
  
  // Continue indefinitely
  setTimeout(addProcessingLine, delay);
}

// Start the initial typing animation only if terminal exists
if (output) {
  typeLine();
}

// ===== EXIT LINK HANDLER =====
const exitLink = document.querySelector('.exit-link');
if (exitLink) {
  exitLink.addEventListener('click', (e) => {
    e.preventDefault();
    const confirmed = confirm('Are you sure you want to exit the hidden service?');
    if (!confirmed) return;
    
    // Simulate exit
    document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;color:#00ff88;font-family:Courier New;font-size:2rem;">CONNECTION TERMINATED</div>';
  });
}

// ===== MARKET - ADD TO CART =====
const cartButtons = document.querySelectorAll('.add-to-cart');

cartButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const productCard = e.target.closest('.product-card');
    const productName = productCard.querySelector('h3').textContent;
    
    // Change button text temporarily
    const originalText = button.textContent;
    button.textContent = 'ADDED ✓';
    button.style.background = '#00ff88';
    button.style.color = '#000';
    
    // Show notification
    console.log(`Added to cart: ${productName}`);
    
    // Reset button after 2 seconds
    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = 'transparent';
      button.style.color = '#00ff88';
    }, 2000);
  });
});

// ===== CHAT - MESSAGE SENDING =====
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-message');
const messageThread = document.querySelector('.message-thread');

function sendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;
  
  // Create new message element
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message sent';
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  contentDiv.textContent = text;
  
  const timeDiv = document.createElement('div');
  timeDiv.className = 'message-time';
  const now = new Date();
  timeDiv.textContent = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  
  messageDiv.appendChild(contentDiv);
  messageDiv.appendChild(timeDiv);
  messageThread.appendChild(messageDiv);
  
  // Clear input and scroll to bottom
  messageInput.value = '';
  messageThread.scrollTop = messageThread.scrollHeight;
}

if (sendButton) {
  sendButton.addEventListener('click', sendMessage);
}

if (messageInput) {
  messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
}

// ===== CHAT - CONVERSATION SWITCHING =====
const conversationItems = document.querySelectorAll('.conversation-item');

conversationItems.forEach(item => {
  item.addEventListener('click', () => {
    // Remove active class from all items
    conversationItems.forEach(i => i.classList.remove('active'));
    
    // Add active to clicked item
    item.classList.add('active');
    
    // Update chat header with selected user
    const userName = item.querySelector('.conv-name').textContent;
    const avatar = item.querySelector('.conv-avatar').textContent;
    const chatUser = document.querySelector('.chat-user');
    if (chatUser) {
      chatUser.textContent = `${avatar} ${userName}`;
    }
    
    // Remove unread badge if exists
    const badge = item.querySelector('.unread-badge');
    if (badge) {
      badge.remove();
    }
  });
});

