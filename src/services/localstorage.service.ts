class LocalstorageService {
  private prefix = 'avshell_react_2024_q3';

  private _usePrefix = true;

  isUsePrefix(p: boolean) {
    this._usePrefix = p;
  }

  setItem(key: string, value: unknown): void {
    localStorage.setItem(this.getKey(key), JSON.stringify({ value }));
  }

  getItem<T>(key: string): T | null {
    const data: string | null = localStorage.getItem(this.getKey(key));

    if (data !== null) {
      try {
        return JSON.parse(data).value;
      } catch (e) {
        return null;
      }
    }

    return null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(this.getKey(key));
  }

  clearStorage(): void {
    localStorage.clear();
  }

  getKey(key: string) {
    return this._usePrefix ? `${this.prefix}-${key}` : `${key}`;
  }
}

const storage = new LocalstorageService();

export { storage };
