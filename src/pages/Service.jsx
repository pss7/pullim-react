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
              <ul className={styles.serviceList}>

                {/* 첫 번째 서비스 */}
                <li data-aos="fade-right">
                  <a
                    href="#servicePopup01"
                    className="servicePopupOpenBtn"
                    data-popup="#servicePopup01"
                  >
                    <div className={styles.serviceImgBox}>
                      <img
                        src="/images/sub/service_img01.jpg"
                        alt="the pullim"
                        className={styles.img}
                      />

                      <img
                        src="/images/sub/service_hover_img01.jpg"
                        alt=""
                        className={styles.hover}
                        aria-hidden="true"
                      />
                    </div>

                    <div className={styles.serviceTextBox}>
                      <span className={styles.serviceCategory}>
                        [ AD TECH SOLUTION ]
                      </span>

                      <p className={styles.serviceDescription}>
                        데이터와 기술 기반의 정교한 트래픽 최적화를 통해
                        브랜드의 디지털 마케팅 성과를
                        <br />
                        극대화하고 시장 내 상위노출을 견인하는 핵심
                        애드테크 솔루션입니다.
                      </p>
                    </div>
                  </a>
                </li>
                {/* //첫 번째 서비스 */}


                {/* 두 번째 서비스 */}
                <li data-aos="fade-right">
                  <a
                    href="#servicePopup02"
                    className="servicePopupOpenBtn"
                    data-popup="#servicePopup02"
                  >
                    <div className={styles.serviceImgBox}>
                      <img
                        src="/images/sub/service_img02.jpg"
                        alt="ZR ZERO EXCHANGE"
                        className={styles.img}
                      />

                      <img
                        src="/images/sub/service_hover_img02.jpg"
                        alt=""
                        className={styles.hover}
                        aria-hidden="true"
                      />
                    </div>

                    <div className={styles.serviceTextBox}>
                      <span className={styles.serviceCategory}>
                        [ FINTECH PLATFORM ]
                      </span>

                      <p className={styles.serviceDescription}>
                        복잡하고 번거로운 환전 프로세스를 혁신하여
                        유저들에게 가장 빠르고
                        <br />
                        합리적인 금융 경험을 제공하는 스마트 제로 환전
                        서비스입니다.
                      </p>
                    </div>
                  </a>
                </li>
                {/* //두 번째 서비스 */}


                {/* 세 번째 서비스 */}
                <li data-aos="fade-right">
                  <a
                    href="#servicePopup03"
                    className="servicePopupOpenBtn"
                    data-popup="#servicePopup03"
                  >
                    <div className={styles.serviceImgBox}>
                      <img
                        src="/images/sub/service_img03.jpg"
                        alt="Limeclass"
                        className={styles.img}
                      />

                      <img
                        src="/images/sub/service_hover_img03.jpg"
                        alt=""
                        className={styles.hover}
                        aria-hidden="true"
                      />
                    </div>

                    <div className={styles.serviceTextBox}>
                      <span className={styles.serviceCategory}>
                        [ ONLINE EDUCATION ]
                      </span>

                      <p className={styles.serviceDescription}>
                        시공간의 제약을 넘어 지식의 가치를 효율적으로
                        전달하고 학습 유저들에게 최적화된
                        <br />
                        교육 경험과 성장 콘텐츠를 제공하는 성인 온라인
                        교육 플랫폼입니다.
                      </p>
                    </div>
                  </a>
                </li>
                {/* //세 번째 서비스 */}


                {/* 네 번째 서비스 */}
                <li data-aos="fade-right">
                  <a
                    href="#servicePopup04"
                    className="servicePopupOpenBtn"
                    data-popup="#servicePopup04"
                  >
                    <div className={styles.serviceImgBox}>
                      <img
                        src="/images/sub/service_img04.jpg"
                        alt="Lux studio"
                        className={styles.img}
                      />

                      <img
                        src="/images/sub/service_hover_img04.jpg"
                        alt=""
                        className={styles.hover}
                        aria-hidden="true"
                      />
                    </div>

                    <div className={styles.serviceTextBox}>
                      <span className={styles.serviceCategory}>
                        [ RE-COMMERCE ]
                      </span>

                      <p className={styles.serviceDescription}>
                        철저한 검증과 감각적인 기획을 바탕으로 하이엔드
                        중고 명품의 가치를 재발굴하고 신뢰 기반의 새로운
                        소비 트렌드를 리드하는 리커머스 비즈니스입니다.
                      </p>
                    </div>
                  </a>
                </li>
                {/* //네 번째 서비스 */}

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

      {/* 첫 번째 서비스 팝업 */}
      <div
        id="servicePopup01"
        className="servicePopupWrap"
        aria-hidden="true"
      >
        <div className="servicePopupBox">
          <div className="servicePopupImgBox">
            <span className="servicePopupKeyword servicePopupKeywordTop">
              AD TECH
            </span>

            <img
              src="/images/sub/service_popup_img01.jpg"
              className="servicePopupImage"
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
              리커머스 등
              <br />
              다양한 도메인의 비즈니스 가치를 혁신합니다.
              <br />
              <br />
              기술적 전문성과 트렌디한 감각을 전방위로
              발휘하며
              <br />
              한계 없는 확장성과 압도적인 성공을 증명합니다.
            </p>
          </div>

          <button
            type="button"
            className="servicePopupCloseBtn"
            aria-label="서비스 팝업 닫기"
          />
        </div>
      </div>
      {/* //첫 번째 서비스 팝업 */}


      {/* 두 번째 서비스 팝업 */}
      <div
        id="servicePopup02"
        className="servicePopupWrap"
        aria-hidden="true"
      >
        <div className="servicePopupBox">
          <div className="servicePopupImgBox">
            <span className="servicePopupKeyword servicePopupKeywordTop">
              SLASH TO
            </span>

            <img
              src="/images/sub/service_popup_img02.jpg"
              className="servicePopupImage"
              alt="제로 환전 서비스"
            />

            <span className="servicePopupKeyword servicePopupKeywordBottom">
              ZERO
            </span>

            <p>
              거품 없는 수수료 0원
              <br />
              환전의 새로운 기준
            </p>
          </div>

          <div className="servicePopupTextBox">
            <p className="servicePopupText">
              수수료는 제로로, 혜택은 최대치로.
              <br />
              가장 투명하고 공정한 방식으로 오프라인 환전의
              패러다임을 정립합니다.
              <br />
              <br />
              여행과 비즈니스, 일상의 모든 접점에서 당신이
              필요한
              <br />
              순간 가장 완벽한 금융 솔루션을 제시합니다.
            </p>
          </div>

          <button
            type="button"
            className="servicePopupCloseBtn"
            aria-label="서비스 팝업 닫기"
          />
        </div>
      </div>
      {/* //두 번째 서비스 팝업 */}


      {/* 세 번째 서비스 팝업 */}
      <div
        id="servicePopup03"
        className="servicePopupWrap"
        aria-hidden="true"
      >
        <div className="servicePopupBox">
          <div className="servicePopupImgBox">
            <span className="servicePopupKeyword servicePopupKeywordTop">
              A DROP OF LIME
            </span>

            <img
              src="/images/sub/service_popup_img03.jpg"
              className="servicePopupImage"
              alt="라임 클래스"
            />

            <span className="servicePopupKeyword servicePopupKeywordBottom">
              A BIG CHANGE
            </span>

            <p>
              라임 한 방울이 요리 전체를 바꾸듯,
              <br />
              강의 하나가 인생의 가능성을 바꿉니다.
            </p>
          </div>

          <div className="servicePopupTextBox">
            <p className="servicePopupText">
              라임 클래스는 작은 배움이
              <br />
              새로운 가능성으로 이어질 수 있다고 믿습니다.
              <br />
              <br />
              우리는 강의 기획, 콘텐츠 제작, 마케팅, 운영을
              함께 설계하며
              <br />
              단순히 강의를 판매하는 것이 아니라 수강생이
              실제로 실행하고
              <br />
              수익화를 할 수 있는 경험을 만듭니다.
            </p>
          </div>

          <button
            type="button"
            className="servicePopupCloseBtn"
            aria-label="서비스 팝업 닫기"
          />
        </div>
      </div>
      {/* //세 번째 서비스 팝업 */}


      {/* 네 번째 서비스 팝업 */}
      <div
        id="servicePopup04"
        className="servicePopupWrap"
        aria-hidden="true"
      >
        <div className="servicePopupBox">
          <div className="servicePopupImgBox">
            <span className="servicePopupKeyword servicePopupKeywordTop">
              LUXURY
            </span>

            <img
              src="/images/sub/service_popup_img04.jpg"
              className="servicePopupImage"
              alt="럭스 스튜디오"
            />

            <span className="servicePopupKeyword servicePopupKeywordBottom">
              MADE SIMPLE
            </span>

            <p>
              누구나 쉽게, 믿을 수 있는 감정
              <br />
              더 합리적인 명품 거래
            </p>
          </div>

          <div className="servicePopupTextBox">
            <p className="servicePopupText">
              럭스 스튜디오는 중고명품의 매입과 거래 과정을
              <br />
              더 투명하고 편리하게 만드는 리커머스
              서비스입니다.
              <br />
              <br />
              고객이 보유한 명품을 간편하게 접수하면
              <br />
              전문 검수와 시세 기반 평가를 통해 합리적인
              매입가를 제안합니다.
              <br />
              정확한 감정, 안전한 절차, 빠른 안내를 바탕으로
              고객이 안심하고
              <br />
              명품을 판매할 수 있는 새로운 중고명품 거래
              경험을 제공합니다.
            </p>
          </div>

          <button
            type="button"
            className="servicePopupCloseBtn"
            aria-label="서비스 팝업 닫기"
          />
        </div>
      </div>
      {/* //네 번째 서비스 팝업 */}

      <Footer />
    </div>
  );
}