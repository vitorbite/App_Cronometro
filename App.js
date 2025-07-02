import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      botao: 'Iniciar',
      numero: 0,
    };
    this.timer = null;

    this.vai = this.vai.bind(this);
    this.limpar = this.limpar.bind(this);
  }

  vai() {
    if (this.timer != null) {
      clearInterval(this.timer);
      this.setState({
        botao: 'Retomar',
      });
      this.timer = null;
    } else {
      this.timer = setInterval(() => {
        this.setState({
          numero: this.state.numero + 0.01,
          botao: 'Pausar',
        });
      }, 10);
    }
  }
  limpar() {
      clearInterval(this.timer);
      this.setState({
        botao: 'Iniciar',
        numero: 0,
      });
      this.timer = null;
  }
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./imgs/cronometro.png')} style={styles.timer} />
        <Text style={styles.timer}>{this.state.numero.toFixed(2)}</Text>

        <View style={styles.btnArea}>
          <TouchableOpacity style={styles.btn} onPress={this.vai}>
            <Text style={styles.btnTexto}>{this.state.botao}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={this.limpar}>
            <Text style={styles.btnTexto}>Limpar</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.Titulo} >Cronômetro</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00aeef',
  },
  timer: {
    marginTop: -230,
    color: '#404040',
    fontSize: 65,
    fontWeight: 'bold',
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 90,
    height: 40,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 40,
    margin: 17,
    borderRadius: 9,
    borderColor: '#222',
    borderWidth: 2,
  },
  btnTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aeef',
  },
  Titulo:{
    fontSize: 40,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    position: 'absolute',
    bottom: 120,
    color: '#fff',

  }
});
