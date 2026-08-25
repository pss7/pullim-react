import { useLayoutEffect } from 'react';

import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';

import 'aos/dist/aos.css';

gsap.registerPlugin(ScrollTrigger);

let isAosInitialized = false;

export default function useSubMotion(
  pageRef
) {
  useLayoutEffect(() => {
    const page = pageRef.current;

    if (!page) {
      return;
    }

    /* 새로고침 시 최상단 이동 */
    if (
      'scrollRestoration' in
      window.history
    ) {
      window.history.scrollRestoration =
        'manual';
    }

    window.scrollTo(0, 0);

    const subTopBox =
      page.querySelector(
        '.subTopBox'
      );

    let firstFrame;
    let secondFrame;
    let refreshFrame;
    let isDestroyed = false;

    /* 부드러운 스크롤 */
    const lenis = new Lenis({
      lerp: 0.045,
      smoothWheel: true,
      wheelMultiplier: 0.75,
      syncTouch: false,
      respectReducedMotion: false
    });

    window.lenis = lenis;

    /* Lenis와 ScrollTrigger 연결 */
    function updateScrollTrigger() {
      ScrollTrigger.update();
    }

    lenis.on(
      'scroll',
      updateScrollTrigger
    );

    /* GSAP 프레임에서 Lenis 실행 */
    function updateLenis(time) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    /* AOS 초기화 */
    if (!isAosInitialized) {
      AOS.init({
        duration: 1500,
        easing: 'ease-out-cubic',
        once: true
      });

      isAosInitialized = true;
    }

    /* 상단 타이틀 로드 모션 */
    if (subTopBox) {
      subTopBox.classList.remove(
        'active'
      );

      firstFrame =
        window.requestAnimationFrame(
          function () {
            secondFrame =
              window.requestAnimationFrame(
                function () {
                  if (isDestroyed) {
                    return;
                  }

                  subTopBox.classList.add(
                    'active'
                  );
                }
              );
          }
        );
    }

    /* 위치 다시 계산 */
    function refreshMotion() {
      if (isDestroyed) {
        return;
      }

      lenis.resize();
      AOS.refreshHard();
      ScrollTrigger.refresh();
    }

    refreshFrame =
      window.requestAnimationFrame(
        refreshMotion
      );

    /* 이미지 로드 후 위치 계산 */
    function handleWindowLoad() {
      refreshMotion();
    }

    if (
      document.readyState !==
      'complete'
    ) {
      window.addEventListener(
        'load',
        handleWindowLoad,
        {
          once: true
        }
      );
    }

    /* 컴포넌트 종료 시 정리 */
    return function () {
      isDestroyed = true;

      window.cancelAnimationFrame(
        firstFrame
      );

      window.cancelAnimationFrame(
        secondFrame
      );

      window.cancelAnimationFrame(
        refreshFrame
      );

      window.removeEventListener(
        'load',
        handleWindowLoad
      );

      subTopBox?.classList.remove(
        'active'
      );

      lenis.off(
        'scroll',
        updateScrollTrigger
      );

      gsap.ticker.remove(
        updateLenis
      );

      lenis.destroy();

      if (window.lenis === lenis) {
        delete window.lenis;
      }
    };
  }, [pageRef]);
}