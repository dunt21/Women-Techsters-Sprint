import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success(`Your internet connectivity is back 🎉 `, {
        id: "network-status",
      });
    };

    const handleOffline = () => {
      setIsOnline(false);

      toast.error(
        "You're offline. Please check your internet to connect again❗",
        {
          id: "network-status",
        },
      );
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
};

// export const useNetworkStatus;
