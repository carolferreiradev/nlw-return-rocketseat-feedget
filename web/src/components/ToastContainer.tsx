import { ToastContainer as Container } from "react-toastify";

export function ToastContainer() {
  return (
    <Container
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}
