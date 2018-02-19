import './404.scss';

const streamNames = window.location.pathname.split('/')
  .filter(name => name !== '' && name !== 'multitwitch');

const numberOfStreams = streamNames.length;
const bodyEl = document.getElementsByTagName('body')[0];

const streams = streamNames.map(stream => {
  const container = document.createElement('div');
  container.style.position = 'absolute';

  const playerContainer = document.createElement('div');
  playerContainer.style.position = 'absolute';

  const player = document.createElement('object');
  player.data = `https://player.twitch.tv/?channel=${stream}`;

  const chatContainer = document.createElement('div');
  chatContainer.style.position = 'absolute';
  chatContainer.style.bottom = '0';

  const chat = document.createElement('object');
  chat.data = `https://www.twitch.tv/${stream}/chat?popout=`;

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
    const container = {
      width: containerWidth,
      height: h,
      left: containerWidth * i,
      chatContainer: {
        width: containerWidth,
        top: containerWidth  * 9 / 16,
      },
      playerContainer: {
        width: containerWidth,
        height: containerWidth  * 9 / 16
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

    stream.chatContainer.style.width = grid.chatContainer.width + 'px';
    stream.chatContainer.style.top = grid.chatContainer.height + 'px';
  });
}

window.onresize = () => {
  const grid = getGrid(numberOfStreams, { w: window.innerWidth, h: window.innerHeight });
  setStreamSizes(grid, streams);
};

const grid = getGrid(numberOfStreams, { w: window.innerWidth, h: window.innerHeight });
setStreamSizes(grid, streams);

document.title = `MultiTwitch - ${streamNames.join(' - ')}`;
