import type { Data } from '$lib';
import { persisted } from 'svelte-persisted-store';

export let data = persisted<Data>('data', { views: [], current: 0 });
