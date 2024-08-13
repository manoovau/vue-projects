<template>
  <div class="user-data">
    <div class="data-container">
      <div><span class="user-id-title">User ID: </span>#{{ user.id }}</div>
      <div>
        {{ user.name.firstname }} <span>{{ user.name.lastname }}</span>
      </div>
      <div>{{ user.email }}</div>
      <div>{{ user.phone }}</div>
    </div>
    <div class="buttons-container">
      <button
        @click="setEditUser"
        :aria-label="
          'Edit user: ' + user.name.firstname + ' ' + user.name.lastname
        "
        class="btn pill blue"
      >
        Edit</button
      ><button
        @click="setDeleteUser"
        :aria-label="
          'Delete user: ' + user.name.firstname + ' ' + user.name.lastname
        "
        class="btn pill grey"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    /**
     * Emits setEditUser event
     */
    setEditUser(): void {
      this.$emit("setEditUser", this.user);
    },
    /**
     * Emits setDeleteUser event
     */
    setDeleteUser(): void {
      this.$emit("setDeleteUser", this.user);
    },
  },
});
</script>

<style scoped lang="scss">
@use "../styles/utilities/_variables.scss" as variables;

.user-data {
  display: flex;
  width: 100%;
  justify-content: space-between;
  @media (min-width: variables.$breakpoint-md) {
    display: none;
  }
}

.user-data:not(:last-of-type) {
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: solid 1px variables.$grey-standard;
}

.data-container {
  text-align: left;
  line-height: 1.5rem;
}

.buttons-container {
  display: flex;
  flex-direction: column;
}

.user-id-title {
  font-weight: 600;
}

.btn.pill.green {
  align-self: end;
  max-width: fit-content;
  margin-bottom: 1rem;
}

.btn.pill.blue {
  margin-bottom: 0.5rem;
}
</style>
