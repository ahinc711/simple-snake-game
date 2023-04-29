import _ from 'lodash';
import './style.css';

 function createContainer() {
   const element = document.createElement('div');

   // Lodash, now imported by this script
   element.innerHTML = _.join(['Any', 'gamers?'], ' ');
   element.classList.add('game-container');

   return element;
 }

 document.body.appendChild(createContainer());