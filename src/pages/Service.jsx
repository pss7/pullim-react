import { useRef } from 'react';

import '../styles/sub.css';
import styles from './Service.module.css';

import Main from '../components/layout/Main';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

import useSubMotion from '../hooks/useSubMotion';
import useServiceMotion from '../hooks/useServiceMotion';

export default function Service() {
  const pageRef = useRef(null);

  /* 서브 공통 모션 */
  useSubMotion(pageRef);

  /* 서비스 전용 모션 */
  useServiceMotion(
    pageRef,
    styles
  );

  return (
    <div
      ref={pageRef}
      id="wrap"
      className={styles.serviceWrap}
    >
      <Header
        logoSrc="/images/common/logo.svg"
      />

      <Main id="subWrap">
        {/* 상단 영역 */}
        <div className="subTopBox">
          <div className="container">
            <div className="topTitleBox">
              <h2>
                SERVICE
              </h2>

              <p className="topText01">
                POWERD BY ADTECH
              </p>

              <p className="topText02">
                우리는 고도화된 애드테크 솔루션을 코어
                엔진으로 삼아 정형화된 틀을 깨고
                <br />
                다채로운 산업 분야에서 새로운 비즈니스
                성공 가능성을 증명해 나갑니다.
              </p>
            </div>
          </div>
        </div>
        {/* //상단 영역 */}

        {/* 서브 콘텐츠 영역 */}
        <div className="subContentBox">
          <div className="serviceBox">
            <div className="container">
              {/* 서비스 목록 */}
              <ul
                className={
                  styles.serviceList
                }
              >
                <li data-aos="fade-right">
                  <a
                    href="#"
                    className="servicePopupOpenBtn"
                    data-popup-image="/images/sub/service_popup_img01.jpg"
                    data-popup-alt="애드테크 솔루션"
                  >
                    <div
                      className={
                        styles.serviceImgBox
                      }
                    >
                      <img
                        src="/images/sub/service_img01.jpg"
                        alt="the pullim"
                      />
                    </div>

                    <div
                      className={
                        styles.serviceTextBox
                      }
                    >
                      <span
                        className={
                          styles.serviceCategory
                        }
                      >
                        [ AD TECH SOLUTION ]
                      </span>

                      <p
                        className={
                          styles.serviceDescription
                        }
                      >
                        데이터와 기술 기반의 정교한 트래픽
                        최적화를 통해 브랜드의 디지털
                        마케팅 성과를
                        <br />
                        극대화하고 시장 내 상위노출을
                        견인하는 핵심 애드테크
                        솔루션입니다.
                      </p>
                    </div>
                  </a>
                </li>

                <li data-aos="fade-right">
                  <a
                    href="#"
                    className="servicePopupOpenBtn"
                    data-popup-image="/images/sub/service_popup_img02.jpg"
                    data-popup-alt="핀테크 플랫폼"
                  >
                    <div
                      className={
                        styles.serviceImgBox
                      }
                    >
                      <img
                        src="/images/sub/service_img02.jpg"
                        alt="ZR ZERO EXCHANGE"
                      />
                    </div>

                    <div
                      className={
                        styles.serviceTextBox
                      }
                    >
                      <span
                        className={
                          styles.serviceCategory
                        }
                      >
                        [ FINTECH PLATFORM ]
                      </span>

                      <p
                        className={
                          styles.serviceDescription
                        }
                      >
                        복잡하고 번거로운 환전 프로세스를
                        혁신하여 유저들에게 가장 빠르고
                        <br />
                        합리적인 금융 경험을 제공하는
                        스마트 제로 환전 서비스입니다.
                      </p>
                    </div>
                  </a>
                </li>

                <li data-aos="fade-right">
                  <a
                    href="#"
                    className="servicePopupOpenBtn"
                    data-popup-image="/images/sub/service_popup_img03.jpg"
                    data-popup-alt="온라인 교육 플랫폼"
                  >
                    <div
                      className={
                        styles.serviceImgBox
                      }
                    >
                      <img
                        src="/images/sub/service_img03.jpg"
                        alt="Limeclass"
                      />
                    </div>

                    <div
                      className={
                        styles.serviceTextBox
                      }
                    >
                      <span
                        className={
                          styles.serviceCategory
                        }
                      >
                        [ ONLINE EDUCATION ]
                      </span>

                      <p
                        className={
                          styles.serviceDescription
                        }
                      >
                        시공간의 제약을 넘어 지식의 가치를
                        효율적으로 전달하고 학습 유저들에게
                        최적화된
                        <br />
                        교육 경험가 성장 콘텐츠를 제공하는
                        성인 온라인 교육 플랫폼입니다
                      </p>
                    </div>
                  </a>
                </li>

                <li data-aos="fade-right">
                  <a
                    href="#"
                    className="servicePopupOpenBtn"
                    data-popup-image="/images/sub/service_popup_img04.jpg"
                    data-popup-alt="리커머스 비즈니스"
                  >
                    <div
                      className={
                        styles.serviceImgBox
                      }
                    >
                      <img
                        src="/images/sub/service_img04.jpg"
                        alt="Iux studio"
                      />
                    </div>

                    <div
                      className={
                        styles.serviceTextBox
                      }
                    >
                      <span
                        className={
                          styles.serviceCategory
                        }
                      >
                        [ RE-COMMERCE ]
                      </span>

                      <p
                        className={
                          styles.serviceDescription
                        }
                      >
                        철저한 검증과 감각적인 기획을
                        바탕으로 하이엔드 중고 명품의
                        가치를 재발굴하고 신뢰 기반의
                        새로운 소비 트렌드를 리드하는
                        리커머스 비즈니스입니다.
                      </p>
                    </div>
                  </a>
                </li>
              </ul>
              {/* //서비스 목록 */}

              {/* 브랜드 슬로건 */}
              <div
                className={
                  styles.serviceBrandSloganBox
                }
              >
                <p className="serviceBrandSlogan">
                  <span
                    className={
                      styles.serviceBrandSloganLine
                    }
                  >
                    NO FIXED ANSWERS
                  </span>

                  <br />

                  <span
                    className={
                      styles.serviceBrandSloganLine
                    }
                  >
                    WE BUILD WHAT MATTERS
                  </span>
                </p>
              </div>
              {/* //브랜드 슬로건 */}
            </div>
          </div>
        </div>
      </Main>

      {/* 서비스 팝업 영역 */}
      <div
        id="servicePopupWrap"
        aria-hidden="true"
      >
        <div className="servicePopupBox">
          <div className="servicePopupImgBox">
            <span className="servicePopupKeyword servicePopupKeywordTop">
              AD TECH
            </span>

            <img
              className="servicePopupImage"
              src="/images/sub/service_popup_img01.jpg"
              alt="애드테크 솔루션"
            />

            <span className="servicePopupKeyword servicePopupKeywordBottom">
              SOLUTION
            </span>

            <p>
              성장의 기술,
              <br />
              비즈니스의 확장
            </p>
          </div>

          <div className="servicePopupTextBox">
            <p className="servicePopupText">
              고도화된 애드테크를 기반으로 금융, 교육,
              리커머스등
              <br />
              다양한 도메인의 비즈니스 가치를 혁신합니다.
              <br />
              <br />
              기술적 전문성과 트렌디한 감각을 전방위로
              발휘하며
              <br />
              한계 없는 확장성과 압도적인 성공을
              증명합니다.
            </p>
          </div>

          <button
            type="button"
            className="servicePopupCloseBtn"
            aria-label="서비스 팝업 닫기"
          />
        </div>
      </div>
      {/* //서비스 팝업 영역 */}

      <Footer />
    </div>
  );
}