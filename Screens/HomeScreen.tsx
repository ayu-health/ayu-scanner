import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  // Alert,
  Modal,
  Button,
} from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';

import {FlatGrid} from 'react-native-super-grid';

const HomeScreen = () => {
  const [scannedImage, setScannedImage] = useState<string[]>([
    'file:///storage/emulated/0/Android/data/com.awesometsproject/files/Pictures/DOCUMENT_SCAN_1_20221209_192717153649898559833900.jpg',
  ]);
  const [showImage, setShowImage] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');

  const scanDocument = async () => {
    const {scannedImages}: any = await DocumentScanner.scanDocument();
    if (scannedImages.length > 0) {
      setScannedImage([...scannedImage, ...scannedImages]);
    }
  };

  const ImagePreview = (src: string) => {
    setShowImage(true);
    setPreviewImage(src);
    console.log(src, showImage);
  };

  return (
    <>
      <View style={styles.container}>
        <Button title="Scan Image" onPress={scanDocument} />
      </View>
      <Modal animationType="slide" transparent={true} visible={showImage}>
        <View>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Image
              resizeMode="contain"
              style={styles.previewImageStyle}
              source={{uri: previewImage}}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowImage(!showImage)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text>Scanned Images</Text>
      <FlatGrid
        itemDimension={100}
        data={scannedImage}
        style={styles.gridView}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              // Alert.alert(item);
              ImagePreview(item);
            }}>
            <Image
              resizeMode="contain"
              style={styles.itemContainer}
              source={{uri: item}}
            />
          </TouchableOpacity>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  previewImageStyle: {
    height: 100,
    width: 100,
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-start',
    borderRadius: 5,
    height: 150,
    // width: 100,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    width: '100%',
  },
  images: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '10px',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'blue',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
