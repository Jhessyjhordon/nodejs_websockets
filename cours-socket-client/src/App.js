import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io.connect('http://localhost:3001');

function App() {

  // Ce state me permet de definir les valeurs que je vais utiliser 
  // Ici in définis le message que l'on va récupérer de l'INPUT
  const [message, setMessage] = useState("");
  // Ici on définis le message RECU par le serveur
  const [messageReceived, setMessageRecieved] = useState("");
  const [groupMessages, setGroupMessages] = useState([]); // État pour stocker les messages du groupe

  // ------------------------Implémentation des groupes ---------------------------------------
  // const [room, setRoom] = useState("");
  const [group, setGroup] = useState("");

  const joinGroup = () => {
    if (group !== "") {
      socket.emit("join_group", { group });
    }
  };

  const sendMessage = () => {
    // send a message to the server
    socket.emit("send_message", { message, group });
    // setMessage(""); // Réinitialiser le champ de saisie après l'envoi du message
  };

  // Le useEffect va s'activer lorsque le module "socket" est modifié
  // Dans notre cas, c'est lorsqu'on reçoit un message du serveur
  useEffect(() => {

    socket.on("group_joined", (data) => {
      setGroup(data.join_group);
    });

    socket.on("receive_message", (data) => {
      setMessageRecieved(data.message);
      // setGroupMessages((prevMessages) => [...prevMessages, data]); // Ajouter le nouveau message à la liste des messages
    });

    socket.on("group_messages", (data) => {
      // data contient les messages du groupe
      // setGroupMessages(data);
      setGroupMessages((prevMessages) => [...prevMessages, ...data]);
    });
  }, [socket]);

  return (
    <div className="App">
      <button onClick={joinGroup}>Join Groupe</button>
      <br /><br />
      <input placeholder='Group name...' onChange={(event) => {
        setGroup(event.target.value);
      }} />
      <h1>Groupe :</h1>
      <p>{group.room}</p>

      <br /><br />

      <input placeholder='Message...' onChange={(event) => {
        setMessage(event.target.value);
      }} />
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message :</h1>
      <ul>
        {groupMessages.map((data, index) => (
          <li key={index}>{data.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
