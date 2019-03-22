const message = ({res, body, text, status='info', statusCode=200}) => {
    res
        .status(statusCode)
        .send({body, text, status});
}

module.exports = ({message});