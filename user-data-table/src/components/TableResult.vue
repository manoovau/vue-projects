<template>
  <tr>
    <td>{{ user.id }}</td>
    <td>{{ user.name.firstname }}</td>
    <td>{{ user.name.lastname }}</td>
    <td>{{ user.email }}</td>
    <td>{{ user.phone }}</td>
    <td>
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
    </td>
  </tr>
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
     * Emit setEditUser event
     */
    setEditUser(): void {
      this.$emit("setEditUser", this.user);
    },
    /**
     * Emit setDeleteUser event
     */
    setDeleteUser(): void {
      this.$emit("setDeleteUser", this.user);
    },
  },
});
</script>

<style scoped lang="scss">
@use "../styles/utilities/_variables.scss" as variables;

td {
  padding: 0 0.5rem;
  line-height: 64px;

  @media (min-width: variables.$breakpoint-lg) {
    padding: 0 15px; // 0.9375rem 15px
  }
}

.btn.blue {
  margin-right: 0.5rem;
}

.btn.grey {
  margin-left: 0.5rem;
}
</style>
