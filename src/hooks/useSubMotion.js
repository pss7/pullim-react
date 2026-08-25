import {
  useLayoutEffect
} from 'react';

import Lenis from 'lenis';
import gsap from 'gsap';
import {
  ScrollTrigger
} from 'gsap/ScrollTrigger';
import AOS from 'aos';

import 'aos/dist/aos.css';

gsap.registerPlugin(
  ScrollTrigger
);

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
    let resizeTimer;
    let isDestroyed = false;

    /* 부드러운 스크롤 */
    const lenis = new Lenis({
      lerp: 0.045,
      smoothWheel: true,
      wheelMultiplier: 0.75,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
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
      lenis.raf(
        time * 1000
      );
    }

    gsap.ticker.add(
      updateLenis
    );

    /* 프레임 지연 보정 해제 */
    gsap.ticker.lagSmoothing(0);

    /* AOS 초기화 */
    if (!isAosInitialized) {
      AOS.init({
        duration: 1500,
        easing: 'ease-out-cubic',
        offset: 80,
        once: true,
        mirror: false
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

    /*
     * GSAP 모션 범위
     * 현재 페이지 내부의 모션만 생성합니다.
     */
    const motionContext =
      gsap.context(
        function () {
          /* 한 줄씩 아래에서 위로 등장 */
          const revealGroups =
            page.querySelectorAll(
              '.scrollRevealGroup'
            );

          revealGroups.forEach(
            function (group) {
              const texts = [
                ...group.querySelectorAll(
                  '.scrollRevealText'
                )
              ];

              if (!texts.length) {
                return;
              }

              /*
               * 초기 상태부터 완료 상태까지 지정
               * autoAlpha는 opacity와 visibility를
               * 동시에 제어합니다.
               */
              gsap.fromTo(
                texts,
                {
                  yPercent: 120,
                  autoAlpha: 0
                },
                {
                  yPercent: 0,
                  autoAlpha: 1,
                  duration: 1.5,
                  stagger: 0.1,
                  ease: 'power4.out',
                  force3D: true,
                  overwrite: 'auto',

                  scrollTrigger: {
                    trigger: group,
                    start: 'top 85%',
                    once: true,
                    invalidateOnRefresh: true
                  }
                }
              );
            }
          );
        },
        page
      );

    /* 위치 다시 계산 */
    function refreshMotion() {
      if (isDestroyed) {
        return;
      }

      lenis.resize();
      AOS.refreshHard();
      ScrollTrigger.refresh();
    }

    /* 첫 화면 위치 계산 */
    refreshFrame =
      window.requestAnimationFrame(
        refreshMotion
      );

    /* 이미지 로드 후 위치 계산 */
    function handleWindowLoad() {
      refreshMotion();
    }

    if (
      document.readyState ===
      'complete'
    ) {
      refreshMotion();
    } else {
      window.addEventListener(
        'load',
        handleWindowLoad,
        {
          once: true
        }
      );
    }

    /* 웹폰트 로드 후 위치 계산 */
    if (document.fonts) {
      document.fonts.ready.then(
        function () {
          if (isDestroyed) {
            return;
          }

          refreshMotion();
        }
      );
    }

    /* 화면 크기 변경 후 위치 계산 */
    function handleResize() {
      window.clearTimeout(
        resizeTimer
      );

      resizeTimer =
        window.setTimeout(
          refreshMotion,
          150
        );
    }

    window.addEventListener(
      'resize',
      handleResize
    );

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

      window.clearTimeout(
        resizeTimer
      );

      window.removeEventListener(
        'load',
        handleWindowLoad
      );

      window.removeEventListener(
        'resize',
        handleResize
      );

      subTopBox?.classList.remove(
        'active'
      );

      /* 현재 페이지의 GSAP 모션 제거 */
      motionContext.revert();

      lenis.off(
        'scroll',
        updateScrollTrigger
      );

      gsap.ticker.remove(
        updateLenis
      );

      lenis.destroy();

      if (
        window.lenis === lenis
      ) {
        delete window.lenis;
      }
    };
  }, [pageRef]);
}