import React, { useEffect, useState } from 'react';
// import User from '../../backend/modals/User';

function RegDetails() {
  const [regData, setRegData] = useState([]);

  
  const fetchMyReg = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/registrations" ,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(),
    
      } );
     
      if (!response.ok) {
        throw new Error('Network response was not ok');
      } 
      const data = await response.json();
      

      
       if (Array.isArray(data)) {
        const Registration = data[0];
        console.log("Data received:", Registration);
        setRegData(Registration);
      } else {
        console.error('Data received is not an array:', data[0]);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  const deleteRegistration = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/registrations/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete registration: ${response.statusText}`);
      }

      setRegData(regData.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error during delete:', error.message);
    }
  };

  useEffect(() => {
    fetchMyReg();
  }, []);

  return (
    <div>
    <h2>Registration Data</h2>
    <div>
      {regData.length > 0 ? (
        regData.map((user, index) => (
          <tr key={index}>
          <td>id: {user._id}</td>
          <td>NAME: {user.name}</td>
          <td>EMAIL: {user.email}</td>
          <td>location: {user.location}</td>
          <td>
            <button type="button" className='btn p-0' style={{background: 'Green', color: 'white '}}
             onClick={() => deleteRegistration(user._id)}     >
               EDIT
            </button>         
          </td> 
          <td>
            <button type="button" className='btn p-0' style={{background: 'red', color: 'white '}}
             onClick={() => deleteRegistration(user._id)}     >
               DELETE
            </button>         
          </td>           
          </tr>
        ))
      ) : (
        <div>No registration data available</div>
      )}
    </div>
  </div>

    //  <div>
    //   <h2>Registration Data</h2>
    //   <div>
    //     {regData.length > 0 ? (
    //       regData.map((data) => (
    //         <div key={data._id}>
    //           <div>NAME: {data.name}</div>
    //           <div>EMAIL: {data.email}</div>
    //         </div>
    //       ))
    //     ) : (
    //       <div>No registration data available</div>
    //     )}
    //   </div>
    // </div>

    // <div>
    //   <div>
    //     {
    //       regData !== {} ? Array(regData).map(data => {
    //         return(
    //           data.regData ? User.slice(0).reverse().map((item) => {
    //             return(
    //               item.map((arrayData)=>{
    //                 return(
    //                   <div>
    //                     {arrayData._id}
    //                   </div>
    //                 )
    //               })
    //             )
    //           })

    //         )
    //       })
    //     }
    //   </div>
    // </div>
  );
};

export default RegDetails;
