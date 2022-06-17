const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwtSecret = process.env.JWT_SECRET_KEY;

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
	const { title, description, runtimeMins, userId } = req.body;
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
		const createdMovie = await prisma.movie.create({
			data: {
				title,
				description,
				runtimeMins,
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
			// include :{user:true}
		});

		console.log(createdMovie);
		res.json({ data: createdMovie });
	}

	// } catch (e) {
	//     return res.status(401).json({ error: 'Invalid token provided.' })
	// }
};

module.exports = {
	getAllMovies,
	createMovie,
};
