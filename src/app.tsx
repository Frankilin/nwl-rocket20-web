import { Route, Routes } from "react-router-dom";
import "./index.css";
import { CreateRoom } from "./pages/room/create/create-room";
import { Room } from "./pages/room/create/room-detail";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecordRoomAudio } from "./pages/record-room-audio/create/record-room-audio";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index element={<CreateRoom />} />
          <Route index element={<Room />} path="/room/:roomId" />
          <Route index element={<RecordRoomAudio />} path="/room/:roomId/audio" />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
