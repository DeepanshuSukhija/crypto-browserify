const crypto = require('crypto');

class CryptoBrowserify {
  Algorithm = 'aes-128-cbc';

  constructor(key) {
    this.KEY = Buffer.from(key, 'utf8');
  }

  toBase64(buffer) {
    return Buffer.from(buffer).toString('base64');
  }

  toBuffer(arrayBuffer) {
    const buffer = Buffer.alloc(arrayBuffer.byteLength);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < buffer.length; ++i) {
      buffer[i] = view[i];
    }
    return buffer;
  }

  decrypt(inputData) {
    const decipher = crypto.createDecipheriv(this.Algorithm, this.KEY, this.KEY);
    decipher.setAutoPadding(false);

    return Buffer.concat([decipher.update(inputData), decipher.final()]);
  }
}

window.CryptoBrowserify = CryptoBrowserify;
