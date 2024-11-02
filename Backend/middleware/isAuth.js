module.exports = (req, res, next) => {
    if (!req.session.user) {
        console.log("madarchod");
        return res.status(200).redirect('/login'); 
    }
    next();
};
