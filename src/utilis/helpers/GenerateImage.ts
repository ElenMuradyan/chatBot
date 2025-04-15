export default async function GenerateImage (prompt: string) {
    try{
        const response = await fetch('/api/functions/ImageGeneration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: prompt }),
        });
        

        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);  
        };

        const result = await response.json();

        return result.image;
    }catch(error: any){
        console.error('Error with OpenRouter image API:', error);
        return null;
    }
}