import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  loginContainer: {
    padding: 30,
    justifyContent: 'center',
  },
  loginImg: {
    alignSelf: 'center',
    marginVertical: 10,
    width: 150,
    height: 150,
    resizeMode: 'contain'
  },
  loginBtns: {
    elevation: 5,
    padding: 10,
    marginBottom: 15,
  },
  loginBtnContent: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#ffffff',
    fontWeight: '600',
  },
  createPost: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center'
  },
  input: {
    height: 40,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderColor: '#000000',
    borderWidth: 1
  },
  textAreaContainer: {
    marginBottom: 20,
  },
  textArea: {
    padding: 15,
    height: 150,
    justifyContent: "flex-start",
    textAlignVertical: "top",
    borderColor: '#000000',
    borderWidth: 1,
  }
});