module.exports = (req, res, next) => {
    console.log(req.session);
    if (!req.session.user) {
        console.log("madarchod");
        return res.status(401).redirect('/login'); 
    }
    next();
};

