  (function init() {
    const streamNames = window.location.hash.split('/').slice(1);
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
      chatContainer.style.bottom = 0;

      const chat = document.createElement('object');
      chat.data = `https://www.twitch.tv/${stream}/chat?popout=`;

      chatContainer.appendChild(chat);
      playerContainer.appendChild(player);
      container.appendChild(playerContainer);
      container.appendChild(chatContainer);
      bodyEl.appendChild(container);

      return { container, playerContainer, chatContainer };
    });

    function setStreamSize(stream, idx) {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const playerWidth = windowWidth / numberOfStreams;

      stream.container.style.width = playerWidth + 'px';
      stream.container.style.height = windowHeight + 'px';
      stream.container.style.left = playerWidth * idx + 'px';

      stream.playerContainer.style.width = stream.container.style.width;
      stream.playerContainer.style.height = playerWidth  * 9 / 16 + 'px';

      stream.chatContainer.style.width = stream.playerContainer.style.width;
      stream.chatContainer.style.top = stream.playerContainer.style.height;
    }

    window.onresize = () => { streams.forEach(setStreamSize); };

    streams.forEach(setStreamSize);
    document.title = `MultiTwitch - ${streamNames.join(' - ')}`;

  }());
