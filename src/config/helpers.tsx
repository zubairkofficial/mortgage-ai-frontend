import ReactDOM from "react-dom/client";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

class Helpers {
  static localhost: string = "http://localhost:8080";
  static server: string ="https://api.example.com";
  static basePath: string = Helpers.localhost;
  static apiUrl: string = `${Helpers.basePath}/api/v1/`;

  static authUser: Record<string, any> = JSON.parse(
    localStorage.getItem("user") ?? "{}"
  );

  static serverImage = (name: string): string => {
    return `${Helpers.basePath}/${name}`;
  };

  static getToken = (): string | null => {
    const token = localStorage.getItem("token");
    return token;
  };

  static getItem = (data: string, isJson: boolean = false): any => {
    if (isJson) {
      return JSON.parse(localStorage.getItem(data) ?? "null");
    } else {
      return localStorage.getItem(data);
    }
  };

  static authHeaders = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  static authFileHeaders = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${Helpers.getToken()}`,
    },
  };

  static setItem = (key: string, data: any, isJson: boolean = false): void => {
    if (isJson) {
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      localStorage.setItem(key, data);
    }
  };

  static showToast = (
    message: string,
    type: 'success' | 'error' | 'info' = 'info',
    duration: number = 3000
  ): void => {
    // Create a container for Toaster if it doesn't exist
    let toasterContainer = document.getElementById('toaster-container');
    if (!toasterContainer) {
      toasterContainer = document.createElement('div');
      toasterContainer.id = 'toaster-container';
      document.body.appendChild(toasterContainer);
      
      // Render the Toaster component into the container
      const root = ReactDOM.createRoot(toasterContainer);
      root.render(<Toaster />);
    }
    
    // Show the toast
    toast[type](message, {
      duration: duration,
    });
  };
}

export default Helpers;
