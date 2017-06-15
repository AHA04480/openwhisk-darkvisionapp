//------------------------------------------------------------------------------
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//------------------------------------------------------------------------------
(function () {
  function PlayerController($location, VideosService, $stateParams, $state, $sce) {
    console.info("Initializing PlayerController");
    var controller = this;

    controller.data = {
      images: null,
      summary: null,
      selected: null,
      selectedSummary: null,
      videoId: $stateParams.videoId,
      playerUrl: '/videos/contents/' + $stateParams.videoId + '.mp4',
      currentTime: null,
      playerState: null
    };

    controller.config = {
      sources: [
        {src: $sce.trustAsResourceUrl(controller.data.playerUrl), type: "video/mp4"}
      ],
      tracks: [
        {
          src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
          kind: "subtitles",
          srclang: "en",
          label: "English",
          default: ""
        }
      ],
      theme: "../../vendor/videogular-themes-default/videogular.css"
      /*
      plugins: {
        poster: "http://www.videogular.com/assets/images/videogular.png"
      }
      */
    };

    controller.API = null;
    controller.playerReady = function(API) {
      console.log('onPlayerReady');
      controller.API = API;
    };

    controller.updateTime = function($currentTime,$duration){
      console.log('updateTime ' + $currentTime);
      controller.data.currentTime = $currentTime;
    };

    controller.updateState = function($state){
      console.log('updateState ' + $state);
      controller.data.playerState = $state
    }

    VideosService.get($stateParams.videoId).then(function (summary) {
      controller.data.images = summary.images;
      controller.data.summary = summary;
      controller.data.selected = controller.data.video;
      controller.data.selectedSummary = summary;
      controller.data.video = controller.data.selected = summary.video;
    });

  }

  angular.module('app')
    .controller('PlayerController', ['$location', 'VideosService', '$stateParams', '$state', '$sce', PlayerController]);
}());
