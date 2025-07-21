/**
 * The key by which local storage values are stored
 */
enum StorageKey {
  /**
   * Authorized request token.
   */
  ACCESS_TOKEN = 'access_token',

  /**
   * Token for resuming an expired session.
   */
  REFRESH_TOKEN = 'refresh_token',
}

export default StorageKey;
