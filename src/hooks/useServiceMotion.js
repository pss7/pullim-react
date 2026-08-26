import {
  useLayoutEffect
} from 'react';

import gsap from 'gsap';

import {
  ScrollTrigger
} from 'gsap/ScrollTrigger';

gsap.registerPlugin(
  ScrollTrigger
);

export default function useServiceMotion(
  pageRef,
  styles
) {
  useLayoutEffect(() => {
    const page =
      pageRef.current;

    if (!page) {
      return;
    }

    const sloganTriggers = [];
    const sloganTimelines = [];

    const popupState = {
      popup: null,
      popupImage: null,
      popupContents: [],
      sourceButton: null,
      sourceImage: null,
      sourceImageBox: null,
      sourceBoxVisibility: '',
      isAnimating: false,
      isOpen: false
    };

    let activeTimeline;
    let transitionImage;
    let refreshFrame;
    let isDestroyed = false;

    /* Lenis 스크롤 제어 */
    function controlScroll(
      action
    ) {
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

    /* 서비스 슬로건 */
    function initServiceSlogan() {
      const sloganBoxes =
        page.querySelectorAll(
          `.${styles.serviceBrandSloganBox}`
        );

      sloganBoxes.forEach(
        function (
          sloganBox,
          index
        ) {
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

          ScrollTrigger
            .getById(triggerId)
            ?.kill();

          gsap.set(
            sloganLines,
            {
              backgroundSize:
                '0% 100%, 100% 100%'
            }
          );

          const timeline =
            gsap.timeline({
              defaults: {
                ease: 'none'
              }
            });

          sloganLines.forEach(
            function (line) {
              timeline.to(
                line,
                {
                  backgroundSize:
                    '100% 100%, 100% 100%',
                  duration: 1
                }
              );
            }
          );

          const trigger =
            ScrollTrigger.create({
              id: triggerId,
              trigger: sloganBox,
              start: 'top 80%',
              end: 'max',
              animation: timeline,
              scrub: 1.2,
              invalidateOnRefresh: true
            });

          sloganTimelines.push(
            timeline
          );

          sloganTriggers.push(
            trigger
          );
        }
      );
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

    /* 전환용 이미지 생성 */
    function createTransitionImage(
      image
    ) {
      removeTransitionImage();

      const rect =
        image.getBoundingClientRect();

      const clonedImage =
        image.cloneNode(true);

      clonedImage.removeAttribute(
        'id'
      );

      clonedImage.className =
        'servicePopupTransitionImage';

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
          objectFit: 'cover',
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

    /* 팝업 상태 초기화 */
    function resetPopupState() {
      popupState.popup = null;
      popupState.popupImage = null;
      popupState.popupContents = [];
      popupState.sourceButton = null;
      popupState.sourceImage = null;
      popupState.sourceImageBox = null;
      popupState.sourceBoxVisibility = '';
      popupState.isAnimating = false;
      popupState.isOpen = false;
    }

    /* 팝업 이미지 로드 확인 */
    async function waitForImage(
      image
    ) {
      if (
        image.complete &&
        image.naturalWidth
      ) {
        return;
      }

      if (
        typeof image.decode ===
        'function'
      ) {
        try {
          await image.decode();
          return;
        } catch {
          /* 이미지 load 이벤트로 다시 확인 */
        }
      }

      await new Promise(
        function (resolve) {
          image.addEventListener(
            'load',
            resolve,
            {
              once: true
            }
          );

          image.addEventListener(
            'error',
            resolve,
            {
              once: true
            }
          );
        }
      );
    }

    /* 서비스 팝업 열기 */
    async function openPopup(
      event
    ) {
      event.preventDefault();

      if (
        popupState.isAnimating ||
        popupState.isOpen
      ) {
        return;
      }

      const openButton =
        event.currentTarget;

      const popupSelector =
        openButton.dataset.popup;

      const popup =
        page.querySelector(
          popupSelector
        );

      const sourceImageBox =
        openButton.querySelector(
          `.${styles.serviceImgBox}`
        );

      const sourceImage =
        sourceImageBox
          ?.querySelector(
            '.hover'
          ) ||
        sourceImageBox
          ?.querySelector(
            'img'
          );

      const popupImage =
        popup?.querySelector(
          '.servicePopupImage'
        );

      const closeButton =
        popup?.querySelector(
          '.servicePopupCloseBtn'
        );

      if (
        !popup ||
        !sourceImageBox ||
        !sourceImage ||
        !popupImage ||
        !closeButton
      ) {
        return;
      }

      popupState.popup =
        popup;

      popupState.popupImage =
        popupImage;

      popupState.sourceButton =
        openButton;

      popupState.sourceImage =
        sourceImage;

      popupState.sourceImageBox =
        sourceImageBox;

      popupState.sourceBoxVisibility =
        sourceImageBox.style.visibility;

      popupState.popupContents = [
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

      popupState.isAnimating =
        true;

      createTransitionImage(
        sourceImage
      );

      sourceImageBox.style.visibility =
        'hidden';

      popup.classList.add(
        'active'
      );

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

      await waitForImage(
        popupImage
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
        popupState.popupContents,
        {
          autoAlpha: 0,
          y: 30
        }
      );

      gsap.set(
        popup,
        {
          backgroundColor:
            'rgba(245,245,245,0)'
        }
      );

      activeTimeline =
        gsap.timeline({
          onComplete:
            function () {
              removeTransitionImage();

              popupState.isAnimating =
                false;

              popupState.isOpen =
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

      /* 배경 표시 */
      activeTimeline.to(
        popup,
        {
          backgroundColor:
            '#f5f5f5',

          duration: .6,
          ease: 'power2.out'
        },
        0
      );

      /* 팝업 콘텐츠 표시 */
      activeTimeline.to(
        popupState.popupContents,
        {
          autoAlpha: 1,
          y: 0,
          duration: .7,
          stagger: .06,
          ease: 'power3.out'
        },
        .45
      );

      /* 전환 이미지 숨기기 */
      activeTimeline.to(
        transitionImage,
        {
          autoAlpha: 0,
          duration: .25,
          ease: 'none'
        },
        1.1
      );

      /* 실제 팝업 이미지 표시 */
      activeTimeline.to(
        popupImage,
        {
          autoAlpha: 1,
          duration: .25,
          ease: 'none'
        },
        1.1
      );
    }

    /* 서비스 팝업 닫기 */
    function closePopup() {
      if (
        popupState.isAnimating ||
        !popupState.isOpen ||
        !popupState.popup ||
        !popupState.popupImage ||
        !popupState.sourceImage ||
        !popupState.sourceImageBox
      ) {
        return;
      }

      popupState.isAnimating =
        true;

      const popup =
        popupState.popup;

      const popupImage =
        popupState.popupImage;

      const popupImageRect =
        popupImage
          .getBoundingClientRect();

      const sourceImageRect =
        popupState.sourceImage
          .getBoundingClientRect();

      createTransitionImage(
        popupImage
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

              popupState.sourceImageBox
                .style.visibility =
                popupState
                  .sourceBoxVisibility;

              popup.classList.remove(
                'active'
              );

              popup.style.removeProperty(
                'visibility'
              );

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
                popupState.popupContents,
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

              document.body.classList.remove(
                'servicePopupOpen'
              );

              controlScroll('start');

              popupState.sourceButton
                ?.focus();

              resetPopupState();
            }
        });

      /* 팝업 콘텐츠 숨기기 */
      activeTimeline.to(
        popupState.popupContents,
        {
          autoAlpha: 0,
          y: 20,
          duration: .35,
          stagger: .03,
          ease: 'power2.in'
        },
        0
      );

      /* 팝업 이미지 축소 */
      activeTimeline.to(
        transitionImage,
        {
          top:
            sourceImageRect.top,

          left:
            sourceImageRect.left,

          width:
            sourceImageRect.width,

          height:
            sourceImageRect.height,

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
            'rgba(245,245,245,0)',

          duration: .7,
          ease: 'power2.inOut'
        },
        .25
      );

      /* 목록 이미지 다시 표시 */
      activeTimeline.set(
        popupState.sourceImageBox,
        {
          visibility: 'visible'
        },
        1.05
      );

      activeTimeline.to(
        transitionImage,
        {
          autoAlpha: 0,
          duration: .15,
          ease: 'none'
        },
        1.05
      );
    }

    /* ESC 키 닫기 */
    function handleKeydown(
      event
    ) {
      if (
        event.key === 'Escape'
      ) {
        closePopup();
      }
    }

    /* 팝업 이벤트 연결 */
    function initServicePopup() {
      const openButtons =
        page.querySelectorAll(
          '.servicePopupOpenBtn'
        );

      const closeButtons =
        page.querySelectorAll(
          '.servicePopupCloseBtn'
        );

      openButtons.forEach(
        function (button) {
          button.addEventListener(
            'click',
            openPopup
          );
        }
      );

      closeButtons.forEach(
        function (button) {
          button.addEventListener(
            'click',
            closePopup
          );
        }
      );

      document.addEventListener(
        'keydown',
        handleKeydown
      );

      return function () {
        openButtons.forEach(
          function (button) {
            button.removeEventListener(
              'click',
              openPopup
            );
          }
        );

        closeButtons.forEach(
          function (button) {
            button.removeEventListener(
              'click',
              closePopup
            );
          }
        );

        document.removeEventListener(
          'keydown',
          handleKeydown
        );
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

    /* 컴포넌트 종료 시 정리 */
    return function () {
      isDestroyed = true;

      window.cancelAnimationFrame(
        refreshFrame
      );

      cleanupPopup();

      activeTimeline?.kill();

      removeTransitionImage();

      if (
        popupState.sourceImageBox
      ) {
        popupState.sourceImageBox
          .style.visibility =
          popupState
            .sourceBoxVisibility;
      }

      page
        .querySelectorAll(
          '.servicePopupWrap'
        )
        .forEach(
          function (popup) {
            popup.classList.remove(
              'active'
            );

            popup.removeAttribute(
              'style'
            );

            popup.setAttribute(
              'aria-hidden',
              'true'
            );
          }
        );

      document.body.classList.remove(
        'servicePopupOpen'
      );

      controlScroll('start');

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