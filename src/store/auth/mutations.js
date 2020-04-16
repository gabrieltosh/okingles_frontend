/* export const increment = (state, n) => {
  // mutate state
  state.count += n
} */

export const SetUser = (state, user) => {
  state.User.Name = user.name
  state.User.Email = user.email
  state.User.ID = user.id
  state.Auth = true
}
