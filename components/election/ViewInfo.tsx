import { StyleSheet, ScrollView, Dimensions} from 'react-native'
import { Text,View } from '../Themed'
import * as React from 'react';
import { Box,Pressable } from 'native-base';

// carousel list.. on click display scrollable modal conataining info and actions eg. share as post in present communities
export default function ViewInfo() {
    let intervalId: string | number | NodeJS.Timeout | null | undefined = null;
    const carouselInfo = []
    const [dimension, setDimension] = React.useState(Dimensions.get('window'));
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const scrollRef = React.useRef();
    const onChange = () => {
        setDimension(Dimensions.get('window'));
    };

    React.useEffect(() => {
        Dimensions.addEventListener('change', onChange);
        return () => {
          Dimensions.removeEventListener('change', onChange);
        };
    });
    const onSlideChange = React.useCallback(() => {
        // Calculate newIndex here and use it to update your state and to scroll to the new slide
        const newIndex = selectedIndex === carouselInfo.length - 1 ? 0 : selectedIndex + 1;
        setSelectedIndex(newIndex);
    
        scrollRef?.current?.scrollTo({
          animated: true,
          y: 0,
          x: dimension.width * newIndex,
        });
    }, [selectedIndex]);

    const startInterval = React.useCallback(() => {
        intervalId = setInterval(onSlideChange, 3000);
    }, [onSlideChange]);

    React.useEffect(() => {
        startInterval();
    
        return () => {
          // Clear the interval when component unmounts, otherwise you could have memory leaks
          clearInterval(intervalId);
        };
    }, [onSlideChange]);

    const onTouchStart = () => {
        // As soon as the user touches the slide, stop the automatic sliding
        clearInterval(intervalId);
    };
    const onTouchEnd = () => {
        // As soon as the user stops touching the slide, releases it, start the automatic sliding again
        startInterval();
    };
    const setIndex = (event: { nativeEvent: { layoutMeasurement: { width: any; }; contentOffset: { x: any; }; }; }) => {
      let viewSize = event.nativeEvent.layoutMeasurement.width;
      let contentOffset = event.nativeEvent.contentOffset.x;
      let carouselIndex = Math.floor(contentOffset / viewSize);
      setSelectedIndex(carouselIndex);
    };

  return (
    <View>
       <ScrollView
          horizontal
          ref={scrollRef}
          onMomentumScrollEnd={setIndex}
          showsHorizontalScrollIndicator={false}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          pagingEnabled
        >

        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({})