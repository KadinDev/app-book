import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar } from 'react-native';

import { Home } from './src/components/Home';
import { Skeleton } from './src/components/Skeleton';

export default function App(){
  
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    setTimeout(() => {
      setLoading(false);
    }, 3000 );
  },[] );

  return (
    <View style={{flex: 1, backgroundColor: '#111'}}>
      <StatusBar barStyle='light-content' backgroundColor='#111' />

      { loading ? <Skeleton /> : <Home/> }

    </View>
  );
};
