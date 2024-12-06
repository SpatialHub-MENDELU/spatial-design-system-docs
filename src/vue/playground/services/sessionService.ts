export class SessionService {
  private static instance: SessionService;

  private constructor() {}

  public static getInstance(): SessionService {
    if (!SessionService.instance) {
      SessionService.instance = new SessionService();
    }
    return SessionService.instance;
  }

  public storeInSession<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public getFromSession<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  }

  public removeFromSession(key: string): void {
    localStorage.removeItem(key);
  }
}
