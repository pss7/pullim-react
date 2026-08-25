import { useLayoutEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useMainMotion(styles) {
  useLayoutEffect(() => {
    /* 페이지 새로고침 시 최상단 이동 */
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo(0, 0);

    const motionTriggers = [];
    const mediaContexts = [];
    const inlineStyleCache = new Map();

    let introTimer;
    let resizeTimer;
    let refreshFrame;
    let isDestroyed = false;

    /* CSS Module 클래스 선택자 */
    function getClassSelector(className) {
      return `.${styles[className] || className}`;
    }

    /* 기존 인라인 스타일 저장 */
    function saveInlineStyle(element) {
      if (
        !element ||
        inlineStyleCache.has(element)
      ) {
        return;
      }

      inlineStyleCache.set(
        element,
        element.getAttribute('style')
      );
    }

    /* 인라인 스타일 적용 */
    function setInlineStyle(element, style) {
      if (!element) {
        return;
      }

      saveInlineStyle(element);
      Object.assign(element.style, style);
    }

    /* 기존 인라인 스타일 복구 */
    function restoreInlineStyles() {
      inlineStyleCache.forEach(
        function (styleValue, element) {
          if (styleValue === null) {
            element.removeAttribute('style');
            return;
          }

          element.setAttribute(
            'style',
            styleValue
          );
        }
      );

      inlineStyleCache.clear();
    }

    /* ScrollTrigger 생성 및 저장 */
    function createMotionTrigger(options) {
      const trigger =
        ScrollTrigger.create(options);

      motionTriggers.push(trigger);

      return trigger;
    }

    /* Lenis 초기화 */
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
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(updateLenis);

    /* 프레임 지연 보정 해제 */
    gsap.ticker.lagSmoothing(0);

    /* 스크롤 위치 재계산 */
    function refreshMotion() {
      if (isDestroyed) {
        return;
      }

      lenis.resize();
      ScrollTrigger.refresh();
    }

    const motionContext = gsap.context(
      function () {

        /* 비주얼 영역 */
        function initVisualMotion() {
          const visualWrap =
            document.querySelector(
              '#visualWrap'
            );

          const visualBox =
            visualWrap?.querySelector(
              getClassSelector(
                'visualBox'
              )
            );

          if (
            !visualWrap ||
            !visualBox
          ) {
            return;
          }

          const visualVideo =
            visualWrap.querySelector(
              `${getClassSelector(
                'visualVideoBox'
              )} video`
            );

          const visualHeadings = [
            ...visualWrap.querySelectorAll(
              `${getClassSelector(
                'visualText'
              )} h2`
            )
          ];

          const popupContentBox =
            document.querySelector(
              '#popupContentBox'
            );

          const proposalDownloadBtn =
            document.querySelector(
              getClassSelector(
                'proposalDownloadBtn'
              )
            );

          const aboutWrap =
            document.querySelector(
              '#aboutWrap'
            );

          if (
            !visualVideo ||
            !visualHeadings.length
          ) {
            return;
          }

          /* 기존 비주얼 트리거 제거 */
          ScrollTrigger
            .getById('visual-motion')
            ?.kill();

          /* sticky와 pin 충돌 방지 */
          setInlineStyle(
            visualWrap,
            {
              height: 'auto',
              position: 'relative',
              zIndex: '1'
            }
          );

          setInlineStyle(
            visualBox,
            {
              position: 'relative',
              top: 'auto',
              overflow: 'hidden'
            }
          );

          /*
           * 소개 영역을 비주얼 위로 올릴 준비
           * pinSpacing으로 생기는 공간을 상쇄합니다.
           */
          if (aboutWrap) {
            setInlineStyle(
              aboutWrap,
              {
                position: 'relative',
                zIndex: '20',
                marginTop: '-100vh',
                willChange: 'transform'
              }
            );

            gsap.set(
              aboutWrap,
              {
                y: function () {
                  return (
                    window.innerHeight * 0.5
                  );
                }
              }
            );
          }

          /* 최종 위치를 기준으로 텍스트를 중앙에 접기 */
          gsap.set(
            visualHeadings,
            {
              autoAlpha: 0,

              x: function (
                index,
                heading
              ) {
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
            }
          );

          /* 비디오는 중앙에서 양쪽으로 펼쳐지도록 설정 */
          gsap.set(
            visualVideo,
            {
              autoAlpha: 0,
              scaleX: 0.01,
              scaleY: 1,
              transformOrigin: '50% 50%',
              force3D: true
            }
          );

          popupContentBox?.classList.remove(
            'active'
          );

          proposalDownloadBtn?.classList.remove(
            'active'
          );

          /* 로드 모션 */
          const visualIntroTimeline =
            gsap.timeline({
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
              function () {
                if (isDestroyed) {
                  return;
                }

                popupContentBox?.classList.add(
                  'active'
                );

                proposalDownloadBtn?.classList.add(
                  'active'
                );
              },
              null,
              0.25
            );

          /* 텍스트 회전 방향 */
          const headingRotations = [
            50,
            -50,
            50,
            50,
            -50
          ];

          /*
           * 스크롤 모션
           * 기존 3배에서 1.5배로 줄였습니다.
           */
          const visualScrollTimeline =
            gsap.timeline({
              scrollTrigger: {
                id: 'visual-motion',
                trigger: visualWrap,
                start: 'top top',

                end: function () {
                  return (
                    '+=' +
                    window.innerHeight * 1.5
                  );
                },

                pin: visualBox,
                pinSpacing: true,
                scrub: 0.35,
                anticipatePin: 1,
                invalidateOnRefresh: true
              }
            });

          /* 텍스트가 화면 아래까지 떨어지는 구간 */
          visualScrollTimeline.to(
            visualHeadings,
            {
              y: function () {
                return (
                  window.innerHeight * 1.1
                );
              },

              rotation: function (index) {
                return (
                  headingRotations[index] ||
                  50
                );
              },

              duration: 0.62,
              stagger: 0.035,
              ease: 'none',
              force3D: true
            },
            0
          );

          /* 마지막 구간에서 소개 영역 전체 올리기 */
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

          /*
           * 기존 useMainMotion 정리 코드에서
           * 함께 제거될 수 있도록 트리거 저장
           */
          if (
            visualScrollTimeline.scrollTrigger
          ) {
            motionTriggers.push(
              visualScrollTimeline.scrollTrigger
            );
          }
        }

        /* 프로젝트 영역 */
        function initProjectMotion() {
          const projectWrap =
            document.querySelector(
              '#projectWrap'
            );

          const projectContainer =
            projectWrap?.querySelector(
              getClassSelector(
                'container'
              )
            );

          const projectBox =
            projectWrap?.querySelector(
              getClassSelector(
                'projectBox'
              )
            );

          const projectList =
            projectWrap?.querySelector(
              getClassSelector(
                'projectList'
              )
            );

          const projectItems =
            projectList
              ? Array.from(
                projectList.querySelectorAll(
                  'li'
                )
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
          const PREVIOUS_WIDTH = 300;
          const CARD_VISIBLE = 60;
          const RIGHT_GAP = 60;

          /* 프로젝트 목록 너비 */
          function getProjectListWidth() {
            return (
              projectList.clientWidth
            );
          }

          /* 현재 화면에 맞는 카드 너비 */
          function getProjectCardWidth() {
            return Math.min(
              CARD_WIDTH,
              Math.max(
                getProjectListWidth() -
                RIGHT_GAP,
                0
              )
            );
          }

          /* 현재 카드의 오른쪽 위치 */
          function getProjectCurrentX() {
            return Math.max(
              getProjectListWidth() -
              getProjectCardWidth() -
              RIGHT_GAP,
              0
            );
          }

          const projectMedia =
            gsap.matchMedia();

          mediaContexts.push(
            projectMedia
          );

          /* PC 프로젝트 카드 모션 */
          projectMedia.add(
            '(min-width: 769px)',
            function () {
              setInlineStyle(
                projectWrap,
                {
                  height: ''
                }
              );

              setInlineStyle(
                projectBox,
                {
                  position: 'relative'
                }
              );

              setInlineStyle(
                projectContainer,
                {
                  height: 'auto'
                }
              );

              setInlineStyle(
                projectList,
                {
                  display: '',
                  flexDirection: '',
                  height: ''
                }
              );

              /* PC 프로젝트 카드 초기 스타일 */
              projectItems.forEach(
                function (
                  item,
                  index
                ) {
                  item.classList.remove(
                    'active',
                    'current',
                    'prev'
                  );

                  setInlineStyle(
                    item,
                    {
                      position:
                        'absolute',

                      top: '0px',
                      left: '0px',
                      transition:
                        'none',

                      zIndex: String(
                        index + 10
                      )
                    }
                  );
                }
              );

              /* 모든 카드를 화면 오른쪽 바깥에 배치 */
              function setProjectStart() {
                gsap.set(
                  projectItems,
                  {
                    x: function () {
                      return getProjectListWidth();
                    },

                    width: function () {
                      return getProjectCardWidth();
                    }
                  }
                );
              }

              setProjectStart();

              const projectTimeline =
                gsap.timeline({
                  defaults: {
                    duration: 1,
                    ease: 'none'
                  }
                });

              projectItems.forEach(
                function (
                  item,
                  index
                ) {
                  const timelinePosition =
                    index;

                  /* 이전 카드를 왼쪽에 겹쳐서 쌓기 */
                  if (index > 0) {
                    projectTimeline.to(
                      projectItems[
                      index - 1
                      ],
                      {
                        x:
                          (index - 1) *
                          CARD_VISIBLE,

                        width:
                          function () {
                            return Math.min(
                              PREVIOUS_WIDTH,
                              getProjectCardWidth()
                            );
                          }
                      },
                      timelinePosition
                    );
                  }

                  /* 현재 카드를 오른쪽으로 이동 */
                  projectTimeline.to(
                    item,
                    {
                      x: function () {
                        return getProjectCurrentX();
                      },

                      width:
                        function () {
                          return getProjectCardWidth();
                        }
                    },
                    timelinePosition
                  );
                }
              );

              /* 기존 프로젝트 트리거 중복 방지 */
              ScrollTrigger.getById(
                'project-motion'
              )?.kill();

              /* 프로젝트 스크롤 모션 */
              const projectTrigger =
                createMotionTrigger({
                  id:
                    'project-motion',

                  trigger:
                    projectWrap,

                  start: 'top top',

                  end: function () {
                    return (
                      '+=' +
                      projectItems.length *
                      PROJECT_DISTANCE
                    );
                  },

                  animation:
                    projectTimeline,

                  pin: projectBox,
                  pinSpacing: true,
                  anticipatePin: 1,
                  scrub: 0.8,

                  invalidateOnRefresh:
                    true,

                  snap: {
                    snapTo:
                      1 /
                      projectItems.length,

                    duration: {
                      min: 0.2,
                      max: 0.55
                    },

                    delay: 0.08,
                    directional: true,

                    ease:
                      'power1.inOut'
                  },

                  onRefreshInit:
                    setProjectStart
                });

              /* PC 구간 종료 시 적용 상태 정리 */
              return function () {
                projectTrigger.kill();
                projectTimeline.kill();

                projectItems.forEach(
                  function (item) {
                    item.classList.remove(
                      'active',
                      'current',
                      'prev'
                    );
                  }
                );
              };
            }
          );

          /* 모바일 프로젝트 아코디언 */
          projectMedia.add(
            '(max-width: 768px)',
            function () {
              setInlineStyle(
                projectWrap,
                {
                  height: 'auto'
                }
              );

              setInlineStyle(
                projectBox,
                {
                  position: 'relative'
                }
              );

              setInlineStyle(
                projectContainer,
                {
                  height: 'auto'
                }
              );

              setInlineStyle(
                projectList,
                {
                  display: 'flex',

                  flexDirection:
                    'column',

                  height: 'auto'
                }
              );

              projectItems.forEach(
                function (item) {
                  item.classList.remove(
                    'current',
                    'prev'
                  );

                  setInlineStyle(
                    item,
                    {
                      position:
                        'relative',

                      top: 'auto',
                      left: 'auto',
                      width: '100%',

                      transform:
                        'none',

                      zIndex: 'auto'
                    }
                  );
                }
              );

              /* 모바일 프로젝트 클릭 이벤트 */
              function handleProjectClick(
                event
              ) {
                event.preventDefault();

                const currentItem =
                  event.currentTarget;

                const willOpen =
                  !currentItem.classList.contains(
                    'active'
                  );

                projectItems.forEach(
                  function (item) {
                    item.classList.remove(
                      'active'
                    );
                  }
                );

                if (willOpen) {
                  currentItem.classList.add(
                    'active'
                  );
                }

                window.requestAnimationFrame(
                  refreshMotion
                );
              }

              projectItems.forEach(
                function (item) {
                  item.addEventListener(
                    'click',
                    handleProjectClick
                  );
                }
              );

              /* 모바일 구간 종료 시 적용 상태 정리 */
              return function () {
                projectItems.forEach(
                  function (item) {
                    item.removeEventListener(
                      'click',
                      handleProjectClick
                    );

                    item.classList.remove(
                      'active'
                    );
                  }
                );
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

          const companyNumbers =
            Array.from(
              companyInfoWrap.querySelectorAll(
                `${getClassSelector(
                  'companyInfoNumber'
                )} strong`
              )
            );

          const companyImages =
            Array.from(
              companyInfoWrap.querySelectorAll(
                `${getClassSelector(
                  'companyImgBox'
                )} img`
              )
            );

          let companyCountStarted =
            false;

          let companyImageIndex = -1;

          /* 회사 이미지 변경 */
          function updateCompanyImage(
            progress
          ) {
            if (
              !companyImages.length
            ) {
              return;
            }

            const nextIndex =
              Math.min(
                companyImages.length -
                1,

                Math.floor(
                  progress *
                  companyImages.length
                )
              );

            if (
              companyImageIndex ===
              nextIndex
            ) {
              return;
            }

            companyImageIndex =
              nextIndex;

            companyImages.forEach(
              function (
                image,
                index
              ) {
                image.classList.toggle(
                  'active',

                  index ===
                  companyImageIndex
                );
              }
            );
          }

          /* 회사 숫자 카운트 */
          function startCompanyCount() {
            if (
              companyCountStarted ||
              !companyNumbers.length
            ) {
              return;
            }

            companyCountStarted = true;

            companyNumbers.forEach(
              function (number) {
                const target = Number(
                  number.dataset.target
                );

                if (
                  !Number.isFinite(
                    target
                  )
                ) {
                  return;
                }

                const value = {
                  current: 0
                };

                gsap.to(value, {
                  current: target,
                  duration: 1.5,

                  ease:
                    'power3.out',

                  onUpdate:
                    function () {
                      number.textContent =
                        Math.floor(
                          value.current
                        ).toLocaleString();
                    },

                  onComplete:
                    function () {
                      number.textContent =
                        target.toLocaleString();
                    }
                });
              }
            );
          }

          updateCompanyImage(0);

          /* 회사 숫자 카운트 실행 */
          createMotionTrigger({
            id: 'company-count',

            trigger:
              companyInfoWrap,

            start: 'top 80%',
            once: true,

            onEnter:
              startCompanyCount
          });

          /* 스크롤 진행률에 따라 회사 이미지 변경 */
          createMotionTrigger({
            id: 'company-images',

            trigger:
              companyInfoWrap,

            start: 'top top',
            end: 'bottom bottom',

            onUpdate: function (self) {
              updateCompanyImage(
                self.progress
              );
            },

            onRefresh:
              function (self) {
                updateCompanyImage(
                  self.progress
                );
              }
          });
        }

        /* 문의 영역 프로젝트 타원선 */
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
            projectLine?.querySelector(
              'path'
            );

          if (
            !projectText ||
            !projectLine ||
            !projectPath
          ) {
            return;
          }

          const pathLength =
            projectPath.getTotalLength();

          gsap.set(
            projectLine,
            {
              visibility: 'hidden'
            }
          );

          gsap.set(
            projectPath,
            {
              strokeDasharray:
                pathLength +
                ' ' +
                pathLength,

              strokeDashoffset:
                pathLength
            }
          );

          /* 프로젝트 문구가 화면에 들어오면 타원선 그리기 */
          createMotionTrigger({
            id:
              'contact-project-line',

            trigger:
              projectText,

            start: 'top 80%',
            once: true,

            onEnter: function () {
              gsap.set(
                projectLine,
                {
                  visibility:
                    'visible'
                }
              );

              gsap.fromTo(
                projectPath,
                {
                  strokeDashoffset:
                    pathLength
                },
                {
                  strokeDashoffset:
                    0,

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

          groups.forEach(
            function (group) {
              const texts =
                Array.from(
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

                onEnter:
                  function () {
                    gsap.to(
                      texts,
                      {
                        yPercent: 0,
                        duration: 1.5,
                        stagger: 0.07,

                        ease:
                          'power4.out',

                        overwrite:
                          'auto',

                        force3D: true
                      }
                    );
                  }
              });
            }
          );
        }

        /* 각 영역 기능 실행 */
        initVisualMotion();
        initProjectMotion();
        initCompanyMotion();
        initContactProjectLine();
        initScrollTextReveal();
      }
    );

    /* 첫 화면 위치 계산 */
    refreshFrame =
      window.requestAnimationFrame(
        refreshMotion
      );

    /* 이미지 로드 후 재계산 */
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

    /* 웹폰트 로드 후 재계산 */
    if (document.fonts) {
      document.fonts.ready.then(
        function () {
          refreshMotion();
        }
      );
    }

    /* 화면 크기 변경 후 재계산 */
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

    /* 컴포넌트 종료 시 모션 정리 */
    return function () {
      isDestroyed = true;

      window.clearTimeout(
        introTimer
      );

      window.clearTimeout(
        resizeTimer
      );

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

      motionTriggers.forEach(
        function (trigger) {
          trigger.kill();
        }
      );

      mediaContexts.forEach(
        function (mediaContext) {
          mediaContext.revert();
        }
      );

      motionContext.revert();

      const visualWrap =
        document.querySelector(
          '#visualWrap'
        );

      const visualBox =
        visualWrap?.querySelector(
          getClassSelector(
            'visualBox'
          )
        );

      visualWrap?.classList.remove(
        'step02'
      );

      visualBox?.classList.remove(
        'active',
        'step01',
        'step02'
      );

      document
        .querySelector(
          '#popupContentBox'
        )
        ?.classList.remove(
          'active'
        );

      document
        .querySelector(
          getClassSelector(
            'proposalDownloadBtn'
          )
        )
        ?.classList.remove(
          'active'
        );

      gsap.ticker.remove(
        updateLenis
      );

      lenis.destroy();

      if (window.lenis === lenis) {
        delete window.lenis;
      }

      restoreInlineStyles();
    };
  }, []);
}