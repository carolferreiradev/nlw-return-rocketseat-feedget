import React, { useRef, useState } from "react";
import { TouchableOpacity } from "react-native";

import { ChatTeardropDots } from "phosphor-react-native";

import BottomSheet from "@gorhom/bottom-sheet";

import { gestureHandlerRootHOC } from "react-native-gesture-handler";

import { Options } from "../Options";
import { Form } from "../Form";
import { Success } from "../Success";

import { feedbackTypes } from "../../utils/feedbackTypes";

import { theme } from "../../theme";
import { styles } from "./styles";

export type FeedbackType = keyof typeof feedbackTypes;

function Widget() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleOpen() {
    bottomSheetRef.current?.expand();
  }
  function handleRestartFeedback() {
    setFeedbackSent(false);
    setFeedbackType(null);
  }
  function handleFeedbackSend() {
    setFeedbackSent(true);
  }
  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpen}>
        <ChatTeardropDots
          size={24}
          weight="bold"
          color={theme.colors.text_on_brand_color}
        />
      </TouchableOpacity>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {feedbackSent ? (
          <Success onSendAnotherFeedback={handleRestartFeedback} />
        ) : (
          <>
            {feedbackType ? (
              <Form
                feedbackType={feedbackType}
                onFeedbackSend={handleFeedbackSend}
                onFeedbackCanceled={handleRestartFeedback}
              />
            ) : (
              <Options onFeedbackTypeChanged={setFeedbackType} />
            )}
          </>
        )}
      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);
