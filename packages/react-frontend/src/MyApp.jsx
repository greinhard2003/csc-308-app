
// src/MyApp.jsx
import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";

function MyApp() {
const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
  const userToDelete = characters[index]; // Identify the user to delete

  fetch(`http://localhost:8000/users/${userToDelete._id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.status === 204) {
        // Remove the character from the state only after a successful delete
        const updated = characters.filter((character, i) => i !== index);
        setCharacters(updated);
      } else if (res.status === 404) {
        console.error("User not found.");
      } else {
        console.error("Failed to delete the user.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}


  function updateList(person) {
    postUser(person)
      .then((res) => {
        if (res.status === 201) {
          return res.json(); // Parse the response JSON
        }
        throw new Error("Failed to add user");
      })
      .then((newUser) => {
        setCharacters([...characters, newUser]); // Add the new user with the ID from the backend
      })
      .catch((error) => {
        console.log(error);
      });
  }
  

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
}

function postUser(person) {
  const promise = fetch("Http://localhost:8000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  });

  return promise;
}

useEffect(() => {
  fetchUsers()
	  .then((res) => res.json())
	  .then((json) => setCharacters(json["users_list"]))
	  .catch((error) => { console.log(error); });
}, [] );

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}
  
export default MyApp;
