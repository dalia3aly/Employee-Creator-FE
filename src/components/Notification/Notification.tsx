import React from "react";

interface NotificationProps {
  message: string;
  type: "success" | "error";
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  const notificationStyles = `fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md text-white z-50 shadow-lg ${
    type === "success" ? "bg-green-500" : "bg-red-500"
  }`;

  return <div className={notificationStyles}>{message}</div>;
};

export default Notification;
