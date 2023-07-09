class Banner {
  constructor() {
    this.mainTimeline = gsap.timeline({
      paused: true
    });

    this.width = 728;
    this.height = 90;
    this.imagesLoaded = 0;
    this.imagesSubloaded = 0;
    this.preloadSize = 0;
    this.subloadSize = 0;
    this.images = [
      "./assets/disc01.png",
      "./assets/disc02.png",
      "./assets/img01.jpg",
      "./assets/img02.jpg",
      "./assets/img03.jpg",
      "./assets/ribbon01.png",
      "./assets/ribbon02.png",
      "./assets/ribbon03.png",
      "./assets/txt01.png",
      "./assets/txt02.png",
      "./assets/foxtelLogo.png"
    ];
    this.subload = [
      "./assets/disc01.png",
      "./assets/disc02.png",
      "./assets/img01.jpg",
      "./assets/img02.jpg",
      "./assets/img03.jpg",
      "./assets/ribbon01.png",
      "./assets/ribbon02.png",
      "./assets/ribbon03.png",
      "./assets/txt01.png",
      "./assets/txt02.png",
      "./assets/foxtelLogo.png"
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
      .set('.logo', { autoAlpha: 0 })
      .set('.frame:not(.common, .frame3, .frame4) .ribbon', { x: '-100%' })
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
    this.mainTimeline.add(this.frame2(), '+=2.5');
    this.mainTimeline.add(this.frame3(), '+=2.5');
    this.mainTimeline.add(this.frame4(), '+=2.5');
    this.mainTimeline.add(this.frame5(), '+=2.5');
  }



  /**
   * 
   * ANIMATION FRAMES
   * 
   */ 
  frame1() {
    const timeline = gsap.timeline();

    timeline
      .to('.logo', { autoAlpha: 1, delay: 0.75 })
      .to('.frame1 .ribbon', { x: 0, ease: 'power4.out' });

    return timeline;
  }

  frame2() {
    const timeline = gsap.timeline();

    timeline
      .to('.frame1 .mask', { x: '115%', ease: 'power4.in', duration: 0.75 })
      .to('.frame2 .ribbon', { x: 0, ease: 'power4.out' });

    return timeline;
  }

  frame3() {
    const timeline = gsap.timeline();

    timeline
      .to('.frame2 .mask', { x: '115%', ease: 'power4.in', duration: 0.75 });

    return timeline;
  }

  frame4() {
    const timeline = gsap.timeline();

    timeline
      .to('.frame3 .mask', { x: '115%', ease: 'power4.in', duration: 0.75 });

    return timeline;
  }

  frame5() {
    const timeline = gsap.timeline();

    timeline
      .to('.frame4 .mask', { x: '115%', ease: 'power4.in', duration: 0.75 })
      .to('.frame5 .ribbon', { x: 0, ease: 'power4.out' });

    return timeline;
  }
}