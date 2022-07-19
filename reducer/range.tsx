
import React, {useRef, useState} from 'react';

export const fjfj = async(item:any)=>{
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            console.log("F")
            resolve(item)
        }, 3000);

    })
}

var Range: {
    new (): Range;
    prototype: Range;
    readonly END_TO_END: number;
    readonly END_TO_START: number;
    readonly START_TO_END: number;
    readonly START_TO_START: number;
    toString(): string;
}

var ReadableStreamDefaultReader: {
    [x: string]: any;
    new <R = any>(stream: ReadableStream<R>): ReadableStreamDefaultReader<R>;
    prototype: ReadableStreamDefaultReader<any>;
}

// ReadableStreamDefaultReader


