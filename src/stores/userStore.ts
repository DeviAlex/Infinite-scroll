import { defineStore } from 'pinia'
import type { User, ApiUser } from '../types'

/**
 * Pinia store for managing user data.
 */
export const useUserStore = defineStore('userStore', {
  state: () => ({
    /**
     * Array of users displayed in list.
     * @type {User[]}
     */
    users: [] as User[],

    /**
     * Current page number for fetching data from API.
     * @type {number}
     */
    page: 1,

    /**
     * Loading flag indicating whether data is being fetched.
     * @type {boolean}
     */
    loading: false,
  }),
  actions: {
    /**
     * Fetches users from API and appends them to current list.
     *
     * @async
     * @returns {Promise<void>} Promise that resolves when data fetching is complete.
     */
    async fetchUsers(): Promise<void> {
      if (this.loading) return

      this.loading = true
      try {
        /**
         * Fetches list of random users from RandomUser API.
         * @type {Response}
         */
        const response = await fetch(`https://randomuser.me/api/?page=${this.page}&results=10`)
        const data = await response.json()

        /**
         * Converts fetched API data into User interface structure.
         * @type {User[]}
         */
        const newUsers: User[] = data.results.map((user: ApiUser) => ({
          id: user.login.uuid,
          name: `${user.name.first} ${user.name.last}`,
          email: user.email,
          picture: user.picture.thumbnail,
        }))

        // Append new users to existing list
        this.users = [...this.users, ...newUsers]

        // Increment page for next fetch
        this.page++
      } catch (error) {
        console.error('Failed to fetch users:', error)
      } finally {
        this.loading = false
      }
    },
  },
})
