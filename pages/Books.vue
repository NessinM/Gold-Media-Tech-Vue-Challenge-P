<template>
  <div>
    <notifications class="mt-20" position="top center" />
    <header-navegacion :show-home="true" class="mb-6"></header-navegacion>
    <button
      v-if="books.length && !gettersTransaction.isLoading"
      @click="updateListBooks()"
      class="
        text-white
        mb-4
        rounded-md
        bg-blue-500
        hover:bg-blue-600
        w-40
        h-8
        ml-4
      "
    >
      <small class="font-bold">
        <i class="fas fa-sync"></i>
        UPDATE BOOK LIST
      </small>
    </button>
    <div class="mx-auto px-4 list-books">
      <div
        class="flex items-center justify-center"
        v-if="gettersTransaction.isLoading"
      >
        <i class="fa fa-circle-notch fa-spin fa-2x mr-4"></i>
        <span class="text-xs">{{ gettersTransaction.message }}</span>
      </div>
      <div v-else>
        <div
          @click="setKeyDetailsAndGoTo(l)"
          :id="'2'"
          v-for="(l, index) in books"
          :key="index"
        >
          <item-libro :item="l" :show-add-favorite="true"></item-libro>
        </div>
      </div>
    </div>
    <small
      class="mx-auto ml-4"
      v-if="books.length && !gettersTransaction.isLoading"
      >{{ books.length }} books found for this search
    </small>
  </div>
</template>
<script>
import ItemBookComponent from "@/components/ItemBook.vue";
import NavbarComponent from "@/components/NavbarApp.vue";
import { notify } from "../utils/general";
export default {
  components: {
    "item-libro": ItemBookComponent,
    "header-navegacion": NavbarComponent,
  },
  created() {
    const { filterBy, filterValue } = this.$route.query;
    if (!filterBy && !filterValue) {
      this.$router.push("/SearchBook");
      notify(
        this,
        "error",
        "Error",
        "The filter by type or the value is empty, check"
      );
    } else {
      this.$store.dispatch("setFilterBy", filterBy);
      this.$store.dispatch("setFilterValue", filterValue);
    }
  },
  computed: {
    gettersBooks() {
      return this.$store.getters.allBooks;
    },
    books() {
      return this.$store.state.books;
    },
    gettersTransaction() {
      return this.$store.getters.transaction;
    },
  },
  mounted() {
    !this.$store.state.books.length && this.updateListBooks();
  },
  methods: {
    setKeyDetailsAndGoTo(item) {
      const { key } = item;
      const vm = this;
      vm.$store.dispatch("setKeyDetailsBook", key);
      vm.$router.push({ path: "/DetailsBook", query: { key } });
    },
    updateListBooks() {
      this.$store.dispatch("setListBooks", []);
      this.$store.dispatch("getSearchBooks");
    },
  },
};
</script>
<style scoped>
.list-books {
  height: calc(100vh - 175px) !important;
  overflow-y: auto;
}
</style>
