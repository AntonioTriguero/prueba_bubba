import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const AddBookScreen: React.FC<any> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');



  const handleAddBook = () => {
    const bookData = {
      title,
      author,
      genre,
      year: parseInt(year, 10),
      description,
      url,
      fav: false, // Asumiendo que los libros nuevos no son favoritos por defecto
    };

    fetch('http://192.168.0.13:3000/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      })
      .then(() => {
        Alert.alert("Libro añadido", "El libro se ha añadido correctamente");
        navigation.goBack();
      })
      .catch(error => {
        console.error(error);
        Alert.alert("Error", "Hubo un problema al añadir el libro");
      });
      

    
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Autor"
        value={author}
        onChangeText={setAuthor}
        style={styles.input}
      />
      <TextInput
        placeholder="Género"
        value={genre}
        onChangeText={setGenre}
        style={styles.input}
      />
      <TextInput
        placeholder="Año"
        value={year}
        onChangeText={setYear}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="URL de la imagen"
        value={url}
        onChangeText={setUrl}
        style={styles.input}
      />
      <Button title="Añadir Libro" onPress={handleAddBook} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
});

export default AddBookScreen;
