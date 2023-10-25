export class LocalStorageService {
  static get(key: string) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  static set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static remove(key: string) {
    localStorage.removeItem(key);
  }

  static getAllWithPrefix(prefix: string): any[] {
    const items = { ...localStorage };
    const filteredItems = Object.keys(items)
      .filter((key) => key.startsWith(prefix))
      .reduce((acc: any, key: any) => {
        acc.push(JSON.parse(items[key]));
        return acc;
      }, []);
    return filteredItems;
  }
}
