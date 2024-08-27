import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom'



function User() {
    const [credential, setCredential] = useState({ name: '', image: '' });
    const [imgData, setImgData] = useState([]);
    // const [newData, setNewData] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', credential.name);
        if (credential.image) {
            formData.append('image', credential.image);
        }

        try {
            const response = await fetch("http://localhost:5000/api/submit", {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const json = await response.json();
            console.log(json);
            // Optionally, reset form fields after successful submission
            setCredential({ name: '', image: '' });
            
            // Fetch updated image data after submission           
            fetchMyImg();
        } catch (error) {
            console.error("Error submitting file:", error);
            // Handle error: display a message to the user
        }
    };

    const handleChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    };

    const handlePhoto = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setCredential({ ...credential, image: e.target.files[0] });
        }
    };

    
    


    const fetchMyImg = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/display", {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);

            if (Array.isArray(data) && data.length > 0) {
                setImgData(data);
            } else {
                console.error('Data received is not a valid array:', data);
            }
        } catch (error) {
            console.error('Error during fetch:', error.message);
        }
    };


    // const updateData = async (id) =>{
    //     // e.preventDefault();

    //     const formData = new FormData();
    //     formData.append('name', credential.name);
    //     if (credential.image) {
    //         formData.append('image', credential.image);
    //     }
    //     try{
    //         const response = await fetch(`http://localhost:5000/api/update-data/${id}`, {
    //             method: 'PUT',
    //             body: formData
    //         })
    //     }catch{

    //     }
    // }

    const deleteData = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/delete-img/${id}`, {
                method: 'DELETE',
                // headers: {
                //     'Content-Type': 'application/json', // You may not need this header for DELETE requests
                // },
            });
    
            if (response.ok) {
                console.log('User deleted successfully');
                fetchMyImg(); // Fetch updated image data after deletion
            } else {
                let errorMessage = 'Delete request failed';
                
                try {
                    const json = await response.json();
                    errorMessage = json.message || response.statusText;
                } catch (jsonError) {
                    // Response body is not valid JSON
                    errorMessage = response.statusText;
                }
    
                console.error(errorMessage);
            }
        } catch (error) {
            console.error('Error during delete:', error.message);
        }
    };
    

    useEffect(() => {
        fetchMyImg();
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label>NAME</label>
                <input
                    type="text"
                    placeholder="name"
                    name="name"
                    value={credential.name}
                    onChange={handleChange}
                />

                <label>IMAGE</label>
                <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="image"
                    onChange={handlePhoto}
                />

                <input type="submit" />
            </form>

            
            <div>
                <h2>Image details</h2>
                <div>
                    {imgData && imgData.length > 0 ? (
                        imgData.map((imageDetail, index) => (
                            <div className='row' key={index} style={{ width: "18rem", maxHeight: "360px" }}>
                                <td> no.: {index +1}</td>
                                <td>{imageDetail.name}</td>
                                <td>ID: {imageDetail._id}</td>
                                <img src={`http://localhost:5000/Images/${imageDetail.image}`} style={{height:"10vh"}} alt="..." />
                                {/* <button className="edit-data" onClick={()=> {updateData(imageDetail._id)}}>edit</button> */}
                                <Link to="/update-data" className='m-3 btn btn-danger'>Edit</Link>

                                <button className="delete-data" onClick={()=> {deleteData(imageDetail._id)}}>delete</button>
                            </div>
                        ))
                    ) : (
                        <div>No image details</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default User;
