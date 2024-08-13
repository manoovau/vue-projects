<template>
  <div class="table-container">
    <h2 class="table-title">User Table</h2>
    <button class="btn pill green" @click="setAddUser">Add user</button>
    <input
      type="email"
      v-model="emailFilter"
      placeholder="Search email:"
      class="email-search"
      aria-label="Filter by email"
    />
    <div class="sort-user-data">
      <label for="sort-select">Sort users by: </label>
      <select
        id="sort-select"
        v-model="selected"
        @change="sortContainer($event)"
      >
        <option
          v-for="(option, optionIndex) in sortContainerArr"
          :value="optionIndex"
        >
          {{ option.name }} {{ optionIndex % 2 === 0 ? "\u2191" : "\u2193" }}
        </option>
      </select>
    </div>

    <ContainerResult
      v-for="(item, itemIndex) in filterUser"
      :key="itemIndex"
      :user="item"
      @setDeleteUser="setDeleteUser"
      @setEditUser="setEditUser"
    />
    <table class="user-table">
      <thead>
        <tr>
          <th v-for="(field, fieldIndex) in tableFields">
            {{ field.name }}

            <button
              v-on:click="sortTable(fieldIndex)"
              :aria-label="'Sort users by: ' + field.name"
              class="btn-sort"
            >
              <font-awesome-icon icon="fa-solid fa-sort" class="icon-sort" />
            </button>
          </th>

          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <TableResult
          v-for="(item, itemIndex) in filterUser"
          :key="itemIndex"
          :user="item"
          @setDeleteUser="setDeleteUser"
          @setEditUser="setEditUser"
        />
      </tbody>
    </table>
  </div>

  <DeleteConfirmation
    v-if="isUserDelete"
    :user="selectedUser"
    :api_url="API_URL"
    @remove="remove"
    @closeDelModal="closeDelModal"
  />
  <EditUser
    v-if="isUserEdit"
    :user="selectedUser"
    :api_url="API_URL"
    @edit="edit"
    @closeEditModal="closeEditModal"
  />
  <AddUser
    v-if="isUserAdd"
    :user="addedUser"
    :api_url="API_URL"
    @add="add"
    @closeAddModal="closeAddModal"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AddUser from "./AddUser.vue";
import DeleteConfirmation from "./DeleteConfirmation.vue";
import EditUser from "./EditUser.vue";
import ContainerResult from "./ContainerResult.vue";
import TableResult from "./TableResult.vue";

import "../styles/utilities/_variables.scss";

interface IUser {
  id: number;
  email: string;
  name: {
    firstname: string;
    lastname: string;
  };
  phone: string;
}

interface IIndexContainer {
  value: number;
  indexSort: number;
}

export default defineComponent({
  components: {
    TableResult,
    ContainerResult,
    DeleteConfirmation,
    EditUser,
    AddUser,
  },

  data() {
    return {
      API_URL: "https://fakestoreapi.com/users",
      APIUserDB: [] as IUser[],
      selectedUser: {} as IUser,
      isUserDelete: false,
      isUserEdit: false,
      addedUser: {
        id: 0,
        name: { firstname: "", lastname: "" },
        email: "",
        phone: "",
      },
      addUserCounter: 0,
      isUserAdd: false,
      apiError: "",
      emailFilter: "",
      isSortAsc: true,
      indexSort: 10,
      tableFields: [
        { name: "User ID" },
        { name: "First Name" },
        { name: "Last Name" },
        { name: "E-mail" },
        { name: "Phone number" },
      ],
      sortContainerArr: [] as { name: string }[],
      selected: 0,
    };
  },
  mounted() {
    /**
     * Get information from API
     */
    fetch(this.API_URL)
      .then((res) => res.json())
      .then((json) => {
        this.APIUserDB = json;
      })
      .catch((err) => console.error(err.message));

    this.tableFields.map((item) => {
      this.sortContainerArr.push({ name: item.name });
      this.sortContainerArr.push({ name: item.name });
    });
  },
  methods: {
    /**
     * Open "DeleteConfirmation" Modal Component
     * Set selectedUser variable
     */
    setDeleteUser(user: IUser): void {
      this.isUserDelete = true;
      this.isUserEdit = false;
      this.isUserAdd = false;
      this.selectedUser = user;

      document.body.classList.add("modal-open");
    },
    /**
     * Open "EditUser" Modal Component
     * Set selectedUser variable
     */
    setEditUser(user: IUser): void {
      this.isUserEdit = true;
      this.isUserDelete = false;
      this.isUserAdd = false;
      this.selectedUser = user;

      document.body.classList.add("modal-open");
    },
    /**
     * Open "AddUser" Modal Component
     */
    setAddUser(): void {
      this.isUserAdd = true;
      this.isUserDelete = false;
      this.isUserEdit = false;

      document.body.classList.add("modal-open");
    },
    /**
     * Close "DeleteConfirmation" Modal Component
     * Set selectedUser variable to default value
     */
    closeDelModal(): void {
      this.isUserDelete = false;
      this.selectedUser = {} as IUser;
      document.body.classList.remove("modal-open");
    },
    /**
     * Close "EditUser" Modal Component
     * Set selectedUser variable to default value
     */
    closeEditModal(): void {
      this.isUserEdit = false;
      this.selectedUser = {} as IUser;
      document.body.classList.remove("modal-open");
    },
    /**
     * Close "AddUser" Modal Component
     * Set addedUser variable to default value
     */
    closeAddModal(): void {
      this.isUserAdd = false;
      this.addedUser = {
        id: 0,
        name: { firstname: "", lastname: "" },
        email: "",
        phone: "",
      };
      document.body.classList.remove("modal-open");
    },
    /**
     * Close "DeleteConfirmation" Modal Component
     * Delete user input in local DataBase.
     */
    remove(user: IUser): void {
      this.APIUserDB.splice(this.APIUserDB.indexOf(user), 1);

      this.closeDelModal();
    },
    /**
     * Close "EditUser" Modal Component
     */
    edit(): void {
      this.closeEditModal();
    },
    /**
     * Add user input in local DataBase
     * and close "AddUser" Modal Component
     */
    add(): void {
      // As API does not save new user, addUserCounter is created

      // Identified an error in the API
      // Sometimes API returns 1 instead of the last ID
      // Check if ID is correct
      if (this.addedUser.id !== this.APIUserDB.length + 1) {
        console.error(
          `API error. ID response value: ${this.addedUser.id} is not the last ID.`
        );
        console.log("User added to local database.");
        this.addedUser.id = this.filterUser.length + 1;
      } else {
        this.addedUser.id = this.addedUser.id + this.addUserCounter;
      }
      this.filterUser.push(this.addedUser);
      this.closeAddModal();
      this.addUserCounter++;
    },
    /**
     * Sort Users in local Database
     */
    sortData(index: number): void {
      this.filterUser.sort((a, b) => {
        let valueA: string | undefined;
        let valueB: string | undefined;

        if (index === 0) {
          if (this.isSortAsc) {
            return a.id - b.id;
          } else {
            return b.id - a.id;
          }
        } else if (index === 1) {
          valueA = a.name.firstname.toUpperCase();
          valueB = b.name.firstname.toUpperCase();
        } else if (index === 2) {
          valueA = a.name.lastname.toUpperCase();
          valueB = b.name.lastname.toUpperCase();
        } else if (index === 3) {
          valueA = a.email.toUpperCase();
          valueB = b.email.toUpperCase();
        } else if (index === 4) {
          valueA = a.phone.toUpperCase();
          valueB = b.phone.toUpperCase();
        } else {
          // Handle other cases where index is not one of the predefined values
          // For example, if the index is invalid, just return 0
          valueA = "";
          valueB = "";
        }

        if (this.isSortAsc) {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      });

      this.$forceUpdate();
    },
    /**
     * Prepare conditions for sort data in "TableResult" Component
     */
    sortTable(index: number): void {
      if (index !== this.indexSort) this.isSortAsc = true;

      this.sortData(index);

      this.isSortAsc = !this.isSortAsc;
      this.indexSort = index;
    },
    /**
     * Prepare conditions for sort data in "ContainerResult" Component
     */
    sortContainer(event: Event): void {
      // Set default value
      this.indexSort = 10;
      let indexContainerArr: IIndexContainer[] = [];
      let i = 1;
      let counter = 1;
      // Set indexSort for each field
      this.sortContainerArr.map((_, index) => {
        if (index === 0) {
          indexContainerArr.push({ value: index, indexSort: 0 });
        } else {
          indexContainerArr.push({ value: index, indexSort: index - counter });

          i++;
          if (i === 3) {
            i = 1;
            counter++;
          }
        }
      });

      // Set sort direction
      if ((event.target as HTMLSelectElement).selectedIndex % 2 === 1) {
        this.isSortAsc = false;
      } else {
        this.isSortAsc = true;
      }
      let indexS = indexContainerArr.find(
        (item) => item.value === this.selected
      );

      if (indexS) {
        this.sortData(indexS.indexSort);
      }
    },
  },

  computed: {
    /**
     * Filter data by email input
     */
    filterUser(): IUser[] {
      return this.APIUserDB.filter((user) => {
        return user.email.includes(this.emailFilter);
      });
    },
  },
});
</script>

<style scoped lang="scss">
@use "../styles/utilities/_variables.scss" as variables;

thead {
  font-weight: 700;
  line-height: 49px;
}

tbody {
  font-weight: 500;
  td {
    padding: 0;
  }
}

tbody tr:nth-child(odd) {
  background-color: variables.$grey-light;
}

.email-search {
  align-self: start;
  border-radius: 48px;
  border: solid 1px variables.$text-light;
  color: variables.$text-secondary;
  font-size: 0.75rem;
  margin-bottom: 0.75rem;
  min-height: 2rem;
  padding: 0 0.5rem;
  width: calc(100% - 1rem); // 1rem x axis is the padding

  &:focus,
  &:active {
    border-color: variables.$text-secondary;
    box-shadow: none;
  }

  &::placeholder {
    color: variables.$text-light;
  }

  @media (min-width: variables.$breakpoint-sm) {
    align-self: end;
    margin-bottom: 1rem;
    width: 150px;
  }
}

.btn-sort {
  background: none;
  border: none;
  padding: 0;
}

.icon-sort {
  cursor: pointer;
  color: variables.$text-secondary;
}

.table-container {
  display: flex;
  flex-direction: column;
  justify-content: left;
  padding: 0 2.5rem;
  width: 100%;
}

.table-title {
  align-self: start;
  font-size: 1.75rem;
  font-weight: 400;
}

.user-table {
  display: none;
  font-size: 0.875rem;
  margin-bottom: 6rem;
  width: 100%;

  @media (min-width: 768px) {
    display: table;
  }
}

.sort-user-data {
  align-items: center;
  color: variables.$text-primary;
  display: flex;
  font-size: 0.875rem;
  justify-content: end;
  margin-bottom: 1rem;

  @media (min-width: variables.$breakpoint-md) {
    display: none;
  }

  select {
    border: solid 1px variables.$text-secondary;
    font-size: 0.75rem;
    padding: 0.25rem;

    &:active,
    &:focus {
      box-shadow: none !important;
    }
  }

  label {
    margin-right: 0.25rem;
  }
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
