import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      botao: 'Iniciar',
      numero: 0,
      ultimo: '',
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
    this.inicio = Date.now() - this.state.numero * 1000; // <-- Corrige o ponto de retomada
    this.timer = setInterval(() => {
      let agora = Date.now();
      let tempo = (agora - this.inicio) / 1000;
      if (tempo >= 60) {
        clearInterval(this.timer);
        this.timer = null;
        tempo = 60;
      }
      this.setState({
        numero: tempo,
        botao: 'Pausar',
      });
    }, 10);
  }
}

limpar() {
  clearInterval(this.timer);
  this.setState({
    ultimo: this.state.numero.toFixed(2),
    botao: 'Iniciar',
    numero: 0,
  });
  this.timer = null;
  this.inicio = null;
}
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./imgs/cronometro.png')} style={styles.timer} />
        <Text style={styles.timer}>{this.state.numero.toFixed(2)}</Text>

        <Text style={styles.Titulo} >Cronômetro</Text>
        <View style={styles.btnArea}>
          <TouchableOpacity style={styles.btn} onPress={this.vai}>
            <Text style={styles.btnTexto}>{this.state.botao}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={this.limpar}>
            <Text style={styles.btnTexto}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.areaUltimo}>
            <Text style={styles.Corrida} >Ultimo tempo: {this.state.ultimo}</Text>
        </View>
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
    fontSize: 45,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    position: 'absolute',
    bottom: 150,
    color: '#fff',
  },
  areaUltimo:{
    position: 'absolute',
    bottom: 90,
  },
  Corrida:{
    fontSize: 25,
    fontStyle: 'italic',
    color: '#FFF'
  }
});
