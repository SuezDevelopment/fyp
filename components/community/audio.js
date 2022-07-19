import * as React from 'react'
import { Audio } from 'expo-av';
import { loginReducer } from '../../reducer/login';

export const AudioFile = (s)=>{
    const c = class{
        constructor(
            s
        )
        on(){
            s.emitaddListener('someEvent', function(message) {
                console.log(message);
                let results = {
                    servers: [],
                };

                con = class{
                    constructor(
                        attmt
                       
                    )
                    attmt(){
                        ()=>{
                            attmt.emit().then(()=>{

                            })
                        }
                    }
                }
            });
        }
    }
    return (
        <Audio 
            style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                right:
                window.innerWidth > window.screen.availWidth
            }}
        />
    );
};
