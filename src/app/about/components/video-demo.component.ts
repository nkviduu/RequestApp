import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  styles: [`
    h3 div,
    h3 button {
      display: inline-block;
    }

    h3 button {
      margin: 0 6px;
      border: solid 1px #aaa;
      background: transparent;
    }

    video {
      width: 100%;
      max-width: 480px;
      box-shadow: 1px 1px 4px 2px #eee;
      position: relative;
      /* filter: blur(1px); */
    }

    .video-wrapper {
      display: inline-block;
      position: relative;
    }

    .video-wrapper:after {
      content: "▶";
      color: #0374bb;
      color: #333;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      background: #eee1;
      font-size: 4em;
      z-index: 1;
    }

    /*
    .video-wrapper.playing video {
      filter: none;
    }
    */

    .video-wrapper.playing:after {
      display: none;
    }
  `],
  template: `
  <div class="component-section">
    <h3 class="h3">
      Sample interaction with demo app.
    </h3>
    <section>
      <div
        class="video-wrapper"
        [class.playing]="isPlaying"
        (click)="playVideo()">
        <video controls muted
          (play)="isPlaying = true"
          (pause)="isPlaying = false"
          (end)="isPlaying = false"
          #videoPlayer>
          <source src="assets/content/video/RequestApp.mp4">
          This video is not available in your currently used browser.
        </video>
      </div>
    </section>
  </div>
`})
export class VideoDemoComponent {
  @ViewChild('videoPlayer') videoPlayer: ElementRef;
  isPlaying = false;

  started = false;

  /**
   * Play video on mouse over first time as controls may not be
   * visible at the bottom of screen
   * Keeping mouse over may prove to be tricky to stop video
  */
  playVideo() {
    if (!this.started) {
      this.videoPlayer.nativeElement.play();
    }
  }

  videoPlaying() {
    console.log('video is playing');
  }
}
