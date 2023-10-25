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

  static getAllWithPrefix(prefix: string) {
    const items = { ...localStorage };
    const filteredItems = Object.keys(items)
      .filter((key) => key.startsWith(prefix))
      .reduce((obj: any, key: any) => {
        obj[key] = items[key];
        return obj;
      }, {});
    return filteredItems;
  }
}
