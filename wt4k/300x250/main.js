class Banner {
  constructor() {
    this.mainTimeline = gsap.timeline({
      paused: true
    });

    this.width = 300;
    this.height = 250;
    this.imagesLoaded = 0;
    this.imagesSubloaded = 0;
    this.preloadSize = 0;
    this.subloadSize = 0;
    this.images = [
      "./assets/frame1-bg.jpg",
      "./assets/frame1-seal.png",
      "./assets/frame1-text1.svg",
      "./assets/frame1-text2.svg",
      "./assets/frame1-text3.svg",
    ];
    this.subload = [
      "./assets/frame1-bg.jpg",
      "./assets/frame1-seal.png",
      "./assets/frame1-text1.svg",
      "./assets/frame1-text2.svg",
      "./assets/frame1-text3.svg",
    ];
  }



  /**
   * 
   * PRE-LOAD IMAGES
   * 
   */
  preloadImages() {
    for (let i = 0; i < this.images.length; i++) {
      this.preLoadImage(this.images[i]);
    }
  }

  preLoadImage(imgUrl, targetElement) {
    let newImage = new Image();
    newImage.onload = this.imageLoaded.bind(this);
    newImage.src = imgUrl;
  }

  imageLoaded() {
    this.imagesLoaded++;

    if (
      this.imagesLoaded === this.images.length &&
      !this.init
    ) {
      this.init = true;
      console.log(">>> ALL IMAGES LOADED");
      this.initBanner();
      this.subloadImages();
    }
  }



  /**
   * 
   * SUB-LOAD IMAGES
   * 
   */
  subloadImages() {
    for (let i = 0; i < this.subload.length; i++) {
      this.subloadImage(this.subload[i]);
    }
  }

  subloadImage(imgUrl, targetElement) {
    let newImage = new Image();
    newImage.onload = this.imageSubloaded.bind(this);
    newImage.src = imgUrl;
  }

  imageSubloaded() {
    this.imagesSubloaded++;

    if (this.imagesSubloaded === this.subload.length) {
      console.log(">>> ALL IMAGES SUBLOADED");
      this.startBanner();
    }
  }



  /**
   * 
   * INIT BANNERS
   * 
   */
  initBanner() {
    console.log(`>>> INIT BANNER: ${this.width}x${this.height}`);

    document.querySelector('#banner').style.display = 'block';

    this.mainTimeline
      .set('#banner', { autoAlpha: 0 })
      .set('.frame1-background', { scale: 1.5 })
      .set(['.frame1-text1', '.frame1-text2', '.frame1-text3', '.logo'], { autoAlpha: 0 })
      .set(['.frame2-text1', '.frame2-text2', '.frame2-text3', '.frame3-text1', '.frame3-text2', '.frame3-text3', '.frame3-text4', '.frame4-text1', '.frame4-text2', '.frame4-text3', '.frame4-btn'],
        { y: 8, autoAlpha: 0 })
      .to('#banner', { autoAlpha: 1, delay: 0.3 });

    this.mainTimeline.play();
  }



  /**
   * 
   * START BANNER ANIMATION
   * 
   */
  startBanner() {
    console.log('>> START BANNER ANIMATION');
    this.mainTimeline.add(this.frame1());
    this.mainTimeline.add(this.frame2(), '+=0.3');
    this.mainTimeline.add(this.frame3(), '+=1');
    this.mainTimeline.add(this.frame4(), '+=1');
  }



  /**
   * 
   * ANIMATION FRAMES
   * 
   */
  frame1() {
    const timeline = gsap.timeline();

    timeline
      .to('.frame1-background', { scale: 1, duration: 4 })
      .to('.frame1-image1', { scale: 1.1, x: '-3.33%', y: '-4%', duration: 4 }, '<')
      .to(['.frame1-text1', '.frame1-text2', '.frame1-text3'], { autoAlpha: 1, stagger: 0.5, duration: 0.1 }, '<0.75')

    return timeline;
  }

  frame2() {
    const timeline = gsap.timeline();

    timeline
      .to('.frame1', 0.2, { autoAlpha: 0 })
      .to(['.frame2-text1', '.frame2-text2', '.frame2-text3'], { y: 0, autoAlpha: 1, stagger: 0.2 }, '+=0.5')


    return timeline;
  }

  frame3() {
    const timeline = gsap.timeline();

    timeline
      .to(['.frame2-text1', '.frame2-text2', '.frame2-text3'], { autoAlpha: 0 })
      .to(['.frame3-text1', '.frame3-text2', '.frame3-text3', '.frame3-text4'], { y: 0, autoAlpha: 1, stagger: 0.2 }, '+=0.5')

    return timeline;
  }

  frame4() {
    const timeline = gsap.timeline();

    timeline
      .to('.frame2', 0.2, { autoAlpha: 0 })
      .to('.logo', { autoAlpha: 1 }, '+=1')
      .to(['.frame4-text1', '.frame4-text2', '.frame4-text3', '.frame4-btn'], { y: 0, autoAlpha: 1, stagger: 0.2 })

    return timeline;
  }
}