import AuthOverlay from "./components/AuthOverlay"
import useGeneralStore from "./stores/generalStore"


function App() {
  const isLoginOpen = useGeneralStore((state) => state.isLoginOpen)

  return (
    <div>
      {isLoginOpen && <AuthOverlay />}
    </div>
  )
}

export default App
