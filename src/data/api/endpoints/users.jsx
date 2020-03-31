import instance from '../instance'

const baseUrl = 'users/';

const users = {
    create(user) {
        user.isActive = true;
        return instance.post(baseUrl, user)
    },
    detail(id) {
        const url = `${baseUrl}${id}/`;
        return instance.get(url)
    },
    import(request) {
        const url = `${baseUrl}import/`;
        return instance.post(url, request)
    },
    list(isActive) {
        const url = `${baseUrl}?isActive=${isActive}`;
        return instance.get(url)
    },
    update(user) {
        const url = `${baseUrl}${user.id}/`;
        return instance.patch(url, {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
            team: user.team
        })
    },
    updateActivation(id, isActive) {
        const url = `${baseUrl}${id}/`;
        return instance.patch(url, { isActive })
    },
    updatePassword(id, password) {
        const url = `${baseUrl}${id}/password/`;
        return instance.post(url, { password })
    },
    updateTeam(id, team) {
        const url = `${baseUrl}${id}/`;
        return instance.patch(url, { team })
    },
    saveConnection() {
        const url = `${baseUrl}save-connection/`;
        return instance.post(url)
    }
};

export default users
