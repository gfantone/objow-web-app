import {useEffect} from "react";
import {toast} from "react-toastify";
import {useIntl} from "react-intl";

// multiple in one page causes multiple notification to occurs on one "request" due to
const useHandleToast = (state, dispatch, clearFunction, successId, errorId, listener = true, onToastDisplayed = () => {}) => {
    const intl = useIntl();

    useEffect(() => {
        if (!listener) return

        if (state.success) {
            toast.success(intl.formatMessage({id: successId}));
        } else if (state.error) {
            toast.error(intl.formatMessage({id: errorId}));
        }

        if (state.success || state.error) {
            dispatch(clearFunction());
            onToastDisplayed()
        }
    }, [state.error, state.success]);
}

export default useHandleToast;
