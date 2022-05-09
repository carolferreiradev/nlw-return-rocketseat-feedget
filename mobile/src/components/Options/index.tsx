import React from "react";
import { Text, View } from "react-native";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { Copyright } from "../Copyright";
import { Option } from "../Option";
import { FeedbackType } from "../Widget";

import { styles } from "./styles";

interface Props {
  onFeedbackTypeChanged: (feedbackType: FeedbackType) => void;
}

export function Options({ onFeedbackTypeChanged }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deixe seu feedback</Text>
      <View style={styles.options}>
        {Object.entries(feedbackTypes).map(([key, value]) => (
          <Option
            key={key}
            image={value.image}
            title={value.title}
            onPress={() => onFeedbackTypeChanged(key as FeedbackType)}
          />
        ))}
      </View>
      <Copyright />
    </View>
  );
}
