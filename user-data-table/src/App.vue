<script lang="ts">
import { defineComponent } from "vue";

import Header from "./components/Header.vue";
import UserTable from "./components/UserTable.vue";
import Footer from "./components/Footer.vue";

export default defineComponent({
  components: {
    Header,
    UserTable,
    Footer,
  },
});
</script>

<template>
  <Header />
  <UserTable />
  <Footer />
</template>
