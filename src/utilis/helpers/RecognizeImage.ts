export default async function RecognizeImage({ imageUrl, prompt }: Record<string, string>) {
    const res = await fetch('/api/functions/ImageRecognition', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl, prompt }),
    });
  
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to recognize image');
    }
  
    return data.result;
}
  