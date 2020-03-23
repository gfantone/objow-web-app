import instance from '../instance'

const baseUrl = 'category-icons/';

const categoryIcons = {
    list() {
        return instance.get(baseUrl)
    },
    unused() {
        const url = `${baseUrl}unused/`;
        return instance.get(url)
    }
};

export default categoryIcons
