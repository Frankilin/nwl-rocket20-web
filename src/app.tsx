import { Route, Routes } from "react-router-dom";
import "./index.css";
import { CreateRoom } from "./pages/create-room";
import { Room } from "./pages/room";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index element={<CreateRoom />} />
          <Route index element={<Room />} path="/room/:roomId" />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
