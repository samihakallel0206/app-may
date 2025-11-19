import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearNotification } from "../../redux/slices/notificationSlice";

const Notification = () => {
  const dispatch = useDispatch();
  const { message, type, show } = useSelector(
    (state) =>
      state.notification || {
        message: "",
        type: "info",
        show: false,
      }
  );

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        dispatch(clearNotification());
      }, 4000); // Disparaît après 4 secondes

      return () => clearTimeout(timer);
    }
  }, [show, dispatch]);

  const handleClose = () => {
    dispatch(clearNotification());
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return "fas fa-check-circle";
      case "error":
        return "fas fa-exclamation-circle";
      case "warning":
        return "fas fa-exclamation-triangle";
      case "info":
        return "fas fa-info-circle";
      default:
        return "fas fa-bell";
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case "success":
        return "#28a745";
      case "error":
        return "#dc3545";
      case "warning":
        return "#ffc107";
      case "info":
        return "#17a2b8";
      default:
        return "#E2001A";
    }
  };

  if (!show) return null;

  return (
    <div
      className="notification"
      style={{
        borderLeftColor: getBorderColor(),
        animation: "slideInRight 0.3s ease-out",
      }}
    >
      <div className="d-flex align-items-center">
        <i
          className={`${getIcon()} me-3`}
          style={{
            color: getBorderColor(),
            fontSize: "1.2rem",
          }}
        ></i>

        <div className="flex-grow-1">
          <div className="notification-content">
            <p className="mb-0" style={{ lineHeight: "1.4" }}>
              {message}
            </p>
          </div>
        </div>

        <button
          className="btn-close ms-3"
          onClick={handleClose}
          style={{ fontSize: "0.7rem" }}
          aria-label="Fermer la notification"
        ></button>
      </div>

      {/* Barre de progression */}
      {show && (
        <div
          className="notification-progress"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "3px",
            backgroundColor: getBorderColor(),
            animation: "progressBar 4s linear forwards",
            borderRadius: "0 0 10px 10px",
          }}
        ></div>
      )}

      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes progressBar {
          0% {
            width: 100%;
          }
          100% {
            width: 0%;
          }
        }

        .notification {
          position: fixed;
          top: 100px;
          right: 20px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
          padding: 1rem 1.5rem;
          z-index: 1060;
          transform: translateX(400px);
          transition: transform 0.3s ease;
          border-left: 4px solid;
          max-width: 400px;
          min-width: 300px;
          overflow: hidden;
        }

        .notification.show {
          transform: translateX(0);
        }

        @media (max-width: 768px) {
          .notification {
            right: 10px;
            left: 10px;
            max-width: none;
          }
        }
      `}</style>
    </div>
  );
};

// Version alternative avec CSS dans un fichier séparé
// Si vous préférez utiliser le CSS global, voici la version simplifiée :

const NotificationAlt = () => {
  const dispatch = useDispatch();
  const { message, type, show } = useSelector((state) => state.notification);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        dispatch(clearNotification());
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [show, dispatch]);

  const handleClose = () => {
    dispatch(clearNotification());
  };

  if (!show) return null;

  return (
    <div className={`notification ${type} show`}>
      <div className="d-flex align-items-center">
        <i className={`${getIcon(type)} me-3 notification-icon`}></i>

        <div className="flex-grow-1">
          <div className="notification-content">
            <p className="mb-0 notification-message">{message}</p>
          </div>
        </div>

        <button
          className="btn-close ms-3"
          onClick={handleClose}
          aria-label="Fermer la notification"
        ></button>
      </div>

      {/* Barre de progression */}
      <div className="notification-progress"></div>
    </div>
  );
};

// Fonction helper pour les icônes
const getIcon = (type) => {
  switch (type) {
    case "success":
      return "fas fa-check-circle text-success";
    case "error":
      return "fas fa-exclamation-circle text-danger";
    case "warning":
      return "fas fa-exclamation-triangle text-warning";
    case "info":
      return "fas fa-info-circle text-info";
    default:
      return "fas fa-bell text-primary";
  }
};

export default Notification;
