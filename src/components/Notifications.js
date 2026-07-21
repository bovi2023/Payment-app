import React, { useContext } from 'react';
import { NotificationContext } from '../context/NotificationContext';
import '../styles/Notifications.css';

function Notifications() {
  const { notifications, removeNotification } = useContext(NotificationContext);

  return (
    <div className="notifications-container">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`notification notification-${notification.type}`}
        >
          <div className="notification-content">
            {notification.message}
          </div>
          <button
            className="notification-close"
            onClick={() => removeNotification(notification.id)}
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

export default Notifications;