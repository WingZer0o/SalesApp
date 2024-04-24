type QueueItem = () => Promise<void>;

export class Typewriter {
  #queue: QueueItem[] = [];
  typingSpeed: number;
  loop: boolean;
  element: HTMLElement;
  deletingSpeed: number;

  constructor(
    element: HTMLElement,
    { loop = false, typingSpeed = 50, deletingSpeed = 50 } = {},
  ) {
    this.element = element;
    this.loop = loop;
    this.typingSpeed = typingSpeed;
    this.deletingSpeed = deletingSpeed;
  }

  typeString(string: string) {
    this.#queue.push(() => {
      return new Promise((resolve, reject) => {
        let i = 0;
        const interval = setInterval(() => {
          this.element.append(string[i]);
          i++;
          if (i >= string.length) {
            clearInterval(interval);
            resolve();
          }
        }, this.typingSpeed);
      });
    });
    return this;
  }
  
  async start() {
    for (let cb of this.#queue) {
      await cb();
    }
    return this;
  }
}
