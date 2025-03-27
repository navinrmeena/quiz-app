import { useState } from "react";
import { Check, ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { Adapt, Button, Fieldset, Label, Select, Sheet, YStack } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";

export default function SelectDemo() {
  const [val, setVal] = useState("QUIZ 1");
  const router = useRouter();

  // List of quiz items with corresponding URLs
  const items = [
    { name: "QUIZ 1", url: "/users/testuser" },
    { name: "QUIZ 2", url: "/users/testuser" }
  ];

  // Find the URL of the selected quiz
  const getSelectedQuizUrl = () => {
    const selectedQuiz = items.find((item) => item.name === val);
    return selectedQuiz ? selectedQuiz.url : "/";
  };

  return (
    <Fieldset>
      <Label htmlFor="quiz">Select quiz</Label>
      <Select
        id="quiz"
        value={val}
        onValueChange={(newVal) => {
          console.log("Selected quiz:", newVal);
          setVal(newVal);
        }}
      >
        <Select.Trigger
          id="quiz"
          iconAfter={ChevronDown}
        >
          <Select.Value placeholder="Choose a quiz" />
        </Select.Trigger>

        {/* Handle selection for mobile */}
        <Adapt
          when="sm"
          platform="touch"
        >
          <Sheet
            modal
            dismissOnSnapToBottom
            snapPoints={[50, 100]}
          >
            <Sheet.Frame>
              <Sheet.ScrollView>
                <Adapt.Contents />
              </Sheet.ScrollView>
            </Sheet.Frame>
            <Sheet.Overlay />
          </Sheet>
        </Adapt>

        <Select.Content zIndex={200000}>
          <Select.ScrollUpButton
            ai="center"
            jc="center"
            pos="relative"
            w="100%"
            h="$3"
          >
            <YStack zi={10}>
              <ChevronUp size={20} />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={["$background", "$backgroundTransparent"]}
              br="$4"
            />
          </Select.ScrollUpButton>

          <Select.Viewport minWidth={200}>
            <Select.Group>
              <Select.Label>Select quiz you want to play</Select.Label>
              {items.map((item, i) => (
                <Select.Item
                  index={i}
                  key={item.name}
                  value={item.name}
                >
                  <Select.ItemText color="$color">{item.name}</Select.ItemText>
                  <Select.ItemIndicator ml="auto">
                    <Check size={16} />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>

          <Select.ScrollDownButton
            ai="center"
            jc="center"
            pos="relative"
            w="100%"
            h="$3"
          >
            <YStack zi={10}>
              <ChevronDown size={20} />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={["$backgroundTransparent", "$background"]}
              br="$4"
            />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select>

      {/* Button to dynamically navigate to the selected quiz */}
      <YStack
        space="$5"
        py="$5"
      >
        <Button onPress={() => router.push(getSelectedQuizUrl())}>
          Play {val}
        </Button>
      </YStack>
    </Fieldset>
  );
}
