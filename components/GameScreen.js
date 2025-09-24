import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';

// Import your JSON files
import actors from '../data/actors.json';
import football from '../data/football.json';
import singers from '../data/singers.json';

export default function GameScreen({ route }) {
  const { category } = route.params;

  const [word, setWord] = useState('');
  const [guessed, setGuessed] = useState([]);
  const [wrong, setWrong] = useState([]);
  const [status, setStatus] = useState('playing'); // playing | won | lost
  const [score, setScore] = useState(0);
  const maxWrong = 6;

  // Pick random word based on category
  const getWord = () => {
    let list = [];
    if (category === 'actors') list = actors;
    if (category === 'football') list = football;
    if (category === 'singers') list = singers;

    const randomWord = list[Math.floor(Math.random() * list.length)].toUpperCase();
    setWord(randomWord);
    setGuessed([]);
    setWrong([]);
    setStatus('playing');
  };

  useEffect(() => {
    getWord();
  }, [category]);

  const handleGuess = (letter) => {
    if (status !== 'playing') return;

    const guess = letter.toUpperCase();
    if (!/^[A-Z]$/.test(guess)) return; // Only allow single letters A–Z

    if (word.includes(guess)) {
      if (!guessed.includes(guess)) {
        setGuessed([...guessed, guess]);
      }
    } else {
      if (!wrong.includes(guess)) {
        setWrong([...wrong, guess]);
      }
    }
  };

  // Check win/loss
  useEffect(() => {
    if (!word) return;

    const revealed = word
      .split('')
      .map((l) => (l === ' ' ? ' ' : guessed.includes(l) ? l : '*'))
      .join('');

    if (revealed === word) {
      setStatus('won');
      setScore((prev) => prev + 1);
    } else if (wrong.length >= maxWrong) {
      setStatus('lost');
    }
  }, [guessed, wrong]);

  const displayWord = word
    .split('')
    .map((l) => (l === ' ' ? ' ' : guessed.includes(l) ? l : '*'))
    .join('');

  // Simple hangman text drawing
  const hangmanStages = [
    '',
    'O',
    'O\n |',
    'O\n/|',
    'O\n/|\\',
    'O\n/|\\\n/',
    'O\n/|\\\n/ \\'
  ];
  const hangman = hangmanStages[wrong.length];

  // Alphabet letters
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Category: {category}</Text>
      <Text style={styles.score}>Score: {score}</Text>
      <Text style={styles.lives}>Lives left: {maxWrong - wrong.length}</Text>

      <Text style={styles.hangman}>{hangman}</Text>
      <Text style={styles.word}>{displayWord}</Text>
      <Text style={styles.wrong}>Wrong guesses: {wrong.join(', ')}</Text>

      {status === 'playing' && (
        <View style={styles.lettersGrid}>
          {alphabet.map((letter) => {
            const isDisabled = guessed.includes(letter) || wrong.includes(letter);
            return (
              <TouchableOpacity
                key={letter}
                style={[styles.letterButton, isDisabled && styles.letterDisabled]}
                onPress={() => handleGuess(letter)}
                disabled={isDisabled}
              >
                <Text style={styles.letterText}>{letter}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {status === 'won' && (
        <View>
          <Text style={styles.win}>🎉 You guessed it: {word}</Text>
          <Button title="Next Word" onPress={getWord} />
        </View>
      )}

      {status === 'lost' && (
        <View>
          <Text style={styles.lost}>💀 Game Over! The word was: {word}</Text>
          <Button title="Try Again" onPress={getWord} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, marginBottom: 10 },
  score: { fontSize: 18, marginBottom: 5, color: 'green' },
  lives: { fontSize: 18, marginBottom: 20, color: 'red' },
  hangman: { fontSize: 28, color: 'red', textAlign: 'center', marginBottom: 20 },
  word: { fontSize: 32, letterSpacing: 4, marginBottom: 20 },
  wrong: { fontSize: 16, color: 'red', marginBottom: 20, textAlign: 'center' },
  lettersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20
  },
  letterButton: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 4,
    padding: 10,
    margin: 4,
    minWidth: 40,
    alignItems: 'center'
  },
  letterDisabled: {
    backgroundColor: '#ccc'
  },
  letterText: {
    fontSize: 18
  },
  win: { fontSize: 20, color: 'green', marginBottom: 10, textAlign: 'center' },
  lost: { fontSize: 20, color: 'red', marginBottom: 10, textAlign: 'center' }
});
