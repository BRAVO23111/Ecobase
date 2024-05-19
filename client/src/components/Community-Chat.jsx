// src/Chat.js
import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase-config';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    let imageUrl = '';
    if (image) {
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    }
    await addDoc(collection(db, 'messages'), {
      text: message,
      createdAt: new Date(),
      imageUrl,
    });
    setMessage('');
    setImage(null);
  };

  return (
    <div className="container mx-auto p-4 bg-white rounded shadow-lg">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Community Chat</h1>
        <div className="overflow-auto h-96 border p-4 rounded bg-gray-50">
          {messages.map(({ id, text, imageUrl }) => (
            <div key={id} className="mb-4">
              <p className="text-gray-800">{text}</p>
              {imageUrl && <img src={imageUrl} alt="uploaded" className="mt-2 w-32 h-auto rounded" />}
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={sendMessage} className="flex flex-col space-y-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
