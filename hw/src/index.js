import { foo } from './moduleA';
import { boo } from './moduleB';

import "./styles.css";
import "./styles.scss";
import avatar from "./images/avatar.jpg";

const img = document.createElement('img');
const root = document.getElementById('root');

img.src = avatar;
img.alt = 'avatar';

// document.body.appendChild(img);
root.appendChild(img);

foo();
boo();