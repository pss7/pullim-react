import { useLayoutEffect } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useServiceMotion(
  pageRef,
  styles
) {
  useLayoutEffect(() => {
    const page = pageRef.current;

    if (!page) {
      return;
    }

    const sloganTriggers = [];
    const sloganTimelines = [];

    let refreshFrame;
    let activeTimeline;
    let transitionImage;
    let isDestroyed = false;

    const state = {
      sourceImage: null,
      sourceVisibility: '',
      isAnimating: false,
      isOpen: false
    };

    /* 서비스 슬로건 */
    function initServiceSlogan() {
      const sloganBoxes =
        page.querySelectorAll(
          `.${styles.serviceBrandSloganBox}`
        );

      if (!sloganBoxes.length) {
        return;
      }

      sloganBoxes.forEach(
        function (sloganBox, index) {
          const sloganLines = [
            ...sloganBox.querySelectorAll(
              `.${styles.serviceBrandSloganLine}`
            )
          ];

          if (!sloganLines.length) {
            return;
          }

          const triggerId =
            `service-slogan-${index}`;

          /* 기존 트리거 제거 */
          ScrollTrigger
            .getById(triggerId)
            ?.kill();

          /* 텍스트 채우기 초기 상태 */
          gsap.set(
            sloganLines,
            {
              backgroundSize:
                '0% 100%, 100% 100%'
            }
          );

          /* 줄마다 순차적으로 채우기 */
          const sloganTimeline =
            gsap.timeline({
              defaults: {
                ease: 'none'
              }
            });

          sloganLines.forEach(
            function (sloganLine) {
              sloganTimeline.to(
                sloganLine,
                {
                  backgroundSize:
                    '100% 100%, 100% 100%',
                  duration: 1
                }
              );
            }
          );

          /*
           * 슬로건이 화면 80% 지점에 들어오면 시작하고
           * 페이지 마지막까지 천천히 채웁니다.
           */
          const sloganTrigger =
            ScrollTrigger.create({
              id: triggerId,
              trigger: sloganBox,
              start: 'top 80%',
              end: 'max',
              animation: sloganTimeline,
              scrub: 1.2,
              invalidateOnRefresh: true
            });

          sloganTimelines.push(
            sloganTimeline
          );

          sloganTriggers.push(
            sloganTrigger
          );
        }
      );
    }

    /* 서비스 팝업 */
    function initServicePopup() {
      const popup =
        page.querySelector(
          '#servicePopupWrap'
        );

      if (!popup) {
        return function () { };
      }

      const openButtons =
        page.querySelectorAll(
          '.servicePopupOpenBtn'
        );

      const closeButton =
        popup.querySelector(
          '.servicePopupCloseBtn'
        );

      const popupImage =
        popup.querySelector(
          '.servicePopupImage'
        );

      const popupContents = [
        ...popup.querySelectorAll(
          '.servicePopupKeyword'
        ),
        popup.querySelector(
          '.servicePopupImgBox > p'
        ),
        popup.querySelector(
          '.servicePopupTextBox'
        ),
        closeButton
      ].filter(Boolean);

      if (
        !openButtons.length ||
        !closeButton ||
        !popupImage
      ) {
        return function () { };
      }

      /* Lenis 제어 */
      function controlScroll(action) {
        const lenis =
          window.lenis;

        if (
          lenis &&
          typeof lenis[action] ===
          'function'
        ) {
          lenis[action]();
        }
      }

      /* 팝업 이미지 로드 */
      function loadPopupImage(
        imageSource
      ) {
        return new Promise(
          function (resolve) {
            if (!imageSource) {
              resolve();
              return;
            }

            if (
              popupImage.getAttribute(
                'src'
              ) !== imageSource
            ) {
              popupImage.setAttribute(
                'src',
                imageSource
              );
            }

            if (
              popupImage.complete &&
              popupImage.naturalWidth
            ) {
              resolve();
              return;
            }

            popupImage.addEventListener(
              'load',
              resolve,
              {
                once: true
              }
            );

            popupImage.addEventListener(
              'error',
              resolve,
              {
                once: true
              }
            );
          }
        );
      }

      /* 전환용 이미지 생성 */
      function createTransitionImage(
        image,
        rect
      ) {
        removeTransitionImage();

        const clonedImage =
          image.cloneNode(true);

        const imageStyle =
          window.getComputedStyle(
            image
          );

        clonedImage.removeAttribute(
          'id'
        );

        clonedImage.classList.add(
          'servicePopupTransitionImage'
        );

        document.body.appendChild(
          clonedImage
        );

        gsap.set(
          clonedImage,
          {
            position: 'fixed',
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            margin: 0,

            objectFit:
              imageStyle.objectFit ===
                'fill'
                ? 'cover'
                : imageStyle.objectFit,

            autoAlpha: 1,
            pointerEvents: 'none',
            transformOrigin:
              'center center',
            zIndex: 100000
          }
        );

        transitionImage =
          clonedImage;

        return clonedImage;
      }

      /* 전환용 이미지 제거 */
      function removeTransitionImage() {
        if (!transitionImage) {
          return;
        }

        gsap.killTweensOf(
          transitionImage
        );

        transitionImage.remove();

        transitionImage = null;
      }

      /* 팝업 열기 */
      async function openPopup(event) {
        event.preventDefault();

        if (
          state.isAnimating ||
          state.isOpen
        ) {
          return;
        }

        const openButton =
          event.currentTarget;

        const sourceImage =
          openButton.querySelector(
            `.${styles.serviceImgBox} img`
          );

        if (!sourceImage) {
          return;
        }

        state.isAnimating = true;
        state.sourceImage =
          sourceImage;

        state.sourceVisibility =
          sourceImage.style.visibility;

        const sourceRect =
          sourceImage
            .getBoundingClientRect();

        createTransitionImage(
          sourceImage,
          sourceRect
        );

        sourceImage.style.visibility =
          'hidden';

        popup.style.display =
          'flex';

        popup.style.visibility =
          'hidden';

        popup.setAttribute(
          'aria-hidden',
          'false'
        );

        document.body.classList.add(
          'servicePopupOpen'
        );

        controlScroll('stop');

        const popupImageSource =
          openButton.dataset
            .popupImage;

        const popupImageAlt =
          openButton.dataset
            .popupAlt || '';

        popupImage.alt =
          popupImageAlt;

        await loadPopupImage(
          popupImageSource
        );

        if (isDestroyed) {
          return;
        }

        popup.style.visibility =
          'visible';

        const popupImageRect =
          popupImage
            .getBoundingClientRect();

        gsap.set(
          popupImage,
          {
            autoAlpha: 0
          }
        );

        gsap.set(
          popupContents,
          {
            autoAlpha: 0,
            y: 30
          }
        );

        gsap.set(
          popup,
          {
            backgroundColor:
              'rgba(245, 245, 245, 0)'
          }
        );

        activeTimeline =
          gsap.timeline({
            onComplete:
              function () {
                removeTransitionImage();

                state.isAnimating =
                  false;

                state.isOpen =
                  true;

                closeButton.focus();
              }
          });

        /* 목록 이미지에서 팝업 이미지로 확대 */
        activeTimeline.to(
          transitionImage,
          {
            top:
              popupImageRect.top,

            left:
              popupImageRect.left,

            width:
              popupImageRect.width,

            height:
              popupImageRect.height,

            duration: 1.35,
            ease: 'power4.inOut',
            force3D: true,
            overwrite: 'auto'
          },
          0
        );

        /* 팝업 배경 표시 */
        activeTimeline.to(
          popup,
          {
            backgroundColor:
              '#f5f5f5',

            duration: 0.6,
            ease: 'power2.out'
          },
          0
        );

        /* 팝업 콘텐츠 표시 */
        activeTimeline.to(
          popupContents,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.06,
            ease: 'power3.out'
          },
          0.45
        );

        /* 전환 이미지 숨기기 */
        activeTimeline.to(
          transitionImage,
          {
            autoAlpha: 0,
            duration: 0.25,
            ease: 'none'
          },
          1.1
        );

        /* 실제 팝업 이미지 표시 */
        activeTimeline.to(
          popupImage,
          {
            autoAlpha: 1,
            duration: 0.25,
            ease: 'none'
          },
          1.1
        );
      }

      /* 팝업 닫기 */
      function closePopup() {
        if (
          state.isAnimating ||
          !state.isOpen ||
          !state.sourceImage
        ) {
          return;
        }

        state.isAnimating = true;

        const popupImageRect =
          popupImage
            .getBoundingClientRect();

        const sourceRect =
          state.sourceImage
            .getBoundingClientRect();

        createTransitionImage(
          popupImage,
          popupImageRect
        );

        gsap.set(
          popupImage,
          {
            autoAlpha: 0
          }
        );

        activeTimeline =
          gsap.timeline({
            onComplete:
              function () {
                removeTransitionImage();

                state.sourceImage
                  .style.visibility =
                  state.sourceVisibility;

                popup.style.display =
                  'none';

                popup.style.visibility =
                  'hidden';

                popup.setAttribute(
                  'aria-hidden',
                  'true'
                );

                gsap.set(
                  popupImage,
                  {
                    clearProps:
                      'opacity,visibility'
                  }
                );

                gsap.set(
                  popupContents,
                  {
                    clearProps:
                      'opacity,visibility,transform'
                  }
                );

                gsap.set(
                  popup,
                  {
                    clearProps:
                      'backgroundColor'
                  }
                );

                document.body
                  .classList.remove(
                    'servicePopupOpen'
                  );

                controlScroll(
                  'start'
                );

                const sourceButton =
                  state.sourceImage
                    .closest(
                      '.servicePopupOpenBtn'
                    );

                state.sourceImage =
                  null;

                state.sourceVisibility =
                  '';

                state.isAnimating =
                  false;

                state.isOpen =
                  false;

                sourceButton?.focus();
              }
          });

        /* 팝업 콘텐츠 숨기기 */
        activeTimeline.to(
          popupContents,
          {
            autoAlpha: 0,
            y: 20,
            duration: 0.35,
            stagger: 0.03,
            ease: 'power2.in'
          },
          0
        );

        /* 팝업 이미지에서 목록 이미지로 축소 */
        activeTimeline.to(
          transitionImage,
          {
            top: sourceRect.top,
            left: sourceRect.left,
            width: sourceRect.width,
            height: sourceRect.height,
            duration: 1.2,
            ease: 'power4.inOut',
            force3D: true,
            overwrite: 'auto'
          },
          0
        );

        /* 팝업 배경 숨기기 */
        activeTimeline.to(
          popup,
          {
            backgroundColor:
              'rgba(245, 245, 245, 0)',

            duration: 0.7,
            ease: 'power2.inOut'
          },
          0.25
        );

        /* 목록 이미지 다시 표시 */
        activeTimeline.set(
          state.sourceImage,
          {
            visibility:
              'visible'
          },
          1.05
        );

        activeTimeline.to(
          transitionImage,
          {
            autoAlpha: 0,
            duration: 0.15,
            ease: 'none'
          },
          1.05
        );
      }

      /* ESC 키 닫기 */
      function handleKeydown(event) {
        if (
          event.key ===
          'Escape'
        ) {
          closePopup();
        }
      }

      openButtons.forEach(
        function (button) {
          button.addEventListener(
            'click',
            openPopup
          );
        }
      );

      closeButton.addEventListener(
        'click',
        closePopup
      );

      document.addEventListener(
        'keydown',
        handleKeydown
      );

      /* 팝업 이벤트 정리 */
      return function () {
        openButtons.forEach(
          function (button) {
            button.removeEventListener(
              'click',
              openPopup
            );
          }
        );

        closeButton.removeEventListener(
          'click',
          closePopup
        );

        document.removeEventListener(
          'keydown',
          handleKeydown
        );

        activeTimeline?.kill();

        removeTransitionImage();

        if (state.sourceImage) {
          state.sourceImage
            .style.visibility =
            state.sourceVisibility;
        }

        popup.style.display =
          'none';

        popup.style.visibility =
          'hidden';

        popup.setAttribute(
          'aria-hidden',
          'true'
        );

        document.body.classList.remove(
          'servicePopupOpen'
        );

        controlScroll('start');
      };
    }

    initServiceSlogan();

    const cleanupPopup =
      initServicePopup();

    refreshFrame =
      window.requestAnimationFrame(
        function () {
          ScrollTrigger.refresh();
        }
      );

    /* 서비스 페이지 종료 시 정리 */
    return function () {
      isDestroyed = true;

      window.cancelAnimationFrame(
        refreshFrame
      );

      cleanupPopup();

      sloganTriggers.forEach(
        function (trigger) {
          trigger.kill();
        }
      );

      sloganTimelines.forEach(
        function (timeline) {
          timeline.kill();
        }
      );
    };
  }, [pageRef, styles]);
}