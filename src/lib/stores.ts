import type { GridController } from 'svelte-grid-extended';
import { writable } from 'svelte/store';
import type { Views } from './types';
import { localStorageStore } from '@skeletonlabs/skeleton';

export let gridController = writable<GridController>();
export let views = localStorageStore<Views>('views', { pages: [], current: 0 });
