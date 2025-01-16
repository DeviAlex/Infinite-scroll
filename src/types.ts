export interface User {
  id: string // Identifier for user
  name: string // Full name of user
  email: string // Email of user
  picture: string // URL to user's avatar
}

export interface ApiUser {
  /**
   * User's identifier information.
   */
  login: {
    /**
     * Universally unique identifier (UUID) for user.
     * @type {string}
     */
    uuid: string
  }

  /**
   * User's name information.
   */
  name: {
    /**
     * User's first name.
     * @type {string}
     */
    first: string

    /**
     * User's last name.
     * @type {string}
     */
    last: string
  }

  /**
   * User's email address.
   * @type {string}
   */
  email: string

  /**
   * User's picture URLs.
   */
  picture: {
    /**
     * URL to user's thumbnail-sized picture.
     * @type {string}
     */
    thumbnail: string
  }
}
