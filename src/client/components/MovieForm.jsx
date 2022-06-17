import { useState } from "react";
'./UserForm.css'

export default function MovieForm({ handleSubmit ,isLoading}) {
    const [movie, setMovie] = useState({ title: '', description: '', runtimeMins: 60 });

    const handleSubmitDecorator = (e) => {
        e.preventDefault();
        handleSubmit(movie);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setMovie({
            ...movie,
            [name]: name === 'runtimeMins' ? parseInt(value) : value
        });
    }

    return (
        <div className="form-container">
       {!isLoading && <form  className="form-login-register"  onSubmit={handleSubmitDecorator}>
               <h1>Create a movie</h1>
            <input type='text' name='title' placeholder="Title" value={movie.title} onChange={handleChange} />
            <input type='text' name='description' placeholder="Description" value={movie.description} onChange={handleChange} />
            <input type='number' name='runtimeMins' placeholder="Runtime (minutes)" value={movie.runtimeMins} onChange={handleChange} />
            <button type="submit">Submit</button>
        </form>}
        {isLoading && <div className="loader"></div>}
        </div>
    );
}