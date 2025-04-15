export async function downloadImage(url: string) {
    const response = await fetch(url);
    const blob = await response.blob();
  
    const filename = url.split('/').pop()?.split('?')[0] || 'downloaded-image.jpg';
  
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  