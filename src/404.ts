import './404.scss';

const pathname = window.location.pathname;
const divider = 'multitwitch';
const streamNames = pathname.substring(pathname.indexOf(divider) + divider.length).split('/')
  .filter(el => el !== '')

const numberOfStreams = streamNames.length;
const bodyEl = document.getElementsByTagName('body')[0];

const streams = streamNames.map(stream => {
  const container = document.createElement('div');
  container.style.position = 'absolute';

  const playerContainer = document.createElement('div');
  playerContainer.style.position = 'absolute';

  const player = document.createElement('iframe');
  player.src = `https://player.twitch.tv/?channel=${stream}`;
  player.allowFullscreen = true;

  const chatContainer = document.createElement('div');
  chatContainer.style.position = 'absolute';
  chatContainer.style.bottom = '0';

  const chat = document.createElement('iframe');
  chat.src = `https://www.twitch.tv/embed/${stream}/chat?darkpopout`;
  chat.allowFullscreen = true;

  chatContainer.appendChild(chat);
  playerContainer.appendChild(player);
  container.appendChild(playerContainer);
  container.appendChild(chatContainer);
  bodyEl.appendChild(container);

  return { container, playerContainer, chatContainer };
});

function getGrid(numberOfBoxes: number, dimensions: { w: number, h: number }) {
  const { w, h } = dimensions;
  const containerWidth = w / numberOfBoxes;
  const containers = [];

  for (let i = 0; i < numberOfBoxes; i++) {
    const playerContainerHeight = containerWidth * 9 / 16;
    const containerHeight = h;

    const container = {
      width: containerWidth,
      height: containerHeight,
      left: containerWidth * i,
      playerContainer: {
        width: containerWidth,
        height: playerContainerHeight
      },
      chatContainer: {
        width: containerWidth,
        top: playerContainerHeight,
        height: containerHeight - playerContainerHeight
      }
    };

    containers[i] = container;
  }

  return containers;
}

function setStreamSizes(grid: any[], streams: any[]) {
  if (grid.length !== streams.length) { throw new Error('# of streams dont match # grid els'); }

  grid.forEach((grid, idx) => {
    const stream = streams[idx];
    stream.container.style.width = grid.width + 'px';
    stream.container.style.height = grid.height + 'px';
    stream.container.style.left = grid.left + 'px';

    stream.playerContainer.style.width = grid.playerContainer.width + 'px';
    stream.playerContainer.style.height = grid.playerContainer.height + 'px';

    stream.chatContainer.style.height = grid.chatContainer.height + 'px';
    stream.chatContainer.style.width = grid.chatContainer.width + 'px';
    stream.chatContainer.style.top = grid.chatContainer.top + 'px';
  });
}

function setGrid() {
  const grid = getGrid(numberOfStreams, { w: window.innerWidth, h: window.innerHeight });
  setStreamSizes(grid, streams);
}

window.onresize = setGrid;
setGrid();

document.title = `MultiTwitch - ${streamNames.join(' - ')}`;
