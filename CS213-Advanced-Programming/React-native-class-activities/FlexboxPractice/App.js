/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 3, margin: 15, backgroundColor: 'silver'}}>
          <View style={{flex: 4, backgroundColor: 'orange', margin: 5}}>
          <Text style={styles.bigSectionTitle}>Orange</Text>
          </View>
          <View style={{flex: 2, backgroundColor: 'pink', margin: 5}}>
          <Text style={styles.bigSectionTitle}>Pink</Text>
          </View>
          <View style={{flex: 1, backgroundColor: 'purple', margin: 5}}>
          <Text style={styles.bigSectionTitle}>Purple</Text>
          </View>
        </View>
        <View style={{flex: 1, margin: 15, backgroundColor: 'silver'}}>
          <View style={{flex: 1, backgroundColor: 'red', margin: 10}}>
          <Text style={styles.sectionTitle}>Red</Text>
          </View>
          <View style={{flex: 1, backgroundColor: 'green', margin: 10}}>
          <Text style={styles.sectionTitle}>Green</Text>
          </View>
          <View style={{flex: 1, backgroundColor: 'blue', margin: 10}}>
          <Text style={styles.sectionTitle}>Blue</Text>
          </View>
          <View style={{flex: 1, backgroundColor: 'black', margin: 10}}>
          <Text style={styles.sectionTitle}>Black</Text>
          </View> 
          <View style={{flex: 1, backgroundColor: 'cyan', margin: 10}}>
          <Text style={styles.sectionTitle}>Cyan</Text>
          </View>
          <View style={{flex: 1, backgroundColor: 'yellow', margin: 10}}>
          <Text style={styles.sectionTitle}>Yellow</Text>
          </View>
        </View>
    </View>  
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.white,
    textAlign: 'center',
    fontWeight: '700',
  },
  bigSectionTitle: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    fontWeight: '700',

  },
});

export default App;
