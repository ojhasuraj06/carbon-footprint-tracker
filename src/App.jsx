import Navbar from "./components/Navbar"
import Dashboard from "./pages/Dashboard"
import History from "./pages/History"
import Activity from "./pages/Activity"
import Target from "./pages/Target"

function App() {

  const path = window.location.pathname

  let page

  if (path === "/history") {
    page = <History />
  } else if (path === "/activity") {
    page = <Activity />
  } else if (path === "/target") {
    page = <Target />
  } else {
    page = <Dashboard />
  }

  return (
    <div className="min-h-screen bg-[#f5fbf8]">
      <Navbar />
      {page}
    </div>
  )
}

export default App