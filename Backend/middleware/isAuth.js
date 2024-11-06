module.exports = (req, res, next) => {
    if (!req.session.user) {
        console.log("madarchod");
        return res.status(401).redirect('/login'); 
    }
    next();
};
