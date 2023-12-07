import AsyncStorage from "@react-native-async-storage/async-storage";

type StorageKey = string;

export interface StorageManager {
  save: <T>(key: StorageKey, data: T) => Promise<void>;
  fetch: <T>(key: StorageKey) => Promise<T | null>;
  delete: (key: StorageKey) => Promise<void>;
}

const storage: StorageManager = {
  save: async <T>(key: StorageKey, data: T): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
      console.log(`Data saved successfully for key: ${key}`);
    } catch (error) {
      console.error(`Error saving data for key ${key}:`, error);
    }
  },

  fetch: async <T>(key: StorageKey): Promise<T | null> => {
    try {
      const rawData = await AsyncStorage.getItem(key);
      if (rawData !== null) {
        return JSON.parse(rawData);
      } else {
        console.log(`No data found for key: ${key}`);
        return null;
      }
    } catch (error) {
      console.error(`Error retrieving data for key ${key}:`, error);
      return null;
    }
  },

  delete: async (key: StorageKey): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
      console.log(`Data deleted successfully for key: ${key}`);
    } catch (error) {
      console.error(`Error deleting data for key ${key}:`, error);
    }
  },
};

export default storage;
