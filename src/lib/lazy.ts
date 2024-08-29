import { get, writable } from 'svelte/store';

const noop = () => {};
const triggerIntersect = Symbol('triggerIntersect');
const triggerExit = Symbol('triggerExit');

class LazyObserverEntry<T extends HTMLElement = HTMLElement> {
	public element: T;
	public observer: LazyObserver;

	public isIntersecting = false;

	private _onIntersect: (entry: IntersectionObserverEntry) => void = noop;
	private _onExit: (entry: IntersectionObserverEntry) => void = noop;

	public constructor(element: T, observer: LazyObserver) {
		this.element = element;
		this.observer = observer;
	}

	public observe() {
		this.observer.observer.observe(this.element);
	}

	public unobserve() {
		this.observer.observer.unobserve(this.element);
	}

	public onIntersect(callback: (entry: IntersectionObserverEntry) => void) {
		this._onIntersect = callback;
	}

	public onExit(callback: (entry: IntersectionObserverEntry) => void) {
		this._onExit = callback;
	}

	[triggerIntersect](entry: IntersectionObserverEntry) {
		this._onIntersect(entry);
		this.isIntersecting = true;
	}

	[triggerExit](entry: IntersectionObserverEntry) {
		this._onExit(entry);
		this.isIntersecting = false;
	}
}

class LazyObserver {
	public elements = new Map<HTMLElement, LazyObserverEntry>();
	public observer: IntersectionObserver;

	public constructor() {
		this.observer = new IntersectionObserver(this.handleIntersect.bind(this), {
			threshold: 0.1, // Adjust threshold to trigger when 10% of the footer is visible
			rootMargin: '200px'
		});
	}

	protected handleIntersect(entries: IntersectionObserverEntry[]) {
		entries.forEach((entry) => {
			if (!this.elements.has(entry.target as HTMLElement)) return;

			const el = this.elements.get(entry.target as HTMLElement)!;

			if (entry.isIntersecting) {
				return el[triggerIntersect](entry);
			}

			el[triggerExit](entry);
		});
	}

	public observe(target: HTMLElement) {
		const entry = new LazyObserverEntry(target, this);
		entry.observe();

		this.elements.set(target, entry);

		return entry;
	}

	public unobserve(target: HTMLElement) {
		const entry = this.elements.get(target);

		if (entry) {
			entry.unobserve();
			this.elements.delete(target);
		}

		return entry;
	}

	public disconnect(): void {
		this.observer.disconnect();
		this.elements.clear();
	}
}

export const lazyObserver = writable<LazyObserver | null>(null);

export const getLazyObserver = () => {
	const val = get(lazyObserver);

	if (!val) {
		const observer = new LazyObserver();

		lazyObserver.set(observer);

		return observer;
	}

	return val;
};
