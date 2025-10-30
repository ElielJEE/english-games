"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, RotateCcw } from "lucide-react"
import Link from "next/link"

// Diccionario de palabras para adivinar
const WORD_LIST = [
  "APPLE",
  "BEACH",
  "CHAIR",
  "DANCE",
  "EARTH",
  "FLAME",
  "GRAPE",
  "HEART",
  "IMAGE",
  "JUICE",
  "KNIFE",
  "LIGHT",
  "MUSIC",
  "NIGHT",
  "OCEAN",
  "PEACE",
  "QUEEN",
  "RIVER",
  "SMILE",
  "TIGER",
  "UNITY",
  "VOICE",
  "WATER",
  "YOUTH",
  "ZEBRA",
  "BREAD",
  "CLOUD",
  "DREAM",
  "FIELD",
  "GLASS",
  "HOUSE",
  "LEMON",
  "MONEY",
  "PLANT",
  "STORM",
  "TRAIN",
  "WORLD",
]

type LetterStatus = "correct" | "present" | "absent" | "empty"

interface Letter {
  char: string
  status: LetterStatus
}

export default function WordGuessGame() {
  const [targetWord, setTargetWord] = useState("")
  const [currentGuess, setCurrentGuess] = useState("")
  const [guesses, setGuesses] = useState<Letter[][]>([])
  const [currentRow, setCurrentRow] = useState(0)
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing")
  const [shake, setShake] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Inicializar juego
  useEffect(() => {
    startNewGame()
  }, [])

  const startNewGame = () => {
    const randomWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]
    setTargetWord(randomWord)
    setCurrentGuess("")
    setGuesses([])
    setCurrentRow(0)
    setGameStatus("playing")
    playSound("start")
  }

  // Función para reproducir sonidos
  const playSound = (type: "correct" | "present" | "absent" | "win" | "lose" | "start") => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    switch (type) {
      case "correct":
        oscillator.frequency.value = 800
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.3)
        break
      case "present":
        oscillator.frequency.value = 600
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.2)
        break
      case "absent":
        oscillator.frequency.value = 200
        gainNode.gain.setValueAtTime(0.15, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15)
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.15)
        break
      case "win":
        // Sonido de victoria (ascendente)
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.5)
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.5)
        break
      case "lose":
        // Sonido de derrota (descendente)
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.5)
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.5)
        break
      case "start":
        oscillator.frequency.value = 440
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.1)
        break
    }
  }

  const checkGuess = (guess: string): Letter[] => {
    const result: Letter[] = []
    const targetLetters = targetWord.split("")
    const guessLetters = guess.toUpperCase().split("")

    // Primero marcar las letras correctas (verde)
    const remainingTarget = [...targetLetters]
    const remainingGuess = guessLetters.map((char, i) => {
      if (char === targetLetters[i]) {
        remainingTarget[i] = ""
        return { char, status: "correct" as LetterStatus, processed: true }
      }
      return { char, status: "empty" as LetterStatus, processed: false }
    })

    // Luego marcar las letras presentes pero en posición incorrecta (amarillo)
    remainingGuess.forEach((item, i) => {
      if (!item.processed) {
        const targetIndex = remainingTarget.indexOf(item.char)
        if (targetIndex !== -1) {
          item.status = "present"
          remainingTarget[targetIndex] = ""
        } else {
          item.status = "absent"
        }
      }
    })

    return remainingGuess.map((item) => ({ char: item.char, status: item.status }))
  }

  const handleSubmit = () => {
    if (gameStatus !== "playing") return
    if (currentGuess.length !== targetWord.length) {
      setShake(true)
      setTimeout(() => setShake(false), 500)
      playSound("absent")
      return
    }

    const result = checkGuess(currentGuess)
    const newGuesses = [...guesses, result]
    setGuesses(newGuesses)

    // Reproducir sonidos según el resultado
    result.forEach((letter, index) => {
      setTimeout(() => {
        playSound(letter.status === "correct" ? "correct" : letter.status === "present" ? "present" : "absent")
      }, index * 100)
    })

    // Verificar si ganó
    if (currentGuess.toUpperCase() === targetWord) {
      setTimeout(
        () => {
          setGameStatus("won")
          playSound("win")
        },
        result.length * 100 + 200,
      )
    } else if (currentRow === 4) {
      // Último intento
      setTimeout(
        () => {
          setGameStatus("lost")
          playSound("lose")
        },
        result.length * 100 + 200,
      )
    } else {
      setCurrentRow(currentRow + 1)
    }

    setCurrentGuess("")
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit()
    }
  }

  // Renderizar grid de 5 filas
  const renderGrid = () => {
    const rows = []
    for (let i = 0; i < 5; i++) {
      const isCurrentRow = i === currentRow && gameStatus === "playing"
      const guess = guesses[i]

      rows.push(
        <div key={i} className={`flex gap-2 justify-center ${shake && isCurrentRow ? "animate-shake" : ""}`}>
          {Array.from({ length: targetWord.length }).map((_, j) => {
            let letter = ""
            let status: LetterStatus = "empty"

            if (guess && guess[j]) {
              letter = guess[j].char
              status = guess[j].status
            } else if (isCurrentRow && currentGuess[j]) {
              letter = currentGuess[j].toUpperCase()
            }

            const bgColor =
              status === "correct"
                ? "bg-green-500 text-white border-green-600"
                : status === "present"
                  ? "bg-yellow-500 text-white border-yellow-600"
                  : status === "absent"
                    ? "bg-red-500 text-white border-red-600"
                    : "bg-white border-gray-300"

            return (
              <div
                key={j}
                className={`w-12 h-12 md:w-16 md:h-16 border-2 rounded-lg flex items-center justify-center text-2xl font-bold transition-all duration-300 ${bgColor}`}
              >
                {letter}
              </div>
            )
          })}
        </div>,
      )
    }
    return rows
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="outline" size="icon">
              <Home className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-center text-balance">Adivina la Palabra</h1>
          <Button variant="outline" size="icon" onClick={startNewGame}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-center">
              {gameStatus === "playing" && `Intento ${currentRow + 1} de 5`}
              {gameStatus === "won" && "¡Felicidades! 🎉"}
              {gameStatus === "lost" && `Perdiste 😢 La palabra era: ${targetWord}`}
            </CardTitle>
            <CardDescription className="text-center text-pretty">
              {gameStatus === "playing" &&
                "Adivina la palabra. Verde = correcto, Amarillo = letra correcta pero mal posición, Rojo = letra incorrecta"}
              {gameStatus === "won" && "¡Has adivinado la palabra correctamente!"}
              {gameStatus === "lost" && "Se acabaron los intentos. ¡Intenta de nuevo!"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">{renderGrid()}</div>

            {gameStatus === "playing" && (
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  type="text"
                  value={currentGuess}
                  onChange={(e) => setCurrentGuess(e.target.value.toUpperCase())}
                  onKeyPress={handleKeyPress}
                  placeholder={`Escribe una palabra de ${targetWord.length} letras`}
                  maxLength={targetWord.length}
                  className="text-lg uppercase"
                  autoFocus
                />
                <Button onClick={handleSubmit} size="lg" className="bg-amber-500 hover:bg-amber-600">
                  Enviar
                </Button>
              </div>
            )}

            {gameStatus !== "playing" && (
              <Button onClick={startNewGame} size="lg" className="w-full bg-amber-500 hover:bg-amber-600">
                Jugar de Nuevo
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Cómo Jugar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded border-2 border-green-600"></div>
              <span>Letra correcta en la posición correcta</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-500 rounded border-2 border-yellow-600"></div>
              <span>Letra correcta pero en posición incorrecta</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-500 rounded border-2 border-red-600"></div>
              <span>Letra que no está en la palabra</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-10px);
          }
          75% {
            transform: translateX(10px);
          }
        }
        .animate-shake {
          animation: shake 0.5s;
        }
      `}</style>
    </div>
  )
}
