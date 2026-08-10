const BOT_TOKEN = "8996153136:AAFAJK1_uf4uPG3oK2zut4n_0bFIgd7rSVA";
const CHAT_ID = "5899072672";

// সাধারণ টেক্সট বা অ্যালার্ট পাঠানো
export async function sendTelegramMessage(message) {
  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });
    return await response.json();
  } catch (error) {
    console.error("Telegram send error:", error);
  }
}

// ফাইল বা ছবি টেলিগ্রামে পাঠানো
export async function sendTelegramDocument(formData) {
  try {
    formData.append("chat_id", CHAT_ID);
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
      method: "POST",
      body: formData,
    });
    return await response.json();
  } catch (error) {
    console.error("Telegram document send error:", error);
  }
}
