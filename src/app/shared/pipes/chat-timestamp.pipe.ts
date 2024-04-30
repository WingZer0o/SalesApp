import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chatTimestamp'
})
export class ChatTimestampPipe implements PipeTransform {

  transform(timestamp: Date): string {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const oneDay = 24 * 60 * 60 * 1000;

    if (diff < oneDay) {
      // Less than a day ago, display time
      return this.formatTime(timestamp);
    } else if (diff < 2 * oneDay) {
      // Less than two days ago, display "Yesterday at <time>"
      return `Yesterday at ${this.formatTime(timestamp)}`;
    } else {
      // More than two days ago, display full date and time
      return timestamp.toLocaleString();
    }
  }

  private formatTime(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit' };
    return date.toLocaleTimeString('en-US', options);
  }
}