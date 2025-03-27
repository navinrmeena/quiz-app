// @ts-nocheck
import { useEffect, useState } from "react";
import { BackHandler } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Button, Card, H6, Text, XStack, YStack } from "tamagui";

import { MyStack } from "../../components/MyStack";

// Define types for question and score
type Question = {
  id: number;
  question: string;
  options: string[];
  correct: number;
};

type Score = {
  correct: number;
  incorrect: number;
};

export default function User() {
  const allQuestions: Question[] = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correct: 2
    },
    {
      id: 2,
      question: "What is 5 + 7?",
      options: ["10", "11", "12", "13"],
      correct: 2
    },
    {
      id: 3,
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Venus", "Mars", "Jupiter"],
      correct: 2
    },
    {
      id: 4,
      question: "What is the square root of 144?",
      options: ["10", "12", "14", "16"],
      correct: 1
    },
    {
      id: 5,
      question: "Who wrote 'To Kill a Mockingbird'?",
      options: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "J.K. Rowling"],
      correct: 0
    },
    {
      id: 6,
      question: "What is the largest mammal in the world?",
      options: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
      correct: 1
    },
    {
      id: 7,
      question: "Which gas do plants absorb from the atmosphere?",
      options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
      correct: 2
    },
    {
      id: 8,
      question: "Who painted the Mona Lisa?",
      options: [
        "Vincent van Gogh",
        "Pablo Picasso",
        "Leonardo da Vinci",
        "Michelangelo"
      ],
      correct: 2
    },
    {
      id: 9,
      question: "What is the smallest prime number?",
      options: ["0", "1", "2", "3"],
      correct: 2
    },
    {
      id: 10,
      question: "In which year did the Titanic sink?",
      options: ["1910", "1912", "1914", "1916"],
      correct: 1
    },
    {
      id: 11,
      question: "Which is the longest river in the world?",
      options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
      correct: 1
    },
    {
      id: 12,
      question: "How many colors are there in a rainbow?",
      options: ["5", "6", "7", "8"],
      correct: 2
    },
    {
      id: 13,
      question: "Who discovered gravity?",
      options: [
        "Albert Einstein",
        "Isaac Newton",
        "Galileo Galilei",
        "Nikola Tesla"
      ],
      correct: 1
    },
    {
      id: 14,
      question: "Which is the largest desert in the world?",
      options: ["Sahara", "Gobi", "Antarctica", "Kalahari"],
      correct: 2
    },
    {
      id: 15,
      question: "What is the chemical symbol for gold?",
      options: ["Ag", "Au", "Gd", "Go"],
      correct: 1
    },
    {
      id: 16,
      question: "Who was the first man to step on the moon?",
      options: [
        "Buzz Aldrin",
        "Yuri Gagarin",
        "Neil Armstrong",
        "Michael Collins"
      ],
      correct: 2
    },
    {
      id: 17,
      question: "Which country is known as the Land of the Rising Sun?",
      options: ["China", "Japan", "South Korea", "Vietnam"],
      correct: 1
    },
    {
      id: 18,
      question: "What is the boiling point of water?",
      options: ["90°C", "100°C", "120°C", "150°C"],
      correct: 1
    },
    {
      id: 19,
      question: "Which element has the chemical symbol 'O'?",
      options: ["Oxygen", "Osmium", "Opal", "Oganesson"],
      correct: 0
    },
    {
      id: 20,
      question: "What is the national bird of India?",
      options: ["Sparrow", "Peacock", "Eagle", "Parrot"],
      correct: 1
    }
  ];

  // Shuffle and pick 5 random questions
  const shuffleQuestions = (questions: Question[]) => {
    return questions
      .sort(() => Math.random() - 0.5) // Shuffle
      .slice(0, 5); // Pick 5 questions
  };

  const [questions, setQuestions] = useState<Question[]>([]);
  const [correctQuestions, setCorrectQuestions] = useState<Question[]>([]);
  const [incorrectQuestions, setIncorrectQuestions] = useState<Question[]>([]);

  const router = useRouter();
  const params = useLocalSearchParams<{ user: string }>();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<Score>({ correct: 0, incorrect: 0 });

  // Shuffle questions on load
  useEffect(() => {
    setQuestions(shuffleQuestions(allQuestions));
  }, []);

  // Disable hardware back button during the quiz
  useEffect(() => {
    const backAction = () => true;
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  // Handle option selection
  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
  };

  const handleExit = () => {
    router.replace({
      pathname: "/"
    });
  };

  // Check the selected answer
  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    const isUserCorrect = selectedOption === questions[currentQuestion].correct;

    if (isUserCorrect) {
      setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
      setCorrectQuestions((prev) => [...prev, questions[currentQuestion]]);
    } else {
      setScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
      setIncorrectQuestions((prev) => [...prev, questions[currentQuestion]]);
    }
    setIsAnswered(true);
  };

  // Go to next question or show results
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Pass questions and scores to the result screen
      router.replace({
        pathname: "/result",
        params: {
          correct: score.correct.toString(),
          incorrect: score.incorrect.toString(),
          correctQuestions: JSON.stringify(correctQuestions),
          incorrectQuestions: JSON.stringify(incorrectQuestions)
        }
      });
    }
  };

  // Render options with conditional styling
  const renderOptions = () => {
    return questions[currentQuestion]?.options.map((option, index) => {
      let bgColor = "$gray6";
      let iconName: string | null = null;

      if (isAnswered) {
        if (index === questions[currentQuestion].correct) {
          bgColor = "$green6";
          iconName = "check-circle";
        } else if (
          index === selectedOption &&
          index !== questions[currentQuestion].correct
        ) {
          bgColor = "$red6";
          iconName = "close-circle";
        }
      } else if (selectedOption === index) {
        bgColor = "$blue6";
      }

      return (
        <Button
          key={index}
          onPress={() => !isAnswered && handleOptionSelect(index)}
          bg={bgColor}
          width="100%"
          justifyContent="flex-start"
          px="$4"
          mb="$2"
        >
          <XStack
            alignItems="center"
            space="$2"
          >
            <Text>{option}</Text>
            {iconName && (
              <MaterialCommunityIcons
                name={iconName}
                size={20}
                color="white"
              />
            )}
          </XStack>
        </Button>
      );
    });
  };

  return (
    <MyStack
      justifyContent="flex-start"
      p="$4"
    >
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: `${params.user}'s Quiz`
        }}
      />
      {currentQuestion < questions.length ? (
        <>
          <Card
            p="$4"
            mb="$3"
            shadow="$2"
            borderRadius="$4"
          >
            <H6>
              {`Question ${currentQuestion + 1}/${questions.length}: `}
              {questions[currentQuestion]?.question}
            </H6>
          </Card>

          <YStack
            space="$3"
            mt="$3"
          >
            {renderOptions()}
          </YStack>

          {isAnswered ? (
            <Button
              mt="$4"
              onPress={handleNext}
              bg="$blue10"
            >
              {currentQuestion < questions.length - 1 ? "Next" : "See Results"}
            </Button>
          ) : (
            <Button
              mt="$4"
              onPress={handleCheckAnswer}
              bg="$blue9"
              disabled={selectedOption === null}
            >
              Check your answer
            </Button>
          )}
          <Button
            mt="$5"
            onPress={handleExit}
            bg="$red10"
          >
            Exit Quiz
          </Button>
        </>
      ) : null}
    </MyStack>
  );
}
