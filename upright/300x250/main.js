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
      "./assets/button.png",
      "./assets/disc01.png",
      "./assets/image01.jpg",
      "./assets/logo.png",
      "./assets/text01.png",
      "./assets/text02.png",
    ];
    this.subload = [
      "./assets/button.png",
      "./assets/disc01.png",
      "./assets/image01.jpg",
      "./assets/logo.png",
      "./assets/text01.png",
      "./assets/text02.png",
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
      .set('.frame1-img', { x: 70 })
      .set('.frame1-text1', { x: '16.67%', autoAlpha: 0 })
      .set('.frame2-text1', { x: '16.67%', autoAlpha: 0 })
      .set('.frame-btn', { scale: 0.5, autoAlpha: 0 })
      .set('.frame-disc', { autoAlpha: 0 })
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
    this.mainTimeline.add(this.frame1(), '+=0.5');
    this.mainTimeline.add(this.frame2(), '+=0.5');
    this.mainTimeline.add(this.frame3(), '+=0.5');
  }



  /**
   * 
   * ANIMATION FRAMES
   * 
   */
  frame1() {
    const timeline = gsap.timeline();

    timeline
      .to('.frame1 .gradient1', 1.2, { x: -465, ease: 'power3.out' })
      .to('.frame1-img', 1, { x: 0, ease: 'power3.out' }, '<')
      .to('.frame1-text1', 1.2, { x: 0, autoAlpha: 1, ease: 'power3.out' }, '<')

    return timeline;
  }

  frame2() {
    const timeline = gsap.timeline();

    timeline
      .to('.frame1-text1', 0.4, { x: '-8%', autoAlpha: 0, ease: 'power3.out' })
      .to('.frame2-text1', 1.2, { x: 0, autoAlpha: 1, ease: 'power3.out' }, '-=0.4');

    return timeline;
  }

  frame3() {
    const timeline = gsap.timeline();

    timeline
      .to('.frame2-text1', 0.4, { x: '-8%', autoAlpha: 0, ease: 'power3.out' })
      .to('.frame-btn', 0.4, { scale: 1, autoAlpha: 1, ease: 'power3.out' })
      .to('.frame-btn', 0.15, { scale: 1.1, ease: 'power1.out', repeat: 1, yoyo: true }, '>0.5')
      .to('.frame-disc', { autoAlpha: 1 }, '<0.5')
    return timeline;
  }
}