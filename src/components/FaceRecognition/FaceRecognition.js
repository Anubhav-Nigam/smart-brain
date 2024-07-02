import React, { Component } from 'react';
import './FaceRecognition.css';

// const FaceRecognition = ({ box, imageUrl }) => {

//     return (
//         <div className='center ma'>
//             <div className='absolute mt2'>
//                 <img id='inputimage' src={imageUrl} alt='' width='500px' height='auto' />
//                 <div className='bounding-box' style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
//             </div>
//         </div>
//     );
// }

// export default FaceRecognition;

class FaceRecognition extends Component {
    
    drawBoxes = (boxes, imageUrl) => {
        console.log('boxes', boxes);
        if(boxes.length > 0) {
            let finalBoxes = boxes.map((box, i) => {
                return <div key={i} className='bounding-box' style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
            });
            console.log('finalBoxes',finalBoxes);
            return finalBoxes
            // return <div>{finalBoxes}</div>
        }
        else if(boxes.length === 0 && imageUrl !== '') {
            return <div>No face detected.</div>
        }
    }

    render() {
        const { box, imageUrl } = this.props;
        return (
            <div className='center ma'>
                <div className='absolute mt2'>
                    <img id='inputimage' src={imageUrl} alt='' width='500px' height='auto' />
                    {this.drawBoxes(box,imageUrl)}
                </div>
            </div>
        );
    }
} 

export default FaceRecognition;