# coffeeseals.github.io
coffeeseals.github.io



<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>YouTube Channel Embed</title>

  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
    }

    body {
      background: #f5f5f5;
      color: #111;
      padding: 20px;
    }

    .container {
      max-width: 1200px;
      margin: auto;
    }

    .channel-header {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0,0,0,0.08);
      margin-bottom: 24px;
    }

    .banner {
      width: 100%;
      height: 220px;
      object-fit: cover;
      display: block;
    }

    .channel-info {
      display: flex;
      gap: 20px;
      align-items: center;
      padding: 24px;
    }

    .channel-avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid white;
      margin-top: -60px;
      background: white;
    }

    .channel-meta h1 {
      font-size: 32px;
      margin-bottom: 10px;
    }

    .channel-meta p {
      color: #666;
      font-size: 16px;
    }

    .videos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 24px;
    }

    .video-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0,0,0,0.08);
      transition: transform 0.2s ease;
    }

    .video-card:hover {
      transform: translateY(-4px);
    }

    .thumbnail {
      width: 100%;
      aspect-ratio: 16 / 9;
      object-fit: cover;
      display: block;
    }

    .video-content {
      padding: 16px;
    }

    .video-title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 12px;
      line-height: 1.4;
    }

    .video-date {
      color: #777;
      font-size: 14px;
      margin-bottom: 14px;
    }

    .video-stats {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      color: #444;
      font-size: 14px;
    }

    .loading {
      text-align: center;
      padding: 40px;
      color: #666;
    }

    .error {
      color: red;
      text-align: center;
      padding: 30px;
    }
  </style>
</head>
<body>
  <div class="container">

    <!-- 채널 헤더 -->
    <div class="channel-header">
      <img
        id="channelBanner"
        class="banner"
        src=""
        alt="Channel Banner"
      />

      <div class="channel-info">
        <img
          id="channelAvatar"
          class="channel-avatar"
          src=""
          alt="Channel Avatar"
        />

        <div class="channel-meta">
          <h1 id="channelTitle">Loading...</h1>
          <p id="channelStats"></p>
        </div>
      </div>
    </div>

    <!-- 최근 동영상 -->
    <div id="videosContainer" class="videos-grid"></div>
  </div>

  <script>
    // =========================
    // 설정
    // =========================

    const API_KEY = 'AIzaSyDDLhOG3lvPy2lTUzM9j-bDwfI11F6h4pI';
    const CHANNEL_ID = 'UCTSY968JYCGCMxDaxG2mLEw'; 

    // =========================
    // 숫자 포맷
    // =========================

    function formatNumber(num) {
      return new Intl.NumberFormat('en-US').format(num);
    }


    // =========================
    // 날짜 포맷
    // =========================

    function formatDate(dateString) {
      const date = new Date(dateString);

      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }


    // =========================
    // 채널 정보 가져오기
    // =========================

    async function loadChannelInfo() {
      const url =   'https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id='
  + CHANNEL_ID +
  '&key=' + API_KEY;

      const response = await fetch(url);
      const data = await response.json();

      const channel = data.items[0];

      document.getElementById('channelTitle').textContent = channel.snippet.title;

      document.getElementById('channelStats').textContent =
        `${formatNumber(channel.statistics.subscriberCount)} subscribers · ` +
        `${formatNumber(channel.statistics.videoCount)} videos · ` +
        `${formatNumber(channel.statistics.viewCount)} views`;

      document.getElementById('channelAvatar').src =
        channel.snippet.thumbnails.high.url;

      document.getElementById('channelBanner').src =
        channel.brandingSettings.image.bannerExternalUrl;
    }


    // =========================
    // 최근 영상 ID 가져오기
    // =========================

    async function loadRecentVideos() {
     const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=3&type=video`;

      const searchResponse = await fetch(searchUrl);
      const searchData = await searchResponse.json();

      const videoIds = searchData.items
        .map(item => item.id.videoId)
        .join(',');

      const videosUrl = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=snippet,statistics`;

      const videosResponse = await fetch(videosUrl);
      const videosData = await videosResponse.json();

      renderVideos(videosData.items);
    }


    // =========================
    // 영상 렌더링
    // =========================

    function renderVideos(videos) {
      const container = document.getElementById('videosContainer');

      container.innerHTML = '';

      videos.forEach(video => {
        const card = document.createElement('div');
        card.className = 'video-card';

        card.innerHTML = `
          <a href="https://www.youtube.com/watch?v=${video.id}" target="_blank">
            <img
              class="thumbnail"
              src="${video.snippet.thumbnails.high.url}"
              alt="Thumbnail"
            />
          </a>

          <div class="video-content">
            <div class="video-title">
              ${video.snippet.title}
            </div>

            <div class="video-date">
              ${formatDate(video.snippet.publishedAt)}
            </div>

            <div class="video-stats">
              <span>👁 조회수 ${formatNumber(video.statistics.viewCount || 0)}</span>
              <span>👍 좋아요 ${formatNumber(video.statistics.likeCount || 0)}</span>
              <span>💬 댓글 ${formatNumber(video.statistics.commentCount || 0)}</span>
            </div>
          </div>
        `;

        container.appendChild(card);
      });
    }


    // =========================
    // 초기 실행
    // =========================

    async function init() {
      try {
        await loadChannelInfo();
        await loadRecentVideos();
      } catch (error) {
        console.error(error);

        document.getElementById('videosContainer').innerHTML = `
          <div class="error">
            YouTube API 로딩 실패<br /><br />
            API KEY와 CHANNEL ID를 확인하세요.
          </div>
        `;
      }
    }

    init();
  </script>
</body>
</html>
