export async function sendEmail(messageData: {
  [key: string]: string;
}) {
  try {
    await fetch(`/api/sendEmail`, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`,
      },
      body: JSON.stringify({
        to: process.env.NEXT_PUBLIC_TARGET_EMAIL,
        subject: `Text`,
        message: `Email: ${messageData.email}\nИмя: ${messageData.name}\n\n${messageData.message ? `Описание задачи:\n${messageData.message}` : ``}`,
        html: `Email: ${messageData.email}<br/>Имя: ${messageData.name}<br/><br/>${messageData.message ? `Описание задачи:<br/>${messageData.message}` : ``}`,
      }),
    });
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw error || `Error`;
  }
}
