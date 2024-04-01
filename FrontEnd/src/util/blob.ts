export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}




export function base64ToBlob(base64: string, mimeType: string): Blob {
  const byteString = atob(base64.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeType });
}

const base64String = localStorage.getItem('myBlob');
if (base64String) {
  const blob = base64ToBlob(base64String, 'text/plain');
  // Blob 사용
}



export const fetchBlobFromUrl =async (url:string) => {
  const response = await fetch(url)
  const blob = await response.blob()
  return blob
  
} 