'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  ListView,
} from 'react-native';

import {
  RTCPeerConnection,
  RTCMediaStream,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStreamTrack,
  getUserMedia,
} from 'react-native-webrtc';

let localStream;

const RCTWebRTCDemo = React.createClass({
    getInitialState: function () {
        return {
            selfViewSrc: null,
        };
    },
    componentDidMount: function () {
        this._start();
    },
    _start() {
        let self = this;

        getUserMedia({
            audio: true,
            video: true
        }, function (stream) {
            localStream = stream;
            
            self.setState({
                selfViewSrc: stream.toURL()
            });

            console.warn('started video', stream.toURL());
        });
    },
    _stop() {
        localStream.release();
        localStream = null;
        this.setState({
            selfViewSrc: null
        });
    },
    render() {
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row'}}>
                    {!this.state.selfViewSrc && <TouchableHighlight
                        style={{
                            borderWidth: 1,
                            height: 30,
                            borderColor: 'black'
                        }}
                        onPress={this._start}>
                        <Text>Start</Text>
                    </TouchableHighlight>}
                    {this.state.selfViewSrc && <TouchableHighlight
                        style={{
                            borderWidth: 1,
                            height: 30,
                            borderColor: 'black'
                        }}
                        onPress={this._stop}>
                        <Text>Stop</Text>
                    </TouchableHighlight>}
                </View>
                <RTCView streamURL={this.state.selfViewSrc} style={styles.selfView}/>
            </View>
        );
    }
});

const styles = StyleSheet.create({
    selfView: {
        width: 300,
        height: 500,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
    }
});

AppRegistry.registerComponent('RCTWebRTCDemo', () => RCTWebRTCDemo);
