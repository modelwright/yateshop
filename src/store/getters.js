const getters = {
    token: state => state.user.userData.accessToken,
    username: state => state.user.userData.username,
    userType: state => state.user.userData.userType
}
export default getters
