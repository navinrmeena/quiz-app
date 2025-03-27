// @ts-nocheck
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Button, Card, H6, Text, YStack } from "tamagui";

type Question = {
  id: number;
  question: string;
  options: string[];
  correct: number;
};

type ResultParams = {
  correct: string;
  incorrect: string;
  correctQuestions: string;
  incorrectQuestions: string;
};

export default function ResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<ResultParams>();

  // Convert params to numbers
  const correct = parseInt(params.correct) || 0;
  const incorrect = parseInt(params.incorrect) || 0;
  const correctQuestions: Question[] = JSON.parse(
    params.correctQuestions || "[]"
  );
  const incorrectQuestions: Question[] = JSON.parse(
    params.incorrectQuestions || "[]"
  );

  return (
    <YStack
      justifyContent="center"
      alignItems="center"
      p="$5"
      space="$4"
    >
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Quiz Results"
        }}
      />
      <H6>🎉 Quiz Completed!</H6>
      <Card
        p="$4"
        shadow="$2"
        borderRadius="$4"
        w="90%"
        alignItems="center"
      >
        <Text>✅ Correct Answers: {correct}</Text>
        <Text>❌ Incorrect Answers: {incorrect}</Text>
      </Card>

      {/* Correct Questions Summary */}
      <YStack
        w="90%"
        mt="$4"
        space="$3"
      >
        <H6>✅ Correct Questions</H6>
        {correctQuestions.map((q, index) => (
          <Card
            key={index}
            p="$3"
            shadow="$2"
            bg="$green6"
            borderRadius="$4"
          >
            <Text>{`${index + 1}. ${q.question}`}</Text>
            <Text>Correct Answer: {q.options[q.correct]}</Text>
          </Card>
        ))}
      </YStack>

      {/* Incorrect Questions Summary */}
      <YStack
        w="90%"
        mt="$4"
        space="$3"
      >
        <H6>❌ Incorrect Questions</H6>
        {incorrectQuestions.map((q, index) => (
          <Card
            key={index}
            p="$3"
            shadow="$2"
            bg="$red6"
            borderRadius="$4"
          >
            <Text>{`${index + 1}. ${q.question}`}</Text>
            <Text>Correct Answer: {q.options[q.correct]}</Text>
          </Card>
        ))}
      </YStack>

      <Button
        mt="$4"
        onPress={() => router.replace("/")}
        bg="$blue10"
        px="$4"
      >
        Go to Home
      </Button>
    </YStack>
  );
}
