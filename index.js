import React from "react";
import { useState } from 'react';
import { View } from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';

export default function CircularSlider(props){
    const [angle, setAngle] = useState(0);
    const [mountX, setMountX] = useState(0);
    const [mountY, setMountY] = useState(0);
    let size = props.size;
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
        props.onChange(Math.floor(Math.round(angle/(2*Math.PI-0.51)*(props.max-props.min)+props.min)/props.steps)*props.steps);
      }}>
        <Svg height={size} width={size} onLayout={(e)=>{
        e.target.measure((x, y, width, height, px, py)=>{
          setMountX(px);
          setMountY(py);
        });
        }}>
         <Circle cx={size/2} cy={size/2} r={(size-props.thumbWidth*2)/2} stroke="#efefef" strokeWidth={5}/>
           <Svg>
              <Path d={`M ${props.thumbWidth} ${size/2} A${(size-props.thumbWidth*2)/2} ${(size-props.thumbWidth*2)/2} 0 ${angle > 3.14159 ? 1: 0} 1 ${centerX-Math.cos(angle)*(size-props.thumbWidth*2)/2} ${centerY-Math.sin(angle)*(size-props.thumbWidth*2)/2}`} stroke={props.trackColor} strokeWidth={props.trackWidth} />
              <Circle cx={centerX-Math.cos(angle)*(size-props.thumbWidth*2)/2} cy={centerY-Math.sin(angle)*(size-props.thumbWidth*2)/2} r={props.thumbWidth} fill={props.thumbColor}/>
           </Svg>
        </Svg>
        {props.element}
      </View>
    );
  }