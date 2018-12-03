import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

/// Notify users about errors and other helpful stuff
export interface Msg {
  content: string;
  style: string;
}

@Injectable()
export class NotifyService {

  private _msgSource = new Subject<Msg | null>();

  timer = null;
  msg = this._msgSource.asObservable();

  update(content: string, style: 'error' | 'info' | 'success') {
    const msg: Msg = { content, style };
    this._msgSource.next(msg);
    if (this.timer)
      clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.clear();
    }, 10000);
  }

  clear() {
    this._msgSource.next(null);
  }
}