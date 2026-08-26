import { useLayoutEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useMainMotion(styles) {
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo(0, 0);

    const motionTriggers = [];
    const mediaContexts = [];
    const inlineStyleCache = new Map();

    let resizeTimer;
    let refreshFrame;
    let isDestroyed = false;

    function getClassSelector(className) {
      return `.${styles[className] || className}`;
    }

    function saveInlineStyle(element) {
      if (!element || inlineStyleCache.has(element)) {
        return;
      }

      inlineStyleCache.set(
        element,
        element.getAttribute('style')
      );
    }

    function setInlineStyle(element, style) {
      if (!element) {
        return;
      }

      saveInlineStyle(element);
      Object.assign(element.style, style);
    }

    function restoreInlineStyles() {
      inlineStyleCache.forEach((styleValue, element) => {
        if (styleValue === null) {
          element.removeAttribute('style');
          return;
        }

        element.setAttribute('style', styleValue);
      });

      inlineStyleCache.clear();
    }

    function createMotionTrigger(options) {
      const trigger = ScrollTrigger.create(options);

      motionTriggers.push(trigger);

      return trigger;
    }

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

    function updateScrollTrigger() {
      ScrollTrigger.update();
    }

    lenis.on('scroll', updateScrollTrigger);

    function updateLenis(time) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    function refreshMotion() {
      if (isDestroyed) {
        return;
      }

      lenis.resize();
      ScrollTrigger.refresh();
    }

    const motionContext = gsap.context(() => {
      /* 메인 비주얼 */
      function initVisualMotion() {
        const visualWrap =
          document.querySelector('#visualWrap');

        const visualBox =
          visualWrap?.querySelector(
            getClassSelector('visualBox')
          );

        if (!visualWrap || !visualBox) {
          return;
        }

        const visualVideo =
          visualWrap.querySelector(
            `${getClassSelector('visualVideoBox')} video`
          );

        const visualHeadings = [
          ...visualWrap.querySelectorAll(
            `${getClassSelector('visualText')} h2`
          )
        ];

        const popupContentBox =
          document.querySelector('#popupContentBox');

        const proposalDownloadBtn =
          visualWrap.querySelector(
            getClassSelector('proposalDownloadBtn')
          );

        const visualScrollBox =
          visualWrap.querySelector(
            getClassSelector('visualScrollBox')
          );

        const visualOverlayItems = [
          popupContentBox,
          visualScrollBox,
          proposalDownloadBtn
        ].filter(Boolean);

        const aboutWrap =
          document.querySelector('#aboutWrap');

        if (!visualVideo || !visualHeadings.length) {
          return;
        }

        ScrollTrigger
          .getById('visual-motion')
          ?.kill();

        /*
         * GSAP pin과 CSS sticky가 동시에 적용되는 것을 방지합니다.
         */
        setInlineStyle(visualWrap, {
          height: 'auto',
          position: 'relative',
          zIndex: '1'
        });

        setInlineStyle(visualBox, {
          position: 'relative',
          top: 'auto',
          overflow: 'hidden'
        });

        /*
         * 소개 영역이 비주얼 위로 올라오도록 설정합니다.
         */
        if (aboutWrap) {
          setInlineStyle(aboutWrap, {
            position: 'relative',
            zIndex: '20',
            marginTop: '-100vh',
            willChange: 'transform'
          });

          gsap.set(aboutWrap, {
            y: () => window.innerHeight * 0.5
          });
        }

        /*
         * 처음에는 텍스트를 가운데에 접어 놓습니다.
         */
        gsap.set(visualHeadings, {
          autoAlpha: 0,

          x(index, heading) {
            const headingRect =
              heading.getBoundingClientRect();

            const headingCenter =
              headingRect.left +
              headingRect.width / 2;

            return (
              window.innerWidth / 2 -
              headingCenter
            );
          },

          y: 0,
          rotation: 0,
          force3D: true
        });

        /*
         * 비디오는 가운데를 기준으로 양쪽으로 펼쳐집니다.
         */
        gsap.set(visualVideo, {
          autoAlpha: 0,
          scaleX: 0.01,
          scaleY: 1,
          transformOrigin: '50% 50%',
          force3D: true
        });

        popupContentBox?.classList.remove('active');
        proposalDownloadBtn?.classList.remove('active');

        /* 페이지 로드 모션 */
        const visualIntroTimeline = gsap.timeline({
          delay: 0.15,
          defaults: {
            overwrite: 'auto'
          }
        });

        visualIntroTimeline
          .to(
            visualVideo,
            {
              autoAlpha: 1,
              scaleX: 1,
              duration: 1.3,
              ease: 'power3.inOut',
              force3D: true
            },
            0
          )
          .to(
            visualHeadings,
            {
              autoAlpha: 1,
              x: 0,
              duration: 1.2,
              stagger: 0.04,
              ease: 'power4.inOut',
              force3D: true
            },
            0
          )
          .call(
            () => {
              if (isDestroyed) {
                return;
              }

              popupContentBox?.classList.add('active');
              proposalDownloadBtn?.classList.add('active');
            },
            null,
            0.25
          );

        const headingRotations = [
          50,
          -50,
          50,
          50,
          -50
        ];

        /*
         * 메인 비주얼 스크롤 모션
         */
        const visualScrollTimeline = gsap.timeline({
          scrollTrigger: {
            id: 'visual-motion',
            trigger: visualWrap,
            start: 'top top',

            end() {
              return `+=${window.innerHeight * 1.5}`;
            },

            pin: visualBox,
            pinSpacing: true,
            scrub: 0.35,
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        });

        /*
         * 스크롤을 시작하면:
         * - 채용 슬라이드
         * - 기업 소개 영상
         * - 스크롤 표시
         * - 제안서 버튼
         * 을 먼저 숨깁니다.
         */
        visualScrollTimeline.fromTo(
          visualOverlayItems,
          {
            autoAlpha: 1,
            y: 0
          },
          {
            autoAlpha: 0,
            y: 24,
            duration: 0.12,
            ease: 'none',
            immediateRender: false
          },
          0
        );

        /*
         * 비주얼 텍스트가 화면 아래까지 떨어집니다.
         */
        visualScrollTimeline.to(
          visualHeadings,
          {
            y() {
              return window.innerHeight * 1.1;
            },

            rotation(index) {
              return headingRotations[index] || 50;
            },

            duration: 0.62,
            stagger: 0.035,
            ease: 'none',
            force3D: true
          },
          0
        );

        /*
         * 마지막 구간에서 소개 영역을 올립니다.
         */
        if (aboutWrap) {
          visualScrollTimeline.to(
            aboutWrap,
            {
              y: 0,
              duration: 0.38,
              ease: 'none',
              force3D: true
            },
            0.62
          );
        }

        if (visualScrollTimeline.scrollTrigger) {
          motionTriggers.push(
            visualScrollTimeline.scrollTrigger
          );
        }
      }

      /* 프로젝트 영역 */
      function initProjectMotion() {
        const projectWrap =
          document.querySelector('#projectWrap');

        const projectContainer =
          projectWrap?.querySelector(
            getClassSelector('container')
          );

        const projectBox =
          projectWrap?.querySelector(
            getClassSelector('projectBox')
          );

        const projectList =
          projectWrap?.querySelector(
            getClassSelector('projectList')
          );

        const projectItems = projectList
          ? Array.from(
              projectList.querySelectorAll('li')
            )
          : [];

        if (
          !projectWrap ||
          !projectContainer ||
          !projectBox ||
          !projectList ||
          !projectItems.length
        ) {
          return;
        }

        const PROJECT_DISTANCE = 700;
        const CARD_WIDTH = 600;
        const CARD_VISIBLE = 60;
        const RIGHT_GAP = 60;

        function getProjectListWidth() {
          return projectList.clientWidth;
        }

        function getProjectCardWidth() {
          return Math.min(
            CARD_WIDTH,
            Math.max(
              getProjectListWidth() - RIGHT_GAP,
              0
            )
          );
        }

        function getProjectCurrentX() {
          return Math.max(
            getProjectListWidth() -
              getProjectCardWidth() -
              RIGHT_GAP,
            0
          );
        }

        const projectMedia = gsap.matchMedia();

        mediaContexts.push(projectMedia);

        /* PC 프로젝트 카드 */
        projectMedia.add(
          '(min-width: 769px)',
          () => {
            setInlineStyle(projectWrap, {
              height: ''
            });

            setInlineStyle(projectBox, {
              position: 'relative'
            });

            setInlineStyle(projectContainer, {
              height: 'auto'
            });

            setInlineStyle(projectList, {
              display: '',
              flexDirection: '',
              height: ''
            });

            projectItems.forEach((item, index) => {
              item.classList.remove(
                'active',
                'current',
                'prev'
              );

              setInlineStyle(item, {
                position: 'absolute',
                top: '0px',
                left: '0px',
                transition: 'none',
                zIndex: String(index + 10)
              });
            });

            /*
             * 모든 카드를 화면 오른쪽 밖에 배치합니다.
             */
            function setProjectStart() {
              gsap.set(projectItems, {
                x() {
                  return getProjectListWidth();
                },

                width() {
                  return getProjectCardWidth();
                }
              });
            }

            setProjectStart();

            const projectTimeline = gsap.timeline({
              defaults: {
                duration: 1,
                ease: 'none'
              }
            });

            projectItems.forEach((item, index) => {
              const timelinePosition = index;

              /*
               * 이전 카드는 너비를 줄이지 않습니다.
               * 왼쪽으로 60px 간격만 보이도록 겹칩니다.
               */
              if (index > 0) {
                projectTimeline.to(
                  projectItems[index - 1],
                  {
                    x:
                      (index - 1) *
                      CARD_VISIBLE
                  },
                  timelinePosition
                );
              }

              projectTimeline.to(
                item,
                {
                  x() {
                    return getProjectCurrentX();
                  },

                  width() {
                    return getProjectCardWidth();
                  }
                },
                timelinePosition
              );
            });

            ScrollTrigger
              .getById('project-motion')
              ?.kill();

            const projectTrigger =
              createMotionTrigger({
                id: 'project-motion',
                trigger: projectWrap,
                start: 'top top',

                end() {
                  return (
                    '+=' +
                    projectItems.length *
                      PROJECT_DISTANCE
                  );
                },

                animation: projectTimeline,
                pin: projectBox,
                pinSpacing: true,
                anticipatePin: 1,
                scrub: 0.8,
                invalidateOnRefresh: true,

                snap: {
                  snapTo:
                    1 / projectItems.length,

                  duration: {
                    min: 0.2,
                    max: 0.55
                  },

                  delay: 0.08,
                  directional: true,
                  ease: 'power1.inOut'
                },

                onRefreshInit:
                  setProjectStart
              });

            return () => {
              projectTrigger.kill();
              projectTimeline.kill();

              projectItems.forEach((item) => {
                item.classList.remove(
                  'active',
                  'current',
                  'prev'
                );
              });
            };
          }
        );

        /* 모바일 프로젝트 아코디언 */
        projectMedia.add(
          '(max-width: 768px)',
          () => {
            setInlineStyle(projectWrap, {
              height: 'auto'
            });

            setInlineStyle(projectBox, {
              position: 'relative'
            });

            setInlineStyle(projectContainer, {
              height: 'auto'
            });

            setInlineStyle(projectList, {
              display: 'flex',
              flexDirection: 'column',
              height: 'auto'
            });

            projectItems.forEach((item) => {
              item.classList.remove(
                'current',
                'prev'
              );

              setInlineStyle(item, {
                position: 'relative',
                top: 'auto',
                left: 'auto',
                width: '100%',
                transform: 'none',
                zIndex: 'auto'
              });
            });

            function handleProjectClick(event) {
              event.preventDefault();

              const currentItem =
                event.currentTarget;

              const willOpen =
                !currentItem.classList.contains(
                  'active'
                );

              projectItems.forEach((item) => {
                item.classList.remove('active');
              });

              if (willOpen) {
                currentItem.classList.add('active');
              }

              window.requestAnimationFrame(
                refreshMotion
              );
            }

            projectItems.forEach((item) => {
              item.addEventListener(
                'click',
                handleProjectClick
              );
            });

            return () => {
              projectItems.forEach((item) => {
                item.removeEventListener(
                  'click',
                  handleProjectClick
                );

                item.classList.remove('active');
              });
            };
          }
        );
      }

      /* 회사 정보 영역 */
      function initCompanyMotion() {
        const companyInfoWrap =
          document.querySelector(
            '#companyInfoWrap'
          );

        if (!companyInfoWrap) {
          return;
        }

        const companyNumbers = Array.from(
          companyInfoWrap.querySelectorAll(
            `${getClassSelector(
              'companyInfoNumber'
            )} strong`
          )
        );

        const companyImages = Array.from(
          companyInfoWrap.querySelectorAll(
            `${getClassSelector(
              'companyImgBox'
            )} img`
          )
        );

        let companyCountStarted = false;
        let companyImageIndex = -1;

        function updateCompanyImage(progress) {
          if (!companyImages.length) {
            return;
          }

          const nextIndex = Math.min(
            companyImages.length - 1,
            Math.floor(
              progress *
                companyImages.length
            )
          );

          if (companyImageIndex === nextIndex) {
            return;
          }

          companyImageIndex = nextIndex;

          companyImages.forEach(
            (image, index) => {
              image.classList.toggle(
                'active',
                index === companyImageIndex
              );
            }
          );
        }

        function startCompanyCount() {
          if (
            companyCountStarted ||
            !companyNumbers.length
          ) {
            return;
          }

          companyCountStarted = true;

          companyNumbers.forEach((number) => {
            const target = Number(
              number.dataset.target
            );

            if (!Number.isFinite(target)) {
              return;
            }

            const value = {
              current: 0
            };

            gsap.to(value, {
              current: target,
              duration: 1.5,
              ease: 'power3.out',

              onUpdate() {
                number.textContent =
                  Math.floor(
                    value.current
                  ).toLocaleString();
              },

              onComplete() {
                number.textContent =
                  target.toLocaleString();
              }
            });
          });
        }

        updateCompanyImage(0);

        createMotionTrigger({
          id: 'company-count',
          trigger: companyInfoWrap,
          start: 'top 80%',
          once: true,
          onEnter: startCompanyCount
        });

        createMotionTrigger({
          id: 'company-images',
          trigger: companyInfoWrap,
          start: 'top top',
          end: 'bottom bottom',

          onUpdate(self) {
            updateCompanyImage(self.progress);
          },

          onRefresh(self) {
            updateCompanyImage(self.progress);
          }
        });
      }

      /*
       * 회사 정보 영역을 고정하고
       * 문의 영역과 푸터를 함께 올립니다.
       */
      function initContactFooterMotion() {
        const companySection =
          document.querySelector(
            '#companyInfoWrap'
          );

        const companyLayout =
          companySection?.querySelector(
            getClassSelector(
              'companyInfoLayoutBox'
            )
          );

        const contactSection =
          document.querySelector(
            '#contactWrap'
          );

        const footer =
          document.querySelector(
            '#footerWrap'
          );

        if (
          !companySection ||
          !companyLayout ||
          !contactSection ||
          !footer
        ) {
          return;
        }

        ScrollTrigger
          .getById('company-contact-footer')
          ?.kill();

        createMotionTrigger({
          id: 'company-contact-footer',
          trigger: companyLayout,
          start: 'top top',

          end() {
            const companyBottomSpace =
              Math.max(
                0,
                companySection.offsetHeight -
                  companyLayout.offsetHeight
              );

            return (
              '+=' +
              (
                companyBottomSpace +
                contactSection.offsetHeight +
                footer.offsetHeight
              )
            );
          },

          pin: companyLayout,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true
        });
      }

      /* 문의 영역 타원선 */
      function initContactProjectLine() {
        const contactWrap =
          document.querySelector(
            '#contactWrap'
          );

        const projectText =
          contactWrap?.querySelector(
            getClassSelector(
              'contactProjectText'
            )
          );

        const projectLine =
          projectText?.querySelector(
            getClassSelector(
              'contactProjectLine'
            )
          );

        const projectPath =
          projectLine?.querySelector('path');

        if (
          !projectText ||
          !projectLine ||
          !projectPath
        ) {
          return;
        }

        const pathLength =
          projectPath.getTotalLength();

        gsap.set(projectLine, {
          visibility: 'hidden'
        });

        gsap.set(projectPath, {
          strokeDasharray:
            `${pathLength} ${pathLength}`,

          strokeDashoffset: pathLength
        });

        createMotionTrigger({
          id: 'contact-project-line',
          trigger: projectText,
          start: 'top 80%',
          once: true,

          onEnter() {
            gsap.set(projectLine, {
              visibility: 'visible'
            });

            gsap.fromTo(
              projectPath,
              {
                strokeDashoffset:
                  pathLength
              },
              {
                strokeDashoffset: 0,
                duration: 0.7,
                ease: 'none'
              }
            );
          }
        });
      }

      /* 한 줄씩 올라오는 텍스트 */
      function initScrollTextReveal() {
        const groups = Array.from(
          document.querySelectorAll(
            getClassSelector(
              'scrollRevealGroup'
            )
          )
        );

        if (!groups.length) {
          return;
        }

        groups.forEach((group) => {
          const texts = Array.from(
            group.querySelectorAll(
              getClassSelector(
                'scrollRevealText'
              )
            )
          );

          if (!texts.length) {
            return;
          }

          gsap.set(texts, {
            yPercent: 120,
            visibility: 'visible'
          });

          createMotionTrigger({
            trigger: group,
            start: 'top 90%',
            once: true,

            onEnter() {
              gsap.to(texts, {
                yPercent: 0,
                duration: 1.5,
                stagger: 0.07,
                ease: 'power4.out',
                overwrite: 'auto',
                force3D: true
              });
            }
          });
        });
      }

      initVisualMotion();
      initProjectMotion();
      initCompanyMotion();
      initContactFooterMotion();
      initContactProjectLine();
      initScrollTextReveal();
    });

    refreshFrame =
      window.requestAnimationFrame(
        refreshMotion
      );

    function handleWindowLoad() {
      refreshMotion();
    }

    if (document.readyState !== 'complete') {
      window.addEventListener(
        'load',
        handleWindowLoad,
        {
          once: true
        }
      );
    }

    if (document.fonts) {
      document.fonts.ready.then(() => {
        refreshMotion();
      });
    }

    function handleResize() {
      window.clearTimeout(resizeTimer);

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

    return () => {
      isDestroyed = true;

      window.clearTimeout(resizeTimer);

      window.cancelAnimationFrame(
        refreshFrame
      );

      window.removeEventListener(
        'load',
        handleWindowLoad
      );

      window.removeEventListener(
        'resize',
        handleResize
      );

      motionTriggers.forEach((trigger) => {
        trigger.kill();
      });

      mediaContexts.forEach(
        (mediaContext) => {
          mediaContext.revert();
        }
      );

      motionContext.revert();

      document
        .querySelector('#popupContentBox')
        ?.classList.remove('active');

      document
        .querySelector(
          getClassSelector(
            'proposalDownloadBtn'
          )
        )
        ?.classList.remove('active');

      lenis.off(
        'scroll',
        updateScrollTrigger
      );

      gsap.ticker.remove(updateLenis);
      lenis.destroy();

      if (window.lenis === lenis) {
        delete window.lenis;
      }

      restoreInlineStyles();
    };
  }, [styles]);
}