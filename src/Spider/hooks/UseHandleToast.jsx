import {useEffect} from "react";
import {toast} from "react-toastify";
import {useIntl} from "react-intl";

const useHandleToast = (state, dispatch, clearFunction, successId, errorId) => {
    const intl = useIntl();

    useEffect(() => {
        if (state.success) {
            toast.success(intl.formatMessage({id: successId}));
            dispatch(clearFunction());
        } else if (state.error) {
            toast.error(intl.formatMessage({id: errorId}));
            dispatch(clearFunction());
        }
    }, [state.error, state.success, dispatch, intl]);
}

export default useHandleToast;
