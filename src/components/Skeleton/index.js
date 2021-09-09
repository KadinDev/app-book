import React from 'react';
import {
    View,
    
} from 'react-native';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export function Skeleton(){
    return (
        
        <SkeletonPlaceholder>
            <View style={{width: '80%', height: 20, marginLeft: 10}} />

        </SkeletonPlaceholder>
    )
}

