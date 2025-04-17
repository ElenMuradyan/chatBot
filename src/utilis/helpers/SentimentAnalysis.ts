export async function SentimentAnalysisFunction(prompt: string) {
    try{
        const responce = await fetch('/api/functions/SentimentAnalysis', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    prompt,
                 }),    
                }
        );

        const data = await responce.json();

        return data.description;
    }catch(error: any){
        console.error("Error with sending message to AI:", error);
        return "Sorry, there was an issue with the request. Please check your connection and try again.";
    }
}