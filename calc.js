let string = "";
let buttons = document.querySelectorAll('.button');
Array.from(buttons).forEach((button)=>{
  button.addEventListener('click', (e)=>{
    if(e.target.innerHTML == '='){
      string = eval(string);
      document.querySelector('input').value = string;
    }
    else if(e.target.innerHTML == 'C'){
      string = ""
      document.querySelector('input').value = string;
    }
    else{ 
    console.log(e.target)
    string = string + e.target.innerHTML;
    document.querySelector('input').value = string;
      }
  })
})

let $div = document.getElementById("gradient");
let gradients = [
  { start: [128,179,171], stop: [30,41,58] },
  { start: [255,207,160], stop: [234,92,68] },
  { start: [212,121,121], stop: [130,105,151] }
];

let transition_time = 4;
let currentIndex = 0; 
let nextIndex = 1; 
let steps_count = 0; 
let steps_total = Math.round(transition_time*60); 
let rgb_steps = {
  start: [0,0,0],
  stop: [0,0,0]
}; 

let rgb_values = {
  start: [0,0,0],
  stop: [0,0,0]
};

let prefixes = ["-webkit-","-moz-","-o-","-ms-",""];
let div_style = $div.style; 
let color1, color2;
function set_next(num) {
  return (num + 1 < gradients.length) ? num + 1 : 0;
}

function calc_step_size(a,b) {
  return (a - b) / steps_total;
}

function calc_steps() {
  for (let key in rgb_values) {
    if (rgb_values.hasOwnProperty(key)) {
      for(let i = 0; i < 3; i++) {
        rgb_values[key][i] = gradients[currentIndex][key][i];
        rgb_steps[key][i] = calc_step_size(gradients[nextIndex][key][i],rgb_values[key][i]);
      }
    }
  }
}

function updateGradient(){
  for (let key in rgb_values) {
    if (rgb_values.hasOwnProperty(key)) {
      for(let i = 0; i < 3; i++) {
        rgb_values[key][i] += rgb_steps[key][i];
      }
    }
  }

  let t_color1 = "rgb("+(rgb_values.start[0] | 0)+","+(rgb_values.start[1] | 0)+","+(rgb_values.start[2] | 0)+")";
  let t_color2 = "rgb("+(rgb_values.stop[0] | 0)+","+(rgb_values.stop[1] | 0)+","+(rgb_values.stop[2] | 0)+")";
  
  if (t_color1 != color1 || t_color2 != color2){
    color1 = t_color1;
    color2 = t_color2;
    div_style.backgroundImage = "-webkit-gradient(linear, left bottom, right top, from("+color1+"), to("+color2+"))";
    for (let i = 0; i < 4; i++) {
      div_style.backgroundImage = prefixes[i]+"linear-gradient(45deg, "+color1+", "+color2+")";
    }
  }
  steps_count++;
  if (steps_count > steps_total){
    steps_count = 0;
    currentIndex = set_next(currentIndex);
    nextIndex = set_next(nextIndex);
    calc_steps();
  }
  if (div_style.backgroundImage.indexOf("gradient") != -1) {
    window.requestAnimationFrame(updateGradient)
  }
}
calc_steps();
window.requestAnimationFrame(updateGradient);