export class SessionService {
  private static instance: SessionService;

  private constructor() {}

  public static getInstance(): SessionService {
    if (!SessionService.instance) {
      SessionService.instance = new SessionService();
    }
    return SessionService.instance;
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  public storeInSession<T>(key: string, data: T): void {
    if (this.isBrowser()) {
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      console.warn('localStorage is not available in this environment.');
    }
  }

  public getFromSession<T>(key: string): T | null {
    if (this.isBrowser()) {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } else {
      console.warn('localStorage is not available in this environment.');
      return null;
    }
  }

  public removeFromSession(key: string): void {
    if (this.isBrowser()) {
      localStorage.removeItem(key);
    } else {
      console.warn('localStorage is not available in this environment.');
    }
  }
}
