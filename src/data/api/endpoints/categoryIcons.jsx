import instance from '../instance'

const baseUrl = 'category-icons/';

const categoryIcons = {
    usable() {
        const url = `${baseUrl}usable/`;
        return instance.get(url)
    }
};

export default categoryIcons
