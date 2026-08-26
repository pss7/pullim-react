import { useRef, useState } from 'react';
import SliderModule from 'react-slick';

import styles from './MainPage.module.css';
import useMainMotion from '../hooks/useMainMotion';

/* Vite 8 react-slick 모듈 호환 처리 */
const Slider =
  SliderModule.default ??
  SliderModule;

/* 팝업 슬라이드 설정 */
const popupSliderSettings = {
  autoplay: true,
  arrows: false,
  dots: false,
  accessibility: false,
  draggable: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  zIndex: 1000,
  pauseOnHover: false,
  autoplaySpeed: 5000,
  speed: 1500
};

export default function MainPage() {

  const popupSliderRef = useRef(null);

  useMainMotion(styles);

  const [
    companyVideoOpen,
    setCompanyVideoOpen
  ] = useState(false);

  /* 다음 팝업 슬라이드 */
  function handlePopupNext() {
    popupSliderRef.current?.slickNext();
  }

  /* 이전 팝업 슬라이드 */
  function handlePopupPrev() {
    popupSliderRef.current?.slickPrev();
  }

  return (
    <>
      {/* 비주얼 영역 */}
      <section
        id="visualWrap"
        className={styles.visualWrap}
      >
        <div
          className={`
            visualBox
            ${styles.visualBox}
          `}
        >
          <div className="visualContentBox">
            {/* 비디오 영역 */}
            <div className={styles.visualVideoBox}>
              <video
                src="https://pullim.cloud/video/(%EC%B5%9C%EC%A2%85)%20%EB%B8%8C%EB%9E%9C%EB%93%9C%20%ED%99%8D%EB%B3%B4%20%EC%98%81%EC%83%81_%EB%94%94%EC%A7%80%ED%84%B8%20%EC%83%A4%EC%9D%B4%EB%8B%88%EC%A7%80%EC%9A%A9_.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
            {/* //비디오 영역 */}

            {/* 텍스트 영역 */}
            <div className={styles.visualTextBox}>
              <div
                className={`
                  ${styles.visualText}
                  ${styles.visualText01}
                `}
              >
                <h2>Building</h2>
              </div>

              <div
                className={`
                  ${styles.visualText}
                  ${styles.visualText02}
                `}
              >
                <h2>
                  <span>[ A ]</span>
                  Better
                </h2>

                <h2>Future</h2>
              </div>

              <div
                className={`
                  ${styles.visualText}
                  ${styles.visualText03}
                `}
              >
                <h2>with</h2>
                <h2>AdTech</h2>
              </div>
            </div>
            {/* //텍스트 영역 */}

            {/* 제안서 다운로드 영역 */}
            <a
              href="#"
              className={`
                proposalDownloadBtn
                ${styles.proposalDownloadBtn}
              `}
              download
            >
              <img
                src="/images/main/download_text.svg"
                alt="제안서 다운로드"
              />

              <span>PDF</span>
            </a>
            {/* //제안서 다운로드 영역 */}

            {/* 팝업 정보 영역 */}
            <div
              id="popupContentBox"
              className={styles.popupContentBox}
            >
              {/* 팝업 슬라이드 영역 */}
              <div className={styles.popupSlideBox}>
                <Slider
                  ref={popupSliderRef}
                  className={`
    slick
    ${styles.slick || ''}
  `}
                  {...popupSliderSettings}
                >
                  <div className={styles.popupSlide}>
                    <h3>
                      2026 상반기 신입 디자이너 채용
                    </h3>

                    <p>
                      2026 더 풀림과 함께
                      <br />
                      새로운 시선으로 변화를 만들
                      디자이너를 기다립니다.
                    </p>
                  </div>

                  <div className={styles.popupSlide}>
                    <h3>
                      2026 상반기 신입 디자이너 채용
                    </h3>

                    <p>
                      2026 더 풀림과 함께
                      <br />
                      새로운 시선으로 변화를 만들
                      디자이너를 기다립니다.
                    </p>
                  </div>

                  <div className={styles.popupSlide}>
                    <h3>
                      2026 상반기 신입 디자이너 채용
                    </h3>

                    <p>
                      2026 더 풀림과 함께
                      <br />
                      새로운 시선으로 변화를 만들
                      디자이너를 기다립니다.
                    </p>
                  </div>
                </Slider>

                <div className={styles.controlBox}>
                  <button
                    type="button"
                    className={`
                      popupSlideBtn
                      popupNextBtn
                      ${styles.popupSlideBtn}
                      ${styles.popupNextBtn}
                    `}
                    aria-label="팝업 슬라이드 다음 버튼"
                    onClick={handlePopupNext}
                  />

                  <button
                    type="button"
                    className={`
                      popupSlideBtn
                      popupPrevBtn
                      ${styles.popupSlideBtn}
                      ${styles.popupPrevBtn}
                    `}
                    aria-label="팝업 슬라이드 이전 버튼"
                    onClick={handlePopupPrev}
                  />
                </div>
              </div>
              {/* //팝업 슬라이드 영역 */}

              {/* 기업 소개 영상 영역 */}
              <div className={styles.popupVideoBox}>
                <a
                  href="#"
                  onClick={function (event) {
                    event.preventDefault();
                    setCompanyVideoOpen(true);
                  }}
                >
                  <div
                    className={
                      styles.popupVideoInfoText
                    }
                  >
                    <h3>기업 소개 영상 보기</h3>
                    <span>Watch the video</span>
                  </div>

                  <div className={styles.popupVideo}>
                    <img
                      src="/images/common/video_img.jpg"
                      alt="기업 소개 영상 보기"
                    />
                  </div>
                </a>
              </div>
              {/* //기업 소개 영상 영역 */}

            </div>
            {/* //팝업 정보 영역 */}

            {/* 스크롤 표시 영역 */}
            <div className={styles.visualScrollBox}>
              <span
                className={styles.visualScrollText}
              >
                [ SCROLL ]
              </span>

              <span
                className={styles.visualScrollLine}
                aria-hidden="true"
              />
            </div>
            {/* //스크롤 표시 영역 */}
          </div>
        </div>
      </section>
      {/* //비주얼 영역 */}

      {/* 소개 영역 */}
      <section
        id="aboutWrap"
        className={styles.aboutWrap}
      >
        <div
          className={`
            container
            ${styles.container}
          `}
        >
          <div className={styles.aboutBox}>
            {/* 제목 영역 */}
            <div
              className={`
                ${styles.aboutTitleBox}
                scrollRevealGroup
              `}
            >
              <span
                className={`
                  ${styles.aboutLabelText}
                  scrollRevealLine
                `}
              >
                <em className="scrollRevealText">
                  [ WHO WE ARE ]
                </em>
              </span>

              <h2 className="scrollRevealTitle">
                <em className="scrollRevealLine">
                  <strong className="scrollRevealText">
                    A NEW STANDARD
                  </strong>
                </em>

                <em className="scrollRevealLine">
                  <strong className="scrollRevealText">
                    IN ADTECH
                  </strong>
                </em>
              </h2>
            </div>
            {/* //제목 영역 */}

            {/* 상세 링크 */}
            <a
              href="#"
              className={`
                ${styles.aboutViewLink}
                scrollRevealGroup
              `}
            >
              <span className="scrollRevealLine">
                <em className="scrollRevealText">
                  Detail view
                </em>
              </span>
            </a>
            {/* //상세 링크 */}

            {/* 소개 콘텐츠 영역 */}
            <div className={styles.aboutTextBox}>
              <div
                className={`
                  ${styles.aboutText}
                  aboutText01
                  scrollRevealGroup
                `}
              >
                <span
                  className={`
                    ${styles.aboutTextNumber}
                    scrollRevealLine
                  `}
                >
                  <em className="scrollRevealText">
                    ( / 01 )
                  </em>
                </span>

                <p>
                  <span className="scrollRevealLine">
                    <em className="scrollRevealText">
                      제품에 제한되지 않고 각자의
                      전문성을 가진 사람들이 모여
                    </em>
                  </span>

                  <span className="scrollRevealLine">
                    <em className="scrollRevealText">
                      더 나은 비즈니스를 위해 도전하는
                      집단입니다.
                    </em>
                  </span>
                </p>
              </div>

              <div
                className={`
                  ${styles.aboutText}
                  ${styles.aboutText02}
                  scrollRevealGroup
                `}
              >
                <span
                  className={`
                    ${styles.aboutTextNumber}
                    scrollRevealLine
                  `}
                >
                  <em className="scrollRevealText">
                    ( / 02 )
                  </em>
                </span>

                <p>
                  <span className="scrollRevealLine">
                    <em className="scrollRevealText">
                      우리는 새로운 가치를 만들어내는
                      과정에서 성취감을 얻고
                    </em>
                  </span>

                  <span className="scrollRevealLine">
                    <em className="scrollRevealText">
                      그 성취에 대한 갈증을 다시 더 큰
                      도전으로 연결합니다.
                    </em>
                  </span>
                </p>
              </div>
            </div>
            {/* //소개 콘텐츠 영역 */}
          </div>
        </div>
      </section>
      {/* //소개 영역 */}

      {/* 프로젝트 영역 */}
      <section
        id="projectWrap"
        className={styles.projectWrap}
      >
        <div
          className={`
            container
            ${styles.container}
          `}
        >
          <div
            className={`
              projectBox
              ${styles.projectBox}
            `}
          >
            <div className={styles.projectContentBox}>
              {/* 제목 영역 */}
              <div
                className={`
                  ${styles.projectTitleBox}
                  scrollRevealGroup
                `}
              >
                <h2>
                  <span className="scrollRevealLine">
                    <strong className="scrollRevealText">
                      HOW WE CREATE VALUE
                    </strong>
                  </span>

                  <span className="scrollRevealLine">
                    <strong className="scrollRevealText">
                      WHAT WE DO
                    </strong>
                  </span>
                </h2>
              </div>
              {/* //제목 영역 */}

              {/* 프로젝트 목록 영역 */}
              <ul
                className={`
                  projectList
                  ${styles.projectList}
                `}
              >
                <li>
                  <div className={styles.projectImgBox}>
                    <img
                      src="/images/main/project_img01.jpg"
                      alt=""
                    />
                  </div>

                  <div
                    className={styles.projectTextBox}
                  >
                    <p className={styles.projectName}>
                      스마트스토어 <br />
                      상위노출
                    </p>

                    <p className={styles.projectDesc}>
                      검색 알고리즘 기반 SEO
                    </p>
                  </div>
                </li>

                <li>
                  <div className={styles.projectImgBox}>
                    <img
                      src="/images/main/project_img01.jpg"
                      alt=""
                    />
                  </div>

                  <div
                    className={styles.projectTextBox}
                  >
                    <p className={styles.projectName}>
                      쿠팡 <br />
                      상위노출
                    </p>

                    <p className={styles.projectDesc}>
                      검색 알고리즘 기반 SEO
                    </p>
                  </div>
                </li>

                <li>
                  <div className={styles.projectImgBox}>
                    <img
                      src="/images/main/project_img01.jpg"
                      alt=""
                    />
                  </div>

                  <div
                    className={styles.projectTextBox}
                  >
                    <p className={styles.projectName}>
                      스마트플레이스 <br />
                      상위노출
                    </p>

                    <p className={styles.projectDesc}>
                      검색 알고리즘 기반 SEO
                    </p>
                  </div>
                </li>

                <li>
                  <div className={styles.projectImgBox}>
                    <img
                      src="/images/main/project_img04.jpg"
                      alt=""
                    />
                  </div>

                  <div
                    className={styles.projectTextBox}
                  >
                    <p className={styles.projectName}>
                      더 풀림 <br />
                      AMS
                    </p>

                    <p className={styles.projectDesc}>
                      원활한 광고 운영을 위한 <br />
                      자체 개발 통합 시스템
                    </p>
                  </div>
                </li>

                <li>
                  <div className={styles.projectImgBox}>
                    <img
                      src="/images/main/project_img05.jpg"
                      alt=""
                    />
                  </div>

                  <div
                    className={styles.projectTextBox}
                  >
                    <p className={styles.projectName}>
                      AI 시스템 <br />
                      블로그
                    </p>

                    <p className={styles.projectDesc}>
                      리뷰 누적과 후기성 또는 <br />
                      정보성 컨텐츠 확산
                    </p>
                  </div>
                </li>

                <li>
                  <div className={styles.projectImgBox}>
                    <img
                      src="/images/main/project_img06.jpg"
                      alt=""
                    />
                  </div>

                  <div
                    className={styles.projectTextBox}
                  >
                    <p className={styles.projectName}>
                      기자단 <br />
                      리뷰
                    </p>

                    <p className={styles.projectDesc}>
                      고객의 구매 결정을 이끄는 <br />
                      리뷰 콘텐츠 제작
                    </p>
                  </div>
                </li>

                <li>
                  <div className={styles.projectImgBox}>
                    <img
                      src="/images/main/project_img07.jpg"
                      alt=""
                    />
                  </div>

                  <div
                    className={styles.projectTextBox}
                  >
                    <p className={styles.projectName}>
                      제로 <br />
                      환전소
                    </p>

                    <p className={styles.projectDesc}>
                      자체 개발한 외환 환전 시스템을
                      통해 <br />
                      외화 환전 서비스를 제공하는
                      오프라인 브랜드
                    </p>
                  </div>
                </li>

                <li>
                  <div className={styles.projectImgBox}>
                    <img
                      src="/images/main/project_img08.jpg"
                      alt=""
                    />
                  </div>

                  <div
                    className={styles.projectTextBox}
                  >
                    <p className={styles.projectName}>
                      라임 <br />
                      클래스
                    </p>

                    <p className={styles.projectDesc}>
                      성인 학습자를 위한 <br />
                      온라인 교육 브랜드
                    </p>
                  </div>
                </li>

                <li>
                  <div className={styles.projectImgBox}>
                    <img
                      src="/images/main/project_img09.jpg"
                      alt=""
                    />
                  </div>

                  <div
                    className={styles.projectTextBox}
                  >
                    <p className={styles.projectName}>
                      럭스 <br />
                      스튜디오
                    </p>

                    <p className={styles.projectDesc}>
                      자산의 가치를 재발견하고 지속
                      가능한 <br />
                      소비 방식을 만드는 리커머스 브랜드
                    </p>
                  </div>
                </li>

                <li>
                  <div className={styles.projectImgBox}>
                    <img
                      src="/images/main/project_img10.jpg"
                      alt=""
                    />
                  </div>

                  <div
                    className={styles.projectTextBox}
                  >
                    <p className={styles.projectName}>
                      건강기능식품 브랜드 <br />
                      만년해로
                    </p>

                    <p className={styles.projectDesc}>
                      더 풀림이 만든 일상의 균형을 채우고{' '}
                      <br />
                      삶의 질을 높이는 건강 브랜드
                    </p>
                  </div>
                </li>
              </ul>
              {/* //프로젝트 목록 영역 */}
            </div>
          </div>
        </div>
      </section>
      {/* //프로젝트 영역 */}

      {/* 회사정보 영역 */}
      <section
        id="companyInfoWrap"
        className={styles.companyInfoWrap}
      >
        <div
          className={`
            container
            ${styles.container}
          `}
        >
          <div className="companyInfoBox">
            <div
              className={styles.companyInfoLayoutBox}
            >
              {/* 이미지 영역 */}
              <div className={styles.companyVisualBox}>
                <div
                  className={
                    styles.companyVisualContentBox
                  }
                >
                  {/* 제목 영역 */}
                  <div
                    className={styles.companyTitleBox}
                  >
                    <span>
                      [ COMPANY INFORMATION ]
                    </span>

                    <p>
                      더 풀림은 애드테크를 기반으로{' '}
                      <br />
                      IMC, 커머스, 온라인교육, 디자인 등{' '}
                      <br />
                      다양한 도메인에서 새로운 가치를
                      만들어 가고 있습니다.
                    </p>
                  </div>
                  {/* //제목 영역 */}

                  <div
                    className={`
                      companyImgBox
                      ${styles.companyImgBox}
                    `}
                  >
                    <img
                      src="/images/main/company_img01.jpg"
                      alt=""
                    />

                    <img
                      src="/images/main/company_img02.jpg"
                      alt=""
                    />

                    <img
                      src="/images/main/company_img03.jpg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              {/* //이미지 영역 */}

              {/* 숫자 영역 */}
              <div
                className={
                  styles.companyInfoNumberBox
                }
              >
                <div
                  className={`
                    companyInfoNumber
                    ${styles.companyInfoNumber}
                  `}
                >
                  <span>( FOUNDED IN )</span>
                  <strong data-target="2022">0</strong>
                </div>

                <div
                  className={`
                    companyInfoNumber
                    ${styles.companyInfoNumber}
                  `}
                >
                  <span>( MEMBERS )</span>

                  <div
                    className={
                      styles.companyInfoNumberValue
                    }
                  >
                    <strong data-target="80">0</strong>
                    <em>+</em>
                  </div>
                </div>

                <div
                  className={`
                    companyInfoNumber
                    ${styles.companyInfoNumber}
                  `}
                >
                  <span>( CLIENTS )</span>

                  <div
                    className={
                      styles.companyInfoNumberValue
                    }
                  >
                    <strong data-target="4000">
                      0
                    </strong>
                    <em>+</em>
                  </div>
                </div>
              </div>
              {/* //숫자 영역 */}
            </div>
          </div>
        </div>
      </section>
      {/* //회사정보 영역 */}

      {/* 문의하기 영역 */}
      <section
        id="contactWrap"
        className={styles.contactWrap}
      >
        <div
          className={`
            container
            ${styles.container}
          `}
        >
          <div className="contactBox">
            {/* 제목 영역 */}
            <div className={styles.contactTitleBox}>
              <h2>
                LET’S BUILD SOMETHING <br />
                GREAT TOGETHER
              </h2>
            </div>
            {/* //제목 영역 */}

            {/* 문의 안내 영역 */}
            <div className={styles.contactContentBox}>
              <div
                className={styles.contactInfoTextBox}
              >
                <span>[ CONTACT ]</span>

                <p>
                  시대의 변화를 읽는 정교한 기술로
                  영역을 넓히고 지속 가능한 성장을
                  증명합니다.
                </p>
              </div>

              <div className={styles.contactInfoBox}>
                <div className={styles.contactInfoText}>
                  <p>
                    우리가 함께 운영할 <br />

                    <span
                      className={`
                        contactProjectText
                        ${styles.contactProjectText}
                      `}
                    >
                      <span className="contactProjectLabel">
                        ( 프로젝트 )
                      </span>

                      <svg
                        className={`
                          contactProjectLine
                          ${styles.contactProjectLine}
                        `}
                        viewBox="0 0 155 46"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M146.451 42.2127C143.965 41.5772 141.479 40.9417 126.15 41.0291C110.82 41.1164 82.7226 41.9458 62.653 40.7393C42.5833 39.5329 31.3933 36.2654 23.6323 33.7746C15.8714 31.2837 11.8787 29.6685 8.58706 27.5765C5.29538 25.4844 2.82569 22.9644 1.55343 21.2833C0.281162 19.6023 0.281162 18.8365 0.920042 17.488C1.55892 16.1395 2.83668 14.2313 5.69067 12.082C8.54465 9.93278 12.9361 7.60021 21.6653 5.59513C30.3945 3.59004 43.3282 1.98312 55.3154 1.15532C67.3026 0.327511 77.9512 0.327511 88.1823 0.911389C98.4134 1.49527 107.904 2.66303 116.549 4.28528C125.195 5.90753 132.706 7.9489 138.379 10.3669C144.052 12.7849 147.658 15.5178 149.431 17.6907C151.205 19.8637 151.036 21.394 149.933 23.1959C148.83 24.9979 146.797 27.0251 142.961 29.6265C139.126 32.2279 133.549 35.3422 125.366 38.0665C117.183 40.7908 106.562 43.0308 93.3357 44.3006C80.1091 45.5703 64.5979 45.802 53.1634 45.1371C41.729 44.4721 34.8413 42.9035 30.0205 41.4756C25.1998 40.0477 22.6546 38.808 21.0914 36.4914C19.5283 34.1749 19.0243 30.819 19.7765 28.0727C20.5287 25.3265 22.5525 23.2916 27.076 20.7629C31.5994 18.2341 38.5613 15.2732 52.7963 12.56C67.0314 9.84688 88.3287 7.47128 105.043 6.46883C121.758 5.46639 133.245 5.90909 140.869 6.61698C148.493 7.32487 151.907 8.28455 153.485 9.45152C155.064 10.6185 154.706 11.9637 153.065 13.4209C151.424 14.8782 148.512 16.4067 143.598 18.1617C138.683 19.9168 131.855 21.852 126.195 23.0762C120.536 24.3004 116.254 24.7549 111.842 25.2232"
                          stroke="white"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    를 알려주세요
                  </p>
                </div>

                <a
                  href="#"
                  className={styles.contactLink}
                >
                  <span>GET IN TOUCH</span>
                </a>
              </div>
            </div>
            {/* //문의 안내 영역 */}
          </div>
        </div>
      </section>
      {/* //문의하기 영역 */}

      {/* 기업 소개 영상 팝업 */}
      <div
        className={`
    companyVideoPopup
    ${companyVideoOpen
            ? 'active'
            : ''
          }
  `}
        aria-hidden={!companyVideoOpen}
      >
        <div className="companyVideoPopupFrame">
          <iframe
            src={
              companyVideoOpen
                ? 'https://www.youtube.com/embed/wWzDcDeFumU?autoplay=1&mute=1&loop=1&playlist=wWzDcDeFumU&playsinline=1&rel=0'
                : undefined
            }
            title="더 풀림 기업 소개 영상"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>

        <button
          type="button"
          className="companyVideoPopupCloseBtn"
          aria-label="기업 소개 영상 팝업 닫기"
          onClick={function () {
            setCompanyVideoOpen(false);
          }}
        />
      </div>
      {/* //기업 소개 영상 팝업 */}
      
    </>
  );
}