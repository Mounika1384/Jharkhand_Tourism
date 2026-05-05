function toggleChatbot() {
    const window = document.getElementById('chatbot-window');
    window.classList.toggle('active');
}

function handleChatInput(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

async function sendChatMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    const CHAT_API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3000/api'
        : 'https://jharkhand-tourism-backend-h5sq.onrender.com/api';
    
    if (message === '') return;
    
    addMessage(message, 'user');
    input.value = '';
    
    // Show typing indicator
    const typingId = addTypingIndicator();
    
    try {
        const response = await fetch(`${CHAT_API_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message })
        });
        
        const data = await response.json();
        removeTypingIndicator(typingId);
        
        if (data.success) {
            addMessage(data.reply, 'bot');
        } else {
            addMessage("I'm sorry, I'm having trouble connecting right now. Please try again later.", 'bot');
        }
    } catch (error) {
        console.error('Chat error:', error);
        removeTypingIndicator(typingId);
        addMessage("Connection error. Please make sure the backend server is running.", 'bot');
    }
}

function addMessage(text, sender) {
    const container = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = text;
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

function addTypingIndicator() {
    const container = document.getElementById('chatbot-messages');
    const typingDiv = document.createElement('div');
    const id = 'typing-' + Date.now();
    typingDiv.id = id;
    typingDiv.className = 'message bot typing';
    typingDiv.innerHTML = '<i class="fas fa-ellipsis-h fa-beat"></i> Thinking...';
    container.appendChild(typingDiv);
    container.scrollTop = container.scrollHeight;
    return id;
}

function removeTypingIndicator(id) {
    const indicator = document.getElementById(id);
    if (indicator) {
        indicator.remove();
    }
}
