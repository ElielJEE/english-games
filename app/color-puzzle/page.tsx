"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Home, Heart, Clock, Trophy, AlertCircle } from "lucide-react"
import Link from "next/link"

// Word categories with related words
const wordCategories = [
  {
    category: "Frutas",
    words: ["APPLE", "GRAPE", "PEACH", "LEMON", "MELON"],
  },
  {
    category: "Animales",
    words: ["TIGER", "EAGLE", "WHALE", "HORSE", "SNAKE"],
  },
  {
    category: "Colores",
    words: ["GREEN", "WHITE", "BLACK", "BROWN", "CORAL"],
  },
  {
    category: "Países",
    words: ["SPAIN", "JAPAN", "ITALY", "CHINA", "INDIA"],
  },
  {
    category: "Deportes",
    words: ["SOCCER", "TENNIS", "BOXING", "HOCKEY", "RUGBY"],
  },
  {
    category: "Instrumentos",
    words: ["PIANO", "GUITAR", "VIOLIN", "DRUMS", "FLUTE"],
  },
  {
    category: "Profesiones",
    words: ["DOCTOR", "TEACHER", "LAWYER", "ARTIST", "WRITER"],
  },
  {
    category: "Clima",
    words: ["SUNNY", "RAINY", "WINDY", "SNOWY", "FOGGY"],
  },
]

// Colors for repeated letters
const letterColors = [
  "bg-blue-400",
  "bg-red-400",
  "bg-green-400",
  "bg-yellow-400",
  "bg-purple-400",
  "bg-pink-400",
  "bg-orange-400",
  "bg-teal-400",
  "bg-indigo-400",
  "bg-cyan-400",
]

type LetterInfo = {
  letter: string
  color: string
  revealed: boolean
}

type WordInput = {
  value: string
  completed: boolean
}

export default function ColorPuzzlePage() {
  const [currentCategory, setCurrentCategory] = useState<(typeof wordCategories)[0] | null>(null)
  const [wordLetters, setWordLetters] = useState<LetterInfo[][]>([])
  const [lives, setLives] = useState(3)
  const [timeLeft, setTimeLeft] = useState(60)
  const [customTime, setCustomTime] = useState("60")
  const [isPlaying, setIsPlaying] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  const [wordInputs, setWordInputs] = useState<WordInput[]>([])
  const [selectedWordIndex, setSelectedWordIndex] = useState<number | null>(null)
  const [selectedLetterIndex, setSelectedLetterIndex] = useState<number | null>(null)

  // Sound functions
  const playSound = useCallback((type: "correct" | "wrong" | "win" | "lose" | "tick" | "start") => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    switch (type) {
      case "correct":
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime)
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1)
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.3)
        break
      case "wrong":
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime)
        oscillator.frequency.setValueAtTime(100, audioContext.currentTime + 0.2)
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.3)
        break
      case "win":
        const notes = [523.25, 587.33, 659.25, 783.99]
        notes.forEach((freq, i) => {
          const osc = audioContext.createOscillator()
          const gain = audioContext.createGain()
          osc.connect(gain)
          gain.connect(audioContext.destination)
          osc.frequency.setValueAtTime(freq, audioContext.currentTime + i * 0.15)
          gain.gain.setValueAtTime(0.2, audioContext.currentTime + i * 0.15)
          gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.15 + 0.3)
          osc.start(audioContext.currentTime + i * 0.15)
          osc.stop(audioContext.currentTime + i * 0.15 + 0.3)
        })
        return
      case "lose":
        oscillator.frequency.setValueAtTime(300, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.5)
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.5)
        break
      case "tick":
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.1)
        break
      case "start":
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime)
        oscillator.frequency.setValueAtTime(554.37, audioContext.currentTime + 0.1)
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.3)
        break
    }
  }, [])

  // Initialize game
  const initializeGame = useCallback(() => {
    const randomCategory = wordCategories[Math.floor(Math.random() * wordCategories.length)]
    setCurrentCategory(randomCategory)

    // Find all repeated letters across all words
    const letterCount: { [key: string]: number } = {}
    randomCategory.words.forEach((word) => {
      word.split("").forEach((letter) => {
        letterCount[letter] = (letterCount[letter] || 0) + 1
      })
    })

    // Assign colors to repeated letters
    const letterColorMap: { [key: string]: string } = {}
    let colorIndex = 0
    Object.entries(letterCount).forEach(([letter, count]) => {
      if (count > 1) {
        letterColorMap[letter] = letterColors[colorIndex % letterColors.length]
        colorIndex++
      }
    })

    // Create word letters with colors
    const newWordLetters = randomCategory.words.map((word) =>
      word.split("").map((letter) => ({
        letter,
        color: letterColorMap[letter] || "bg-white",
        revealed: false,
      })),
    )

    setWordLetters(newWordLetters)
    setWordInputs(randomCategory.words.map(() => ({ value: "", completed: false })))
    setLives(3)
    setTimeLeft(Number.parseInt(customTime))
    setIsPlaying(true)
    setGameOver(false)
    setWon(false)
    playSound("start")
  }, [customTime, playSound])

  // Timer effect
  useEffect(() => {
    if (!isPlaying || gameOver) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameOver(true)
          setIsPlaying(false)
          playSound("lose")
          return 0
        }
        if (prev <= 10) {
          playSound("tick")
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isPlaying, gameOver, playSound])

  // Check if game is won
  useEffect(() => {
    if (wordLetters.length === 0) return

    const allRevealed = wordLetters.every((word) => word.every((letter) => letter.revealed))

    if (allRevealed && isPlaying) {
      setWon(true)
      setGameOver(true)
      setIsPlaying(false)
      playSound("win")
    }
  }, [wordLetters, isPlaying, playSound])

  // Handle letter input
  const handleLetterSubmit = () => {
    if (!currentCategory || gameOver) return

    const letter = wordInputs[0].value.toUpperCase()
    const currentWord = wordLetters[0]
    const currentLetter = currentWord[0]

    if (letter === currentLetter.letter) {
      // Correct letter - reveal all instances of this letter
      playSound("correct")
      const newWordLetters = wordLetters.map((word) =>
        word.map((l) => ({
          ...l,
          revealed: l.letter === letter ? true : l.revealed,
        })),
      )
      setWordLetters(newWordLetters)

      // Move to next unrevealed letter
      let found = false
      for (let i = 0; i < wordLetters.length && !found; i++) {
        for (let j = 0; j < wordLetters[i].length && !found; j++) {
          if (!newWordLetters[i][j].revealed) {
            setSelectedWordIndex(i)
            setSelectedLetterIndex(j)
            found = true
          }
        }
      }
    } else {
      // Wrong letter
      playSound("wrong")
      setLives((prev) => {
        const newLives = prev - 1
        if (newLives <= 0) {
          setGameOver(true)
          setIsPlaying(false)
          playSound("lose")
        }
        return newLives
      })
    }

    setWordInputs([{ value: "", completed: false }])
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleWordSubmit = (wordIndex: number) => {
    if (gameOver || wordInputs[wordIndex].completed) return

    const inputWord = wordInputs[wordIndex].value.toUpperCase().trim()
    const correctWord = currentCategory?.words[wordIndex]

    if (inputWord === correctWord) {
      // Correct word - reveal all letters
      playSound("correct")
      const newWordLetters = [...wordLetters]
      newWordLetters[wordIndex] = newWordLetters[wordIndex].map((l) => ({
        ...l,
        revealed: true,
      }))
      setWordLetters(newWordLetters)

      // Mark word as completed
      const newWordInputs = [...wordInputs]
      newWordInputs[wordIndex].completed = true
      setWordInputs(newWordInputs)
    } else {
      // Wrong word
      playSound("wrong")
      setLives((prev) => {
        const newLives = prev - 1
        if (newLives <= 0) {
          setGameOver(true)
          setIsPlaying(false)
          playSound("lose")
        }
        return newLives
      })
      // Clear the input
      const newWordInputs = [...wordInputs]
      newWordInputs[wordIndex].value = ""
      setWordInputs(newWordInputs)
    }
  }

  const handleInputChange = (wordIndex: number, value: string) => {
    const newWordInputs = [...wordInputs]
    newWordInputs[wordIndex].value = value
    setWordInputs(newWordInputs)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="outline" size="icon">
              <Home className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-balance">Puzzle de Colores</h1>
          <div className="w-10" />
        </div>

        {!isPlaying && !gameOver && (
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>Configurar Juego</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Tiempo Predefinido</Label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  <Button variant={customTime === "30" ? "default" : "outline"} onClick={() => setCustomTime("30")}>
                    30 seg
                  </Button>
                  <Button variant={customTime === "60" ? "default" : "outline"} onClick={() => setCustomTime("60")}>
                    1 min
                  </Button>
                  <Button variant={customTime === "90" ? "default" : "outline"} onClick={() => setCustomTime("90")}>
                    1:30 min
                  </Button>
                  <Button variant={customTime === "120" ? "default" : "outline"} onClick={() => setCustomTime("120")}>
                    2 min
                  </Button>
                  <Button variant={customTime === "180" ? "default" : "outline"} onClick={() => setCustomTime("180")}>
                    3 min
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-time">Tiempo Personalizado (segundos)</Label>
                <Input
                  id="custom-time"
                  type="number"
                  min="60"
                  value={customTime}
                  onChange={(e) => setCustomTime(e.target.value)}
                  placeholder="Ingresa segundos"
                />
              </div>

              <Button onClick={initializeGame} size="lg" className="w-full">
                Comenzar Juego
              </Button>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg space-y-2">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div className="space-y-1 text-sm">
                    <p className="font-semibold text-blue-900 dark:text-blue-100">Cómo Jugar:</p>
                    <ul className="list-disc list-inside space-y-1 text-blue-800 dark:text-blue-200">
                      <li>Completa palabras relacionadas entre sí</li>
                      <li>Las letras del mismo color se repiten en diferentes palabras</li>
                      <li>Las letras blancas son únicas</li>
                      <li>Tienes 3 vidas - cada error resta una vida</li>
                      <li>Completa todas las palabras antes de que se acabe el tiempo</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {isPlaying && (
          <>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Card className="flex-1 min-w-[150px]">
                <CardContent className="flex items-center gap-2 p-4">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span className="text-lg font-semibold">Vidas: {lives}</span>
                </CardContent>
              </Card>

              <Card className="flex-1 min-w-[150px]">
                <CardContent className="flex items-center gap-2 p-4">
                  <Clock className={`h-5 w-5 ${timeLeft <= 10 ? "text-red-500" : "text-blue-500"}`} />
                  <span className={`text-lg font-semibold ${timeLeft <= 10 ? "text-red-500" : ""}`}>
                    {formatTime(timeLeft)}
                  </span>
                </CardContent>
              </Card>

              <Card className="flex-1 min-w-[200px]">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">Categoría:</p>
                  <p className="text-lg font-semibold">{currentCategory?.category}</p>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle>Completa las Palabras</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {wordLetters.map((word, wordIndex) => (
                  <div key={wordIndex} className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {word.map((letterInfo, letterIndex) => (
                        <div
                          key={letterIndex}
                          className={`
                            w-12 h-12 md:w-14 md:h-14 flex items-center justify-center
                            text-xl md:text-2xl font-bold rounded-lg border-2
                            transition-all duration-300
                            ${letterInfo.color}
                            ${letterInfo.color === "bg-white" ? "text-black border-gray-300" : "text-white border-transparent"}
                            ${letterInfo.revealed ? "opacity-100 scale-100" : "opacity-40"}
                          `}
                        >
                          {letterInfo.revealed ? letterInfo.letter : "?"}
                        </div>
                      ))}
                    </div>

                    {!wordInputs[wordIndex]?.completed && (
                      <div className="flex gap-2 max-w-md mx-auto">
                        <Input
                          type="text"
                          value={wordInputs[wordIndex]?.value || ""}
                          onChange={(e) => handleInputChange(wordIndex, e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleWordSubmit(wordIndex)}
                          placeholder="Escribe la palabra completa"
                          className="text-center text-lg font-semibold uppercase"
                          disabled={wordInputs[wordIndex]?.completed}
                        />
                        <Button onClick={() => handleWordSubmit(wordIndex)} size="lg" className="px-8">
                          Enviar
                        </Button>
                      </div>
                    )}

                    {wordInputs[wordIndex]?.completed && (
                      <div className="text-center">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full font-semibold">
                          <Trophy className="h-4 w-4" />
                          ¡Completada!
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </>
        )}

        {gameOver && (
          <Card className="shadow-xl">
            <CardContent className="p-8 text-center space-y-6">
              {won ? (
                <>
                  <Trophy className="h-20 w-20 text-yellow-500 mx-auto" />
                  <h2 className="text-3xl font-bold text-green-600">¡Felicidades! 🎉</h2>
                  <p className="text-lg">Has completado todas las palabras correctamente</p>
                  <p className="text-muted-foreground">Categoría: {currentCategory?.category}</p>
                </>
              ) : (
                <>
                  <AlertCircle className="h-20 w-20 text-red-500 mx-auto" />
                  <h2 className="text-3xl font-bold text-red-600">Juego Terminado</h2>
                  <p className="text-lg">{lives <= 0 ? "Te quedaste sin vidas" : "Se acabó el tiempo"}</p>
                  <div className="space-y-2">
                    <p className="font-semibold">Las palabras eran:</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {currentCategory?.words.map((word, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg font-mono">
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
              <Button onClick={initializeGame} size="lg" className="w-full">
                Jugar de Nuevo
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
