import { useState } from 'react';
import './ChatPage.css';

export const ChatPage = () => {
  const [messages, setMessages] = useState<Array<{ id: string; contenido: string; emisor: string }>>([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (!newMessage.trim()) return;
    // TODO: Implementar envío de mensajes
    setMessages([...messages, { id: Date.now().toString(), contenido: newMessage, emisor: 'Yo' }]);
    setNewMessage('');
  };

  return (
    <div className="chat-page">
      <h1>Chat</h1>
      <div className="chat-container">
        <div className="chat-messages">
          {messages.length === 0 ? (
            <div className="empty-chat">No hay mensajes. ¡Comienza una conversación!</div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="message">
                <strong>{msg.emisor}:</strong> {msg.contenido}
              </div>
            ))
          )}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe un mensaje..."
          />
          <button onClick={handleSend}>Enviar</button>
        </div>
      </div>
    </div>
  );
};

