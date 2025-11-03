"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Users, Play, Clock } from "lucide-react"
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
  score: number
  color: string
}

const TIME_LIMIT = 15
const CATEGORIES: Category[] = ["history", "science", "sports", "entertainment", "art"]

const QUESTIONS: Question[] = [
  // HISTORY - 100 preguntas
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
    question: "In which year did the Magna Carta get signed?",
    options: ["1215", "1265", "1315", "1415"],
    correct: 0,
    category: "history",
  },
  {
    question: "Who painted the Sistine Chapel ceiling?",
    options: ["Leonardo da Vinci", "Raphael", "Michelangelo", "Botticelli"],
    correct: 2,
    category: "history",
  },
  {
    question: "What empire built the Great Wall of China?",
    options: ["Han Dynasty", "Ming Dynasty", "Qin Dynasty", "Tang Dynasty"],
    correct: 1,
    category: "history",
  },
  {
    question: "When did the American Declaration of Independence get signed?",
    options: ["1774", "1775", "1776", "1777"],
    correct: 2,
    category: "history",
  },
  {
    question: "Who was Julius Caesar assassinated by?",
    options: ["Mark Antony", "Pompey", "Brutus", "Nero"],
    correct: 2,
    category: "history",
  },
  {
    question: "What year did the Ottoman Empire fall?",
    options: ["1915", "1920", "1922", "1925"],
    correct: 2,
    category: "history",
  },
  {
    question: "Who led the Russian Revolution?",
    options: ["Stalin", "Lenin", "Trotsky", "Khrushchev"],
    correct: 1,
    category: "history",
  },
  {
    question: "When did the Renaissance begin?",
    options: ["12th century", "13th century", "14th century", "15th century"],
    correct: 2,
    category: "history",
  },
  {
    question: "Who invented the printing press?",
    options: ["Gutenberg", "Caxton", "Aldus", "Jenson"],
    correct: 0,
    category: "history",
  },
  {
    question: "What year did Columbus reach the Americas?",
    options: ["1490", "1491", "1492", "1493"],
    correct: 2,
    category: "history",
  },
  {
    question: "Who was the first Roman Emperor?",
    options: ["Julius Caesar", "Mark Antony", "Augustus", "Tiberius"],
    correct: 2,
    category: "history",
  },
  {
    question: "When did the Black Death occur?",
    options: ["1200s", "1300s", "1400s", "1500s"],
    correct: 1,
    category: "history",
  },
  {
    question: "What year did King John sign the Magna Carta?",
    options: ["1213", "1214", "1215", "1216"],
    correct: 2,
    category: "history",
  },
  {
    question: "Who was the first Holy Roman Emperor?",
    options: ["Otto I", "Charlemagne", "Frederick I", "Charles V"],
    correct: 1,
    category: "history",
  },
  {
    question: "When did the Spanish Inquisition begin?",
    options: ["1431", "1478", "1523", "1598"],
    correct: 1,
    category: "history",
  },
  {
    question: "What year did the Library of Alexandria burn?",
    options: ["48 BC", "64 AD", "391 AD", "642 AD"],
    correct: 3,
    category: "history",
  },
  {
    question: "Who was Cleopatra's famous lover?",
    options: ["Pompey", "Julius Caesar", "Mark Antony", "Augustus"],
    correct: 2,
    category: "history",
  },
  {
    question: "When did the Roman Empire fall?",
    options: ["300 AD", "400 AD", "476 AD", "500 AD"],
    correct: 2,
    category: "history",
  },
  {
    question: "Who discovered Australia?",
    options: ["James Cook", "William Dampier", "Matthew Flinders", "Ferdinand Magellan"],
    correct: 0,
    category: "history",
  },
  {
    question: "What year did the American Civil War end?",
    options: ["1863", "1864", "1865", "1866"],
    correct: 2,
    category: "history",
  },
  {
    question: "Who was Napoleon defeated by?",
    options: ["Wellington", "Nelson", "Kutuzov", "Nelson and Wellington"],
    correct: 3,
    category: "history",
  },
  {
    question: "When was the Hundred Years War?",
    options: ["1200-1300", "1300-1400", "1337-1453", "1400-1500"],
    correct: 2,
    category: "history",
  },
  {
    question: "Who wrote the Declaration of Independence?",
    options: ["Thomas Jefferson", "Benjamin Franklin", "John Adams", "James Madison"],
    correct: 0,
    category: "history",
  },
  {
    question: "What year did the Vietnam War end?",
    options: ["1972", "1973", "1974", "1975"],
    correct: 3,
    category: "history",
  },
  {
    question: "Who was the first President of Mexico?",
    options: ["Miguel Hidalgo", "Benito Juárez", "Guadalupe Victoria", "Antonio López"],
    correct: 2,
    category: "history",
  },
  {
    question: "When did the Korean War occur?",
    options: ["1945-1950", "1950-1953", "1948-1951", "1952-1955"],
    correct: 1,
    category: "history",
  },
  {
    question: "Who was Joan of Arc?",
    options: ["French Queen", "French Military Leader", "French Duchess", "French Princess"],
    correct: 1,
    category: "history",
  },
  {
    question: "What year did Pearl Harbor get attacked?",
    options: ["1940", "1941", "1942", "1943"],
    correct: 1,
    category: "history",
  },
  {
    question: "Who was Hannibal?",
    options: ["Roman general", "Egyptian pharaoh", "Carthaginian general", "Greek general"],
    correct: 2,
    category: "history",
  },
  {
    question: "When did the Industrial Revolution begin?",
    options: ["Late 1600s", "Early 1700s", "Mid 1700s", "Late 1700s"],
    correct: 2,
    category: "history",
  },
  {
    question: "Who led the Chinese Revolution?",
    options: ["Deng Xiaoping", "Mao Zedong", "Zhou Enlai", "Chiang Kai-shek"],
    correct: 1,
    category: "history",
  },
  {
    question: "What year did India gain independence?",
    options: ["1945", "1946", "1947", "1948"],
    correct: 2,
    category: "history",
  },
  {
    question: "Who was Alexander the Great?",
    options: ["Egyptian King", "Persian King", "Macedonian King", "Greek King"],
    correct: 2,
    category: "history",
  },
  {
    question: "When did the Cold War end?",
    options: ["1988", "1989", "1990", "1991"],
    correct: 3,
    category: "history",
  },
  {
    question: "Who was Socrates?",
    options: ["Greek mathematician", "Greek philosopher", "Greek general", "Greek physician"],
    correct: 1,
    category: "history",
  },
  {
    question: "What year did the Berlin Wall get built?",
    options: ["1959", "1960", "1961", "1962"],
    correct: 2,
    category: "history",
  },
  {
    question: "Who was the longest-serving British Prime Minister?",
    options: ["Winston Churchill", "Margaret Thatcher", "Clement Attlee", "Herbert Asquith"],
    correct: 3,
    category: "history",
  },
  {
    question: "When did the Protestant Reformation begin?",
    options: ["1415", "1455", "1517", "1545"],
    correct: 2,
    category: "history",
  },
  {
    question: "Who was Attila the Hun?",
    options: ["Persian leader", "Mongol leader", "Hun leader", "Ottoman leader"],
    correct: 2,
    category: "history",
  },
  {
    question: "What year did Abraham Lincoln get assassinated?",
    options: ["1863", "1864", "1865", "1866"],
    correct: 2,
    category: "history",
  },
  {
    question: "Who was Genghis Khan?",
    options: ["Persian ruler", "Mongol ruler", "Turkish ruler", "Chinese ruler"],
    correct: 1,
    category: "history",
  },
  {
    question: "When did the Cuban Missile Crisis occur?",
    options: ["1960", "1961", "1962", "1963"],
    correct: 2,
    category: "history",
  },
  {
    question: "Who was the first King of Saudi Arabia?",
    options: ["Faisal", "Abdulaziz", "Saud", "Khalid"],
    correct: 1,
    category: "history",
  },
  {
    question: "What year did the Moon landing happen?",
    options: ["1968", "1969", "1970", "1971"],
    correct: 1,
    category: "history",
  },
  {
    question: "Who was Henry VIII?",
    options: ["French king", "Spanish king", "English king", "Scottish king"],
    correct: 2,
    category: "history",
  },
  {
    question: "When did World War I begin?",
    options: ["1912", "1913", "1914", "1915"],
    correct: 2,
    category: "history",
  },
  {
    question: "Who was Martin Luther King Jr.?",
    options: ["Religious leader", "Civil rights leader", "Political leader", "Military leader"],
    correct: 1,
    category: "history",
  },
  {
    question: "What year did the Chinese Civil War end?",
    options: ["1947", "1948", "1949", "1950"],
    correct: 2,
    category: "history",
  },
  {
    question: "Who was Catherine the Great?",
    options: ["French empress", "Russian empress", "Prussian empress", "Austrian empress"],
    correct: 1,
    category: "history",
  },
  {
    question: "When did the Suez Crisis occur?",
    options: ["1953", "1954", "1955", "1956"],
    correct: 3,
    category: "history",
  },
  {
    question: "Who was Florence Nightingale?",
    options: ["Doctor", "Nurse", "Surgeon", "Physician"],
    correct: 1,
    category: "history",
  },
  {
    question: "What year did the Hundred Years War start?",
    options: ["1335", "1336", "1337", "1338"],
    correct: 2,
    category: "history",
  },
  {
    question: "Who was Robespierre?",
    options: ["French monarch", "French military leader", "French Revolutionary leader", "French explorer"],
    correct: 2,
    category: "history",
  },
  {
    question: "When did Japan surrender in WWII?",
    options: ["August 1945", "September 1945", "October 1945", "November 1945"],
    correct: 1,
    category: "history",
  },
  {
    question: "Who was the first female Prime Minister of Britain?",
    options: ["Margaret Thatcher", "Theresa May", "Liz Truss", "Clement Attlee"],
    correct: 0,
    category: "history",
  },
  {
    question: "What year did the fall of the Berlin Wall happen?",
    options: ["1988", "1989", "1990", "1991"],
    correct: 1,
    category: "history",
  },
  {
    question: "Who was Nelson Mandela?",
    options: ["South African fighter", "South African president", "South African leader", "All of above"],
    correct: 3,
    category: "history",
  },
  {
    question: "When did the iPhone get released?",
    options: ["2005", "2006", "2007", "2008"],
    correct: 2,
    category: "history",
  },
  {
    question: "Who was Rosa Parks?",
    options: ["Civil rights activist", "Activist", "Rosa Parks activist", "All are correct"],
    correct: 3,
    category: "history",
  },
  {
    question: "What year did the Panama Canal open?",
    options: ["1912", "1913", "1914", "1915"],
    correct: 2,
    category: "history",
  },
  {
    question: "Who was Frederick the Great?",
    options: ["Prussian King", "Austrian King", "Russian King", "Bavarian King"],
    correct: 0,
    category: "history",
  },
  {
    question: "When did the League of Nations get founded?",
    options: ["1919", "1920", "1921", "1922"],
    correct: 1,
    category: "history",
  },
  {
    question: "Who was Otto von Bismarck?",
    options: ["Austrian politician", "Prussian politician", "Russian politician", "French politician"],
    correct: 1,
    category: "history",
  },
  {
    question: "What year did the Treaty of Versailles get signed?",
    options: ["1918", "1919", "1920", "1921"],
    correct: 1,
    category: "history",
  },
  {
    question: "Who was the first President of the USA?",
    options: ["John Adams", "George Washington", "Thomas Jefferson", "Benjamin Franklin"],
    correct: 1,
    category: "history",
  },
  {
    question: "When did the American Revolution begin?",
    options: ["1773", "1774", "1775", "1776"],
    correct: 2,
    category: "history",
  },
  {
    question: "Who assassinated Julius Caesar?",
    options: ["Pompey", "Crassus", "Brutus and others", "Mark Antony"],
    correct: 2,
    category: "history",
  },
  {
    question: "What year did the Spanish Armada get defeated?",
    options: ["1586", "1587", "1588", "1589"],
    correct: 2,
    category: "history",
  },
  {
    question: "Who was Elizabeth I?",
    options: ["Spanish Queen", "French Queen", "English Queen", "Scottish Queen"],
    correct: 2,
    category: "history",
  },

  // SCIENCE - 100 preguntas
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
    question: "What is the chemical symbol for silver?",
    options: ["Sl", "Sr", "Ag", "Si"],
    correct: 2,
    category: "science",
  },
  {
    question: "How many bones are in the human body?",
    options: ["186", "206", "226", "246"],
    correct: 1,
    category: "science",
  },
  {
    question: "What is the smallest unit of life?",
    options: ["Atom", "Molecule", "Cell", "Organ"],
    correct: 2,
    category: "science",
  },
  {
    question: "What is the process by which plants make food?",
    options: ["Photosynthesis", "Respiration", "Fermentation", "Decomposition"],
    correct: 0,
    category: "science",
  },
  {
    question: "How many chromosomes do humans have?",
    options: ["23", "46", "69", "92"],
    correct: 1,
    category: "science",
  },
  {
    question: "What is the center of an atom called?",
    options: ["Electron", "Neutron", "Nucleus", "Proton"],
    correct: 2,
    category: "science",
  },
  {
    question: "What is the most abundant element in the atmosphere?",
    options: ["Oxygen", "Nitrogen", "Hydrogen", "Carbon"],
    correct: 1,
    category: "science",
  },
  {
    question: "What is the powerhouse of the cell?",
    options: ["Nucleus", "Ribosome", "Mitochondria", "Endoplasmic reticulum"],
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
    question: "What is the speed of sound?",
    options: ["300 m/s", "330 m/s", "380 m/s", "430 m/s"],
    correct: 1,
    category: "science",
  },
  {
    question: "What element has the symbol H?",
    options: ["Helium", "Hydrogen", "Hafnium", "Hassium"],
    correct: 1,
    category: "science",
  },
  {
    question: "What is the pH of pure water?",
    options: ["5", "6", "7", "8"],
    correct: 2,
    category: "science",
  },
  {
    question: "What is DNA?",
    options: ["Deoxyribonucleic Acid", "Diribose Nucleic Acid", "Double Nitro Acid", "Distributed Nuclear Acid"],
    correct: 0,
    category: "science",
  },
  {
    question: "How many sides does a benzene ring have?",
    options: ["4", "5", "6", "7"],
    correct: 2,
    category: "science",
  },
  {
    question: "What is the most electronegative element?",
    options: ["Chlorine", "Oxygen", "Fluorine", "Nitrogen"],
    correct: 2,
    category: "science",
  },
  {
    question: "What is the boiling point of water?",
    options: ["90°C", "100°C", "110°C", "120°C"],
    correct: 1,
    category: "science",
  },
  {
    question: "What is the freezing point of water?",
    options: ["0°F", "0°C", "32°C", "-40°C"],
    correct: 1,
    category: "science",
  },
  {
    question: "How many elements are in the periodic table?",
    options: ["100", "115", "118", "120"],
    correct: 2,
    category: "science",
  },
  {
    question: "What is the chemical formula for table salt?",
    options: ["NaCl", "KCl", "CaCl2", "MgCl2"],
    correct: 0,
    category: "science",
  },
  {
    question: "What is the process of photosynthesis equation?",
    options: [
      "6CO2 + 6H2O -> C6H12O6 + 6O2",
      "C6H12O6 + 6O2 -> 6CO2 + 6H2O",
      "C6H12O6 + 6CO2 -> 6O2 + 6H2O",
      "None of above",
    ],
    correct: 0,
    category: "science",
  },
  {
    question: "What is the main component of natural gas?",
    options: ["Propane", "Methane", "Ethane", "Butane"],
    correct: 1,
    category: "science",
  },
  {
    question: "What is the symbol for potassium?",
    options: ["Po", "K", "Pt", "Pb"],
    correct: 1,
    category: "science",
  },
  {
    question: "How many nucleotides are in DNA?",
    options: ["2", "3", "4", "5"],
    correct: 2,
    category: "science",
  },
  {
    question: "What is the most common element in the universe?",
    options: ["Oxygen", "Helium", "Hydrogen", "Nitrogen"],
    correct: 2,
    category: "science",
  },
  {
    question: "What is the gravitational constant?",
    options: ["6.67 x 10^-11", "9.8 x 10^-11", "3.14 x 10^-11", "2.2 x 10^-11"],
    correct: 0,
    category: "science",
  },
  {
    question: "What is the SI unit of force?",
    options: ["Watt", "Newton", "Joule", "Pascal"],
    correct: 1,
    category: "science",
  },
  {
    question: "What is the process of converting liquid to gas?",
    options: ["Condensation", "Evaporation", "Sublimation", "Deposition"],
    correct: 1,
    category: "science",
  },
  {
    question: "What is the atomic number of carbon?",
    options: ["4", "5", "6", "7"],
    correct: 2,
    category: "science",
  },
  {
    question: "What is the symbol for sodium?",
    options: ["So", "Na", "Sn", "Sm"],
    correct: 1,
    category: "science",
  },
  {
    question: "How many angles does a triangle have?",
    options: ["2", "3", "4", "5"],
    correct: 1,
    category: "science",
  },
  {
    question: "What is the formula for calculating velocity?",
    options: ["v = d/t", "v = m*a", "v = F/m", "v = E/c"],
    correct: 0,
    category: "science",
  },
  {
    question: "What is the state of matter with fixed volume and shape?",
    options: ["Liquid", "Gas", "Solid", "Plasma"],
    correct: 2,
    category: "science",
  },
  {
    question: "What is kinetic energy?",
    options: ["Energy at rest", "Energy in motion", "Energy stored", "Potential energy"],
    correct: 1,
    category: "science",
  },
  {
    question: "What is the symbol for chlorine?",
    options: ["Cl", "Ch", "Co", "Cm"],
    correct: 0,
    category: "science",
  },
  {
    question: "How many strings does a violin have?",
    options: ["3", "4", "5", "6"],
    correct: 1,
    category: "science",
  },
  {
    question: "What is the chemical formula for ammonia?",
    options: ["NH2", "NH3", "NH4", "N2H4"],
    correct: 1,
    category: "science",
  },
  {
    question: "What is the atomic mass of oxygen?",
    options: ["14", "15", "16", "17"],
    correct: 2,
    category: "science",
  },
  {
    question: "What is the main function of the mitochondria?",
    options: ["Protein synthesis", "Energy production", "DNA storage", "Photosynthesis"],
    correct: 1,
    category: "science",
  },
  {
    question: "What is the symbol for iron?",
    options: ["Ir", "Fe", "In", "I"],
    correct: 1,
    category: "science",
  },
  {
    question: "What is the process of cell division?",
    options: ["Mitosis", "Meiosis", "Budding", "Fission"],
    correct: 0,
    category: "science",
  },
  {
    question: "What is the speed of Earth's rotation?",
    options: ["460 m/s", "465 m/s", "470 m/s", "475 m/s"],
    correct: 1,
    category: "science",
  },
  {
    question: "What is the chemical symbol for copper?",
    options: ["Co", "Cu", "Cp", "Cm"],
    correct: 1,
    category: "science",
  },
  {
    question: "How long is a light year?",
    options: ["5.88 x 10^12 km", "9.46 x 10^12 km", "3.26 x 10^12 km", "7.42 x 10^12 km"],
    correct: 1,
    category: "science",
  },
  {
    question: "What is the process of photosynthesis equation?",
    options: [
      "6CO2 + 6H2O -> C6H12O6 + 6O2",
      "C6H12O6 + 6O2 -> 6CO2 + 6H2O",
      "C6H12O6 + 6CO2 -> 6O2 + 6H2O",
      "None of above",
    ],
    correct: 0,
    category: "science",
  },
  {
    question: "What is the symbol for tin?",
    options: ["Ti", "Tn", "Sn", "Te"],
    correct: 2,
    category: "science",
  },
  {
    question: "How many electrons does oxygen have?",
    options: ["6", "8", "10", "12"],
    correct: 1,
    category: "science",
  },
  {
    question: "What is the Avogadro number?",
    options: ["6.02 x 10^22", "6.02 x 10^23", "6.02 x 10^24", "6.02 x 10^25"],
    correct: 1,
    category: "science",
  },
  {
    question: "What is the formula for water?",
    options: ["H2O", "HO2", "H3O", "H2O2"],
    correct: 0,
    category: "science",
  },
  {
    question: "What is the main component of air?",
    options: ["Nitrogen", "Oxygen", "Carbon Dioxide", "Argon"],
    correct: 0,
    category: "science",
  },
  {
    question: "How many muscles does the human body have?",
    options: ["400", "600", "800", "1000"],
    correct: 1,
    category: "science",
  },
  {
    question: "What is the chemical symbol for lead?",
    options: ["Ld", "Pb", "Lp", "Pd"],
    correct: 1,
    category: "science",
  },
  {
    question: "What is the atomic number of nitrogen?",
    options: ["5", "6", "7", "8"],
    correct: 2,
    category: "science",
  },
  {
    question: "What is the distance from Earth to the Sun?",
    options: ["93 million miles", "150 million km", "1 AU", "All are correct"],
    correct: 3,
    category: "science",
  },
  {
    question: "What is the symbol for mercury?",
    options: ["Mg", "Hg", "M", "Mn"],
    correct: 1,
    category: "science",
  },
  {
    question: "How many phases does the moon have?",
    options: ["4", "8", "12", "16"],
    correct: 1,
    category: "science",
  },

  // SPORTS - 100 preguntas
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
    question: "How long is a football field?",
    options: ["80 yards", "100 yards", "120 yards", "150 yards"],
    correct: 1,
    category: "sports",
  },
  {
    question: "What is the diameter of a basketball hoop?",
    options: ["16 inches", "18 inches", "20 inches", "22 inches"],
    correct: 1,
    category: "sports",
  },
  {
    question: "How many holes are in a standard golf course?",
    options: ["9", "12", "16", "18"],
    correct: 3,
    category: "sports",
  },
  {
    question: "What is the height of a tennis net?",
    options: ["2.5 feet", "3 feet", "3.5 feet", "4 feet"],
    correct: 1,
    category: "sports",
  },
  {
    question: "How many innings are in baseball?",
    options: ["6", "7", "8", "9"],
    correct: 3,
    category: "sports",
  },
  {
    question: "What is the duration of a rugby match?",
    options: ["60 minutes", "70 minutes", "80 minutes", "90 minutes"],
    correct: 2,
    category: "sports",
  },
  {
    question: "How many tries equal a goal in rugby?",
    options: ["1", "2", "3", "4"],
    correct: 2,
    category: "sports",
  },
  {
    question: "What is the weight of a standard basketball?",
    options: ["18 oz", "20 oz", "22 oz", "24 oz"],
    correct: 2,
    category: "sports",
  },
  {
    question: "How many sets are typically played in tennis?",
    options: ["Best of 1", "Best of 2", "Best of 3", "Best of 5"],
    correct: 2,
    category: "sports",
  },
  {
    question: "What is the circumference of a baseball?",
    options: ["8.5 inches", "9 inches", "9.25 inches", "10 inches"],
    correct: 2,
    category: "sports",
  },
  {
    question: "How many points is a touchdown worth?",
    options: ["4", "5", "6", "7"],
    correct: 2,
    category: "sports",
  },
  {
    question: "What is the average height of an NBA player?",
    options: ["6'4\"", "6'6\"", "6'8\"", "6'10\""],
    correct: 2,
    category: "sports",
  },
  {
    question: "How long is an Olympic swimming pool?",
    options: ["40 meters", "45 meters", "50 meters", "55 meters"],
    correct: 2,
    category: "sports",
  },
  {
    question: "What is the par for a standard hole in golf?",
    options: ["2", "3", "4", "Varies"],
    correct: 3,
    category: "sports",
  },
  {
    question: "How many players are on the court in volleyball?",
    options: ["4", "5", "6", "7"],
    correct: 2,
    category: "sports",
  },
  {
    question: "What is the duration of a quarter in basketball?",
    options: ["10 minutes", "12 minutes", "15 minutes", "20 minutes"],
    correct: 1,
    category: "sports",
  },
  {
    question: "How many strokes are in a golf tournament's par?",
    options: ["Varies", "72", "80", "90"],
    correct: 0,
    category: "sports",
  },
  {
    question: "What is the weight of a shot put used by men?",
    options: ["12 lb", "14 lb", "16 lb", "18 lb"],
    correct: 2,
    category: "sports",
  },
  {
    question: "How many points is a field goal in basketball?",
    options: ["1", "2", "3", "Depends"],
    correct: 3,
    category: "sports",
  },
  {
    question: "What is the width of an American football field?",
    options: ["45 yards", "50 yards", "53.33 yards", "60 yards"],
    correct: 2,
    category: "sports",
  },
  {
    question: "How many teams are in the NBA?",
    options: ["26", "28", "30", "32"],
    correct: 2,
    category: "sports",
  },
  {
    question: "What is the circumference of a soccer ball?",
    options: ["25-26 inches", "27-28 inches", "29-30 inches", "31-32 inches"],
    correct: 2,
    category: "sports",
  },
  {
    question: "How many pins in bowling?",
    options: ["8", "9", "10", "12"],
    correct: 2,
    category: "sports",
  },
  {
    question: "What is the height of the basketball rim?",
    options: ["8 feet", "9 feet", "10 feet", "11 feet"],
    correct: 2,
    category: "sports",
  },
  {
    question: "How many players are on an ice hockey team on the ice?",
    options: ["4", "5", "6", "7"],
    correct: 2,
    category: "sports",
  },
  {
    question: "What is the duration of a cricket match?",
    options: ["2 hours", "5 days", "Varies", "All of above"],
    correct: 3,
    category: "sports",
  },
  {
    question: "How many players are in an American football team on field?",
    options: ["9", "10", "11", "12"],
    correct: 2,
    category: "sports",
  },
  {
    question: "What is the weight of an American football?",
    options: ["12-14 oz", "14-16 oz", "16-18 oz", "18-20 oz"],
    correct: 1,
    category: "sports",
  },
  {
    question: "How many teams compete in the World Cup?",
    options: ["16", "24", "32", "48"],
    correct: 2,
    category: "sports",
  },
  {
    question: "What is the duration of a half-time in football?",
    options: ["10 minutes", "15 minutes", "20 minutes", "30 minutes"],
    correct: 1,
    category: "sports",
  },
  {
    question: "How many clubs does a golfer typically carry?",
    options: ["10", "12", "14", "16"],
    correct: 2,
    category: "sports",
  },
  {
    question: "What is the standard price of a grand slam title in tennis?",
    options: ["Varies", "Same for all", "Different for each", "No prize money"],
    correct: 0,
    category: "sports",
  },
  {
    question: "How many teams are in the Premier League?",
    options: ["18", "20", "22", "24"],
    correct: 1,
    category: "sports",
  },
  {
    question: "What is the maximum break in snooker?",
    options: ["100", "147", "180", "200"],
    correct: 1,
    category: "sports",
  },
  {
    question: "How many players are on a cricket team?",
    options: ["9", "10", "11", "12"],
    correct: 2,
    category: "sports",
  },
  {
    question: "What is the circumference of a tennis ball?",
    options: ["8-8.3 inches", "8.3-8.7 inches", "8.7-9.1 inches", "9.1-9.5 inches"],
    correct: 2,
    category: "sports",
  },
  {
    question: "How many points is a conversion worth in rugby?",
    options: ["2", "3", "4", "5"],
    correct: 1,
    category: "sports",
  },
  {
    question: "What is the duration of a period in ice hockey?",
    options: ["15 minutes", "18 minutes", "20 minutes", "25 minutes"],
    correct: 2,
    category: "sports",
  },
  {
    question: "How many teams are in the NFL?",
    options: ["28", "30", "32", "34"],
    correct: 2,
    category: "sports",
  },
  {
    question: "What is the weight of a badminton shuttle?",
    options: ["4.75-5.5 grams", "5.5-6.5 grams", "6.5-7.5 grams", "7.5-8.5 grams"],
    correct: 1,
    category: "sports",
  },
  {
    question: "How many players are on a curling team?",
    options: ["3", "4", "5", "6"],
    correct: 1,
    category: "sports",
  },
  {
    question: "What is the length of a table tennis table?",
    options: ["2 meters", "2.5 meters", "2.74 meters", "3 meters"],
    correct: 2,
    category: "sports",
  },

  // ENTERTAINMENT - 100 preguntas
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
    correct: 2,
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
    question: "Who won the first Academy Award for Best Actor?",
    options: ["Charlie Chaplin", "Emil Jannings", "Buster Keaton", "Douglas Fairbanks"],
    correct: 1,
    category: "entertainment",
  },
  {
    question: "What is the most-watched TV series in the world?",
    options: ["Game of Thrones", "The Office", "Breaking Bad", "Friends"],
    correct: 0,
    category: "entertainment",
  },
  {
    question: "Who is the lead singer of Coldplay?",
    options: ["Chris Cornell", "Chris Martin", "Chris Hemsworth", "Chris Rock"],
    correct: 1,
    category: "entertainment",
  },
  {
    question: "What year was the first iPhone released?",
    options: ["2005", "2006", "2007", "2008"],
    correct: 2,
    category: "entertainment",
  },
  {
    question: "Who directed 'The Shawshank Redemption'?",
    options: ["Steven Spielberg", "Frank Darabont", "Christopher Nolan", "Quentin Tarantino"],
    correct: 1,
    category: "entertainment",
  },
  {
    question: "What is the real name of Eminem?",
    options: ["Eric Martin", "Marshall Mathers", "Adam Richard", "Edward Taylor"],
    correct: 1,
    category: "entertainment",
  },
  {
    question: "Who starred in the movie 'Inception'?",
    options: ["Tom Hardy", "Leonardo DiCaprio", "Marion Cotillard", "All of above"],
    correct: 3,
    category: "entertainment",
  },
  {
    question: "What is the longest-running TV series?",
    options: ["Doctor Who", "Meet the Press", "Panorama", "The Simpsons"],
    correct: 1,
    category: "entertainment",
  },
  {
    question: "Who is the most-followed person on Instagram?",
    options: ["Kylie Jenner", "Dwayne Johnson", "Cristiano Ronaldo", "Lionel Messi"],
    correct: 2,
    category: "entertainment",
  },
  {
    question: "What movie franchise has grossed the most money?",
    options: ["Marvel", "Star Wars", "Harry Potter", "Fast and Furious"],
    correct: 0,
    category: "entertainment",
  },
  {
    question: "Who is the artist behind the song 'Bohemian Rhapsody'?",
    options: ["The Beatles", "Queen", "Pink Floyd", "David Bowie"],
    correct: 1,
    category: "entertainment",
  },
  {
    question: "What is the most-watched movie of all time?",
    options: ["Avatar", "Titanic", "Star Wars", "Avengers Endgame"],
    correct: 0,
    category: "entertainment",
  },
  {
    question: "Who plays Black Panther in Marvel?",
    options: ["Chadwick Boseman", "Michael B. Jordan", "Lupita Nyong'o", "Danai Gurira"],
    correct: 0,
    category: "entertainment",
  },
  {
    question: "What year did Netflix start streaming?",
    options: ["2005", "2006", "2007", "2008"],
    correct: 2,
    category: "entertainment",
  },
  {
    question: "Who won the Grammy Award for Best New Artist in 2023?",
    options: ["Bad Bunny", "Billie Eilish", "Olivia Rodrigo", "The Weeknd"],
    correct: 0,
    category: "entertainment",
  },
  {
    question: "What movie has the most Academy Award nominations?",
    options: ["Titanic", "La La Land", "All About Eve", "Citizen Kane"],
    correct: 1,
    category: "entertainment",
  },
  {
    question: "Who directed 'Pulp Fiction'?",
    options: ["Martin Scorsese", "Quentin Tarantino", "Steven Spielberg", "David Fincher"],
    correct: 1,
    category: "entertainment",
  },
  {
    question: "What TV show has been on the air the longest?",
    options: ["60 Minutes", "The Simpsons", "Meet the Press", "Doctor Who"],
    correct: 2,
    category: "entertainment",
  },
  {
    question: "Who is the highest-paid actor in 2023?",
    options: ["Tom Cruise", "Tom Hardy", "Tom Holland", "Dwayne Johnson"],
    correct: 0,
    category: "entertainment",
  },
  {
    question: "What movie won Best Picture at the 2023 Oscars?",
    options: ["Top Gun Maverick", "Everything Everywhere All at Once", "The Fabelmans", "Avatar"],
    correct: 1,
    category: "entertainment",
  },
  {
    question: "Who is the creator of The Office?",
    options: ["Greg Daniels", "Steve Carell", "Ricky Gervais", "John Krasinski"],
    correct: 2,
    category: "entertainment",
  },
  {
    question: "What is the best-selling music album of all time?",
    options: ["Thriller", "Abbey Road", "The Wall", "Dark Side of the Moon"],
    correct: 0,
    category: "entertainment",
  },
  {
    question: "Who won the Academy Award for Best Director in 2023?",
    options: ["Paul Thomas Anderson", "Steven Spielberg", "Daniel Kwan", "Justine Triet"],
    correct: 2,
    category: "entertainment",
  },
  {
    question: "What is the most-streamed song on Spotify?",
    options: ["Blinding Lights", "Shape of You", "Someone Like You", "Bitter Sweet Symphony"],
    correct: 0,
    category: "entertainment",
  },
  {
    question: "Who is the richest celebrity?",
    options: ["Elon Musk", "Jeff Bezos", "Jami Gertz", "Jerry Jones"],
    correct: 1,
    category: "entertainment",
  },
  {
    question: "What movie franchise is the highest-grossing of all time?",
    options: ["Star Wars", "Marvel", "Harry Potter", "Fast and Furious"],
    correct: 1,
    category: "entertainment",
  },
  {
    question: "Who is the most-followed female actor on Instagram?",
    options: ["Kylie Jenner", "Ariana Grande", "Selena Gomez", "Kim Kardashian"],
    correct: 1,
    category: "entertainment",
  },
  {
    question: "What is the longest movie ever made?",
    options: ["Lol", "Logistics", "The Brown Bunny", "Getafix"],
    correct: 1,
    category: "entertainment",
  },
  {
    question: "Who won the Grammy for Record of the Year in 2023?",
    options: ["Bad Bunny", "Billie Eilish", "Harry Styles", "Taylor Swift"],
    correct: 0,
    category: "entertainment",
  },
  {
    question: "What TV show had the most watched finale?",
    options: ["Game of Thrones", "Breaking Bad", "M*A*S*H", "The Office"],
    correct: 0,
    category: "entertainment",
  },
  {
    question: "Who is the oldest actor to win an Oscar?",
    options: ["Clint Eastwood", "Christopher Plummer", "Anthony Hopkins", "George Burns"],
    correct: 3,
    category: "entertainment",
  },
  {
    question: "What movie has the highest IMDB rating?",
    options: ["The Shawshank Redemption", "The Godfather", "The Dark Knight", "Pulp Fiction"],
    correct: 0,
    category: "entertainment",
  },
  {
    question: "Who is the best-selling music artist of all time?",
    options: ["Elvis Presley", "Michael Jackson", "The Beatles", "Madonna"],
    correct: 0,
    category: "entertainment",
  },
  {
    question: "What streaming service has the most subscribers?",
    options: ["Netflix", "Amazon Prime", "Disney+", "Hulu"],
    correct: 0,
    category: "entertainment",
  },
  {
    question: "Who won the Academy Award for Best Actress in 2023?",
    options: ["Cate Blanchett", "Michelle Yeoh", "Lily James", "Jessica Chastain"],
    correct: 1,
    category: "entertainment",
  },
  {
    question: "What is the highest-rated TV series on IMDB?",
    options: ["Game of Thrones", "Breaking Bad", "The Office", "Friends"],
    correct: 1,
    category: "entertainment",
  },
  {
    question: "Who is the youngest person to win a Grammy?",
    options: ["Billie Eilish", "Britney Spears", "Christina Aguilera", "LeAnn Rimes"],
    correct: 3,
    category: "entertainment",
  },
  {
    question: "What movie won Best Picture at 2022 Oscars?",
    options: ["Don't Look Up", "CODA", "The Power of the Dog", "Dune"],
    correct: 1,
    category: "entertainment",
  },
  {
    question: "Who is the most-watched YouTuber?",
    options: ["SET India", "MrBeast", "Dude Perfect", "Felipe Neto"],
    correct: 0,
    category: "entertainment",
  },
  {
    question: "What is the most expensive movie ever made?",
    options: ["Avatar 2", "Cleopatra", "Avengers Endgame", "John Carter"],
    correct: 1,
    category: "entertainment",
  },
  {
    question: "Who won the first Grammy Award?",
    options: ["Elvis Presley", "Miles Davis", "Frank Sinatra", "Duke Ellington"],
    correct: 1,
    category: "entertainment",
  },
  {
    question: "What is the most-watched video on YouTube?",
    options: ["Baby Shark", "Despacito", "YouTube Rewind", "Gangnam Style"],
    correct: 0,
    category: "entertainment",
  },
  {
    question: "Who is the host of The Late Show?",
    options: ["Jimmy Fallon", "Stephen Colbert", "James Corden", "Trevor Noah"],
    correct: 1,
    category: "entertainment",
  },
  {
    question: "What movie has the lowest IMDB rating?",
    options: ["Disaster Movie", "Manos: The Hands of Fate", "Birdemic", "Gigli"],
    correct: 1,
    category: "entertainment",
  },

  // ART - 100 preguntas
  {
    question: "Who is the most famous sculptor of the Renaissance?",
    options: ["Leonardo da Vinci", "Raphael", "Michelangelo", "Donatello"],
    correct: 2,
    category: "art",
  },
  {
    question: "Which artist cut off his own ear?",
    options: ["Picasso", "Van Gogh", "Dali", "Monet"],
    correct: 1,
    category: "art",
  },
  {
    question: "What painting is known as the 'Mona Lisa'?",
    options: ["By Raphael", "By Leonardo da Vinci", "By Michelangelo", "By Botticelli"],
    correct: 1,
    category: "art",
  },
  {
    question: "Who painted the starry night?",
    options: ["Monet", "Van Gogh", "Cézanne", "Gauguin"],
    correct: 1,
    category: "art",
  },
  {
    question: "What movement did Picasso pioneer?",
    options: ["Impressionism", "Cubism", "Surrealism", "Expressionism"],
    correct: 1,
    category: "art",
  },
  {
    question: "Who is the author of Don Quixote?",
    options: ["García Márquez", "Miguel de Cervantes", "Borges", "Lorca"],
    correct: 1,
    category: "art",
  },
  {
    question: "What is the most valuable painting ever sold?",
    options: ["Starry Night", "Salvator Mundi", "The Persistence of Memory", "The Kiss"],
    correct: 1,
    category: "art",
  },
  {
    question: "Who painted the ceiling of the Sistine Chapel?",
    options: ["Leonardo da Vinci", "Michelangelo", "Raphael", "Botticelli"],
    correct: 1,
    category: "art",
  },
  {
    question: "What art movement was Dalí associated with?",
    options: ["Cubism", "Surrealism", "Impressionism", "Expressionism"],
    correct: 1,
    category: "art",
  },
  {
    question: "Who sculpted the statue of David?",
    options: ["Leonardo da Vinci", "Raphael", "Michelangelo", "Donatello"],
    correct: 2,
    category: "art",
  },
  {
    question: "What is the oldest known cave painting?",
    options: ["Chauvet Cave", "Lascaux", "Altamira", "El Castillo"],
    correct: 0,
    category: "art",
  },
  {
    question: "Who is known for abstract expressionism?",
    options: ["Jackson Pollock", "Mark Rothko", "Barnett Newman", "All of above"],
    correct: 3,
    category: "art",
  },
  {
    question: "What painting shows a melting clocks?",
    options: ["The Dream", "Metamorphosis", "The Persistence of Memory", "Swans Reflecting Elephants"],
    correct: 2,
    category: "art",
  },
  {
    question: "Who created the famous Campbell Soup Cans?",
    options: ["Jackson Pollock", "Andy Warhol", "Roy Lichtenstein", "Jasper Johns"],
    correct: 1,
    category: "art",
  },
  {
    question: "What art movement was Monet associated with?",
    options: ["Cubism", "Impressionism", "Surrealism", "Realism"],
    correct: 1,
    category: "art",
  },
  {
    question: "Who is the author of 'Jane Eyre'?",
    options: ["Jane Austen", "Charlotte Brontë", "Emily Brontë", "Anne Brontë"],
    correct: 1,
    category: "art",
  },
  {
    question: "What is the most visited museum in the world?",
    options: ["MoMA", "The Louvre", "British Museum", "Metropolitan Museum"],
    correct: 1,
    category: "art",
  },
  {
    question: "Who painted The Third of May 1808?",
    options: ["Goya", "Diego Rivera", "El Greco", "Velázquez"],
    correct: 0,
    category: "art",
  },
  {
    question: "What is the technique used in abstract art?",
    options: ["Realism", "Non-representational", "Both", "Neither"],
    correct: 1,
    category: "art",
  },
  {
    question: "Who is the author of 'Pride and Prejudice'?",
    options: ["Jane Austen", "Charlotte Brontë", "Emily Dickinson", "George Eliot"],
    correct: 0,
    category: "art",
  },
  {
    question: "What painting shows a woman with three faces?",
    options: ["Les Demoiselles d'Avignon", "Three Faced Woman", "Portrait of Three", "The Three Graces"],
    correct: 0,
    category: "art",
  },
  {
    question: "Who is known for portrait photography?",
    options: ["Ansel Adams", "Irving Penn", "Man Ray", "All of above"],
    correct: 3,
    category: "art",
  },
  {
    question: "What is pointillism?",
    options: ["Using dots of color", "Using lines", "Using shapes", "Using shadows"],
    correct: 0,
    category: "art",
  },
  {
    question: "Who is the author of 'Wuthering Heights'?",
    options: ["Jane Austen", "Charlotte Brontë", "Emily Brontë", "Anne Brontë"],
    correct: 2,
    category: "art",
  },
  {
    question: "What is the most expensive artwork ever sold at auction?",
    options: ["Salvator Mundi", "Interchange", "The Card Players", "Nighthawks"],
    correct: 0,
    category: "art",
  },
  {
    question: "Who painted The Birth of Venus?",
    options: ["Leonardo da Vinci", "Botticelli", "Raphael", "Michelangelo"],
    correct: 1,
    category: "art",
  },
  {
    question: "What art style is Frida Kahlo associated with?",
    options: ["Cubism", "Surrealism", "Magical realism", "Self-portraiture"],
    correct: 3,
    category: "art",
  },
  {
    question: "Who is the author of 'The Great Gatsby'?",
    options: ["Ernest Hemingway", "F. Scott Fitzgerald", "Steinbeck", "Faulkner"],
    correct: 1,
    category: "art",
  },
  {
    question: "What painting is also known as The Raft of the Medusa?",
    options: ["Sea Rescue", "The Wreck", "Théodore Géricault", "The Raft"],
    correct: 2,
    category: "art",
  },
  {
    question: "Who sculpted The Thinker?",
    options: ["Auguste Rodin", "Michelangelo", "Phidias", "Praxiteles"],
    correct: 0,
    category: "art",
  },
  {
    question: "What is the art movement called Dada?",
    options: ["Anti-art", "Avant-garde", "Absurdist", "All of above"],
    correct: 3,
    category: "art",
  },
  {
    question: "Who is the author of 'Frankenstein'?",
    options: ["Mary Shelley", "Bram Stoker", "H.G. Wells", "Robert Louis Stevenson"],
    correct: 0,
    category: "art",
  },
  {
    question: "What painting shows a melting landscape?",
    options: ["The Dream", "Metamorphosis", "The Persistence of Memory", "Swans Reflecting Elephants"],
    correct: 2,
    category: "art",
  },
  {
    question: "Who is known for the art deco style?",
    options: ["Art Nouveau artists", "Bauhaus artists", "Art Deco artists", "Minimalist artists"],
    correct: 2,
    category: "art",
  },
  {
    question: "What is the most popular art movement?",
    options: ["Impressionism", "Cubism", "Expressionism", "Varies"],
    correct: 3,
    category: "art",
  },
  {
    question: "Who is the author of 'Moby Dick'?",
    options: ["Herman Melville", "Nathaniel Hawthorne", "Mark Twain", "Joseph Conrad"],
    correct: 0,
    category: "art",
  },
  {
    question: "What painting is also known as Woman with a Pearl Earring?",
    options: ["Girl with Pearl Earring", "Dutch Girl", "Johannes Vermeer", "The Milkmaid"],
    correct: 0,
    category: "art",
  },
  {
    question: "Who is known for photorealism?",
    options: ["Photorealist painters", "Hyperrealist painters", "Both", "Neither"],
    correct: 2,
    category: "art",
  },
  {
    question: "What is chiaroscuro?",
    options: ["Light and shadow", "Color and tone", "Form and shape", "Line and texture"],
    correct: 0,
    category: "art",
  },
  {
    question: "Who is the author of 'The Odyssey'?",
    options: ["Homer", "Sophocles", "Euripides", "Aristotle"],
    correct: 0,
    category: "art",
  },
  {
    question: "What painting shows a swirling sky?",
    options: ["Starry Night", "The Night Watch", "Nighthawks", "Night on Bald Mountain"],
    correct: 0,
    category: "art",
  },
  {
    question: "Who is known for kinetic art?",
    options: ["Alexander Calder", "Jean Tinguely", "Naum Gabo", "All of above"],
    correct: 3,
    category: "art",
  },
  {
    question: "What is the art style of anime?",
    options: ["Japanese animation", "Cartoon", "Art style", "All of above"],
    correct: 3,
    category: "art",
  },
]

export default function TriviaBoard() {
  const [gameState, setGameState] = useState<
    "setup" | "turn-display" | "wheel-spin" | "question" | "results" | "game-over"
  >("setup")
  const [players, setPlayers] = useState<Player[]>([])
  const [numPlayers, setNumPlayers] = useState(2)
  const [playerNames, setPlayerNames] = useState<string[]>(["", ""])
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [usedQuestions, setUsedQuestions] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT)
  const [answered, setAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [wheelRotation, setWheelRotation] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)

  const colors = [
    "bg-blue-500",
    "bg-red-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-cyan-500",
    "bg-orange-500",
    "bg-teal-500",
    "bg-rose-500",
    "bg-lime-500",
    "bg-sky-500",
    "bg-amber-500",
    "bg-violet-500",
    "bg-fuchsia-500",
    "bg-emerald-500",
    "bg-slate-500",
    "bg-zinc-500",
    "bg-stone-500",
  ]

  const categoryColors: Record<Category, string> = {
    history: "from-amber-500 to-orange-600",
    science: "from-blue-500 to-cyan-600",
    sports: "from-green-500 to-emerald-600",
    entertainment: "from-pink-500 to-rose-600",
    art: "from-purple-500 to-violet-600",
  }

  const handleStartGame = () => {
    const validNames = playerNames.slice(0, numPlayers).filter((name) => name.trim())
    if (validNames.length !== numPlayers) {
      alert("Please fill in all player names")
      return
    }

    const newPlayers = validNames.map((name, idx) => ({
      name,
      score: 0,
      color: colors[idx],
    }))
    setPlayers(newPlayers)
    setCurrentPlayerIndex(0)
    setGameState("turn-display")
  }

  const handleStartTurn = () => {
    setGameState("wheel-spin")
  }

  const spinWheel = () => {
    if (isSpinning) return

    setIsSpinning(true)
    playSound("spin")

    const spins = Math.floor(Math.random() * 5) + 5
    const selectedCategoryIndex = Math.floor(Math.random() * CATEGORIES.length)
    const finalRotation = spins * 360 + selectedCategoryIndex * 72

    setWheelRotation(finalRotation)

    setTimeout(() => {
      setSelectedCategory(CATEGORIES[selectedCategoryIndex])
      setIsSpinning(false)
    }, 3000)
  }

  const handleWheelComplete = () => {
    if (selectedCategory) {
      getNextQuestion(usedQuestions, selectedCategory)
      setGameState("question")
    }
  }

  const getNextQuestion = (usedIds: number[], category: Category) => {
    const availableQuestions = QUESTIONS.filter(
      (q) => q.category === category && !usedIds.includes(QUESTIONS.indexOf(q)),
    )

    if (availableQuestions.length === 0) {
      setUsedQuestions([])
      const newQuestion = QUESTIONS.filter((q) => q.category === category)[
        Math.floor(Math.random() * QUESTIONS.filter((q) => q.category === category).length)
      ]
      setCurrentQuestion(newQuestion)
    } else {
      const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
      setCurrentQuestion(randomQuestion)
      setUsedQuestions([...usedIds, QUESTIONS.indexOf(randomQuestion)])
    }

    setTimeLeft(TIME_LIMIT)
    setAnswered(false)
    setSelectedAnswer(null)
  }

  useEffect(() => {
    if (gameState !== "question" || answered) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleTimeout()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameState, answered])

  const handleTimeout = () => {
    setAnswered(true)
    playSound("error")
  }

  const handleAnswer = (optionIndex: number) => {
    if (answered) return
    setSelectedAnswer(optionIndex)
    setAnswered(true)

    if (currentQuestion && optionIndex === currentQuestion.correct) {
      playSound("success")
      const newPlayers = [...players]
      newPlayers[currentPlayerIndex].score += 10
      setPlayers(newPlayers)
    } else {
      playSound("error")
    }

    setTimeout(() => {
      setGameState("results")
    }, 1500)
  }

  const handleResultsNext = () => {
    setCurrentPlayerIndex((prev) => (prev + 1) % players.length)
    setSelectedCategory(null)
    setWheelRotation(0)
    setGameState("turn-display")
  }

  const playSound = (type: "success" | "error" | "victory" | "spin") => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    if (type === "success") {
      oscillator.frequency.value = 800
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.2)
    } else if (type === "error") {
      oscillator.frequency.value = 300
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.3)
    } else if (type === "victory") {
      oscillator.frequency.value = 1000
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)
    } else if (type === "spin") {
      oscillator.frequency.value = 500
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.3)
    }
  }

  const getSortedPlayers = () => {
    return [...players].sort((a, b) => b.score - a.score)
  }

  const getMedalIcon = (position: number) => {
    if (position === 0) return "🥇"
    if (position === 1) return "🥈"
    if (position === 2) return "🥉"
    return ""
  }

  if (gameState === "setup") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 p-4">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-white mb-8 hover:opacity-80">
            <ArrowLeft size={20} /> Back
          </Link>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users size={24} /> Trivia Board Setup
              </CardTitle>
              <CardDescription>Configure your game</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Number of Players (2-20)</Label>
                <Input
                  type="number"
                  min="2"
                  max="20"
                  value={numPlayers}
                  onChange={(e) => {
                    const num = Math.max(2, Math.min(20, Number.parseInt(e.target.value) || 2))
                    setNumPlayers(num)
                    setPlayerNames([
                      ...playerNames.slice(0, num),
                      ...Array(Math.max(0, num - playerNames.length)).fill(""),
                    ])
                  }}
                  className="mt-2"
                />
              </div>

              <div className="space-y-3">
                <Label>Player Names</Label>
                {playerNames.slice(0, numPlayers).map((name, idx) => (
                  <Input
                    key={idx}
                    placeholder={`Player ${idx + 1}`}
                    value={name}
                    onChange={(e) => {
                      const newNames = [...playerNames]
                      newNames[idx] = e.target.value
                      setPlayerNames(newNames)
                    }}
                  />
                ))}
              </div>

              <Button onClick={handleStartGame} className="w-full bg-blue-600 hover:bg-blue-700">
                <Play size={20} className="mr-2" /> Start Game
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (gameState === "turn-display") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center p-4">
        <div className="text-center">
          <div
            className={`${players[currentPlayerIndex]?.color} rounded-full w-40 h-40 mx-auto flex items-center justify-center mb-8 shadow-2xl animate-bounce`}
          >
            <span className="text-white text-6xl font-bold">!</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Turno de</h1>
          <h2 className="text-6xl font-bold text-yellow-300 mb-8">{players[currentPlayerIndex]?.name}</h2>
          <Button
            onClick={handleStartTurn}
            className="mt-8 bg-yellow-400 hover:bg-yellow-500 text-black text-lg px-8 py-6"
          >
            Comenzar Turno
          </Button>
        </div>
      </div>
    )
  }

  if (gameState === "wheel-spin") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold text-white mb-8">Categoría Seleccionada</h1>

        <div className="mb-8">
          <p className="text-7xl font-bold text-yellow-300 text-center mb-12 animate-pulse">
            {selectedCategory?.toUpperCase()}
          </p>
        </div>

        {!isSpinning && selectedCategory === null && (
          <Button onClick={spinWheel} className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-6">
            Girar Rueda
          </Button>
        )}

        {!isSpinning && selectedCategory !== null && (
          <Button onClick={handleWheelComplete} className="bg-blue-400 hover:bg-blue-500 text-white text-lg px-8 py-6">
            Siguiente
          </Button>
        )}
      </div>
    )
  }

  if (gameState === "question") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 p-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-white mb-4 hover:opacity-80">
            <ArrowLeft size={20} /> Back
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Jugador Actual</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-blue-600">{players[currentPlayerIndex]?.name}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Clock size={16} /> Tiempo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-2xl font-bold ${timeLeft <= 5 ? "text-red-600 animate-pulse" : "text-blue-600"}`}>
                  {timeLeft}s
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm capitalize">{selectedCategory}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-bold text-purple-600">
                  {selectedCategory?.charAt(0).toUpperCase()}
                  {selectedCategory?.slice(1)}
                </p>
              </CardContent>
            </Card>
          </div>

          {currentQuestion && (
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-2xl">{currentQuestion.question}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentQuestion.options.map((option, idx) => (
                  <Button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={answered}
                    variant={selectedAnswer === idx ? "default" : "outline"}
                    className={`w-full justify-start text-left h-auto p-4 text-lg ${
                      answered && idx === currentQuestion.correct ? "bg-green-500 hover:bg-green-500 text-white" : ""
                    } ${
                      answered && selectedAnswer === idx && idx !== currentQuestion.correct
                        ? "bg-red-500 hover:bg-red-500 text-white"
                        : ""
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}: {option}
                  </Button>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    )
  }

  if (gameState === "results") {
    const sortedPlayers = getSortedPlayers()
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-600 to-blue-600 flex items-center justify-center p-4">
        <Card className="bg-white max-w-2xl w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-4">Ranking Actual</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sortedPlayers.map((player, idx) => (
              <div
                key={player.name}
                className={`p-4 rounded-lg flex items-center justify-between ${
                  idx === 0
                    ? "bg-gradient-to-r from-yellow-300 to-yellow-200"
                    : idx === 1
                      ? "bg-gradient-to-r from-gray-300 to-gray-200"
                      : idx === 2
                        ? "bg-gradient-to-r from-orange-300 to-orange-200"
                        : "bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{getMedalIcon(idx)}</span>
                  <div>
                    <p className="font-bold text-lg">{player.name}</p>
                    <p className="text-sm text-gray-600">Posición {idx + 1}</p>
                  </div>
                </div>
                <p className="text-3xl font-bold text-blue-600">{player.score}</p>
              </div>
            ))}

            <Button
              onClick={handleResultsNext}
              className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white text-lg py-6"
            >
              Siguiente Turno
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}
