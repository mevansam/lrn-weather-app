/**
 * Image container class that can be modified 
 * and will also persist its state.
 */
export default class MutableImage {

  /**
   * @param {object} defaultUri  The default image uri.
   */
  constructor(defaultUri, key, store) {
    this.defaultUri = defaultUri;
    this.updateCallback = null;
  }

  /**
   * Set the persistance store to persist
   * uri changes to the image container.
   * 
   * @param {string} key          The key to identify the persisted image uri by
   * @param {LocalStorage} store  The store to persist the image uri
   */
  setPersistanceTarget(key, store) {
    this.key = key;
    this.store = store;
  }

  /**
   * @param {functoin} cb  Callback functon to call when an image is updated.
   *                       This function takes the image uri as an argument.
   */
  setUpdateCallback(cb) {
    this.updateCallback = cb
  }

  /**
   * Sets the image source uri.
   * 
   * @param {object} uri 
   */
  setUri(uri) {
    if (this.store == null) {
      console.error("Underlying persistance layer has not been initialized.");
    }

    this.store.setItem(this.key, uri)
    if (this.updateCallback != null) {
      this.updateCallback(uri)
    }
  }

  /**
   * Returns the image source uri.
   * 
   * @return {object}
   */
  getUri() {
    var uri = null;

    if (this.store != null) {
      if (this.store.isInitialized()) {
        uri = this.store.getItem(this.key);
      } else {
        // If the persistance target has been
        // set then return null until it has
        // been initialized.
        return null;
      }
    }

    if (uri == null) {
      return this.defaultUri;
    } else {
      return uri;
    }
  }
}
