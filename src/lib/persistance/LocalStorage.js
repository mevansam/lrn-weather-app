import { AsyncStorage } from 'react-native';

let queue = Promise.resolve();

/**
 * Saves map of key/values to application's persisted store.
 * 
 * @param {string} k 
 * @param {object} v 
 */
const queueSetItem = async (k, v) => {
  await queue;

  queue = AsyncStorage.setItem(k, JSON.stringify(v), e => e && console.warn('QUEUE', e));
  console.log("Store '" + k + "' saved.")
};

/**
 * In-Memory storage backed up by React Native's AsyncStorage. 
 */
class MemoryStorage {

  /**
   * Creates and instance of the store
   *
   * @param {string} id  A unique ID that identifies property map 
   *                     persisted by this storage instance.
   */
  constructor(id) {
    if (id == null) {
      console.error("Store ID cannot be null.");
    }

    this.id = id;
    this.initialized = false;
    this.obj = {};
  }

  /**
   * Synchronizes this MemoryStorage with React Native's AsyncStorage
   */
  async init() {
    await new Promise((resolve, reject) => {
      AsyncStorage.getItem(this.id, (e, r) => {

        if (e) {
          reject(e);
        } else {
          this.obj = r ? JSON.parse(r) : this.obj;

          console.log("Initialized store '" + this.id + "': ", this.obj);

          this.initialized = true;
          resolve(this.obj);
        }
      });
    });
  }

  /**
   * @returns {boolean}  Returns if the store has been loaded 
   *                     from the persitance layer.
   */
  isInitialized() {
    return this.initialized;
  }

  /**
   * @param {string}    key       The key to notify on. If the key is '*' or null then
   *                              the callback will be called for any key value change.
   * @param {function}  callback  The callback function to register for notifications
   *                              when an item has been added, deleted or changed. It 
   *                              should be declared as 'function(key, value, action)'
   *                              where will be one of 0 (ADDED), 1 (DELETED), or 
   *                              2 (CHANGED).
   */
  registerChangeListener(key, callback) {

  }

  /**
   * Stores an item in the local storage
   *
   * @param {string} key 
   * @param {string} value 
   * @returns {string}
   */
  setItem(key, value) {
    console.log("SET", key);
    this.obj[key] = value;

    queueSetItem(this.id, this.obj);

    return this.obj[key];
  }

  /**
   * Retrieves an item from the local storage
   *
   * @param {string} key 
   * @returns {string}
   */
  getItem(key) {
    console.log("GET", key);
    return Object.prototype.hasOwnProperty.call(this.obj, key) ? this.obj[key] : undefined;
  }

  /**
   * Removes an item from local storage
   *
   * @param {string} key 
   */
  removeItem(key) {
    console.log("REMOVE", key);
    delete this.obj[key];

    queueSetItem(this.id, this.obj);
    return true;
  }

  /**
   * Clears the app local storage
   */
  clear() {
    AsyncStorage.clear(this.id, console.log);
    this.obj = {};
  }
}

export default MemoryStorage;
