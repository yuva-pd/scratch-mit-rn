import React, {useRef, useState} from 'react';
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const App = () => {
  const [selectedShape, setSelectedShape] = useState('box');
  const [promptVisible, setPromptVisible] = useState(false);

  const boxPan = useRef(new Animated.ValueXY()).current;
  const boxRotation = useRef(new Animated.Value(0)).current;
  const boxScale = useRef(new Animated.Value(1)).current;
  const circleScale = useRef(new Animated.Value(1)).current;

  const circlePan = useRef(new Animated.ValueXY()).current;
  const circleAnimation = useRef(new Animated.Value(0)).current;

  const panResponderBox = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: boxPan.x, dy: boxPan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        boxPan.extractOffset();
      },
    }),
  ).current;

  const panResponderCircle = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, {dx: circlePan.x, dy: circlePan.y}],
        {
          useNativeDriver: false,
        },
      ),
      onPanResponderRelease: () => {
        circlePan.extractOffset();
      },
    }),
  ).current;

  const animateXBy100 = () => {
    if (selectedShape === 'box') {
      Animated.timing(boxPan.x, {
        toValue: boxPan.x._value + 100,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(circlePan.x, {
        toValue: circlePan.x._value + 100,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  };

  const animateYBy100 = () => {
    if (selectedShape === 'box') {
      Animated.timing(boxPan.y, {
        toValue: boxPan.y._value + 100,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(circlePan.y, {
        toValue: circlePan.y._value + 100,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  };

  const rotateBox = degrees => {
    selectedShape == 'box'
      ? Animated.timing(boxRotation, {
          toValue: degrees,
          duration: 500,
          useNativeDriver: true,
        }).start()
      : null;
  };

  const rotateCircle = degrees => {
    Animated.timing(circleAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(circleAnimation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    });
  };

  const increaseSize = () => {
    if (selectedShape === 'box') {
      Animated.spring(boxScale, {
        toValue: boxScale._value + 0.1,
        friction: 2,
        tension: 80,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(circleScale, {
        toValue: circleScale._value + 0.1,
        friction: 2,
        tension: 80,
        useNativeDriver: true,
      }).start();
    }
  };

  const decreaseSize = () => {
    if (selectedShape === 'box') {
      Animated.spring(boxScale, {
        toValue: boxScale._value - 0.1,
        friction: 2,
        tension: 80,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(circleScale, {
        toValue: circleScale._value - 0.1,
        friction: 2,
        tension: 80,
        useNativeDriver: true,
      }).start();
    }
  };

  const moveToRandomPosition = () => {
    if (selectedShape === 'box') {
      const randomX = Math.random() * (SCREEN_WIDTH - 150);
      const randomY = Math.random() * (SCREEN_HEIGHT - 150);

      Animated.timing(boxPan, {
        toValue: {x: randomX, y: randomY},
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      const randomX = Math.random() * (SCREEN_WIDTH - 150);
      const randomY = Math.random() * (SCREEN_HEIGHT - 150);

      Animated.timing(circlePan, {
        toValue: {x: randomX, y: randomY},
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  };

  const showPrompt = () => {
    setPromptVisible(true);
    setTimeout(() => {
      setPromptVisible(false);
    }, 3000);
  };

  const moveToOrigin = () => {
    selectedShape == 'box'
      ? Animated.timing(boxPan, {
          toValue: {x: 0, y: 0},
          duration: 500,
          useNativeDriver: true,
        }).start()
      : Animated.timing(circlePan, {
          toValue: {x: 0, y: 0},
          duration: 500,
          useNativeDriver: true,
        }).start();
  };
const [circle,setCircle]=useState(false)
  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedShape === 'box' && styles.activeButton,
          ]}
          onPress={() => setSelectedShape('box')}>
          <Text style={styles.buttonText}>Action to Box</Text>
        </TouchableOpacity>

        {circle ? (
          <TouchableOpacity
            style={[
              styles.button,
              selectedShape === 'circle' && styles.activeButton,
            ]}
            onPress={() => setSelectedShape('circle')}>
            <Text style={styles.buttonText}>Select Circle</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => setCircle(true)}>
            <Text style={styles.buttonText}>Add Circle</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.buttonsContainer}>
        <ScrollView horizontal contentContainerStyle={styles.buttonScrollView}>
          {/* Add other buttons as needed */}

          <TouchableOpacity style={styles.button} onPress={animateXBy100}>
            <Text style={styles.buttonText}>Animate X by 100</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={animateYBy100}>
            <Text style={styles.buttonText}>Animate Y by 100</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => rotateBox(45)}>
            <Text style={styles.buttonText}>Rotate by 45°</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => rotateBox(90)}>
            <Text style={styles.buttonText}>Rotate by 90°</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={increaseSize}>
            <Text style={styles.buttonText}>Increase Size</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={decreaseSize}>
            <Text style={styles.buttonText}>Decrease Size</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={moveToRandomPosition}>
            <Text style={styles.buttonText}>Move to Random Position</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={showPrompt}>
            <Text style={styles.buttonText}>Show Prompt</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={moveToOrigin}>
            <Text style={styles.buttonText}>Move to Origin</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.animationContainer}>
        <Text style={styles.titleText}>Drag this shape!</Text>
        <>
          <Animated.View
            style={[
              styles.box,
              {
                transform: [
                  {translateX: boxPan.x},
                  {translateY: boxPan.y},
                  {
                    rotate: boxRotation.interpolate({
                      inputRange: [0, 360],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                  {scale: boxScale},
                ],
              },
            ]}
            {...panResponderBox.panHandlers}
          />
        </>
        <>
          <Animated.View
            style={[
              styles.circle,
              {
                transform: [
                  {
                    scale: circleScale,
                  },
                  {translateX: circlePan.x},
                  {translateY: circlePan.y},
                ],
              },
            ]}
            {...panResponderCircle.panHandlers}
          />
        </>

        {promptVisible && <Text style={styles.promptText}>Ok Google</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsContainer: {
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
  },
  buttonScrollView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'red',
  },
  promptText: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 5,
  },
  button: {
    marginTop: 10,
    marginRight: 10,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: 'green',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;
