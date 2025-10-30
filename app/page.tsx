"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shuffle, Languages, Puzzle, Grid3x3, Trophy } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-balance">Juegos de Palabras</h1>
          <p className="text-lg text-muted-foreground text-pretty">Selecciona un juego para comenzar</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/letter-words">
            <Card className="shadow-xl hover:shadow-2xl transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-indigo-500 rounded-lg">
                    <Shuffle className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Palabras por Letras</CardTitle>
                </div>
                <CardDescription className="text-pretty">
                  Agrega letras y genera palabras aleatorias que comiencen con esas letras. Las palabras se organizan en
                  columnas por letra inicial.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" size="lg">
                  Jugar Ahora
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/random-words">
            <Card className="shadow-xl hover:shadow-2xl transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-500 rounded-lg">
                    <Languages className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Palabras Aleatorias</CardTitle>
                </div>
                <CardDescription className="text-pretty">
                  Genera palabras aleatorias en inglés con su traducción al español. Perfecto para aprender nuevo
                  vocabulario.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" size="lg" variant="secondary">
                  Jugar Ahora
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/color-puzzle">
            <Card className="shadow-xl hover:shadow-2xl transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-500 rounded-lg">
                    <Puzzle className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Puzzle de Colores</CardTitle>
                </div>
                <CardDescription className="text-pretty">
                  Completa palabras relacionadas usando pistas de colores. Las letras repetidas tienen el mismo color.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-transparent" size="lg" variant="outline">
                  Jugar Ahora
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/word-guess">
            <Card className="shadow-xl hover:shadow-2xl transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-500 rounded-lg">
                    <Grid3x3 className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Adivina la Palabra</CardTitle>
                </div>
                <CardDescription className="text-pretty">
                  Adivina la palabra secreta en 5 intentos. Verde = correcto, Amarillo = letra correcta pero mal
                  posición, Rojo = letra incorrecta.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-amber-500 hover:bg-amber-600" size="lg">
                  Jugar Ahora
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/trivia-board">
            <Card className="shadow-xl hover:shadow-2xl transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-rose-500 rounded-lg">
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Trivia Board</CardTitle>
                </div>
                <CardDescription className="text-pretty">
                  Juego multijugador de trivia. Responde preguntas de historia, ciencia, deportes, entretenimiento y
                  arte para avanzar en el tablero.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-rose-500 hover:bg-rose-600" size="lg">
                  Jugar Ahora
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
