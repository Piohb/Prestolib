const caps = (item) => {
    return item.charAt(0).toUpperCase() + item.slice(1)
}

const firstLetter = (item) => {
    return item.charAt(0)
}

export {
    caps,
    firstLetter
}