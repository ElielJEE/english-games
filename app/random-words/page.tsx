"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Shuffle, Home, Check, Timer } from "lucide-react"
import Link from "next/link"

// Diccionario de palabras con traducciones al español
const wordsWithTranslations: Array<{ english: string; spanish: string }> = [
  { english: "Apple", spanish: "Manzana" },
  { english: "Book", spanish: "Libro" },
  { english: "Cat", spanish: "Gato" },
  { english: "Dog", spanish: "Perro" },
  { english: "Elephant", spanish: "Elefante" },
  { english: "Flower", spanish: "Flor" },
  { english: "Garden", spanish: "Jardín" },
  { english: "House", spanish: "Casa" },
  { english: "Island", spanish: "Isla" },
  { english: "Journey", spanish: "Viaje" },
  { english: "King", spanish: "Rey" },
  { english: "Lion", spanish: "León" },
  { english: "Mountain", spanish: "Montaña" },
  { english: "Night", spanish: "Noche" },
  { english: "Ocean", spanish: "Océano" },
  { english: "Peace", spanish: "Paz" },
  { english: "Queen", spanish: "Reina" },
  { english: "Rainbow", spanish: "Arcoíris" },
  { english: "Star", spanish: "Estrella" },
  { english: "Thunder", spanish: "Trueno" },
  { english: "Universe", spanish: "Universo" },
  { english: "Victory", spanish: "Victoria" },
  { english: "Water", spanish: "Agua" },
  { english: "Yellow", spanish: "Amarillo" },
  { english: "Zenith", spanish: "Cenit" },
  { english: "Beautiful", spanish: "Hermoso" },
  { english: "Courage", spanish: "Coraje" },
  { english: "Dream", spanish: "Sueño" },
  { english: "Energy", spanish: "Energía" },
  { english: "Freedom", spanish: "Libertad" },
  { english: "Happiness", spanish: "Felicidad" },
  { english: "Imagination", spanish: "Imaginación" },
  { english: "Knowledge", spanish: "Conocimiento" },
  { english: "Love", spanish: "Amor" },
  { english: "Music", spanish: "Música" },
  { english: "Nature", spanish: "Naturaleza" },
  { english: "Passion", spanish: "Pasión" },
  { english: "Wisdom", spanish: "Sabiduría" },
  { english: "Adventure", spanish: "Aventura" },
  { english: "Butterfly", spanish: "Mariposa" },
  { english: "Castle", spanish: "Castillo" },
  { english: "Dragon", spanish: "Dragón" },
  { english: "Forest", spanish: "Bosque" },
  { english: "Galaxy", spanish: "Galaxia" },
  { english: "Horizon", spanish: "Horizonte" },
  { english: "Jungle", spanish: "Jungla" },
  { english: "Lightning", spanish: "Relámpago" },
  { english: "Miracle", spanish: "Milagro" },
  { english: "Phoenix", spanish: "Fénix" },
  { english: "River", spanish: "Río" },
  { english: "Storm", spanish: "Tormenta" },
  { english: "Treasure", spanish: "Tesoro" },
  { english: "Volcano", spanish: "Volcán" },
  { english: "Warrior", spanish: "Guerrero" },
  { english: "Crystal", spanish: "Cristal" },
  { english: "Diamond", spanish: "Diamante" },
  { english: "Emerald", spanish: "Esmeralda" },
  { english: "Fire", spanish: "Fuego" },
  { english: "Gold", spanish: "Oro" },
  { english: "Heart", spanish: "Corazón" },
  { english: "Ice", spanish: "Hielo" },
  { english: "Jewel", spanish: "Joya" },
  { english: "Knight", spanish: "Caballero" },
  { english: "Light", spanish: "Luz" },
  { english: "Moon", spanish: "Luna" },
  { english: "Paradise", spanish: "Paraíso" },
  { english: "Rose", spanish: "Rosa" },
  { english: "Sun", spanish: "Sol" },
  { english: "Tiger", spanish: "Tigre" },
  { english: "Wind", spanish: "Viento" },
  { english: "Angel", spanish: "Ángel" },
  { english: "Bridge", spanish: "Puente" },
  { english: "Cloud", spanish: "Nube" },
  { english: "Dance", spanish: "Danza" },
  { english: "Eagle", spanish: "Águila" },
  { english: "Falcon", spanish: "Halcón" },
  { english: "Guitar", spanish: "Guitarra" },
  { english: "Harmony", spanish: "Armonía" },
  { english: "Infinity", spanish: "Infinito" },
  { english: "Joy", spanish: "Alegría" },
]

const playExplosionSound = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillator.frequency.setValueAtTime(200, audioContext.currentTime)
  oscillator.frequency.exponentialRampToValueAtTime(20, audioContext.currentTime + 0.5)

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + 0.5)
}

const playHappySound = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  const notes = [523.25, 659.25, 783.99] // C, E, G (acorde mayor)

  notes.forEach((freq, index) => {
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = freq
    oscillator.type = "sine"

    const startTime = audioContext.currentTime + index * 0.1
    gainNode.gain.setValueAtTime(0.2, startTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3)

    oscillator.start(startTime)
    oscillator.stop(startTime + 0.3)
  })
}

const playGenerateSound = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillator.frequency.setValueAtTime(400, audioContext.currentTime)
  oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.1)

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + 0.1)
}

const createConfetti = () => {
  const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]
  const confettiCount = 50

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div")
    confetti.className = "confetti"
    confetti.style.left = Math.random() * 100 + "vw"
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
    confetti.style.animationDelay = Math.random() * 0.3 + "s"
    document.body.appendChild(confetti)

    setTimeout(() => confetti.remove(), 3000)
  }
}

export default function RandomWordsGame() {
  const [currentWord, setCurrentWord] = useState<{ english: string; spanish: string } | null>(null)
  const [usedWords, setUsedWords] = useState<Set<string>>(new Set())
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [customTime, setCustomTime] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<number | null>(null)
  const [isExploding, setIsExploding] = useState(false)
  const [showWord, setShowWord] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const presetTimes = [
    { label: "30 seg", value: 30 },
    { label: "1 min", value: 60 },
    { label: "1:30 min", value: 90 },
    { label: "2 min", value: 120 },
    { label: "3 min", value: 180 },
  ]

  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      handleTimeExpired()
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [timeLeft])

  const handleTimeExpired = () => {
    playExplosionSound()
    setIsExploding(true)
    setTimeout(() => {
      setIsExploding(false)
      setCurrentWord(null)
      setShowWord(false)
      setTimeLeft(null)
    }, 1000)
  }

  const generateWord = () => {
    const time = customTime ? Number.parseInt(customTime) : selectedTime
    if (!time || time <= 0) {
      alert("Por favor selecciona o ingresa un tiempo válido")
      return
    }

    const availableWords = wordsWithTranslations.filter((word) => !usedWords.has(word.english))

    if (availableWords.length === 0) {
      setUsedWords(new Set())
      return
    }

    const randomIndex = Math.floor(Math.random() * availableWords.length)
    const selectedWord = availableWords[randomIndex]

    playGenerateSound()
    setCurrentWord(selectedWord)
    setUsedWords((prev) => new Set([...prev, selectedWord.english]))
    setTimeLeft(time)
    setShowWord(true)
    setIsExploding(false)
  }

  const handleDone = () => {
    playHappySound()
    createConfetti()
    setTimeout(() => {
      setCurrentWord(null)
      setShowWord(false)
      setTimeLeft(null)
    }, 1000)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <style jsx global>{`
        .confetti {
          position: fixed;
          width: 10px;
          height: 10px;
          top: -10px;
          z-index: 9999;
          animation: confetti-fall 3s linear forwards;
        }

        @keyframes confetti-fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        .explode {
          animation: explode 1s ease-out forwards;
        }

        @keyframes explode {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.5;
          }
          100% {
            transform: scale(0);
            opacity: 0;
          }
        }

        .word-appear {
          animation: word-appear 0.5s ease-out forwards;
        }

        @keyframes word-appear {
          0% {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
      `}</style>

      <div className="max-w-4xl mx-auto space-y-6">
        <Link href="/">
          <Button variant="outline" size="sm" className="mb-4 bg-transparent">
            <Home className="mr-2 h-4 w-4" />
            Volver al Menú
          </Button>
        </Link>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-balance">Palabras Aleatorias con Traducción</CardTitle>
            <CardDescription className="text-pretty">
              Genera palabras aleatorias en inglés y aprende su traducción al español
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!showWord && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Timer className="h-4 w-4" />
                    Selecciona el tiempo de visualización:
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {presetTimes.map((preset) => (
                      <Button
                        key={preset.value}
                        variant={selectedTime === preset.value ? "default" : "outline"}
                        onClick={() => {
                          setSelectedTime(preset.value)
                          setCustomTime("")
                        }}
                        className="w-full"
                      >
                        {preset.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">O ingresa tiempo personalizado (segundos):</label>
                  <Input
                    type="number"
                    placeholder="Ej: 45"
                    value={customTime}
                    onChange={(e) => {
                      setCustomTime(e.target.value)
                      setSelectedTime(null)
                    }}
                    min="1"
                    className="w-full"
                  />
                </div>

                <Button onClick={generateWord} className="w-full h-14 text-lg" size="lg">
                  <Shuffle className="mr-2 h-5 w-5" />
                  Generar Palabra
                </Button>
              </div>
            )}

            {showWord && currentWord && (
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Tiempo restante:</p>
                  <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                    {timeLeft !== null ? formatTime(timeLeft) : "0:00"}
                  </p>
                </div>

                <Card
                  className={`shadow-2xl border-4 ${isExploding ? "explode" : "word-appear"}`}
                  style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  }}
                >
                  <CardContent className="p-12">
                    <div className="space-y-6 text-center">
                      <div>
                        <p className="text-sm text-white/80 mb-2">English</p>
                        <p className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
                          {currentWord.english}
                        </p>
                      </div>
                      <div className="border-t-2 border-white/30 pt-6">
                        <p className="text-sm text-white/80 mb-2">Español</p>
                        <p className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
                          {currentWord.spanish}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button onClick={handleDone} className="w-full h-14 text-lg bg-green-600 hover:bg-green-700" size="lg">
                  <Check className="mr-2 h-5 w-5" />
                  Hecho
                </Button>
              </div>
            )}

            <div className="text-center text-sm text-muted-foreground">
              Palabras usadas: {usedWords.size} / {wordsWithTranslations.length}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
