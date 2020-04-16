import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import shorthash from 'shorthash';
import * as FileSystem from 'expo-file-system';

const CacheImage = ({uri, style}) => {

    const [source, setSource] = useState(null)

    useEffect(() => {
        const name = shorthash.unique(uri);
        const path = `${FileSystem.cacheDirectory}${name}`;

        FileSystem.getInfoAsync(path).then((image) => {
            if (image.exists) {

                const localSource = {
                    uri: image.uri
                }

                setSource(localSource);
                return
            }

            FileSystem.downloadAsync(uri, path).then((image) => {
    
                const localSource = {
                    uri: image.uri
                }
    
                setSource(localSource);
            }).catch((error) => {
            })

        }).catch((error) => {
        });
    }, [])

    return (
        <Image source={source} style={style}></Image>
    )
}

export default CacheImage