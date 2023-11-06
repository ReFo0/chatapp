const socket = io();
const nameInput = $('#name');
const messageInput = $('#message');
const chatOutput = $('#chat-output');
const sendButton = $('#send');
const isTypingMessage = $('#is-typing');

let typing = false;
let timeout = undefined;

nameInput.focus();

function setUsername() {
    const name = nameInput.val();
    if (name) {
        nameInput.prop('disabled', true);
        sendButton.prop('disabled', false);
        return name;
    }
}

nameInput.keypress((e) => {
    if (e.key === 'Enter') {
        const name = setUsername();
        if (name) {
            socket.emit('chat message', { name, message: 'joined.' });
        }
    }
});

messageInput.keypress(() => {
    if (!typing) {
        typing = true;
        socket.emit('typing', { typing: true, name: nameInput.val() });
    } else {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            typing = false;
            socket.emit('typing', { typing: false, name: nameInput.val() });
        }, 1000);
    }
});

sendButton.click(() => {
    const name = setUsername();
    const message = messageInput.val();
    if (name && message) {
        socket.emit('chat message', { name, message });
        messageInput.val('');
    }
});

socket.on('chat message', (data) => {
    isTypingMessage.text('');
    chatOutput.append(`<p><strong>${data.name}:</strong> ${data.message}</p>`);
});
