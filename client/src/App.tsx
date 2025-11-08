import './App.css'
import Button from '@mui/material/Button';
function App() {
  return (
   <div className="flex items-center justify-center min-h-screen bg-gray-100 p-8">
      {/* Test with Tailwind CSS classes */}
      <h1 className="text-4xl font-extrabold text-indigo-700 mb-6">
        MERN Stack UI Ready!
      </h1>

      {/* Test with a NextUI Component */}
      <Button color="primary" variant="contained">
        NextUI Primary Button
      </Button>
    </div>
  )
}

export default App
