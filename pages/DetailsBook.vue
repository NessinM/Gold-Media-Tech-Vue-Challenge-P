<template>
  <div>
    <notifications class="mt-20" position="top center" />
    <header-navegacion
      :show-home="true"
      :show-back="true"
      class="mb-6"
    ></header-navegacion>
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
              <span class="">Creation date: </span>
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
              ADD
            </small>
          </button>
          <button
            v-if="showRemoveFavorite"
            @click="removeFavorite()"
            class="h-8 w-40 text-white rounded-md bg-red-500 hover:bg-red-600"
          >
            <small class="font-bold">
              <i class="fas fa-star"></i>
              REMOVE
            </small>
          </button>
          <button
            @click="getDetailsBook()"
            class="
              h-8
              w-40
              text-white
              rounded-md
              bg-blue-500
              hover:bg-blue-600
              ml-3
            "
          >
            <small class="font-bold">
              <i class="fas fa-sync"></i>
              UPDATE DETAILS
            </small>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavbarComponent from "@/components/NavbarApp.vue";
import { notify } from "../utils/general";
export default {
  components: {
    "header-navegacion": NavbarComponent,
  },
  created() {
    const { key } = this.$route.query;
    if (!key) {
      notify(
        this,
        "error",
        "Error",
        "The book key is invalid please verify"
      );
      this.$router.push("/books");
    } else {
      this.$store.dispatch("setKeyDetailsBook", key);
      if (this.$store.getters.getKeyBookDetails) {
        this.getDetailsBook();
      } else {
        notify(
          this,
          "error",
          "Error",
          "The book key is invalid please verify"
        );
        this.$router.push("/books");
      }
    }
  },
  data() {
    return {
      showAddFavorite: false,
      showRemoveFavorite: false,
    };
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
  methods: {
    checkBookInList(callback) {
      const existe = this.$store.getters.allBooks.findIndex(
        (e) => e.key === this.$store.getters.getKeyBookDetails
      );
      if (existe !== -1) {
        callback(null, this.$store.getters.allBooks[existe]);
      } else {
        callback(
          new Error(
            "Este libro no se encuentra en el store, se tiene que programar un get para traer la data y recien guardarlo en el store de favoritos"
          )
        );
      }
    },
    addFavorite() {
      this.checkBookInList((err, dataBook) => {
        if (err) {
          notify(this, "error", "Error", err);
        } else {
          this.$store
            .dispatch("addFavorite", dataBook)
            .then(() => {
              notify(
                this,
                "success",
                "Exito",
                `The book ${this.getterDetailsBook.title} was added to favorites`
              );
              this.checkStatusFavorite();
            })
            .catch((error) => {
              notify(this, "error", "Error", error);
            });
        }
      });
    },
    removeFavorite() {
      this.$store
        .dispatch("removeFavorite", this.getterDetailsBook)
        .then(() => {
          notify(
            this,
            "success",
            "Exito",
            `The book ${this.getterDetailsBook.title} was removed from favorites`
          );
          this.checkStatusFavorite();
        })
        .catch((error) => {
          notify(this, "error", "Error", error);
        });
    },
    checkStatusFavorite() {
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
    getDetailsBook() {
      this.$store
        .dispatch("getDetailsBook")
        .then(() => {
          this.checkStatusFavorite();
        })
        .catch((err) => {
          this.$router.push("/books");
        });
    },
  },
};
</script>
