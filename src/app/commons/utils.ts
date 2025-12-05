export class Utils
{
    constructor() {
        console.log('Utils class initialized'); 
    }

    async toSha1Async(input: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await window.crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  /*
    const utils = new Utils();
    utils.toSha1Async('123911').then(hash => {
      this.sha1 = hash;
      console.log('SHA1 Hashrr:', this.sha1);
    });
  */
}

export function getNumberFromField(fieldName: string): any {
  const field = document.getElementById(fieldName) as HTMLInputElement;
  return field ? field.value : 0;
}

export function getTextFromField(fieldName: string): any {
  const field = document.getElementById(fieldName) as HTMLInputElement;
  return field ? field.value : '';
}

export function displayHTML(elementId: string, display: string): boolean {
  const element = document.getElementById(elementId);
  if(element)
  {
    element.style.display = display;
    return true;
  }

  return false;
}

export function visibilityHTML(elementId: string, visibility: string): boolean {
  const element = document.getElementById(elementId);
  if(element)
  {
    element.style.visibility = visibility;
    return true;
  }

  return false;
}


export function setValueToField(fieldName: string, value: any): boolean {
  const field = document.getElementById(fieldName) as HTMLInputElement;
  if(field) 
  {
    field.value = value;
    return true;
  }

  return false;
}

  export function convertTimeToLocal(time: any): string 
  {
      const date = new Date(time);
      return date.toLocaleString();
  }