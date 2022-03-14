<template>
  <section class="min-h-screen flex flex-col">
    <header-navegacion></header-navegacion>

    <div class="flex flex-1 items-center justify-center bg-gray-200">
      <div
        class="
          rounded-lg
          sm:border-2
          px-4
          lg:px-24
          py-16
          lg:max-w-xl
          sm:max-w-md
          w-full
          text-center
        "
      >
        <div class="text-center">
          <div class="flex">
            <div class="relative shadow-md">
              <div class="absolute top-4 left-3">
                <i class="fa fa-search"></i>
              </div>
              <input
                type="text"
                ref="searchText"
                @keyup.enter="setFiltersGoListPage()"
                class="
                  h-14
                  w-96
                  pl-10
                  pr-20
                  rounded-lg
                  z-0
                  shadow
                  focus:outline-none
                "
                v-model="filterValue"
                :placeholder="`Search books by ${filterBy}`"
              />
              <div class="absolute top-2 right-2">
                <button
                  @click="setFiltersGoListPage()"
                  class="
                    h-10
                    w-20
                    text-white
                    rounded-lg
                    bg-red-500
                    hover:bg-red-600
                  "
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div class="flex my-5">
            <div class="mx-2 form-check">
              <input
                v-model="filterBy"
                class="
                  form-check-input
                  rounded-full
                  h-4
                  w-4
                  border border-gray-300
                  bg-white
                  checked:bg-blue-600 checked:border-blue-600
                  focus:outline-none
                  transition
                  duration-200
                  mt-1
                  align-top
                  bg-no-repeat bg-center bg-contain
                  float-left
                  mr-2
                  cursor-pointer
                "
                type="radio"
                name="title"
                id="flexRadioDefault1"
                value="title"
              />
              <label
                class="
                  form-check-label
                  inline-block
                  text-gray-800
                  cursor-pointer
                "
                for="flexRadioDefault1"
              >
                Title
              </label>
            </div>
            <div class="mx-2 form-check">
              <input
                v-model="filterBy"
                class="
                  form-check-input
                  rounded-full
                  h-4
                  w-4
                  border border-gray-300
                  bg-white
                  checked:bg-blue-600 checked:border-blue-600
                  focus:outline-none
                  transition
                  duration-200
                  mt-1
                  align-top
                  bg-no-repeat bg-center bg-contain
                  float-left
                  mr-2
                  cursor-pointer
                "
                type="radio"
                name="author"
                id="flexRadioDefault2"
                value="author"
              />
              <label
                class="
                  form-check-label
                  inline-block
                  text-gray-800
                  cursor-pointer
                "
                for="flexRadioDefault2"
              >
                Author
              </label>
            </div>
            <div class="mx-2 form-check">
              <input
                v-model="filterBy"
                class="
                  form-check-input
                  rounded-full
                  h-4
                  w-4
                  border border-gray-300
                  bg-white
                  checked:bg-blue-600 checked:border-blue-600
                  focus:outline-none
                  transition
                  duration-200
                  mt-1
                  align-top
                  bg-no-repeat bg-center bg-contain
                  float-left
                  mr-2
                  cursor-pointer
                "
                type="radio"
                name="subject"
                id="flexRadioDefault3"
                value="subject"
              />
              <label
                class="
                  form-check-label
                  inline-block
                  text-gray-800
                  cursor-pointer
                "
                for="flexRadioDefault3"
              >
                Subject
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import NavbarComponent from "@/components/NavbarApp.vue";
import { notify } from "../utils/general";
export default {
  components: {
    "header-navegacion": NavbarComponent,
  },
  computed: {
    filterBy: {
      get() {
        return this.$store.getters.filterBy;
      },
      set(value) {
        this.$refs.searchText.focus();
        this.$store.dispatch("setFilterValue", "");
        this.$store.dispatch("setFilterBy", value);
      },
    },
    filterValue: {
      get() {
        return this.$store.getters.filterValue;
      },
      set(value) {
        this.$store.dispatch("setFilterValue", value);
      },
    },
  },
  mounted() {
    this.$store.dispatch("setListBooks", []);
    this.$refs.searchText.focus();
  },
  methods: {
    setFiltersGoListPage() {
      const vm = this;
      if (!vm.$store.getters.filterBy) {
        notify(this, "error", "Error", "Filter type is empty");
        return;
      }

      if (!vm.$store.getters.filterValue) {
        notify(
          this,
          "error",
          "Error",
          "Filter value is empty"
        );
        vm.$refs.searchText.focus();
        return;
      }

      vm.$router.push({
        path: "/books",
        query: {
          filterBy: vm.$store.getters.filterBy,
          filterValue: vm.$store.getters.filterValue,
        },
      });
    },
  },
};
</script>
