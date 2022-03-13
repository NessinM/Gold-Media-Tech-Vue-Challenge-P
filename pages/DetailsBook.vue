<template>
  <div>
    <header-navegacion class="mb-6"></header-navegacion>
    <div class="mx-auto px-6">
      <div
        class="flex items-center justify-center"
        v-if="gettersTransaction.isLoading"
      >
        <i class="fa fa-circle-notch fa-spin fa-2x mr-4"></i>
        <span class="text-xs">{{ gettersTransaction.message }}</span>
      </div>
      <div v-else>
        <div
          class="
            px-4
            flex flex-col
            items-center
            bg-white
            rounded-lg
            border
            shadow-md
            md:flex-row
            dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700
          "
        >
          <img
            class="
              object-cover
              w-full
              h-96
              rounded-t-lg
              md:h-auto md:w-80 md:rounded-none md:rounded-l-lg
            "
            :src="getterDetailsBook.urlCover"
            alt=""
          />
          <div class="flex flex-col justify-between p-4 leading-normal">
            <h5
              class="
                mb-2
                text-2xl
                font-bold
                tracking-tight
                text-gray-900
                dark:text-white
              "
            >
              {{ getterDetailsBook.title }}
            </h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {{
                getterDetailsBook.description
                  ? getterDetailsBook.description.value
                  : "Este libro no cuenta con ninguna descripcion"
              }}
            </p>
            <p
              class="
                items-center
                justify-center
                px-2
                py-1
                mr-2
                text-md
                font-bold
              "
            >
              <span class="">Fecha de creacion: </span>
              <span class="leading-none text-red-500">{{
                getterDetailsBook.created.value | parseIsoDatetime
              }}</span>
            </p>
          </div>
        </div>
        <div class="text-grey-darker hover:text-red-dark mt-5">
          <button
            v-if="showAddFavorite"
            @click="addFavorite()"
            class="
              h-8
              w-40
              text-white
              rounded-md
              bg-green-400
              hover:bg-green-500
            "
          >
            <small class="font-bold">
              <i class="fas fa-star"></i>
              Add
            </small>
          </button>
          <button
            v-if="showRemoveFavorite"
            @click="removeFavorite()"
            class="h-8 w-40 text-white rounded-md bg-red-500 hover:bg-red-600"
          >
            <small class="font-bold">
              <i class="fas fa-star"></i>
              Remove
            </small>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavbarComponent from "@/components/NavbarApp.vue";
export default {
  data() {
    return {
      showAddFavorite: false,
      showRemoveFavorite: false,
    };
  },
  components: {
    "header-navegacion": NavbarComponent,
  },
  filters: {
    parseIsoDatetime(dtstr) {
      var dt = dtstr.split(/[: T-]/).map(parseFloat);
      return new Date(
        dt[0],
        dt[1] - 1,
        dt[2],
        dt[3] || 0,
        dt[4] || 0,
        dt[5] || 0,
        0
      );
    },
  },
  computed: {
    getterKeyDetails() {
      return this.$store.getters.getKeyBookDetails;
    },
    getterDetailsBook() {
      return this.$store.getters.getBookDetails;
    },
    gettersTransaction() {
      return this.$store.getters.transaction;
    },
  },
  created() {
    if (this.$store.getters.getKeyBookDetails) {
      this.$store
        .dispatch("getDetailsBook")
        .then(() => {
          this.checkStatusFavorite();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert(`El key del libro es invalido por favor verificar`);
      this.$router.push("/books");
    }
  },
  methods: {
    addFavorite() {
      this.$store.dispatch("addFavorite", this.getterDetailsBook);
      this.checkStatusFavorite();
    },
    removeFavorite() {
      this.$store.dispatch("removeFavorite", this.getterDetailsBook);
      this.checkStatusFavorite();
    },
    checkStatusFavorite() {
      console.log("verificacion de estorag");
      const details = this.$store.getters.getBookDetails;
      const pos = this.$store.state.favorites.findIndex(
        (e) => e.key === details.key
      );
      if (pos !== -1) {
        this.showRemoveFavorite = true;
        this.showAddFavorite = false;
      } else {
        this.showAddFavorite = true;
        this.showRemoveFavorite = false;
      }
    },
  },
};
</script>
