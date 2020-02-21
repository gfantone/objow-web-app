import instance from '../instance'

const baseUrl = 'category-icons/';

const categoryIcons = {
    list() {
        return instance.get(baseUrl)
    }
};

export default categoryIcons