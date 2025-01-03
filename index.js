const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.status(200).send('Running project')
})

app.listen(8000, () => console.log('Listening on port 8000'))
