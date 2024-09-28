import React, { useState, useEffect, useRef } from 'react';
import { firestore } from '../../../firebaseConfig';
import { query, where, getDocs, serverTimestamp, getDoc, arrayUnion } from 'firebase/firestore';
import { collection, doc, addDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import './MessagePopup.css';

// Define an interface for the thread data
interface ThreadData {
  participants: string[];
  propertyId: string[];
  lastMessage?: string;
  lastUpdated?: any;
  recipientName?: string;
}

interface MessagePopupProps {
  threadId: string | null;
  senderId: string;
  recipientId: string;
  propertyId: string;
  propertyName: string;
  propertyType: string;
  propertyLocation: string;
  onClose: () => void;
}

const MessagePopup: React.FC<MessagePopupProps> = ({
  threadId,
  senderId,
  recipientId,
  propertyId,
  propertyName,
  propertyType,
  propertyLocation,
  onClose,
}) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const placeholderText = `I am interested in ${propertyName}, ${propertyType}, ${propertyLocation}`;

  useEffect(() => {
    if (threadId) {
      const messagesRef = collection(firestore, 'threads', threadId, 'messages');
      const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
        const messages = snapshot.docs.map((doc) => doc.data());
        setMessages(messages);
      });

      return () => unsubscribe();
    }
  }, [threadId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      console.log('Attempting to fetch recipient data...');

      // Fetch recipient's name from Firestore
      const recipientDocRef = doc(firestore, 'users', recipientId);
      const recipientDoc = await getDoc(recipientDocRef);

      if (!recipientDoc.exists()) {
        console.error('Recipient not found');
        return;
      }

      const recipientName = recipientDoc.data()?.name;
      console.log('Fetched recipientName:', recipientName);

      // Check if a thread already exists with both participants
      const threadsRef = collection(firestore, 'threads');
      const threadsQuery = query(
        threadsRef,
        where('participants', 'array-contains', senderId) // Use array-contains to find threads where the sender is a participant
      );
      const threadsSnapshot = await getDocs(threadsQuery);

      let existingThreadId: string | null = null;
      let existingThreadDoc: ThreadData | null = null;

      // Filter threads to find one that includes both participants
      threadsSnapshot.forEach((doc) => {
        const data = doc.data() as ThreadData;
        if (
          data.participants.includes(recipientId) // Check if the recipient is also in the participants list
        ) {
          existingThreadId = doc.id;
          existingThreadDoc = data;
        }
      });

      if (existingThreadId && existingThreadDoc) {
        // Ensure propertyId is added to the existing thread if not already present
        console.log('Property ID at first ',propertyId )
        const propertyIds: string[] = (existingThreadDoc as ThreadData).propertyId || [];
        if (!propertyIds.includes(propertyId)) {
          console.log('Updating thread with new propertyId:', propertyId);

          const threadDocRef = doc(firestore, 'threads', existingThreadId);
          await updateDoc(threadDocRef, {
            propertyId: arrayUnion(propertyId), // Use arrayUnion to add the propertyId
          });
        }

        // Add a message to the existing thread
        console.log('Adding message to existing thread:', existingThreadId);
        const messagesRef = collection(firestore, 'threads', existingThreadId, 'messages');
        await addDoc(messagesRef, {
          senderId,
          text: newMessage,
          timestamp: serverTimestamp(),
        });

        // Update the thread's last message and timestamp
        await updateDoc(doc(firestore, 'threads', existingThreadId), {
          lastMessage: newMessage,
          lastUpdated: serverTimestamp(),
        });
      } else {
        // Create a new thread if one doesn't exist
        const initialData: ThreadData = {
          participants: [senderId, recipientId],
          propertyId: [propertyId],
          lastMessage: newMessage,
          lastUpdated: serverTimestamp(),
          recipientName: recipientName, // Add recipientName to the initial data
        };

        console.log('Initial data being sent to Firestore:', initialData);

        // Create the new thread
        const newThreadRef = await addDoc(threadsRef, initialData);
        console.log('New thread created:', newThreadRef.id);

        // Add the first message to the new thread
        const messagesRef = collection(firestore, 'threads', newThreadRef.id, 'messages');
        await addDoc(messagesRef, {
          senderId,
          text: newMessage,
          timestamp: serverTimestamp(),
        });
      }

      setNewMessage('');
      onClose();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleTextareaFocus = () => {
    if (!newMessage.trim()) {
      setNewMessage(placeholderText);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.setSelectionRange(placeholderText.length, placeholderText.length);
        }
      }, 0);
    }
  };

  return (
    <div className="message-popup">
      <div className="mpopup-content">
        <button onClick={onClose} className="close-button">X</button>
       
        <div className="message-input">
          <textarea
            ref={textareaRef}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onFocus={handleTextareaFocus}
            placeholder={placeholderText}
            rows={4}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default MessagePopup;
