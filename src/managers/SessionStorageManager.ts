//constants
import { decryptData, encryptData } from '@/constants/Helpers';
//managers
import SharedManager, { AvailableStorages } from '@/managers/SharedManager';

class SessionStorageManager {
  static setItem(key: string, data: any) {
    if (SharedManager.isStorageAvailable(AvailableStorages.sessionStorage)) {
      const encryptedValue = encryptData(data);
      sessionStorage.setItem(key, JSON.stringify(encryptedValue));
    }
  }
  static getItem(key: string) {
    if (SharedManager.isStorageAvailable(AvailableStorages.sessionStorage)) {
      const value = sessionStorage.getItem(key);
      try {
        return decryptData(value);
      } catch (e) {
        return value;
      }
    }
    return undefined;
  }
  static removeItem(key: string) {
    if (SharedManager.isStorageAvailable(AvailableStorages.sessionStorage)) {
      const value = this.getItem(key);
      sessionStorage.removeItem(key);
      return value;
    }
    return undefined;
  }
  static clear() {
    if (SharedManager.isStorageAvailable(AvailableStorages.sessionStorage)) {
      sessionStorage.clear();
    }
  }
}

export default SessionStorageManager;
