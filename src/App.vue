<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useUserStore } from './stores/userStore'
import UserCard from './components/UserCard.vue'

export default defineComponent({
  components: {
    UserCard,
  },
  setup() {
    // Pinia store instance for user data
    const userStore = useUserStore()

    /**
     * DOM reference to scrollable user list container.
     * @type {Ref<HTMLElement | null>}
     */
    const userList = ref<HTMLElement | null>(null)

    /**
     * Scroll event handler to check if user scrolled to bottom
     * and fetch more users.
     */
    const onScroll = (): void => {
      if (
        userList.value &&
        userList.value.scrollHeight - (userList.value.scrollTop + userList.value.clientHeight) < 50
      ) {
        userStore.fetchUsers()
      }
    }

    onMounted(() => {
      userStore.fetchUsers() // Fetch initial users
      userList.value?.addEventListener('scroll', onScroll) // Attach scroll event listener
    })

    return { userStore, userList }
  },
})
</script>

<template>
  <div class="app">
    <div class="user-list" ref="userList">
      <UserCard v-for="user in userStore.users" :key="user.id" :user="user" />
    </div>
    <div v-if="userStore.loading" class="loading"></div>
  </div>
</template>

<style lang="scss">
.app {
  padding: 2rem;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .user-list {
    height: calc(100vh - 4rem);
    overflow-y: auto;
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    padding: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .loading {
    cursor: progress;
    background: rgba(66, 119, 183, 0.1);
    position: fixed;
    z-index: 9001;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
}

@media (max-width: 768px) {
  .app {
    .user-list {
      padding: 0.5rem;
    }
  }
}
</style>
