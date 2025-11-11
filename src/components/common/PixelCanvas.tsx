'use client'; // [중요] 'HTMLElement'를 사용하므로 클라이언트 컴포넌트여야 합니다.

import { useEffect } from 'react';

// React 컴포넌트: 이 컴포넌트가 렌더링될 때 Web Component를 등록합니다.
const PixelCanvasRegistry = () => {
  
  // [중요] 모든 브라우저 API(HTMLElement, customElements 등)를 
  // useEffect 훅 안으로 이동시킵니다.
  useEffect(() => {
    
    // --- 1. Pixel 클래스 정의 ---
    // 이 클래스는 브라우저에서만 필요하므로 useEffect 안에 둡니다.
    class Pixel {
      width: number;
      height: number;
      ctx: CanvasRenderingContext2D;
      x: number;
      y: number;
      color: string;
      speed: number;
      size: number;
      sizeStep: number;
      minSize: number;
      maxSizeInteger: number;
      maxSize: number;
      delay: number;
      counter: number;
      counterStep: number;
      isIdle: boolean;
      isReverse: boolean;
      isShimmer: boolean;

      constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, x: number, y: number, color: string, speed: number, delay: number) {
        this.width = canvas.width;
        this.height = canvas.height;
        this.ctx = context;
        this.x = x;
        this.y = y;
        this.color = color;
        this.speed = this.getRandomValue(0.1, 0.9) * speed;
        this.size = 0;
        this.sizeStep = Math.random() * 0.4;
        this.minSize = 0.5;
        this.maxSizeInteger = 2;
        this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
        this.delay = delay;
        this.counter = 0;
        this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
        this.isIdle = false;
        this.isReverse = false;
        this.isShimmer = false;
      }

      getRandomValue(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      draw() {
        const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(
          this.x + centerOffset,
          this.y + centerOffset,
          this.size,
          this.size
        );
      }

      appear() {
        this.isIdle = false;
        if (this.counter <= this.delay) {
          this.counter += this.counterStep;
          return;
        }
        if (this.size >= this.maxSize) {
          this.isShimmer = true;
        }
        if (this.isShimmer) {
          this.shimmer();
        } else {
          this.size += this.sizeStep;
        }
        this.draw();
      }

      disappear() {
        this.isShimmer = false;
        this.counter = 0;
        if (this.size <= 0) {
          this.isIdle = true;
          return;
        } else {
          this.size -= 0.1;
        }
        this.draw();
      }

      shimmer() {
        if (this.size >= this.maxSize) {
          this.isReverse = true;
        } else if (this.size <= this.minSize) {
          this.isReverse = false;
        }
        if (this.isReverse) {
          this.size -= this.speed;
        } else {
          this.size += this.speed;
        }
      }
    }

    // --- 2. PixelCanvas Web Component 정의 ---
    // 이 클래스도 브라우저에서만 정의되어야 합니다.
    class PixelCanvas extends HTMLElement {
      _parent: HTMLElement | null = null;
      shadowroot: ShadowRoot | null = null;
      canvas: HTMLCanvasElement | null = null;
      ctx: CanvasRenderingContext2D | null = null;
      timeInterval: number = 1000 / 60;
      timePrevious: number = 0;
      reducedMotion: boolean = false;
      resizeObserver: ResizeObserver | null = null;
      animation: number = 0;
      pixels: Pixel[] = [];

      // static register는 클래스 내부에서 호출될 것이므로 여기에 있어도 됩니다.
      static register(tag = "pixel-canvas") {
        // 'this'는 PixelCanvas 클래스 자체를 가리킵니다.
        if ("customElements" in window && !customElements.get(tag)) {
          customElements.define(tag, this);
        }
      }

      static css = `
        :host {
          display: grid;
          inline-size: 100%;
          block-size: 100%;
          overflow: hidden;
        }
      `;

      get colors() {
        return this.dataset.colors?.split(",") || ["#f8fafc", "#f1f5f9", "#cbd5e1"];
      }

      get gap() {
        const value = this.dataset.gap || 5;
        const min = 4;
        const max = 50;
        if (Number(value) <= min) return min;
        if (Number(value) >= max) return max;
        return parseInt(String(value));
      }

      get speed() {
        const value = this.dataset.speed || 35;
        const min = 0;
        const max = 100;
        const throttle = 0.001;
        if (Number(value) <= min || this.reducedMotion) return min;
        if (Number(value) >= max) return max * throttle;
        return parseInt(String(value)) * throttle;
      }

      get noFocus() {
        return this.hasAttribute("data-no-focus");
      }

      connectedCallback() {
        const canvas = document.createElement("canvas");
        const sheet = new CSSStyleSheet();
        
        this._parent = this.parentNode as HTMLElement;
        this.shadowroot = this.attachShadow({ mode: "open" });

        // static css를 사용합니다.
        sheet.replaceSync(PixelCanvas.css);
        this.shadowroot.adoptedStyleSheets = [sheet];
        this.shadowroot.append(canvas);
        
        this.canvas = this.shadowroot.querySelector("canvas");
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext("2d");
        if (!this.ctx) return;
        
        this.timePrevious = performance.now();
        this.reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

        this.init();
        this.resizeObserver = new ResizeObserver(() => this.init());
        this.resizeObserver.observe(this);

        this._parent?.addEventListener("mouseenter", this);
        this._parent?.addEventListener("mouseleave", this);

        if (!this.noFocus) {
          this._parent?.addEventListener("focusin", this);
          this._parent?.addEventListener("focusout", this);
        }
      }
      
      disconnectedCallback() {
        this.resizeObserver?.disconnect();
        this._parent?.removeEventListener("mouseenter", this);
        this._parent?.removeEventListener("mouseleave", this);

        if (!this.noFocus) {
          this._parent?.removeEventListener("focusin", this);
          this._parent?.removeEventListener("focusout", this);
        }
        this._parent = null;
      }

      handleEvent(event: Event) {
        switch (event.type) {
          case "mouseenter":
            this._onMouseEnter();
            break;
          case "mouseleave":
            this._onMouseLeave();
            break;
          case "focusin":
            this._onFocusIn(event as FocusEvent);
            break;
          case "focusout":
            this._onFocusOut(event as FocusEvent);
            break;
        }
      }

      _onMouseEnter() {
        this.handleAnimation("appear");
      }

      _onMouseLeave() {
        this.handleAnimation("disappear");
      }

      _onFocusIn(e: FocusEvent) {
        if (this._parent?.contains(e.relatedTarget as Node)) return;
        this.handleAnimation("appear");
      }

      _onFocusOut(e: FocusEvent) {
        if (this._parent?.contains(e.relatedTarget as Node)) return;
        this.handleAnimation("disappear");
      }

      handleAnimation(name: 'appear' | 'disappear') {
        cancelAnimationFrame(this.animation);
        this.animationLoop(name);
      }

      init() {
        if (!this.canvas || !this.ctx) return;
        
        const rect = this.getBoundingClientRect();
        const width = Math.floor(rect.width);
        const height = Math.floor(rect.height);

        this.pixels = [];
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;
        this.createPixels();
      }

      getDistanceToCanvasCenter(x: number, y: number) {
        if (!this.canvas) return 0;
        const dx = x - this.canvas.width / 2;
        const dy = y - this.canvas.height / 2;
        return Math.sqrt(dx * dx + dy * dy);
      }

      createPixels() {
        if (!this.canvas || !this.ctx) return;
        for (let x = 0; x < this.canvas.width; x += this.gap) {
          for (let y = 0; y < this.canvas.height; y += this.gap) {
            const color = this.colors[
              Math.floor(Math.random() * this.colors.length)
            ];
            const delay = this.reducedMotion
              ? 0
              : this.getDistanceToCanvasCenter(x, y);
            this.pixels.push(
              new Pixel(this.canvas, this.ctx, x, y, color, this.speed, delay)
            );
          }
        }
      }

      animationLoop(fnName: 'appear' | 'disappear') {
        this.animation = requestAnimationFrame(() => this.animationLoop(fnName));
        if (!this.ctx || !this.canvas) return;

        const timeNow = performance.now();
        const timePassed = timeNow - this.timePrevious;
        if (timePassed < this.timeInterval) return;
        
        this.timePrevious = timeNow - (timePassed % this.timeInterval);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.pixels.length; i++) {
          this.pixels[i][fnName]();
        }
        if (this.pixels.every((pixel) => pixel.isIdle)) {
          cancelAnimationFrame(this.animation);
        }
      }
    }

    // --- 3. Web Component 등록 ---
    // useEffect 내부에서 클래스를 등록합니다.
    PixelCanvas.register();

  }, []); // 빈 배열은 이 useEffect가 클라이언트 마운트 시 한 번만 실행됨을 보장합니다.

  return null; // 이 컴포넌트 자체는 아무것도 렌더링하지 않습니다.
};

export default PixelCanvasRegistry;