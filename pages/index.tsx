import { useState } from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";
const prompt = "ChatGPT, you are talking to yourself.";

export default function Home() {
  const [conversation, setConversation] = useState<any>([]);
  const [topic, setTopic] = useState<any>(prompt);
  const [conversationRunning, setConversationRunning] = useState<any>(true);
  const [isLoading, setIsLoading] = useState<any>(false);

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
      setIsLoading(true);
      const reply = await generateReply(prompt);
      setIsLoading(false);
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
            <p style={{ marginTop: 24 }} key={index}>
              {message}
            </p>
          ))}
        </div>

        <label style={{fontSize: 16, marginTop: 12}}>Prompt:</label>
        <textarea
          style={{ height: 120, width: '100%', maxWidth: 500 }}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
          <button className={styles.button} onClick={simulateConversation}>
            Start Conversation
          </button>

          {isLoading && <p style={{paddingTop: 6}}>ChatGPT is talking to itself :)</p>}

          {!isLoading && !!conversation.length && (
            <>
              <button className={styles['button-sec']} onClick={() => setConversation([])}>Clear</button>
              <p style={{paddingTop: 6}}>Conversation over :( </p>{" "}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
