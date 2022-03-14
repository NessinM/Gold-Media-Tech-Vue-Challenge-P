import axios from "axios";
//to handle state
const state = {
  books: [],
  favorites: [],
  transaction: {
    isLoading: false,
    message: "",
  },
  filterBy      : "title",
  filterValue   : "",
  keyBookDetails: "",
  detailsBook   : {},
};

//to handle state
const getters = {
  allBooks         : (state) => state.books,
  allFavorites     : (state) => state.favorites,
  transaction      : (state) => state.transaction,
  filterBy         : (state) => state.filterBy,
  filterValue      : (state) => state.filterValue,
  getKeyBookDetails: (state) => state.keyBookDetails,
  getBookDetails   : (state) => state.detailsBook,
};

//to handle actions
const actions = {
  getSearchBooks({ commit, state }) {
    commit("SET_TRANSACTION", {
      isLoading: true,
      message  : `Getting book list by ${state.filterBy}:${state.filterValue}`,
    });
    const url = `http://openlibrary.org/search.json?${state.filterBy}=${state.filterValue}`;
    axios.get(url).then((response) => {
      commit("SET_BOOKS", response.data.docs);
      commit("SET_TRANSACTION", { isLoading: false, message: "" });
    }).catch((error) => {
      notify(this, 'error', 'Error', `Error when trying to retrieve information from the API: ${error}`)
    })
  },
  getDetailsBook({ commit, state }) {
    commit("SET_TRANSACTION", {
      isLoading: true,
      message  : `Getting book details  ${state.keyBookDetails}...`,
    });
    const url = `https://openlibrary.org${state.keyBookDetails}.json`;
    return new Promise((resolve, reject) => {
      axios.get(url).then((response) => {
        let objAux = response.data
        objAux.urlCover = objAux.covers ? `https://covers.openlibrary.org/b/id/${objAux.covers[0]}-M.jpg` : 'https://psicotecnicoelzahor.es/wp-content/uploads/2016/05/ef3-placeholder-image.jpg'
        commit("SET_DETAILS_BOOK", objAux);
        commit("SET_TRANSACTION", { isLoading: false, message: "" });
        resolve()
      }).catch((error) => {
        reject(error)
        notify(this, 'error', 'Error', `Error when trying to retrieve information from the API: ${error}`)
      })
    })
  },
  setListBooks({ commit }, list) {
    commit("SET_BOOKS", list);
  },
  setFilterBy({ commit }, by) {
    commit("SET_FILTER_BY", by);
  },
  setFilterValue({ commit }, value) {
    commit("SET_FILTER_VALUE", value);
  },
  setKeyDetailsBook({ commit }, value) {
    commit("SET_KEY_DETAILS_BOOK", value);
  },
  addFavorite({ commit }, item) {
    return new Promise((resolve, reject) => {
      const existe = state.favorites.findIndex((e) => e.key === item.key);
      if (existe === -1) {
        commit("ADD_FAVORITE", item);
        resolve()
      } else {
        reject(`El libro ${payloand.title} ya se encuentra agregado a favoritos`)
      }
    })
  },
  removeFavorite({ commit }, item) {
    return new Promise((resolve, reject) => {
      const existe = state.favorites.findIndex((e) => e.key === item.key);
      if (existe !== -1) {
        commit("REMOVE_FAVORITE", existe);
        resolve()
      } else {
        reject('Error: El libro no se encuentra en los favoritos')
      }
    })
  },
};

//to handle mutations
const mutations = {
  SET_BOOKS(state, books) {
    state.books = books;
  },
  SET_FILTER_BY(state, payloand) {
    state.filterBy = payloand;
  },
  SET_FILTER_VALUE(state, payloand) {
    state.filterValue = payloand;
  },
  SET_KEY_DETAILS_BOOK(state, payloand) {
    state.keyBookDetails = payloand;
  },
  SET_DETAILS_BOOK(state, payloand) {
    state.detailsBook = payloand;
  },
  SET_TRANSACTION(state, payloand) {
    state.transaction = payloand;
  },
  ADD_FAVORITE(state, payloand) {
    state.favorites.push(payloand);
  },
  REMOVE_FAVORITE(state, position) {
    state.favorites.splice(position, 1);
  },
};

//export store module
export default {
  state,
  getters,
  actions,
  mutations,
};
