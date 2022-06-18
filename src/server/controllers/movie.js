const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwtSecret = process.env.JWT_SECRET_KEY;


const deleteMovie = async(req,res) => {
	const [bearer,userToken] = req.headers.authorization.split(" ");
	console.log("USER TOKEN:",userToken);
	const verify = jwt.verify(userToken, jwtSecret);
	const id  = +req.params.id;
	console.log("ID:",id);
	console.log("VERIFY:",verify);
	if(!verify.LoggedIn) return res.status(401).json({msg:'Invalid token'});

	const moviesAndUsers = await prisma.moviesAndUsers.deleteMany({
		where:{
			movieId: id,
		}
	});

	const deletedMovie = await prisma.movie.delete({
		where : {id:id},
	})

	return res.status(200).json({data: deletedMovie});

}

const getAllMovies = async (req, res) => {
	const [bearer, userToken] = req.headers.authorization.split(" ");
	const verify = jwt.verify(userToken, jwtSecret);
	const id = +req.query.userId;
   
    if(!verify.LoggedIn) return res.status(401).json({msg:'Invalid token'})
 
	const movies = await prisma.moviesAndUsers.findMany({
         where:{userId:id},
		 include:{movie:true}
	})
	res.json({ data: movies});
};

const createMovie = async (req, res) => {
	const { title, description, runtimeMins, userId ,imgUrl} = req.body;
	const [bearer, userToken] = req.headers.authorization.split(" ");

	// try {
	const verify = jwt.verify(userToken, jwtSecret);

	console.log('VERIFY:', verify)

	const userIdNum = +userId;

	// todo verify the token
	console.log("USer ID:", userId);
	console.log('TOKEN:',userToken);
	if (verify.LoggedIn) {
		console.log("VERIFY");

		try {
			const createdMovie = await prisma.movie.create({
				data: {
					title,
					description,
					runtimeMins,
					imgUrl: imgUrl? imgUrl:null,
					users: {
						create: [
							{
								user: {
									connect: {
										id: userIdNum,
									},
								},
							},
						],
					},
				},
			
			});
	
			console.log(createdMovie);
		return	res.json({ data: createdMovie });
		} catch (err) {
			console.log(err)
			return res.status(400).json({ error: "Title already exist" });
		}
	
	}


};

module.exports = {
	getAllMovies,
	createMovie,
	deleteMovie,
};
