<template>
  <div @keyup.esc="closeAddModal" class="modal-container">
    <div class="modal">
      <button
        @click="closeAddModal"
        class="btn-close-modal"
        aria-label="Close Add User modal"
      >
        <font-awesome-icon
          icon="fa-solid fa-xmark"
          size="xl"
          style="color: #707b87"
        />
      </button>
      <h3 class="modal-title">Add user</h3>
      <form>
        <div class="input-container">
          <label v-if="focusedFirstName || firstname.length > 0">
            First name
          </label>
          <input
            id="firstname-input"
            class="first-name"
            type="text"
            v-model="firstname"
            v-focus
            aria-label="First name"
            :class="{ 'error-input': firstnameError }"
            :placeholder="focusedFirstName ? '' : 'First name'"
            @keydown.enter.prevent
            @focus="focusedFirstName = true"
            @blur="focusedFirstName = false"
          />
          <div v-if="firstnameError" class="error-message">
            {{ firstnameError }}
          </div>
        </div>
        <div class="input-container">
          <label v-if="focusedLasttName || lastname.length > 0">
            Last name
          </label>
          <input
            id="lastname-input"
            class="last-name"
            type="text"
            v-model="lastname"
            aria-label="Last name"
            :class="{ 'error-input': lastnameError }"
            :placeholder="focusedLasttName ? '' : 'Last name'"
            @keydown.enter.prevent
            @focus="focusedLasttName = true"
            @blur="focusedLasttName = false"
          />
          <div v-if="lastnameError" class="error-message">
            {{ lastnameError }}
          </div>
        </div>
        <div class="input-container">
          <font-awesome-icon icon="fa-regular fa-envelope" class="icon-mail" />
          <label v-if="focusedEmail || email.length > 0"> Email </label>
          <input
            id="email-input"
            class="input-with-icon"
            type="email"
            v-model="email"
            aria-label="Email"
            :class="{ 'error-input': emailError }"
            :placeholder="focusedEmail ? '' : 'Email'"
            @keydown.enter.prevent
            @focus="focusedEmail = true"
            @blur="focusedEmail = false"
          />
          <div v-if="emailError" class="error-message">{{ emailError }}</div>
        </div>
        <div class="input-container">
          <label v-if="focusedPhoneNumber || phoneNumber.length > 0">
            Phone
          </label>
          <input
            id="phone-input"
            type="number"
            v-model="phoneNumber"
            aria-label="Phone number"
            :class="{ 'error-input': phoneNumberError }"
            :placeholder="focusedPhoneNumber ? '' : 'Phone number'"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="11"
            @keydown.enter.prevent
            @focus="focusedPhoneNumber = true"
            @blur="focusedPhoneNumber = false"
          />
          <div v-if="phoneNumberError" class="error-message">
            {{ phoneNumberError }}
          </div>
        </div>
        <button
          id="save-btn"
          type="button"
          class="btn navy confirm-delete"
          aria-label="Save changes"
          @click="add"
        >
          Save >
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface IUser {
  id: number;
  email: string;
  name: {
    firstname: string;
    lastname: string;
  };
  phone: string;
}

export default defineComponent({
  data() {
    return {
      firstname: "",
      firstnameError: "",
      inputTextmin: 3,
      lastname: "",
      lastnameError: "",
      email: "",
      emailError: "",
      phoneNumber: "",
      phoneNumberError: "",
      phoneNumberLen: 11,
      focusedFirstName: false,
      focusedLasttName: false,
      focusedEmail: false,
      focusedPhoneNumber: false,
      errorText: "",
      userNoAddedText: "",
      updateObject: {
        email: "",
        name: {
          firstname: "",
          lastname: "",
        },
        phone: "",
      } as IUser,
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
     * Emit closeAddModal event
     */
    closeAddModal(): void {
      this.$emit("closeAddModal");
    },
    /**
     * Set values to inital value (default values)
     */
    resetValues(): void {
      this.firstname = "";
      this.firstnameError = "";
      this.lastname = "";
      this.lastnameError = "";
      this.email = "";
      this.emailError = "";
      this.phoneNumber = "";
      this.phoneNumberError = "";
      this.errorText = "";
      this.userNoAddedText = "";
      this.updateObject = {
        email: "",
        name: {
          firstname: "",
          lastname: "",
        },
        phone: "",
      } as IUser;
    },
    /**
     * Validate form inputs
     * Create object to send to API
     * Send object to the API
     * Add object in local DataBase.
     */
    add(): void {
      // Validate first name input
      this.firstnameError =
        this.firstname.length !== 0 &&
        this.firstname.length > this.inputTextmin - 1
          ? ""
          : `First Name should have at least ${this.inputTextmin} characters`;

      // Validate last name input
      this.lastnameError =
        this.lastname.length !== 0 &&
        this.lastname.length > this.inputTextmin - 1
          ? ""
          : `Last Name should have at least ${this.inputTextmin} characters`;

      // Validate email input
      this.emailError =
        this.email.length !== 0 &&
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)
          ? ""
          : this.email.length === 0
          ? "Please, fill email"
          : "Invalid format";

      // Validate phone number input
      this.phoneNumberError =
        this.phoneNumber.toString().length < this.phoneNumberLen ||
        this.phoneNumber.toString().length === 0 ||
        this.phoneNumber.toString().length > this.phoneNumberLen
          ? `Phone number should have ${this.phoneNumberLen} digits`
          : this.phoneNumber.toString()[0] !== "1" &&
            this.phoneNumber.toString().length !== 0
          ? "Please, add a US telephone number"
          : "";

      // Create API object
      if (
        this.firstnameError === "" &&
        this.lastnameError === "" &&
        this.emailError === "" &&
        this.phoneNumberError === ""
      ) {
        // Set first name value
        if (this.firstnameError === "" && this.firstname.length > 0)
          this.updateObject.name.firstname = this.firstname;

        //set last name value
        if (this.lastnameError === "" && this.lastname.length > 0)
          this.updateObject.name.lastname = this.lastname;

        // Set email value
        if (this.emailError === "" && this.email.length > 0)
          this.updateObject.email = this.email;

        // Set phone number
        if (
          this.phoneNumberError === "" &&
          this.phoneNumber.toString().length > 0
        )
          this.updateObject.phone =
            this.phoneNumber.toString().slice(0, 1) +
            "-" +
            this.phoneNumber.toString().slice(1, 4) +
            "-" +
            this.phoneNumber.toString().slice(4, 7) +
            "-" +
            this.phoneNumber.toString().slice(7);

        fetch(`${this.api_url}`, {
          method: "POST",
          body: JSON.stringify(this.updateObject),
        })
          .then((res) => res.json())
          .then((json) => {
            console.log("Added:");
            console.log(this.updateObject);
            console.log("RESPONSE API ");
            console.log(json);
            // Set id value
            this.user.id = json.id;
            // Set first name value
            this.user.name.firstname = this.updateObject.name.firstname;
            //set last name value
            this.user.name.lastname = this.updateObject.name.lastname;
            // Set email value
            this.user.email = this.updateObject.email;
            // Set phone number
            this.user.phone = this.updateObject.phone;

            this.$emit("add", this.user);
            this.resetValues();
          })
          .catch((err) => {
            this.errorText = err.message;
            this.userNoAddedText = `User not added. ${err.message}`;
            console.error(this.userNoAddedText);
            this.resetValues();
          });
      }
    },
  },
});
</script>

<style scoped lang="scss">
@use "../styles/utilities/_variables.scss" as variables;

.btn {
  width: 100%;
}
</style>
