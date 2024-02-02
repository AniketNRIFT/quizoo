import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  constructor() { }

  setData<T>(key:string, value:T) : void {
    localStorage.setItem(key, JSON.stringify({
      value
    }));
  }

  getData<T>(key:string) : T | null {
    const _t = localStorage.getItem(key);
    if (_t==null) return null;
    const { value } = JSON.parse(_t);
    return value;
  }

  removeData(key:string) : void {
    localStorage.removeItem(key);
  }

  reset() : void {
    localStorage.clear();
  }
}
