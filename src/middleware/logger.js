const logger = (store) => (next) => (action) => {
    console.group(action.type)
    console.log('Received Action: ', action)
    const ret = next(action)
    console.log('New State: ', store.getState())
    console.groupEnd()
    return ret
}

export default logger
