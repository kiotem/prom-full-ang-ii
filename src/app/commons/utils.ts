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