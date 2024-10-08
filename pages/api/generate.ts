import axios from "axios";

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const prompt = req.body.prompt;

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          prompt,
          max_tokens: 100,
          model: "text-davinci-003",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          },
        }
      );

      const reply = response.data.choices[0].text.trim();
      res.status(200).json({ reply });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
