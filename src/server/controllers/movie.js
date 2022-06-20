const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwtSecret = process.env.JWT_SECRET_KEY;

const deleteMovie = async (req, res) => {
	const [bearer, userToken] = req.headers.authorization.split(" ");
	console.log(+req.query.userId);
	const { userId } = req.query.userId;
	console.log("USER TOKEN:", userToken);
	const verify = jwt.verify(userToken, jwtSecret);
	const id = +req.params.id;
	console.log("ID:", id);
	console.log("VERIFY:", verify);
	if (!verify.LoggedIn) return res.status(401).json({ msg: "Invalid token" });
	console.log("USER ID:", +req.query.userId);

	const moviesAndUsers = await prisma.moviesAndUsers.deleteMany({
		where: { movieId: id, userId: +req.query.userId },
	});
	const check = await prisma.moviesAndUsers.findMany({
		where: { movieId: id},
	});;
	if(check.length === 0) {
	const deletedMovie = await prisma.movie.delete({
		where : {id:id},
	})
	}


	return res.status(200).json({ data: moviesAndUsers });
};

const getAllMovies = async (req, res) => {
	const [bearer, userToken] = req.headers.authorization.split(" ");
	const verify = jwt.verify(userToken, jwtSecret);
	const id = +req.query.userId;
	const searchTerm = req.query.searchTerm;

	console.log("SEARCH TERM:", searchTerm);

	if (!verify.LoggedIn) return res.status(401).json({ msg: "Invalid token" });

	if (searchTerm) {
		const movies = await prisma.movie.findMany({
			where: {
				title: {
					startsWith: searchTerm,
					mode: "insensitive",
				},
			},
		});
		return res.json({ data: movies });
	}

	const movies = await prisma.moviesAndUsers.findMany({
		where: { userId: id },
		include: { movie: true },
	});
	res.json({ data: movies });
};

const createMovie = async (req, res) => {
	const { title, description, runtimeMins, userId, imgUrl, movieId } = req.body;
	const [bearer, userToken] = req.headers.authorization.split(" ");

	// try {
	const verify = jwt.verify(userToken, jwtSecret);

	console.log("VERIFY:", verify);

	const userIdNum = +userId;
	const movieIdNum = +movieId;

	// todo verify the token
	console.log("USer ID:", userId);
	console.log("TOKEN:", userToken);
	if (verify.LoggedIn) {
		console.log("VERIFY");

		if (movieIdNum) {
			const addMovie = await prisma.moviesAndUsers.create({
				data: {
					userId: userIdNum,
					movieId: movieIdNum,
				},
			});
			return res.json({ data: addMovie });
		}

		try {
			const createdMovie = await prisma.movie.create({
				data: {
					title,
					description,
					runtimeMins,
					imgUrl: imgUrl ? imgUrl : null,
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
			return res.json({ data: createdMovie });
		} catch (err) {
			console.log(err);
			return res.status(400).json({ error: "Title already exist" });
		}
	}
};

module.exports = {
	getAllMovies,
	createMovie,
	deleteMovie,
};
