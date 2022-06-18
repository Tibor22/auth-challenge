import { useState } from "react";
import Axios from 'axios'
'./UserForm.css'

export default function MovieForm({ handleSubmit ,isLoading,setIsLoading,errorMsg,setErrorMsg}) {
    const [movie, setMovie] = useState({ title: '', description: '', runtimeMins: 60 });
    const [imageSelected, setImageSelected] = useState();
    const [uploadedImgUrl, setUploadedImgUrl] = useState(null);

    const handleSubmitDecorator = (e) => {
        e.preventDefault();
        handleSubmit({...movie,imgUrl:uploadedImgUrl,});
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

       

        setMovie({
            ...movie,
            [name]: name === 'runtimeMins' ? parseInt(value) : value,
        });
    }

    const uploadImage =async (files) => {
        if (+imageSelected.size > 1097152) {
       setErrorMsg('Image is too large, maximum size is 1MB')
       return
        } 
        setErrorMsg(null)
        setIsLoading(true)
        console.log(files[0])
        const formData = new FormData();
        formData.append("file",imageSelected)
        formData.append("upload_preset","eqmuqogf")
       const res = await Axios.post("https://api.cloudinary.com/v1_1/dxz7uaunn/image/upload",formData);
       console.log(res)
       setUploadedImgUrl(res.data.secure_url)
       setIsLoading(false)
    }

   

    return (
        <div className="form-container">
       {!isLoading && <form  className="form-login-register"  onSubmit={handleSubmitDecorator}>
               <h1>Create a movie</h1>
            <input type='text' name='title' placeholder="Title" value={movie.title} onChange={handleChange} />
            <input type='text' name='description' placeholder="Description" value={movie.description} onChange={handleChange} />
            <input type='number' name='runtimeMins' placeholder="Runtime (minutes)" value={movie.runtimeMins} onChange={handleChange} />
            <input type="file" onChange={(e) =>{setImageSelected(e.target.files[0])}}/>
            <div className="image-upload" onClick={uploadImage}>Upload Image</div>
            <button type="submit">Submit</button>
            {errorMsg && <div className="error">{errorMsg}</div>}
        </form>}
        {isLoading && <div className="loader"></div>}
        </div>
    );
}


// cloudinary: eqmuqogf