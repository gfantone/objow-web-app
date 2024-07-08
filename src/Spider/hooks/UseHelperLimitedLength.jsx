const UseHelperLimitedLength = () => {
    const getHelper = (value, maxLength) => {
        return `${value.length} / ${maxLength}`
    }

    return { getHelper }
}

export default UseHelperLimitedLength;
