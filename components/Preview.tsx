/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Modal,
  View,
  Text,
  // Image,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
const Preview = ({
  setPreviewImage,
  fileObj,
  scanDocument,
  setImageList,
  imageList,
  visible,
  setDocList,
  docList,
  isImagePreview,
  setIsImagePreview,
}: {
  setPreviewImage: any;
  fileObj: {id: string; uri: string};
  scanDocument: any;
  setImageList: any;
  imageList: any;
  visible: boolean;
  setDocList: any;
  docList: any;
  isImagePreview: boolean;
  setIsImagePreview: any;
}) => {
  const onClose = () => {
    setPreviewImage(null);
    setIsImagePreview(false);
    setImageList([]);
    // setShowAddMore(false);
  };

  const onAccept = () => closePreview();

  function closePreview() {
    setPreviewImage(null);
  }

  const onDelete = (id: any) => {
    setDocList((current: any) => current.filter((item: any) => item.id !== id));
    closePreview();
  };
  const onRetake = (id: any) => {
    // deleteImage(previewImage?.id);
    closePreview();
    scanDocument(id);
  };

  const onAdd = () => {
    closePreview();
    scanDocument();
  };

  const onDone = () => {
    closePreview();
    setDocList([...docList, ...imageList]);
    setImageList([]);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onAccept}>
      <View>
        <View style={styles.modalView}>
          <ImageView
            // images={imageList}
            images={[{uri: imageList[imageList.length - 1]?.uri}]}
            imageIndex={0}
            visible={visible}
            onRequestClose={onClose}
          />
          <View style={styles.buttonGroup}>
            {isImagePreview && (
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => onDelete(fileObj.id)}>
                <Text style={styles.textStyle}>Delete</Text>
              </TouchableOpacity>
            )}
            {!isImagePreview && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => onRetake(fileObj.id)}>
                <Text style={styles.textStyle}>Retake</Text>
              </TouchableOpacity>
            )}
            {!isImagePreview && (
              <TouchableOpacity style={styles.button} onPress={onAdd}>
                <Text style={styles.textStyle}>Add More</Text>
              </TouchableOpacity>
            )}
            {!isImagePreview && (
              <TouchableOpacity style={styles.doneButton} onPress={onDone}>
                <Text style={styles.textStyle}>Done</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
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
    zIndex: 100,
    height: '95%',
    margin: 20,
    borderRadius: 20,
    padding: 35,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    zIndex: 10000,
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
  deleteButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#FF0000',
  },
  doneButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#00ff00',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Preview;
