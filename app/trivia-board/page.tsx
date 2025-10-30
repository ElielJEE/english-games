"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Users, Play, Clock, Trophy } from "lucide-react"
import Link from "next/link"

type Category = "history" | "science" | "sports" | "entertainment" | "art"

interface Question {
  question: string
  options: string[]
  correct: number
  category: Category
}

interface Player {
  name: string
  position: number
  color: string
}

const BOARD_SIZE = 20
const TIME_LIMIT = 15

const QUESTIONS: Question[] = [
  // History (32 questions)
  {
    question: "In which year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correct: 2,
    category: "history",
  },
  {
    question: "Who was the first President of the United States?",
    options: ["Thomas Jefferson", "George Washington", "John Adams", "Benjamin Franklin"],
    correct: 1,
    category: "history",
  },
  {
    question: "Which ancient wonder is still standing today?",
    options: ["Hanging Gardens of Babylon", "Colossus of Rhodes", "Great Pyramid of Giza", "Lighthouse of Alexandria"],
    correct: 2,
    category: "history",
  },
  {
    question: "What year did the Berlin Wall fall?",
    options: ["1987", "1988", "1989", "1990"],
    correct: 2,
    category: "history",
  },
  {
    question: "Who discovered America in 1492?",
    options: ["Amerigo Vespucci", "Christopher Columbus", "Ferdinand Magellan", "Vasco da Gama"],
    correct: 1,
    category: "history",
  },
  {
    question: "Which empire built Machu Picchu?",
    options: ["Aztec", "Maya", "Inca", "Olmec"],
    correct: 2,
    category: "history",
  },
  {
    question: "In what year did the Titanic sink?",
    options: ["1910", "1911", "1912", "1913"],
    correct: 2,
    category: "history",
  },
  {
    question: "Who was the first man on the moon?",
    options: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "John Glenn"],
    correct: 1,
    category: "history",
  },
  {
    question: "What year did the French Revolution begin?",
    options: ["1776", "1789", "1799", "1804"],
    correct: 1,
    category: "history",
  },
  {
    question: "Who was the longest-reigning British monarch before Elizabeth II?",
    options: ["Victoria", "George III", "Edward VII", "Henry VIII"],
    correct: 0,
    category: "history",
  },
  {
    question: "Which country was NOT part of the Axis Powers in WWII?",
    options: ["Germany", "Italy", "Spain", "Japan"],
    correct: 2,
    category: "history",
  },
  {
    question: "What year did the Soviet Union collapse?",
    options: ["1989", "1990", "1991", "1992"],
    correct: 2,
    category: "history",
  },
  {
    question: "Who wrote the Declaration of Independence?",
    options: ["George Washington", "Benjamin Franklin", "Thomas Jefferson", "John Adams"],
    correct: 2,
    category: "history",
  },
  {
    question: "Which civilization invented paper?",
    options: ["Egyptian", "Roman", "Chinese", "Greek"],
    correct: 2,
    category: "history",
  },
  {
    question: "What was the name of the ship that brought the Pilgrims to America?",
    options: ["Mayflower", "Santa Maria", "Beagle", "Victoria"],
    correct: 0,
    category: "history",
  },
  {
    question: "Who was the first female Prime Minister of the United Kingdom?",
    options: ["Margaret Thatcher", "Theresa May", "Angela Merkel", "Indira Gandhi"],
    correct: 0,
    category: "history",
  },
  {
    question: "In which year did India gain independence?",
    options: ["1945", "1946", "1947", "1948"],
    correct: 2,
    category: "history",
  },
  {
    question: "Who was assassinated in 1963 in Dallas, Texas?",
    options: ["Martin Luther King Jr.", "John F. Kennedy", "Robert Kennedy", "Malcolm X"],
    correct: 1,
    category: "history",
  },
  {
    question: "What ancient city was buried by Mount Vesuvius?",
    options: ["Athens", "Rome", "Pompeii", "Sparta"],
    correct: 2,
    category: "history",
  },
  {
    question: "Who was the first Emperor of Rome?",
    options: ["Julius Caesar", "Augustus", "Nero", "Caligula"],
    correct: 1,
    category: "history",
  },
  {
    question: "What year did the American Civil War end?",
    options: ["1863", "1864", "1865", "1866"],
    correct: 2,
    category: "history",
  },
  {
    question: "Which country gifted the Statue of Liberty to the United States?",
    options: ["England", "France", "Spain", "Italy"],
    correct: 1,
    category: "history",
  },
  {
    question: "Who led the Mongol Empire?",
    options: ["Attila the Hun", "Genghis Khan", "Kublai Khan", "Tamerlane"],
    correct: 1,
    category: "history",
  },
  {
    question: "What was the name of the first artificial satellite?",
    options: ["Apollo 1", "Sputnik 1", "Explorer 1", "Vostok 1"],
    correct: 1,
    category: "history",
  },
  {
    question: "Which war was fought between 1950-1953?",
    options: ["Vietnam War", "Korean War", "Gulf War", "Cold War"],
    correct: 1,
    category: "history",
  },
  {
    question: "Who painted the ceiling of the Sistine Chapel?",
    options: ["Leonardo da Vinci", "Raphael", "Michelangelo", "Donatello"],
    correct: 2,
    category: "history",
  },
  {
    question: "What year did World War I begin?",
    options: ["1912", "1913", "1914", "1915"],
    correct: 2,
    category: "history",
  },
  {
    question: "Who was the first woman to fly solo across the Atlantic?",
    options: ["Amelia Earhart", "Bessie Coleman", "Harriet Quimby", "Jacqueline Cochran"],
    correct: 0,
    category: "history",
  },
  {
    question: "Which ancient wonder was located in Alexandria?",
    options: ["Colossus", "Lighthouse", "Hanging Gardens", "Temple of Artemis"],
    correct: 1,
    category: "history",
  },
  {
    question: "What was the name of the atomic bomb dropped on Hiroshima?",
    options: ["Fat Man", "Little Boy", "Trinity", "Gadget"],
    correct: 1,
    category: "history",
  },
  {
    question: "Who was the leader of the Soviet Union during WWII?",
    options: ["Lenin", "Stalin", "Khrushchev", "Brezhnev"],
    correct: 1,
    category: "history",
  },
  {
    question: "In which year did the Spanish Armada attempt to invade England?",
    options: ["1566", "1577", "1588", "1599"],
    correct: 2,
    category: "history",
  },

  // Science (32 questions)
  {
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correct: 2,
    category: "science",
  },
  {
    question: "How many planets are in our solar system?",
    options: ["7", "8", "9", "10"],
    correct: 1,
    category: "science",
  },
  {
    question: "What is the speed of light?",
    options: ["299,792 km/s", "150,000 km/s", "500,000 km/s", "1,000,000 km/s"],
    correct: 0,
    category: "science",
  },
  {
    question: "What is the largest organ in the human body?",
    options: ["Heart", "Brain", "Liver", "Skin"],
    correct: 3,
    category: "science",
  },
  {
    question: "What gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    correct: 2,
    category: "science",
  },
  {
    question: "What is the chemical formula for water?",
    options: ["H2O", "CO2", "O2", "H2O2"],
    correct: 0,
    category: "science",
  },
  {
    question: "What is the smallest unit of life?",
    options: ["Atom", "Molecule", "Cell", "Organ"],
    correct: 2,
    category: "science",
  },
  {
    question: "What planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct: 1,
    category: "science",
  },
  {
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Platinum"],
    correct: 2,
    category: "science",
  },
  {
    question: "How many bones are in the adult human body?",
    options: ["186", "206", "226", "246"],
    correct: 1,
    category: "science",
  },
  {
    question: "What is the powerhouse of the cell?",
    options: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"],
    correct: 2,
    category: "science",
  },
  {
    question: "What is the most abundant gas in Earth's atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correct: 2,
    category: "science",
  },
  {
    question: "What is the study of earthquakes called?",
    options: ["Meteorology", "Seismology", "Geology", "Volcanology"],
    correct: 1,
    category: "science",
  },
  {
    question: "What is the chemical symbol for sodium?",
    options: ["So", "Sd", "Na", "S"],
    correct: 2,
    category: "science",
  },
  {
    question: "What type of animal is a Komodo dragon?",
    options: ["Snake", "Lizard", "Crocodile", "Dinosaur"],
    correct: 1,
    category: "science",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Saturn", "Jupiter", "Neptune", "Uranus"],
    correct: 1,
    category: "science",
  },
  {
    question: "What is the boiling point of water in Celsius?",
    options: ["90°C", "95°C", "100°C", "105°C"],
    correct: 2,
    category: "science",
  },
  {
    question: "What is the center of an atom called?",
    options: ["Electron", "Proton", "Neutron", "Nucleus"],
    correct: 3,
    category: "science",
  },
  {
    question: "What is the process by which plants make food?",
    options: ["Respiration", "Photosynthesis", "Digestion", "Fermentation"],
    correct: 1,
    category: "science",
  },
  {
    question: "What is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
    correct: 1,
    category: "science",
  },
  {
    question: "What is the study of living organisms called?",
    options: ["Chemistry", "Physics", "Biology", "Geology"],
    correct: 2,
    category: "science",
  },
  {
    question: "How many chambers does the human heart have?",
    options: ["2", "3", "4", "5"],
    correct: 2,
    category: "science",
  },
  {
    question: "What is the closest star to Earth?",
    options: ["Alpha Centauri", "Sirius", "The Sun", "Proxima Centauri"],
    correct: 2,
    category: "science",
  },
  {
    question: "What is the chemical symbol for iron?",
    options: ["Ir", "Fe", "In", "I"],
    correct: 1,
    category: "science",
  },
  {
    question: "What is the largest internal organ in the human body?",
    options: ["Heart", "Liver", "Lungs", "Stomach"],
    correct: 1,
    category: "science",
  },
  {
    question: "What is the unit of electrical resistance?",
    options: ["Volt", "Ampere", "Ohm", "Watt"],
    correct: 2,
    category: "science",
  },
  {
    question: "What is the main component of the sun?",
    options: ["Helium", "Hydrogen", "Oxygen", "Carbon"],
    correct: 1,
    category: "science",
  },
  {
    question: "What is the speed of sound in air at sea level?",
    options: ["243 m/s", "343 m/s", "443 m/s", "543 m/s"],
    correct: 1,
    category: "science",
  },
  {
    question: "What is the smallest bone in the human body?",
    options: ["Stapes", "Femur", "Radius", "Tibia"],
    correct: 0,
    category: "science",
  },
  {
    question: "What is the study of weather called?",
    options: ["Geology", "Meteorology", "Astronomy", "Oceanography"],
    correct: 1,
    category: "science",
  },
  {
    question: "What is the chemical formula for table salt?",
    options: ["NaCl", "KCl", "CaCl2", "MgCl2"],
    correct: 0,
    category: "science",
  },
  {
    question: "How many teeth does an adult human have?",
    options: ["28", "30", "32", "34"],
    correct: 2,
    category: "science",
  },

  // Sports (32 questions)
  {
    question: "How many players are on a soccer team?",
    options: ["9", "10", "11", "12"],
    correct: 2,
    category: "sports",
  },
  {
    question: "In which sport would you perform a slam dunk?",
    options: ["Volleyball", "Basketball", "Tennis", "Baseball"],
    correct: 1,
    category: "sports",
  },
  {
    question: "How many rings are on the Olympic flag?",
    options: ["4", "5", "6", "7"],
    correct: 1,
    category: "sports",
  },
  {
    question: "What is the maximum score in a single frame of bowling?",
    options: ["100", "200", "300", "400"],
    correct: 2,
    category: "sports",
  },
  {
    question: "Which country won the first FIFA World Cup?",
    options: ["Brazil", "Argentina", "Uruguay", "Germany"],
    correct: 2,
    category: "sports",
  },
  {
    question: "How many points is a touchdown worth in American football?",
    options: ["5", "6", "7", "8"],
    correct: 1,
    category: "sports",
  },
  {
    question: "What is the diameter of a basketball hoop in inches?",
    options: ["16", "18", "20", "22"],
    correct: 1,
    category: "sports",
  },
  {
    question: "In tennis, what is a score of zero called?",
    options: ["Nil", "Love", "Zero", "Nothing"],
    correct: 1,
    category: "sports",
  },
  {
    question: "How many players are on a baseball team?",
    options: ["8", "9", "10", "11"],
    correct: 1,
    category: "sports",
  },
  {
    question: "What sport is known as 'the beautiful game'?",
    options: ["Basketball", "Soccer", "Tennis", "Cricket"],
    correct: 1,
    category: "sports",
  },
  {
    question: "How many holes are played in a standard round of golf?",
    options: ["9", "12", "18", "24"],
    correct: 2,
    category: "sports",
  },
  {
    question: "What is the national sport of Canada?",
    options: ["Ice Hockey", "Lacrosse", "Basketball", "Baseball"],
    correct: 1,
    category: "sports",
  },
  {
    question: "In which sport do you use a shuttlecock?",
    options: ["Tennis", "Squash", "Badminton", "Table Tennis"],
    correct: 2,
    category: "sports",
  },
  {
    question: "How many Grand Slam tournaments are there in tennis?",
    options: ["3", "4", "5", "6"],
    correct: 1,
    category: "sports",
  },
  {
    question: "What is the length of an Olympic swimming pool in meters?",
    options: ["25", "50", "75", "100"],
    correct: 1,
    category: "sports",
  },
  {
    question: "Which country has won the most FIFA World Cups?",
    options: ["Germany", "Argentina", "Brazil", "Italy"],
    correct: 2,
    category: "sports",
  },
  {
    question: "What is the highest possible break in snooker?",
    options: ["147", "180", "200", "250"],
    correct: 0,
    category: "sports",
  },
  {
    question: "How many players are on a volleyball team?",
    options: ["5", "6", "7", "8"],
    correct: 1,
    category: "sports",
  },
  {
    question: "What is the term for three strikes in a row in bowling?",
    options: ["Hat trick", "Turkey", "Eagle", "Birdie"],
    correct: 1,
    category: "sports",
  },
  {
    question: "In which sport would you perform a 'Fosbury Flop'?",
    options: ["Long Jump", "High Jump", "Pole Vault", "Triple Jump"],
    correct: 1,
    category: "sports",
  },
  {
    question: "How many minutes are in a soccer match?",
    options: ["80", "90", "100", "120"],
    correct: 1,
    category: "sports",
  },
  {
    question: "What is the maximum number of clubs allowed in a golf bag?",
    options: ["12", "14", "16", "18"],
    correct: 1,
    category: "sports",
  },
  {
    question: "In which sport do you compete for the Stanley Cup?",
    options: ["Basketball", "Baseball", "Ice Hockey", "American Football"],
    correct: 2,
    category: "sports",
  },
  {
    question: "How many points is a field goal worth in basketball?",
    options: ["1", "2", "3", "4"],
    correct: 1,
    category: "sports",
  },
  {
    question: "What is the term for a hole-in-one on a par 5?",
    options: ["Albatross", "Condor", "Eagle", "Birdie"],
    correct: 1,
    category: "sports",
  },
  {
    question: "How many sets do you need to win a men's Grand Slam tennis match?",
    options: ["2", "3", "4", "5"],
    correct: 1,
    category: "sports",
  },
  {
    question: "What is the distance of a marathon in kilometers?",
    options: ["40.195", "41.195", "42.195", "43.195"],
    correct: 2,
    category: "sports",
  },
  {
    question: "In which sport would you perform a 'slam dunk'?",
    options: ["Volleyball", "Basketball", "Handball", "Water Polo"],
    correct: 1,
    category: "sports",
  },
  {
    question: "How many innings are in a standard baseball game?",
    options: ["7", "8", "9", "10"],
    correct: 2,
    category: "sports",
  },
  {
    question: "What is the term for scoring three goals in soccer?",
    options: ["Triple", "Hat trick", "Treble", "Trinity"],
    correct: 1,
    category: "sports",
  },
  {
    question: "In which sport do you compete for the Ashes?",
    options: ["Rugby", "Cricket", "Soccer", "Tennis"],
    correct: 1,
    category: "sports",
  },
  {
    question: "How many players are on an ice hockey team on the ice?",
    options: ["5", "6", "7", "8"],
    correct: 1,
    category: "sports",
  },

  // Entertainment (32 questions)
  {
    question: "Who directed the movie 'Titanic'?",
    options: ["Steven Spielberg", "James Cameron", "Christopher Nolan", "Martin Scorsese"],
    correct: 1,
    category: "entertainment",
  },
  {
    question: "Which band released the album 'Abbey Road'?",
    options: ["The Rolling Stones", "The Beatles", "Led Zeppelin", "Pink Floyd"],
    correct: 1,
    category: "entertainment",
  },
  {
    question: "What is the highest-grossing film of all time?",
    options: ["Titanic", "Avatar", "Avengers: Endgame", "Star Wars"],
    correct: 1,
    category: "entertainment",
  },
  {
    question: "Who played Iron Man in the Marvel Cinematic Universe?",
    options: ["Chris Evans", "Chris Hemsworth", "Robert Downey Jr.", "Mark Ruffalo"],
    correct: 2,
    category: "entertainment",
  },
  {
    question: "Which streaming service produced 'Stranger Things'?",
    options: ["HBO", "Netflix", "Amazon Prime", "Disney+"],
    correct: 1,
    category: "entertainment",
  },
  {
    question: "Who played Jack in the movie 'Titanic'?",
    options: ["Brad Pitt", "Leonardo DiCaprio", "Tom Cruise", "Johnny Depp"],
    correct: 1,
    category: "entertainment",
  },
  {
    question: "What is the name of Harry Potter's owl?",
    options: ["Hedwig", "Errol", "Pigwidgeon", "Scabbers"],
    correct: 0,
    category: "entertainment",
  },
  {
    question: "Which movie won the Oscar for Best Picture in 2020?",
    options: ["1917", "Joker", "Parasite", "Once Upon a Time in Hollywood"],
    correct: 2,
    category: "entertainment",
  },
  {
    question: "Who is known as the 'King of Pop'?",
    options: ["Elvis Presley", "Michael Jackson", "Prince", "Freddie Mercury"],
    correct: 1,
    category: "entertainment",
  },
  {
    question: "What is the name of the coffee shop in 'Friends'?",
    options: ["Central Perk", "Java Joe's", "The Coffee Bean", "Starbucks"],
    correct: 0,
    category: "entertainment",
  },
  {
    question: "Who directed 'The Godfather'?",
    options: ["Martin Scorsese", "Francis Ford Coppola", "Steven Spielberg", "Quentin Tarantino"],
    correct: 1,
    category: "entertainment",
  },
  {
    question: "What is the name of the fictional African country in 'Black Panther'?",
    options: ["Wakanda", "Zamunda", "Genovia", "Latveria"],
    correct: 0,
    category: "entertainment",
  },
  {
    question: "Who played Forrest Gump?",
    options: ["Tom Hanks", "Tom Cruise", "Brad Pitt", "Matt Damon"],
    correct: 0,
    category: "entertainment",
  },
  {
    question: "What is the name of the dragon in 'The Hobbit'?",
    options: ["Smaug", "Drogon", "Toothless", "Mushu"],
    correct: 0,
    category: "entertainment",
  },
  {
    question: "Which TV show features the character Walter White?",
    options: ["The Wire", "Breaking Bad", "Better Call Saul", "Ozark"],
    correct: 1,
    category: "entertainment",
  },
  {
    question: "Who sang 'Bohemian Rhapsody'?",
    options: ["The Beatles", "Led Zeppelin", "Queen", "The Rolling Stones"],
    correct: 2,
    category: "entertainment",
  },
  {
    question: "What is the name of the kingdom in 'Frozen'?",
    options: ["Arendelle", "Corona", "DunBroch", "Agrabah"],
    correct: 0,
    category: "entertainment",
  },
  {
    question: "Who directed 'Jurassic Park'?",
    options: ["George Lucas", "Steven Spielberg", "James Cameron", "Ridley Scott"],
    correct: 1,
    category: "entertainment",
  },
  {
    question: "What is the name of the main character in 'The Matrix'?",
    options: ["Neo", "Morpheus", "Trinity", "Agent Smith"],
    correct: 0,
    category: "entertainment",
  },
  {
    question: "Which actress played Hermione in the Harry Potter films?",
    options: ["Emma Stone", "Emma Watson", "Emma Roberts", "Emily Blunt"],
    correct: 1,
    category: "entertainment",
  },
  {
    question: "What is the name of the fictional town in 'The Simpsons'?",
    options: ["Springfield", "Shelbyville", "Capital City", "Ogdenville"],
    correct: 0,
    category: "entertainment",
  },
  {
    question: "Who played the Joker in 'The Dark Knight'?",
    options: ["Jack Nicholson", "Jared Leto", "Heath Ledger", "Joaquin Phoenix"],
    correct: 2,
    category: "entertainment",
  },
  {
    question: "What is the name of the school in 'Harry Potter'?",
    options: ["Beauxbatons", "Durmstrang", "Hogwarts", "Ilvermorny"],
    correct: 2,
    category: "entertainment",
  },
  {
    question: "Who sang 'Thriller'?",
    options: ["Prince", "Michael Jackson", "Stevie Wonder", "James Brown"],
    correct: 1,
    category: "entertainment",
  },
  {
    question: "What is the name of the AI in 'Iron Man'?",
    options: ["JARVIS", "FRIDAY", "ULTRON", "VISION"],
    correct: 0,
    category: "entertainment",
  },
  {
    question: "Which movie features the quote 'May the Force be with you'?",
    options: ["Star Trek", "Star Wars", "Guardians of the Galaxy", "Interstellar"],
    correct: 1,
    category: "entertainment",
  },
  {
    question: "Who directed 'Inception'?",
    options: ["Christopher Nolan", "Denis Villeneuve", "Ridley Scott", "James Cameron"],
    correct: 0,
    category: "entertainment",
  },
  {
    question: "What is the name of the main character in 'The Hunger Games'?",
    options: ["Tris", "Katniss", "Bella", "Hermione"],
    correct: 1,
    category: "entertainment",
  },
  {
    question: "Who played Captain Jack Sparrow?",
    options: ["Orlando Bloom", "Johnny Depp", "Geoffrey Rush", "Javier Bardem"],
    correct: 1,
    category: "entertainment",
  },
  {
    question: "What is the name of the fictional metal in 'Black Panther'?",
    options: ["Adamantium", "Vibranium", "Unobtainium", "Mithril"],
    correct: 1,
    category: "entertainment",
  },
  {
    question: "Which TV show features the character Sheldon Cooper?",
    options: ["Friends", "How I Met Your Mother", "The Big Bang Theory", "Two and a Half Men"],
    correct: 2,
    category: "entertainment",
  },
  {
    question: "Who sang 'Like a Rolling Stone'?",
    options: ["Bob Dylan", "The Rolling Stones", "Bruce Springsteen", "Neil Young"],
    correct: 0,
    category: "entertainment",
  },

  // Art (32 questions)
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correct: 2,
    category: "art",
  },
  {
    question: "In which city is the Louvre Museum located?",
    options: ["London", "Rome", "Madrid", "Paris"],
    correct: 3,
    category: "art",
  },
  {
    question: "Who sculpted 'David'?",
    options: ["Donatello", "Michelangelo", "Bernini", "Rodin"],
    correct: 1,
    category: "art",
  },
  {
    question: "What art movement is Salvador Dalí associated with?",
    options: ["Impressionism", "Cubism", "Surrealism", "Expressionism"],
    correct: 2,
    category: "art",
  },
  {
    question: "Who painted 'The Starry Night'?",
    options: ["Claude Monet", "Vincent van Gogh", "Paul Cézanne", "Edgar Degas"],
    correct: 1,
    category: "art",
  },
  {
    question: "Who painted 'The Scream'?",
    options: ["Edvard Munch", "Gustav Klimt", "Egon Schiele", "Wassily Kandinsky"],
    correct: 0,
    category: "art",
  },
  {
    question: "What is the art technique of creating images with small dots?",
    options: ["Impressionism", "Pointillism", "Cubism", "Fauvism"],
    correct: 1,
    category: "art",
  },
  {
    question: "Who painted 'Guernica'?",
    options: ["Salvador Dalí", "Pablo Picasso", "Joan Miró", "Diego Rivera"],
    correct: 1,
    category: "art",
  },
  {
    question: "In which museum is the 'Mona Lisa' displayed?",
    options: ["Uffizi Gallery", "Prado Museum", "Louvre Museum", "British Museum"],
    correct: 2,
    category: "art",
  },
  {
    question: "Who painted 'The Birth of Venus'?",
    options: ["Raphael", "Botticelli", "Titian", "Caravaggio"],
    correct: 1,
    category: "art",
  },
  {
    question: "What is the primary color that cannot be made by mixing other colors?",
    options: ["Green", "Orange", "Red", "Purple"],
    correct: 2,
    category: "art",
  },
  {
    question: "Who painted 'The Persistence of Memory' with melting clocks?",
    options: ["René Magritte", "Salvador Dalí", "Max Ernst", "Giorgio de Chirico"],
    correct: 1,
    category: "art",
  },
  {
    question: "What art movement did Claude Monet belong to?",
    options: ["Impressionism", "Expressionism", "Cubism", "Surrealism"],
    correct: 0,
    category: "art",
  },
  {
    question: "Who painted the ceiling of the Sistine Chapel?",
    options: ["Leonardo da Vinci", "Raphael", "Michelangelo", "Donatello"],
    correct: 2,
    category: "art",
  },
  {
    question: "What is the technique of scratching through a surface to reveal a lower layer?",
    options: ["Impasto", "Sgraffito", "Glazing", "Scumbling"],
    correct: 1,
    category: "art",
  },
  {
    question: "Who painted 'Girl with a Pearl Earring'?",
    options: ["Rembrandt", "Vermeer", "Rubens", "Van Dyck"],
    correct: 1,
    category: "art",
  },
  {
    question: "What is the art of beautiful handwriting called?",
    options: ["Typography", "Calligraphy", "Lithography", "Cartography"],
    correct: 1,
    category: "art",
  },
  {
    question: "Who painted 'The Last Supper'?",
    options: ["Michelangelo", "Raphael", "Leonardo da Vinci", "Caravaggio"],
    correct: 2,
    category: "art",
  },
  {
    question: "What art movement is characterized by geometric shapes?",
    options: ["Impressionism", "Cubism", "Surrealism", "Romanticism"],
    correct: 1,
    category: "art",
  },
  {
    question: "Who painted 'The Night Watch'?",
    options: ["Vermeer", "Rembrandt", "Frans Hals", "Jan Steen"],
    correct: 1,
    category: "art",
  },
  {
    question: "What is a painting done on wet plaster called?",
    options: ["Fresco", "Tempera", "Encaustic", "Gouache"],
    correct: 0,
    category: "art",
  },
  {
    question: "Who painted 'American Gothic'?",
    options: ["Edward Hopper", "Grant Wood", "Norman Rockwell", "Andrew Wyeth"],
    correct: 1,
    category: "art",
  },
  {
    question: "What is the three-dimensional art form called?",
    options: ["Painting", "Drawing", "Sculpture", "Photography"],
    correct: 2,
    category: "art",
  },
  {
    question: "Who painted 'The Kiss'?",
    options: ["Gustav Klimt", "Egon Schiele", "Edvard Munch", "Wassily Kandinsky"],
    correct: 0,
    category: "art",
  },
  {
    question: "What is the art of paper folding called?",
    options: ["Kirigami", "Origami", "Ikebana", "Bonsai"],
    correct: 1,
    category: "art",
  },
  {
    question: "Who painted 'Water Lilies' series?",
    options: ["Pierre-Auguste Renoir", "Claude Monet", "Edgar Degas", "Camille Pissarro"],
    correct: 1,
    category: "art",
  },
  {
    question: "What is the technique of creating images by assembling small pieces?",
    options: ["Collage", "Mosaic", "Montage", "Assemblage"],
    correct: 1,
    category: "art",
  },
  {
    question: "Who painted 'The Garden of Earthly Delights'?",
    options: ["Jan van Eyck", "Hieronymus Bosch", "Pieter Bruegel", "Albrecht Dürer"],
    correct: 1,
    category: "art",
  },
  {
    question: "What art movement emphasized emotion and individualism?",
    options: ["Classicism", "Romanticism", "Realism", "Naturalism"],
    correct: 1,
    category: "art",
  },
  {
    question: "Who painted 'The Creation of Adam'?",
    options: ["Leonardo da Vinci", "Raphael", "Michelangelo", "Titian"],
    correct: 2,
    category: "art",
  },
  {
    question: "What is the art of arranging flowers called?",
    options: ["Bonsai", "Origami", "Ikebana", "Kirigami"],
    correct: 2,
    category: "art",
  },
  {
    question: "Who painted 'Las Meninas'?",
    options: ["El Greco", "Goya", "Velázquez", "Murillo"],
    correct: 2,
    category: "art",
  },
]

const PLAYER_COLORS = [
  "bg-blue-500",
  "bg-red-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-orange-500",
  "bg-teal-500",
]

const CATEGORY_COLORS: Record<Category, string> = {
  history: "bg-amber-100 border-amber-300",
  science: "bg-blue-100 border-blue-300",
  sports: "bg-green-100 border-green-300",
  entertainment: "bg-purple-100 border-purple-300",
  art: "bg-rose-100 border-rose-300",
}

export default function TriviaBoardGame() {
  const [gameState, setGameState] = useState<"setup" | "playing" | "finished">("setup")
  const [numPlayers, setNumPlayers] = useState(2)
  const [players, setPlayers] = useState<Player[]>([])
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [usedQuestions, setUsedQuestions] = useState<Set<number>>(new Set())
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }, [])

  const playSound = (frequency: number, duration: number, type: OscillatorType = "sine") => {
    if (!audioContextRef.current) return
    const oscillator = audioContextRef.current.createOscillator()
    const gainNode = audioContextRef.current.createGain()
    oscillator.connect(gainNode)
    gainNode.connect(audioContextRef.current.destination)
    oscillator.frequency.value = frequency
    oscillator.type = type
    gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration)
    oscillator.start()
    oscillator.stop(audioContextRef.current.currentTime + duration)
  }

  const playCorrectSound = () => {
    playSound(523, 0.1)
    setTimeout(() => playSound(659, 0.1), 100)
    setTimeout(() => playSound(784, 0.2), 200)
  }

  const playWrongSound = () => {
    playSound(200, 0.3, "sawtooth")
  }

  const playTurnSound = () => {
    playSound(440, 0.1)
    setTimeout(() => playSound(554, 0.1), 100)
  }

  const playVictorySound = () => {
    const notes = [523, 659, 784, 1047]
    notes.forEach((note, i) => {
      setTimeout(() => playSound(note, 0.2), i * 150)
    })
  }

  const playTickSound = () => {
    playSound(800, 0.05, "square")
  }

  useEffect(() => {
    if (gameState === "playing" && currentQuestion && !showResult && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
        if (timeLeft <= 10) {
          playTickSound()
        }
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResult) {
      handleTimeUp()
    }
  }, [timeLeft, gameState, currentQuestion, showResult])

  const handleStartGame = () => {
    const newPlayers: Player[] = Array.from({ length: numPlayers }, (_, i) => ({
      name: players[i]?.name || `Player ${i + 1}`,
      position: 0,
      color: PLAYER_COLORS[i],
    }))
    setPlayers(newPlayers)
    setGameState("playing")
    setCurrentPlayerIndex(0)
    loadNewQuestion()
  }

  const loadNewQuestion = () => {
    const availableQuestions = QUESTIONS.filter((_, index) => !usedQuestions.has(index))
    if (availableQuestions.length === 0) {
      setUsedQuestions(new Set())
      const randomIndex = Math.floor(Math.random() * QUESTIONS.length)
      setCurrentQuestion(QUESTIONS[randomIndex])
      setUsedQuestions(new Set([randomIndex]))
    } else {
      const randomIndex = Math.floor(Math.random() * availableQuestions.length)
      const questionIndex = QUESTIONS.indexOf(availableQuestions[randomIndex])
      setCurrentQuestion(availableQuestions[randomIndex])
      setUsedQuestions(new Set([...usedQuestions, questionIndex]))
    }
    setTimeLeft(TIME_LIMIT)
    setSelectedAnswer(null)
    setShowResult(false)
  }

  const handleAnswer = (answerIndex: number) => {
    if (showResult || !currentQuestion) return
    setSelectedAnswer(answerIndex)
    const correct = answerIndex === currentQuestion.correct
    setIsCorrect(correct)
    setShowResult(true)

    if (correct) {
      playCorrectSound()
      const newPlayers = [...players]
      newPlayers[currentPlayerIndex].position += 1
      setPlayers(newPlayers)

      if (newPlayers[currentPlayerIndex].position >= BOARD_SIZE) {
        setGameState("finished")
        playVictorySound()
        return
      }
    } else {
      playWrongSound()
    }
  }

  const handleTimeUp = () => {
    if (showResult) return
    setShowResult(true)
    setIsCorrect(false)
    playWrongSound()
  }

  const handleNextTurn = () => {
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length
    setCurrentPlayerIndex(nextPlayerIndex)
    loadNewQuestion()
    playTurnSound()
  }

  const handlePlayAgain = () => {
    setPlayers(players.map((p) => ({ ...p, position: 0 })))
    setCurrentPlayerIndex(0)
    setUsedQuestions(new Set())
    setGameState("playing")
    loadNewQuestion()
  }

  if (gameState === "setup") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Trivia Board Game</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Configuración del Juego
              </CardTitle>
              <CardDescription>Configura el número de jugadores y sus nombres</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="numPlayers">Número de Jugadores (2-8)</Label>
                <Input
                  id="numPlayers"
                  type="number"
                  min="2"
                  max="8"
                  value={numPlayers}
                  onChange={(e) => {
                    const num = Math.max(2, Math.min(8, Number.parseInt(e.target.value) || 2))
                    setNumPlayers(num)
                    setPlayers(
                      Array.from({ length: num }, (_, i) => ({
                        name: players[i]?.name || "",
                        position: 0,
                        color: PLAYER_COLORS[i],
                      })),
                    )
                  }}
                />
              </div>

              <div className="space-y-4">
                <Label>Nombres de los Jugadores</Label>
                {Array.from({ length: numPlayers }, (_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${PLAYER_COLORS[i]}`} />
                    <Input
                      placeholder={`Jugador ${i + 1}`}
                      value={players[i]?.name || ""}
                      onChange={(e) => {
                        const newPlayers = [...players]
                        newPlayers[i] = {
                          name: e.target.value,
                          position: 0,
                          color: PLAYER_COLORS[i],
                        }
                        setPlayers(newPlayers)
                      }}
                    />
                  </div>
                ))}
              </div>

              <Button onClick={handleStartGame} className="w-full" size="lg">
                <Play className="mr-2 h-5 w-5" />
                Comenzar Juego
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (gameState === "finished") {
    const winner = players.find((p) => p.position >= BOARD_SIZE)
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Trophy className="h-20 w-20 text-yellow-500" />
              </div>
              <CardTitle className="text-4xl">¡Victoria!</CardTitle>
              <CardDescription className="text-xl">{winner?.name || "Jugador"} ha ganado el juego</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Posiciones Finales:</h3>
                {players
                  .sort((a, b) => b.position - a.position)
                  .map((player, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${player.color}`} />
                        <span className="font-medium">{player.name}</span>
                      </div>
                      <span className="text-muted-foreground">
                        {player.position}/{BOARD_SIZE}
                      </span>
                    </div>
                  ))}
              </div>
              <div className="flex gap-3">
                <Button onClick={handlePlayAgain} className="flex-1" size="lg">
                  Jugar de Nuevo
                </Button>
                <Link href="/" className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent" size="lg">
                    Menú Principal
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const currentPlayer = players[currentPlayerIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Trivia Board</h1>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <span className={`text-2xl font-bold ${timeLeft <= 5 ? "text-red-500 animate-pulse" : ""}`}>
              {timeLeft}s
            </span>
          </div>
        </div>

        {/* Board */}
        <Card>
          <CardHeader>
            <CardTitle>Tablero de Juego</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-10 gap-2">
              {Array.from({ length: BOARD_SIZE }, (_, i) => (
                <div
                  key={i}
                  className="aspect-square border-2 border-gray-300 rounded-lg flex items-center justify-center relative bg-white"
                >
                  <span className="text-xs text-muted-foreground">{i + 1}</span>
                  <div className="absolute inset-0 flex items-center justify-center gap-1 flex-wrap p-1">
                    {players
                      .filter((p) => p.position === i)
                      .map((player, idx) => (
                        <div key={idx} className={`w-3 h-3 rounded-full ${player.color} border border-white`} />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Players */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {players.map((player, index) => (
            <Card
              key={index}
              className={`${index === currentPlayerIndex ? "ring-2 ring-primary shadow-lg" : "opacity-60"}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${player.color}`} />
                  <div>
                    <p className="font-semibold">{player.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {player.position}/{BOARD_SIZE}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Question */}
        {currentQuestion && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Turno de {currentPlayer.name}</CardTitle>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${CATEGORY_COLORS[currentQuestion.category]}`}
                >
                  {currentQuestion.category.toUpperCase()}
                </span>
              </div>
              <CardDescription className="text-lg font-medium text-foreground">
                {currentQuestion.question}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showResult}
                    variant={
                      showResult
                        ? index === currentQuestion.correct
                          ? "default"
                          : selectedAnswer === index
                            ? "destructive"
                            : "outline"
                        : "outline"
                    }
                    className={`h-auto py-4 text-left justify-start ${
                      showResult && index === currentQuestion.correct ? "bg-green-500 hover:bg-green-600" : ""
                    }`}
                    size="lg"
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </Button>
                ))}
              </div>

              {showResult && (
                <div className="space-y-4">
                  <div
                    className={`p-4 rounded-lg text-center font-semibold ${
                      isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {isCorrect ? "¡Correcto! Avanzas 1 casilla" : "Incorrecto. No avanzas"}
                  </div>
                  <Button onClick={handleNextTurn} className="w-full" size="lg">
                    Siguiente Turno
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
