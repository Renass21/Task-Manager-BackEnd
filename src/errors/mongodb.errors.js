const notFoundError = (res) => {
    return res.status(404).send("Este dado não foi encontrato no banco de dados");
}


module.exports = {
    notFoundError,
}