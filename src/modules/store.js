import { writable } from 'svelte/store';

export const exelStore = writable([]);

export const titleStore = writable('');
export const mainTextStore = writable('');
export const dateStore = writable('');
export const signatureStore = writable('');

export const bgImgStore = writable({ name: '' });
export const proImgStore = writable({ name: '' });
export const sigImgStore = writable({ name: '' });

export const pdfListStore = writable([]);
