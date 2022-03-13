<template>
  <div>
    <header-navegacion class="mb-6"></header-navegacion>
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
export default {
  components: {
    "item-libro": ItemBookComponent,
    "header-navegacion": NavbarComponent,
  },
  created() {
    if (!this.$store.getters.filterBy || !this.$store.getters.filterValue) {
      alert("El filterBy o el filterValue se encuentra vacio, verificar");
      this.$router.push("/SearchBook");
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
    this.updateListBooks();
    // if (!this.$store.getters.allBooks.length) {
    //   this.updateListBooks();
    // }
  },
  methods: {
    setKeyDetailsAndGoTo(item) {
      const { key } = item;
      const vm = this;
      vm.$store.dispatch("setKeyDetailsBook", key);
      vm.$router.push("/DetailsBook");
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
