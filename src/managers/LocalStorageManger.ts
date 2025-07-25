//constants
import { decryptData, encryptData } from '@/constants/Helpers';

//managers
import SharedManager, { AvailableStorages } from '@/managers/SharedManager';

class LocalStorageManager {
  static setItem(key: string, data: any) {
    if (SharedManager.isStorageAvailable(AvailableStorages.localStorage)) {
      const encryptedValue = encryptData(data);
      localStorage.setItem(key, encryptedValue);
    }
  }
  static getItem(key: string) {
    if (SharedManager.isStorageAvailable(AvailableStorages.localStorage)) {
      const value = localStorage.getItem(key);
      try {
        return decryptData(value);
      } catch (e) {
        return value;
      }
    }
    return undefined;
  }
  static removeItem(key: string) {
    if (SharedManager.isStorageAvailable(AvailableStorages.localStorage)) {
      const value = this.getItem(key);
      localStorage.removeItem(key);
      return value;
    }
    return undefined;
  }
  static clear() {
    if (SharedManager.isStorageAvailable(AvailableStorages.localStorage)) {
      localStorage.clear();
    }
  }
}

export default LocalStorageManager;
