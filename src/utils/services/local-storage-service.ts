export class LocalStorageService {
  /**
   * Get values by key from local storage.
   * @param key The key by which the value is stored.
   * @returns Return null if there is no value or key, otherwise return value corresponding.
   */
  public static getValue<T>(key: string): T | null {
    const localValue = localStorage.getItem(key);
    if (localValue != null) {
      try {
        return JSON.parse(localValue);
      } catch (error) {
        this.remove(key);
        return null;
      }
    }
    return null;
  }

  /**
   * Add or write values by key to local storage.
   * @param key The key by which the value is stored.
   * @param value Value that needs to be stored.
   */
  public static setValue<T>(key: string, value: T): void {
    if (value != null) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  /**
   * Remove key from local storage.
   * @param key The key that need to be removed.
   */
  public static remove(key: string): void {
    localStorage.removeItem(key);
  }
}