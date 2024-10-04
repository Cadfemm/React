import React, { useEffect, useState } from 'react';
import "../styles/Monoplegia.css";

function App() {
  const [user, setUser] = useState({
    name: { first: '', last: '' },
    email: '',
    location: { city: '', country: '' },
    picture: '',
    MEF: ''  // Added MEF field
  });  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  

  useEffect(() => {
    // Fetch data from the Random User API
    fetch('https://randomuser.me/api/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();  
      })
      .then((data) => {
        const fetchedUser = data.results[0];
        setUser((prevUser) => ({
          ...prevUser,
          name: fetchedUser.name,
          email: fetchedUser.email,
          location: fetchedUser.location,
          picture: fetchedUser.picture.medium
        }));  
        setLoading(false);  

        // Print the fetched user details in the console
        console.log('Fetched User Data:', fetchedUser);
      })
      .catch((error) => {
        setError(error);  
        setLoading(false);
        console.error('Error fetching data:', error);
      });
  }, []);  

  // Handle input changes to allow editing the fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "firstName" || name === "lastName") {
      setUser((prevUser) => ({
        ...prevUser,
        name: {
          ...prevUser.name,
          [name]: value
        }
      }));
    } else if (name === "city" || name === "country") {
      setUser((prevUser) => ({
        ...prevUser,
        location: {
          ...prevUser.location,
          [name]: value
        }
      }));
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value
      }));
    }
    
    // Print the updated user details including MEF
    console.log('Updated User Data:', { ...user, [name]: value });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Edit User Info</h1>
      <form>
        <div>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={user.name.first}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={user.name.last}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={user.location.city}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <div>
            <label>Manually Entered Filed:</label>
            <input
              type="text"
              name="MEF"
              value={user.MEF}
              onChange={handleChange}  // Allow changes to MEF input
            />
          </div>
        </div>
        <div>
          <div>
            <label>Country:</label>
            <input
              type="text"
              name="country"
              value={user.location.country}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Picture URL:</label>
            <input
              type="text"
              name="picture"
              value={user.picture}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div>
          <img src={user.picture} alt="User avatar" />
        </div>
      </form>
    </div>
  );
}

export default App;
