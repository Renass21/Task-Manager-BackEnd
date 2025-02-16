const notFoundError = (res) => {
    return res.status(404).send("Este dado não foi encontrato no banco de dados");
}

const objectIdCastError = (res) => {
    return res.status(500).send("Ocorreu um erro ao tentar encontrar o dado no banco de dados");
}

module.exports = {
    notFoundError,
    objectIdCastError
}