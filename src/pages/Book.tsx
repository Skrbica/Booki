import { useEffect, useState } from "react";

export var fileBook:File;

export function setFile(file: File) {
    fileBook = file;
    
}

export default function Book() {

    const [counter, setCounter] = useState(0);
    const [stop, setStop] = useState(true);
    const [timer, setTimer] = useState(200);
    const [durationAdjustment, setDurationAdjustment] = useState(false);

    useEffect(() => {
        let mounted = true;

        //Buttons events section
        const playBtn = document.querySelector('.play');
        const stopBtn = document.querySelector('.stop');
        const resetBtn = document.querySelector('.reset');
        if(playBtn){
            playBtn.addEventListener('click', ()=>{setStop(false)});
        }
        if(stopBtn){
            stopBtn.addEventListener('click', ()=>{setStop(true)});
        }
        if(resetBtn){
            resetBtn.addEventListener('click', ()=> {setCounter(0)});
            fillField(counter);
        }

        //Save txt file to local storage as string
        if(fileBook instanceof File) {
            const reader = new FileReader();
        
            reader.readAsText(fileBook);
            
            reader.onload = function(event) {
                saveLocally(reader);
            }
        }

        function saveLocally(reader: any){
            let text = JSON.stringify(reader.result);
            let textArr = text.split(' ');
            textArr[0]= textArr[0].substring(1);
            textArr[textArr.length - 1]= textArr[textArr.length - 1].slice(0,-1);
            localStorage.setItem('textArray', JSON.stringify(textArr));
            fillField(counter);
        }
            
        //Go through words every second
        if(!stop){
            let arr = localStorage.getItem('textArray');
            if(arr != null && mounted) {
                let duration = timer;
                //word shown duration based on it's length
                if(durationAdjustment){
                    let coef = JSON.parse(arr)[counter].length;
                    duration = 2 * timer - (1/coef);
                }

                //let duration = timer*(2-(1/coef));
                let intervalId = setInterval(() => {
                    fillField(counter);
                    setCounter(counter+1);
                    console.log(counter);
                }, duration);
                return () => {
                    clearInterval(intervalId); //This is important
                    mounted = false // Let's us know the component is no longer mounted.
                }
            }
        }
        
    },[counter, stop, timer]);

    
    //Add text to word field
    function fillField(ind: number) {
        let wordsArr = localStorage.getItem('textArray');
        let words;
        if(wordsArr != null) {
            words = JSON.parse(wordsArr);
            const wordText = document.querySelector('.text-word') as HTMLElement;
            
            if(wordText != null) {
                if(ind < words.length){
                    wordText.innerText = words[ind];
                }
            }
        }
        
    }

    return (
        <>
        <div className="ul">
            <div className="li drop-container">
                <span className='text-word'></span>
            </div>
            <div className="li button-section">
                <div className="row">
                    <button className="button stop column left" type="button">Stop</button>
                    <button className="button play column middle" type="button">Play</button>
                    <button className="button reset column right" type="button">Reset</button>
                </div>
            </div>
        </div>

        </>
    );
}