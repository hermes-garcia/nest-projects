import './style.css';
import { connectToServer } from './socket-client.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Websocket - Client</h2>
    
    <input type="text" placeholder="token" id="jwt">
    <button id="btn-connect">Connect</button>
    <br>
    <span id="server-status">offline</span>
    
    <ul id="clients-ul"></ul>
   
    
    <form id="message-form">
      <input type="text" placeholder="message" id="message-input">
    </form>
    
    <h3>Messages</h3>
    <ul id="messages-ul"></ul>    
  </div>
`;

//connectToServer();

const inputJwt = document.querySelector<HTMLInputElement>('#jwt')!;
const btnConnect = document.querySelector('#btn-connect')!;

btnConnect.addEventListener('click', () => {
  if (inputJwt.value.trim().length <= 0) return alert('Enter a valid JWT!');

  connectToServer(inputJwt.value.trim());
});
