import { FETCH_USER } from '../actions/types';

export default function(state =null, action){
    switch (action.type){
        case FETCH_USER: //value gets updated
            return action.payload || false; //'' or false '' means also false
        default: 
            return state; 
    }
}