interface ICache {
  [key: string]: object;
}

export default class AssetManager {
  #successCount: number;
  #errorCount: number;
  #cache: ICache;
  downloadQueue: string[];

  constructor() {
    this.#successCount = 0;
    this.#errorCount = 0;
    this.#cache = {};
    this.downloadQueue = [];
  }

  queueDownload(path: string) {
    this.downloadQueue.push(path);
  }

  downloadAll(downloadCallback: () => void) {
    if (this.downloadQueue.length === 0) {
      downloadCallback();
    }

    for (let i = 0; i < this.downloadQueue.length; i++) {
      const path = this.downloadQueue[i];
      const img = new Image();

      img.addEventListener(
        'load',
        () => {
          console.log(img.src, 'is loaded');
          this.#successCount += 1;
          if (this.isDone()) {
            downloadCallback();
          }
        },
        false,
      );
      img.addEventListener(
        'error',
        (error: object) => {
          console.log('Error:', error);
          this.#errorCount += 1;
          if (this.isDone()) {
            downloadCallback();
          }
        },
        false,
      );
      img.src = path;
      this.#cache[path] = img;
    }
  }

  getAsset(path: string) {
    return this.#cache[path];
  }

  isDone() {
    return this.downloadQueue.length == this.#successCount + this.#errorCount;
  }
}
