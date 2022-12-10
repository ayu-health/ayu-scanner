import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
} from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';

import {FlatGrid} from 'react-native-super-grid';
import uuid from 'react-native-uuid';
import Preview from '../components/Preview';

const HomeScreen = () => {
  const [imageList, setImageList] = useState<{id: string; uri: string}[]>([]);

  const [docList, setDocList] = useState<{id: string; uri: string}[]>([
    {
      id: '1',
      uri: 'file:///storage/emulated/0/Android/data/com.awesometsproject/files/Pictures/DOCUMENT_SCAN_0_20221210_1617292180228446879750690.jpg',
    },
    {
      id: '2',
      uri: 'file:///storage/emulated/0/Android/data/com.awesometsproject/files/Pictures/DOCUMENT_SCAN_0_20221210_1821145742263819844636528.jpg',
    },
  ]);

  const [previewImage, setPreviewImage] = useState<{
    id: string;
    uri: string;
  } | null>(null);

  const [isImagePreview, setIsImagePreview] = useState(false);

  const scanDocument = async (id?: any) => {
    const {scannedImages}: any = await DocumentScanner.scanDocument({
      letUserAdjustCrop: true,
      maxNumDocuments: 1,
    });

    if (scannedImages.length > 0) {
      const newId: any = uuid.v4();
      const newImage: {id: string; uri: string} = {
        id: id ? id : newId,
        uri: scannedImages[0],
      };

      setPreviewImage(newImage);
      if (id) {
        setImageList(
          imageList.map(item => {
            if (item.id === id) {
              return {...item, uri: scannedImages[0]};
            } else {
              return item;
            }
          }),
        );
      } else {
        setImageList([...imageList, newImage]);
      }
    }
  };

  const ImagePreview = (image: any) => {
    setPreviewImage(image);
  };

  return (
    <>
      <View style={styles.container}>
        <Button
          title="Scan Image"
          onPress={() => {
            setIsImagePreview(false);
            scanDocument();
          }}
        />
      </View>

      {previewImage != null && (
        <Preview
          setPreviewImage={setPreviewImage}
          scanDocument={scanDocument}
          setImageList={setImageList}
          visible={previewImage != null}
          setDocList={setDocList}
          docList={docList}
          imageList={imageList}
          fileObj={previewImage}
          isImagePreview={isImagePreview}
          setIsImagePreview={setIsImagePreview}
        />
      )}

      <Text>Scanned Images</Text>
      <FlatGrid
        itemDimension={100}
        data={docList}
        style={styles.gridView}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              setIsImagePreview(true);
              ImagePreview(item);
              setImageList([item]);
            }}>
            <Image
              resizeMode="contain"
              style={styles.itemContainer}
              source={{uri: item.uri}}
            />
          </TouchableOpacity>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  previewImageStyle: {
    height: '90%',
    width: '100%',
    marginBottom: 10,
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-start',
    borderRadius: 5,
    height: 150,
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
    height: '95%',
    margin: 20,
    borderRadius: 20,
    padding: 35,
    justifyContent: 'flex-end',
    alignItems: 'center',
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
