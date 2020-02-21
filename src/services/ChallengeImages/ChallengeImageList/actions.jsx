import * as types from './actionTypes'

export const getChallengeImageList = () => {
    return {
        type: types.GET_CHALLENGE_IMAGE_LIST
    }
}

export const getChallengeImageListSuccess = (images) => {
    return {
        type: types.GET_CHALLENGE_IMAGE_LIST_SUCCESS,
        images
    }
}

export const getChallengeImageListError = () => {
    return {
        type: types.GET_CHALLENGE_IMAGE_LIST_ERROR
    }
}