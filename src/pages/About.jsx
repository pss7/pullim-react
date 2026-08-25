import { useRef } from 'react';

import styles from './About.module.css';

import Header from '../components/layout/Header';
import Main from '../components/layout/Main';
import Footer from '../components/layout/Footer';

import useSubMotion from '../hooks/useSubMotion';

export default function About() {
  const pageRef = useRef(null);

  /* 소개 페이지 모션 */
  useSubMotion(pageRef, true);

  return (
    <div
      ref={pageRef}
      id="wrap"
      className={styles.aboutWrap}
    >
      <Header
        logoSrc="/images/common/logo03.svg"
      />

      <Main id="subWrap">
        {/* 상단 영역 */}
        <div className="subTopBox">
          <div className="container">
            <div className="topTitleBox">
              <h2>
                ABOUT
              </h2>

              <p className="topText01">
                A NEW STANDARD
                <br />
                IN ADTECH-DRIVEN
              </p>
            </div>
          </div>
        </div>
        {/* //상단 영역 */}

        {/* 서브 콘텐츠 영역 */}
        <div className="subContentBox">
          {/* 소개 영역 */}
          <div className="aboutBox">
            <div className="container">
              {/* 비전 영역 */}
              <div
                className={
                  styles.aboutVisionBox
                }
              >
                {/* 제목 영역 */}
                <div
                  className="titleBox"
                  data-aos="fade-right"
                >
                  <span>
                    [ OUR VISION ]
                  </span>

                  <p>
                    CREATING VALUE
                    <br />
                    THROUGH ADTECH
                  </p>
                </div>
                {/* //제목 영역 */}

                <div className="infoTextBox">
                  <p
                    className="infoText"
                    data-aos="fade-right"
                  >
                    더 풀림은 애드테크를 기반으로
                    IMC, 리커머스, 성인교육,
                    환전소, 디자인 등
                    <br />
                    다양한 도메인에서 새로운
                    가치를 만들어가고 있습니다.
                  </p>
                </div>
              </div>
              {/* //비전 영역 */}

              {/* 미션 영역 */}
              <div
                className={
                  styles.aboutMissionBox
                }
              >
                {/* 제목 영역 */}
                <div
                  className="titleBox"
                  data-aos="fade-right"
                >
                  <span>
                    [ OUR MISSION ]
                  </span>

                  <p>
                    ACHIEVE. ASPIRE. CHALLENGE
                  </p>
                </div>
                {/* //제목 영역 */}

                <div className="infoTextBox">
                  <p
                    className="infoText"
                    data-aos="fade-right"
                  >
                    우리는 새로운 가치를
                    만들어내는 과정에서 성취감을
                    얻고
                    <br />
                    그 성취에 대한 갈증을 다시 더
                    큰 도전으로 연결합니다.
                  </p>

                  <p
                    className="infoText"
                    data-aos="fade-right"
                  >
                    이러한 갈증은 우리를
                    수동적으로 움직이게 하는
                    압박이 아니라
                    <br />
                    스스로 성장하고 변화하게
                    만드는 주체적인 동기입니다.
                  </p>
                </div>
              </div>
              {/* //미션 영역 */}

              {/* 미래 영역 */}
              <div
                className={
                  styles.aboutFutureBox
                }
              >
                {/* 제목 영역 */}
                <div
                  className="titleBox"
                  data-aos="fade-right"
                >
                  <span>
                    [ OUR FUTURE ]
                  </span>

                  <p>
                    AWE CHALLENGE
                    <br />
                    PROVE WHAT’S POSSIBLE
                  </p>
                </div>
                {/* //제목 영역 */}

                <div className="infoTextBox">
                  <p
                    className="infoText"
                    data-aos="fade-right"
                  >
                    하나의 영역에 안주하지 않고
                    제로 환전소, 라임 클레스,
                    <br />
                    럭스 스튜디오, 만년해로 등
                    다양한 비즈니스 분야로 끊임
                    없이 도전합니다.
                  </p>

                  <p
                    className="infoText"
                    data-aos="fade-right"
                  >
                    기술적 전문성과 트렌디한
                    감각을 모두 갖춘 파트너로서
                    <br />
                    비즈니스의 무한한 확장성과
                    성공을 증명합니다.
                  </p>
                </div>
              </div>
              {/* //미래 영역 */}

              {/* 여정 영역 */}
              <div
                className={
                  styles.aboutJourneyBox
                }
              >
                {/* 제목 영역 */}
                <div
                  className="titleBox"
                  data-aos="fade-right"
                >
                  <span>
                    [ OUR JOURNEY ]
                  </span>

                  <p>
                    BUILT TO GROW THROUGH
                    CHALLENGE
                  </p>
                </div>
                {/* //제목 영역 */}

                <div className="infoTextBox">
                  <p
                    className="infoText"
                    data-aos="fade-right"
                  >
                    2022년 2월 첫 걸음을 내딛은
                    ‘더 풀림’은 끊임 없는 도전과
                    혁신으로
                    <br />
                    성장 히스토리를 써 내려가고
                    있습니다.
                  </p>
                </div>
              </div>
              {/* //여정 영역 */}

              {/* 여정 목록 영역 */}
              <ul
                className={
                  styles.aboutJourneyList
                }
              >
                <li
                  className="aboutJourneyItem"
                  data-aos="fade-up"
                >
                  <a
                    href="#"
                    className={
                      styles.aboutJourneyLink
                    }
                  >
                    <span
                      className={
                        styles.aboutJourneyYear
                      }
                    >
                      2022
                    </span>

                    <span
                      className={
                        styles.aboutJourneyTitle
                      }
                    >
                      THE FOUNDATION
                    </span>

                    <ul
                      className={
                        styles.aboutJourneyDetailList
                      }
                    >
                      <li
                        className={
                          styles.aboutJourneyDetailItem
                        }
                      >
                        풀림(PULLIM) 설립 및
                        개업
                      </li>

                      <li
                        className={
                          styles.aboutJourneyDetailItem
                        }
                      >
                        애드테크 기반의 오퍼월
                        매체 네트워크 구축
                      </li>

                      <li
                        className={
                          styles.aboutJourneyDetailItem
                        }
                      >
                        중소벤처기업부 '혁신
                        바우처' 마케팅 수행기관
                        선정
                      </li>
                    </ul>
                  </a>
                </li>

                <li
                  className="aboutJourneyItem"
                  data-aos="fade-up"
                >
                  <a
                    href="#"
                    className={
                      styles.aboutJourneyLink
                    }
                  >
                    <span
                      className={
                        styles.aboutJourneyYear
                      }
                    >
                      2024
                    </span>

                    <span
                      className={
                        styles.aboutJourneyTitle
                      }
                    >
                      BUSINESS EXPANSION
                    </span>

                    <ul
                      className={
                        styles.aboutJourneyDetailList
                      }
                    >
                      <li
                        className={
                          styles.aboutJourneyDetailItem
                        }
                      >
                        사업 규모 확장에 따른
                        인천 청라 사옥 이전
                      </li>

                      <li
                        className={
                          styles.aboutJourneyDetailItem
                        }
                      >
                        자체 통합 광고 관리 ERP
                        시스템 개발 및 구축
                      </li>
                    </ul>

                    <div
                      className={
                        styles.aboutJourneyHoverImgBox
                      }
                    >
                      <img
                        src="/images/sub/about_img02.jpg"
                        alt=""
                      />
                    </div>
                  </a>
                </li>

                <li
                  className="aboutJourneyItem"
                  data-aos="fade-up"
                >
                  <a
                    href="#"
                    className={
                      styles.aboutJourneyLink
                    }
                  >
                    <span
                      className={
                        styles.aboutJourneyYear
                      }
                    >
                      2025
                    </span>

                    <span
                      className={
                        styles.aboutJourneyTitle
                      }
                    >
                      MULTI-PLATFORM GROWTH
                    </span>

                    <ul
                      className={
                        styles.aboutJourneyDetailList
                      }
                    >
                      <li
                        className={
                          styles.aboutJourneyDetailItem
                        }
                      >
                        글로벌 비즈니스 허브
                        도약을 위한 서울 사옥 이전
                      </li>

                      <li
                        className={
                          styles.aboutJourneyDetailItem
                        }
                      >
                        프리미엄 건강기능식품
                        브랜드 ‘만년해로’ 런칭
                      </li>
                    </ul>

                    <div
                      className={
                        styles.aboutJourneyHoverImgBox
                      }
                    >
                      <img
                        src="/images/sub/about_img03.jpg"
                        alt=""
                      />
                    </div>
                  </a>
                </li>

                <li
                  className="aboutJourneyItem"
                  data-aos="fade-up"
                >
                  <a
                    href="#"
                    className={
                      styles.aboutJourneyLink
                    }
                  >
                    <span
                      className={
                        styles.aboutJourneyYear
                      }
                    >
                      2026
                    </span>

                    <span
                      className={
                        styles.aboutJourneyTitle
                      }
                    >
                      INNOVATION &amp;
                      SCALED-UP
                    </span>

                    <ul
                      className={
                        styles.aboutJourneyDetailList
                      }
                    >
                      <li
                        className={
                          styles.aboutJourneyDetailItem
                        }
                      >
                        업무 환경 최적화 및
                        인프라 확장을 위한 서울
                        신규 사무실 확장 이전
                      </li>

                      <li
                        className={
                          styles.aboutJourneyDetailItem
                        }
                      >
                        하이엔드 리커머스 플랫폼
                        ‘럭스 스튜디오’ 런칭
                      </li>

                      <li
                        className={
                          styles.aboutJourneyDetailItem
                        }
                      >
                        온라인 성인 교육 플랫폼
                        ‘라임 클래스’ 런칭
                      </li>
                    </ul>

                    <div
                      className={
                        styles.aboutJourneyHoverImgBox
                      }
                    >
                      <img
                        src="/images/sub/about_img04.jpg"
                        alt=""
                      />
                    </div>
                  </a>
                </li>
              </ul>
              {/* //여정 목록 영역 */}

              {/* 채널 영역 */}
              <div
                className={
                  styles.channelBox
                }
              >
                <div className="channelTitleBox">
                  {/* 제목 영역 */}
                  <div
                    className="titleBox"
                    data-aos="fade-right"
                  >
                    <span>
                      [ OUR CHANNELS ]
                    </span>

                    <p>
                      CONNECT WITH
                      <br />
                      THE PULLIM ANYWHERE
                    </p>
                  </div>
                  {/* //제목 영역 */}

                  <div className="infoTextBox">
                    <p
                      className="infoText"
                      data-aos="fade-right"
                    >
                      더 풀림은 웹사이트를 너머의
                      다양한 채널에서
                      <br />
                      파트너, 유저들과 더욱 가깝고
                      생생하게 소통하고 있습니다.
                      <br />
                      우리의 트렌디한 콘텐츠와
                      유쾌한 일상, 실시간 소식을
                      지금 바로 확인해 보세요
                    </p>
                  </div>
                </div>

                {/* 채널 목록 영역 */}
                <ul
                  className={
                    styles.channelList
                  }
                >
                  <li data-aos="fade-left">
                    <a href="#">
                      <img
                        src="/images/sub/insta_icon.svg"
                        alt="인스타그램 아이콘"
                      />

                      <p>
                        더 풀림의 가장 트렌디한
                        소식과 유쾌한 사내 오피스
                        라이프를 가장 빠르게 만나는
                        공간
                      </p>

                      <span>
                        VISIT INSTAGRAM →
                      </span>
                    </a>
                  </li>

                  <li data-aos="fade-left">
                    <a href="#">
                      <img
                        src="/images/sub/blog_icon.svg"
                        alt="블로그 아이콘"
                      />

                      <p>
                        깊이 있는 비즈니스
                        인사이트와 우리만의 진정성
                        있는 성장 비하인드
                        스토리가 담긴 채널
                      </p>

                      <span>
                        READ OUR BLOG →
                      </span>
                    </a>
                  </li>

                  <li data-aos="fade-left">
                    <a href="#">
                      <img
                        src="/images/sub/youtube_icon.svg"
                        alt="유튜브 아이콘"
                      />

                      <p>
                        멈추지 않는 도전 정신과
                        살아있는 팀워크를 생생한
                        영상 콘텐츠로 증명하는
                        공간
                      </p>

                      <span>
                        WATCH YOUTUBE →
                      </span>
                    </a>
                  </li>

                  <li data-aos="fade-left">
                    <a href="#">
                      <img
                        src="/images/sub/kakao_icon.svg"
                        alt="카카오톡 아이콘"
                      />

                      <p>
                        언제 어디서나 실시간으로
                        가장 빠르게 해답을 얻는
                        다이렉트 소통 창구
                      </p>

                      <span>
                        CHAT WITH US →
                      </span>
                    </a>
                  </li>
                </ul>
                {/* //채널 목록 영역 */}
              </div>
              {/* //채널 영역 */}
            </div>
          </div>
          {/* //소개 영역 */}
        </div>
        {/* //서브 콘텐츠 영역 */}
      </Main>

      <Footer />
    </div>
  );
}