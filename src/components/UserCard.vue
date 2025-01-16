<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type { User } from '../stores/userStore'

export default defineComponent({
  props: {
    /**
     * User data to display on card.
     * @type {User}
     */
    user: {
      type: Object as PropType<User>,
      required: true,
    },
  },
})
</script>

<template>
  <div class="user-card">
    <img :src="user.picture" alt="User photo" class="user-photo" />
    <div class="user-details">
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-card {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  margin-bottom: 1rem;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  }

  .user-photo {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 1rem;
    border: 2px solid #e0e0e0;
  }

  .user-details {
    h3 {
      margin: 0;
      font-size: 1.2rem;
      color: #333;
    }

    p {
      margin: 0;
      font-size: 1rem;
      color: #666;
    }
  }
}

@media (max-width: 768px) {
  .user-card {
    padding: 0.5rem;
  }
}
</style>
