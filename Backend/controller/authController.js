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
    console.log(req.body);
    const password = req.body.password;
    const username = req.body.username;
    // console.log(username, password);
    if (!username || !password) {
        return res.status(401).json({ message: 'All fields are required'});
    }

    User.findOne({username: username})
    .then(user=>{
        if(!user){
            return res.status(401).json({ message: "User doesn't exist" });
        }
        bcrypt.compare(password, user.password)
        .then(doMatch => {
            if(doMatch){
                // console.log(password, bc)
                const token = jwt.sign(
                    {id: user._id, username: user.username},
                    process.env.JWT_SECRET,
                    {expiresIn: '1h'}
                );

                req.session.user = {id: user._id, username: user.username};
                req.session.token = token;
                // console.log(user.username);
                return res.status(200).json({message: "Logged in successfully"})
            }
            return res.status(401).json({ message: 'Invalid password' });
        })
        .catch(err => res.status(500).json({ message: 'Server error', error: err }));
    })
    .catch(err => res.status(500).json({ message: 'Server error', error: err }));
}

exports.postSignup = (req, res, next) => {
    console.log(req.body)
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
//    console.log(username,password,name,email)
    if (!email || !password || !username || !name) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    User.findOne({$or: [{ email }, { username }]})
    .then(user=>{
        if(user){
            // console.log("User already exists");
            return res.status(400).json({ message: 'User already exists.' });
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
            // console.log("user created successfully");
            res.status(200).json({ message: 'User created successfully.'});
        })
        .catch(err=>console.log(err));
    })
    .catch(err=>console.log(err));
};

exports.postLogout = (req, res) => {
    console.log("reached");
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.clearCookie('connect.sid'); 
        console.log('Logged out successfully');
        // res.redirect('/login'); 
        return res.status(200).json({message: "Logged out successfully"});
    });
  };

  exports.isLoggedIn = (req, res, next) =>{
    const user = req.session.user;

    // console.log("abcd ++")
    // console.log(user);

    User.findById(user.id)
    .then(user=>{
        if(user){
            // console.log(user);
            res.status(200).json({isLoggedIn: true, user});
        } else{
            res.status(404).json({isLoggedIn : false})
        }
    })
    .catch(er=>comsole.log(err));
}