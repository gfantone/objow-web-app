import instance from '../instance'

const baseUrl = 'level-icons/';

const categoryIcons = {
    usable() {
        const url = `${baseUrl}usable/`;
        return instance.get(url)
    }
};

export default categoryIcons
