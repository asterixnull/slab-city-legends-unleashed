
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/layout/NavBar";
import { Footer } from "./components/layout/Footer";
import Index from "./pages/Index";
import Decks from "./pages/Decks";
import Characters from "./pages/Characters";
import Locations from "./pages/Locations";
import Leaderboard from "./pages/Leaderboard";
import Submit from "./pages/Submit";
import Messages from "./pages/Messages";
import Donate from "./pages/Donate";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <NavBar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/decks" element={<Decks />} />
              <Route path="/characters" element={<Characters />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/submit" element={<Submit />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
