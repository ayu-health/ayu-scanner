import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Modal,
  Button,
} from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';

import {FlatGrid} from 'react-native-super-grid';
import uuid from 'react-native-uuid';
import Preview from '../components/Preview';


const HomeScreen = () => {
  const [imageList, setImageList] = useState<{id: string; uri: string}[]>(
    [
    ],
  );

  function deleteImage(id)
  {
    setImageList(imageList.filter(item => item.id != id))
  }

  const [showImage, setShowImage] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<{id: string; uri: string}>(null);

  const [onAccept, setOnAccept] = useState<Function>(()=>{});
  const [onDelete, setOnDelete] = useState<Function>(()=>{});
  const [onAdd, setOnAdd] = useState<Function>(()=>{});
  const [onRetake, setOnRetake] = useState<Function>(()=>{});

  const onClose = () => setPreviewImage(null)

  function  closePreview () {setPreviewImage(null)}


  const scanDocument = async () => {
    const {scannedImages}: any = await DocumentScanner.scanDocument({
      letUserAdjustCrop: true,
      maxNumDocuments: 1,
    });

const newId:string = uuid.v4();

if(scannedImages.length>0)
{
  const newImage:{id: string; uri: string} = {id: newId, uri: scannedImages[0]}

    setPreviewImage(newImage)
    setImageList([...imageList, newImage])
    setOnAccept(()=>()=>{closePreview()})
    setOnAdd(()=>()=>{closePreview();scanDocument()})
    setOnRetake(()=>()=>{deleteImage(newId);closePreview();scanDocument()})
    setOnDelete(()=>()=>{deleteImage(newId);closePreview()})
}
  };

  const ImagePreview = (image: string) => {
    
    setPreviewImage(image);
    setOnAccept(()=>()=>{closePreview()})
    setOnAdd(()=>()=>{closePreview();scanDocument()})
    setOnRetake(()=>()=>{deleteImage(image.id);closePreview();scanDocument()})
    setOnDelete(()=>()=>{deleteImage(image.id);closePreview()})
  };

  return (
    <>
      <View style={styles.container}>
        <Button title="Scan Image" onPress={scanDocument} />
      </View>


{previewImage!= null && <Preview onAccept={onAccept} onRetake={onRetake} onDelete={onDelete} onAdd={onAdd} visible={previewImage!= null} onClose={onClose} filePath={previewImage && previewImage.uri} ></Preview>}
                

      <Text>Scanned Images</Text>
      <FlatGrid
        itemDimension={100}
        data={imageList}
        style={styles.gridView}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => ImagePreview(item)}>
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
