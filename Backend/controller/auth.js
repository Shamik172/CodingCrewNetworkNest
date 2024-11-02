const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.getLogin = (req, res, next)=>{
    res.send("<h1>welcome this is login page</h1>"); 
};

exports.getSignup = (req, res, next)=>{
    res.send("<h1>Successfully loaded signup Page</h1>")
}

exports.getIndex = (req, res, next) => {
    res.send("<h1>In Index Page<h1>");
};


exports.postLogin = (req, res, next)=>{
    const password = req.body.password;
    const username = req.body.username;

    if (!username || !password) {
        return res.status(400).json({ message: 'All fields required'});
    }

    User.findOne({username: username})
    .then(user=>{
        if(!user){
            console.log("User doesn't exists");
            return res.redirect(200,'/signup');
        }
        bcrypt.compare(password, user.password)
        .then(doMatch => {
            if(doMatch){
                const token = jwt.sign(
                    {id: user._id, username: user.username},
                    process.env.JWT_SECRET,
                    {expiresIn: '1h'}
                );

                req.session.user = {id: user._id, username: user.username};
                req.session.token = token;
                console.log("Logged in successfully");
                console.log(user.username);
                return res.redirect(200,'/index');
            }
            console.log('Invalid password');
            return res.redirect(200,'/login');
        })
        .catch(err=>console.log(err));
    })
    .catch(err=>console.log(err));
}

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    const name = req.body.name;
    const bio = req.body.bio;
    const profilePicture = req.body.profilePicture;
    const coverPicture = req.body.coverPicture;
    // console.log(profilePicture);
    // console.log(coverPicture);

    // const profilePicture = req.files['profilePicture'] ? req.files['profilePicture'][0] : '';
    // const coverPicture = req.files['coverPicture'] ? req.files['coverPicture'][0] : '';

    if (!email || !password || !username || !name) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    User.findOne({$or: [{ email }, { username }]})
    .then(user=>{
        if(user){
            console.log("User already exists");
            return res.redirect(400,'/signup');
        }
        return bcrypt.hash(password, 12)
        .then(hashedPassword=>{
        const newUser = new User({
            email: email,
            username: username,
            password: hashedPassword,
            bio: bio,
            name: name,
            profilePicture: profilePicture,
            coverPicture: coverPicture
        });
        return newUser.save()
        })
        .then(result=>{
            console.log("user created successfully");
            res.redirect(201,'/login');
        })
        .catch(err=>console.log(err));
    })
    .catch(err=>console.log(err));
};

exports.postLogout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.clearCookie('connect.sid'); 
        console.log('Logged out successfully');
        res.redirect('/login'); 
    });
  };