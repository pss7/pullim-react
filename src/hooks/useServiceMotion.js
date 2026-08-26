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
    const page = pageRef.current;

    if (!page) {
      return;
    }

    const sliderControllers =
      new Map();

    const sloganTriggers = [];
    const sloganTimelines = [];

    let refreshFrame;
    let activeTimeline;
    let transitionImage;
    let isDestroyed = false;

    const popupState = {
      popup: null,
      slider: null,
      controller: null,
      sourceImage: null,
      sourceVisibility: '',
      openButton: null,
      isAnimating: false,
      isOpen: false
    };

    /*
     * Lenis 스크롤 제어
     */
    function controlSmoothScroll(
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

    /*
     * 서비스 슬로건
     */
    function initServiceSlogan() {
      const sloganBoxes =
        page.querySelectorAll(
          `.${styles.serviceBrandSloganBox}`
        );

      if (!sloganBoxes.length) {
        return;
      }

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
            `service-slogan-fill-${index}`;

          ScrollTrigger
            .getById(
              triggerId
            )
            ?.kill();

          const holdState = {
            progress: 0
          };

          /*
           * 슬로건 초기 상태
           */
          gsap.set(
            sloganLines,
            {
              backgroundSize:
                '0% 100%, 100% 100%'
            }
          );

          const sloganTimeline =
            gsap.timeline({
              defaults: {
                ease: 'none'
              }
            });

          /*
           * 한 줄씩 채우기
           */
          sloganLines.forEach(
            function (line) {
              sloganTimeline.to(
                line,
                {
                  backgroundSize:
                    '100% 100%, 100% 100%',
                  duration: 1
                }
              );
            }
          );

          /*
           * 완성 상태 유지 구간
           */
          sloganTimeline.to(
            holdState,
            {
              progress: 1,
              duration: .9
            }
          );

          const sloganTrigger =
            ScrollTrigger.create({
              id: triggerId,
              trigger: sloganBox,
              start: 'top bottom',

              end() {
                const sloganRect =
                  sloganBox
                    .getBoundingClientRect();

                const sloganTop =
                  sloganRect.top +
                  window.scrollY;

                const sloganHeight =
                  sloganRect.height;

                const startPosition =
                  sloganTop -
                  window.innerHeight;

                const desiredEnd =
                  sloganTop +
                  sloganHeight -
                  window.innerHeight *
                  .35;

                const maximumScroll =
                  ScrollTrigger.maxScroll(
                    window
                  ) - 1;

                return Math.max(
                  startPosition + 1,
                  Math.min(
                    desiredEnd,
                    maximumScroll
                  )
                );
              },

              animation:
                sloganTimeline,

              scrub: .7,
              invalidateOnRefresh:
                true
            });

          sloganTriggers.push(
            sloganTrigger
          );

          sloganTimelines.push(
            sloganTimeline
          );
        }
      );
    }

    /*
     * 전환 이미지 제거
     */
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

    /*
     * 전환 이미지 생성
     *
     * 퍼블단과 동일하게 현재 이미지를
     * cloneNode로 복제합니다.
     */
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
          display: 'block',
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

          objectPosition:
            imageStyle.objectPosition,

          pointerEvents: 'none',
          zIndex: 100000,
          autoAlpha: 1,
          transformOrigin:
            'center center',
          force3D: true
        }
      );

      transitionImage =
        clonedImage;

      return clonedImage;
    }

    /*
     * 팝업 이미지 슬라이더
     *
     * 기존 화살표와 슬라이드 기능을
     * 변경하지 않습니다.
     */
    function initPopupSlider(
      popup
    ) {
      const slider =
        popup.querySelector(
          '.servicePopupSlider'
        );

      const track =
        popup.querySelector(
          '.servicePopupSliderTrack'
        );

      const slides = [
        ...popup.querySelectorAll(
          '.servicePopupSlide'
        )
      ];

      const cursor =
        popup.querySelector(
          '.servicePopupSliderCursor'
        );

      if (
        !slider ||
        !track ||
        !slides.length ||
        !cursor
      ) {
        return null;
      }

      let currentIndex = 0;

      /*
       * 슬라이드 위치 적용
       */
      function updateSlider() {
        track.style.transform =
          `translate3d(-${currentIndex * 100}%, 0, 0)`;
      }

      /*
       * 이전 이미지
       */
      function showPrevious() {
        currentIndex =
          Math.max(
            0,
            currentIndex - 1
          );

        updateSlider();
      }

      /*
       * 다음 이미지
       */
      function showNext() {
        currentIndex =
          Math.min(
            slides.length - 1,
            currentIndex + 1
          );

        updateSlider();
      }

      /*
       * 커서 위치와 방향
       */
      function handleMouseMove(
        event
      ) {
        const sliderRect =
          slider.getBoundingClientRect();

        const mouseX =
          event.clientX -
          sliderRect.left;

        const mouseY =
          event.clientY -
          sliderRect.top;

        const isPrevious =
          mouseX <
          sliderRect.width / 2;

        cursor.style.left =
          `${mouseX}px`;

        cursor.style.top =
          `${mouseY}px`;

        cursor.classList.add(
          'active'
        );

        cursor.classList.toggle(
          'isPrev',
          isPrevious
        );
      }

      /*
       * 커서 숨기기
       */
      function handleMouseLeave() {
        cursor.classList.remove(
          'active'
        );
      }

      /*
       * 이미지 좌우 클릭
       */
      function handleSliderClick(
        event
      ) {
        const sliderRect =
          slider.getBoundingClientRect();

        const isPrevious =
          event.clientX <
          sliderRect.left +
          sliderRect.width / 2;

        if (isPrevious) {
          showPrevious();
          return;
        }

        showNext();
      }

      /*
       * 키보드 이동
       */
      function handleSliderKeydown(
        event
      ) {
        if (
          event.key ===
          'ArrowLeft'
        ) {
          event.preventDefault();

          showPrevious();
        }

        if (
          event.key ===
          'ArrowRight'
        ) {
          event.preventDefault();

          showNext();
        }
      }

      slider.addEventListener(
        'mousemove',
        handleMouseMove
      );

      slider.addEventListener(
        'mouseleave',
        handleMouseLeave
      );

      slider.addEventListener(
        'click',
        handleSliderClick
      );

      slider.addEventListener(
        'keydown',
        handleSliderKeydown
      );

      updateSlider();

      return {
        slider,

        /*
         * 현재 이미지
         */
        getCurrentImage() {
          return slides[
            currentIndex
          ]?.querySelector(
            '.servicePopupImage'
          );
        },

        /*
         * 첫 이미지 초기화
         */
        reset() {
          currentIndex = 0;

          updateSlider();

          cursor.classList.remove(
            'active',
            'isPrev'
          );
        },

        /*
         * 이벤트 제거
         */
        destroy() {
          slider.removeEventListener(
            'mousemove',
            handleMouseMove
          );

          slider.removeEventListener(
            'mouseleave',
            handleMouseLeave
          );

          slider.removeEventListener(
            'click',
            handleSliderClick
          );

          slider.removeEventListener(
            'keydown',
            handleSliderKeydown
          );
        }
      };
    }

    /*
     * 목록 원본 이미지
     *
     * 퍼블단과 동일하게 serviceImgBox 안의
     * 첫 번째 이미지를 사용합니다.
     */
    function getSourceImage(
      openButton
    ) {
      return openButton.querySelector(
        `.${styles.serviceImgBox} img`
      );
    }

    /*
     * 팝업 콘텐츠
     */
    function getPopupContents(
      popup
    ) {
      return [
        ...popup.querySelectorAll(
          '.servicePopupKeyword'
        ),

        popup.querySelector(
          '.servicePopupImgBox > p'
        ),

        popup.querySelector(
          '.servicePopupTextBox'
        ),

        popup.querySelector(
          '.servicePopupCloseBtn'
        )
      ].filter(Boolean);
    }

    /*
     * 팝업 상태 초기화
     */
    function resetPopupState() {
      popupState.popup = null;
      popupState.slider = null;
      popupState.controller = null;
      popupState.sourceImage = null;
      popupState.sourceVisibility = '';
      popupState.openButton = null;
      popupState.isAnimating = false;
      popupState.isOpen = false;
    }
    /*
     * 서비스 팝업 열기
     */
    function openPopup(
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

      if (!popupSelector) {
        return;
      }

      const popup =
        page.querySelector(
          popupSelector
        );

      const controller =
        sliderControllers.get(
          popup
        );

      const slider =
        controller?.slider;

      const sourceImage =
        openButton.querySelector(
          `.${styles.serviceImgBox} img`
        );

      if (
        !popup ||
        !controller ||
        !slider ||
        !sourceImage
      ) {
        return;
      }

      activeTimeline?.kill();

      /*
       * 슬라이더 첫 이미지로 초기화
       */
      controller.reset();

      popupState.isAnimating =
        true;

      popupState.popup =
        popup;

      popupState.slider =
        slider;

      popupState.controller =
        controller;

      popupState.sourceImage =
        sourceImage;

      popupState.sourceVisibility =
        sourceImage.style.visibility;

      popupState.openButton =
        openButton;

      const sourceRect =
        sourceImage
          .getBoundingClientRect();

      /*
       * 목록 이미지 복제
       */
      createTransitionImage(
        sourceImage,
        sourceRect
      );

      /*
       * 목록 원본 이미지 숨김
       */
      sourceImage.style.visibility =
        'hidden';

      /*
       * 팝업 표시
       */
      popup.classList.add(
        'active'
      );

      popup.setAttribute(
        'aria-hidden',
        'false'
      );

      document.body.classList.add(
        'servicePopupOpen'
      );

      controlSmoothScroll(
        'stop'
      );

      /*
       * 개별 이미지가 아닌
       * 슬라이더 전체 위치를 사용합니다.
       */
      const sliderRect =
        slider.getBoundingClientRect();

      const popupContents =
        getPopupContents(
          popup
        );

      /*
       * 슬라이더 전체 숨김
       *
       * 슬라이더 안의 이미지 한 장만
       * 숨기면 배경 박스가 먼저 보입니다.
       */
      gsap.set(
        slider,
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
            'rgba(245,245,245,0)'
        }
      );

      activeTimeline =
        gsap.timeline({
          onComplete() {
            removeTransitionImage();

            popupState.isAnimating =
              false;

            popupState.isOpen =
              true;

            popup
              .querySelector(
                '.servicePopupCloseBtn'
              )
              ?.focus({
                preventScroll: true
              });
          }
        });

      /*
       * 목록 이미지에서
       * 슬라이더 전체 크기로 확대
       */
      activeTimeline.to(
        transitionImage,
        {
          top: sliderRect.top,
          left: sliderRect.left,
          width: sliderRect.width,
          height: sliderRect.height,
          duration: 1.35,
          ease: 'power4.inOut',
          force3D: true,
          overwrite: 'auto'
        },
        0
      );

      /*
       * 팝업 배경 표시
       */
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

      /*
       * 팝업 콘텐츠 표시
       */
      activeTimeline.to(
        popupContents,
        {
          autoAlpha: 1,
          y: 0,
          duration: .7,
          stagger: .06,
          ease: 'power3.out'
        },
        .45
      );

      /*
       * 복제 이미지와 실제 슬라이더 교차
       *
       * 퍼블단과 같은 시점입니다.
       */
      activeTimeline.to(
        transitionImage,
        {
          autoAlpha: 0,
          duration: .25,
          ease: 'none'
        },
        1.1
      );

      activeTimeline.to(
        slider,
        {
          autoAlpha: 1,
          duration: .25,
          ease: 'none'
        },
        1.1
      );
    }
    /*
     * 서비스 팝업 닫기
     */
    function closePopup() {
      if (
        popupState.isAnimating ||
        !popupState.isOpen ||
        !popupState.popup ||
        !popupState.slider ||
        !popupState.controller ||
        !popupState.sourceImage
      ) {
        return;
      }

      const popup =
        popupState.popup;

      const slider =
        popupState.slider;

      const controller =
        popupState.controller;

      const sourceImage =
        popupState.sourceImage;

      /*
       * 현재 보이는 슬라이드 이미지를
       * 복제 이미지로 사용합니다.
       *
       * 슬라이드 이동 로직은 건드리지 않습니다.
       */
      const currentImage =
        controller.getCurrentImage();

      if (!currentImage) {
        return;
      }

      activeTimeline?.kill();

      popupState.isAnimating =
        true;

      /*
       * 현재 이미지가 아니라
       * 슬라이더 전체 영역을 출발 위치로 사용합니다.
       */
      const sliderRect =
        slider.getBoundingClientRect();

      const sourceRect =
        sourceImage
          .getBoundingClientRect();

      createTransitionImage(
        currentImage,
        sliderRect
      );

      /*
       * 개별 이미지가 아닌
       * 슬라이더 전체를 숨깁니다.
       */
      gsap.set(
        slider,
        {
          autoAlpha: 0
        }
      );

      const popupContents =
        getPopupContents(
          popup
        );

      activeTimeline =
        gsap.timeline({
          onComplete() {
            removeTransitionImage();

            sourceImage.style.visibility =
              popupState.sourceVisibility;

            popup.classList.remove(
              'active'
            );

            popup.setAttribute(
              'aria-hidden',
              'true'
            );

            /*
             * 슬라이더 전체 스타일 초기화
             */
            gsap.set(
              slider,
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

            document.body.classList.remove(
              'servicePopupOpen'
            );

            controlSmoothScroll(
              'start'
            );

            const openButton =
              popupState.openButton;

            controller.reset();
            resetPopupState();

            openButton?.focus({
              preventScroll: true
            });
          }
        });

      /*
       * 팝업 콘텐츠 숨기기
       */
      activeTimeline.to(
        popupContents,
        {
          autoAlpha: 0,
          y: 20,
          duration: .35,
          stagger: .03,
          ease: 'power2.in'
        },
        0
      );

      /*
       * 슬라이더 전체 크기에서
       * 목록 이미지 크기로 축소
       */
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

      /*
       * 팝업 배경 숨기기
       */
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

      /*
       * 목록 원본 이미지 표시
       */
      activeTimeline.set(
        sourceImage,
        {
          visibility: 'visible'
        },
        1.05
      );

      /*
       * 복제 이미지 숨기기
       */
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

    /*
     * 서비스 팝업 초기화
     */
    function initServicePopup() {
      const openButtons = [
        ...page.querySelectorAll(
          '.servicePopupOpenBtn'
        )
      ];

      const popups = [
        ...page.querySelectorAll(
          '.servicePopupWrap'
        )
      ];

      if (
        !openButtons.length ||
        !popups.length
      ) {
        return;
      }

      /*
       * 팝업별 슬라이더 생성
       */
      popups.forEach(
        function (popup) {
          const controller =
            initPopupSlider(
              popup
            );

          if (controller) {
            sliderControllers.set(
              popup,
              controller
            );
          }
        }
      );

      /*
       * 팝업 열기
       */
      openButtons.forEach(
        function (button) {
          button.addEventListener(
            'click',
            openPopup
          );
        }
      );

      /*
       * 팝업 닫기
       */
      popups.forEach(
        function (popup) {
          const closeButton =
            popup.querySelector(
              '.servicePopupCloseBtn'
            );

          closeButton?.addEventListener(
            'click',
            closePopup
          );
        }
      );

      /*
       * ESC 닫기
       */
      function handleKeydown(
        event
      ) {
        if (
          event.key ===
          'Escape'
        ) {
          closePopup();
        }
      }

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

        popups.forEach(
          function (popup) {
            const closeButton =
              popup.querySelector(
                '.servicePopupCloseBtn'
              );

            closeButton?.removeEventListener(
              'click',
              closePopup
            );

            popup.classList.remove(
              'active'
            );

            popup.setAttribute(
              'aria-hidden',
              'true'
            );

            gsap.set(
              popup,
              {
                clearProps:
                  'backgroundColor'
              }
            );

            gsap.set(
              popup.querySelectorAll(
                '.servicePopupImage'
              ),
              {
                clearProps:
                  'opacity,visibility'
              }
            );
          }
        );

        document.removeEventListener(
          'keydown',
          handleKeydown
        );
      };
    }

    /*
     * 기능 실행
     */
    initServiceSlogan();

    const cleanupPopup =
      initServicePopup();

    /*
     * 첫 화면 위치 계산
     */
    refreshFrame =
      window.requestAnimationFrame(
        function () {
          ScrollTrigger.refresh();
        }
      );

    /*
     * 웹폰트 로드 후 위치 계산
     */
    if (document.fonts) {
      document.fonts.ready.then(
        function () {
          if (isDestroyed) {
            return;
          }

          ScrollTrigger.refresh();
        }
      );
    }

    /*
     * 컴포넌트 종료 시 정리
     */
    return function () {
      isDestroyed = true;

      window.cancelAnimationFrame(
        refreshFrame
      );

      activeTimeline?.kill();

      cleanupPopup?.();

      removeTransitionImage();

      sliderControllers.forEach(
        function (controller) {
          controller.destroy();
        }
      );

      sliderControllers.clear();

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

      if (
        popupState.sourceImage
      ) {
        popupState.sourceImage
          .style.visibility =
          popupState.sourceVisibility;
      }

      document.body.classList.remove(
        'servicePopupOpen'
      );

      controlSmoothScroll(
        'start'
      );
    };
  }, [
    pageRef,
    styles
  ]);
}