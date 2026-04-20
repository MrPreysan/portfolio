import Hero from './components/sections/Hero'
import Works from './components/sections/Works'
import About from './components/sections/About'

export default function App() {
  return (
    <main className="bg-black min-h-screen">
      <Hero />
      <Works />
      <About />
    </main>
  )
}
