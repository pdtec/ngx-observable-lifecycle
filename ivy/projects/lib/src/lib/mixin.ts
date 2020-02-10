import { Type } from '@angular/core';

export function applyMixins(target: any, baseCtors: Type<any>[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      const descriptor = Object.getOwnPropertyDescriptor(baseCtor.prototype, name) as any;
      // if (descriptor !== undefined) {
        Object.defineProperty(target.prototype, name, descriptor);
      // }
    });
  });
}
