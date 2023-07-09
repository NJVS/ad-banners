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
      "./assets/img01.jpg",
      "./assets/img02.jpg",
      "./assets/img03.jpg",
    ];
    this.subload = [
      "./assets/img01.jpg",
      "./assets/img02.jpg",
      "./assets/img03.jpg",
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
  }



  /**
   * 
   * ANIMATION FRAMES
   * 
   */ 
  frame1() {
    const timeline = gsap.timeline();

    return timeline;
  }
}