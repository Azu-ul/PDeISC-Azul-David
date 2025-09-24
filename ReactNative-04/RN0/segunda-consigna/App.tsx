import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, Image, TextInput, ScrollView, Pressable, Button, SafeAreaView, FlatList, Modal, TouchableOpacity 
} from 'react-native';

export default function App() {
  const [input, setInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const flatListData = [
    { id: '1', title: 'Item 1' },
    { id: '2', title: 'Item 2' },
    { id: '3', title: 'Item 3' },
    { id: '4', title: 'Item 4' },
    { id: '5', title: 'Item 5' },
  ];

  const showModal = (message: string) => {
    setModalMessage(message);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>

          {/* Componente Text */}
          <View style={styles.card}>
            <Text style={styles.title}>Text</Text>
            <Text style={styles.text}>
              Componente Text: se usa para mostrar texto en pantalla.
            </Text>
          </View>

          {/* Componente Image */}
          <View style={styles.card}>
            <Text style={styles.title}>Image</Text>
            <Image 
              source={require('./assets/example.jpg')}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.text}>
              Componente Image: se usa para mostrar imágenes locales o desde URL.
            </Text>
          </View>

          {/* Componente TextInput */}
          <View style={styles.card}>
            <Text style={styles.title}>TextInput</Text>
            <TextInput 
              placeholder="Escribí algo..."
              value={input}
              onChangeText={setInput}
              style={styles.input}
            />
            <Text style={styles.text}>Texto ingresado: {input}</Text>
          </View>

          {/* Componente Button */}
          <View style={styles.card}>
            <Text style={styles.title}>Button</Text>
            <Button 
              title="Click Me" 
              color="#8ACE00" 
              onPress={() => showModal("Botón presionado!")} 
            />
            <Text style={styles.text}>
              Componente Button: botón básico con interacción.
            </Text>
          </View>

          {/* Componente Pressable */}
          <View style={styles.card}>
            <Text style={styles.title}>Pressable</Text>
            <Pressable 
              style={styles.pressable} 
              onPress={() => showModal("Pressable presionado!")}
            >
              <Text style={styles.pressableText}>Soy un Pressable</Text>
            </Pressable>
            <Text style={styles.text}>
              Componente Pressable: botón totalmente personalizable.
            </Text>
          </View>

          {/* Componente ScrollView horizontal */}
          <View style={styles.card}>
            <Text style={styles.title}>ScrollView Horizontal</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
              <View style={styles.scrollBox}><Text>Box 1</Text></View>
              <View style={styles.scrollBox}><Text>Box 2</Text></View>
              <View style={styles.scrollBox}><Text>Box 3</Text></View>
              <View style={styles.scrollBox}><Text>Box 4</Text></View>
              <View style={styles.scrollBox}><Text>Box 5</Text></View>
              <View style={styles.scrollBox}><Text>Box 6</Text></View>
              <View style={styles.scrollBox}><Text>Box 7</Text></View>
              <View style={styles.scrollBox}><Text>Box 8</Text></View>
              <View style={styles.scrollBox}><Text>Box 9</Text></View>
              <View style={styles.scrollBox}><Text>Box 10</Text></View>
              <View style={styles.scrollBox}><Text>Box 11</Text></View>
              <View style={styles.scrollBox}><Text>Box 12</Text></View>
              <View style={styles.scrollBox}><Text>Box 13</Text></View>
              <View style={styles.scrollBox}><Text>Box 14</Text></View>
              <View style={styles.scrollBox}><Text>Box 15</Text></View>
              <View style={styles.scrollBox}><Text>Box 16</Text></View>
              <View style={styles.scrollBox}><Text>Box 17</Text></View>
              <View style={styles.scrollBox}><Text>Box 18</Text></View>
              <View style={styles.scrollBox}><Text>Box 19</Text></View>
              <View style={styles.scrollBox}><Text>Box 20</Text></View>
              <View style={styles.scrollBox}><Text>Box 21</Text></View>
            </ScrollView>
            <Text style={styles.text}>
              Componente ScrollView horizontal: contenedor que permite scrollear contenido lateral.
            </Text>
          </View>

          {/* Componente FlatList */}
          <View style={styles.card}>
            <Text style={styles.title}>FlatList</Text>
            <FlatList 
              data={flatListData}
              renderItem={({ item }) => (
                <View style={styles.flatItem}>
                  <Text>{item.title}</Text>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
            <Text style={styles.text}>
              Componente FlatList: lista eficiente para muchos elementos.
            </Text>
          </View>

          {/* Modal */}
          <Modal
            transparent={true}
            animationType="fade"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalText}>{modalMessage}</Text>
                <TouchableOpacity 
                  style={styles.modalButton} 
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
  container: {
    width: "90%",
    maxWidth: 600,
    padding: 15,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  text: {
    fontSize: 14,
    color: "#555",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  pressable: {
    backgroundColor: "#8ACE00",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  pressableText: {
    color: "#ffffffff",
    fontWeight: "bold",
    fontSize: 16, 
  },
  horizontalScroll: {
    marginVertical: 10,
  },
  scrollBox: {
    width: 100,
    height: 100,
    backgroundColor: "#8ACE00",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  flatItem: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    marginBottom: 5,
    borderRadius: 8,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#8ACE00",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    fontWeight: "bold",
    color: "#000",
  },
});
