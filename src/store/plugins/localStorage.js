export default store => {
  store.subscribe((mutation, state) => {
    localStorage.setItem('data', JSON.stringify(state.data))
  })
}