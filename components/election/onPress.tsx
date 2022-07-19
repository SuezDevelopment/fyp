import React, { useState, useEffect } from 'react';
import {Position,Inp} from './Position.js';
import { View, Text} from '../Themed.tsx';
import { Pressable,  } from 'react-native';
// import {TextInput} 

class clickLogic extends React.Component {
    counterReducer(state = { value: 0 }, action:any) {
        switch (action.type) {
          case 'counter/incremented':
            return { value: state.value + 1 }
          default:
            return state
        }
    };

    
    

    getClickEvent(candidateId:any,userId:any){
        const [count, setCount] = useState(null)
        // for(setCount){}
        // g = [ ];
        useEffect(() => {
            setCount(userId)
            document.title = `You clicked ${count} times`;
        }, []);
    };

    createArrayCandidate(a:any,b:any){
        const [count, setCount] = useState(0)
        const [position, setPosition] = useState([a])
        const [candidate, setCandidate] = useState([b])

        let handleAddPosition = (key:any) => {
            key.preventDefault()
            // setPosition()
            // setPosition([...position, <Position key={position.length} />]);
        }
        let handleAddCandidate = (key:any) => {
            key.preventDefault()
            let dd;
            let h = position.forEach(pos=>{
                dd = [pos,...candidate]
            });
            let createArray = (key:any) => {

            }
            setCandidate([...candidate, <Inp key={candidate.length} />])

            // array1.forEach(element => console.log(element));
            // setPosition([...position, <Position key={position.length} />]);
        }

        return(
            <View>
                {position && <Inp />}
                <Text>You Can Add up to 20 Positions</Text>
                <Pressable onPress={handleAddPosition}>
                    <Text>Add Positions</Text>
                </Pressable>
                <Text>When you're done click add properties below</Text>
                <Pressable onPress={handleAddCandidate}>
                    <Text>Add Positions</Text>
                </Pressable>

            </View>
        )
        // const [count, setCount] = useState(null)
    }
}

function createArray() {
    throw new Error('Function not implemented.');
}
    