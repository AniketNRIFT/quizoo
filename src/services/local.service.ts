import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  constructor() { }

  setData<T>(key:string, value:T) : void {
    if(!localStorage) {
      return;
    }
    localStorage.setItem(key, JSON.stringify({
      value
    }));
  }

  getData<T>(key:string) : T | null {
    if(!localStorage) {
      return null;
    }
    const _t = localStorage.getItem(key);
    if (_t==null) return null;
    const { value } = JSON.parse(_t);
    return value;
  }

  removeData(key:string) : void {
    if(!localStorage) {
      return;
    }
    localStorage.removeItem(key);
  }

  reset() : void {
    if(!localStorage) {
      return;
    }
    localStorage.clear();
  }
}
