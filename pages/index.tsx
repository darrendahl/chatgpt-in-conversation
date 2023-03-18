import { useState } from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [conversation, setConversation] = useState<any>([]);
  const [topic, setTopic] = useState<any>("life");
  const [conversationRunning, setConversationRunning] = useState<any>(true);

  async function generateReply(prompt: any) {
    try {
      const response = await axios.post("/api/generate", { prompt });
      return response.data.reply;
    } catch (error) {
      console.error(error);
      return "";
    }
  }

  async function simulateConversation() {
    setConversation([]);

    let prompt = `${topic}`;
    while (conversationRunning) {
      const reply = await generateReply(prompt);
      console.log(reply)
      if (!reply) break;

      setConversation((prevConversation: any) => [...prevConversation, reply]);
      prompt = reply;
    }
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>ChatGPT Talking to Itself</h1>

        <div className={styles.chatbox}>
          {conversation.map((message: any, index: any) => (
            <p key={index}>{message}</p>
          ))}
        </div>

        <label>Prompt:</label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <button className={styles.button} onClick={simulateConversation}>
          Start Conversation
        </button>

        <button className={styles.button} onClick={() => setConversationRunning(false)}>
          Stop Conversation
        </button>
      </main>
    </div>
  );
}
