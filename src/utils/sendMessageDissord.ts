import fetch from 'node-fetch';

export const sendMessageDiscord = async (webhookURL: string, message: string): Promise<void> => {
  const msg = {
    content: message,
  };

  await fetch(webhookURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(msg),
  });
};
