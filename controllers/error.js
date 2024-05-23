const getError =(req,res,next) => {
    res.render('404.pug' , {pageTitle: "Page 404"})
}

module.exports = {
    errorFunction: getError
}