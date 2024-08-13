<template>
  <div @keyup.esc="closeDelModal" class="modal-container">
    <div class="modal">
      <button
        @click="closeDelModal"
        class="btn-close-modal"
        aria-label="Close Delete User modal"
      >
        <font-awesome-icon
          icon="fa-solid fa-xmark"
          size="xl"
          style="color: #707b87"
        />
      </button>
      <h3 class="modal-title">Delete?</h3>
      <p class="modal-text">
        Are you sure you want to delete username {{ user.name.firstname }}
        {{ user.name.lastname }}
        ?
      </p>
      <button
        @click="remove"
        v-focus
        :aria-label="
          'Confirm deletion of user: ' +
          user.name.firstname +
          ' ' +
          user.name.lastname
        "
        class="btn garnet confirm-delete"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      errorText: "",
      userNoDeletedText: "",
    };
  },
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
    api_url: String,
  },
  methods: {
    /**
     * Send object to the API
     * Delete object in local DataBase.
     */
    remove(): void {
      fetch(`${this.api_url}/${this.user.id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((json) => {
          console.log("Deleted:");
          console.log(json);
          this.errorText = "";
          this.$emit("remove", this.user);
        })
        .catch((err) => {
          this.errorText = err.message;
          this.userNoDeletedText = `User not updated. ${this.errorText}`;
          console.error(this.userNoDeletedText);
        });
    },
    /**
     * Emit closeDelModal event
     */
    closeDelModal() {
      this.$emit("closeDelModal");
    },
  },
});
</script>
