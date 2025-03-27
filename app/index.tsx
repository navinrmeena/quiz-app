import "expo-router/entry";

import { Github, Linkedin, Twitter } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { H1, ListItem, Paragraph, Separator, YGroup, YStack } from "tamagui";

import { MySafeAreaView } from "../components/MySafeAreaView";
import { MyStack } from "../components/MyStack";
import SelectDemo from "../components/SelectDemo";

export default function HomeScreen() {
  return (
    <MySafeAreaView>
      <MyStack>
        <YStack
          maxWidth={600}
          space="$4"
        >
          <H1 textAlign="center">Welcome to Quiz Game</H1>
          <Paragraph textAlign="center">
            Don’t worry if you get it wrong. Even Google doesn’t have all the
            answers!
          </Paragraph>
        </YStack>
        <SelectDemo />
        <YStack space="$5">
          <YGroup
            bordered
            separator={<Separator />}
            theme="green"
          >
            <YGroup.Item>
              <Link
                asChild
                href="https://www.linkedin.com/in/navin-meena/"
              >
                <ListItem
                  hoverTheme
                  pressTheme
                  title="github link for This quiz-app"
                  icon={Github}
                />
              </Link>
            </YGroup.Item>
            <YGroup.Item>
              <Link
                asChild
                href="https://github.com/navinrmeena/quiz-app"
              >
                <ListItem
                  hoverTheme
                  pressTheme
                  title="github link for This quiz-app"
                  icon={Linkedin}
                />
              </Link>
            </YGroup.Item>
          </YGroup>
        </YStack>
      </MyStack>
    </MySafeAreaView>
  );
}
