import styles from './Footer.module.css';

export default function Footer() {

  return (
    <footer id="footerWrap">
      <div className="container">
        <div className={styles.footerBox}>
          {/* 로고, 개인정보처리방침 영역 */}
          <div className={styles.footerLeftBox}>
            <div className={styles.footerLogoBox}>
              <h1>
                <img
                  src="/images/common/logo02.svg"
                  alt="the pullim"
                />
              </h1>
            </div>

            <a
              href="#"
              className={styles.footerPolicyLink}
            >
              개인정보처리방침
            </a>
          </div>
          {/* //로고, 개인정보처리방침 영역 */}

          {/* 정보 영역 */}
          <div className={styles.footerInfoTextBox}>
            <div className={styles.footerInfoText}>
              <dl>
                <dt>대표이사</dt>
                <dd>김제현</dd>
              </dl>

              <dl>
                <dt>사업자등록번호</dt>
                <dd>267-09-02360</dd>
              </dl>

              <dl>
                <dt>업태</dt>
                <dd>과학 및 기술 서비스 </dd>
              </dl>

              <dl>
                <dt>대표번호</dt>
                <dd>02-555-9530</dd>
              </dl>
            </div>

            <address>
              서울특별시 강남구 테헤란로 77길 11-8,
              1/2/3/4층
            </address>
          </div>
          {/* //정보 영역 */}

          {/* SNS, copyright 영역 */}
          <div className={styles.footerInfoBox}>
            <div className={styles.footerInfoSnsBox}>
              <ul className={styles.footerInfoSnsList}>
                <li>
                  <a href="#">
                    <img
                      src="/images/common/youtube_icon.svg"
                      alt="유튜브"
                    />
                  </a>
                </li>

                <li>
                  <a href="https://www.instagram.com/thepullim_official">
                    <img
                      src="/images/common/instagram_icon.svg"
                      alt="인스타그램"
                    />
                  </a>
                </li>

                <li>
                  <a href="https://blog.naver.com/pullim_official">
                    <img
                      src="/images/common/blog_icon.svg"
                      alt="블로그"
                    />
                  </a>
                </li>

                <li>
                  <a href="https://pf.kakao.com/_QxkJHn">
                    <img
                      src="/images/common/kakao_icon.svg"
                      alt="카카오톡"
                    />
                  </a>
                </li>
              </ul>
            </div>

            <span className={styles.copyright}>
              Copyright@풀림.All Rights Reserved.
            </span>
          </div>
          {/* //SNS, copyright 영역 */}
        </div>
      </div>
    </footer>
  );

}