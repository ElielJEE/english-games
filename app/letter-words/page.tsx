"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shuffle, Plus, Home, Check } from "lucide-react"
import Link from "next/link"

// Diccionario de palabras organizadas por letra inicial
const wordDictionary: Record<string, string[]> = {
  A: ["Apple", "Answer", "Animal", "Anchor", "Arrow", "Airplane", "Awesome", "Adventure", "Alphabet", "Amazing"],
  B: ["Bath", "Bat", "Ball", "Book", "Banana", "Butterfly", "Beautiful", "Brave", "Bridge", "Balloon"],
  C: ["Cab", "Cabbage", "Cat", "Car", "Coffee", "Castle", "Camera", "Chocolate", "Cloud", "Crystal"],
  D: ["Dog", "Dragon", "Dance", "Dream", "Diamond", "Dolphin", "Delicious", "Danger", "Desert", "Dinosaur"],
  E: ["Eagle", "Elephant", "Energy", "Earth", "Engine", "Emerald", "Excellent", "Evening", "Explore", "Empire"],
  F: ["Fish", "Flower", "Fire", "Forest", "Fantastic", "Freedom", "Falcon", "Fountain", "Future", "Festival"],
  G: ["Garden", "Galaxy", "Guitar", "Gold", "Giant", "Giraffe", "Graceful", "Glacier", "Genius", "Gravity"],
  H: ["House", "Happy", "Heart", "Horizon", "Harmony", "Helicopter", "Honey", "Hurricane", "Hero", "Heaven"],
  I: ["Ice", "Island", "Imagine", "Incredible", "Inspire", "Infinity", "Ivory", "Igloo", "Illusion", "Innovation"],
  J: ["Jungle", "Journey", "Joy", "Jewel", "Justice", "Jaguar", "Jazz", "Jupiter", "Joyful", "Jasmine"],
  K: ["King", "Kite", "Kitchen", "Kangaroo", "Knight", "Kindness", "Kingdom", "Knowledge", "Kaleidoscope", "Karma"],
  L: ["Lion", "Light", "Love", "Lemon", "Lighthouse", "Lightning", "Luxury", "Legend", "Liberty", "Lavender"],
  M: ["Moon", "Mountain", "Magic", "Music", "Miracle", "Mystery", "Magnificent", "Melody", "Meteor", "Marvel"],
  N: ["Nature", "Night", "Noble", "Nebula", "Nectar", "Ninja", "Nautical", "Nirvana", "Nomad", "Nucleus"],
  O: ["Ocean", "Orange", "Owl", "Orbit", "Oasis", "Optimism", "Orchid", "Oxygen", "Odyssey", "Onyx"],
  P: ["Peace", "Paradise", "Phoenix", "Planet", "Passion", "Pearl", "Pyramid", "Poetry", "Prism", "Puzzle"],
  Q: ["Queen", "Quest", "Quantum", "Quartz", "Quick", "Quiet", "Quality", "Quasar", "Quirky", "Quill"],
  R: ["Rainbow", "River", "Rose", "Rocket", "Royal", "Rhythm", "Radiant", "Rapture", "Realm", "Raven"],
  S: ["Star", "Sun", "Sky", "Storm", "Sapphire", "Serenity", "Spirit", "Symphony", "Sunset", "Sparkle"],
  T: ["Thunder", "Tiger", "Treasure", "Twilight", "Triumph", "Tranquil", "Tropical", "Titan", "Temple", "Turquoise"],
  U: ["Universe", "Unity", "Unique", "Umbrella", "Ultimate", "Utopia", "Urban", "Uplift", "Unicorn", "Ultraviolet"],
  V: ["Victory", "Voyage", "Velvet", "Vision", "Volcano", "Vibrant", "Virtue", "Valley", "Vortex", "Vivid"],
  W: [
    "Wonder",
    "Wisdom",
    "Waterfall",
    "Warrior",
    "Whisper",
    "Wildfire",
    "Wanderer",
    "Whirlwind",
    "Willow",
    "Wavelength",
  ],
  X: ["Xylophone", "Xenon", "Xerox", "Xanadu", "Xenial", "Xeric", "Xylem", "Xebec", "Xyst", "Xanthic"],
  Y: ["Yellow", "Youth", "Yearning", "Yonder", "Yacht", "Youthful", "Yield", "Yucca", "Yarn", "Yawn"],
  Z: ["Zenith", "Zephyr", "Zodiac", "Zealous", "Zigzag", "Zircon", "Zombie", "Zeppelin", "Zest", "Zero"],
}

const playAddLetterSound = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillator.frequency.setValueAtTime(600, audioContext.currentTime)
  oscillator.frequency.exponentialRampToValueAtTime(900, audioContext.currentTime + 0.1)

  gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + 0.1)
}

const playGenerateWordSound = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillator.frequency.setValueAtTime(400, audioContext.currentTime)
  oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.15)

  gainNode.gain.setValueAtTime(0.25, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15)

  oscillator.type = "sine"
  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + 0.15)
}

const playResetSound = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  const notes = [523.25, 392.0, 329.63] // C, G, E (descending)

  notes.forEach((freq, index) => {
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = freq
    oscillator.type = "sine"

    const startTime = audioContext.currentTime + index * 0.08
    gainNode.gain.setValueAtTime(0.15, startTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2)

    oscillator.start(startTime)
    oscillator.stop(startTime + 0.2)
  })
}

const playCelebrationSound = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  const notes = [523.25, 659.25, 783.99] // C, E, G (ascending chord)

  notes.forEach((freq, index) => {
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = freq
    oscillator.type = "sine"

    const startTime = audioContext.currentTime + index * 0.05
    gainNode.gain.setValueAtTime(0.2, startTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3)

    oscillator.start(startTime)
    oscillator.stop(startTime + 0.3)
  })
}

export default function LetterWordsGame() {
  const [letterInput, setLetterInput] = useState("")
  const [letters, setLetters] = useState<string[]>([])
  const [wordsByLetter, setWordsByLetter] = useState<Record<string, string[]>>({})
  const [usedWords, setUsedWords] = useState<Set<string>>(new Set())
  const [availableWords, setAvailableWords] = useState<string[]>([])
  const [generatedWord, setGeneratedWord] = useState<string | null>(null)
  const [pendingWord, setPendingWord] = useState<{ word: string; letter: string } | null>(null)

  const addLetter = () => {
    const letter = letterInput.trim().toUpperCase()
    if (letter && letter.length === 1 && /[A-Z]/.test(letter) && !letters.includes(letter)) {
      playAddLetterSound()

      const newLetters = [...letters, letter]
      setLetters(newLetters)
      setLetterInput("")

      setWordsByLetter((prev) => ({
        ...prev,
        [letter]: [],
      }))

      updateAvailableWords(newLetters)
    }
  }

  const updateAvailableWords = (lettersList: string[]) => {
    const words: string[] = []
    lettersList.forEach((letter) => {
      if (wordDictionary[letter]) {
        words.push(...wordDictionary[letter])
      }
    })
    setAvailableWords(words)
  }

  const generateRandomWord = () => {
    if (letters.length === 0 || availableWords.length === 0) {
      return
    }

    const unusedWords = availableWords.filter((word) => !usedWords.has(word))

    if (unusedWords.length === 0) {
      playResetSound()
      setUsedWords(new Set())
      setWordsByLetter(
        letters.reduce(
          (acc, letter) => {
            acc[letter] = []
            return acc
          },
          {} as Record<string, string[]>,
        ),
      )
      return
    }

    playGenerateWordSound()

    const randomIndex = Math.floor(Math.random() * unusedWords.length)
    const selectedWord = unusedWords[randomIndex]
    const firstLetter = selectedWord[0].toUpperCase()

    setGeneratedWord(selectedWord)
    setPendingWord({ word: selectedWord, letter: firstLetter })
  }

  const confirmWord = () => {
    if (!pendingWord) return

    playCelebrationSound()

    setWordsByLetter((prev) => ({
      ...prev,
      [pendingWord.letter]: [...(prev[pendingWord.letter] || []), pendingWord.word],
    }))

    setUsedWords((prev) => new Set([...prev, pendingWord.word]))
    setGeneratedWord(null)
    setPendingWord(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      {generatedWord && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full animate-in zoom-in-95 duration-500">
            <div className="text-center space-y-6">
              <div className="animate-in zoom-in duration-700 delay-100">
                <h2 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
                  {generatedWord}
                </h2>
              </div>
              <div className="flex justify-center gap-4 pt-4 animate-in slide-in-from-bottom duration-500 delay-300">
                <Button onClick={confirmWord} size="lg" className="px-8 py-6 text-xl font-bold">
                  <Check className="mr-2 h-6 w-6" />
                  Hecho
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-6">
        <Link href="/">
          <Button variant="outline" size="sm" className="mb-4 bg-transparent">
            <Home className="mr-2 h-4 w-4" />
            Volver al Menú
          </Button>
        </Link>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-balance">Generador de Palabras por Letras</CardTitle>
            <CardDescription className="text-pretty">
              Agrega letras y genera palabras aleatorias organizadas por columnas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Ingresa una letra"
                value={letterInput}
                onChange={(e) => setLetterInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addLetter()}
                className="text-lg text-center uppercase"
                maxLength={1}
              />
              <Button onClick={addLetter} size="lg" className="px-6">
                <Plus className="mr-2 h-5 w-5" />
                Agregar Letra
              </Button>
            </div>

            {letters.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center">
                {letters.map((letter) => (
                  <span key={letter} className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-xl font-bold">
                    {letter}
                  </span>
                ))}
              </div>
            )}

            <Button
              onClick={generateRandomWord}
              disabled={letters.length === 0}
              className="w-full h-12 text-lg"
              size="lg"
            >
              <Shuffle className="mr-2 h-5 w-5" />
              Generar Palabra
            </Button>

            {availableWords.length > 0 && (
              <p className="text-sm text-muted-foreground text-center">
                Palabras usadas: {usedWords.size} / {availableWords.length}
              </p>
            )}
          </CardContent>
        </Card>

        {letters.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {letters.map((letter) => (
              <Card key={letter} className="shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl font-bold text-center text-indigo-600 dark:text-indigo-400">
                    {letter}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {wordsByLetter[letter]?.length > 0 ? (
                      wordsByLetter[letter].map((word, index) => (
                        <div
                          key={index}
                          className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white text-center font-semibold animate-in fade-in slide-in-from-top-2 duration-300"
                        >
                          {word}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground text-center italic py-4">Sin palabras aún</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
