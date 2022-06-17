const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const jwtSecret = process.env.JWT_SECRET_KEY;



const register = async (req, res) => {
    const { username, password } = req.body;

    if(!username || !password) {
        return res.status(400).json({ error: 'Missing username or password.' });
    }
    const cryptedPassword = await bcrypt.hash(password,10)

    try {
        const createdUser = await prisma.user.create({
            data : {
                username: username,
                password: cryptedPassword,
            }

        })
        const token = jwt.sign({username,LoggedIn:true},jwtSecret);
        res.json({ data: createdUser,token });
    }catch(err) {
        return res.status(400).json({ error: 'User already exist'})
    }

   
  
    
};

const login = async (req, res) => {
    const { username, password } = req.body;

    const foundUser = await prisma.user.findUnique({ 
        where: {username}
    })

    if (!foundUser) {
        return res.status(401).json({ error: 'Invalid username' });
    }
console.log("FOUND USER:",foundUser)
    const passwordsMatch =await bcrypt.compare(password,foundUser.password);

    console.log('PASSWORDMATCH:',passwordsMatch);

    if (!passwordsMatch) {
        return res.status(401).json({ error: 'Invalid password.' });
    }

    const token = jwt.sign({username,LoggedIn:true},jwtSecret);

    res.json({ data: {token,userId:foundUser.id} });
};

module.exports = {
    register,
    login
};