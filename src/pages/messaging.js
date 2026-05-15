import { useEffect, useRef, useState } from 'react';

function Message() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    // Connect to the free echo server
    socketRef.current = new WebSocket('wss://echo.websocket.org');

    socketRef.current.onmessage = (event) => {
      setMessages((prev) => [...prev, `Server: ${event.data}`]);
    };

    return () => {console.log("function closes")
      socketRef.current.close()}
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Send data to the server
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(input);
      setMessages((prev) => [...prev, `You: ${input}`]);
      setInput('');
    } else {
      console.error('WebSocket connection is not open.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSend}>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit">Send</button>
      </form>
      <ul>
        {messages.map((msg, i) => <li key={i}>{msg}</li>)}
      </ul>
    </div>
  );
}
export default  Message
