import React, { useState } from 'react';

function EditData() {
    const [credential, setCredential] = useState({ name: '', image: '' });
    const [update, setUpdate] = useState(0)

    const updateData = async (id, e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', credential.name);
        if (credential.image) {
            formData.append('image', credential.image);
        }

        try {
            const response = await fetch(`http://localhost:5000/api/update-data/${id}`, {
                method: 'PUT',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const json = await response.json();
            console.log(json);
            setCredential({ name: '', image: '' });
        } catch (error) {
            console.error("Error updating data:", error);
            console.log("error updating",error)
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

    return (
        <div>
            <form onSubmit={updateData} encType="multipart/form-data">
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

                <button type="submit">Update</button>
            </form>
        </div>
        
        // <div className="container">
        //     {
        //         update.map((data, key) =>{
        //             return <div key={key}></div>
        //         })
        //     }
        // </div>
    );
}

export default EditData;
