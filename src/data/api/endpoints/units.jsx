import instance from '../instance'

const baseUrl = 'units/';

const units = {
    list() {
        return instance.get(baseUrl)
    }
};

export default units
