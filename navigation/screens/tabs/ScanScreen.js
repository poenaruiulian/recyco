import { View, Text } from "react-native-ui-lib";
import { useState } from "react";
import { Camera, CameraType } from "expo-camera";
import { Button, TouchableOpacity, useWindowDimensions } from "react-native";
import { handleImageProcessing } from "../../../firebase/handleStorage";
import { Colors } from "../../../constants/theme";

const ScanScreen = ({ navigation }) => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const onPressScan = async () => {
    if (!isProcessing) {
      cameraRef.takePictureAsync().then((response) => {
        setIsProcessing(true);
        const URL = response.uri;
        handleImageProcessing({ uri: URL }).then((response) => {
          setIsProcessing(false);
          navigation.navigate("AfterScan", { response: response, uri: URL });
        });
      });
    }
  };

  return (
    <Camera
      style={{ flex: 1, justifyContent: "center", paddingBottom: 95 }}
      type={CameraType.back}
      ref={(ref) => setCameraRef(ref)}
    >
      {isProcessing && (
        <View
          abs
          flex
          backgroundColor={Colors.codGray}
          style={{
            opacity: 0.8,
          }}
          height={windowHeight}
          width={windowWidth}
          center
        >
          <Text dmSansBold white style={{ fontSize: 30 }}>
            Processing...
          </Text>
        </View>
      )}
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          padding: 10,
        }}
      >
        <TouchableOpacity
          onPress={onPressScan}
          style={{
            padding: 10,
            backgroundColor: Colors.white,
            height: 80,
            width: 80,
            borderRadius: 999,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              padding: 10,
              backgroundColor: Colors.white,
              height: 65,
              width: 65,
              borderRadius: 999,
              borderColor: Colors.codGray,
              borderWidth: 2,
            }}
          ></View>
        </TouchableOpacity>
      </View>
    </Camera>
  );
};
export default ScanScreen;
