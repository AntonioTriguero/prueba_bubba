import React, { useState, useEffect } from 'react';
import { View, FlatList, Button } from 'react-native';
import axios from 'axios';
import BookItem from '../components/BookItem';

interface Book {
  id: string;
  title: string;
  author: string;
  url: string;
}

const BookListScreen: React.FC<any> = ({ navigation }) => {
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = () => {
    fetch('http://192.168.0.13:3000/books')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setBooks(data);
      })
      .catch(error => {
        console.error('Hubo un problema con la petición Fetch:', error);
      });
  };
  

  useEffect(() => {
    fetchBooks();
  }, []);
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchBooks();
    });
  
    return unsubscribe;
  }, [navigation]);
  

  return (
    <View>
      <FlatList
        data={books}
        renderItem={({ item }) => (
          <BookItem
            book={item}
            onPress={() => navigation.navigate('BookDetails', { bookId: item.id })}
          />
        )}
        keyExtractor={item => item.id}
      />
      <Button title="Add Book" onPress={() =>   navigation.navigate('AddBook')} />
    </View>
  );
};

export default BookListScreen;
