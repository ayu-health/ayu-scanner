import { StyleSheet, TouchableOpacity, Modal, View, Text, Image } from "react-native";
import ImageView from 'react-native-image-viewing';
export default function Preview({filePath, onAccept, onRetake, onClose, onDelete,onAdd, visible})
{

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
        buttonGroup:{
            flexDirection: "row",
            justifyContent: "space-around",
            
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
      

    return (

        <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onAccept}>
        <View>
          <View style={styles.modalView}>
            {/* <Text style={styles.modalText}>Document Preview</Text> */}
            <ImageView
              images={[{uri: filePath}]}
              imageIndex={0}
              visible={visible}
              onRequestClose={onClose}
            />
    <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.button}
              onPress={onDelete}>
              <Text style={styles.textStyle}>Delete</Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={styles.button}
              onPress={onRetake}>
              <Text style={styles.textStyle}>Retake</Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={styles.button}
              onPress={onAdd}>
              <Text style={styles.textStyle}>Add More</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>



    )

}