import React, { useState } from "react";
import { useGetNotificationsQuery } from "@/state/api";

const NotificationsPopover = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: notifications, isLoading, isError } = useGetNotificationsQuery();

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching notifications</div>;

  return (
    <div style={{ position: "relative" }}>
      <button onClick={togglePopover}>Notifications</button>
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            padding: "10px",
            width: "300px",
            zIndex: 1000,
          }}
        >
          <h3>Notifications</h3>
          <ul>
            {notifications?.map((notification) => (
              <li key={notification.notificationId}>
                <strong>From User {notification.userId}:</strong>{" "}
                {notification.message}
                <br />
                <small>{new Date(notification.createdAt).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationsPopover;