import React from "react";
import { useState } from 'react';
import { View } from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';

export default function CircularSlider(props){
    const [angle, setAngle] = useState(0);
    const [mountX, setMountX] = useState(0);
    const [mountY, setMountY] = useState(0);
    let size = props.size === undefined ? 300: props.size;
    let min = props.min === undefined ? 0: props.min;
    let max = props.max === undefined ? 100: props.max;
    let thumbWidth = props.thumbWidth === undefined ? 15: props.thumbWidth;
    let steps = props.steps === undefined ? 1 : props.steps;
    let centerX = size/2;
    let centerY = size/2;
    return (
      <View style={{width: size, height: size, justifyContent: "center"}} onTouchMove={e=>{
        let y = e.nativeEvent.pageY-mountY-centerY;
        let x = e.nativeEvent.pageX-centerX - mountX;
        let ang = Math.atan2(y,x);
        if((ang+Math.PI)/(2*Math.PI-0.5) < 1){
          // console.log(ang+Math.PI);
          setAngle(ang+Math.PI);
        }
        props.onChange(Math.floor(Math.round(angle/(2*Math.PI-0.51)*(max-min)+min)/steps)*steps);
      }}>
        {props.element}
        <Svg height={size} width={size} onLayout={(e)=>{
        e.target.measure((x, y, width, height, px, py)=>{
          setMountX(px);
          setMountY(py);
        });
        }}>
         <Circle cx={size/2} cy={size/2} r={(size-thumbWidth*2)/2} stroke="#efefef" strokeWidth={5}/>
           <Svg>
              <Path d={`M ${thumbWidth} ${size/2} A${(size-thumbWidth*2)/2} ${(size-thumbWidth*2)/2} 0 ${angle > 3.14159 ? 1: 0} 1 ${centerX-Math.cos(angle)*(size-thumbWidth*2)/2} ${centerY-Math.sin(angle)*(size-thumbWidth*2)/2}`} stroke={props.trackColor === undefined? "black": props.trackColor} strokeWidth={props.trackWidth === undefined ? 10 : props.trackWidth} />
              <Circle cx={centerX-Math.cos(angle)*(size-thumbWidth*2)/2} cy={centerY-Math.sin(angle)*(size-thumbWidth*2)/2} r={thumbWidth} fill={props.thumbColor === undefined? "black": props.thumbColor}/>
           </Svg>
        </Svg>
      </View>
    );
  }