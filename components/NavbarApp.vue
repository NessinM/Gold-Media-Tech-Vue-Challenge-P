<template>
  <!-- navbar goes here -->
  <nav class="inset-x-0 shadow-lg">
    <div class="max-w-12xl mx-auto px-4 py-5">
      <div class="flex justify-between">
        <div class="flex flex-1">
          <div class="pr-3">
            <button
              v-if="showHome"
              @click="routerHome()"
              class="flex items-center text-gray-700 hover:text-gray-900"
            >
              <i class="fas fa-chevron-left"></i>
              <span class="pl-1 font-bold">Home</span>
            </button>
          </div>
          <div>
            <button
              v-if="showBack"
              @click="routerBack()"
              class="flex items-center text-gray-700 hover:text-gray-900"
            >
              <i class="fas fa-chevron-left"></i>
              <span class="pl-1 font-bold">Back</span>
            </button>
          </div>
        </div>
        <div class="flex items-center space-x-1">
          <NuxtLink
            to="/favorites"
            class="
              py-2
              px-3
              bg-yellow-400
              hover:bg-yellow-300
              text-sm
              hover:text-yellow-800
              rounded
              transition
              duration-300
              font-bold
            "
          >
            <i class="fas fa-star"></i>
            Favorites
            {{ gettersFavoritos.length ? `(${gettersFavoritos.length})` : "" }}
          </NuxtLink>
        </div>
        <div class="md:hidden flex items-center">
          <button class="mobile-menu-button focus:outline-none">
            <i class="bx bx-menu text-3xl mt-1"></i>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  props: {
    showBack: {
      type: Boolean,
      default: false,
    },
    showHome: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    gettersFavoritos() {
      return this.$store.getters.allFavorites;
    },
  },
  methods: {
    routerBack() {
      this.$router.go(-1);
    },
    routerHome() {
      this.$router.push("/");
    },
  },
};
</script>
