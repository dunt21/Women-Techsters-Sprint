import { useNetworkStatus } from "@/hooks/useNetworkStatus";

import { AppRoute } from "@/routes/AppRoute";

function App() {
  const isOnline = useNetworkStatus();

  return <AppRoute />;
}

export default App;
