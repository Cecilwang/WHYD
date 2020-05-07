const PLAY_ICON = 'https://img.icons8.com/metro/26/000000/play.png';
const PAUSE_ICON = 'https://img.icons8.com/metro/26/000000/pause.png';
const STOP_ICON = 'https://img.icons8.com/metro/26/000000/stop.png';
const RECORD_ICON = 'https://img.icons8.com/metro/26/000000/ball-point-pen.png';

const cardButtons = t => {
  return [
    {icon: PLAY_ICON, text: 'Do', callback: () => {}, condition: 'edit'},
    //{icon: PAUSE_ICON, text: 'Pause', callback: () => {}, condition: 'edit'},
    {icon: STOP_ICON, text: 'Done', callback: () => {}, condition: 'edit'},
    {icon: RECORD_ICON, text: 'Record', callback: () => {}, condition: 'edit'}
  ]
};

module.exports = cardButtons;
